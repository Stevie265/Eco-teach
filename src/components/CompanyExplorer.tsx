"use client";

import { useState } from "react";
import { ExternalLink, GitCompare } from "lucide-react";
import { COMPANIES, type Company } from "@/content/companies";

const TYPE_STYLE: Record<Company["type"], string> = {
  Incumbent: "bg-[#e0e4f5] text-[#2f3d7a]",
  Insurgent: "bg-ember-soft text-[#8a3511]",
  "Scale-up": "bg-moss-100 text-forest-700",
  Failed: "bg-paper-2 text-ink-soft",
};

export function CompanyExplorer() {
  const [type, setType] = useState<string>("All");
  const [segment, setSegment] = useState<string>("All");
  const [compare, setCompare] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  const types = ["All", "Incumbent", "Insurgent", "Scale-up", "Failed"];
  const segments = ["All", ...Array.from(new Set(COMPANIES.map((c) => c.segment)))];
  const list = COMPANIES.filter((c) => (type === "All" || c.type === type) && (segment === "All" || c.segment === segment));
  const toggleCompare = (id: string) => setCompare((x) => (x.includes(id) ? x.filter((y) => y !== id) : x.length >= 3 ? [...x.slice(1), id] : [...x, id]));
  const comparing = COMPANIES.filter((c) => compare.includes(c.id));

  return (
    <div>
      <div className="mb-6 space-y-3">
        <FilterRow label="Type" options={types} value={type} set={setType} />
        <FilterRow label="Segment" options={segments} value={segment} set={setSegment} />
      </div>

      {comparing.length >= 2 && (
        <section className="animate-rise mb-8 overflow-x-auto rounded-3xl bg-forest-900 p-5 text-paper">
          <h2 className="font-display mb-4 flex items-center gap-2 text-2xl">
            <GitCompare className="h-5 w-5" /> Comparing {comparing.length}
          </h2>
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr>
                <th />
                {comparing.map((c) => (
                  <th key={c.id} className="pb-2 pr-4 font-display text-lg text-sprout">
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(["proposition", "businessModel", "revenue", "watch"] as const).map((k) => (
                <tr key={k} className="border-t border-forest-700 align-top">
                  <th className="w-36 py-3 pr-4 font-semibold text-moss-300">{{ proposition: "Proposition", businessModel: "Business model", revenue: "Revenue streams", watch: "What to watch" }[k]}</th>
                  {comparing.map((c) => (
                    <td key={c.id} className="py-3 pr-4">
                      {k === "revenue" ? c.revenue.join(" · ") : c[k]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setCompare([])} className="mt-3 text-sm text-moss-300 underline">
            Clear comparison
          </button>
        </section>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((c) => (
          <article key={c.id} className="rounded-3xl border border-sand bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl">{c.name}</h3>
                <div className="text-sm text-ink-soft">
                  {c.segment} · {c.hq}
                  {c.founded ? ` · founded ${c.founded}` : ""}
                </div>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_STYLE[c.type]}`}>{c.type}</span>
            </div>
            <p className="mt-3 text-[15px]">{c.proposition}</p>
            {open === c.id && (
              <dl className="animate-rise mt-4 space-y-3 border-t border-paper-2 pt-4 text-sm">
                <div>
                  <dt className="font-semibold">Business model</dt>
                  <dd className="text-ink-soft">{c.businessModel}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Revenue streams</dt>
                  <dd className="mt-1 flex flex-wrap gap-1.5">
                    {c.revenue.map((r) => (
                      <span key={r} className="rounded-md bg-paper-2 px-2 py-0.5">
                        {r}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">What to watch</dt>
                  <dd className="text-ink-soft">{c.watch}</dd>
                </div>
                {c.competesWith.length > 0 && (
                  <div>
                    <dt className="font-semibold">Compare with</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {c.competesWith.map((id) => {
                        const o = COMPANIES.find((x) => x.id === id);
                        return o ? (
                          <button key={id} onClick={() => setCompare([c.id, id])} className="rounded-md border border-sand px-2 py-0.5 hover:border-forest-600">
                            {o.name}
                          </button>
                        ) : null;
                      })}
                    </dd>
                  </div>
                )}
                {c.url && (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-forest-700 underline">
                    Company website <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </dl>
            )}
            <div className="mt-4 flex items-center gap-4 text-sm">
              <button onClick={() => setOpen(open === c.id ? null : c.id)} className="font-semibold text-forest-700">
                {open === c.id ? "Show less" : "Business model →"}
              </button>
              <label className="flex items-center gap-1.5 text-ink-soft">
                <input type="checkbox" checked={compare.includes(c.id)} onChange={() => toggleCompare(c.id)} className="accent-[#1d4d38]" />
                Compare
              </label>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function FilterRow({ label, options, value, set }: { label: string; options: string[]; value: string; set: (v: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-20 text-xs font-bold uppercase tracking-widest text-ink-soft">{label}</span>
      {options.map((o) => (
        <button key={o} onClick={() => set(o)} aria-pressed={value === o} className={`rounded-full px-3 py-1 text-sm font-medium ${value === o ? "bg-forest-800 text-paper" : "border border-sand bg-white text-ink-soft"}`}>
          {o}
        </button>
      ))}
    </div>
  );
}
