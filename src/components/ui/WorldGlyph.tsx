/** Distinctive line-art glyphs for each learning world. Pure SVG, no external assets. */
export function WorldGlyph({ glyph, className = "", color = "currentColor" }: { glyph: string; className?: string; color?: string }) {
  const common = { fill: "none", stroke: color, strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, React.ReactNode> = {
    spiral: (
      <>
        <path {...common} d="M24 24c0-2 2-3 3.5-2.5S30 24 29 26.5 24.5 30 21.5 28.5 17 23 19 19.5 26 15 30 17s6.5 7 5.5 11.5S29 37 24 37s-11-4-12-10 2-13 8-15.5S33 10 37 14" />
        <circle cx="37" cy="14" r="2.2" fill={color} />
      </>
    ),
    pulse: (
      <>
        <path {...common} d="M6 26h8l4-10 6 20 5-14 3 4h10" />
        <circle cx="42" cy="26" r="2.2" fill={color} />
      </>
    ),
    leaf: (
      <>
        <path {...common} d="M12 36c0-14 10-24 26-24 0 16-10 26-24 26" />
        <path {...common} d="M12 36 30 20" />
      </>
    ),
    compass: (
      <>
        <circle {...common} cx="24" cy="24" r="14" />
        <path {...common} d="m29 19-3 8-7 2 3-8z" />
        <path {...common} d="M24 6v3M24 39v3M6 24h3M39 24h3" />
      </>
    ),
    bolt: <path {...common} d="M27 6 13 27h10l-3 15 15-22H25z" />,
    coins: (
      <>
        <ellipse {...common} cx="20" cy="16" rx="10" ry="4" />
        <path {...common} d="M10 16v6c0 2.2 4.5 4 10 4s10-1.8 10-4v-6" />
        <path {...common} d="M18 28v4c0 2.2 4.5 4 10 4s10-1.8 10-4v-10c0-2.2-4.5-4-10-4" />
      </>
    ),
    rocket: (
      <>
        <path {...common} d="M30 8c6 2 9 8 9 8l-12 16-8-8L30 8Z" />
        <path {...common} d="M19 24l-7 1-4 5 8 1M27 32l-1 7-5 4-1-8" />
        <circle cx="31" cy="17" r="2.5" fill={color} />
      </>
    ),
    home: (
      <>
        <path {...common} d="M8 23 24 10l16 13" />
        <path {...common} d="M12 21v17h24V21" />
        <path {...common} d="m22 23-3 6h6l-3 6" />
      </>
    ),
    eye: (
      <>
        <path {...common} d="M5 24s7-11 19-11 19 11 19 11-7 11-19 11S5 24 5 24Z" />
        <circle {...common} cx="24" cy="24" r="5" />
        <path {...common} d="M24 5v4M36 9l-2 3M12 9l2 3" />
      </>
    ),
    spark: (
      <>
        <path {...common} d="M24 6v8M24 34v8M6 24h8M34 24h8M11 11l5.5 5.5M31.5 31.5 37 37M37 11l-5.5 5.5M16.5 31.5 11 37" />
        <circle {...common} cx="24" cy="24" r="4" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {paths[glyph] ?? paths.spark}
    </svg>
  );
}
