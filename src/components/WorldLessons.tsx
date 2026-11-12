"use client";

import Link from "next/link";
import { Check, Clock, Lock, Play, Sprout } from "lucide-react";
import { getWorld } from "@/content/worlds";
import { mastery, useHydrated, useProgress } from "@/lib/progress";
import { lessonStatus } from "@/lib/curriculum";

export function WorldLessons({ worldId }: { worldId: string }) {
  const world = getWorld(worldId)!;
  const p = useProgress();
  const hydrated = useHydrated();

  return (
    <ol className="relative space-y-3">
      <span className="absolute bottom-6 left-[27px] top-6 w-0.5 bg-sand" aria-hidden />
      {world.lessons.map((l, i) => {
        const status = hydrated ? lessonStatus(world, i, p) : l.available ? (i === world.lessons.findIndex((x) => x.available) ? "available" : "locked") : "coming-soon";
        const m = mastery(p.lessons[`${world.id}/${l.id}`]);
        const icon =
          status === "complete" ? <Check className="h-5 w-5" /> : status === "available" ? <Play className="h-5 w-5" /> : status === "locked" ? <Lock className="h-4 w-4" /> : <Sprout className="h-4 w-4" />;
        const inner = (
          <div className={`relative flex gap-4 rounded-2xl border p-4 transition ${status === "available" ? "border-transparent bg-white shadow-md hover:shadow-lg" : status === "complete" ? "border-sand bg-white/80 hover:shadow" : "border-dashed border-sand bg-paper/60"}`}>
            <span
              className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
              style={{
                background: status === "complete" || status === "available" ? world.color : "#efe8da",
                color: status === "complete" || status === "available" ? "white" : "#3f4f46",
              }}
            >
              {icon}
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-ink-soft">
                <span className="font-mono">Lesson {i + 1}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {l.minutes} min
                </span>
                {status === "coming-soon" && <span className="rounded-full bg-paper-2 px-2 py-0.5 font-semibold">In development</span>}
                {status === "locked" && <span className="rounded-full bg-paper-2 px-2 py-0.5 font-semibold">Finish the previous lesson to unlock</span>}
                {status === "complete" && m === "mastered" && <span className="rounded-full bg-moss-100 px-2 py-0.5 font-semibold text-forest-700">Mastered</span>}
                {status === "complete" && m === "revise" && <span className="rounded-full bg-[#fdf3dc] px-2 py-0.5 font-semibold text-[#8a6200]">Worth revising</span>}
              </div>
              <h3 className="font-display mt-1 text-xl text-ink">{l.title}</h3>
              <p className="text-[15px] text-ink-soft">{l.summary}</p>
            </div>
          </div>
        );
        return (
          <li key={l.id}>
            {status === "available" || status === "complete" ? (
              <Link href={`/learn/${world.id}/${l.id}`} aria-label={`${status === "complete" ? "Revisit" : "Start"} ${l.title}`}>
                {inner}
              </Link>
            ) : (
              inner
            )}
          </li>
        );
      })}
    </ol>
  );
}
