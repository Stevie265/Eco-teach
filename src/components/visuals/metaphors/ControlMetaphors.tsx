"use client";

import { useState } from "react";
import { motion } from "motion/react";

/** Everyday metaphors for HEMS, DRMS, VPP and DERMS, each with a small animated scene. */
const CARDS = [
  {
    id: "hems",
    name: "HEMS",
    metaphor: "A personal trainer",
    color: "#f2a20c",
    line: "Works for one household. Plans the day so you hit your goals (low bills, warm home, car charged) with the least effort.",
  },
  {
    id: "drms",
    name: "DRMS",
    metaphor: "A coach running a fitness challenge",
    color: "#2fa560",
    line: "Signs lots of people up, announces 'tomorrow 5–6pm: take it easy!', then checks who did it and hands out rewards.",
  },
  {
    id: "vpp",
    name: "VPP",
    metaphor: "A choir conductor",
    color: "#2a8fd6",
    line: "Thousands of small voices (batteries, EVs) sing together so they sound like one big instrument, loud enough to perform in the market.",
  },
  {
    id: "derms",
    name: "DERMS",
    metaphor: "Traffic control for local streets",
    color: "#4a68d8",
    line: "Doesn't care whose car it is. Its job is to stop the local roads (cables, transformers) from jamming or overloading.",
  },
];

export function ControlMetaphors() {
  const [active, setActive] = useState("vpp");
  const c = CARDS.find((x) => x.id === active)!;
  return (
    <div className="rounded-3xl border-2 border-sand bg-white p-5 shadow-[0_5px_0_#e7ddc9]">
      <div className="grid grid-cols-4 gap-2" role="tablist" aria-label="Metaphors">
        {CARDS.map((x) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={active === x.id}
            onClick={() => setActive(x.id)}
            className="rounded-xl py-2 font-mono text-xs font-extrabold transition sm:text-sm"
            style={{ background: active === x.id ? x.color : "#f4eddf", color: active === x.id ? "#fff" : "#4a5d6b", boxShadow: active === x.id ? `0 3px 0 #13283a33` : undefined }}
          >
            {x.name}
          </button>
        ))}
      </div>
      <div className="mt-4 h-40 rounded-2xl" style={{ background: `${c.color}18` }}>
        <Scene id={active} color={c.color} />
      </div>
      <motion.div key={c.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
        <div className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: c.color }}>
          {c.name} is like…
        </div>
        <h4 className="font-display text-2xl">{c.metaphor}</h4>
        <p className="mt-1 text-[15px] text-ink-soft">{c.line}</p>
      </motion.div>
    </div>
  );
}

function Scene({ id, color }: { id: string; color: string }) {
  if (id === "vpp") {
    // many small dots converge into one big "power plant"
    const dots = Array.from({ length: 24 }, (_, i) => ({ x: 20 + (i % 8) * 38, y: 20 + Math.floor(i / 8) * 40 }));
    return (
      <svg viewBox="0 0 320 160" className="h-full w-full" aria-hidden>
        {dots.map((d, i) => (
          <motion.circle
            key={i}
            r="7"
            fill={color}
            initial={{ cx: d.x, cy: d.y, opacity: 0.9 }}
            animate={{ cx: [d.x, 160, 160, d.x], cy: [d.y, 80, 80, d.y], opacity: [0.9, 0.2, 0.2, 0.9] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.7, 1], delay: i * 0.02 }}
          />
        ))}
        <motion.circle cx="160" cy="80" fill={color} initial={{ r: 0 }} animate={{ r: [0, 34, 34, 0] }} transition={{ duration: 4, repeat: Infinity, times: [0.1, 0.45, 0.7, 1] }} />
        <motion.text x="160" y="85" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 4, repeat: Infinity, times: [0.3, 0.45, 0.7, 0.8] }}>
          50 MW
        </motion.text>
      </svg>
    );
  }
  if (id === "hems") {
    return (
      <svg viewBox="0 0 320 160" className="h-full w-full" aria-hidden>
        <path d="M110 120 V80 L160 44 L210 80 V120Z" fill="#fff" stroke="#13283a" strokeWidth="2.5" />
        {[
          ["🚗", 80, 130],
          ["♨️", 236, 130],
          ["🔋", 236, 70],
          ["☀️", 84, 60],
        ].map(([e, x, y], i) => (
          <g key={i}>
            <motion.line x1="160" y1="92" x2={x as number} y2={(y as number) - 6} stroke={color} strokeWidth="2.5" strokeDasharray="4 5" animate={{ strokeDashoffset: [0, -18] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
            <text x={x as number} y={y as number} fontSize="22" textAnchor="middle">
              {e}
            </text>
          </g>
        ))}
        <circle cx="160" cy="92" r="14" fill={color} />
        <text x="160" y="97" fontSize="12" textAnchor="middle" fill="#fff" fontWeight="800">
          H
        </text>
      </svg>
    );
  }
  if (id === "drms") {
    return (
      <svg viewBox="0 0 320 160" className="h-full w-full" aria-hidden>
        <rect x="120" y="14" width="80" height="34" rx="10" fill={color} />
        <text x="160" y="36" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">
          5–6pm: ease off
        </text>
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={i} transform={`translate(${30 + i * 29} 112)`}>
            <path d="M-10 18 V4 L0 -6 L10 4 V18Z" fill="#fff" stroke="#13283a" strokeWidth="1.5" />
            <motion.text y="-12" textAnchor="middle" fontSize="13" animate={{ opacity: [0, 1, 1, 0], y: [-6, -16, -16, -6] }} transition={{ duration: 3, repeat: Infinity, delay: 0.6 + i * 0.12 }}>
              ⭐
            </motion.text>
          </g>
        ))}
        <motion.path d="M160 48 V80" stroke={color} strokeWidth="3" strokeDasharray="4 4" animate={{ strokeDashoffset: [0, -16] }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />
      </svg>
    );
  }
  // derms: traffic lights on a street of solar homes
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full" aria-hidden>
      <rect x="0" y="110" width="320" height="18" fill="#9fb3c2" />
      {[40, 100, 220, 280].map((x) => (
        <g key={x} transform={`translate(${x} 104)`}>
          <path d="M-14 0 V-18 L0 -30 L14 -18 V0Z" fill="#fff" stroke="#13283a" strokeWidth="1.5" />
          <rect x="-10" y="-26" width="9" height="5" fill="#2a7fc0" transform="rotate(-40 -6 -24)" />
        </g>
      ))}
      <g transform="translate(160 40)">
        <rect x="-12" y="-4" width="24" height="64" rx="6" fill="#13283a" />
        <motion.circle cy="8" r="7" animate={{ fill: ["#ff6b4a", "#4a1b10", "#4a1b10", "#ff6b4a"] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.circle cy="28" r="7" animate={{ fill: ["#4a3a00", "#ffc22e", "#4a3a00", "#4a3a00"] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.circle cy="48" r="7" animate={{ fill: ["#0d3a1f", "#0d3a1f", "#2fa560", "#0d3a1f"] }} transition={{ duration: 4, repeat: Infinity }} />
        <rect x="-2" y="60" width="4" height="10" fill="#13283a" />
      </g>
      {[0, 1, 2].map((i) => (
        <motion.circle key={i} cy="119" r="5" fill="#2fa560" animate={{ cx: [0, 140, 140, 320] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.4, times: [0, 0.35, 0.6, 1] }} />
      ))}
    </svg>
  );
}
