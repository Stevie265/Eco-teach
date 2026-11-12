"use client";

import { useState } from "react";

/** Animated diagram contrasting one-way centralised flow with two-way distributed flow. */
export function GridEras() {
  const [mode, setMode] = useState<"central" | "distributed">("central");
  const d = mode === "distributed";
  const homes = [
    { x: 330, y: 70 },
    { x: 410, y: 120 },
    { x: 330, y: 170 },
    { x: 410, y: 220 },
    { x: 330, y: 270 },
  ];
  return (
    <div className="rounded-2xl card-chunky bg-white p-4 sm:p-6">
      <div className="mb-4 inline-flex rounded-full bg-paper-2 p-1" role="radiogroup" aria-label="Grid era">
        {(["central", "distributed"] as const).map((m) => (
          <button
            key={m}
            role="radio"
            aria-checked={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${mode === m ? "bg-forest-800 text-paper shadow" : "text-ink-soft"}`}
          >
            {m === "central" ? "Centralised (1950s)" : "Distributed (2030s)"}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 480 330" className="w-full" role="img" aria-label={d ? "Distributed grid with two-way power flows" : "Centralised grid with one-way power flow"}>
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" fill="#d9602e" />
          </marker>
          <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" fill="#3d8b5d" />
          </marker>
        </defs>
        {/* power station */}
        <g>
          <rect x="20" y="130" width="70" height="70" rx="8" fill="#3f4f46" />
          <rect x="34" y="96" width="14" height="36" fill="#3f4f46" />
          <rect x="58" y="106" width="14" height="26" fill="#3f4f46" />
          <text x="55" y="222" textAnchor="middle" fontSize="12" fill="#3f4f46" fontWeight="600">
            {d ? "Fewer big plants" : "Big power station"}
          </text>
        </g>
        {/* transmission */}
        <line x1="90" y1="165" x2="200" y2="165" stroke="#13201a" strokeWidth="5" />
        <text x="145" y="155" textAnchor="middle" fontSize="11" fill="#3f4f46">transmission</text>
        <circle cx="215" cy="165" r="16" fill="#153628" />
        <text x="215" y="200" textAnchor="middle" fontSize="11" fill="#3f4f46">substation</text>
        {/* distribution lines */}
        {homes.map((h, i) => (
          <g key={i}>
            <line x1="231" y1="165" x2={h.x - 18} y2={h.y} stroke="#13201a" strokeWidth="2" opacity="0.5" />
            {/* one-way flow */}
            <line
              x1="240"
              y1="165"
              x2={h.x - 26}
              y2={h.y}
              stroke="#d9602e"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              markerEnd="url(#arr)"
              className="flow"
            />
            {d && i % 2 === 0 && (
              <line x1={h.x - 26} y1={h.y + 8} x2="240" y2="175" stroke="#3d8b5d" strokeWidth="2.5" strokeDasharray="6 8" markerEnd="url(#arr2)" className="flow-rev" />
            )}
            {/* home */}
            <path d={`M${h.x - 16} ${h.y + 4} L${h.x} ${h.y - 12} L${h.x + 16} ${h.y + 4} V${h.y + 20} H${h.x - 16}Z`} fill="#f6f1e7" stroke="#13201a" strokeWidth="1.5" />
            {d && i % 2 === 0 && <rect x={h.x - 10} y={h.y - 6} width="12" height="5" fill="#5aa6c9" transform={`rotate(-38 ${h.x - 4} ${h.y - 4})`} />}
            {d && i === 1 && <rect x={h.x + 20} y={h.y + 4} width="10" height="16" rx="2" fill="#3d8b5d" />}
            {d && i === 3 && <circle cx={h.x + 26} cy={h.y + 14} r="6" fill="#eeb33f" />}
          </g>
        ))}
        {d && (
          <g>
            <text x="440" y="70" fontSize="10" fill="#1f5b78">solar</text>
            <text x="440" y="128" fontSize="10" fill="#286a4c">battery</text>
            <text x="440" y="232" fontSize="10" fill="#8a6200">EV</text>
          </g>
        )}
        <g transform="translate(20 290)">
          <line x1="0" y1="6" x2="24" y2="6" stroke="#d9602e" strokeWidth="2.5" strokeDasharray="6 4" />
          <text x="30" y="10" fontSize="11" fill="#3f4f46">power to homes</text>
          {d && (
            <>
              <line x1="140" y1="6" x2="164" y2="6" stroke="#3d8b5d" strokeWidth="2.5" strokeDasharray="6 4" />
              <text x="170" y="10" fontSize="11" fill="#3f4f46">power from homes (solar, batteries, EVs)</text>
            </>
          )}
        </g>
      </svg>
      <style>{`
        .flow { animation: dash 1.4s linear infinite; }
        .flow-rev { animation: dash 1.4s linear infinite; }
        @keyframes dash { to { stroke-dashoffset: -28; } }
      `}</style>
      <p className="mt-2 text-[15px] text-ink-soft">
        {d
          ? "Many homes now generate, store and shift power. Flows go both ways, and the local network must be actively managed."
          : "A few large power stations push power one way, down through the network, to passive consumers."}
      </p>
    </div>
  );
}
