"use client";

import Link from "next/link";
import { ArrowRight, Flame, Sparkles, Zap } from "lucide-react";
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
  return (
    <div className="card-chunky rounded-3xl bg-white p-4">
      <div className="grid grid-cols-3 gap-2 text-center">
        <Stat icon={<Flame className="h-5 w-5" />} value={hydrated ? streak(p) : 0} label="streak" color="#ff6b4a" />
        <Stat icon={<Zap className="h-5 w-5" />} value={hydrated ? p.xp : 0} label="XP" color="#f2a20c" />
        <Stat icon={<Sparkles className="h-5 w-5" />} value={hydrated ? done : 0} label="lessons" color="#2fa560" />
      </div>
      <div className="mt-3">
        <div className="mb-1 flex justify-between text-xs font-bold text-ink-soft">
          <span>Level {hydrated ? lv.level : 1}</span>
          <span>{hydrated ? lv.span - lv.into : 100} XP to go</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-paper-2">
          <div className="h-full rounded-full bg-gradient-to-r from-moss-500 to-sun transition-all" style={{ width: `${hydrated ? (lv.into / lv.span) * 100 : 0}%` }} />
        </div>
      </div>
      {hydrated && rec && <p className="mt-3 rounded-xl bg-sprout-soft px-3 py-2 text-sm font-semibold">Your path starts in {rec.title}</p>}
    </div>
  );
}

function Stat({ icon, value, label, color }: { icon: React.ReactNode; value: number; label: string; color: string }) {
  return (
    <div className="rounded-2xl bg-paper py-2">
      <div className="flex items-center justify-center gap-1 font-display text-xl sm:text-2xl" style={{ color }}>
        {icon}
        {value}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-ink-soft sm:text-[11px]">{label}</div>
    </div>
  );
}
