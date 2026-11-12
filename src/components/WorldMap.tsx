"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Clock, Lock } from "lucide-react";
import { WORLDS, totalMinutes } from "@/content/worlds";
import { useHydrated, useProgress } from "@/lib/progress";
import { worldProgress } from "@/lib/curriculum";
import { WorldGlyph } from "./ui/WorldGlyph";

// Positions on a 1000×560 canvas: a winding path from history (left) to opportunities (right)
const POS: Record<string, [number, number]> = {
  history: [80, 420],
  "energy-system": [210, 250],
  climate: [250, 470],
  pestel: [400, 380],
  technology: [400, 140],
  business: [560, 260],
  startups: [690, 110],
  "future-home": [700, 410],
  foresight: [840, 290],
  opportunities: [930, 120],
};

export function WorldMap() {
  const p = useProgress();
  const hydrated = useHydrated();
  const [hover, setHover] = useState<string | null>(null);
  const edges = WORLDS.flatMap((w) => w.connects.map((c) => [w.id, c] as const));
  const recommended = hydrated ? p.profile?.recommended.worldId : undefined;

  return (
    <div className="relative">
      {/* Desktop/tablet constellation */}
      <div className="hidden rounded-[28px] bg-forest-900 p-4 shadow-xl shadow-forest-900/20 md:block">
        <svg viewBox="0 0 1000 560" className="w-full" role="img" aria-labelledby="map-title">
          <title id="map-title">Map of the ten connected learning worlds</title>
          <defs>
            <radialGradient id="glow">
              <stop offset="0%" stopColor="#c6e66a" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#c6e66a" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* backdrop contours */}
          {[0, 1, 2, 3].map((k) => (
            <path key={k} d={`M0 ${480 - k * 110} C 250 ${380 - k * 110}, 500 ${560 - k * 110}, 1000 ${400 - k * 110}`} stroke="#1d4d38" strokeWidth="1" fill="none" opacity="0.6" />
          ))}
          {edges.map(([a, b]) => {
            const [x1, y1] = POS[a];
            const [x2, y2] = POS[b];
            const lit = hover === a || hover === b;
            return (
              <line key={`${a}-${b}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={lit ? "#c6e66a" : "#3d8b5d"} strokeWidth={lit ? 2.5 : 1.5} strokeDasharray={lit ? "0" : "4 6"} opacity={lit ? 1 : 0.6} />
            );
          })}
          {WORLDS.map((w) => {
            const [x, y] = POS[w.id];
            const wp = worldProgress(w, p);
            const r = 38;
            const circ = 2 * Math.PI * (r + 6);
            return (
              <Link key={w.id} href={`/worlds/${w.id}`} aria-label={`World ${w.number}: ${w.title}`}>
                <g onMouseEnter={() => setHover(w.id)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(w.id)} onBlur={() => setHover(null)} className="cursor-pointer">
                  {(hover === w.id || recommended === w.id) && <circle cx={x} cy={y} r={r + 34} fill="url(#glow)" />}
                  <circle cx={x} cy={y} r={r + 6} fill="none" stroke="#1d4d38" strokeWidth="4" />
                  {hydrated && wp.done > 0 && (
                    <circle cx={x} cy={y} r={r + 6} fill="none" stroke="#c6e66a" strokeWidth="4" strokeDasharray={`${circ * wp.pct} ${circ}`} transform={`rotate(-90 ${x} ${y})`} strokeLinecap="round" />
                  )}
                  <circle cx={x} cy={y} r={r} fill={w.tint} style={{ transition: "transform .2s", transformOrigin: `${x}px ${y}px`, transform: hover === w.id ? "scale(1.08)" : undefined }} />
                  <g transform={`translate(${x - 20} ${y - 20})`}>
                    <foreignObject width="40" height="40">
                      <WorldGlyph glyph={w.glyph} color={w.color} className="h-10 w-10" />
                    </foreignObject>
                  </g>
                  <text x={x} y={y + r + 24} textAnchor="middle" fill="#f6f1e7" fontSize="15" fontWeight="600" style={{ fontFamily: "var(--font-sans)" }}>
                    {w.title}
                  </text>
                  <text x={x} y={y + r + 41} textAnchor="middle" fill="#8fc6a1" fontSize="11.5" style={{ fontFamily: "var(--font-mono)" }}>
                    {String(w.number).padStart(2, "0")} · {w.lessons.length} lessons
                  </text>
                  {recommended === w.id && (
                    <text x={x} y={y - r - 16} textAnchor="middle" fill="#c6e66a" fontSize="11" fontWeight="700" letterSpacing="1.5">
                      START HERE
                    </text>
                  )}
                </g>
              </Link>
            );
          })}
        </svg>
        <p className="px-3 pb-2 text-xs text-moss-300">
          Dotted lines show how the worlds feed each other. Hover a world to light up its connections. Science → technology → business → customer → opportunity.
        </p>
      </div>

      {/* Card grid (all sizes) */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WORLDS.map((w) => {
          const wp = worldProgress(w, p);
          return (
            <Link
              key={w.id}
              href={`/worlds/${w.id}`}
              className="group relative overflow-hidden rounded-3xl border border-sand bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-70 transition group-hover:scale-110" style={{ background: w.tint }} />
              <div className="relative">
                <div className="mb-3 flex items-center justify-between">
                  <WorldGlyph glyph={w.glyph} color={w.color} className="h-10 w-10" />
                  <span className="font-mono text-xs text-ink-soft">World {String(w.number).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display text-xl text-ink">{w.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{w.tagline}</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-paper-2">
                  <div className="h-full rounded-full transition-all" style={{ width: `${hydrated ? wp.pct * 100 : 0}%`, background: w.color }} />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-ink-soft">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> ~{Math.round(totalMinutes(w) / 6) / 10} h · {w.lessons.length} lessons
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    {wp.status === "soon" ? (
                      <>
                        <Lock className="h-3.5 w-3.5" /> In development
                      </>
                    ) : hydrated && wp.status === "caught-up" ? (
                      <span className="flex items-center gap-1 text-moss-500">
                        <Check className="h-3.5 w-3.5" /> {wp.done}/{wp.total} done
                      </span>
                    ) : (
                      <span style={{ color: w.color }}>
                        {hydrated ? wp.done : 0}/{wp.total} · {wp.available} live
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
