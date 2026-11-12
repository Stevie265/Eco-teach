import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About & method" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-12">
      <h1 className="font-display t-h1 text-forest-900">About Eco-teach</h1>
      <div className="prose-eco mt-6 text-[17px]">
        <p>
          Eco-teach helps intelligent, curious people without an engineering background become genuinely fluent in the Eco-Tech industry: <strong>what</strong> is happening, <strong>why</strong>, <strong>how</strong> it connects and what it means for businesses and customers.
        </p>
        <p>It&apos;s built for people in customer experience, product, innovation, strategy, home services and commercial roles who want to join strategic conversations with confidence.</p>
      </div>
      <h2 className="font-display mt-10 text-2xl">How every lesson works</h2>
      <ol className="mt-4 grid gap-2 sm:grid-cols-2">
        {["Hook: a surprising question or fact", "Explain: the concept, jargon introduced gently", "Visualise: an interactive diagram or model", "Real world: a company, customer or event", "Try it: something to manipulate or decide", "Check: an adaptive knowledge check", "Apply: what it means for your work", "Recap: three things to remember"].map((s, i) => (
          <li key={s} className="flex gap-3 rounded-xl bg-white p-3 text-[15px]">
            <span className="font-mono text-moss-500">{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
      <h2 className="font-display mt-10 text-2xl">Principles</h2>
      <ul className="mt-4 space-y-2 text-[16px]">
        <li>• Teach concepts, not just definitions, and always explain why something matters.</li>
        <li>• Connect the science to the technology, the technology to the business, and the business to the customer.</li>
        <li>• Be accurate and transparent about uncertainty: facts, forecasts, company claims and scenarios are labelled differently.</li>
        <li>• Gamification encourages genuine learning: XP for thinking, not clicking.</li>
      </ul>
      <h2 className="font-display mt-10 text-2xl">Privacy</h2>
      <p className="mt-3 text-[16px] text-ink-soft">
        There are no accounts yet. Your progress, notes and capstone are stored only in your own browser and are never sent to a server. You can download or reset them from your <Link href="/dashboard" className="underline">dashboard</Link>.
      </p>
    </div>
  );
}
