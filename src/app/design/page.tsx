import type { Metadata } from "next";
import { WorldGlyph, Sym } from "@/components/ui/WorldGlyph";
import { RatingPlate } from "@/components/brand/RatingPlate";
import { WORLDS } from "@/content/worlds";
import { Reveal } from "@/components/motion/Motion";

export const metadata: Metadata = { title: "Design language" };

const PRINCIPLES = [
  {
    n: "01",
    title: "The current line",
    body: "A single wire runs through Eco-teach. The journey is a circuit, each world a node on it, and your progress inks the wire in. The pulse travelling along it is the product's heartbeat: something is always flowing towards what you should do next.",
  },
  {
    n: "02",
    title: "Symbols from the subject",
    body: "We don't use stock icons or emoji for ideas. Each world is drawn as a symbol from electrical single-line diagrams: a generator for history, a transformer for the energy system, the earth symbol for climate, a lamp for opportunities. Every glyph has wire terminals, so it can plug into the line.",
  },
  {
    n: "03",
    title: "Rating plates",
    body: "Cards borrow the nameplate riveted to the back of every appliance: a ruled header, a spec grid of readouts, a segmented meter. It frames knowledge the way the industry frames equipment: specified, measurable, honest about its limits.",
  },
  {
    n: "04",
    title: "Printed, not rendered",
    body: "Illustrations are made like riso prints: a few spot inks, halftone dots for shade, a slight misregistration, paper grain. It's warm and human, and feels made by hand rather than generated.",
  },
  {
    n: "05",
    title: "Readouts, not trophies",
    body: "Numbers are shown as meter readings in a monospaced face. Finishing a lesson doesn't hand you a cartoon trophy; it takes a reading and lights the circuit to what comes next. The rewards are about understanding, not novelty.",
  },
];

const INKS = [
  { name: "Wire ink", hex: "#1b2a4a", use: "Lines, type, outlines" },
  { name: "Paper", hex: "#f7f1e3", use: "Ground" },
  { name: "Meadow", hex: "#1b8048", use: "Actions, progress" },
  { name: "Sunshine", hex: "#ffc83d", use: "Current, highlights" },
  { name: "Coral", hex: "#ff6b4a", use: "Energy, warnings, misprint" },
  { name: "Sky", hex: "#4fb3e8", use: "Air, water, calm" },
];

const SYMBOL_NOTES: Record<string, string> = {
  history: "Generator",
  "energy-system": "Transformer",
  climate: "Earth",
  pestel: "Six-way junction",
  technology: "Battery cell",
  business: "Meter",
  startups: "Switch, mid-throw",
  "future-home": "Home on a supply",
  foresight: "Aerial",
  opportunities: "Lamp",
};

export default function DesignPage() {
  const w = WORLDS[1];
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-12">
      <div className="readout text-[11px] font-bold text-moss-500">Design language · v2</div>
      <h1 className="font-display t-h1 mt-1 text-forest-900">Current</h1>
      <p className="t-lead mt-3 max-w-2xl text-ink-soft">
        Eco-teach is about energy flowing through systems, from the science to the technology to the business to the customer. So its design is drawn from the real visual language of energy engineering, not from generic app kits.
      </p>

      <section className="mt-10 space-y-4">
        {PRINCIPLES.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.04}>
            <div className="plate flex gap-4 rounded-2xl p-4 sm:p-5">
              <span className="readout shrink-0 text-sm font-bold text-moss-500">{p.n}</span>
              <div>
                <h2 className="font-display text-lg text-ink sm:text-xl">{p.title}</h2>
                <p className="t-body mt-1 text-ink-soft">{p.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="font-display t-h2 text-forest-900">Symbols</h2>
        <p className="t-body mt-1 text-ink-soft">One per world, drawn on a 48px grid with a 2.4px stroke and wire terminals.</p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {WORLDS.map((x) => (
            <div key={x.id} className="plate rounded-2xl p-3 text-center">
              <WorldGlyph glyph={x.glyph} color={x.color} className="mx-auto h-14 w-14" />
              <div className="readout mt-1 text-[10px] font-bold text-ink">{SYMBOL_NOTES[x.id]}</div>
              <div className="text-[11px] text-ink-soft">{x.title}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-ink">
          {(["wind", "sun", "battery", "car", "heat", "flame", "drop", "kettle", "plug", "bolt"] as const).map((n) => (
            <span key={n} className="plate flex h-11 w-11 items-center justify-center rounded-xl">
              <Sym name={n} className="h-6 w-6" />
            </span>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display t-h2 text-forest-900">The rating plate</h2>
          <p className="t-body mt-1 text-ink-soft">Rivets, a ruled header, readouts and a segmented meter: filled for done, outlined for live, hatched for in development.</p>
        </div>
        <RatingPlate
          code="WORLD 02"
          title={w.title}
          subtitle={w.tagline}
          accent={w.color}
          specs={[
            { k: "Lessons", v: "6" },
            { k: "Time", v: "1.3h" },
            { k: "Live", v: "2" },
          ]}
          meter={{ done: 1, live: 2, total: 6 }}
        />
      </section>

      <section className="mt-12">
        <h2 className="font-display t-h2 text-forest-900">Inks</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {INKS.map((c) => (
            <div key={c.hex} className="plate overflow-hidden rounded-2xl">
              <div className="relative h-16 border-b-[1.5px] border-ink" style={{ background: c.hex }}>
                <div className="halftone absolute inset-0 opacity-60" />
              </div>
              <div className="p-3">
                <div className="text-sm font-bold">{c.name}</div>
                <div className="readout text-[11px] text-ink-soft">{c.hex}</div>
                <div className="text-xs text-ink-soft">{c.use}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display t-h2 text-forest-900">Type</h2>
        <div className="plate mt-4 space-y-4 rounded-2xl p-5">
          <div>
            <div className="readout text-[10px] font-bold text-ink-soft">Display · Bricolage Grotesque</div>
            <div className="font-display text-3xl text-ink">Understand the world that&apos;s changing our future.</div>
          </div>
          <div>
            <div className="readout text-[10px] font-bold text-ink-soft">Reading · Inter</div>
            <p className="t-body">Explanations that respect your intelligence, introducing terms gradually.</p>
          </div>
          <div>
            <div className="readout text-[10px] font-bold text-ink-soft">Readouts · JetBrains Mono</div>
            <p className="readout text-lg font-bold">50.00 Hz · 2,500 kWh · +95 XP</p>
          </div>
        </div>
      </section>
    </div>
  );
}
