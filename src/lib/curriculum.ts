import type { World } from "@/content/types";
import { WORLDS } from "@/content/worlds";
import type { ProgressState } from "./progress";

export type LessonStatus = "complete" | "available" | "locked" | "coming-soon";

/**
 * Unlocking: within a world, a lesson opens once the previous *available* lesson is complete.
 * The first available lesson of every world is always open, so learners can explore freely.
 */
export function lessonStatus(world: World, index: number, p: ProgressState): LessonStatus {
  const lesson = world.lessons[index];
  if (!lesson.available) return "coming-soon";
  if (p.lessons[`${world.id}/${lesson.id}`]?.completedAt) return "complete";
  const prevAvailable = world.lessons.slice(0, index).filter((l) => l.available);
  if (prevAvailable.length === 0) return "available";
  const prev = prevAvailable[prevAvailable.length - 1];
  return p.lessons[`${world.id}/${prev.id}`]?.completedAt ? "available" : "locked";
}

export function worldProgress(world: World, p: ProgressState) {
  const available = world.lessons.filter((l) => l.available);
  const done = available.filter((l) => p.lessons[`${world.id}/${l.id}`]?.completedAt).length;
  return {
    total: world.lessons.length,
    available: available.length,
    done,
    pct: world.lessons.length ? done / world.lessons.length : 0,
    status: available.length === 0 ? ("soon" as const) : done === 0 ? ("new" as const) : done === available.length ? ("caught-up" as const) : ("in-progress" as const),
  };
}

/** The next lesson to do: continue the recommended path, else the first open lesson anywhere. */
export function nextLesson(p: ProgressState): { worldId: string; lessonId: string; title: string } | null {
  const ordered = [...WORLDS];
  if (p.profile) {
    const rec = ordered.findIndex((w) => w.id === p.profile!.recommended.worldId);
    if (rec > 0) ordered.unshift(...ordered.splice(rec, 1));
  }
  for (const w of ordered) {
    for (let i = 0; i < w.lessons.length; i++) {
      if (lessonStatus(w, i, p) === "available") return { worldId: w.id, lessonId: w.lessons[i].id, title: w.lessons[i].title };
    }
  }
  return null;
}
