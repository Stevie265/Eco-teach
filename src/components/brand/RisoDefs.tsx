/**
 * Global SVG definitions for the riso-print look: halftone dot patterns in each
 * spot ink, and a paper-grain filter. Rendered once in the layout and referenced
 * from any inline SVG via url(#id).
 */
export function RisoDefs() {
  const dots = (id: string, color: string, size: number, r: number, opacity = 1) => (
    <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse" patternTransform="rotate(22)">
      <circle cx={size / 2} cy={size / 2} r={r} fill={color} opacity={opacity} />
    </pattern>
  );
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden focusable="false">
      <defs>
        {dots("ht-ink", "#1b2a4a", 6, 1.1, 0.35)}
        {dots("ht-ink-dense", "#1b2a4a", 4.5, 1.2, 0.4)}
        {dots("ht-meadow", "#1f7a43", 6, 1.5, 0.45)}
        {dots("ht-sky", "#2a7fc0", 6, 1.3, 0.35)}
        {dots("ht-sun", "#f2a20c", 5, 1.4, 0.6)}
        {dots("ht-coral", "#d4472a", 5, 1.2, 0.45)}
        <linearGradient id="fade-down" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="shade-mask" maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill="url(#fade-down)" />
        </mask>
        <filter id="paper-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0.1  0 0 0 0 0.15  0 0 0 0 0.25  0 0 0 0.09 0" />
        </filter>
      </defs>
    </svg>
  );
}

/** Full-bleed paper grain overlay */
export function Grain({ className = "" }: { className?: string }) {
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden>
      <rect width="100%" height="100%" filter="url(#paper-grain)" />
    </svg>
  );
}
