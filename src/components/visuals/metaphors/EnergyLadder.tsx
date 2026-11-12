"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Sym } from "../../ui/WorldGlyph";

/** Metaphor: an energy ladder. Each rung is denser and more flexible than the last. */
const RUNGS = [
  { id: "muscle", label: "Muscle", icon: "muscle" as const, color: "#e0832a", gain: "Your own body, animals", density: null as number | null },
  { id: "wood", label: "Wood & biomass", icon: "flame" as const, color: "#b5762a", gain: "Heat on demand", density: 16 },
  { id: "wind-water", label: "Wind & water", icon: "wind" as const, color: "#4fb3e8", gain: "Mechanical work without muscle", density: null },
  { id: "coal", label: "Coal", icon: "pick" as const, color: "#4a5d6b", gain: "Energy you can carry to any factory", density: 24 },
  { id: "oil-gas", label: "Oil & gas", icon: "drop" as const, color: "#ff6b4a", gain: "Liquid & gas: pumpable, portable", density: 45 },
  { id: "electricity", label: "Electricity", icon: "bolt" as const, color: "#ffc22e", gain: "Instant, anywhere there's a wire", density: null },
  { id: "renewables", label: "Wind, solar & storage", icon: "sun" as const, color: "#2fa560", gain: "Low-carbon, and homes can generate", density: null },
];

export function EnergyLadder() {
  const [rung, setRung] = useState(0);
  const r = RUNGS[rung];
  return (
    <div className="rounded-3xl plate bg-white p-5">
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
                style={{ background: i <= rung ? x.color : "#efe6d2", boxShadow: i === rung ? `0 0 0 2.5px #1b2a4a` : undefined }}
              >
                <Sym name={x.icon} className="h-5 w-5" color={i <= rung ? "#fff" : "#1b2a4a"} />
              </button>
            ))}
          </div>
          <motion.div className="absolute -right-5 h-4 w-4 rounded-full border-2 border-ink bg-sun" initial={false} animate={{ bottom: `${(rung / (RUNGS.length - 1)) * 86 + 4}%` }} transition={{ type: "spring", stiffness: 90, damping: 14 }} aria-hidden />
        </div>
        {/* detail */}
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-ink-soft">Rung {rung + 1} of {RUNGS.length}</div>
          <motion.div key={r.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            <h4 className="font-display text-2xl" style={{ color: r.color === "#ffc22e" ? "#b37f00" : r.color }}>
              {r.label}
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
