import { MATURITY } from "@/content/breakthroughs";

export function MaturityTrack({ value, color, compact = false }: { value: number; color: string; compact?: boolean }) {
  return (
    <div>
      <div className="flex gap-1" role="img" aria-label={`Maturity: ${MATURITY[value]}`}>
        {MATURITY.map((m, i) => (
          <span key={m} className="h-2.5 flex-1 rounded-[3px] border-[1.5px] border-ink" style={{ background: i <= value ? color : "#fffdf7" }} />
        ))}
      </div>
      <div className="readout mt-1.5 flex justify-between text-[9px] font-bold text-ink-soft">
        {compact ? (
          <>
            <span>Maturity</span>
            <span style={{ color }}>{MATURITY[value]}</span>
          </>
        ) : (
          MATURITY.map((m, i) => (
            <span key={m} className={`w-1/5 text-center ${i === value ? "text-ink" : ""}`} style={i === value ? { color } : undefined}>
              {m}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
