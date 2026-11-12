"use client";

import { useState } from "react";

const ERAS = [
  {
    id: "muscle",
    label: "Muscle & fire",
    when: "Prehistory onwards",
    color: "#b5762a",
    what: "Human and animal muscle did the work; burning wood, straw and dung gave heat and light.",
    unlocked: "Cooking, warmth, farming with draught animals.",
    legacy: "Traditional biomass is still a major energy source for cooking and heating in many lower-income countries.",
  },
  {
    id: "wind-water",
    label: "Wind & water",
    when: "Antiquity to 1700s",
    color: "#5aa6c9",
    what: "Watermills and windmills ground grain and pumped water; sails powered trade.",
    unlocked: "Mechanical work independent of muscle, plus global trade routes.",
    legacy: "Site-dependent and variable, a challenge that modern wind and hydro still manage.",
  },
  {
    id: "coal",
    label: "Coal & steam",
    when: "1700s to 1900s",
    color: "#3f4f46",
    what: "Coal fed steam engines, first to pump water out of mines, then to drive factories, railways and ships.",
    unlocked: "The industrial revolution: energy on demand, anywhere coal could be carried.",
    legacy: "Air pollution, and the start of large-scale CO₂ emissions.",
  },
  {
    id: "electric",
    label: "Electricity",
    when: "1880s onwards",
    color: "#eeb33f",
    what: "Power stations (first in London and New York in 1882) turned fuel into electricity that could be sent down wires.",
    unlocked: "Light, motors and appliances in every home, and eventually the grid.",
    legacy: "A carrier, not a source. It is only as clean as what generates it.",
  },
  {
    id: "oil-gas",
    label: "Oil & gas",
    when: "20th century",
    color: "#d9602e",
    what: "Oil powered cars, planes and petrochemicals. Natural gas heated homes and, later, generated much of Britain's electricity.",
    unlocked: "Mass mobility, plastics and cheap home heating.",
    legacy: "Geopolitical dependence and price shocks, as seen in 1973 and 2022.",
  },
  {
    id: "renewables",
    label: "Renewables & storage",
    when: "2000s onwards",
    color: "#3d8b5d",
    what: "Wind and solar costs fell sharply; batteries began to store electricity at scale.",
    unlocked: "Low-carbon electricity, and homes that generate and store their own power.",
    legacy: "Still being written: variability, grid upgrades, materials and fair access.",
  },
];

export function EnergyTimeline() {
  const [active, setActive] = useState(0);
  const era = ERAS[active];
  return (
    <div className="rounded-2xl border border-sand bg-white p-4 sm:p-6">
      <div className="relative mb-6">
        <div className="absolute left-0 right-0 top-5 h-1 rounded-full bg-gradient-to-r from-[#b5762a] via-[#3f4f46] via-50% to-[#3d8b5d] opacity-40" />
        <ol className="relative grid grid-cols-6 gap-1" role="tablist" aria-label="Energy eras">
          {ERAS.map((e, i) => (
            <li key={e.id} className="flex flex-col items-center text-center">
              <button
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className="group flex flex-col items-center gap-2"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white text-sm font-bold text-white shadow transition group-hover:scale-110"
                  style={{ background: e.color, transform: i === active ? "scale(1.18)" : undefined }}
                >
                  {i + 1}
                </span>
                <span className={`text-[11px] leading-tight sm:text-xs ${i === active ? "font-semibold text-ink" : "text-ink-soft"}`}>{e.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div key={era.id} className="animate-rise rounded-xl p-5" style={{ background: `${era.color}14`, borderLeft: `4px solid ${era.color}` }}>
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: era.color }}>
          {era.when}
        </div>
        <h4 className="font-display mb-3 text-2xl text-ink">{era.label}</h4>
        <dl className="grid gap-3 text-[15px] sm:grid-cols-3">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">What changed</dt>
            <dd className="mt-1">{era.what}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">What it unlocked</dt>
            <dd className="mt-1">{era.unlocked}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">What it left behind</dt>
            <dd className="mt-1">{era.legacy}</dd>
          </div>
        </dl>
      </div>
      <div className="mt-4 flex justify-between">
        <button className="text-sm font-medium text-forest-700 disabled:opacity-30" disabled={active === 0} onClick={() => setActive(active - 1)}>
          ← Earlier
        </button>
        <button className="text-sm font-medium text-forest-700 disabled:opacity-30" disabled={active === ERAS.length - 1} onClick={() => setActive(active + 1)}>
          Later →
        </button>
      </div>
    </div>
  );
}
