"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { allQuestions } from "@/content/lessons";
import { addXp, useHydrated, useProgress } from "@/lib/progress";
import { Quiz } from "./lesson/Quiz";

/**
 * Review session: questions answered wrong last time come first, topped up
 * with questions from completed lessons. A lightweight form of spaced retrieval.
 */
export function Review() {
  const p = useProgress();
  const hydrated = useHydrated();
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState<number | null>(null);
  const [round, setRound] = useState(0);

  const set = useMemo(() => {
    const all = allQuestions();
    const wrong = all.filter(({ question }) => p.questions[question.id]?.last === "wrong");
    const completedKeys = new Set(Object.entries(p.lessons).filter(([, l]) => l.completedAt).map(([k]) => k));
    const fromDone = all.filter(({ lesson, question }) => completedKeys.has(`${lesson.worldId}/${lesson.id}`) && !wrong.some((w) => w.question.id === question.id));
    // oldest-answered first
    fromDone.sort((a, b) => (p.questions[a.question.id]?.at ?? "").localeCompare(p.questions[b.question.id]?.at ?? ""));
    return [...wrong, ...fromDone].slice(0, 5);
    // freeze the set for a round
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, round, hydrated]);

  if (!hydrated) return <div className="h-64" />;

  if (set.length === 0) {
    return (
      <div className="rounded-3xl border border-sand bg-white p-8 text-center">
        <h2 className="font-display text-2xl">Nothing to review yet</h2>
        <p className="mt-2 text-ink-soft">Complete a lesson and its questions will appear here for spaced review.</p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-forest-800 px-5 py-2.5 font-semibold text-paper">
          Go to the map
        </Link>
      </div>
    );
  }

  if (!started) {
    const wrongCount = set.filter(({ question }) => p.questions[question.id]?.last === "wrong").length;
    return (
      <div className="rounded-3xl border border-sand bg-white p-8">
        <h2 className="font-display text-2xl">{set.length} questions ready</h2>
        <p className="mt-2 text-ink-soft">
          {wrongCount > 0 ? `${wrongCount} you found tricky last time, plus some from lessons you've finished.` : "A quick retrieval workout from lessons you've finished."} Retrieval practice is one of the best-evidenced ways to make learning stick.
        </p>
        <button onClick={() => setStarted(true)} className="mt-6 rounded-full bg-forest-800 px-6 py-3 font-semibold text-paper">
          Start review
        </button>
      </div>
    );
  }

  if (done !== null) {
    return (
      <div className="rounded-3xl border border-sand bg-white p-8 text-center">
        <h2 className="font-display text-3xl">Review complete</h2>
        <p className="mt-2 text-ink-soft">{Math.round(done * 100)}% right first time. +15 XP for showing up.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => { setDone(null); setRound(round + 1); }} className="rounded-full bg-forest-800 px-5 py-2.5 font-semibold text-paper">
            Another round
          </button>
          <Link href="/dashboard" className="rounded-full border border-sand px-5 py-2.5 font-semibold">
            Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2 text-xs text-ink-soft">
        {set.map(({ lesson, question }) => (
          <span key={question.id} className="rounded-full bg-paper-2 px-2 py-0.5">
            {lesson.title}
          </span>
        ))}
      </div>
      <Quiz
        key={round}
        questions={set.map((s) => s.question)}
        onComplete={(score) => {
          addXp(15, "Completed a review session");
          setDone(score);
        }}
      />
    </div>
  );
}
