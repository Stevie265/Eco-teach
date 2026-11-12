"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Simplified teaching model of grid frequency.
 * Not a real power-system simulation: frequency drifts in proportion to the
 * supply-demand imbalance divided by system inertia, with a little damping.
 */
function Slider({ label, value, set, min, max, color }: { label: string; value: number; set: (n: number) => void; min: number; max: number; color: string }) {
  return (
    <label className="block">
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium" style={{ color }}>
          {label}
        </span>
        <span className="font-mono">{value.toFixed(1)} GW</span>
      </div>
      <input type="range" className="eco-range w-full" min={min} max={max} step={0.5} value={value} onChange={(e) => set(Number(e.target.value))} />
    </label>
  )
}

export function GridBalancer() {
  const [demand, setDemand] = useState(32); // GW
  const [wind, setWind] = useState(10);
  const [gas, setGas] = useState(17);
  const [nuclear] = useState(5);
  const [battery, setBattery] = useState(0);
  const [tripped, setTripped] = useState(false);
  const [freq, setFreq] = useState(50);
  const [history, setHistory] = useState<number[]>(Array(60).fill(50));
  const [lfdd, setLfdd] = useState(false);
  const [autoReserve, setAutoReserve] = useState(true);
  const f = useRef(50);

  const supply = wind + gas + nuclear + battery - (tripped ? 2 : 0) + (lfdd ? 1.6 : 0);
  const imbalance = supply - demand; // GW
  const inertia = 4 + gas * 0.25 + nuclear * 0.3; // more spinning plant → more inertia

  useEffect(() => {
    const t = setInterval(() => {
      let next = f.current + (imbalance / inertia) * 0.06 - (f.current - 50) * 0.02;
      // automatic frequency response from batteries if enabled
      if (autoReserve && next < 49.8) next += 0.03;
      if (autoReserve && next > 50.2) next -= 0.03;
      next = Math.max(47.5, Math.min(52, next));
      f.current = next;
      setFreq(next);
      setHistory((h) => [...h.slice(1), next]);
      if (next <= 48.8) setLfdd(true);
    }, 120);
    return () => clearInterval(t);
  }, [imbalance, inertia, autoReserve]);

  const status =
    freq <= 48.8 || lfdd
      ? { label: "LFDD triggered: some customers disconnected", cls: "bg-ember text-white" }
      : freq < 49.5 || freq > 50.5
        ? { label: "Outside statutory limits", cls: "bg-ember/80 text-white" }
        : freq < 49.8 || freq > 50.2
          ? { label: "Outside normal operating range", cls: "bg-sun text-ink" }
          : { label: "Normal operating range", cls: "bg-moss-500 text-white" };

  const y = (v: number) => 100 - ((v - 48.5) / (51.5 - 48.5)) * 100;

  function reset() {
    setDemand(32);
    setWind(10);
    setGas(17);
    setBattery(0);
    setTripped(false);
    setLfdd(false);
    f.current = 50;
    setFreq(50);
    setHistory(Array(60).fill(50));
  }

  return (
    <div className="rounded-2xl border border-sand bg-white p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <Slider label="Demand" value={demand} set={setDemand} min={20} max={45} color="#d9602e" />
          <Slider label="Wind" value={wind} set={setWind} min={0} max={20} color="#2f7d9a" />
          <Slider label="Gas" value={gas} set={setGas} min={0} max={25} color="#3f4f46" />
          <Slider label="Battery discharge" value={battery} set={setBattery} min={0} max={5} color="#3d8b5d" />
          <div className="text-sm text-ink-soft">Nuclear: {nuclear} GW (steady)</div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => setTripped(true)}
              disabled={tripped}
              className="rounded-full bg-ember px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
            >
              ⚡ Trip a 2 GW power station
            </button>
            <button onClick={reset} className="rounded-full border border-sand px-4 py-2 text-sm font-semibold">
              Reset
            </button>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="accent-[#1d4d38]" checked={autoReserve} onChange={(e) => setAutoReserve(e.target.checked)} />
            Automatic fast frequency response (batteries)
          </label>
        </div>

        <div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-ink-soft">System frequency</div>
              <div className="font-display text-5xl tabular-nums text-forest-800">{freq.toFixed(2)} Hz</div>
            </div>
            <div className="text-right text-sm">
              <div className="text-ink-soft">Supply − demand</div>
              <div className={`font-mono font-semibold ${Math.abs(imbalance) < 0.3 ? "text-moss-500" : "text-ember"}`}>
                {imbalance >= 0 ? "+" : ""}
                {imbalance.toFixed(1)} GW
              </div>
            </div>
          </div>
          <div className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${status.cls}`} role="status" aria-live="polite">
            {status.label}
          </div>
          <svg viewBox="0 0 300 100" className="mt-3 w-full rounded-lg bg-paper" preserveAspectRatio="none" role="img" aria-label="Frequency trace">
            <rect x="0" y={y(50.2)} width="300" height={y(49.8) - y(50.2)} fill="#dcefe2" />
            <line x1="0" x2="300" y1={y(49.5)} y2={y(49.5)} stroke="#eeb33f" strokeDasharray="4 3" strokeWidth="0.8" />
            <line x1="0" x2="300" y1={y(50.5)} y2={y(50.5)} stroke="#eeb33f" strokeDasharray="4 3" strokeWidth="0.8" />
            <line x1="0" x2="300" y1={y(48.8)} y2={y(48.8)} stroke="#d9602e" strokeDasharray="4 3" strokeWidth="0.8" />
            <polyline fill="none" stroke="#153628" strokeWidth="2" points={history.map((v, i) => `${(i / 59) * 300},${y(v)}`).join(" ")} vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-ink-soft">
            <span>
              <span className="mr-1 inline-block h-2 w-3 bg-moss-100" />
              49.8–50.2 normal
            </span>
            <span>
              <span className="mr-1 inline-block h-0.5 w-3 bg-sun align-middle" />
              49.5 / 50.5 statutory
            </span>
            <span>
              <span className="mr-1 inline-block h-0.5 w-3 bg-ember align-middle" />
              48.8 LFDD
            </span>
          </div>
          <p className="mt-3 text-sm text-ink-soft">
            Inertia (from spinning gas and nuclear plant): <strong className="text-ink">{inertia.toFixed(1)}</strong>. Try cutting gas and raising wind: the same imbalance now moves frequency faster.
          </p>
        </div>
      </div>
    </div>
  );
}
