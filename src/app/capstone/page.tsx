import type { Metadata } from "next";
import Link from "next/link";
import { Capstone } from "@/components/Capstone";

export const metadata: Metadata = { title: "Capstone challenge" };

export default function CapstonePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="no-print mb-8">
        <div className="text-xs font-bold uppercase tracking-widest text-moss-500">The capstone challenge</div>
        <h1 className="font-display t-h1 mt-1 text-forest-900">Make the case for an opportunity</h1>
        <p className="t-lead mt-3 text-ink-soft">
          Investigate a real or hypothetical Eco-Tech opportunity in seven steps, from external trend to validation plan. The result is a short assessment you can share with colleagues.
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          Stuck for a trend? Start in the <Link href="/ripple" className="font-semibold underline">Ripple Explorer</Link>.
        </p>
      </div>
      <Capstone />
    </div>
  );
}
