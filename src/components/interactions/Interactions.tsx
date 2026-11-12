"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Check, RotateCcw, X } from "lucide-react";
import type { InteractionSpec } from "@/content/types";
import { VISUALS } from "../visuals/registry";

type Done = () => void;

export function Interaction({ spec, onDone }: { spec: InteractionSpec; onDone: Done }) {
  switch (spec.kind) {
    case "order":
      return <OrderTask spec={spec} onDone={onDone} />;
    case "sort":
      return <SortTask spec={spec} onDone={onDone} />;
    case "scenario":
      return <ScenarioTask spec={spec} onDone={onDone} />;
    case "component": {
      const C = VISUALS[spec.component];
      return C ? <C {...(spec.props ?? {})} /> : null;
    }
  }
}

/* ---------- Order ---------- */
function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function OrderTask({ spec, onDone }: { spec: Extract<InteractionSpec, { kind: "order" }>; onDone: Done }) {
  const initial = useMemo(() => {
    let s = shuffle(spec.items, 7);
    if (s.map((i) => i.id).join() === spec.solution.join()) s = s.reverse();
    return s;
  }, [spec]);
  const [items, setItems] = useState(initial);
  const [checked, setChecked] = useState(false);
  const correctCount = items.filter((it, i) => it.id === spec.solution[i]).length;
  const allRight = correctCount === items.length;

  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
    setChecked(false);
  };

  return (
    <div className="rounded-2xl card-chunky bg-white p-4 sm:p-6">
      <p className="mb-4 text-sm text-ink-soft">{spec.instructions}</p>
      <ol className="space-y-2">
        {items.map((it, i) => {
          const ok = checked && it.id === spec.solution[i];
          const bad = checked && !ok;
          return (
            <li
              key={it.id}
              className={`flex items-center gap-3 rounded-xl border-2 bg-paper p-3 transition ${ok ? "border-moss-500 bg-moss-100/60" : bad ? "border-ember/60" : "border-transparent"}`}
            >
              <span className="w-6 text-center font-mono text-sm text-ink-soft">{i + 1}</span>
              <span className="flex-1 text-[15px]">{it.label}</span>
              <span className="flex gap-1">
                <button className="rounded-lg p-2 hover:bg-white disabled:opacity-25" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move "${it.label}" up`}>
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-2 hover:bg-white disabled:opacity-25" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label={`Move "${it.label}" down`}>
                  <ArrowDown className="h-4 w-4" />
                </button>
              </span>
            </li>
          );
        })}
      </ol>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          className="btn btn-primary text-sm"
          onClick={() => {
            setChecked(true);
            if (allRight) onDone();
          }}
        >
          Check order
        </button>
        {checked && (
          <span className={`text-sm font-medium ${allRight ? "text-moss-500" : "text-ember"}`} role="status">
            {allRight ? "Spot on." : `${correctCount} of ${items.length} in the right place. Keep adjusting.`}
          </span>
        )}
        {checked && !allRight && (
          <button className="text-sm text-ink-soft underline" onClick={() => { setItems(spec.solution.map((id) => spec.items.find((x) => x.id === id)!)); setChecked(true); onDone(); }}>
            Show me
          </button>
        )}
      </div>
      {checked && allRight && <p className="animate-rise mt-4 rounded-xl bg-sprout-soft p-4 text-[15px]">{spec.feedback}</p>}
    </div>
  );
}

/* ---------- Sort into buckets ---------- */
function SortTask({ spec, onDone }: { spec: Extract<InteractionSpec, { kind: "sort" }>; onDone: Done }) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(spec.items[0]?.id ?? null);
  const [revealed, setRevealed] = useState(false);
  const remaining = spec.items.filter((i) => !placed[i.id]);
  const allPlaced = remaining.length === 0;
  const score = spec.items.filter((i) => placed[i.id] === i.bucket).length;

  const place = (bucket: string) => {
    if (!selected) return;
    const next = { ...placed, [selected]: bucket };
    setPlaced(next);
    const nextItem = spec.items.find((i) => !next[i.id]);
    setSelected(nextItem?.id ?? null);
    if (!nextItem) {
      setRevealed(true);
      onDone();
    }
  };

  return (
    <div className="rounded-2xl card-chunky bg-white p-4 sm:p-6">
      <p className="mb-4 text-sm text-ink-soft">{spec.instructions}</p>
      {!allPlaced && (
        <div className="mb-5 flex flex-wrap gap-2" aria-label="Items to sort">
          {remaining.map((it) => (
            <button
              key={it.id}
              onClick={() => setSelected(it.id)}
              aria-pressed={selected === it.id}
              className={`rounded-xl border-2 px-3 py-2 text-left text-sm transition ${selected === it.id ? "border-forest-700 bg-sprout-soft shadow-md" : "border-sand bg-paper hover:border-moss-400"}`}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
      <div className={`grid gap-3 ${spec.buckets.length > 2 ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
        {spec.buckets.map((b) => (
          <div key={b.id} className="rounded-xl border-2 border-dashed border-sand bg-paper/60 p-3">
            <button
              onClick={() => place(b.id)}
              disabled={!selected}
              className="mb-2 w-full rounded-lg bg-forest-800 px-3 py-2 text-left text-paper transition hover:bg-forest-700 disabled:cursor-default disabled:bg-forest-800/70"
            >
              <div className="text-sm font-semibold">{b.label}</div>
              {b.hint && <div className="text-xs text-moss-300">{b.hint}</div>}
            </button>
            <ul className="space-y-1.5">
              {spec.items
                .filter((i) => placed[i.id] === b.id)
                .map((i) => {
                  const ok = i.bucket === b.id;
                  return (
                    <li key={i.id} className={`rounded-lg px-3 py-2 text-sm ${revealed ? (ok ? "bg-moss-100" : "bg-ember-soft") : "bg-white"}`}>
                      <div className="flex items-start gap-2">
                        {revealed && (ok ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-moss-500" /> : <X className="mt-0.5 h-4 w-4 shrink-0 text-ember" />)}
                        <span>{i.label}</span>
                      </div>
                      {revealed && (
                        <div className="mt-1 pl-6 text-xs text-ink-soft">
                          {!ok && <strong>Better fit: {spec.buckets.find((x) => x.id === i.bucket)?.label}. </strong>}
                          {i.why}
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
      {revealed && (
        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm font-medium" role="status">
            {score} / {spec.items.length} correct
          </span>
          <button
            className="inline-flex items-center gap-1 text-sm text-ink-soft underline"
            onClick={() => {
              setPlaced({});
              setRevealed(false);
              setSelected(spec.items[0].id);
            }}
          >
            <RotateCcw className="h-3.5 w-3.5" /> Try again
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Scenario ---------- */
function ScenarioTask({ spec, onDone }: { spec: Extract<InteractionSpec, { kind: "scenario" }>; onDone: Done }) {
  const [choice, setChoice] = useState<string | null>(null);
  const picked = spec.choices.find((c) => c.id === choice);
  const tone = { strong: "bg-moss-100 border-moss-500", ok: "bg-[#fdf3dc] border-sun", weak: "bg-ember-soft border-ember" };
  return (
    <div className="rounded-2xl card-chunky bg-white p-4 sm:p-6">
      <div className="mb-4 rounded-xl bg-forest-900 p-5 text-paper">
        <div className="mb-1 text-xs uppercase tracking-widest text-moss-300">Situation</div>
        <p className="text-[16px] leading-relaxed">{spec.situation}</p>
      </div>
      <p className="mb-3 text-sm text-ink-soft">{spec.instructions}</p>
      <div className="space-y-2">
        {spec.choices.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setChoice(c.id);
              onDone();
            }}
            aria-pressed={choice === c.id}
            className={`w-full rounded-xl border-2 p-3 text-left text-[15px] transition ${choice === c.id ? tone[c.quality] : "border-sand bg-paper hover:border-moss-400"}`}
          >
            {c.label}
          </button>
        ))}
      </div>
      {picked && (
        <p className="animate-rise mt-4 rounded-xl bg-paper-2 p-4 text-[15px]" role="status">
          {picked.outcome}
        </p>
      )}
    </div>
  );
}
