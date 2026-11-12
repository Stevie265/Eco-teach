"use client";

import Link from "next/link";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import { level, streak, useHydrated, useProgress } from "@/lib/progress";
import { nextLesson } from "@/lib/curriculum";
import { getWorld } from "@/content/worlds";

export function HomeCTA() {
  const p = useProgress();
  const hydrated = useHydrated();
  if (!hydrated) return <div className="h-14" />;
  const next = nextLesson(p);
  const started = Object.keys(p.lessons).length > 0;

  if (!p.profile && !started) {
    return (
      <div className="flex flex-wrap gap-3">
        <Link href="/start" className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3.5 font-semibold text-paper shadow-lg shadow-forest-800/25 transition hover:bg-forest-700">
          Find my starting point <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/learn/history/muscle-to-megawatts" className="inline-flex items-center gap-2 rounded-full border border-forest-800/20 bg-white px-6 py-3.5 font-semibold text-forest-800">
          Jump into lesson one
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-3">
      {next && (
        <Link
          href={`/learn/${next.worldId}/${next.lessonId}`}
          className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3.5 font-semibold text-paper shadow-lg shadow-forest-800/25 transition hover:bg-forest-700"
        >
          {started ? "Continue" : "Start"}: {next.title} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
      {!p.profile && (
        <Link href="/start" className="rounded-full border border-forest-800/20 bg-white px-5 py-3.5 font-semibold text-forest-800">
          Take the diagnostic
        </Link>
      )}
    </div>
  );
}

export function HomeStats() {
  const p = useProgress();
  const hydrated = useHydrated();
  const lv = level(p.xp);
  const done = Object.values(p.lessons).filter((l) => l.completedAt).length;
  const rec = p.profile ? getWorld(p.profile.recommended.worldId) : undefined;
  return (
    <div className="rounded-3xl border border-sand bg-white/80 p-5 shadow-sm backdrop-blur">
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="flex items-center justify-center gap-1 font-display text-3xl text-ember">
            <Flame className="h-6 w-6" />
            {hydrated ? streak(p) : 0}
          </div>
          <div className="text-xs text-ink-soft">day streak</div>
        </div>
        <div>
          <div className="font-display text-3xl text-forest-800">{hydrated ? lv.level : 1}</div>
          <div className="text-xs text-ink-soft">level</div>
        </div>
        <div>
          <div className="font-display text-3xl text-forest-800">{hydrated ? done : 0}</div>
          <div className="text-xs text-ink-soft">lessons done</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs text-ink-soft">
          <span>{hydrated ? p.xp : 0} XP</span>
          <span>
            {hydrated ? lv.span - lv.into : 100} XP to level {hydrated ? lv.level + 1 : 2}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-paper-2">
          <div className="h-full rounded-full bg-gradient-to-r from-moss-500 to-sprout transition-all" style={{ width: `${hydrated ? (lv.into / lv.span) * 100 : 0}%` }} />
        </div>
      </div>
      {hydrated && rec && (
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-sprout-soft p-3 text-sm">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-forest-700" />
          <span>
            Your path starts in <strong>{rec.title}</strong>.
          </span>
        </p>
      )}
    </div>
  );
}
