"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Breakthrough } from "@/content/breakthroughs";
import { BreakdownScene } from "./Scenes";

/** The four-frame illustrated step-through. Swipe, tap the steps, or use the buttons. */
export function Breakdown({ b }: { b: Breakthrough }) {
  const [frame, setFrame] = useState(0);
  const last = b.frames.length - 1;
  const f = b.frames[frame];

  return (
    <div className="plate overflow-hidden rounded-3xl" data-breakdown>
      <div className="flex items-center justify-between border-b-[1.5px] border-ink px-4 py-2">
        <span className="readout text-[10px] font-bold">Breakdown</span>
        <span className="readout text-[10px] font-bold" style={{ color: b.color }}>
          Step {frame + 1} / {b.frames.length}
        </span>
      </div>

      <motion.div
        className="relative touch-pan-y select-none"
        style={{ background: b.tint }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50 && frame < last) setFrame(frame + 1);
          if (info.offset.x > 50 && frame > 0) setFrame(frame - 1);
        }}
      >
        <div className="halftone pointer-events-none absolute inset-0 opacity-50" />
        <AnimatePresence mode="wait">
          <motion.div key={frame} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28 }}>
            <BreakdownScene id={b.id} frame={frame} className="relative mx-auto block aspect-[8/5] w-full max-w-xl" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="border-t-[1.5px] border-ink p-4 sm:p-5">
        <AnimatePresence mode="wait">
          <motion.div key={frame} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} aria-live="polite">
            <h3 className="font-display text-lg leading-tight text-ink sm:text-xl">{f.title}</h3>
            <p className="t-body mt-1 text-ink-soft">{f.caption}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center gap-3">
          <button className="btn btn-secondary shrink-0 px-3" onClick={() => setFrame(Math.max(0, frame - 1))} disabled={frame === 0} aria-label="Previous step">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex flex-1 gap-1.5" role="tablist" aria-label="Steps">
            {b.frames.map((x, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === frame}
                aria-label={`Step ${i + 1}: ${x.title}`}
                onClick={() => setFrame(i)}
                className="h-3 flex-1 rounded-[3px] border-[1.5px] border-ink transition"
                style={{ background: i <= frame ? b.color : "#fffdf7" }}
              />
            ))}
          </div>
          <button className="btn btn-primary shrink-0 px-3" onClick={() => setFrame(Math.min(last, frame + 1))} disabled={frame === last} aria-label="Next step">
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
        <p className="readout mt-2 text-center text-[9px] text-ink-soft sm:hidden">Swipe the picture to step through</p>
      </div>
    </div>
  );
}
