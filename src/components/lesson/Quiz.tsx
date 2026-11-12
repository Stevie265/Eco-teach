"use client";

import { useState } from "react";
import { Check, Lightbulb, X } from "lucide-react";
import type { QuizQuestion } from "@/content/types";
import { recordAnswer } from "@/lib/progress";

/**
 * Adaptive knowledge check: a wrong answer reveals the explanation, offers a
 * simpler re-explanation, and lets the learner try again. Score counts first-try answers.
 */
export function Quiz({ questions, onComplete }: { questions: QuizQuestion[]; onComplete: (score: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [tries, setTries] = useState(0);
  const [firstTryRight, setFirstTryRight] = useState(0);
  const [showSimpler, setShowSimpler] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = questions[idx];
  const isRight = picked === q?.correct;

  function choose(id: string) {
    if (picked && isRight) return;
    const correct = id === q.correct;
    const firstTry = tries === 0;
    setPicked(id);
    setTries(tries + 1);
    recordAnswer(q.id, correct, firstTry);
    if (correct && firstTry) setFirstTryRight((n) => n + 1);
    if (!correct) setShowSimpler(false);
  }

  function next() {
    if (idx + 1 >= questions.length) {
      setFinished(true);
      onComplete(firstTryRight / questions.length);
      return;
    }
    setIdx(idx + 1);
    setPicked(null);
    setTries(0);
    setShowSimpler(false);
  }

  if (finished) {
    const pct = Math.round((firstTryRight / questions.length) * 100);
    return (
      <div className="animate-rise rounded-2xl card-chunky bg-white p-6 text-center">
        <div className="font-display text-5xl text-forest-800">{pct}%</div>
        <p className="mt-2 text-ink-soft">
          {firstTryRight} of {questions.length} right first time.{" "}
          {pct === 100 ? "Excellent: concept mastered." : pct >= 67 ? "Solid. Anything you missed is now in your review queue." : "Worth revisiting. The questions you missed are in your review queue, with simpler explanations."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl card-chunky bg-white p-4 sm:p-6">
      <div className="mb-3 flex items-center justify-between text-xs text-ink-soft">
        <span>
          Question {idx + 1} of {questions.length}
        </span>
        <span className="flex gap-1">
          {questions.map((_, i) => (
            <span key={i} className={`h-1.5 w-6 rounded-full ${i < idx ? "bg-moss-500" : i === idx ? "bg-forest-700" : "bg-sand"}`} />
          ))}
        </span>
      </div>
      <h4 className="font-display mb-4 text-xl leading-snug text-ink sm:text-2xl">{q.prompt}</h4>
      <div className="space-y-2" role="radiogroup" aria-label="Answer options">
        {q.options.map((o) => {
          const chosen = picked === o.id;
          const right = chosen && o.id === q.correct;
          const wrong = chosen && o.id !== q.correct;
          return (
            <button
              key={o.id}
              role="radio"
              aria-checked={chosen}
              onClick={() => choose(o.id)}
              disabled={!!picked && isRight}
              className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left text-[15px] transition ${
                right ? "border-moss-500 bg-moss-100" : wrong ? "border-ember bg-ember-soft" : "border-sand bg-paper hover:border-moss-400"
              }`}
            >
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${right ? "border-moss-500 bg-moss-500 text-white" : wrong ? "border-ember bg-ember text-white" : "border-ink-soft/40 text-ink-soft"}`}>
                {right ? <Check className="h-3.5 w-3.5" /> : wrong ? <X className="h-3.5 w-3.5" /> : o.id.toUpperCase()}
              </span>
              {o.text}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="animate-rise mt-4 space-y-3" role="status" aria-live="polite">
          {isRight ? (
            <div className="rounded-xl bg-moss-100 p-4 text-[15px]">
              <strong className="text-forest-700">{tries === 1 ? "Correct. " : "That's it. "}</strong>
              {q.explanation}
            </div>
          ) : (
            <div className="rounded-xl bg-ember-soft p-4 text-[15px]">
              <strong className="text-[#8a3511]">Not quite. </strong>
              Have another go.
              {!showSimpler && (
                <button onClick={() => setShowSimpler(true)} className="mt-2 flex items-center gap-1.5 font-semibold text-forest-700 underline underline-offset-4">
                  <Lightbulb className="h-4 w-4" /> Explain it a different way
                </button>
              )}
            </div>
          )}
          {!isRight && showSimpler && (
            <div className="animate-rise rounded-xl border-l-4 border-sun bg-[#fdf3dc] p-4 text-[15px]">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#8a6200]">Another way to see it</div>
              {q.simpler}
            </div>
          )}
          {isRight && (
            <button onClick={next} className="btn btn-primary text-sm">
              {idx + 1 >= questions.length ? "See result" : "Next question →"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
