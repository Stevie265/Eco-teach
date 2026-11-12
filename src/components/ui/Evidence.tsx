import type { Evidence, Fact, SourceRef } from "@/content/types";
import { getSource, SOURCE_KIND_LABEL } from "@/content/sources";
import { ExternalLink } from "lucide-react";

const EVIDENCE_STYLE: Record<Evidence, { label: string; cls: string; tip: string }> = {
  established: { label: "Established", cls: "bg-moss-100 text-forest-700", tip: "Supported by authoritative, independent sources" },
  forecast: { label: "Forecast", cls: "bg-sky-soft text-[#1f5b78]", tip: "A projection. Possible, not guaranteed" },
  "company-claim": { label: "Company claim", cls: "bg-ember-soft text-[#8a3511]", tip: "Stated by a company; not independently verified" },
  speculative: { label: "Reasoned scenario", cls: "bg-[#ece2f3] text-[#5b3a74]", tip: "A plausible line of reasoning to test, not evidence" },
  illustrative: { label: "Illustrative", cls: "bg-paper-2 text-ink-soft", tip: "Example values or a hypothetical for learning" },
};

export function EvidenceBadge({ evidence }: { evidence: Evidence }) {
  const e = EVIDENCE_STYLE[evidence];
  return (
    <span title={e.tip} className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${e.cls}`}>
      {e.label}
    </span>
  );
}

export function SourceChips({ refs }: { refs?: SourceRef[] }) {
  if (!refs?.length) return null;
  return (
    <span className="flex flex-wrap gap-1.5">
      {refs.map((r) => {
        const s = getSource(r.id);
        if (!s) return null;
        const label = `${s.publisher.split(" (")[0]}, ${s.published.slice(0, 4)}`;
        return s.url ? (
          <a
            key={r.id}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-sand bg-white/70 px-2 py-0.5 text-xs text-ink-soft hover:border-forest-600 hover:text-forest-700"
            title={s.title}
          >
            {label}
            <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        ) : (
          <span key={r.id} className="rounded-md border border-sand bg-white/70 px-2 py-0.5 text-xs text-ink-soft" title={s.title}>
            {label}
          </span>
        );
      })}
    </span>
  );
}

export function FactCard({ fact }: { fact: Fact }) {
  return (
    <div className="rounded-xl border border-sand bg-white/80 p-4">
      <div className="mb-2">
        <EvidenceBadge evidence={fact.evidence} />
      </div>
      <p className="text-[15px] leading-relaxed text-ink">{fact.text}</p>
      <div className="mt-3">
        <SourceChips refs={fact.sources} />
      </div>
    </div>
  );
}

export function SourceList({ refs }: { refs: SourceRef[] }) {
  return (
    <ol className="space-y-3">
      {refs.map((r, i) => {
        const s = getSource(r.id);
        if (!s) return null;
        return (
          <li key={r.id} className="flex gap-3 text-sm">
            <span className="mt-0.5 font-mono text-xs text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div className="font-medium text-ink">
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-sand underline-offset-4 hover:decoration-forest-600">
                    {s.title}
                  </a>
                ) : (
                  s.title
                )}
              </div>
              <div className="text-ink-soft">
                {s.publisher} · {s.published} · {SOURCE_KIND_LABEL[s.kind]}
                {s.region ? ` · ${s.region}` : ""}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export { EVIDENCE_STYLE };
