import type { Lesson, QuizQuestion } from "../types";
import { muscleToMegawatts } from "./muscle-to-megawatts";
import { builtBigGoingSmall } from "./built-big-going-small";
import { powerVsEnergy } from "./power-vs-energy";
import { keeping50hz } from "./keeping-50hz";
import { whoControlsWhat } from "./who-controls-what";

/** Register new lessons here. Also set `available: true` on the outline in worlds.ts. */
export const LESSONS: Lesson[] = [muscleToMegawatts, builtBigGoingSmall, powerVsEnergy, keeping50hz, whoControlsWhat];

const key = (worldId: string, lessonId: string) => `${worldId}/${lessonId}`;
const BY_KEY = new Map(LESSONS.map((l) => [key(l.worldId, l.id), l]));

export function getLesson(worldId: string, lessonId: string): Lesson | undefined {
  return BY_KEY.get(key(worldId, lessonId));
}

export function lessonKey(worldId: string, lessonId: string) {
  return key(worldId, lessonId);
}

/** All quiz questions, with their lesson, for the review queue */
export function allQuestions(): { lesson: Lesson; question: QuizQuestion }[] {
  const out: { lesson: Lesson; question: QuizQuestion }[] = [];
  for (const lesson of LESSONS) {
    for (const step of lesson.steps) {
      if (step.type === "check") for (const q of step.questions) out.push({ lesson, question: q });
    }
  }
  return out;
}
