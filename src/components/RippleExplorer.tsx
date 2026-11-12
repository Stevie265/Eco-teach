"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Lightbulb, Play, Plus, Trash2, Waves } from "lucide-react";
import { LEVELS, RIPPLE_TRENDS, type RippleLevel, type RippleNode, type RippleTrend } from "@/content/ripples";
import { saveRipple, useHydrated, useProgress, type RippleCustomNode } from "@/lib/progress";
import { EvidenceBadge, SourceChips } from "./ui/Evidence";

const CUSTOM: RippleTrend = {
  id: "custom",
  title: "Build your own ripple",
  lens: "Market",
  summary: "Start from any external change you've spotted and map its consequences yourself.",
  nodes: [],
  opportunity: "",
  questions: ["What's the first-order effect?", "Who has to respond, and how?", "Where does the customer feel it?", "What opportunity does that open, and for whom?"],
};

const LEVEL_COLOR: Record<RippleLevel, { bg: string; ring: string; text: string }> = {
  environment: { bg: "#e0e4f5", ring: "#4b5fb0", text: "#2f3d7a" },
  industry: { bg: "#d9ebe3", ring: "#2b6b55", text: "#1d4d38" },
  customer: { bg: "#f8ecd0", ring: "#c58a17", text: "#7a5309" },
};

type AnyNode = (RippleNode | (RippleCustomNode & { custom: true; lens?: string })) & { n: number };

export function RippleExplorer() {
  const p = useProgress();
  const hydrated = useHydrated();
  const trends = [...RIPPLE_TRENDS, CUSTOM];
  const [trendId, setTrendId] = useState(RIPPLE_TRENDS[0].id);
  const [revealed, setRevealed] = useState(99);
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState<{ level: RippleLevel; title: string; detail: string; from: string }>({ level: "environment", title: "", detail: "", from: "" });
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  const trend = trends.find((t) => t.id === trendId)!;
  const custom = useMemo(() => (hydrated ? p.ripple.custom[trendId] ?? [] : []), [p.ripple.custom, trendId, hydrated]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNote(hydrated ? p.ripple.notes[trendId] ?? "" : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trendId, hydrated]);

  const nodes: AnyNode[] = [...trend.nodes, ...custom.map((c) => ({ ...c, custom: true as const }))].map((n, i) => ({ ...n, n: i + 1 }));
  const byId = new Map(nodes.map((n) => [n.id, n]));

  // highlight ancestors + descendants of the selected node
  const lit = useMemo(() => {
    if (!selected) return new Set<string>();
    const s = new Set<string>([selected]);
    let cur = byId.get(selected);
    while (cur?.from && byId.has(cur.from)) {
      s.add(cur.from);
      cur = byId.get(cur.from);
    }
    let grew = true;
    while (grew) {
      grew = false;
      for (const n of nodes) if (n.from && s.has(n.from) && !s.has(n.id) && isDesc(n.id)) {
        s.add(n.id);
        grew = true;
      }
    }
    return s;
    function isDesc(id: string) {
      let c = byId.get(id);
      while (c?.from) {
        if (c.from === selected) return true;
        c = byId.get(c.from);
      }
      return false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, trendId, custom.length]);

  function play() {
    setSelected(null);
    setRevealed(0);
    let k = 0;
    const t = setInterval(() => {
      k++;
      setRevealed(k);
      if (k >= nodes.length) clearInterval(t);
    }, 650);
  }

  function addNode() {
    if (!form.title.trim()) return;
    const node: RippleCustomNode = { id: `c${Date.now()}`, level: form.level, title: form.title.trim(), detail: form.detail.trim(), from: form.from || undefined };
    saveRipple(trendId, [...custom, node]);
    setForm({ level: form.level, title: "", detail: "", from: node.id });
    setSelected(node.id);
  }

  function removeNode(id: string) {
    saveRipple(trendId, custom.filter((c) => c.id !== id).map((c) => (c.from === id ? { ...c, from: undefined } : c)));
    if (selected === id) setSelected(null);
  }

  function copyText() {
    const lines = [`Ripple: ${trend.id === "custom" ? note.split("\n")[0] || "My ripple" : trend.title}`, ""];
    for (const lvl of LEVELS) {
      lines.push(`## ${lvl.label}`);
      for (const n of nodes.filter((x) => x.level === lvl.id)) {
        const from = n.from ? byId.get(n.from) : undefined;
        lines.push(`${n.n}. ${n.title}${from ? ` (from #${from.n})` : ""}${"custom" in n ? " [my addition]" : ""}`);
        if (n.detail) lines.push(`   ${n.detail}`);
      }
      lines.push("");
    }
    if (trend.opportunity) lines.push(`Opportunity: ${trend.opportunity}`, "");
    if (note) lines.push("My notes:", note);
    navigator.clipboard?.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const sel = selected ? byId.get(selected) : undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      {/* trend picker */}
      <aside className="space-y-2" aria-label="Choose a trend">
        <div className="text-xs font-bold uppercase tracking-widest text-ink-soft">Choose a trend</div>
        {trends.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTrendId(t.id);
              setSelected(null);
              setRevealed(99);
              setForm((f) => ({ ...f, from: "" }));
            }}
            aria-pressed={trendId === t.id}
            className={`w-full rounded-2xl border-2 p-3 text-left transition ${trendId === t.id ? "border-forest-700 bg-white shadow-md" : "border-transparent bg-white/60 hover:bg-white"}`}
          >
            <div className="text-[11px] font-semibold uppercase tracking-wider text-moss-500">{t.id === "custom" ? "Blank canvas" : t.lens}</div>
            <div className="font-semibold leading-snug">{t.title}</div>
            {hydrated && (p.ripple.custom[t.id]?.length ?? 0) > 0 && <div className="mt-1 text-xs text-ink-soft">{p.ripple.custom[t.id].length} of your connections</div>}
          </button>
        ))}
      </aside>

      <div className="min-w-0 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3 rounded-3xl bg-forest-900 p-5 text-paper">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl">{trend.title}</h2>
            <p className="mt-1 text-moss-300">{trend.summary}</p>
          </div>
          <div className="flex gap-2">
            {trend.nodes.length > 0 && (
              <button onClick={play} className="inline-flex items-center gap-2 rounded-full bg-sprout px-4 py-2 text-sm font-semibold text-forest-900">
                <Play className="h-4 w-4" /> Play the ripple
              </button>
            )}
            <button onClick={copyText} className="inline-flex items-center gap-2 rounded-full border border-moss-500 px-4 py-2 text-sm font-semibold">
              <Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy as text"}
            </button>
          </div>
        </div>

        {/* lanes */}
        <div className="grid gap-3 md:grid-cols-3">
          {LEVELS.map((lvl) => {
            const c = LEVEL_COLOR[lvl.id];
            const inLane = nodes.filter((n) => n.level === lvl.id);
            return (
              <section key={lvl.id} className="rounded-3xl p-3" style={{ background: c.bg }} aria-label={lvl.label}>
                <div className="px-1 pb-2">
                  <div className="text-sm font-bold" style={{ color: c.text }}>
                    {lvl.label}
                  </div>
                  <div className="text-xs text-ink-soft">{lvl.blurb}</div>
                </div>
                <div className="space-y-2">
                  {inLane.length === 0 && <div className="rounded-xl border-2 border-dashed border-white/80 p-4 text-center text-xs text-ink-soft">Add a node to this level below</div>}
                  {inLane.map((n) => {
                    const visible = n.n <= revealed;
                    const from = n.from ? byId.get(n.from) : undefined;
                    const isCustom = "custom" in n;
                    const dim = selected && !lit.has(n.id);
                    return (
                      <button
                        key={n.id}
                        onClick={() => setSelected(selected === n.id ? null : n.id)}
                        aria-pressed={selected === n.id}
                        className={`relative block w-full rounded-2xl bg-white p-3 text-left shadow-sm transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"} ${dim ? "opacity-35" : ""} ${isCustom ? "border-2 border-dashed" : "border-2"}`}
                        style={{ borderColor: selected === n.id ? c.ring : isCustom ? c.ring : "transparent" }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: c.ring }}>
                            {n.n}
                          </span>
                          {from && <span className="text-[11px] text-ink-soft">← from #{from.n}</span>}
                          {isCustom && <span className="ml-auto text-[10px] font-bold uppercase tracking-wider" style={{ color: c.text }}>Yours</span>}
                        </div>
                        <div className="mt-1.5 text-[15px] font-semibold leading-snug">{n.title}</div>
                        {"lens" in n && n.lens && <div className="mt-0.5 text-xs text-ink-soft">{n.lens}</div>}
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* detail */}
        {sel ? (
          <div className="animate-rise rounded-3xl card-chunky bg-white p-5" aria-live="polite">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm text-ink-soft">#{sel.n}</span>
              {"evidence" in sel ? <EvidenceBadge evidence={sel.evidence} /> : <span className="rounded-full bg-paper-2 px-2.5 py-0.5 text-[11px] font-semibold uppercase">Your connection</span>}
              {sel.from && byId.get(sel.from) && <span className="text-sm text-ink-soft">caused by #{byId.get(sel.from)!.n} {byId.get(sel.from)!.title}</span>}
            </div>
            <h3 className="font-display mt-2 text-2xl">{sel.title}</h3>
            {sel.detail && <p className="mt-2 text-[16px] leading-relaxed">{sel.detail}</p>}
            {"sources" in sel && sel.sources && (
              <div className="mt-3">
                <SourceChips refs={sel.sources} />
              </div>
            )}
            {"custom" in sel && (
              <button onClick={() => removeNode(sel.id)} className="mt-3 inline-flex items-center gap-1 text-sm text-ember">
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            )}
            <p className="mt-3 text-xs text-ink-soft">The highlighted cards show this node&apos;s causes and consequences.</p>
          </div>
        ) : (
          <p className="text-sm text-ink-soft">Tap any card to see the reasoning, its evidence status and the chain it belongs to.</p>
        )}

        {/* add */}
        <div className="rounded-3xl border-2 border-dashed border-moss-300 bg-white p-5">
          <h3 className="flex items-center gap-2 font-semibold">
            <Plus className="h-4 w-4" /> Add your own connection
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="text-sm">
              Level
              <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value as RippleLevel })} className="mt-1 w-full rounded-lg border border-sand bg-paper p-2">
                {LEVELS.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Caused by
              <select value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} className="mt-1 w-full rounded-lg border border-sand bg-paper p-2">
                <option value="">(starting point)</option>
                {nodes.map((n) => (
                  <option key={n.id} value={n.id}>
                    #{n.n} {n.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm sm:col-span-2">
              What happens?
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Insurers start offering lower premiums for homes with batteries" className="mt-1 w-full rounded-lg border border-sand bg-paper p-2" />
            </label>
            <label className="text-sm sm:col-span-2">
              Why? (your reasoning)
              <textarea value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} rows={2} className="mt-1 w-full rounded-lg border border-sand bg-paper p-2" />
            </label>
          </div>
          <button onClick={addNode} disabled={!form.title.trim()} className="mt-3 btn btn-primary text-sm">
            Add to the ripple
          </button>
        </div>

        {/* opportunity + reflection */}
        <div className="grid gap-4 md:grid-cols-2">
          {trend.opportunity ? (
            <div className="rounded-3xl bg-sprout-soft p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-forest-700">
                <Lightbulb className="h-4 w-4" /> Possible opportunity
              </div>
              <p className="mt-2 text-[16px] leading-relaxed">{trend.opportunity}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
                {trend.questions.map((q) => (
                  <li key={q}>• {q}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-3xl bg-sprout-soft p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-forest-700">
                <Waves className="h-4 w-4" /> Prompts
              </div>
              <ul className="mt-3 space-y-1.5 text-[15px]">
                {trend.questions.map((q) => (
                  <li key={q}>• {q}</li>
                ))}
              </ul>
            </div>
          )}
          <label className="block rounded-3xl card-chunky bg-white p-5">
            <span className="font-semibold">My observations</span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onBlur={() => saveRipple(trendId, custom, note)}
              rows={6}
              placeholder={trend.id === "custom" ? "First line = your trend. Then your notes…" : "What's the weakest link? Who loses? What would you watch for?"}
              className="mt-2 w-full rounded-lg border border-sand bg-paper p-3 text-[15px]"
            />
            <span className="text-xs text-ink-soft">Saved in this browser when you click away.</span>
          </label>
        </div>
      </div>
    </div>
  );
}
