"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Breakthrough Breakdown scenes: one illustrated system per technology,
 * drawn in the "Current" style (ink outlines, spot inks, halftone shade).
 * Each scene takes a frame index 0–3 and builds the idea up step by step.
 */
const INK = "#1b2a4a";
const PAPER = "#fffdf7";
const sw = { stroke: INK, strokeWidth: 2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

function Label({ x, y, children, anchor = "middle", color = INK, size = 9 }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end"; color?: string; size?: number }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={700} fill={color} stroke={PAPER} strokeWidth={3} strokeLinejoin="round" paintOrder="stroke" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
      {children}
    </text>
  );
}

function Arrow({ d, color = INK, width = 2.5, dash, animate }: { d: string; color?: string; width?: number; dash?: string; animate?: boolean }) {
  return (
    <>
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={dash} className={animate ? "energy-flow" : undefined} markerEnd={`url(#arrow-${color.replace("#", "")})`} />
    </>
  );
}

const ARROW_COLORS = [INK, "#ff6b4a", "#2a8fd6", "#2fa560", "#f2a20c", "#d4472a", "#4fb3e8", "#8f5be0"];

function Defs() {
  return (
    <defs>
      {ARROW_COLORS.map((c) => (
        <marker key={c} id={`arrow-${c.replace("#", "")}`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" fill={c} />
        </marker>
      ))}
    </defs>
  );
}

/** A dot that travels along a straight line, looping */
function Traveller({ from, to, r = 5, color, delay = 0, dur = 2.2, label }: { from: [number, number]; to: [number, number]; r?: number; color: string; delay?: number; dur?: number; label?: string }) {
  return (
    <motion.g initial={{ x: from[0], y: from[1], opacity: 0 }} animate={{ x: [from[0], to[0]], y: [from[1], to[1]], opacity: [0, 1, 1, 0] }} transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.85, 1] }}>
      <circle r={r} fill={color} stroke={INK} strokeWidth="1.5" />
      {label && (
        <text y={r > 6 ? 3 : 2.5} textAnchor="middle" fontSize={r > 6 ? 7 : 5.5} fontWeight={800} fill="#fff">
          {label}
        </text>
      )}
    </motion.g>
  );
}

/* ================= SODIUM-ION ================= */
function Shelves({ leftGaps = 6, leftColor = "#e7ddc9", irregular = false }: { leftGaps?: number; leftColor?: string; irregular?: boolean }) {
  return (
    <g>
      <rect x="34" y="40" width="74" height="120" rx="6" fill={leftColor} {...sw} />
      <rect x="34" y="40" width="74" height="120" rx="6" fill="url(#ht-ink)" />
      {Array.from({ length: leftGaps }).map((_, i) => {
        const y = 52 + i * (100 / (leftGaps - 1));
        return irregular ? <path key={i} d={`M40 ${y} q12 ${i % 2 ? 6 : -6} 24 0 t24 0 t20 0`} fill="none" stroke={INK} strokeWidth="1.6" /> : <line key={i} x1="40" y1={y} x2="102" y2={y} stroke={INK} strokeWidth="1.6" />;
      })}
      <rect x="212" y="40" width="74" height="120" rx="6" fill="#dbeefc" {...sw} />
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={i} x1="218" y1={56 + i * 22} x2="280" y2={56 + i * 22} stroke={INK} strokeWidth="1.6" />
      ))}
      <Label x={71} y={176}>Shelf A</Label>
      <Label x={249} y={176}>Shelf B</Label>
    </g>
  );
}

function SodiumScene({ frame }: { frame: number }) {
  if (frame === 0)
    return (
      <>
        <Shelves />
        {[0, 1, 2, 3].map((k) => (
          <Traveller key={k} from={[205, 70 + k * 24]} to={[112, 62 + k * 26]} color="#4fb3e8" delay={k * 0.45} />
        ))}
        <Arrow d="M190 28 H130" color="#2fa560" />
        <Label x={160} y={22} color="#1b8048">Charging</Label>
      </>
    );
  if (frame === 1)
    return (
      <>
        <Shelves />
        {[0, 1, 2, 3, 4].map((k) => (
          <Traveller key={k} from={[205, 64 + k * 20]} to={[112, 60 + k * 22]} r={5} color="#8f5be0" label="Li" delay={k * 0.35} />
        ))}
        <g transform="translate(140 14)">
          <rect width="40" height="18" rx="4" fill="#ffc83d" {...sw} />
          <Label x={20} y={12.5}>£££</Label>
        </g>
      </>
    );
  if (frame === 2)
    return (
      <>
        <Shelves leftGaps={9} />
        {[0, 1, 2].map((k) => (
          <motion.g key={k} initial={{ x: 128, y: 70 + k * 30 }} animate={{ x: [128, 120, 128] }} transition={{ repeat: Infinity, duration: 0.5, delay: k * 0.15 }}>
            <circle r="9" fill="#ff6b4a" stroke={INK} strokeWidth="1.5" />
            <text y="3" textAnchor="middle" fontSize="7" fontWeight={800} fill="#fff">Na</text>
          </motion.g>
        ))}
        <path d="M112 60 l6 6 m0 -6 l-6 6 M112 120 l6 6 m0 -6 l-6 6" stroke="#d4472a" strokeWidth="2.5" />
        <g transform="translate(146 10)">
          <path d="M0 10 L14 2 L28 10 L14 18Z" fill="#fff" {...sw} />
          <path d="M0 10 V22 L14 30 V18 M28 10 V22 L14 30" fill="#efe6d2" {...sw} />
        </g>
        <Label x={160} y={196}>Too big for tight graphite gaps</Label>
      </>
    );
  return (
    <>
      <Shelves leftGaps={5} leftColor="#cfc4ae" irregular />
      {[0, 1, 2, 3].map((k) => (
        <Traveller key={k} from={[205, 66 + k * 26]} to={[100, 56 + k * 28]} r={8} color="#ff6b4a" label="Na" delay={k * 0.4} dur={2.6} />
      ))}
      <g transform="translate(160 20)" stroke={INK} strokeWidth="2" strokeLinecap="round">
        <path d="M0 -10 V10 M-9 -5 L9 5 M-9 5 L9 -5" />
      </g>
      <Label x={186} y={24} anchor="start" color="#2a7fc0">−40°C ok</Label>
      <Label x={71} y={196}>Hard carbon</Label>
    </>
  );
}

/* ================= PEROVSKITE TANDEM ================= */
const RAYS = [
  { c: "#2a8fd6", x: 40 },
  { c: "#2fa560", x: 80 },
  { c: "#f2a20c", x: 120 },
  { c: "#d4472a", x: 160 },
];
function Sun() {
  return (
    <g transform="translate(26 22)">
      <circle r="14" fill="#ffc83d" {...sw} />
      <circle r="14" fill="url(#ht-sun)" />
    </g>
  );
}
function PerovskiteScene({ frame }: { frame: number }) {
  const silicon = (
    <g>
      <rect x="40" y="130" width="240" height="34" rx="4" fill="#2a7fc0" {...sw} />
      <rect x="40" y="130" width="240" height="34" rx="4" fill="url(#ht-ink)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1={80 + i * 34} y1="130" x2={80 + i * 34} y2="164" stroke="#bfe8ff" strokeWidth="1" />
      ))}
      <Label x={160} y={180}>Silicon cell</Label>
    </g>
  );
  if (frame === 0)
    return (
      <>
        <Sun />
        {RAYS.map((r, i) => (
          <Arrow key={i} d={`M${r.x + 30} 36 L${r.x + 70} 122`} color={r.c} width={3} />
        ))}
        {silicon}
        <g transform="translate(200 24)">
          {RAYS.map((r, i) => (
            <rect key={i} x={i * 20} width="20" height="10" fill={r.c} stroke={INK} strokeWidth="1.2" />
          ))}
          <Label x={40} y={24}>Spectrum</Label>
        </g>
      </>
    );
  if (frame === 1)
    return (
      <>
        <Sun />
        {RAYS.map((r, i) => (
          <Arrow key={i} d={`M${r.x + 30} 36 L${r.x + 70} 122`} color={r.c} width={3} />
        ))}
        {silicon}
        {[0, 1, 2].map((k) => (
          <motion.path key={k} d={`M${104 + k * 10} 120 q4 -8 0 -16 t0 -16`} fill="none" stroke="#d4472a" strokeWidth="2" strokeLinecap="round" animate={{ opacity: [0, 1, 0], y: [0, -10, -16] }} transition={{ repeat: Infinity, duration: 1.6, delay: k * 0.3 }} />
        ))}
        <Label x={58} y={22} anchor="start" color="#d4472a">Blue → wasted heat</Label>
        <Label x={280} y={196} anchor="end" color="#1b8048">Red → power</Label>
      </>
    );
  if (frame === 2)
    return (
      <>
        <Sun />
        {RAYS.map((r, i) => (
          <Arrow key={i} d={`M${r.x + 30} 36 L${r.x + 62} ${i < 2 ? 104 : 122}`} color={r.c} width={3} />
        ))}
        <motion.g initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 90, damping: 12 }}>
          <rect x="40" y="108" width="240" height="14" rx="3" fill="#8f5be0" {...sw} />
          <rect x="40" y="108" width="240" height="14" rx="3" fill="url(#ht-ink)" />
          <Label x={280} y={102} anchor="end" color="#5b2fb0">Perovskite layer</Label>
        </motion.g>
        {silicon}
      </>
    );
  return (
    <>
      <g transform="translate(40 40)">
        <Label x={0} y={0} anchor="start">Share of sunlight turned into power</Label>
        <rect y="14" width="240" height="22" rx="4" fill={PAPER} {...sw} />
        <motion.rect y="14" height="22" rx="4" fill="#2a7fc0" initial={{ width: 0 }} animate={{ width: 240 * 0.27 }} transition={{ duration: 1 }} {...sw} />
        <Label x={0} y={52} anchor="start">Silicon alone</Label>
        <rect y="70" width="240" height="22" rx="4" fill={PAPER} {...sw} />
        <motion.rect y="70" height="22" rx="4" fill="#8f5be0" initial={{ width: 0 }} animate={{ width: 240 * 0.3485 }} transition={{ duration: 1.2, delay: 0.3 }} {...sw} />
        <Label x={0} y={108} anchor="start">Tandem record: 34.85%</Label>
        <line x1={240 * 0.337} y1="62" x2={240 * 0.337} y2="100" stroke="#d4472a" strokeWidth="2" strokeDasharray="3 3" />
        <Label x={240 * 0.337 + 6} y={126} anchor="start" color="#d4472a">Single-layer limit 33.7%</Label>
      </g>
      <Label x={160} y={196} color="#4a5d6b">Silicon bar is illustrative</Label>
    </>
  );
}

/* ================= IRON-AIR ================= */
function Cell({ rust }: { rust: number }) {
  return (
    <g>
      <rect x="90" y="50" width="140" height="110" rx="10" fill="#dbeefc" {...sw} />
      <rect x="90" y="50" width="140" height="110" rx="10" fill="url(#ht-sky)" />
      {[0, 1, 2].map((i) => (
        <motion.rect key={i} x={110 + i * 38} y="66" width="22" height="80" rx="3" initial={false} animate={{ fill: rust > 0.5 ? "#c8612f" : "#9aa7b4" }} transition={{ duration: 1.2, delay: i * 0.2 }} {...sw} />
      ))}
      <Label x={160} y={176}>Iron plates in water-based electrolyte</Label>
    </g>
  );
}
function IronAirScene({ frame }: { frame: number }) {
  if (frame === 0)
    return (
      <>
        <g transform="translate(160 100) rotate(-20)">
          <rect x="-90" y="-8" width="170" height="16" rx="3" fill="#9aa7b4" {...sw} />
          <path d="M80 -8 l20 8 -20 8" fill="#9aa7b4" {...sw} />
          <rect x="-104" y="-16" width="16" height="32" rx="3" fill="#9aa7b4" {...sw} />
          {[-60, -20, 20, 50].map((x, i) => (
            <motion.circle key={x} cx={x} cy={(i % 2) * 3 - 1} fill="#c8612f" initial={{ r: 0 }} animate={{ r: [0, 6, 6] }} transition={{ duration: 2.5, delay: i * 0.5, repeat: Infinity, repeatDelay: 1 }} />
          ))}
        </g>
        <Label x={160} y={176}>Iron + oxygen → rust + a little energy</Label>
      </>
    );
  if (frame === 1)
    return (
      <>
        <Cell rust={1} />
        {[0, 1, 2].map((k) => (
          <Traveller key={k} from={[30, 70 + k * 30]} to={[96, 80 + k * 24]} r={6} color="#fff" label="O₂" delay={k * 0.4} />
        ))}
        <Arrow d="M232 100 H296" color="#f2a20c" width={4} animate dash="6 6" />
        <Label x={264} y={92} color="#c98a00">Power out</Label>
        <Label x={52} y={44}>Breathe in</Label>
      </>
    );
  if (frame === 2)
    return (
      <>
        <Cell rust={0} />
        {[0, 1, 2].map((k) => (
          <Traveller key={k} from={[96, 80 + k * 24]} to={[30, 70 + k * 30]} r={6} color="#fff" label="O₂" delay={k * 0.4} />
        ))}
        <Arrow d="M296 100 H236" color="#f2a20c" width={4} animate dash="6 6" />
        <Label x={264} y={92} color="#c98a00">Power in</Label>
        <Label x={52} y={44}>Breathe out</Label>
      </>
    );
  return (
    <>
      <g transform="translate(36 52)">
        <Label x={0} y={0} anchor="start">How long it can keep supplying</Label>
        <rect y="14" width="40" height="22" rx="4" fill="#4fb3e8" {...sw} />
        <Label x={50} y={30} anchor="start">Typical grid battery: hours</Label>
        <motion.rect y="62" height="22" rx="4" fill="#ff6b4a" initial={{ width: 0 }} animate={{ width: 248 }} transition={{ duration: 1.4 }} {...sw} />
        <rect y="62" width="248" height="22" rx="4" fill="url(#ht-ink)" />
        <Label x={0} y={102} anchor="start">Iron-air: ~100 hours (≈4 days)</Label>
        {[0, 1, 2, 3].map((d) => (
          <g key={d} transform={`translate(${d * 62 + 18} 124)`}>
            <circle r="9" fill={PAPER} {...sw} />
            <Label x={0} y={3}>{`D${d + 1}`}</Label>
          </g>
        ))}
      </g>
    </>
  );
}

/* ================= ENHANCED GEOTHERMAL ================= */
function Ground({ hot = 1 }: { hot?: number }) {
  return (
    <g>
      <defs>
        <linearGradient id="depth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9c7a3" />
          <stop offset="0.55" stopColor="#e59a5a" />
          <stop offset="1" stopColor={hot ? "#d4472a" : "#e59a5a"} />
        </linearGradient>
      </defs>
      <rect x="0" y="54" width="320" height="146" fill="url(#depth)" />
      <rect x="0" y="54" width="320" height="146" fill="url(#ht-ink)" opacity=".7" />
      <path d="M0 54 H320" stroke={INK} strokeWidth="2" />
      <rect x="0" y="44" width="320" height="10" fill="#7cc66c" stroke={INK} strokeWidth="2" />
      <g transform="translate(298 70)">
        <rect x="-5" y="0" width="10" height="100" rx="5" fill={PAPER} {...sw} />
        <rect x="-2.5" y="40" width="5" height="58" fill="#d4472a" />
        <circle cy="104" r="8" fill="#d4472a" {...sw} />
      </g>
    </g>
  );
}
function GeothermalScene({ frame }: { frame: number }) {
  if (frame === 0)
    return (
      <>
        <Ground />
        <Label x={20} y={80} anchor="start">Cooler</Label>
        <Label x={20} y={188} anchor="start" color="#fff">Hot everywhere at depth</Label>
        <g transform="translate(110 44)">
          <motion.path d="M0 0 c-4 -10 4 -16 0 -26 M10 0 c-4 -10 4 -16 0 -26" stroke="#4fb3e8" strokeWidth="3" fill="none" strokeLinecap="round" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} />
          <Label x={5} y={-32}>Rare hot spring</Label>
        </g>
      </>
    );
  if (frame === 1)
    return (
      <>
        <Ground />
        <rect x="40" y="120" width="230" height="60" rx="8" fill="#b23a20" {...sw} />
        <rect x="40" y="120" width="230" height="60" rx="8" fill="url(#ht-ink-dense)" />
        <Label x={155} y={154} color="#fff">Hot, dry, tight rock</Label>
        {[0, 1, 2].map((k) => (
          <motion.path key={k} d={`M${90 + k * 60} 118 q4 -6 0 -12 t0 -12`} stroke="#ffc83d" strokeWidth="2" fill="none" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.4, delay: k * 0.3 }} />
        ))}
      </>
    );
  const wells = (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M90 44 V140 Q90 150 100 150 H220" stroke={INK} strokeWidth="5" />
      <path d="M110 44 V120 Q110 130 120 130 H240" stroke={INK} strokeWidth="5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${135 + i * 20} 130 l-4 10 6 0 -4 10`} stroke="#ffc83d" strokeWidth="2" />
      ))}
    </g>
  );
  if (frame === 2)
    return (
      <>
        <Ground />
        <motion.g initial={{ pathLength: 0, opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          {wells}
        </motion.g>
        <g transform="translate(100 18)">
          <path d="M-14 26 L0 0 L14 26" fill="none" {...sw} />
          <path d="M-8 14 H8" {...sw} />
        </g>
        <Label x={250} y={170} color="#fff">Man-made cracks</Label>
      </>
    );
  return (
    <>
      <Ground />
      {wells}
      <path d="M90 44 V140 Q90 150 100 150 H220" fill="none" stroke="#4fb3e8" strokeWidth="3" strokeDasharray="4 10" className="energy-flow" />
      <path d="M240 130 H120 Q110 130 110 120 V44" fill="none" stroke="#ff6b4a" strokeWidth="3" strokeDasharray="4 10" className="energy-flow" />
      <g transform="translate(160 26)">
        <rect x="-26" y="-6" width="52" height="24" rx="4" fill={PAPER} {...sw} />
        <g transform="translate(0 6)">
          <g className="spin" style={{ ["--spd" as string]: "1.5s" }}>
            {[0, 90, 180, 270].map((r) => (
              <path key={r} d="M0 0 L0 -9" stroke={INK} strokeWidth="2.5" transform={`rotate(${r})`} />
            ))}
          </g>
        </g>
      </g>
      <Label x={60} y={36} color="#2a7fc0">Cold down</Label>
      <Label x={236} y={36} color="#d4472a">Hot up · 24/7</Label>
    </>
  );
}

/* ================= SOLID-STATE ================= */
function SolidStateScene({ frame }: { frame: number }) {
  const left = frame >= 2 ? { x: 70, w: 22, fill: "#c9d3dc" } : { x: 40, w: 60, fill: "#e7ddc9" };
  return (
    <>
      <rect x={left.x} y="44" width={left.w} height="112" rx="5" fill={left.fill} {...sw} />
      {frame >= 2 && <Label x={81} y={174}>Lithium metal</Label>}
      {frame < 2 && <Label x={70} y={174}>Graphite</Label>}
      <rect x="220" y="44" width="60" height="112" rx="5" fill="#dbeefc" {...sw} />
      {frame === 0 ? (
        <>
          <rect x="104" y="48" width="112" height="104" fill="#bfe8ff" />
          <motion.path d="M104 70 q14 -6 28 0 t28 0 t28 0 t28 0" stroke="#4fb3e8" strokeWidth="2" fill="none" animate={{ x: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
          <motion.path d="M104 110 q14 -6 28 0 t28 0 t28 0 t28 0" stroke="#4fb3e8" strokeWidth="2" fill="none" animate={{ x: [0, 14, 0] }} transition={{ repeat: Infinity, duration: 2.4 }} />
          <path d="M160 32 c-6 -6 -2 -12 0 -18 4 6 8 8 6 14 -1 4 -3 5 -6 4Z" fill="#ff6b4a" {...sw} />
          <Label x={160} y={174}>Flammable liquid</Label>
        </>
      ) : (
        <>
          <motion.rect x={frame >= 2 ? 96 : 106} y="48" width={frame >= 2 ? 26 : 108} height="104" fill="#efe6d2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} {...sw} />
          <rect x={frame >= 2 ? 96 : 106} y="48" width={frame >= 2 ? 26 : 108} height="104" fill="url(#ht-ink-dense)" />
          {frame === 3 &&
            [0, 1].map((k) => (
              <motion.path key={k} d={`M${100 + k * 12} ${70 + k * 40} l6 8 -4 6 6 10`} stroke="#d4472a" strokeWidth="2.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: k * 0.4 }} />
            ))}
          {[0, 1, 2].map((k) => (
            <Traveller key={k} from={[214, 70 + k * 30]} to={[frame >= 2 ? 96 : 104, 70 + k * 30]} color="#8f5be0" delay={k * 0.5} />
          ))}
          <Label x={frame === 1 ? 160 : 175} y={frame === 1 ? 174 : 190}>{frame === 1 ? "Solid layer" : frame === 2 ? "Thin, solid, dense" : "Cracks + yield"}</Label>
        </>
      )}
      {frame === 2 && (
        <g transform="translate(150 20)">
          <rect x="-40" y="-10" width="80" height="18" rx="4" fill="#ffc83d" {...sw} />
          <Label x={0} y={2.5}>More energy</Label>
        </g>
      )}
      {frame === 3 && (
        <g transform="translate(160 20)">
          <rect x="-70" y="-10" width="140" height="18" rx="4" fill={PAPER} {...sw} />
          <Label x={0} y={2.5} color="#d4472a">Hard to mass-produce</Label>
        </g>
      )}
    </>
  );
}

/* ================= VEHICLE-TO-GRID ================= */
function Car({ level }: { level: number }) {
  return (
    <g transform="translate(40 108)">
      <path d="M0 40 V26 L18 8 H72 L94 26 V40Z" fill="#4fb3e8" {...sw} />
      <path d="M22 12 H68 L82 26 H12Z" fill="#dcf1fc" {...sw} />
      <circle cx="22" cy="42" r="9" fill={INK} />
      <circle cx="74" cy="42" r="9" fill={INK} />
      <g transform="translate(16 -36)">
        <rect width="60" height="24" rx="4" fill={PAPER} {...sw} />
        <rect x="60" y="8" width="5" height="8" rx="1" fill={INK} />
        <motion.rect x="3" y="3" height="18" rx="2" fill="#2fa560" initial={false} animate={{ width: 54 * level }} transition={{ duration: 1.2 }} />
      </g>
    </g>
  );
}
function House({ x = 230 }: { x?: number }) {
  return (
    <g transform={`translate(${x} 112)`}>
      <rect x="0" y="16" width="64" height="40" fill={PAPER} {...sw} />
      <path d="M-6 18 L32 -12 L70 18Z" fill="#ff6b4a" {...sw} />
      <rect x="26" y="34" width="12" height="22" fill={INK} />
    </g>
  );
}
function V2GScene({ frame }: { frame: number }) {
  if (frame === 0)
    return (
      <>
        <Car level={0.8} />
        <g transform="translate(200 40)">
          <rect width="34" height="34" rx="6" fill="#2a7fc0" {...sw} />
          <text x="17" y="25" textAnchor="middle" fontSize="20" fontWeight={800} fill="#fff">P</text>
        </g>
        <Label x={86} y={60}>Lots of spare battery</Label>
        <Label x={217} y={92}>Parked most of the day</Label>
      </>
    );
  if (frame === 1)
    return (
      <>
        <rect width="320" height="200" fill="#12304a" opacity=".1" />
        <path d="M268 30 a14 14 0 1 0 10 24 a11 11 0 1 1 -10 -24Z" fill="#ffc83d" {...sw} />
        <Car level={1} />
        <Arrow d="M290 120 L150 120" color="#2fa560" width={4} animate dash="6 8" />
        <Label x={230} y={110} color="#1b8048">Cheap night power</Label>
      </>
    );
  if (frame === 2)
    return (
      <>
        <circle cx="270" cy="40" r="14" fill="#ff6b4a" {...sw} />
        <Car level={0.7} />
        <House />
        <Arrow d="M150 140 L222 140" color="#f2a20c" width={4} animate dash="6 8" />
        <Label x={182} y={158} color="#c98a00">Peak: give back</Label>
      </>
    );
  return (
    <>
      <Car level={0.8} />
      <g transform="translate(196 30)">
        <rect width="92" height="140" rx="14" fill={PAPER} {...sw} />
        <Label x={46} y={26}>Ready by 7am</Label>
        <rect x="14" y="40" width="64" height="8" rx="4" fill="#efe6d2" {...sw} />
        <rect x="14" y="40" width="51" height="8" rx="4" fill="#2fa560" />
        <circle cx="65" cy="44" r="7" fill={PAPER} {...sw} />
        <Label x={46} y={66}>80% charge</Label>
        <circle cx="46" cy="100" r="18" fill="#ffc83d" {...sw} />
        <Label x={46} y={104}>£</Label>
      </g>
    </>
  );
}

/* ================= HEAT PUMP ================= */
function HeatPumpScene({ frame }: { frame: number }) {
  if (frame === 0)
    return (
      <>
        <rect x="100" y="30" width="80" height="140" rx="8" fill={PAPER} {...sw} />
        <line x1="100" y1="80" x2="180" y2="80" stroke={INK} strokeWidth="2" />
        <rect x="108" y="88" width="64" height="70" rx="4" fill="#bfe8ff" {...sw} />
        {[0, 1, 2].map((k) => (
          <motion.path key={k} d={`M190 ${60 + k * 34} q8 -6 16 0 t16 0 t16 0`} stroke="#d4472a" strokeWidth="2.5" fill="none" strokeLinecap="round" animate={{ x: [0, 14], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.4, delay: k * 0.3 }} />
        ))}
        <Label x={140} y={186}>Heat pumped out the back</Label>
      </>
    );
  const house = (
    <g>
      <rect x="170" y="80" width="120" height="90" fill={PAPER} {...sw} />
      <path d="M160 84 L230 30 L300 84Z" fill="#ff6b4a" {...sw} />
      <rect x="200" y="120" width="60" height="22" rx="3" fill="#efe6d2" {...sw} />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={206 + i * 12} y1="122" x2={206 + i * 12} y2="140" stroke={INK} strokeWidth="1.5" />
      ))}
      <Label x={230} y={158}>Radiator</Label>
    </g>
  );
  const unit = (
    <g transform="translate(70 120)">
      <rect width="70" height="50" rx="5" fill="#e3edf3" {...sw} />
      <circle cx="35" cy="25" r="16" fill={PAPER} {...sw} />
      <g transform="translate(35 25)">
        <g className="spin" style={{ ["--spd" as string]: "1.2s" }}>
          {[0, 120, 240].map((r) => (
            <path key={r} d="M0 0 q8 -4 4 -14" stroke={INK} strokeWidth="2" fill="none" transform={`rotate(${r})`} />
          ))}
        </g>
      </g>
    </g>
  );
  if (frame === 1)
    return (
      <>
        <rect x="0" y="0" width="160" height="200" fill="#dbeefc" />
        <rect x="0" y="0" width="160" height="200" fill="url(#ht-sky)" />
        {house}
        {unit}
        {[0, 1, 2, 3].map((k) => (
          <Traveller key={k} from={[10, 40 + k * 26]} to={[96, 136]} r={4} color="#ff6b4a" delay={k * 0.4} />
        ))}
        <Label x={52} y={22} color="#2a7fc0">Cold air (still has heat)</Label>
      </>
    );
  if (frame === 2)
    return (
      <>
        {house}
        {unit}
        <g transform="translate(110 60)">
          <rect x="-20" y="-24" width="40" height="40" rx="4" fill={PAPER} {...sw} />
          <motion.rect x="-16" width="32" height="6" fill={INK} initial={{ y: -20 }} animate={{ y: [-20, -2, -20] }} transition={{ repeat: Infinity, duration: 1.2 }} />
          <motion.g animate={{ scale: [1, 0.6, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>
            {[-8, 0, 8].map((x) => (
              <motion.circle key={x} cx={x} cy="6" r="3" animate={{ fill: ["#4fb3e8", "#d4472a", "#4fb3e8"] }} transition={{ repeat: Infinity, duration: 1.2 }} />
            ))}
          </motion.g>
          <Label x={0} y={-30}>Squeeze = hotter</Label>
        </g>
        <Arrow d="M140 150 H198" color="#d4472a" width={3.5} animate dash="5 6" />
      </>
    );
  return (
    <>
      <g transform="translate(40 70)">
        <circle cx="26" cy="26" r="26" fill="#ffc83d" {...sw} />
        <path d="M30 8 18 30h10l-3 14 13-20H28Z" fill={INK} />
        <Label x={26} y={72}>1 unit in</Label>
      </g>
      <Arrow d="M110 96 H150" width={3} />
      <g transform="translate(166 70)">
        {[0, 1, 2].map((k) => (
          <motion.g key={k} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + k * 0.25, type: "spring" }} transform={`translate(${k * 40} 0)`}>
            <path d="M18 50c-12 0-18-8-18-17 0-12 12-18 12-30 9 6 12 12 12 18 3-3 6-6 6-9 6 6 6 12 6 21 0 9-6 17-18 17Z" fill="#ff6b4a" {...sw} />
          </motion.g>
        ))}
        <Label x={56} y={72}>~3 units of heat</Label>
      </g>
      <Label x={160} y={190} color="#4a5d6b">Rule of thumb, varies by home</Label>
    </>
  );
}

const SCENES: Record<string, (p: { frame: number }) => React.ReactElement> = {
  "sodium-ion": SodiumScene,
  "perovskite-tandem": PerovskiteScene,
  "iron-air": IronAirScene,
  "enhanced-geothermal": GeothermalScene,
  "solid-state": SolidStateScene,
  "vehicle-to-grid": V2GScene,
  "heat-pumps": HeatPumpScene,
};

export function BreakdownScene({ id, frame, className = "" }: { id: string; frame: number; className?: string }) {
  const S = SCENES[id];
  if (!S) return null;
  return (
    <svg viewBox="0 0 320 200" className={className} role="img" aria-label="Illustrated explanation">
      <Defs />
      <S frame={frame} />
    </svg>
  );
}
