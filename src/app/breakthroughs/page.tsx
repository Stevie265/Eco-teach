import type { Metadata } from "next";
import Link from "next/link";
import { BREAKTHROUGHS } from "@/content/breakthroughs";
import { MaturityTrack } from "@/components/breakthroughs/MaturityTrack";
import { BreakdownScene } from "@/components/breakthroughs/Scenes";
import { Reveal } from "@/components/motion/Motion";

export const metadata: Metadata = {
  title: "Breakthrough Breakdown",
  description: "The technologies changing energy, each explained in four simple illustrated steps, then what the latest breakthrough actually changed.",
};

export default function BreakthroughsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="max-w-2xl">
        <div className="readout text-[11px] font-bold text-moss-500">Technology explainers</div>
        <h1 className="font-display t-h1 mt-1 text-forest-900">Breakthrough Breakdown</h1>
        <p className="t-lead mt-3 text-ink-soft">
          Complex advances, made simple. Each technology is broken down into four illustrated steps (how it works, then what changed), followed by the breakthrough itself, how mature it is, and what it means for homes.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BREAKTHROUGHS.map((b, i) => (
          <Reveal key={b.id} delay={(i % 3) * 0.06}>
            <Link href={`/breakthroughs/${b.id}`} className="group block h-full transition hover:-translate-y-1">
              <article className="plate plate-rivets flex h-full flex-col overflow-hidden rounded-2xl">
                <div className="flex items-center justify-between border-b-[1.5px] border-ink px-6 py-1.5">
                  <span className="readout text-[10px] font-bold">{b.category}</span>
                  <span className="readout text-[10px] font-bold" style={{ color: b.color }}>
                    Tech {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="relative border-b-[1.5px] border-ink" style={{ background: b.tint }}>
                  <div className="halftone absolute inset-0 opacity-50" />
                  <BreakdownScene id={b.id} frame={b.frames.length - 1} className="relative block aspect-[8/5] w-full" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h2 className="font-display text-lg leading-tight text-ink sm:text-xl">{b.name}</h2>
                  <p className="mt-1 text-sm text-ink-soft">{b.oneLiner}</p>
                  <div className="mt-auto pt-4">
                    <MaturityTrack value={b.maturity} color={b.color} compact />
                  </div>
                </div>
              </article>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
