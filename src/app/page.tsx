import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WorldGlyph } from "@/components/ui/WorldGlyph";
import { Landscape } from "@/components/landscape/Landscape";
import { JourneyMap } from "@/components/JourneyMap";
import { HomeCTA, HomeStats } from "@/components/HomeHero";
import { Reveal } from "@/components/motion/Motion";

export default function Home() {
  return (
    <div className="-mt-14 sm:-mt-16">
      <Landscape>
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-sky-deep shadow-sm backdrop-blur sm:mb-5 sm:text-xs">
            <span className="h-2 w-2 animate-pulse-soft rounded-full bg-moss-500" /> Energy · Climate · Tech · The home
          </p>
          <h1 className="font-display t-hero text-forest-900">
            Understand the world that&apos;s <span className="relative whitespace-nowrap text-forest-800">changing</span> our future.
          </h1>
          <p className="t-lead mt-4 max-w-xl font-medium text-forest-900/80 sm:mt-5">
            Bite-sized, visual lessons that take you from curious to fluent in the Eco-Tech industry: the science, the technology, the business and the customer.
          </p>
          <div className="mt-6 sm:mt-8">
            <HomeCTA />
          </div>
        </div>
      </Landscape>

      {/* Journey */}
      <section className="relative bg-gradient-to-b from-[#3a9846] via-[#eaf6e2] via-[6%] to-paper pb-12 pt-16 sm:pb-16 sm:pt-24" aria-labelledby="journey-heading">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-8 flex flex-col items-start gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-moss-500 sm:text-xs">Your journey</div>
                <h2 id="journey-heading" className="font-display t-h1 mt-1 text-forest-900">
                  Ten worlds, one connected system
                </h2>
                <p className="t-lead mt-2 max-w-xl text-ink-soft">Follow the path from how we got here to the opportunities ahead, or jump to wherever your curiosity takes you.</p>
              </div>
              <div className="w-full md:w-80">
                <HomeStats />
              </div>
            </div>
          </Reveal>
          <JourneyMap />
        </div>
      </section>

      {/* Signature features */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <Reveal>
          <h2 className="font-display t-h2 mb-4 text-forest-900 sm:mb-6">Tools for thinking</h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          <Reveal>
            <Feature href="/breakthroughs" icon={<WorldGlyph glyph="bolt" className="h-10 w-10" />} title="Breakthrough Breakdown" body="The technologies changing energy, each explained in four illustrated steps, then what the latest breakthrough really changed." bg="#ffc83d" fg="#1b2a4a" sub="#3c4a63" />
          </Reveal>
          <Reveal>
            <Feature href="/ripple" icon={<WorldGlyph glyph="eye" className="h-10 w-10" />} title="Ripple Explorer" body="Drop a trend into the system and watch it ripple through the industry to the customer. Add your own connections." bg="#12304a" fg="#fff" sub="#9fd0f0" />
          </Reveal>
          <Reveal delay={0.08}>
            <Feature href="/capstone" icon={<WorldGlyph glyph="spark" className="h-10 w-10" />} title="Capstone challenge" body="Turn what you've learned into a strategic opportunity assessment to share with colleagues." bg="#dcf4e4" fg="#13283a" sub="#4a5d6b" />
          </Reveal>
          <Reveal delay={0.16}>
            <Feature href="/sources" icon={<WorldGlyph glyph="coins" className="h-10 w-10" />} title="Research & sources" body="Every claim linked, dated and labelled: established fact, forecast, company claim or reasoned scenario." bg="#fff" fg="#13283a" sub="#4a5d6b" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Feature({ href, icon, title, body, bg, fg, sub }: { href: string; icon: React.ReactNode; title: string; body: string; bg: string; fg: string; sub: string }) {
  return (
    <Link href={href} className="group block h-full rounded-3xl p-5 transition hover:-translate-y-1 sm:p-6" style={{ background: bg, color: fg, boxShadow: "4px 4px 0 #1b2a4a", border: "2px solid #1b2a4a" }}>
      <div className="mb-3 sm:mb-4">{icon}</div>
      <h3 className="font-display text-xl sm:text-2xl">{title}</h3>
      <p className="mt-1.5 text-sm sm:mt-2 sm:text-[15px]" style={{ color: sub }}>
        {body}
      </p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-extrabold">
        Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
