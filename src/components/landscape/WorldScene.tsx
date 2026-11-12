/**
 * Small illustrated scene for each world: a visual metaphor for what it covers.
 * Pure SVG, 200×120 canvas.
 */
const INK = "#1b2a4a";

export function WorldScene({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden>
      <rect width="200" height="120" rx="18" fill="#fff" opacity="0" />
      {SCENES[id] ?? null}
    </svg>
  );
}

const ground = (fill: string) => <path d="M0 100c40-14 90-16 130-8s50 6 70 2v26H0Z" fill={fill} />;

const SCENES: Record<string, React.ReactNode> = {
  // From fire to megawatts: campfire → windmill → smokestack
  history: (
    <>
      {ground("#f7d9b4")}
      <g transform="translate(36 96)">
        <path d="M-14 0h28M-10 -2l20 -4M10 -2l-20 -4" stroke="#8a5a33" strokeWidth="4" strokeLinecap="round" />
        <path d="M0 -6c-10-8-6-18 0-26 2 8 10 10 8 18-1 6-5 8-8 8Z" fill="#ff6b4a" />
        <path d="M0 -8c-4-4-3-9 0-13 1 4 5 5 4 9-1 3-2 4-4 4Z" fill="#ffd23f" />
      </g>
      <g transform="translate(96 92)">
        <path d="M-9 0 -5 -38h10L9 0Z" fill="#fde9d2" stroke={INK} strokeWidth="2" />
        <g transform="translate(0 -38)">
          <g className="spin-slow">
            {[0, 90, 180, 270].map((r) => (
              <rect key={r} x="-2" y="-28" width="4" height="26" fill="#e0832a" stroke={INK} strokeWidth="1.2" transform={`rotate(${r})`} />
            ))}
          </g>
        </g>
      </g>
      <g transform="translate(156 96)">
        <rect x="-14" y="-24" width="28" height="24" fill="#c9b8a6" stroke={INK} strokeWidth="2" />
        <rect x="2" y="-56" width="8" height="32" fill="#a08c78" stroke={INK} strokeWidth="2" />
        <circle cx="10" cy="-64" r="6" fill="#d8d0c8" />
        <circle cx="18" cy="-72" r="8" fill="#e6e0da" />
      </g>
    </>
  ),
  // The grid: pylons with energy flowing
  "energy-system": (
    <>
      {ground("#cfe8f8")}
      {[40, 100, 160].map((x) => (
        <g key={x} transform={`translate(${x} 98)`} stroke={INK} strokeWidth="2" fill="none">
          <path d="M-10 0 L-3 -50 L3 -50 L10 0 M-7 -22 H7 M-14 -48 H14" />
        </g>
      ))}
      <path d="M26 50 Q70 64 114 50 T174 50" fill="none" stroke={INK} strokeWidth="1.5" />
      <path d="M26 50 Q70 64 114 50 T174 50" fill="none" stroke="#ffd23f" strokeWidth="4" strokeDasharray="3 16" className="energy-flow" />
      <path d="M180 20 l-8 14h8l-6 12" stroke="#2a8fd6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  // Climate: the earth wrapped in an atmosphere blanket
  climate: (
    <>
      <circle cx="100" cy="64" r="44" fill="#dcf4e4" opacity=".9" />
      <circle cx="100" cy="64" r="34" fill="#4fb3e8" stroke={INK} strokeWidth="2" />
      <path d="M78 52c8-6 14 0 20-4s6 10 0 12-4 10-12 8-14-8-8-16Zm34 18c6-2 10 4 8 8s-10 4-12 0 0-6 4-8Z" fill="#2fa560" />
      <circle cx="160" cy="22" r="10" fill="#ffc22e" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M150 ${30 + i * 8} L${132 - i * 4} ${44 + i * 6}`} stroke="#ffc22e" strokeWidth="2.5" strokeLinecap="round" />
      ))}
      <path d="M128 92 q8 -4 16 0" stroke="#ff6b4a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  ),
  // PESTEL: a signpost of six forces
  pestel: (
    <>
      {ground("#ece3fb")}
      <rect x="97" y="22" width="6" height="78" rx="2" fill="#8a5a33" />
      {[
        ["P", -1, 26, "#8f5be0"],
        ["E", 1, 36, "#2a8fd6"],
        ["S", -1, 46, "#ec4c76"],
        ["T", 1, 56, "#ff6b4a"],
        ["E", -1, 66, "#2fa560"],
        ["L", 1, 76, "#f2a20c"],
      ].map(([l, dir, y, c], i) => {
        const d = dir as number;
        const x = d > 0 ? 103 : 97;
        return (
          <g key={i}>
            <path d={d > 0 ? `M${x} ${y} h38 l6 4 -6 4 h-38Z` : `M${x} ${y} h-38 l-6 4 6 4 h38Z`} fill={c as string} stroke={INK} strokeWidth="1.2" />
            <text x={d > 0 ? x + 18 : x - 20} y={(y as number) + 6.5} fontSize="7" fontWeight="800" fill="#fff" textAnchor="middle">
              {l}
            </text>
          </g>
        );
      })}
    </>
  ),
  // Technology: solar, battery, turbine
  technology: (
    <>
      {ground("#ffe3db")}
      <g transform="translate(30 76)">
        <path d="M0 18 10 0h34l-10 18Z" fill="#2a7fc0" stroke={INK} strokeWidth="1.8" />
        <path d="M14 0 6 18M27 0 19 18M5 9h34" stroke="#bfe8ff" strokeWidth="1" />
        <line x1="22" y1="18" x2="22" y2="26" stroke={INK} strokeWidth="2" />
      </g>
      <g transform="translate(96 60)">
        <rect width="26" height="40" rx="4" fill="#fff" stroke={INK} strokeWidth="2" />
        <rect x="9" y="-5" width="8" height="5" rx="1" fill={INK} />
        <rect x="4" y="18" width="18" height="18" rx="2" fill="#2fa560" className="charge" />
        <path d="m14 8-4 7h5l-4 7" stroke="#ff6b4a" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      <g transform="translate(160 100)">
        <path d="M-2 0 L-1 -62 L1 -62 L2 0Z" fill="#fff" stroke={INK} strokeWidth="1.2" />
        <g transform="translate(0 -62)">
          <g className="spin-slow">
            {[0, 120, 240].map((r) => (
              <path key={r} d="M0 0 C2 -8 2 -20 0 -30 C-2 -20 -2 -8 0 0Z" fill="#fff" stroke={INK} strokeWidth="1.2" transform={`rotate(${r})`} />
            ))}
          </g>
        </g>
      </g>
    </>
  ),
  // Business: a market stall with coins and a rising chart
  business: (
    <>
      {ground("#d4f2ec")}
      <g transform="translate(30 50)">
        <rect y="20" width="70" height="30" fill="#fff" stroke={INK} strokeWidth="2" />
        <path d="M-4 20 0 0h70l4 20Z" fill="#12a08a" stroke={INK} strokeWidth="2" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${i * 18 + 4} 20 v-20`} stroke="#fff" strokeWidth="5" opacity=".5" />
        ))}
      </g>
      {[0, 1, 2].map((i) => (
        <ellipse key={i} cx="128" cy={92 - i * 6} rx="12" ry="4" fill="#ffc22e" stroke={INK} strokeWidth="1.5" />
      ))}
      <path d="M150 90 L162 74 L172 80 L186 56" stroke="#12a08a" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m180 56 6 0 0 6" stroke="#12a08a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </>
  ),
  // Start-ups: a rocket launching
  startups: (
    <>
      {ground("#fde0e8")}
      <g className="hover-float"><g transform="translate(100 64) rotate(30)">
        <path d="M0 -36c10 8 12 26 8 40H-8c-4-14-2-32 8-40Z" fill="#fff" stroke={INK} strokeWidth="2" />
        <circle cy="-12" r="5" fill="#4fb3e8" stroke={INK} strokeWidth="1.5" />
        <path d="M-8 0-16 12-8 8M8 0l8 12-8-4" fill="#ec4c76" stroke={INK} strokeWidth="1.5" />
        <path d="M-5 6c0 10 5 16 5 16s5-6 5-16Z" fill="#ffc22e" />
      </g></g>
      {[
        [40, 30],
        [160, 24],
        [174, 60],
        [30, 64],
      ].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 4}v8M${x - 4} ${y}h8`} stroke="#ec4c76" strokeWidth="2" strokeLinecap="round" />
      ))}
    </>
  ),
  // Future home: a connected house
  "future-home": (
    <>
      {ground("#fdf0cf")}
      <g transform="translate(92 96)">
        <rect x="-32" y="-36" width="64" height="36" fill="#fff" stroke={INK} strokeWidth="2" />
        <path d="M-40 -34 0 -66l40 32Z" fill="#f2a20c" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
        <path d="M-28 -40 L-8 -56 L-8 -50 L-28 -34Z" fill="#2a7fc0" />
        <rect x="-8" y="-18" width="14" height="18" fill={INK} />
        <rect x="12" y="-28" width="12" height="10" fill="#bfe8ff" stroke={INK} strokeWidth="1.2" />
      </g>
      <g transform="translate(140 86)">
        <rect width="30" height="9" rx="4" fill="#4fb3e8" stroke={INK} strokeWidth="1.5" />
        <circle cx="7" cy="10" r="3" fill={INK} />
        <circle cx="23" cy="10" r="3" fill={INK} />
      </g>
      <circle cx="40" cy="26" r="9" fill="#ffc22e" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M92 ${18 - i * 6} a${8 + i * 6} ${8 + i * 6} 0 0 1 ${16 + i * 12} 0`} transform={`translate(${-8 - i * 6} 0)`} stroke="#f2a20c" strokeWidth="2" fill="none" opacity={1 - i * 0.25} />
      ))}
    </>
  ),
  // Foresight: a lighthouse scanning the horizon
  foresight: (
    <>
      <path d="M0 96c40-6 80-6 120-2s60 4 80 0v26H0Z" fill="#a9d3ee" />
      <path d="M0 104c50-4 100-4 200 0v16H0Z" fill="#8cc4e6" />
      <g transform="translate(70 100)">
        <path d="M-12 0-7 -56h14l5 56Z" fill="#fff" stroke={INK} strokeWidth="2" />
        <path d="M-10 -18h20M-9 -36h18" stroke="#ec4c76" strokeWidth="6" />
        <rect x="-9" y="-68" width="18" height="12" fill="#ffd23f" stroke={INK} strokeWidth="2" />
        <path d="M-12 -68 0 -78l12 10Z" fill="#4a68d8" stroke={INK} strokeWidth="2" />
      </g>
      <path d="M80 -2 L200 -20 L200 30 Z" transform="translate(0 40)" fill="#ffd23f" opacity=".35" className="beam" />
    </>
  ),
  // Opportunities: a seedling growing a lightbulb
  opportunities: (
    <>
      {ground("#d3f1f6")}
      <path d="M100 100 C100 80 100 70 100 56" stroke="#2fa560" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M100 82c-14-2-22-12-22-12s12-6 22 4Zm0-8c12-4 20-14 20-14s-14-2-20 8Z" fill="#5cc283" stroke={INK} strokeWidth="1.2" />
      <g transform="translate(100 38)">
        <circle r="16" fill="#ffd23f" stroke={INK} strokeWidth="2" />
        <rect x="-6" y="14" width="12" height="6" rx="1" fill="#c9d9e4" stroke={INK} strokeWidth="1.5" />
        <path d="M-4 0 0 6 4 0" stroke={INK} strokeWidth="1.5" fill="none" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
          <line key={r} x1="0" y1="-22" x2="0" y2="-28" stroke="#ffc22e" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${r})`} />
        ))}
      </g>
    </>
  ),
};
