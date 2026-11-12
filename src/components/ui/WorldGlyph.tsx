/**
 * Eco-teach schematic glyphs.
 * Each world is represented by a symbol borrowed from electrical single-line diagrams,
 * drawn on a 48×48 grid with a consistent 2.4px stroke. Wire "terminals" leave the
 * left and right edges so a glyph can sit on the current line.
 *
 *   history        → generator (G~): where the power story begins
 *   energy-system  → transformer: two coupled windings
 *   climate        → earth: the ground symbol, literally "Earth"
 *   pestel         → six-way junction: six forces meeting at one node
 *   technology     → battery cell
 *   business       → meter: what gets measured gets paid
 *   startups       → switch, mid-throw: disruption
 *   future-home    → home on a supply connection
 *   foresight      → aerial: picking up weak signals
 *   opportunities  → lamp: the schematic symbol for a light
 */
export function WorldGlyph({ glyph, className = "", color = "currentColor", terminals = true }: { glyph: string; className?: string; color?: string; terminals?: boolean }) {
  const s = { fill: "none", stroke: color, strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const T = (x1: number, x2: number) =>
    terminals ? (
      <>
        <path {...s} d={`M3 24H${x1} M${x2} 24H45`} />
        <circle cx="3" cy="24" r="1.8" fill={color} />
        <circle cx="45" cy="24" r="1.8" fill={color} />
      </>
    ) : null;

  const glyphs: Record<string, React.ReactNode> = {
    // generator: circle with a sine wave
    spiral: (
      <>
        {T(12, 36)}
        <circle {...s} cx="24" cy="24" r="12" />
        <path {...s} d="M17 24c2.3-4.5 4.7-4.5 7 0s4.7 4.5 7 0" />
      </>
    ),
    // transformer: two overlapping circles
    pulse: (
      <>
        {T(9, 39)}
        <circle {...s} cx="19" cy="24" r="10" />
        <circle {...s} cx="29" cy="24" r="10" />
      </>
    ),
    // earth / ground symbol
    leaf: (
      <>
        {terminals && (
          <>
            <path {...s} d="M3 14H24" />
            <circle cx="3" cy="14" r="1.8" fill={color} />
          </>
        )}
        <path {...s} d="M24 14V26 M13 26H35 M17 32H31 M21 38H27" />
      </>
    ),
    // six-way junction node
    compass: (
      <>
        {T(17, 31)}
        <circle cx="24" cy="24" r="4" fill={color} />
        <path {...s} d="M24 20V9 M24 28V39 M20.5 22l-8-6 M27.5 26l8 6 M27.5 22l8-6 M20.5 26l-8 6" />
      </>
    ),
    // battery cell: long + short plates
    bolt: (
      <>
        {T(19, 29)}
        <path {...s} d="M19 12V36" />
        <path {...s} strokeWidth={4} d="M29 18V30" />
        <path {...s} strokeWidth={2} d="M13 13h4M15 11v4 M33 13h4" />
      </>
    ),
    // meter: dial with needle
    coins: (
      <>
        {T(12, 36)}
        <circle {...s} cx="24" cy="24" r="12" />
        <path {...s} d="M17 28a8 8 0 0 1 14 0" strokeWidth={1.8} />
        <path {...s} d="M24 28l5-8" />
        <circle cx="24" cy="28" r="1.8" fill={color} />
      </>
    ),
    // switch mid-throw
    rocket: (
      <>
        {T(15, 33)}
        <circle cx="15" cy="24" r="2.4" fill={color} />
        <circle cx="33" cy="24" r="2.4" fill="none" stroke={color} strokeWidth={2.4} />
        <path {...s} d="M15 24 31 13" />
        <path {...s} strokeWidth={1.6} strokeDasharray="1.5 3" d="M31 13a17 17 0 0 1 2 8" />
      </>
    ),
    // home on a supply connection
    home: (
      <>
        {T(13, 35)}
        <path {...s} d="M13 24V36H35V24 M10 26 24 13l14 13" />
        <path {...s} d="M24 36V29" />
      </>
    ),
    // aerial with radiating arcs
    eye: (
      <>
        {terminals && (
          <>
            <path {...s} d="M3 40H24" />
            <circle cx="3" cy="40" r="1.8" fill={color} />
          </>
        )}
        <path {...s} d="M24 40V20 M17 12l7 8 7-8" />
        <path {...s} strokeWidth={1.8} d="M34 9a12 12 0 0 1 4 9 M38 5a18 18 0 0 1 5 13" />
      </>
    ),
    // lamp: circle with a cross
    spark: (
      <>
        {T(12, 36)}
        <circle {...s} cx="24" cy="24" r="12" />
        <path {...s} d="M15.5 15.5l17 17 M32.5 15.5l-17 17" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {glyphs[glyph] ?? glyphs.spark}
    </svg>
  );
}

/** Small schematic icons used in place of emoji throughout the content. */
export function Sym({ name, className = "h-5 w-5", color = "currentColor" }: { name: "wind" | "sun" | "battery" | "car" | "heat" | "flame" | "drop" | "muscle" | "pick" | "bolt" | "kettle" | "star" | "thought" | "plug"; className?: string; color?: string }) {
  const s = { fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const map: Record<string, React.ReactNode> = {
    wind: <path {...s} d="M3 9h11a3 3 0 1 0-3-3 M3 14h15a3 3 0 1 1-3 3 M3 19h7" />,
    sun: (
      <>
        <circle {...s} cx="12" cy="12" r="4" />
        <path {...s} d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
      </>
    ),
    battery: (
      <>
        <rect {...s} x="3" y="7" width="16" height="10" rx="2" />
        <path {...s} d="M21 10v4 M7 10v4M11 10v4" />
      </>
    ),
    car: (
      <>
        <path {...s} d="M3 15v-3l2-5h14l2 5v3Z" />
        <circle {...s} cx="7.5" cy="17" r="1.8" />
        <circle {...s} cx="16.5" cy="17" r="1.8" />
      </>
    ),
    heat: <path {...s} d="M7 20c-2-3 2-5 0-8s2-5 0-8 M12 20c-2-3 2-5 0-8s2-5 0-8 M17 20c-2-3 2-5 0-8s2-5 0-8" />,
    flame: <path {...s} d="M12 21c-4 0-6-3-6-6 0-4 4-6 4-10 3 2 4 4 4 6 1-1 2-2 2-3 2 2 2 4 2 7 0 3-2 6-6 6Z" />,
    drop: <path {...s} d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z" />,
    muscle: <path {...s} d="M5 18c0-6 2-10 5-12l3 2-2 3 3 1c3-2 6 0 6 4 0 3-3 5-7 5H8" />,
    pick: <path {...s} d="M4 20 15 9 M11 5c4-1 7 0 9 3-3-1-6 0-8 1 M13 7l4 4" />,
    bolt: <path {...s} d="M13 2 5 14h6l-1 8 8-12h-6Z" />,
    kettle: <path {...s} d="M5 19h12l-1-9H6Z M8 10V8a3 3 0 0 1 6 0v2 M17 12l3-2" />,
    star: <path {...s} d="m12 3 2.6 5.6 6 .7-4.5 4 1.3 6L12 16.4 6.6 19.3l1.3-6-4.5-4 6-.7Z" />,
    thought: <path {...s} d="M7 15a5 5 0 1 1 2-9.6A5 5 0 0 1 18 7a4 4 0 0 1-1 8Z M8 19h.01 M5 21h.01" />,
    plug: <path {...s} d="M8 3v5M16 3v5 M6 8h12v3a6 6 0 0 1-12 0Z M12 17v4" />,
  };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {map[name]}
    </svg>
  );
}
