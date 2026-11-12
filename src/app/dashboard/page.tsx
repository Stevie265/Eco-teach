import type { Metadata } from "next";
import { Dashboard } from "@/components/Dashboard";

export const metadata: Metadata = { title: "Your knowledge dashboard" };

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <h1 className="font-display t-h1 text-forest-900">Your knowledge dashboard</h1>
      <p className="mb-8 mt-2 text-ink-soft">What you&apos;ve learned, what&apos;s worth revisiting, and where to go next.</p>
      <Dashboard />
    </div>
  );
}
