"use client";

import { useEffect, useState } from "react";
import { Copy, Printer } from "lucide-react";
import { saveCapstone, useHydrated, useProgress, type CapstoneDraft } from "@/lib/progress";

const FIELDS: { key: keyof CapstoneDraft; step: string; label: string; help: string; rows: number }[] = [
  { key: "trend", step: "1", label: "The external trend", help: "What is changing in the world? Be specific. Which PESTEL lens is it?", rows: 3 },
  { key: "drivers", step: "2", label: "Drivers behind it", help: "Why is it happening? Separate established evidence from forecasts.", rows: 3 },
  { key: "impact", step: "3", label: "Impact on the industry", help: "Value chains, costs, revenues, competitors, partnerships. Who wins, who loses?", rows: 3 },
  { key: "problem", step: "4", label: "Customer problem or unmet need", help: "Which customers feel it, and what job are they trying to get done?", rows: 3 },
  { key: "opportunity", step: "5", label: "Product or business opportunity", help: "What could your organisation offer? Why you, why now?", rows: 3 },
  { key: "concept", step: "6", label: "A simple concept", help: "Describe the proposition in a few lines: who it's for, what it does, how it makes money.", rows: 4 },
  { key: "validation", step: "7", label: "How you'd validate it", help: "Your riskiest assumption, and the cheapest experiment that could prove it wrong.", rows: 4 },
];

const EMPTY: CapstoneDraft = { title: "", trend: "", drivers: "", impact: "", problem: "", opportunity: "", concept: "", validation: "" };

export function Capstone() {
  const p = useProgress();
  const hydrated = useHydrated();
  const [d, setD] = useState<CapstoneDraft>(EMPTY);
  const [view, setView] = useState<"edit" | "preview">("edit");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (hydrated && p.capstone) setD({ ...EMPTY, ...p.capstone });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const filled = FIELDS.filter((f) => d[f.key]?.trim()).length;
  const set = (k: keyof CapstoneDraft, v: string) => setD((x) => ({ ...x, [k]: v }));
  const persist = () => saveCapstone(d);

  const markdown = [
    `# ${d.title || "Strategic opportunity assessment"}`,
    "",
    ...FIELDS.flatMap((f) => [`## ${f.step}. ${f.label}`, d[f.key] || "_(not yet written)_", ""]),
    "_Prepared with Eco-teach_",
  ].join("\n");

  return (
    <div>
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full bg-paper-2 p-1">
          {(["edit", "preview"] as const).map((v) => (
            <button key={v} onClick={() => { persist(); setView(v); }} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${view === v ? "bg-forest-800 text-paper" : "text-ink-soft"}`}>
              {v === "edit" ? "Write" : "Shareable view"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-ink-soft">{filled}/7 sections</span>
          <button onClick={() => { navigator.clipboard?.writeText(markdown); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="inline-flex items-center gap-1.5 rounded-full border border-sand bg-white px-3 py-1.5 font-semibold">
            <Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy as Markdown"}
          </button>
          <button onClick={() => { persist(); setView("preview"); setTimeout(() => window.print(), 100); }} className="inline-flex items-center gap-1.5 rounded-full border border-sand bg-white px-3 py-1.5 font-semibold">
            <Printer className="h-4 w-4" /> Print / PDF
          </button>
        </div>
      </div>

      {view === "edit" ? (
        <div className="space-y-5">
          <label className="block">
            <span className="text-sm font-semibold">Title</span>
            <input value={d.title} onChange={(e) => set("title", e.target.value)} onBlur={persist} placeholder="e.g. Battery-as-a-service for renters" className="font-display mt-1 w-full rounded-xl border border-sand bg-white p-3 text-2xl" />
          </label>
          {FIELDS.map((f) => (
            <label key={f.key} className="block rounded-2xl border border-sand bg-white p-4">
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-800 font-mono text-sm font-bold text-sprout">{f.step}</span>
                <span className="font-semibold">{f.label}</span>
              </span>
              <span className="mt-1 block pl-11 text-sm text-ink-soft">{f.help}</span>
              <textarea value={d[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} onBlur={persist} rows={f.rows} className="mt-3 w-full rounded-lg border border-sand bg-paper p-3 text-[15px]" />
            </label>
          ))}
          <p className="text-xs text-ink-soft">Saved in this browser as you go. Don&apos;t include confidential company information if you plan to share this widely.</p>
        </div>
      ) : (
        <article className="rounded-3xl border border-sand bg-white p-8 sm:p-12">
          <div className="text-xs font-bold uppercase tracking-widest text-moss-500">Strategic opportunity assessment</div>
          <h2 className="font-display mt-2 text-4xl text-forest-900">{d.title || "Untitled opportunity"}</h2>
          <div className="mt-8 space-y-7">
            {FIELDS.map((f) => (
              <section key={f.key}>
                <h3 className="flex items-center gap-3 font-semibold text-forest-800">
                  <span className="font-mono text-sm text-moss-500">{f.step.padStart(2, "0")}</span> {f.label}
                </h3>
                <p className="mt-2 whitespace-pre-wrap text-[16px] leading-relaxed">{d[f.key] || <span className="italic text-ink-soft">Not yet written</span>}</p>
              </section>
            ))}
          </div>
          <div className="mt-10 border-t border-sand pt-4 text-xs text-ink-soft">Prepared with Eco-teach{d.updatedAt ? ` · ${new Date(d.updatedAt).toLocaleDateString("en-GB")}` : ""}</div>
        </article>
      )}
    </div>
  );
}
