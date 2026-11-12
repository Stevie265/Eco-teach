import Link from "next/link";
import { ArrowRight, BookMarked, Flag, Waves } from "lucide-react";
import { WorldMap } from "@/components/WorldMap";
import { HomeCTA, HomeStats } from "@/components/HomeHero";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-sprout/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-40 h-[360px] w-[360px] rounded-full bg-moss-300/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-12 sm:px-6 md:pt-20 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-forest-800/15 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-forest-700">
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-moss-500" /> Energy · Climate · Technology · The home
            </p>
            <h1 className="font-display text-[44px] leading-[1.02] text-forest-900 sm:text-6xl lg:text-7xl">
              Understand the world that&apos;s <em className="text-moss-500">changing our future.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Eco-teach takes you from curious to genuinely fluent in the Eco-Tech industry: the science, the technology, the business models and what it all means for customers. Ten connected worlds, bite-sized interactive lessons, credible sources.
            </p>
            <div className="mt-8">
              <HomeCTA />
            </div>
          </div>
          <HomeStats />
        </div>
      </section>

      {/* Map */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6" aria-labelledby="map-heading">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="map-heading" className="font-display text-3xl text-forest-900 sm:text-4xl">
              The learning map
            </h2>
            <p className="mt-1 max-w-2xl text-ink-soft">One connected system of knowledge. Follow the path or explore wherever your curiosity takes you.</p>
          </div>
          <Link href="/dashboard" className="text-sm font-semibold text-forest-700 underline underline-offset-4">
            View my progress
          </Link>
        </div>
        <WorldMap />
      </section>

      {/* Signature features */}
      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Feature
            href="/ripple"
            icon={<Waves className="h-6 w-6" />}
            title="Ripple Explorer"
            body="Pick a trend and follow its ripples through the industry to the customer. Add your own connections and notes."
            tone="bg-forest-900 text-paper"
            sub="text-moss-300"
          />
          <Feature
            href="/capstone"
            icon={<Flag className="h-6 w-6" />}
            title="Capstone challenge"
            body="Turn what you've learned into a strategic opportunity assessment you can share with colleagues."
            tone="bg-sprout-soft text-forest-900"
            sub="text-ink-soft"
          />
          <Feature
            href="/sources"
            icon={<BookMarked className="h-6 w-6" />}
            title="Research & sources"
            body="Every claim is linked to its source, dated, and labelled: established fact, forecast, company claim or reasoned scenario."
            tone="bg-white text-forest-900 border border-sand"
            sub="text-ink-soft"
          />
        </div>
      </section>
    </div>
  );
}

function Feature({ href, icon, title, body, tone, sub }: { href: string; icon: React.ReactNode; title: string; body: string; tone: string; sub: string }) {
  return (
    <Link href={href} className={`group rounded-3xl p-6 transition hover:-translate-y-0.5 hover:shadow-lg ${tone}`}>
      <div className="mb-4">{icon}</div>
      <h3 className="font-display text-2xl">{title}</h3>
      <p className={`mt-2 text-[15px] ${sub}`}>{body}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
        Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
