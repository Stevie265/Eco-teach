import type { ReactNode } from "react";

/**
 * Rating plate: the metal nameplate found on the back of every appliance
 * ("MODEL · 230V ~ 50Hz · 3kW"). Eco-teach uses it as its card form:
 * rivets, a ruled header, a spec grid of readouts and a segmented meter.
 */
export function RatingPlate({
  code,
  note,
  title,
  subtitle,
  specs,
  meter,
  accent,
  children,
  className = "",
}: {
  code: string;
  /** short readout shown top-right of the header, e.g. "6 lessons · 1.2h" */
  note?: string;
  title: string;
  subtitle?: string;
  specs?: { k: string; v: string }[];
  meter?: { done: number; live: number; total: number };
  accent: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`plate plate-rivets overflow-hidden rounded-2xl ${className}`}>
      <div className="flex items-center justify-between gap-2 border-b-[1.5px] border-ink px-6 py-1.5">
        <span className="readout text-[10px] font-bold" style={{ color: accent }}>
          {code}
        </span>
        {note && <span className="readout truncate text-[10px] font-bold text-ink-soft">{note}</span>}
      </div>
      {children}
      <div className="px-3 pb-3 pt-2.5 sm:px-4 sm:pb-4">
        <h3 className="font-display text-base leading-tight text-ink sm:text-lg md:text-xl">{title}</h3>
        {subtitle && <p className="mt-0.5 hidden text-sm text-ink-soft sm:block">{subtitle}</p>}
        {specs && (
          <dl className="mt-2.5 grid grid-flow-col divide-x-[1.5px] divide-ink/15 border-y-[1.5px] border-ink/15 py-1.5">
            {specs.map((s) => (
              <div key={s.k} className="px-2 first:pl-0">
                <dt className="readout text-[9px] font-bold text-ink-soft sm:text-[10px]">{s.k}</dt>
                <dd className="readout text-xs font-bold text-ink sm:text-sm">{s.v}</dd>
              </div>
            ))}
          </dl>
        )}
        {meter && <SegmentMeter {...meter} accent={accent} />}
      </div>
    </div>
  );
}

/** One cell per lesson: filled = complete, outlined = live, hatched = in development */
export function SegmentMeter({ done, live, total, accent }: { done: number; live: number; total: number; accent: string }) {
  return (
    <div className="mt-2.5 flex gap-1" role="img" aria-label={`${done} of ${total} lessons complete, ${live} live`}>
      {Array.from({ length: total }).map((_, i) => {
        const state = i < done ? "done" : i < live ? "live" : "soon";
        return (
          <span
            key={i}
            className="h-2.5 flex-1 rounded-[3px] border-[1.5px]"
            style={{
              borderColor: state === "soon" ? "rgba(27,42,74,.25)" : "#1b2a4a",
              background: state === "done" ? accent : state === "live" ? "#fffdf7" : "repeating-linear-gradient(135deg, rgba(27,42,74,.18) 0 2px, transparent 2px 5px)",
            }}
          />
        );
      })}
    </div>
  );
}
