"use client";

import Link from "next/link";
import { useState } from "react";
import { Award, Battery, Compass, Flag, Flame, Layers, Lock, RotateCcw, Scroll, Target, Waves, Zap } from "lucide-react";
import { WORLDS } from "@/content/worlds";
import { LESSONS, allQuestions } from "@/content/lessons";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { exportProgress, level, mastery, resetProgress, streak, useHydrated, useProgress } from "@/lib/progress";
import { worldProgress } from "@/lib/curriculum";
import { WorldGlyph } from "./ui/WorldGlyph";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  compass: Compass,
  zap: Zap,
  layers: Layers,
  target: Target,
  flame: Flame,
  waves: Waves,
  scroll: Scroll,
  flag: Flag,
  battery: Battery,
};

export function Dashboard() {
  const p = useProgress();
  const hydrated = useHydrated();
  const [confirmReset, setConfirmReset] = useState(false);
  if (!hydrated) return <div className="h-96" />;

  const lv = level(p.xp);
  const s = streak(p);
  const completed = LESSONS.filter((l) => p.lessons[`${l.worldId}/${l.id}`]?.completedAt);
  const mastered = LESSONS.filter((l) => mastery(p.lessons[`${l.worldId}/${l.id}`]) === "mastered");
  const revise = LESSONS.filter((l) => mastery(p.lessons[`${l.worldId}/${l.id}`]) === "revise");
  const missed = allQuestions().filter(({ question }) => p.questions[question.id]?.last === "wrong");
  const last14 = Array.from({ length: 14 }, (_, k) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - k));
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return { iso, on: p.activeDays.includes(iso), label: d.toLocaleDateString("en-GB", { weekday: "narrow" }) };
  });

  function download() {
    const blob = new Blob([exportProgress()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "eco-teach-progress.json";
    a.click();
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* headline stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Stat label="Level" value={String(lv.level)} sub={`${lv.span - lv.into} XP to next`} bar={lv.into / lv.span} />
        <Stat label="Total XP" value={p.xp.toLocaleString()} sub="Earned by learning, not clicking" />
        <Stat label="Day streak" value={String(s)} sub={s ? "Keep the rhythm going" : "Learn today to start a streak"} accent />
        <Stat label="Lessons complete" value={`${completed.length}/${LESSONS.length}`} sub={`${mastered.length} mastered · ${LESSONS.length} live so far`} />
      </div>

      {/* streak calendar */}
      <section className="rounded-3xl card-chunky bg-white p-5">
        <h2 className="font-display text-xl">Last two weeks</h2>
        <div className="mt-4 flex gap-1.5">
          {last14.map((d) => (
            <div key={d.iso} className="flex flex-1 flex-col items-center gap-1">
              <div className={`h-8 w-full rounded-md ${d.on ? "bg-moss-500" : "bg-paper-2"}`} title={d.iso} />
              <span className="text-[10px] text-ink-soft">{d.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* progress by world */}
      <section>
        <h2 className="font-display t-h2 mb-3 sm:mb-4">Progress by world</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {WORLDS.map((w) => {
            const wp = worldProgress(w, p);
            return (
              <Link key={w.id} href={`/worlds/${w.id}`} className="flex items-center gap-4 rounded-2xl card-chunky bg-white p-3 hover:shadow">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: w.tint }}>
                  <WorldGlyph glyph={w.glyph} color={w.color} className="h-7 w-7" />
                </span>
                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">{w.title}</span>
                    <span className="font-mono text-xs text-ink-soft">
                      {wp.done}/{wp.total}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-paper-2">
                    <div className="h-full rounded-full" style={{ width: `${wp.pct * 100}%`, background: w.color }} />
                  </div>
                  {wp.available === 0 && <div className="mt-1 text-[11px] text-ink-soft">Lessons in development</div>}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* mastery */}
        <section className="rounded-3xl card-chunky bg-white p-5">
          <h2 className="font-display text-xl">Topics mastered</h2>
          {mastered.length ? (
            <ul className="mt-3 space-y-1.5 text-[15px]">
              {mastered.map((l) => (
                <li key={l.id} className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-moss-500" /> {l.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-ink-soft">Score 100% first time on a knowledge check to master a topic.</p>
          )}
          <h2 className="font-display mt-6 text-xl">Topics to revise</h2>
          {revise.length || missed.length ? (
            <>
              <ul className="mt-3 space-y-1.5 text-[15px]">
                {revise.map((l) => (
                  <li key={l.id}>
                    <Link href={`/learn/${l.worldId}/${l.id}`} className="underline underline-offset-4">
                      {l.title}
                    </Link>
                  </li>
                ))}
              </ul>
              {missed.length > 0 && (
                <Link href="/review" className="mt-4 btn btn-primary text-sm">
                  <RotateCcw className="h-4 w-4" /> Review {missed.length} question{missed.length > 1 ? "s" : ""}
                </Link>
              )}
            </>
          ) : (
            <p className="mt-2 text-sm text-ink-soft">Nothing flagged. Questions you miss will appear here for review.</p>
          )}
        </section>

        {/* activity */}
        <section className="rounded-3xl card-chunky bg-white p-5">
          <h2 className="font-display text-xl">Recent activity</h2>
          {p.activity.length ? (
            <ul className="mt-3 space-y-2 text-sm">
              {p.activity.slice(0, 10).map((a, n) => (
                <li key={n} className="flex justify-between gap-3 border-b border-paper-2 pb-2">
                  <span>{a.text}</span>
                  <span className="shrink-0 font-mono text-xs text-ink-soft">
                    {a.xp ? `+${a.xp} XP · ` : ""}
                    {new Date(a.at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-ink-soft">
              No activity yet. <Link href="/start" className="underline">Find your starting point</Link>.
            </p>
          )}
        </section>
      </div>

      {/* achievements */}
      <section>
        <h2 className="font-display t-h2 mb-3 sm:mb-4">Achievements</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {ACHIEVEMENTS.map((a) => {
            const got = p.achievements[a.id];
            const Icon = ICONS[a.icon] ?? Award;
            return (
              <div key={a.id} className={`rounded-2xl border p-4 text-center ${got ? "border-moss-300 bg-sprout-soft" : "border-sand bg-white opacity-60"}`}>
                <div className={`mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full ${got ? "bg-forest-800 text-sprout" : "bg-paper-2 text-ink-soft"}`}>
                  {got ? <Icon className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
                </div>
                <div className="text-sm font-semibold">{a.title}</div>
                <div className="mt-0.5 text-xs text-ink-soft">{a.description}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* data controls */}
      <section className="rounded-2xl bg-paper-2 p-5 text-sm text-ink-soft">
        <p>
          <strong className="text-ink">Your data:</strong> progress is stored only in this browser. It isn&apos;t sent anywhere, and it won&apos;t follow you to another device (accounts are on the roadmap).
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button onClick={download} className="btn btn-secondary">
            Download my progress
          </button>
          {confirmReset ? (
            <button onClick={() => { resetProgress(); setConfirmReset(false); }} className="rounded-full bg-ember px-4 py-1.5 font-semibold text-white">
              Yes, erase everything
            </button>
          ) : (
            <button onClick={() => setConfirmReset(true)} className="btn btn-secondary">
              Reset progress
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, sub, bar, accent }: { label: string; value: string; sub: string; bar?: number; accent?: boolean }) {
  return (
    <div className={`rounded-3xl p-4 sm:p-5 ${accent ? "bg-forest-900 text-paper shadow-[0_4px_0_#0b2133]" : "card-chunky bg-white"}`}>
      <div className={`text-[10px] font-extrabold uppercase tracking-widest sm:text-xs ${accent ? "text-[#9fd0f0]" : "text-ink-soft"}`}>{label}</div>
      <div className={`font-display mt-1 text-3xl sm:text-4xl ${accent ? "text-sprout" : "text-forest-800"}`}>{value}</div>
      {bar !== undefined && (
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper-2">
          <div className="h-full rounded-full bg-moss-500" style={{ width: `${bar * 100}%` }} />
        </div>
      )}
      <div className={`mt-1 text-[11px] leading-snug sm:text-xs ${accent ? "text-[#9fd0f0]" : "text-ink-soft"}`}>{sub}</div>
    </div>
  );
}
