"use client";

import { motion } from "motion/react";

/**
 * Schematic (not data): new energy sources stacking on top of old ones.
 * Layers grow in sequence as the sketch scrolls into view.
 */
const LAYERS = [
  { label: "Biomass", color: "#c9965a", d: "M0 200 L0 170 C80 168 160 166 240 164 S400 160 480 158 L480 200Z" },
  { label: "Coal", color: "#4a5d6b", d: "M0 170 C80 168 120 160 160 150 S300 120 480 110 L480 158 C400 160 320 162 240 164 S80 168 0 170Z" },
  { label: "Oil", color: "#ff6b4a", d: "M200 146 C260 136 320 110 360 92 S440 64 480 58 L480 110 C400 114 320 122 260 136 S220 144 200 146Z" },
  { label: "Gas", color: "#4fb3e8", d: "M300 116 C340 100 380 80 410 64 S460 44 480 38 L480 58 C440 64 400 76 360 92 S320 110 300 116Z" },
  { label: "Renewables", color: "#2fa560", d: "M420 58 C440 50 460 36 480 26 L480 38 C460 44 440 52 420 58Z" },
];

export function AdditionsSketch() {
  return (
    <div className="rounded-3xl plate bg-white p-5">
      <svg viewBox="0 0 480 220" className="w-full" role="img" aria-label="Schematic: each new energy source stacks on top of the old ones as total use grows">
        {LAYERS.map((l, i) => (
          <motion.path key={l.label} d={l.d} fill={l.color} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 + i * 0.35, duration: 0.6 }} />
        ))}
        <line x1="0" y1="200" x2="480" y2="200" stroke="#13283a" strokeWidth="2" />
        <text x="0" y="216" fontSize="11" fill="#4a5d6b" fontWeight="700">1800</text>
        <text x="480" y="216" fontSize="11" fill="#4a5d6b" fontWeight="700" textAnchor="end">Today</text>
        <text x="8" y="20" fontSize="11" fill="#4a5d6b" fontWeight="700">Total energy use ↑</text>
      </svg>
      <div className="mt-2 flex flex-wrap gap-3 text-xs font-bold">
        {LAYERS.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded" style={{ background: l.color }} /> {l.label}
          </span>
        ))}
      </div>
      <p className="mt-3 rounded-xl bg-paper-2 px-3 py-2 text-xs text-ink-soft">
        <strong>Schematic: shape only, not data.</strong> For the real global chart, see Our World in Data&apos;s &ldquo;Energy Production and Consumption&rdquo;.
      </p>
    </div>
  );
}
