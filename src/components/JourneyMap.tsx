"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef, useSyncExternalStore } from "react";
import { WORLDS } from "@/content/worlds";
import { useHydrated, useProgress } from "@/lib/progress";
import { worldProgress } from "@/lib/curriculum";
import { WorldGlyph } from "./ui/WorldGlyph";
import { WorldScene } from "./landscape/WorldScene";
import { Reveal } from "./motion/Motion";
import { RatingPlate } from "./brand/RatingPlate";

/**
 * The journey as a circuit. Worlds are nodes on one continuous wire, routed
 * orthogonally like a single-line diagram. The wire is inked in as you scroll,
 * and a pulse of current keeps moving along it.
 */
const ROW_DESKTOP = 340;
const ROW_MOBILE = 214;
const X_DESKTOP = [22, 78];
const X_MOBILE = 13;

function wirePath(xs: (i: number) => number, ROW: number) {
  let d = `M ${xs(0)} 0 V ${ROW / 2}`;
  for (let i = 1; i < WORLDS.length; i++) {
    const midY = (i - 1) * ROW + ROW;
    d += ` V ${midY} H ${xs(i)} V ${i * ROW + ROW / 2}`;
  }
  return d;
}

export function JourneyMap() {
  const p = useProgress();
  const hydrated = useHydrated();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 70%"] });
  const inked = useSpring(scrollYProgress, { stiffness: 70, damping: 22 });
  const recommended = hydrated ? (p.profile?.recommended.worldId ?? "history") : "history";
  const isDesktop = useIsDesktop();
  const ROW = isDesktop ? ROW_DESKTOP : ROW_MOBILE;
  const H = WORLDS.length * ROW;
  const desk = (i: number) => X_DESKTOP[i % 2];
  const mob = () => X_MOBILE;

  return (
    <div ref={ref} className="relative mx-auto max-w-5xl" style={{ height: H }}>
      {[
        { xs: desk, cls: "hidden md:block" },
        { xs: mob, cls: "md:hidden" },
      ].map(({ xs, cls }) => (
        <svg key={cls} className={`absolute inset-0 h-full w-full ${cls}`} viewBox={`0 0 100 ${H}`} preserveAspectRatio="none" aria-hidden>
          <path d={wirePath(xs, ROW)} fill="none" stroke="#1b2a4a" strokeOpacity=".18" strokeWidth="2" strokeDasharray="5 6" vectorEffect="non-scaling-stroke" />
          <motion.path d={wirePath(xs, ROW)} fill="none" stroke="#1b2a4a" strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ pathLength: inked }} />
          <path d={wirePath(xs, ROW)} fill="none" stroke="#ffc83d" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.5 14" vectorEffect="non-scaling-stroke" className="energy-flow" opacity=".9" />
        </svg>
      ))}

      {/* junction dots at every bend (desktop) */}
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        {WORLDS.slice(1).map((_, k) => {
          const i = k + 1;
          const y = (i - 1) * ROW + ROW;
          return [desk(i - 1), desk(i)].map((x, j) => <span key={`${i}-${j}`} className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" style={{ left: `${x}%`, top: y }} />);
        })}
      </div>

      {WORLDS.map((w, i) => {
        const wp = worldProgress(w, p);
        const side = i % 2;
        const rec = recommended === w.id;
        const done = hydrated && wp.status === "caught-up";
        return (
          <div key={w.id} className="absolute inset-x-0" style={{ top: i * ROW, height: ROW }}>
            <div className={`absolute left-[13%] top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 ${side ? "md:left-[78%]" : "md:left-[22%]"}`}>
              <Reveal y={8}>
                <Link href={`/worlds/${w.id}`} aria-label={`World ${w.number}: ${w.title}`} className="group relative block">
                  {rec && (
                    <motion.span
                      className="readout absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border-[1.5px] border-ink bg-sun px-2 py-0.5 text-[10px] font-bold text-ink shadow-[2px_2px_0_#1b2a4a]"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8 }}
                    >
                      Start here
                    </motion.span>
                  )}
                  <span
                    className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-ink transition group-hover:-translate-y-0.5 md:h-[84px] md:w-[84px]"
                    style={{ background: done ? w.color : "#fffdf7", boxShadow: "3px 3px 0 #1b2a4a" }}
                  >
                    {rec && <span className="spin absolute inset-[-8px] rounded-full border-2 border-dashed border-ink/50" style={{ ["--spd" as string]: "16s" }} />}
                    <WorldGlyph glyph={w.glyph} color={done ? "#fff" : w.color} terminals={false} className="h-8 w-8 md:h-11 md:w-11" />
                  </span>
                  <span className="readout absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-ink-soft">W{String(w.number).padStart(2, "0")}</span>
                </Link>
              </Reveal>
            </div>

            <div className={`absolute right-[1%] top-1/2 w-[70%] -translate-y-1/2 md:w-[44%] ${side ? "md:left-[6%] md:right-auto" : "md:right-[6%]"}`}>
              <Reveal delay={0.08}>
                <Link href={`/worlds/${w.id}`} className="group block transition hover:-translate-y-1">
                  <RatingPlate
                    code={`World ${String(w.number).padStart(2, "0")}`}
                    note={wp.status === "soon" ? "Coming soon" : `${wp.available} of ${w.lessons.length} live`}
                    title={w.title}
                    subtitle={w.tagline}
                    accent={w.color}
                    meter={{ done: hydrated ? wp.done : 0, live: wp.available, total: w.lessons.length }}
                  >
                    <div className="relative h-16 border-b-[1.5px] border-ink sm:h-20 md:h-24" style={{ background: w.tint }}>
                      <div className="halftone absolute inset-0" />
                      <WorldScene id={w.id} className="misprint absolute inset-0 h-full w-full" />
                    </div>
                  </RatingPlate>
                </Link>
              </Reveal>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const mq = "(min-width: 768px)";
/** Matches the md breakpoint; mobile-first on the server. */
function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(mq);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(mq).matches,
    () => false,
  );
}
