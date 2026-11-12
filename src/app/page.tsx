import Link from "next/link";
import { ArrowRight, BookMarked, Flag, Waves } from "lucide-react";
import { Landscape } from "@/components/landscape/Landscape";
import { JourneyMap } from "@/components/JourneyMap";
import { HomeCTA, HomeStats } from "@/components/HomeHero";
import { Reveal } from "@/components/motion/Motion";

export default function Home() {
  return (
    <div className="-mt-16">
      <Landscape>
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-sky-deep shadow-sm backdrop-blur">
            <span className="h-2 w-2 animate-pulse-soft rounded-full bg-moss-500" /> Energy · Climate · Tech · The home
          </p>
          <h1 className="font-display text-[46px] leading-[0.98] text-forest-900 sm:text-7xl lg:text-[84px]">
            Understand the world that&apos;s <span className="relative whitespace-nowrap text-forest-800">changing</span> our future.
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-forest-900/80 sm:text-xl">
            Bite-sized, visual lessons that take you from curious to fluent in the Eco-Tech industry: the science, the technology, the business and the customer.
          </p>
          <div className="mt-8">
            <HomeCTA />
          </div>
        </div>
      </Landscape>

      {/* Journey */}
      <section className="relative bg-gradient-to-b from-[#3a9846] via-[#eaf6e2] via-[8%] to-paper pb-16 pt-24" aria-labelledby="journey-heading">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-10 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-moss-500">Your journey</div>
                <h2 id="journey-heading" className="font-display mt-1 text-4xl text-forest-900 sm:text-5xl">
                  Ten worlds, one connected system
                </h2>
                <p className="mt-2 max-w-xl text-lg text-ink-soft">Follow the path from how we got here to the opportunities ahead, or jump to wherever your curiosity takes you.</p>
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
          <h2 className="font-display mb-6 text-3xl text-forest-900 sm:text-4xl">Tools for thinking</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal>
            <Feature href="/ripple" icon={<Waves className="h-7 w-7" />} title="Ripple Explorer" body="Drop a trend into the system and watch it ripple through the industry to the customer. Add your own connections." bg="#12304a" fg="#fff" sub="#9fd0f0" edge="#0b2133" />
          </Reveal>
          <Reveal delay={0.08}>
            <Feature href="/capstone" icon={<Flag className="h-7 w-7" />} title="Capstone challenge" body="Turn what you've learned into a strategic opportunity assessment to share with colleagues." bg="#ffd23f" fg="#13283a" sub="#4a5d6b" edge="#e0ad00" />
          </Reveal>
          <Reveal delay={0.16}>
            <Feature href="/sources" icon={<BookMarked className="h-7 w-7" />} title="Research & sources" body="Every claim linked, dated and labelled: established fact, forecast, company claim or reasoned scenario." bg="#fff" fg="#13283a" sub="#4a5d6b" edge="#e7ddc9" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Feature({ href, icon, title, body, bg, fg, sub, edge }: { href: string; icon: React.ReactNode; title: string; body: string; bg: string; fg: string; sub: string; edge: string }) {
  return (
    <Link href={href} className="group block h-full rounded-3xl p-6 transition hover:-translate-y-1" style={{ background: bg, color: fg, boxShadow: `0 6px 0 ${edge}`, border: `2px solid ${edge}` }}>
      <div className="mb-4">{icon}</div>
      <h3 className="font-display text-2xl">{title}</h3>
      <p className="mt-2 text-[15px]" style={{ color: sub }}>
        {body}
      </p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-extrabold">
        Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
