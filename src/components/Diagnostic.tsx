"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { DIAGNOSTIC, recommend, type Recommendation } from "@/content/diagnostic";
import { getWorld } from "@/content/worlds";
import { saveProfile } from "@/lib/progress";

export function Diagnostic() {
  const [i, setI] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [result, setResult] = useState<Recommendation | null>(null);

  if (result) {
    const w = getWorld(result.worldId)!;
    const lesson = w.lessons.find((l) => l.id === result.lessonId)!;
    const knowledge = DIAGNOSTIC.filter((q) => q.kind === "knowledge");
    const right = knowledge.filter((q) => answers[q.id]?.[0] === q.correct).length;
    return (
      <div className="animate-rise">
        <div className="text-xs font-bold uppercase tracking-widest text-moss-500">Your starting point</div>
        <h1 className="font-display mt-2 text-4xl text-forest-900">
          {result.level === "foundation" ? "Start from the ground up" : result.level === "intermediate" ? "Build on what you know" : "Go straight to the frontier"}
        </h1>
        <p className="mt-4 text-lg text-ink-soft">{result.reason}</p>
        <p className="mt-2 text-sm text-ink-soft">
          You answered {right} of {knowledge.length} knowledge questions correctly. Your recommendation adapts as you learn: struggle with a concept and you&apos;ll get simpler explanations and review sessions; show mastery and you&apos;ll be nudged towards more advanced material.
        </p>
        <Link href={`/learn/${w.id}/${lesson.id}`} className="mt-8 flex items-center gap-4 rounded-3xl p-5 shadow-lg transition hover:-translate-y-0.5" style={{ background: w.tint }}>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: w.color }}>
              World {w.number} · {w.title}
            </div>
            <div className="font-display text-2xl">{lesson.title}</div>
            <div className="text-sm text-ink-soft">{lesson.summary}</div>
          </div>
          <ArrowRight className="h-6 w-6" />
        </Link>
        {result.focusWorlds.length > 0 && (
          <div className="mt-6">
            <div className="mb-2 text-sm font-semibold">Worlds matched to your goals</div>
            <div className="flex flex-wrap gap-2">
              {result.focusWorlds.map((id) => {
                const fw = getWorld(id)!;
                return (
                  <Link key={id} href={`/worlds/${id}`} className="rounded-full border border-sand bg-white px-3 py-1.5 text-sm hover:shadow">
                    {fw.title}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        <Link href="/" className="mt-8 inline-block text-sm font-semibold text-forest-700 underline">
          Or explore the full map
        </Link>
      </div>
    );
  }

  if (i === -1) {
    return (
      <div className="animate-rise">
        <div className="text-xs font-bold uppercase tracking-widest text-moss-500">Two minutes · seven questions</div>
        <h1 className="font-display mt-2 text-4xl text-forest-900 sm:text-5xl">Let&apos;s find your starting point</h1>
        <p className="mt-4 text-lg text-ink-soft">
          A few quick questions about what you already know, what you want to learn and the work you do. There are no wrong answers, and &ldquo;not sure&rdquo; is genuinely useful.
        </p>
        <button onClick={() => setI(0)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3.5 font-semibold text-paper">
          Begin <ArrowRight className="h-4 w-4" />
        </button>
        <p className="mt-4 text-xs text-ink-soft">Your answers stay in this browser.</p>
      </div>
    );
  }

  const q = DIAGNOSTIC[i];
  const selected = answers[q.id] ?? [];
  const toggle = (id: string) => {
    const next = q.multi ? (selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]) : [id];
    setAnswers({ ...answers, [q.id]: next });
  };
  const nextQ = () => {
    if (i + 1 < DIAGNOSTIC.length) return setI(i + 1);
    const rec = recommend(answers);
    saveProfile({
      level: rec.level,
      goals: answers.goals ?? [],
      role: answers.role?.[0],
      focusWorlds: rec.focusWorlds,
      recommended: { worldId: rec.worldId, lessonId: rec.lessonId, reason: rec.reason },
      completedAt: new Date().toISOString(),
    });
    setResult(rec);
  };

  return (
    <div key={q.id} className="animate-rise">
      <div className="mb-6 flex gap-1.5" aria-label={`Question ${i + 1} of ${DIAGNOSTIC.length}`}>
        {DIAGNOSTIC.map((_, n) => (
          <span key={n} className={`h-1.5 flex-1 rounded-full ${n <= i ? "bg-forest-700" : "bg-sand"}`} />
        ))}
      </div>
      <div className="text-xs font-bold uppercase tracking-widest text-ink-soft">
        {q.kind === "knowledge" ? "Quick check" : q.kind === "goals" ? "Your goals" : q.kind === "role" ? "Your work" : "Your background"}
      </div>
      <h2 className="font-display mt-2 text-3xl text-forest-900">{q.prompt}</h2>
      <div className="mt-6 space-y-2" role={q.multi ? "group" : "radiogroup"}>
        {q.options.map((o) => {
          const on = selected.includes(o.id);
          return (
            <button
              key={o.id}
              role={q.multi ? "checkbox" : "radio"}
              aria-checked={on}
              onClick={() => toggle(o.id)}
              className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition ${on ? "border-forest-700 bg-sprout-soft" : "border-sand bg-white hover:border-moss-400"}`}
            >
              <span className={`flex h-5 w-5 shrink-0 items-center justify-center ${q.multi ? "rounded-md" : "rounded-full"} border-2 ${on ? "border-forest-700 bg-forest-700 text-white" : "border-ink-soft/40"}`}>
                {on && <Check className="h-3 w-3" />}
              </span>
              {o.label}
            </button>
          );
        })}
      </div>
      <div className="mt-8 flex justify-between">
        <button onClick={() => setI(i - 1)} className="text-sm font-semibold text-ink-soft">
          ← Back
        </button>
        <button onClick={nextQ} disabled={!selected.length} className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 font-semibold text-paper disabled:opacity-30">
          {i + 1 === DIAGNOSTIC.length ? "See my starting point" : "Next"} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
