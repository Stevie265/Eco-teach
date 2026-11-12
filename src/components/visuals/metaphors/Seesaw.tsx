"use client";

import { useState } from "react";
import { Sym } from "../../ui/WorldGlyph";
import { motion } from "motion/react";

/** Metaphor: the grid is a seesaw. Supply on one side, demand on the other; frequency is the tilt. */
function Blocks({ n, color, side }: { n: number; color: string; side: "l" | "r" }) {
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => (
        <rect key={i} x={(side === "l" ? 30 : 200) + (i % 4) * 22} y={-22 - Math.floor(i / 4) * 20} width="20" height="18" rx="4" fill={color} stroke="#13283a" strokeWidth="1.5" />
      ))}
    </g>
  )
}

export function Seesaw() {
  const [supply, setSupply] = useState(5);
  const [demand, setDemand] = useState(5);
  const diff = supply - demand;
  const angle = Math.max(-14, Math.min(14, -diff * 4));
  const hz = 50 + diff * 0.1;
  const status = Math.abs(diff) === 0 ? "Balanced: 50 Hz" : diff < 0 ? "Demand heavier → frequency falls" : "Supply heavier → frequency rises";
  const tone = Math.abs(diff) === 0 ? "#2fa560" : Math.abs(diff) <= 2 ? "#f2a20c" : "#ff6b4a";

  return (
    <div className="rounded-3xl plate bg-white p-5">
      <svg viewBox="0 0 320 200" className="w-full" role="img" aria-label={status}>
        {/* dial */}
        <g transform="translate(160 62)">
          <path d="M-50 0 A50 50 0 0 1 50 0" fill="none" stroke="#e7ddc9" strokeWidth="10" strokeLinecap="round" />
          <path d="M-12 -48.5 A50 50 0 0 1 12 -48.5" fill="none" stroke="#2fa560" strokeWidth="10" />
          <motion.line x1="0" y1="0" x2="0" y2="-44" stroke="#13283a" strokeWidth="3" strokeLinecap="round" initial={false} animate={{ rotate: diff * 12 }} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }} />
          <circle r="5" fill="#13283a" />
          <text y="18" textAnchor="middle" fontSize="13" fontWeight="800" fill={tone}>
            {hz.toFixed(1)} Hz
          </text>
        </g>
        {/* seesaw */}
        <path d="M160 190 l-18 0 18 -36 18 36z" fill="#ffd23f" stroke="#13283a" strokeWidth="2" />
        <motion.g initial={false} animate={{ rotate: angle }} style={{ transformBox: "view-box", transformOrigin: "160px 152px" }} transition={{ type: "spring", stiffness: 70, damping: 10 }}>
          <g transform="translate(0 152)">
            <rect x="20" y="0" width="280" height="8" rx="4" fill="#8a5a33" stroke="#13283a" strokeWidth="1.5" />
            <Blocks n={supply} color="#2fa560" side="l" />
            <Blocks n={demand} color="#ff6b4a" side="r" />
          </g>
        </motion.g>
        <text x="60" y="198" fontSize="11" fontWeight="800" fill="#1b8048">SUPPLY</text>
        <text x="228" y="198" fontSize="11" fontWeight="800" fill="#d4472a">DEMAND</text>
      </svg>
      <div className="mt-2 rounded-xl px-3 py-2 text-center text-sm font-extrabold text-white" style={{ background: tone }} role="status" aria-live="polite">
        {status}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="btn btn-secondary px-2 py-2 text-sm" onClick={() => setDemand((d) => Math.min(8, d + 1))}>
          <Sym name="kettle" className="h-4 w-4 shrink-0" /> Half-time kettles
        </button>
        <button className="btn btn-secondary px-2 py-2 text-sm" onClick={() => setSupply((s) => Math.max(1, s - 1))}>
          <Sym name="wind" className="h-4 w-4 shrink-0" /> Wind drops
        </button>
        <button className="btn btn-secondary px-2 py-2 text-sm" onClick={() => setSupply((s) => Math.min(8, s + 1))}>
          <Sym name="battery" className="h-4 w-4 shrink-0" /> Battery kicks in
        </button>
        <button className="btn btn-secondary px-2 py-2 text-sm" onClick={() => setDemand((d) => Math.max(1, d - 1))}>
          <Sym name="car" className="h-4 w-4 shrink-0" /> EVs pause
        </button>
      </div>
      <button className="mt-3 w-full text-sm font-bold text-ink-soft underline" onClick={() => { setSupply(5); setDemand(5); }}>
        Reset
      </button>
    </div>
  );
}
