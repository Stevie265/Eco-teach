"use client";

/**
 * Learner progress store.
 *
 * v1 persists to localStorage (no account needed, no personal data leaves the device).
 * Everything goes through `load`/`save`, so swapping in a server-backed adapter
 * (e.g. Supabase or Neon + Auth.js) later only touches this file. See README → "Accounts".
 */
import { useSyncExternalStore } from "react";
import { ACHIEVEMENTS } from "./achievements";

export interface LessonProgress {
  completedAt?: string;
  /** furthest step index reached */
  step: number;
  /** best knowledge-check score 0..1 */
  best?: number;
  attempts: number;
}

export interface RippleCustomNode {
  id: string;
  level: "environment" | "industry" | "customer";
  title: string;
  detail: string;
  from?: string;
}

export interface Profile {
  level: "foundation" | "intermediate" | "advanced";
  goals: string[];
  role?: string;
  focusWorlds: string[];
  recommended: { worldId: string; lessonId: string; reason: string };
  completedAt: string;
}

export interface CapstoneDraft {
  title: string;
  trend: string;
  drivers: string;
  impact: string;
  problem: string;
  opportunity: string;
  concept: string;
  validation: string;
  updatedAt?: string;
}

export interface ProgressState {
  version: 1;
  xp: number;
  /** ISO dates (yyyy-mm-dd) with any learning activity */
  activeDays: string[];
  lessons: Record<string, LessonProgress>;
  /** question id → { wrong count, last result } */
  questions: Record<string, { right: number; wrong: number; last: "right" | "wrong"; at: string }>;
  achievements: Record<string, string>; // id → earned at
  profile?: Profile;
  ripple: { custom: Record<string, RippleCustomNode[]>; notes: Record<string, string> };
  capstone?: CapstoneDraft;
  activity: { at: string; text: string; xp?: number }[];
  /** Breakthrough Breakdown: steps understood, and steps that needed another explanation */
  breakdowns?: Record<string, { got: number[]; help: number[] }>;
}

const KEY = "eco-teach:progress:v1";

const EMPTY: ProgressState = {
  version: 1,
  xp: 0,
  activeDays: [],
  lessons: {},
  questions: {},
  achievements: {},
  ripple: { custom: {}, notes: {} },
  activity: [],
};

let state: ProgressState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load(): ProgressState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as ProgressState;
    return { ...EMPTY, ...parsed, ripple: { ...EMPTY.ripple, ...(parsed.ripple ?? {}) } };
  } catch {
    return EMPTY;
  }
}

function save(next: ProgressState) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage full or blocked: progress just won't persist this session */
  }
}

function ensureLoaded() {
  if (!loaded && typeof window !== "undefined") {
    state = load();
    loaded = true;
    window.addEventListener("storage", (e) => {
      if (e.key === KEY) {
        state = load();
        listeners.forEach((l) => l());
      }
    });
  }
}

function subscribe(cb: () => void) {
  ensureLoaded();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  ensureLoaded();
  return state;
}

function getServerSnapshot() {
  return EMPTY;
}

/** React hook: current progress (EMPTY during server render / before hydration). */
export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True once the client has hydrated, to avoid flashing empty state as "real" state */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function today(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function update(fn: (s: ProgressState) => ProgressState) {
  ensureLoaded();
  let next = fn(state);
  next = awardAchievements(next);
  state = next;
  save(state);
  listeners.forEach((l) => l());
}

function touchDay(s: ProgressState): ProgressState {
  const t = today();
  if (s.activeDays.includes(t)) return s;
  return { ...s, activeDays: [...s.activeDays, t].slice(-400) };
}

function log(s: ProgressState, text: string, xp?: number): ProgressState {
  return { ...s, activity: [{ at: new Date().toISOString(), text, xp }, ...s.activity].slice(0, 40) };
}

export function addXp(amount: number, reason: string) {
  update((s) => log(touchDay({ ...s, xp: s.xp + amount }), reason, amount));
}

/** Mark a breakdown step as understood (true) or as needing another way in (false). */
export function markBreakdownStep(id: string, step: number, understood: boolean) {
  update((s) => {
    const all = s.breakdowns ?? {};
    const prev = all[id] ?? { got: [], help: [] };
    const next = understood
      ? { ...prev, got: prev.got.includes(step) ? prev.got : [...prev.got, step] }
      : { ...prev, help: prev.help.includes(step) ? prev.help : [...prev.help, step] };
    const gained = understood && !prev.got.includes(step) ? 5 : 0;
    return touchDay({ ...s, xp: s.xp + gained, breakdowns: { ...all, [id]: next } });
  });
}

export function resetBreakdown(id: string) {
  update((s) => {
    const all = { ...(s.breakdowns ?? {}) };
    delete all[id];
    return { ...s, breakdowns: all };
  });
}

export function recordStep(key: string, step: number) {
  update((s) => {
    const prev = s.lessons[key] ?? { step: 0, attempts: 0 };
    if (step <= prev.step) return s;
    return touchDay({ ...s, xp: s.xp + 5, lessons: { ...s.lessons, [key]: { ...prev, step } } });
  });
}

export function recordAnswer(questionId: string, correct: boolean, firstTry: boolean) {
  update((s) => {
    const prev = s.questions[questionId] ?? { right: 0, wrong: 0, last: "right" as const, at: "" };
    const q = {
      right: prev.right + (correct ? 1 : 0),
      wrong: prev.wrong + (correct ? 0 : 1),
      last: correct ? ("right" as const) : ("wrong" as const),
      at: new Date().toISOString(),
    };
    return touchDay({ ...s, xp: s.xp + (correct && firstTry ? 10 : 0), questions: { ...s.questions, [questionId]: q } });
  });
}

export function completeLesson(key: string, title: string, score: number) {
  update((s) => {
    const prev = s.lessons[key] ?? { step: 0, attempts: 0 };
    const first = !prev.completedAt;
    const lp: LessonProgress = {
      ...prev,
      completedAt: prev.completedAt ?? new Date().toISOString(),
      best: Math.max(prev.best ?? 0, score),
      attempts: prev.attempts + 1,
    };
    const gained = first ? 50 : 10;
    return log(touchDay({ ...s, xp: s.xp + gained, lessons: { ...s.lessons, [key]: lp } }), `${first ? "Completed" : "Revisited"} "${title}"`, gained);
  });
}

export function saveProfile(profile: Profile) {
  update((s) => log(touchDay({ ...s, profile, xp: s.xp + (s.profile ? 0 : 25) }), "Completed the starting diagnostic", s.profile ? undefined : 25));
}

export function saveRipple(trendId: string, custom: RippleCustomNode[], note?: string) {
  update((s) => {
    const firstCustom = Object.values(s.ripple.custom).flat().length === 0 && custom.length > 0;
    let next: ProgressState = {
      ...s,
      ripple: {
        custom: { ...s.ripple.custom, [trendId]: custom },
        notes: note === undefined ? s.ripple.notes : { ...s.ripple.notes, [trendId]: note },
      },
    };
    if (firstCustom) next = log({ ...next, xp: next.xp + 15 }, "Added your first ripple connection", 15);
    return touchDay(next);
  });
}

export function saveCapstone(draft: CapstoneDraft) {
  update((s) => touchDay({ ...s, capstone: { ...draft, updatedAt: new Date().toISOString() } }));
}

export function resetProgress() {
  update(() => EMPTY);
}

export function exportProgress(): string {
  return JSON.stringify(state, null, 2);
}

/* ---------- derived values ---------- */

export function streak(s: ProgressState, now = new Date()): number {
  const days = new Set(s.activeDays);
  let count = 0;
  const d = new Date(now);
  // a streak survives until the end of today, so start from today or yesterday
  if (!days.has(today(d))) d.setDate(d.getDate() - 1);
  while (days.has(today(d))) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}

export function level(xp: number): { level: number; into: number; span: number } {
  // gently rising curve: 100, 150, 200, ...
  let lvl = 1;
  let remaining = xp;
  let span = 100;
  while (remaining >= span) {
    remaining -= span;
    lvl++;
    span += 50;
  }
  return { level: lvl, into: remaining, span };
}

export function mastery(lp?: LessonProgress): "none" | "learning" | "revise" | "mastered" {
  if (!lp?.completedAt) return lp && lp.step > 0 ? "learning" : "none";
  if ((lp.best ?? 0) >= 0.99) return "mastered";
  if ((lp.best ?? 0) < 0.67) return "revise";
  return "learning";
}

function awardAchievements(s: ProgressState): ProgressState {
  let changed = false;
  const earned = { ...s.achievements };
  for (const a of ACHIEVEMENTS) {
    if (!earned[a.id] && a.test(s, { streak: streak(s) })) {
      earned[a.id] = new Date().toISOString();
      changed = true;
    }
  }
  return changed ? { ...s, achievements: earned } : s;
}
