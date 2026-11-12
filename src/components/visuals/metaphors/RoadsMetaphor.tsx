"use client";

import { useState } from "react";

/** Metaphor: transmission = motorways, substations = junctions, distribution = local roads, homes = driveways. */
export function RoadsMetaphor() {
  const [twoWay, setTwoWay] = useState(false);
  return (
    <div className="rounded-3xl border-2 border-sand bg-white p-5 shadow-[0_5px_0_#e7ddc9]">
      <svg viewBox="0 0 340 210" className="w-full" role="img" aria-label="The grid as a road network: motorways, junctions, local roads and driveways">
        <rect width="340" height="210" rx="16" fill="#e9f6e2" />
        {/* motorway */}
        <rect x="0" y="34" width="340" height="30" fill="#5d6f7c" />
        <path d="M0 49h340" stroke="#fff" strokeWidth="2" strokeDasharray="12 10" />
        <text x="10" y="26" fontSize="11" fontWeight="800" fill="#13283a">MOTORWAY = transmission (275–400 kV)</text>
        {/* junction */}
        <circle cx="170" cy="96" r="16" fill="#ffd23f" stroke="#13283a" strokeWidth="2" />
        <rect x="163" y="64" width="14" height="18" fill="#5d6f7c" />
        <text x="192" y="100" fontSize="10" fontWeight="800" fill="#13283a">JUNCTION = substation</text>
        {/* local roads */}
        <path d="M170 112 V150 M170 150 H60 M170 150 H290 M60 150 V176 M120 150 V176 M230 150 V176 M290 150 V176" stroke="#9fb3c2" strokeWidth="9" fill="none" strokeLinecap="round" />
        <text x="12" y="140" fontSize="10" fontWeight="800" fill="#13283a">LOCAL ROADS = distribution</text>
        {/* houses */}
        {[60, 120, 230, 290].map((x, i) => (
          <g key={x} transform={`translate(${x} 190)`}>
            <path d="M-12 4 V-6 L0 -16 L12 -6 V4Z" fill="#fff" stroke="#13283a" strokeWidth="1.5" />
            {twoWay && i % 2 === 0 && <rect x="-8" y="-13" width="8" height="4" fill="#2a7fc0" transform="rotate(-38 -4 -11)" />}
          </g>
        ))}
        {/* traffic = power */}
        <g className="drive-in">
          {[0, 1, 2].map((i) => (
            <circle key={i} r="4" fill="#ff6b4a">
              <animateMotion dur="3s" begin={`${i}s`} repeatCount="indefinite" path="M0 44 H170 V150 H60 V176" />
            </circle>
          ))}
        </g>
        {twoWay &&
          [0, 1].map((i) => (
            <circle key={`out${i}`} r="4" fill="#2fa560">
              <animateMotion dur="3s" begin={`${i * 1.5}s`} repeatCount="indefinite" path="M230 176 V150 H170 V112" />
            </circle>
          ))}
      </svg>
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex gap-3 text-xs font-bold">
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-ember" /> Power to homes
          </span>
          {twoWay && (
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-moss-500" /> Power from homes
            </span>
          )}
        </div>
        <button onClick={() => setTwoWay(!twoWay)} className={`btn px-3 py-2 text-sm ${twoWay ? "btn-primary" : "btn-secondary"}`}>
          {twoWay ? "Back to one-way" : "Add rooftop solar →"}
        </button>
      </div>
      <p className="mt-3 text-sm text-ink-soft">
        {twoWay ? "Now some driveways send traffic back onto the local roads. Those roads weren't designed for two-way flow, so they need active traffic management." : "In the centralised era, traffic only flowed one way: from the motorway, through junctions, down local roads to each driveway."}
      </p>
    </div>
  );
}
