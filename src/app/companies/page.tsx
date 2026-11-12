import type { Metadata } from "next";
import { CompanyExplorer } from "@/components/CompanyExplorer";
import { COMPANIES_REVIEWED } from "@/content/companies";

export const metadata: Metadata = { title: "Company Explorer" };

export default function CompaniesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="mb-8 max-w-3xl">
        <div className="text-xs font-bold uppercase tracking-widest text-moss-500">World 7 · Insurgents &amp; Innovation</div>
        <h1 className="font-display t-h1 mt-1 text-forest-900">Company Explorer</h1>
        <p className="t-lead mt-3 text-ink-soft">
          Incumbents, insurgents, scale-ups and instructive failures across the Eco-Tech ecosystem. Explore each proposition and business model, then compare up to three side by side.
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          Profiles are deliberately high-level and were reviewed on {COMPANIES_REVIEWED}. Companies change fast, so check current details before relying on them, and treat any performance figures from companies as claims.
        </p>
      </div>
      <CompanyExplorer />
    </div>
  );
}
