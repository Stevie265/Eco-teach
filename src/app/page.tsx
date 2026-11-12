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
          <h1 className="font-display t-hero text-forest-900">
            Understand the world that&apos;s <span className="text-forest-800">changing</span> our future.
          </h1>
          <p className="t-lead mt-4 max-w-xl font-medium text-forest-900/80 sm:mt-5">
            Short, visual lessons on energy, climate tech and the future home. Go from curious to confident at your own pace.
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
                <p className="t-lead mt-2 max-w-xl text-ink-soft">Follow the path in order, or jump to whatever you&apos;re curious about.</p>
              </div>
              <HomeStats />
            </div>
          </Reveal>
          <JourneyMap />
        </div>
      </section>

      {/* Signature features */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <Reveal>
          <h2 className="font-display t-h2 mb-4 text-forest-900 sm:mb-6">More ways to explore</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          <Reveal>
            <Feature href="/breakthroughs" icon={<WorldGlyph glyph="bolt" className="h-8 w-8 sm:h-10 sm:w-10" />} title="Breakthrough Breakdown" body="New energy tech explained one simple idea at a time." bg="#ffc83d" fg="#1b2a4a" sub="#3c4a63" />
          </Reveal>
          <Reveal>
            <Feature href="/ripple" icon={<WorldGlyph glyph="eye" className="h-8 w-8 sm:h-10 sm:w-10" />} title="Ripple Explorer" body="Follow one trend from the planet to the customer." bg="#12304a" fg="#fff" sub="#9fd0f0" />
          </Reveal>
          <Reveal delay={0.08}>
            <Feature href="/capstone" icon={<WorldGlyph glyph="spark" className="h-8 w-8 sm:h-10 sm:w-10" />} title="Capstone challenge" body="Turn what you've learned into an opportunity to share." bg="#dcf4e4" fg="#13283a" sub="#4a5d6b" />
          </Reveal>
          <Reveal delay={0.16}>
            <Feature href="/sources" icon={<WorldGlyph glyph="coins" className="h-8 w-8 sm:h-10 sm:w-10" />} title="Research & sources" body="Every claim linked, dated and labelled." bg="#fff" fg="#13283a" sub="#4a5d6b" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Feature({ href, icon, title, body, bg, fg, sub }: { href: string; icon: React.ReactNode; title: string; body: string; bg: string; fg: string; sub: string }) {
  return (
    <Link href={href} className="group flex h-full flex-col rounded-2xl p-4 transition hover:-translate-y-1 sm:rounded-3xl sm:p-6" style={{ background: bg, color: fg, boxShadow: "3px 3px 0 #1b2a4a", border: "2px solid #1b2a4a" }}>
      <div className="mb-2 sm:mb-4">{icon}</div>
      <h3 className="font-display text-[17px] leading-tight sm:text-2xl">{title}</h3>
      <p className="mt-1 text-[13px] leading-snug sm:mt-2 sm:text-[15px]" style={{ color: sub }}>
        {body}
      </p>
      <div className="mt-auto pt-3">
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
