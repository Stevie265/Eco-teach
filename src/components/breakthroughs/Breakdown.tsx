"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowDown, Check, HelpCircle, RotateCcw } from "lucide-react";
import type { Breakthrough } from "@/content/breakthroughs";
import { markBreakdownStep, resetBreakdown, useHydrated, useProgress } from "@/lib/progress";
import { BreakdownScene } from "./Scenes";

type Mode = "main" | "simpler" | "stuck";

/**
 * Learner-paced breakdown. Nothing moves on until the learner says "Got it".
 * "Not yet" gives the same idea from another, everyday angle; a second "Not yet"
 * reduces it to one sentence and flags the step for review.
 */
export function Breakdown({ b }: { b: Breakthrough }) {
  const hydrated = useHydrated();
  const progress = useProgress();
  const saved = hydrated ? progress.breakdowns?.[b.id] : undefined;
  const got = saved?.got ?? [];
  const help = saved?.help ?? [];

  const firstOpen = b.frames.findIndex((_, i) => !got.includes(i));
  const [frame, setFrame] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>("main");
  const [openTerm, setOpenTerm] = useState<string | null>(null);

  const total = b.frames.length;
  const allDone = got.length >= total;
  // Before the learner acts, resume where they left off
  const current = frame ?? (allDone ? total : Math.max(0, firstOpen));
  const showRecap = current >= total;

  function go(i: number) {
    setFrame(i);
    setMode("main");
    setOpenTerm(null);
  }

  function understood() {
    markBreakdownStep(b.id, current, true);
    go(current + 1);
  }

  function notYet() {
    if (mode === "main") {
      setMode("simpler");
    } else {
      markBreakdownStep(b.id, current, false);
      setMode("stuck");
    }
  }

  return (
    <div className="plate overflow-hidden rounded-3xl" data-breakdown>
      {/* header: progress through the ideas */}
      <div className="flex items-center gap-3 border-b-[1.5px] border-ink px-4 py-2.5">
        <span className="readout shrink-0 text-[10px] font-bold">{showRecap ? "Recap" : `Idea ${current + 1} of ${total}`}</span>
        <div className="flex flex-1 gap-1" aria-label="Your progress">
          {b.frames.map((x, i) => {
            const isGot = got.includes(i);
            const reachable = isGot || i === current;
            return (
              <button
                key={i}
                disabled={!reachable}
                onClick={() => go(i)}
                aria-label={`Idea ${i + 1}: ${x.title}${isGot ? " (understood)" : ""}`}
                className="grid h-4 flex-1 place-items-center rounded-[3px] border-[1.5px] border-ink transition disabled:cursor-default"
                style={{ background: isGot ? b.color : i === current ? "#fff3c4" : "#fffdf7" }}
              >
                {isGot && <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />}
              </button>
            );
          })}
        </div>
      </div>

      {showRecap ? (
        <Recap b={b} help={help} onRevisit={go} onRestart={() => { resetBreakdown(b.id); go(0); }} />
      ) : (
        <>
          <div className="relative" style={{ background: b.tint }}>
            <div className="halftone pointer-events-none absolute inset-0 opacity-50" />
            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28 }}>
                <BreakdownScene id={b.id} frame={current} className="relative mx-auto block aspect-[8/5] w-full max-w-xl" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="border-t-[1.5px] border-ink p-4 sm:p-5">
            <Step b={b} i={current} mode={mode} openTerm={openTerm} setOpenTerm={setOpenTerm} />

            <div className="mt-5 grid grid-cols-2 gap-3">
              {mode === "stuck" ? (
                <>
                  <button className="btn btn-secondary text-[15px]" onClick={() => go(current + 1)}>
                    Skip for now
                  </button>
                  <button className="btn btn-primary text-[15px]" onClick={understood}>
                    <Check className="h-4 w-4" /> Got it now
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-secondary text-[15px]" onClick={notYet}>
                    <HelpCircle className="h-4 w-4" /> {mode === "main" ? "Not yet" : "Still unclear"}
                  </button>
                  <button className="btn btn-primary text-[15px]" onClick={understood}>
                    <Check className="h-4 w-4" /> Got it
                  </button>
                </>
              )}
            </div>
            {current > 0 && (
              <button className="mt-3 w-full text-center text-sm font-semibold text-ink-soft underline-offset-2 hover:underline" onClick={() => go(current - 1)}>
                ← Back to the previous idea
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Step({ b, i, mode, openTerm, setOpenTerm }: { b: Breakthrough; i: number; mode: Mode; openTerm: string | null; setOpenTerm: (t: string | null) => void }) {
  const f = b.frames[i];
  return (
    <AnimatePresence mode="wait">
      <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} aria-live="polite">
        <h3 className="font-display text-xl leading-tight text-ink">{f.title}</h3>
        <p className="t-body mt-2 text-ink">{f.caption}</p>

        {f.terms && f.terms.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {f.terms.map((t) => (
              <button
                key={t.term}
                onClick={() => setOpenTerm(openTerm === t.term ? null : t.term)}
                aria-expanded={openTerm === t.term}
                className="rounded-full border-[1.5px] border-ink bg-paper px-3 py-1 text-sm font-semibold"
              >
                What does &ldquo;{t.term.toLowerCase()}&rdquo; mean?
              </button>
            ))}
          </div>
        )}
        <AnimatePresence>
          {openTerm && f.terms?.find((t) => t.term === openTerm) && (
            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 overflow-hidden rounded-xl border-[1.5px] border-dashed border-ink bg-white px-3 py-2 text-[15px]">
              <strong>{openTerm}:</strong> {f.terms.find((t) => t.term === openTerm)!.meaning}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mode !== "main" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-2xl border-[1.5px] border-ink p-4" style={{ background: b.tint }}>
              <div className="readout text-[10px] font-bold" style={{ color: b.color }}>
                Another way to think about it
              </div>
              <p className="t-body mt-1 text-ink">{f.simpler}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {mode === "stuck" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-2xl border-[1.5px] border-ink bg-sun p-4">
              <div className="readout text-[10px] font-bold">If you remember one thing</div>
              <p className="font-display mt-1 text-lg leading-snug text-ink">{f.takeaway}</p>
              <p className="mt-2 text-sm text-ink-soft">That&apos;s genuinely enough to follow the rest. We&apos;ll mark this idea so you can come back to it.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

function Recap({ b, help, onRevisit, onRestart }: { b: Breakthrough; help: number[]; onRevisit: (i: number) => void; onRestart: () => void }) {
  return (
    <div className="p-4 sm:p-5">
      <h3 className="font-display text-xl leading-tight text-ink">You&apos;ve got the basics of {b.name.toLowerCase()}</h3>
      <p className="t-body mt-1 text-ink-soft">The whole idea in {b.frames.length} lines:</p>
      <ol className="mt-4 space-y-2.5">
        {b.frames.map((f, i) => (
          <li key={i} className="flex gap-3">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border-[1.5px] border-ink text-xs font-bold text-white" style={{ background: b.color }}>
              {i + 1}
            </span>
            <div className="flex-1">
              <p className="text-[15px] leading-snug text-ink">{f.takeaway}</p>
              {help.includes(i) && (
                <button onClick={() => onRevisit(i)} className="mt-1 text-sm font-semibold underline underline-offset-2" style={{ color: b.color }}>
                  This one was tricky. Look again
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button className="btn btn-secondary text-[15px]" onClick={onRestart}>
          <RotateCcw className="h-4 w-4" /> Start again
        </button>
        <a href="#breakthrough" className="btn btn-primary text-[15px]">
          Read on <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
