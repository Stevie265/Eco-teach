"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/start" className="btn btn-primary w-full sm:w-auto">
          Find my starting point <ArrowRight className="h-5 w-5" />
        </Link>
        <Link href="/learn/history/muscle-to-megawatts" className="btn btn-secondary w-full sm:w-auto">
          Jump into lesson one
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {next && (
        <Link href={`/learn/${next.worldId}/${next.lessonId}`} className="btn btn-primary w-full sm:w-auto">
          {started ? "Continue" : "Start"}: {next.title} <ArrowRight className="h-5 w-5" />
        </Link>
      )}
      {!p.profile && (
        <Link href="/start" className="btn btn-secondary w-full sm:w-auto">
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
  const cells = 10;
  const lit = hydrated ? Math.round((lv.into / lv.span) * cells) : 0;
  return (
    <div className="plate plate-rivets rounded-2xl">
      <div className="flex items-center justify-between border-b-[1.5px] border-ink px-6 py-1.5">
        <span className="readout text-[10px] font-bold">Your meter</span>
        <span className="readout text-[10px] font-bold text-moss-500">Level {hydrated ? lv.level : 1}</span>
      </div>
      <dl className="grid grid-cols-3 divide-x-[1.5px] divide-ink/15 px-2 py-3 text-center">
        <Stat value={hydrated ? streak(p) : 0} label="Day streak" />
        <Stat value={hydrated ? p.xp : 0} label="XP" />
        <Stat value={hydrated ? done : 0} label="Lessons" />
      </dl>
      <div className="px-4 pb-4">
        <div className="flex gap-1" role="img" aria-label={`${lv.into} of ${lv.span} XP to the next level`}>
          {Array.from({ length: cells }).map((_, i) => (
            <span key={i} className="h-3 flex-1 rounded-[3px] border-[1.5px] border-ink" style={{ background: i < lit ? (i < 6 ? "#2fa560" : i < 9 ? "#ffc83d" : "#ff6b4a") : "#fffdf7" }} />
          ))}
        </div>
        <div className="readout mt-1.5 text-right text-[10px] text-ink-soft">{hydrated ? lv.span - lv.into : 100} XP to level {hydrated ? lv.level + 1 : 2}</div>
        {hydrated && rec && <p className="mt-2 rounded-lg border-[1.5px] border-ink bg-sun px-3 py-1.5 text-sm font-semibold">Your path starts in {rec.title}</p>}
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <dd className="readout text-2xl font-bold text-ink">{String(value).padStart(2, "0")}</dd>
      <dt className="readout text-[9px] font-bold text-ink-soft sm:text-[10px]">{label}</dt>
    </div>
  );
}
