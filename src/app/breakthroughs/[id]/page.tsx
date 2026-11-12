import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BREAKTHROUGHS, getBreakthrough } from "@/content/breakthroughs";
import { Breakdown } from "@/components/breakthroughs/Breakdown";
import { FactCard, SourceList } from "@/components/ui/Evidence";
import { Reveal } from "@/components/motion/Motion";
import { MaturityTrack } from "@/components/breakthroughs/MaturityTrack";

export function generateStaticParams() {
  return BREAKTHROUGHS.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: PageProps<"/breakthroughs/[id]">): Promise<Metadata> {
  const { id } = await params;
  const b = getBreakthrough(id);
  return { title: b ? `${b.name}: Breakthrough Breakdown` : "Breakthrough", description: b?.oneLiner };
}

export default async function BreakthroughPage({ params }: PageProps<"/breakthroughs/[id]">) {
  const { id } = await params;
  const b = getBreakthrough(id);
  if (!b) notFound();
  const idx = BREAKTHROUGHS.findIndex((x) => x.id === b.id);
  const next = BREAKTHROUGHS[(idx + 1) % BREAKTHROUGHS.length];

  return (
    <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-10">
      <Link href="/breakthroughs" className="btn btn-secondary px-3 py-1.5 text-sm">
        ← All breakthroughs
      </Link>

      <header className="mt-5">
        <div className="readout text-[11px] font-bold" style={{ color: b.color }}>
          Tech {String(idx + 1).padStart(2, "0")} · {b.category}
        </div>
        <h1 className="font-display t-h1 mt-1 text-forest-900">{b.name}</h1>
        <p className="t-lead mt-2 max-w-2xl text-ink-soft">{b.oneLiner}</p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-lg border-[1.5px] border-ink bg-sun px-3 py-1.5 text-sm font-semibold">
          <span className="readout text-[10px] font-bold">Think of it as</span> {b.analogy}
        </p>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <Breakdown b={b} />
        </div>

        <div className="space-y-5">
          <Reveal>
            <section className="plate rounded-2xl p-4 sm:p-5">
              <div className="readout text-[10px] font-bold" style={{ color: b.color }}>
                The breakthrough
              </div>
              <h2 className="font-display mt-1 text-xl leading-tight text-ink sm:text-2xl">{b.breakthrough.headline}</h2>
              <p className="t-body mt-2 text-ink">{b.breakthrough.body}</p>
            </section>
          </Reveal>

          <div className="space-y-3">
            {b.breakthrough.facts.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <FactCard fact={f} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <section className="plate rounded-2xl p-4 sm:p-5">
              <div className="readout mb-3 text-[10px] font-bold">Maturity</div>
              <MaturityTrack value={b.maturity} color={b.color} />
              <p className="mt-3 text-sm text-ink-soft">{b.maturityNote}</p>
            </section>
          </Reveal>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Reveal>
          <section className="plate h-full rounded-2xl p-4 sm:p-5">
            <div className="readout text-[10px] font-bold text-moss-500">+ Gains</div>
            <ul className="mt-2 space-y-1.5 text-[15px]">
              {b.gains.map((g) => (
                <li key={g} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss-500" />
                  {g}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
        <Reveal delay={0.05}>
          <section className="plate h-full rounded-2xl p-4 sm:p-5">
            <div className="readout text-[10px] font-bold text-ember">− Limits</div>
            <ul className="mt-2 space-y-1.5 text-[15px]">
              {b.limits.map((g) => (
                <li key={g} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                  {g}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <section className="h-full rounded-2xl border-[1.5px] border-ink bg-forest-900 p-4 text-white shadow-[3px_3px_0_#1b2a4a] sm:p-5">
            <div className="readout text-[10px] font-bold text-sun">What it means for homes</div>
            <p className="t-body mt-2">{b.home}</p>
          </section>
        </Reveal>
        <Reveal delay={0.05}>
          <section className="plate h-full rounded-2xl p-4 sm:p-5">
            <div className="readout text-[10px] font-bold">What to watch</div>
            <ul className="mt-2 space-y-1.5 text-[15px]">
              {b.watch.map((w) => (
                <li key={w} className="flex gap-2">
                  <span className="readout text-[10px] font-bold text-ink-soft">→</span>
                  {w}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      </div>

      {b.sources.length > 0 && (
        <details className="plate mt-6 rounded-2xl p-4">
          <summary className="cursor-pointer font-bold">Sources (reviewed {b.reviewed})</summary>
          <div className="mt-4">
            <SourceList refs={b.sources} />
          </div>
        </details>
      )}

      <Link href={`/breakthroughs/${next.id}`} className="plate mt-6 flex items-center justify-between gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5">
        <div>
          <div className="readout text-[10px] font-bold text-ink-soft">Next breakdown</div>
          <div className="font-display text-lg text-ink">{next.name}</div>
        </div>
        <span className="btn btn-primary px-3">→</span>
      </Link>
    </div>
  );
}
