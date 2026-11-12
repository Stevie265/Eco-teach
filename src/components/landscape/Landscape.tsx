"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * The signature parallax landscape. A tall section with a sticky viewport:
 * as you scroll, sky, mountains, hills, grid and homes move at different speeds.
 */
export function Landscape({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const sunY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const cloudsY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const cloudsX = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const farY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -330]);
  const nearY = useTransform(scrollYProgress, [0, 1], [0, -480]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const textO = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const skyShift = useTransform(scrollYProgress, [0, 1], ["#8fd3fb", "#bfe8ff"]);

  return (
    <section ref={ref} className="relative h-[175vh]" aria-label="Welcome">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ background: skyShift }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#5fbdf5]/60 via-transparent to-[#fff6dc]" />

        {/* sun */}
        <motion.div style={{ y: sunY }} className="absolute right-[8%] top-[11%] sm:right-[12%] sm:top-[14%]">
          <div className="relative h-20 w-20 sm:h-36 sm:w-36">
            <div className="absolute inset-[-40%] animate-pulse-soft rounded-full bg-sun/30 blur-2xl" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ffe27a] to-sun shadow-[0_0_80px_rgba(255,194,46,.6)]" />
          </div>
        </motion.div>

        {/* clouds */}
        <motion.div style={{ y: cloudsY, x: cloudsX }} className="absolute inset-x-0 top-[8%]">
          <Cloud className="absolute left-[6%] top-[4vh] w-40 opacity-90 sm:w-56" />
          <Cloud className="absolute left-[42%] top-[16vh] w-28 opacity-80 sm:w-40" />
          <Cloud className="absolute left-[72%] top-[30vh] w-36 opacity-70 sm:w-48" />
          <Cloud className="absolute left-[90%] top-[6vh] w-32 opacity-80" />
        </motion.div>

        {/* text */}
        <motion.div style={{ y: textY, opacity: textO }} className="relative z-20 mx-auto max-w-6xl px-5 pt-[calc(4rem+5vh)] sm:px-8 sm:pt-[16vh]">
          {children}
        </motion.div>

        {/* far mountains */}
        <motion.svg style={{ y: farY }} viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice" className="absolute bottom-[18vh] left-0 h-[42vh] w-full" aria-hidden>
          <path d="M0 400V250l120-90 110 70 150-150 130 110 90-60 170 140 140-120 160 130 110-80 160 120 100-60v230Z" fill="#a9d3ee" />
          <path d="M380 80 L414 114 L398 108 L382 118 L366 106 L348 112Z M910 150 L940 175 L926 171 L912 179 L898 170 L884 172Z" fill="#fff" opacity=".9" />
          <path d="M0 400V300l160-70 140 50 180-90 160 90 140-60 180 80 160-70 180 60 140-40v150Z" fill="#8cc4e6" />
        </motion.svg>

        {/* mid hills with wind turbines */}
        <motion.svg style={{ y: midY }} viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" className="absolute bottom-[4vh] left-0 h-[46vh] w-full" aria-hidden>
          <path d="M0 420V240c140-70 260-80 400-30s280 40 420-30 300-60 420 0 160 40 200 30v210Z" fill="#9ed98a" />
          {[
            [260, 205],
            [360, 196],
            [980, 168],
            [1090, 180],
            [1190, 196],
          ].map(([x, y], i) => (
            <Turbine key={i} x={x} y={y} scale={i % 2 ? 0.8 : 1} speed={5 + i} />
          ))}
          <path d="M0 420V300c180-50 300-40 460 0s320 50 480 0 320-60 500 0v120Z" fill="#7cc66c" />
        </motion.svg>

        {/* grid: pylons, solar farm */}
        <motion.svg style={{ y: gridY }} viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice" className="absolute -bottom-[6vh] left-0 h-[36vh] w-full" aria-hidden>
          <path d="M0 300V170c200-40 420-50 720-10s520 30 720-10v150Z" fill="#5fb85a" />
          {[150, 520, 900, 1280].map((x) => (
            <Pylon key={x} x={x} y={160} />
          ))}
          <path d="M150 92 Q335 120 520 92 T900 92 T1280 92" fill="none" stroke="#2c4a5e" strokeWidth="1.6" />
          <path d="M150 104 Q335 132 520 104 T900 104 T1280 104" fill="none" stroke="#2c4a5e" strokeWidth="1.6" />
          <path d="M150 92 Q335 120 520 92 T900 92 T1280 92" fill="none" stroke="#ffd23f" strokeWidth="3" strokeDasharray="4 26" className="energy-flow" />
          {/* solar farm */}
          <g transform="translate(600 185)">
            {Array.from({ length: 6 }).map((_, i) => (
              <g key={i} transform={`translate(${i * 34} ${i % 2 ? 6 : 0})`}>
                <path d="M0 18 8 0h26l-8 18Z" fill="#2a7fc0" stroke="#e8f6ff" strokeWidth="1" />
                <line x1="17" y1="18" x2="17" y2="26" stroke="#2c4a5e" strokeWidth="2" />
              </g>
            ))}
          </g>
        </motion.svg>

        {/* near meadow with homes */}
        <motion.svg style={{ y: nearY }} viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax slice" className="absolute -bottom-[16vh] left-0 h-[34vh] w-full" aria-hidden>
          <path d="M0 260V110c260-50 520-40 760 0s460 30 680-10v160Z" fill="#43a64f" />
          <Tree x={90} y={112} s={1.1} />
          <Tree x={150} y={118} s={0.8} />
          <House x={260} y={100} solar heatPump />
          <House x={400} y={110} color="#ffe3db" ev />
          <Tree x={540} y={110} s={1} />
          <House x={1000} y={98} color="#dcf1fc" solar battery />
          <House x={1140} y={104} color="#fff4c7" ev solar />
          <Tree x={1290} y={104} s={1.2} />
          <Tree x={1360} y={110} s={0.9} />
          <path d="M0 260v-60c300-30 700-30 1440 0v60Z" fill="#3a9846" />
        </motion.svg>

        {/* scroll cue */}
        <motion.div style={{ opacity: textO }} className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white drop-shadow sm:block">
          Scroll to explore
          <div className="mx-auto mt-2 h-8 w-5 rounded-full border-2 border-white/90 p-1">
            <div className="h-2 w-full animate-bounce rounded-full bg-white" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 50" className={className} aria-hidden>
      <path d="M18 44c-10 0-16-6-16-13s6-12 14-12c2-9 10-16 21-16 9 0 16 5 19 12 3-2 6-3 10-3 9 0 16 6 17 14h3c9 0 15 5 15 10s-5 8-12 8Z" fill="#fff" />
    </svg>
  );
}

export function Turbine({ x, y, scale = 1, speed = 6 }: { x: number; y: number; scale?: number; speed?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-2.5 0 L-1.2 -95 L1.2 -95 L2.5 0Z" fill="#f4f8fb" stroke="#c9d9e4" strokeWidth=".8" />
      <g transform="translate(0 -96)">
        <g className="spin" style={{ ["--spd" as string]: `${speed}s` }}>
          {[0, 120, 240].map((r) => (
            <path key={r} d="M0 0 C3 -10 3 -30 0 -46 C-3 -30 -3 -10 0 0Z" fill="#fff" stroke="#c9d9e4" strokeWidth=".8" transform={`rotate(${r})`} />
          ))}
        </g>
        <circle r="3.5" fill="#e3edf3" stroke="#a8bccb" />
      </g>
    </g>
  );
}

function Pylon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#2c4a5e" strokeWidth="2" fill="none">
      <path d="M-16 0 L-4 -70 L4 -70 L16 0 M-10 -30 L10 -30 M-12 -16 L12 -16 M-6 -50 L6 -50 M-14 -6 L8 -34 M14 -6 L-8 -34" />
      <path d="M-26 -68 H26 M-20 -56 H20" />
    </g>
  );
}

function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-3" y="-14" width="6" height="16" rx="2" fill="#8a5a33" />
      <circle cx="0" cy="-30" r="20" fill="#2e8b47" />
      <circle cx="-9" cy="-24" r="13" fill="#38a356" />
      <circle cx="8" cy="-36" r="11" fill="#45b563" />
    </g>
  );
}

function House({ x, y, color = "#fffaf0", solar, heatPump, ev, battery }: { x: number; y: number; color?: string; solar?: boolean; heatPump?: boolean; ev?: boolean; battery?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-40" y="-44" width="80" height="48" rx="3" fill={color} stroke="#13283a" strokeWidth="2" />
      <path d="M-48 -42 L0 -82 L48 -42Z" fill="#ff6b4a" stroke="#13283a" strokeWidth="2" strokeLinejoin="round" />
      {solar && (
        <path d="M-34 -50 L-12 -68.5 L-12 -60 L-34 -43Z" fill="#2a7fc0" stroke="#e8f6ff" strokeWidth="1" />
      )}
      <rect x="-12" y="-22" width="16" height="26" rx="2" fill="#13283a" />
      <rect x="12" y="-34" width="18" height="14" rx="2" fill="#bfe8ff" stroke="#13283a" strokeWidth="1.5" />
      <rect x="-32" y="-34" width="14" height="14" rx="2" fill="#bfe8ff" stroke="#13283a" strokeWidth="1.5" />
      {heatPump && (
        <g transform="translate(46 -10)">
          <rect width="18" height="14" rx="2" fill="#e3edf3" stroke="#13283a" strokeWidth="1.5" />
          <circle cx="9" cy="7" r="4" fill="none" stroke="#13283a" strokeWidth="1.2" />
        </g>
      )}
      {battery && <rect x="44" y="-22" width="10" height="24" rx="2" fill="#2fa560" stroke="#13283a" strokeWidth="1.5" />}
      {ev && (
        <g transform="translate(52 -6)">
          <rect x="0" y="0" width="34" height="10" rx="4" fill="#4fb3e8" stroke="#13283a" strokeWidth="1.5" />
          <path d="M6 0 L10 -7 H24 L28 0" fill="#bfe8ff" stroke="#13283a" strokeWidth="1.5" />
          <circle cx="8" cy="11" r="3" fill="#13283a" />
          <circle cx="26" cy="11" r="3" fill="#13283a" />
        </g>
      )}
    </g>
  );
}

export { House, Tree, Pylon };
