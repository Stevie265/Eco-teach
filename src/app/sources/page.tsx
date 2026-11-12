import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SOURCES, SOURCE_KIND_LABEL } from "@/content/sources";
import { LESSONS } from "@/content/lessons";
import { RIPPLE_TRENDS } from "@/content/ripples";
import { EVIDENCE_STYLE } from "@/components/ui/Evidence";
import type { Evidence } from "@/content/types";

export const metadata: Metadata = { title: "Research & sources" };

export default function SourcesPage() {
  const usedBy = new Map<string, { title: string; href: string }[]>();
  for (const l of LESSONS) for (const s of l.sources) usedBy.set(s.id, [...(usedBy.get(s.id) ?? []), { title: l.title, href: `/learn/${l.worldId}/${l.id}` }]);
  for (const t of RIPPLE_TRENDS) for (const n of t.nodes) for (const s of n.sources ?? []) {
    const list = usedBy.get(s.id) ?? [];
    if (!list.some((x) => x.href === "/ripple")) usedBy.set(s.id, [...list, { title: "Ripple Explorer", href: "/ripple" }]);
  }
  const groups = ["UK", "US", "Global", "EU"] as const;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <h1 className="font-display t-h1 text-forest-900">Research &amp; sources</h1>
      <p className="t-lead mt-3 max-w-3xl text-ink-soft">
        Eco-teach is grounded in credible, linkable sources: regulators, system operators, government statisticians, intergovernmental bodies, academic research and reputable journalism. Every source shows its publication date and the date we last checked it.
      </p>

      <section className="mt-10 rounded-3xl card-chunky bg-white p-6">
        <h2 className="font-display text-xl sm:text-2xl">How to read our evidence labels</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(Object.keys(EVIDENCE_STYLE) as Evidence[]).map((e) => (
            <div key={e} className="flex items-start gap-3">
              <span className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${EVIDENCE_STYLE[e].cls}`}>{EVIDENCE_STYLE[e].label}</span>
              <span className="text-sm text-ink-soft">{EVIDENCE_STYLE[e].tip}.</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-ink-soft">
          Our rules: never invent statistics or citations; always say who made a claim and when; keep projections separate from facts; and treat company statements as claims until independently evidenced.
        </p>
      </section>

      {groups.map((g) => {
        const list = Object.values(SOURCES).filter((s) => s.region === g);
        if (!list.length) return null;
        return (
          <section key={g} className="mt-10">
            <h2 className="font-display mb-4 text-2xl">{g === "Global" ? "Global" : `${g} perspective`}</h2>
            <div className="space-y-3">
              {list.map((s) => (
                <div key={s.id} className="rounded-2xl card-chunky bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      {s.url ? (
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold underline decoration-sand underline-offset-4 hover:decoration-forest-600">
                          {s.title} <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <span className="font-semibold">{s.title}</span>
                      )}
                      <div className="mt-0.5 text-sm text-ink-soft">
                        {s.publisher} · Published {s.published} · Checked {s.checked}
                      </div>
                    </div>
                    <span className="rounded-full bg-paper-2 px-2.5 py-0.5 text-xs font-semibold">{SOURCE_KIND_LABEL[s.kind]}</span>
                  </div>
                  {usedBy.get(s.id) && (
                    <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                      <span className="text-ink-soft">Used in:</span>
                      {usedBy.get(s.id)!.map((u) => (
                        <Link key={u.href} href={u.href} className="rounded-md bg-moss-100 px-2 py-0.5 text-forest-700">
                          {u.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <section className="mt-10 rounded-3xl bg-paper-2 p-6 text-sm text-ink-soft">
        <h2 className="font-display text-xl text-ink">Sources we&apos;ll draw on as the curriculum grows</h2>
        <p className="mt-2">
          International Energy Agency (IEA), UK Department for Energy Security and Net Zero (DESNZ), Ofgem, the National Energy System Operator (NESO), Carbon Brief, the IPCC, BloombergNEF (where public), the US Energy Information Administration, peer-reviewed research, and company annual reports (labelled as company claims).
        </p>
      </section>
    </div>
  );
}
