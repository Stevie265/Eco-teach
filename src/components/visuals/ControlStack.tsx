"use client";

import { useState } from "react";

const LAYERS = [
  {
    id: "derms",
    name: "DERMS",
    full: "Distributed Energy Resource Management System",
    who: "Distribution network operators (DNOs / DSOs)",
    goal: "Keep the local network safe: voltages, cable and transformer limits",
    speed: "Seconds to hours",
    example: "Limits solar export on a congested street on a sunny afternoon.",
    color: "#4b5fb0",
  },
  {
    id: "vpp",
    name: "VPP",
    full: "Virtual Power Plant",
    who: "Aggregators, suppliers, device makers",
    goal: "Earn revenue by making many devices act and trade like one power plant",
    speed: "Sub-second to day-ahead",
    example: "Offers 20 MW of home batteries into a balancing market.",
    color: "#2f7d9a",
  },
  {
    id: "drms",
    name: "DRMS",
    full: "Demand Response Management System",
    who: "Suppliers and utilities running programmes",
    goal: "Enrol customers, call events, measure and reward demand changes",
    speed: "Hours to day-ahead notice",
    example: "'Cut use 5–6pm tomorrow and earn rewards', then calculates each customer's saving.",
    color: "#3d8b5d",
  },
  {
    id: "hems",
    name: "HEMS",
    full: "Home Energy Management System",
    who: "The household (via an app, hub, supplier or device maker)",
    goal: "Lower the household's bill and carbon while keeping comfort",
    speed: "Minutes to hours",
    example: "Pre-heats the house and charges the car when electricity is cheap.",
    color: "#c58a17",
  },
];

export function ControlStack() {
  const [active, setActive] = useState("hems");
  const layer = LAYERS.find((l) => l.id === active)!;
  return (
    <div className="rounded-2xl card-chunky bg-white p-4 sm:p-6">
      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-2" role="tablist" aria-label="Control layers" aria-orientation="vertical">
          {LAYERS.map((l, i) => (
            <button
              key={l.id}
              role="tab"
              aria-selected={active === l.id}
              onClick={() => setActive(l.id)}
              className="flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition"
              style={{
                borderColor: active === l.id ? l.color : "transparent",
                background: active === l.id ? `${l.color}18` : "#f6f1e7",
                marginLeft: `${i * 6}px`,
                width: `calc(100% - ${i * 6}px)`,
              }}
            >
              <span className="flex h-10 w-16 items-center justify-center rounded-lg font-mono text-sm font-bold text-white" style={{ background: l.color }}>
                {l.name}
              </span>
              <span className="text-sm">{l.full}</span>
            </button>
          ))}
          <div className="flex items-center gap-2 pl-6 pt-2 text-xs text-ink-soft">
            <span className="flex gap-1" aria-hidden>
              ☀️🔋🚗♨️
            </span>
            Devices (DERs) sit underneath every layer
          </div>
        </div>
        <div key={layer.id} className="animate-rise rounded-xl p-5" style={{ background: `${layer.color}12`, borderLeft: `4px solid ${layer.color}` }}>
          <div className="font-mono text-sm font-bold" style={{ color: layer.color }}>
            {layer.name}
          </div>
          <h4 className="font-display mb-4 text-2xl">{layer.full}</h4>
          <dl className="space-y-3 text-[15px]">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Typically run by</dt>
              <dd>{layer.who}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Optimises for</dt>
              <dd>{layer.goal}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Timescale</dt>
              <dd>{layer.speed}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Example</dt>
              <dd>{layer.example}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
