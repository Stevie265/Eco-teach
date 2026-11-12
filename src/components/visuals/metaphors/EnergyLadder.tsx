"use client";

import { useState } from "react";
import { motion } from "motion/react";

/** Metaphor: an energy ladder. Each rung is denser and more flexible than the last. */
const RUNGS = [
  { id: "muscle", label: "Muscle", emoji: "💪", color: "#e0832a", gain: "Your own body, animals", density: null as number | null },
  { id: "wood", label: "Wood & biomass", emoji: "🔥", color: "#b5762a", gain: "Heat on demand", density: 16 },
  { id: "wind-water", label: "Wind & water", emoji: "🌬️", color: "#4fb3e8", gain: "Mechanical work without muscle", density: null },
  { id: "coal", label: "Coal", emoji: "⛏️", color: "#4a5d6b", gain: "Energy you can carry to any factory", density: 24 },
  { id: "oil-gas", label: "Oil & gas", emoji: "🛢️", color: "#ff6b4a", gain: "Liquid & gas: pumpable, portable", density: 45 },
  { id: "electricity", label: "Electricity", emoji: "⚡", color: "#ffc22e", gain: "Instant, anywhere there's a wire", density: null },
  { id: "renewables", label: "Wind, solar & storage", emoji: "☀️", color: "#2fa560", gain: "Low-carbon, and homes can generate", density: null },
];

export function EnergyLadder() {
  const [rung, setRung] = useState(0);
  const r = RUNGS[rung];
  return (
    <div className="rounded-3xl border-2 border-sand bg-white p-5 shadow-[0_5px_0_#e7ddc9]">
      <div className="flex gap-4">
        {/* ladder */}
        <div className="relative w-28 shrink-0">
          <div className="absolute inset-y-0 left-2 w-2 rounded-full bg-[#8a5a33]" />
          <div className="absolute inset-y-0 right-2 w-2 rounded-full bg-[#8a5a33]" />
          <div className="relative flex flex-col-reverse gap-1.5 py-1">
            {RUNGS.map((x, i) => (
              <button
                key={x.id}
                onClick={() => setRung(i)}
                aria-pressed={rung === i}
                aria-label={x.label}
                className="relative mx-1 flex h-9 items-center justify-center rounded-lg text-lg transition"
                style={{ background: i <= rung ? x.color : "#f4eddf", boxShadow: i === rung ? `0 0 0 3px #13283a` : undefined }}
              >
                {x.emoji}
              </button>
            ))}
          </div>
          <motion.div className="absolute -right-6 text-2xl" initial={false} animate={{ bottom: `${(rung / (RUNGS.length - 1)) * 86 + 2}%` }} transition={{ type: "spring", stiffness: 90, damping: 14 }} aria-hidden>
            🧗
          </motion.div>
        </div>
        {/* detail */}
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-ink-soft">Rung {rung + 1} of {RUNGS.length}</div>
          <motion.div key={r.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            <h4 className="font-display text-2xl" style={{ color: r.color === "#ffc22e" ? "#b37f00" : r.color }}>
              {r.emoji} {r.label}
            </h4>
            <p className="mt-1 text-[15px]">
              <strong>Unlocked:</strong> {r.gain}
            </p>
          </motion.div>
          <div className="mt-4">
            <div className="mb-1 text-xs font-bold text-ink-soft">Energy packed into each kilogram of fuel (typical, approx.)</div>
            {RUNGS.filter((x) => x.density).map((x) => (
              <div key={x.id} className="mb-1.5 flex items-center gap-2 text-xs font-semibold">
                <span className="w-20 truncate">{x.label.split(" ")[0]}</span>
                <div className="h-3 flex-1 rounded-full bg-paper-2">
                  <motion.div className="h-3 rounded-full" style={{ background: x.color }} initial={{ width: 0 }} whileInView={{ width: `${(x.density! / 50) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.9 }} />
                </div>
                <span className="w-14 text-right font-mono">~{x.density} MJ</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button className="btn btn-secondary px-3 py-1.5 text-sm" disabled={rung === 0} onClick={() => setRung(rung - 1)}>
              ↓ Down
            </button>
            <button className="btn btn-primary px-3 py-1.5 text-sm" disabled={rung === RUNGS.length - 1} onClick={() => setRung(rung + 1)}>
              Climb ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
