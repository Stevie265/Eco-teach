"use client";

import { useState } from "react";
import { motion } from "motion/react";

/** Metaphor: power is how fast the tap runs; energy is how much water ends up in the bath. */
const PRESETS = [
  { id: "kettle", label: "Kettle", kw: 3, hours: 0.05, note: "Full blast, but only for 3 minutes" },
  { id: "fridge", label: "Fridge", kw: 0.08, hours: 24, note: "A trickle, but all day long" },
  { id: "shower", label: "Electric shower", kw: 9, hours: 0.15, note: "A torrent for 9 minutes" },
];

export function TapAndBath() {
  const [kw, setKw] = useState(3);
  const [hours, setHours] = useState(0.05);
  const kwh = kw * hours;
  const fill = Math.min(1, kwh / 2.5); // bath "holds" 2.5 kWh for the picture
  const flowW = 2 + (kw / 9) * 16;

  return (
    <div className="rounded-3xl plate bg-white p-5">
      <svg viewBox="0 0 320 220" className="w-full" role="img" aria-label={`Tap running at ${kw} kilowatts for ${hours} hours fills the bath with ${kwh.toFixed(2)} kilowatt-hours`}>
        {/* tap */}
        <path d="M60 30h70a14 14 0 0 1 14 14v20" fill="none" stroke="#9fb3c2" strokeWidth="14" strokeLinecap="round" />
        <rect x="40" y="18" width="26" height="26" rx="6" fill="#c9d9e4" />
        <circle cx="53" cy="12" r="9" fill="#ff6b4a" />
        <text x="53" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">
          kW
        </text>
        {/* water stream */}
        {kw > 0 && (
          <motion.rect
            x={144 - flowW / 2}
            y={70}
            width={flowW}
            rx={flowW / 2}
            fill="#4fb3e8"
            initial={false}
            animate={{ height: 150 - 120 * fill - 20, opacity: 0.85 }}
            transition={{ duration: 0.4 }}
          />
        )}
        {/* bath */}
        <defs>
          <clipPath id="bathclip">
            <path d="M40 120h220v50a34 34 0 0 1-34 34H74a34 34 0 0 1-34-34Z" />
          </clipPath>
        </defs>
        <g clipPath="url(#bathclip)">
          <rect x="40" y="120" width="220" height="90" fill="#f4f8fb" />
          <motion.rect x="40" width="220" height="90" fill="#7cc8f2" initial={false} animate={{ y: 204 - 84 * fill }} transition={{ type: "spring", stiffness: 60, damping: 14 }} />
        </g>
        <path d="M34 118h232" stroke="#13283a" strokeWidth="4" strokeLinecap="round" />
        <path d="M40 120h220v50a34 34 0 0 1-34 34H74a34 34 0 0 1-34-34Z" fill="none" stroke="#13283a" strokeWidth="3" />
        <path d="M80 204v10M220 204v10" stroke="#13283a" strokeWidth="4" strokeLinecap="round" />
        <text x="250" y="110" textAnchor="end" fontSize="11" fontWeight="800" fill="#2a7fc0">
          kWh in the bath
        </text>
      </svg>

      <div className="mt-2 grid grid-cols-2 gap-3 text-center">
        <div className="rounded-2xl bg-ember-soft p-3">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#b03d22]">Power (tap)</div>
          <div className="font-display text-3xl text-[#b03d22]">{kw} kW</div>
        </div>
        <div className="rounded-2xl bg-sky-soft p-3">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-sky-deep">Energy (bath)</div>
          <div className="font-display text-3xl text-sky-deep">{kwh.toFixed(2)} kWh</div>
        </div>
      </div>

      <label className="mt-4 block text-sm font-bold">
        How far the tap is open: {kw} kW
        <input type="range" className="eco-range mt-2 w-full" min={0} max={9} step={0.01} value={kw} onChange={(e) => setKw(Number(e.target.value))} />
      </label>
      <label className="mt-3 block text-sm font-bold">
        How long it runs: {hours < 1 ? `${Math.round(hours * 60)} min` : `${hours.toFixed(1)} h`}
        <input type="range" className="eco-range mt-2 w-full" min={0} max={24} step={0.05} value={hours} onChange={(e) => setHours(Number(e.target.value))} />
      </label>
      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setKw(p.kw);
              setHours(p.hours);
            }}
            className="btn btn-secondary px-3 py-2 text-sm"
            title={p.note}
          >
            {p.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-ink-soft">Try the kettle, then the fridge. The fridge&apos;s tiny trickle fills more of the bath over a day than the kettle&apos;s blast.</p>
    </div>
  );
}
