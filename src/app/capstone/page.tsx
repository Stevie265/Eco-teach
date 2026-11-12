import type { Metadata } from "next";
import Link from "next/link";
import { Capstone } from "@/components/Capstone";

export const metadata: Metadata = { title: "Capstone challenge" };

export default function CapstonePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="no-print mb-8">
        <div className="text-xs font-bold uppercase tracking-widest text-moss-500">The capstone challenge</div>
        <h1 className="font-display mt-1 text-4xl text-forest-900 sm:text-5xl">Make the case for an opportunity</h1>
        <p className="mt-3 text-lg text-ink-soft">
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
