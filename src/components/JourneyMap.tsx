"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Check, Clock, Lock, Star } from "lucide-react";
import { WORLDS, totalMinutes } from "@/content/worlds";
import { useHydrated, useProgress } from "@/lib/progress";
import { worldProgress } from "@/lib/curriculum";
import { WorldGlyph } from "./ui/WorldGlyph";
import { WorldScene } from "./landscape/WorldScene";
import { Parallax, Reveal } from "./motion/Motion";
import { Cloud } from "./landscape/Landscape";
import { shade } from "@/lib/color";

const ROW = 300; // px per world on the path
const X_DESKTOP = [24, 76];
const X_MOBILE = [16, 30];

function pathFor(xs: number[]) {
  // smooth S-curve through each node centre; y in px rows, x in % (viewBox 100 wide)
  let d = `M ${xs[0]} ${ROW / 2}`;
  for (let i = 1; i < WORLDS.length; i++) {
    const x0 = xs[(i - 1) % 2];
    const x1 = xs[i % 2];
    const y0 = (i - 1) * ROW + ROW / 2;
    const y1 = i * ROW + ROW / 2;
    d += ` C ${x0} ${y0 + ROW * 0.55}, ${x1} ${y1 - ROW * 0.55}, ${x1} ${y1}`;
  }
  return d;
}

export function JourneyMap() {
  const p = useProgress();
  const hydrated = useHydrated();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const drawn = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const recommended = hydrated ? (p.profile?.recommended.worldId ?? "history") : "history";
  const H = WORLDS.length * ROW;

  return (
    <div ref={ref} className="relative mx-auto max-w-5xl" style={{ height: H }}>
      {/* parallax scenery in the margins */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        {[0.15, 0.35, 0.55, 0.78].map((t, i) => (
          <Parallax key={t} speed={i % 2 ? 0.6 : 0.35} className="absolute inset-x-0 top-0">
            <div style={{ position: "absolute", top: H * t, left: i % 2 ? "auto" : -120, right: i % 2 ? -140 : "auto" }}>
              <Cloud className="w-40 opacity-80" />
            </div>
          </Parallax>
        ))}
      </div>

      {/* the path */}
      {[
        { xs: X_DESKTOP, cls: "hidden md:block" },
        { xs: X_MOBILE, cls: "md:hidden" },
      ].map(({ xs, cls }) => (
        <svg key={cls} className={`absolute inset-0 h-full w-full ${cls}`} viewBox={`0 0 100 ${H}`} preserveAspectRatio="none" aria-hidden>
          <path d={pathFor(xs)} fill="none" stroke="#e7ddc9" strokeWidth="22" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d={pathFor(xs)} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <motion.path d={pathFor(xs)} fill="none" stroke="#2fa560" strokeWidth="8" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ pathLength: drawn }} />
        </svg>
      ))}

      {WORLDS.map((w, i) => {
        const wp = worldProgress(w, p);
        const side = i % 2;
        const r = 50;
        const circ = 2 * Math.PI * r;
        return (
          <div key={w.id} className="absolute inset-x-0" style={{ top: i * ROW, height: ROW }}>
            {/* node */}
            <div className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 ${side ? "left-[30%] md:left-[76%]" : "left-[16%] md:left-[24%]"}`}>
              <Reveal y={10}>
                <Link href={`/worlds/${w.id}`} aria-label={`World ${w.number}: ${w.title}`} className="group relative block">
                  {recommended === w.id && (
                    <motion.span
                      className="absolute -top-11 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-xl border-2 border-sand bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-forest-800 shadow-[0_3px_0_#e7ddc9]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8 }}
                    >
                      Start here
                    </motion.span>
                  )}
                  <svg viewBox="0 0 120 120" className="absolute -inset-3 h-[calc(100%+24px)] w-[calc(100%+24px)] -rotate-90" aria-hidden>
                    <circle cx="60" cy="60" r={r} fill="none" stroke="#fff" strokeWidth="8" />
                    {hydrated && wp.done > 0 && <circle cx="60" cy="60" r={r} fill="none" stroke="#ffc22e" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${circ * wp.pct} ${circ}`} />}
                  </svg>
                  <span
                    className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full transition group-hover:-translate-y-1 group-active:translate-y-1 md:h-[92px] md:w-[92px]"
                    style={{ background: w.color, boxShadow: `0 7px 0 ${shade(w.color)}` }}
                  >
                    <WorldGlyph glyph={w.glyph} color="#fff" className="h-10 w-10 md:h-12 md:w-12" />
                    {wp.status === "soon" && (
                      <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-paper-2 text-ink-soft">
                        <Lock className="h-3.5 w-3.5" />
                      </span>
                    )}
                    {hydrated && wp.status === "caught-up" && (
                      <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-sun text-ink">
                        <Star className="h-3.5 w-3.5 fill-current" />
                      </span>
                    )}
                  </span>
                </Link>
              </Reveal>
            </div>

            {/* card */}
            <div className={`absolute top-1/2 w-[58%] -translate-y-1/2 md:w-[44%] ${side ? "right-[2%] md:left-[6%] md:right-auto" : "right-[2%] md:right-[6%]"}`}>
              <Reveal delay={0.1}>
                <Link href={`/worlds/${w.id}`} className="card-chunky group block overflow-hidden rounded-3xl bg-white transition hover:-translate-y-1">
                  <div className="relative h-24 md:h-28" style={{ background: w.tint }}>
                    <WorldScene id={w.id} className="absolute inset-0 h-full w-full" />
                    <span className="absolute left-3 top-3 rounded-lg bg-white/90 px-2 py-0.5 font-mono text-[11px] font-bold" style={{ color: w.color }}>
                      WORLD {String(w.number).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg leading-tight text-ink md:text-xl">{w.title}</h3>
                    <p className="mt-0.5 hidden text-sm text-ink-soft sm:block">{w.tagline}</p>
                    <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-paper-2">
                      <div className="h-full rounded-full transition-all" style={{ width: `${hydrated ? Math.max(wp.pct * 100, 0) : 0}%`, background: w.color }} />
                    </div>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-1 text-xs font-semibold text-ink-soft">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {w.lessons.length} lessons · ~{Math.round(totalMinutes(w) / 6) / 10}h
                      </span>
                      {wp.status === "soon" ? (
                        <span>Coming soon</span>
                      ) : hydrated && wp.status === "caught-up" ? (
                        <span className="flex items-center gap-1 text-moss-500">
                          <Check className="h-3.5 w-3.5" /> All live lessons done
                        </span>
                      ) : (
                        <span style={{ color: w.color }}>
                          {hydrated ? wp.done : 0}/{wp.available} live done
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>
        );
      })}
    </div>
  );
}
