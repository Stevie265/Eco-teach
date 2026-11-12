"use client";

import { useMemo, useState } from "react";

// Typical, illustrative power ratings (kW) while running.
const APPLIANCES = [
  { id: "kettle", label: "Kettle", kw: 3, hours: 0.2, emoji: "🫖" },
  { id: "fridge", label: "Fridge-freezer (average draw)", kw: 0.08, hours: 24, emoji: "🧊" },
  { id: "shower", label: "Electric shower", kw: 9, hours: 0.15, emoji: "🚿" },
  { id: "tv", label: "TV", kw: 0.1, hours: 4, emoji: "📺" },
  { id: "led", label: "LED bulbs ×10", kw: 0.08, hours: 5, emoji: "💡" },
  { id: "washer", label: "Washing machine (average cycle)", kw: 0.7, hours: 1, emoji: "🧺" },
  { id: "ev", label: "EV home charger", kw: 7, hours: 1.5, emoji: "🚗" },
  { id: "hp", label: "Heat pump (winter, electrical input)", kw: 1.5, hours: 8, emoji: "♨️" },
];

export function ApplianceCalculator() {
  const [on, setOn] = useState<Record<string, boolean>>({ kettle: true, fridge: true, tv: true, led: true });
  const [hours, setHours] = useState<Record<string, number>>(Object.fromEntries(APPLIANCES.map((a) => [a.id, a.hours])));
  const [price, setPrice] = useState(25);

  const rows = APPLIANCES.filter((a) => on[a.id]).map((a) => ({ ...a, h: hours[a.id], kwh: a.kw * hours[a.id] }));
  const peakKw = rows.reduce((s, r) => s + r.kw, 0);
  const dailyKwh = rows.reduce((s, r) => s + r.kwh, 0);
  const yearly = dailyKwh * 365;
  const maxKw = 10;
  const maxKwh = useMemo(() => Math.max(3, ...rows.map((r) => r.kwh)), [rows]);

  return (
    <div className="rounded-2xl border border-sand bg-white p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-2">
          {APPLIANCES.map((a) => (
            <div key={a.id} className={`rounded-xl border p-3 transition ${on[a.id] ? "border-forest-600/40 bg-moss-100/40" : "border-sand"}`}>
              <label className="flex cursor-pointer items-center gap-3">
                <input type="checkbox" className="h-4 w-4 accent-[#1d4d38]" checked={!!on[a.id]} onChange={(e) => setOn({ ...on, [a.id]: e.target.checked })} />
                <span aria-hidden>{a.emoji}</span>
                <span className="flex-1 text-sm font-medium">{a.label}</span>
                <span className="font-mono text-xs text-ink-soft">{a.kw} kW</span>
              </label>
              {on[a.id] && (
                <div className="mt-2 flex items-center gap-3 pl-7">
                  <input
                    type="range"
                    className="eco-range flex-1"
                    min={0}
                    max={a.id === "fridge" ? 24 : 10}
                    step={a.kw >= 3 ? 0.05 : 0.25}
                    value={hours[a.id]}
                    onChange={(e) => setHours({ ...hours, [a.id]: Number(e.target.value) })}
                    aria-label={`${a.label} hours per day`}
                  />
                  <span className="w-24 text-right font-mono text-xs">
                    {hours[a.id] < 1 ? `${Math.round(hours[a.id] * 60)} min` : `${hours[a.id].toFixed(hours[a.id] % 1 ? 2 : 0)} h`}/day
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <div className="rounded-xl bg-forest-900 p-5 text-paper">
            <div className="text-xs uppercase tracking-widest text-moss-300">Power if all on at once</div>
            <div className="font-display text-4xl">{peakKw.toFixed(2)} kW</div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-forest-700">
              <div className="h-full rounded-full bg-ember transition-all" style={{ width: `${Math.min(100, (peakKw / maxKw) * 100)}%` }} />
            </div>
            <p className="mt-2 text-xs text-moss-300">A rate. This is what stresses wires and the grid at peak.</p>
          </div>
          <div className="rounded-xl bg-sprout-soft p-5">
            <div className="text-xs uppercase tracking-widest text-forest-700">Energy per day</div>
            <div className="font-display text-4xl text-forest-800">{dailyKwh.toFixed(2)} kWh</div>
            <div className="mt-3 space-y-1.5">
              {rows
                .sort((x, y) => y.kwh - x.kwh)
                .map((r) => (
                  <div key={r.id} className="flex items-center gap-2 text-xs">
                    <span className="w-24 truncate">{r.label.split(" (")[0]}</span>
                    <div className="h-2 flex-1 rounded-full bg-white">
                      <div className="h-2 rounded-full bg-moss-500 transition-all" style={{ width: `${(r.kwh / maxKwh) * 100}%` }} />
                    </div>
                    <span className="w-14 text-right font-mono">{r.kwh.toFixed(2)}</span>
                  </div>
                ))}
            </div>
            <p className="mt-2 text-xs text-ink-soft">An amount. This is what your bill charges for.</p>
          </div>
          <div className="rounded-xl border border-sand p-4 text-sm">
            <label className="flex items-center justify-between gap-2">
              <span>Unit price (p/kWh)</span>
              <input
                type="number"
                min={1}
                max={100}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value) || 0)}
                className="w-20 rounded-md border border-sand px-2 py-1 text-right font-mono"
              />
            </label>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs text-ink-soft">Per day</div>
                <div className="font-mono font-semibold">£{((dailyKwh * price) / 100).toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs text-ink-soft">Per year (excl. standing charge)</div>
                <div className="font-mono font-semibold">£{((yearly * price) / 100).toFixed(0)}</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-ink-soft">
              ≈ {Math.round(yearly).toLocaleString()} kWh/year vs Ofgem&apos;s &lsquo;typical&rsquo; 2,700 kWh ({Math.round((yearly / 2700) * 100)}%)
            </div>
          </div>
          <p className="rounded-lg bg-paper-2 p-3 text-xs text-ink-soft">
            Try it: compare the kettle and the fridge. The kettle has ~40× the power, but run the fridge for 24 hours and its daily energy can match or beat the kettle&apos;s.
          </p>
        </div>
      </div>
    </div>
  );
}
