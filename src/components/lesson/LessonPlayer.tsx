"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, BookOpen, Check, X, Zap } from "lucide-react";
import type { InlineVisual, Lesson, Step, World } from "@/content/types";
import { completeLesson, recordStep, useHydrated, useProgress } from "@/lib/progress";
import { lessonKey } from "@/content/lessons";
import { Paragraphs, Rich } from "../ui/Rich";
import { FactCard, SourceList } from "../ui/Evidence";
import { VISUALS } from "../visuals/registry";
import { Interaction } from "../interactions/Interactions";
import { Quiz } from "./Quiz";
import { Reveal } from "../motion/Motion";
import { WorldScene } from "../landscape/WorldScene";
import { shade } from "@/lib/color";

const STEP_LABEL: Record<Step["type"], string> = {
  hook: "The hook",
  explain: "The idea",
  visual: "See it",
  example: "In the real world",
  interact: "Try it",
  check: "Check yourself",
  apply: "Why it matters",
  recap: "Remember",
};

export function LessonPlayer({ lesson, world, nextHref }: { lesson: Lesson; world: World; nextHref?: string }) {
  const key = lessonKey(world.id, lesson.id);
  const progress = useProgress();
  const hydrated = useHydrated();
  const [i, setI] = useState(0);
  const [interactDone, setInteractDone] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [reflection, setReflection] = useState("");
  const resumed = useRef(false);
  const [startXp, setStartXp] = useState<number | null>(null);

  useEffect(() => {
    if (!hydrated || resumed.current) return;
    resumed.current = true;
     
    setStartXp(progress.xp);
    const saved = progress.lessons[key];
    if (saved && !saved.completedAt && saved.step > 0 && saved.step < lesson.steps.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setI(saved.step);
    }
  }, [hydrated, progress.lessons, progress.xp, key, lesson.steps.length]);

  const step = lesson.steps[i];
  const last = i === lesson.steps.length - 1;
  const gate = step.type === "check" ? score !== null : step.type === "interact" && step.interaction.kind !== "component" ? !!interactDone[i] : true;
  const pct = ((i + 1) / lesson.steps.length) * 100;

  function go(n: number) {
    setI(n);
    if (n > i) recordStep(key, n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function finish() {
    completeLesson(key, lesson.title, score ?? 1);
    setFinished(true);
    window.scrollTo({ top: 0 });
  }

  if (finished) {
    const gained = startXp !== null ? progress.xp - startXp : 0;
    return <Celebration lesson={lesson} world={world} score={score} gained={gained} nextHref={nextHref} />;
  }

  const wide = (step.type === "explain" || step.type === "example") && !!step.visual;

  return (
    <div className="min-h-[100svh] pb-28 sm:pb-32" style={{ background: `linear-gradient(180deg, ${world.tint} 0%, #fffaf0 340px)` }}>
      {/* top bar */}
      <div className="sticky top-0 z-30 bg-gradient-to-b from-white/95 via-white/80 to-white/0 pb-3 pt-[max(0.5rem,env(safe-area-inset-top))] backdrop-blur-[2px]">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-3 sm:gap-4 sm:px-4">
          <Link href={`/worlds/${world.id}`} className="-ml-1 rounded-xl p-2 text-ink-soft hover:bg-white" aria-label={`Exit lesson, back to ${world.title}`}>
            <X className="h-6 w-6" />
          </Link>
          <div className="relative h-3.5 flex-1 sm:h-4 overflow-hidden rounded-full bg-white shadow-inner ring-2 ring-sand" role="progressbar" aria-valuenow={i + 1} aria-valuemin={1} aria-valuemax={lesson.steps.length} aria-label="Lesson progress">
            <motion.div className="absolute inset-y-0 left-0 rounded-full" style={{ background: world.color }} initial={false} animate={{ width: `${pct}%` }} transition={{ type: "spring", stiffness: 80, damping: 18 }}>
              <div className="mx-2 mt-[3px] h-1 rounded-full bg-white/40" />
            </motion.div>
          </div>
          <span className="flex items-center gap-1 rounded-xl bg-white px-2.5 py-1 text-sm font-extrabold text-[#e09400] shadow-[0_2px_0_#e7ddc9]">
            <Zap className="h-4 w-4" />
            {hydrated ? progress.xp : 0}
          </span>
        </div>
        <div className="mx-auto mt-1 hidden max-w-5xl px-4 pl-16 text-xs font-bold text-ink-soft sm:block">
          {world.title} · {lesson.title}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={i}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
          className={`mx-auto px-4 pt-2 sm:pt-4 ${wide ? "max-w-6xl" : "max-w-3xl"}`}
        >
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] shadow-[0_2px_0_#e7ddc9] sm:mb-3 sm:text-xs" style={{ color: shade(world.color, 0.15) }}>
            Step {i + 1} · {STEP_LABEL[step.type]}
          </div>
          <h1 className="font-display t-h1 mb-4 text-forest-900 sm:mb-6">{step.title}</h1>
          <StepBody step={step} world={world} onInteractDone={() => setInteractDone((d) => ({ ...d, [i]: true }))} onQuiz={setScore} reflection={reflection} setReflection={setReflection} />

          {last && (
            <details className="mt-10 rounded-2xl border-2 border-sand bg-white p-4">
              <summary className="flex cursor-pointer items-center gap-2 font-bold">
                <BookOpen className="h-4 w-4" /> Sources for this lesson (reviewed {lesson.reviewed})
              </summary>
              <div className="mt-4">
                <SourceList refs={lesson.sources} />
              </div>
            </details>
          )}
        </motion.article>
      </AnimatePresence>

      {/* action bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-sand bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-4">
          <button onClick={() => go(i - 1)} disabled={i === 0} className="btn btn-secondary shrink-0 px-3 disabled:invisible sm:px-5" aria-label="Previous step">
            <ArrowLeft className="h-5 w-5 sm:hidden" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="flex flex-1 items-center justify-end gap-3">
            {!gate && step.type === "interact" && (
              <button onClick={() => go(i + 1)} className="text-sm font-bold text-ink-soft underline">
                Skip
              </button>
            )}
            {last ? (
              <button onClick={finish} className="btn btn-primary flex-1 sm:flex-none sm:min-w-48">
                <Check className="h-5 w-5" /> Complete lesson
              </button>
            ) : (
              <button onClick={() => go(i + 1)} disabled={!gate} className="btn btn-primary flex-1 sm:flex-none sm:min-w-48">
                {step.type === "check" && !gate ? "Answer to continue" : step.type === "interact" && !gate ? "Have a go first" : "Continue"} {gate && <ArrowRight className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InlineVisualBlock({ v }: { v: InlineVisual }) {
  const C = VISUALS[v.component];
  if (!C) return null;
  return (
    <figure>
      <C {...(v.props ?? {})} />
      {v.caption && <figcaption className="mt-2 text-xs text-ink-soft">{v.caption}</figcaption>}
    </figure>
  );
}

function ParagraphsReveal({ body }: { body: string[] }) {
  return (
    <div className="prose-eco t-body text-ink">
      {body.map((p, n) => (
        <Reveal key={n} delay={Math.min(n * 0.06, 0.3)} y={16}>
          <p>
            <Rich text={p} />
          </p>
        </Reveal>
      ))}
    </div>
  );
}

function StepBody({
  step,
  world,
  onInteractDone,
  onQuiz,
  reflection,
  setReflection,
}: {
  step: Step;
  world: World;
  onInteractDone: () => void;
  onQuiz: (s: number) => void;
  reflection: string;
  setReflection: (s: string) => void;
}) {
  switch (step.type) {
    case "hook":
      return (
        <div className="space-y-5">
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_5px_0_#e7ddc9] ring-2 ring-sand">
            <div className="h-24 sm:hidden" style={{ background: world.tint }}>
              <WorldScene id={world.id} className="mx-auto h-full" />
            </div>
            <WorldScene id={world.id} className="pointer-events-none absolute -right-6 -top-4 hidden h-40 w-64 opacity-90 sm:block" />
            <div className="relative p-5 sm:p-8 sm:pr-48">
              <Paragraphs body={step.body} className="!text-[17px] !leading-relaxed sm:!text-[20px]" />
            </div>
          </div>
          {step.fact && (
            <Reveal delay={0.2}>
              <FactCard fact={step.fact} />
            </Reveal>
          )}
        </div>
      );
    case "explain":
      return (
        <div className={step.visual ? "grid gap-8 lg:grid-cols-[1fr_1fr]" : ""}>
          <div className="space-y-5 sm:space-y-6">
            {step.visual ? (
              <>
                <ParagraphsReveal body={step.body.slice(0, 1)} />
                <div className="lg:hidden">
                  <Reveal>
                    <InlineVisualBlock v={step.visual} />
                  </Reveal>
                </div>
                <ParagraphsReveal body={step.body.slice(1)} />
              </>
            ) : (
              <ParagraphsReveal body={step.body} />
            )}
            {step.terms && (
              <Reveal>
                <div className="rounded-3xl border-2 border-sand bg-white p-4 shadow-[0_4px_0_#e7ddc9] sm:p-5">
                  <div className="mb-3 text-[11px] font-extrabold uppercase tracking-widest sm:text-xs" style={{ color: world.color }}>
                    New words
                  </div>
                  <dl className="grid gap-4 sm:grid-cols-2">
                    {step.terms.map((t) => (
                      <div key={t.term}>
                        <dt className="font-display text-base text-forest-900 sm:text-lg">{t.term}</dt>
                        <dd className="text-sm text-ink-soft sm:text-[15px]">{t.definition}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            )}
          </div>
          {step.visual && (
            <div className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
              <Reveal delay={0.1}>
                <InlineVisualBlock v={step.visual} />
              </Reveal>
            </div>
          )}
        </div>
      );
    case "visual": {
      const C = VISUALS[step.component];
      return (
        <div className="space-y-4">
          {step.intro && <p className="t-body text-ink-soft">{step.intro}</p>}
          <Reveal>{C ? <C {...(step.props ?? {})} /> : <p>Visual unavailable.</p>}</Reveal>
          {step.caption && <p className="text-xs text-ink-soft">{step.caption}</p>}
        </div>
      );
    }
    case "example":
      return (
        <div className={step.visual ? "grid gap-8 lg:grid-cols-[1fr_1fr]" : "space-y-6"}>
          <div className="space-y-6">
            <ParagraphsReveal body={step.body} />
            {step.facts && (
              <div className="grid gap-3 sm:grid-cols-2">
                {step.facts.map((f, n) => (
                  <Reveal key={n} delay={n * 0.08}>
                    <FactCard fact={f} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
          {step.visual && (
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal delay={0.1}>
                <InlineVisualBlock v={step.visual} />
              </Reveal>
            </div>
          )}
        </div>
      );
    case "interact":
      return (
        <div className="space-y-4">
          {step.intro && <p className="t-body text-ink-soft">{step.intro}</p>}
          <Interaction spec={step.interaction} onDone={onInteractDone} />
        </div>
      );
    case "check":
      return <Quiz questions={step.questions} onComplete={onQuiz} />;
    case "apply":
      return (
        <div className="space-y-6">
          <ParagraphsReveal body={step.body} />
          {step.prompt && (
            <Reveal>
              <div className="rounded-3xl border-2 border-dashed border-moss-300 bg-white p-4 sm:p-5">
                <label htmlFor="reflect" className="mb-2 block font-display text-base text-forest-900 sm:text-lg">
                  💭 {step.prompt}
                </label>
                <textarea
                  id="reflect"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  rows={3}
                  placeholder="Jot a thought. It stays in this browser only."
                  className="w-full rounded-2xl border-2 border-sand bg-paper p-3 text-[15px]"
                />
              </div>
            </Reveal>
          )}
        </div>
      );
    case "recap":
      return (
        <div className="space-y-6">
          <ol className="space-y-4">
            {step.points.map((p, n) => (
              <Reveal key={n} delay={n * 0.15}>
                <li className="flex gap-3 rounded-3xl bg-white p-4 shadow-[0_5px_0_#e7ddc9] ring-2 ring-sand sm:gap-4 sm:p-5">
                  <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg text-white sm:h-12 sm:w-12 sm:rounded-2xl sm:text-xl" style={{ background: world.color, boxShadow: `0 4px 0 ${shade(world.color)}` }}>
                    {n + 1}
                  </span>
                  <span className="t-body pt-1.5">{p}</span>
                </li>
              </Reveal>
            ))}
          </ol>
          {step.next && <p className="font-semibold text-ink-soft">{step.next}</p>}
        </div>
      );
  }
}

/* ---------- Celebration ---------- */
function Celebration({ lesson, world, score, gained, nextHref }: { lesson: Lesson; world: World; score: number | null; gained: number; nextHref?: string }) {
  const pieces = Array.from({ length: 36 }, (_, k) => ({
    x: (k * 37) % 100,
    color: ["#ffd23f", "#ff6b4a", "#2fa560", "#4fb3e8", world.color][k % 5],
    delay: (k % 9) * 0.07,
    rot: (k * 47) % 360,
  }));
  return (
    <div className="relative min-h-[100svh] overflow-hidden" style={{ background: `linear-gradient(180deg, ${world.tint}, #fffaf0)` }}>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {pieces.map((p, k) => (
          <motion.span
            key={k}
            className="absolute top-0 block h-3 w-2 rounded-sm"
            style={{ left: `${p.x}%`, background: p.color }}
            initial={{ y: -40, rotate: 0, opacity: 1 }}
            animate={{ y: "105vh", rotate: p.rot + 360, opacity: [1, 1, 0] }}
            transition={{ duration: 2.6 + (k % 5) * 0.3, delay: p.delay, ease: "easeIn" }}
          />
        ))}
      </div>
      <div className="relative mx-auto flex max-w-xl flex-col items-center px-4 pb-10 pt-14 text-center sm:pt-20">
        <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 160, damping: 10 }} className="flex h-24 w-24 items-center justify-center rounded-[28px] text-5xl sm:h-32 sm:w-32 sm:rounded-[36px] sm:text-6xl" style={{ background: world.color, boxShadow: `0 8px 0 ${shade(world.color)}` }}>
          🏆
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-display t-h1 mt-6 text-forest-900 sm:mt-8">
          Lesson complete!
        </motion.h1>
        <p className="t-lead mt-1 text-ink-soft">{lesson.title}</p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 grid w-full grid-cols-2 gap-3 sm:mt-8">
          <div className="rounded-3xl border-2 border-[#f2c14e] bg-sprout-soft p-4 shadow-[0_4px_0_#f2c14e]">
            <div className="text-xs font-extrabold uppercase tracking-wider text-[#a87400]">XP earned</div>
            <div className="font-display flex items-center justify-center gap-1 text-3xl text-[#a87400] sm:text-4xl">
              <Zap className="h-7 w-7" />+{Math.max(gained, 0)}
            </div>
          </div>
          <div className="rounded-3xl border-2 border-moss-300 bg-moss-100 p-4 shadow-[0_4px_0_#9ad9ae]">
            <div className="text-xs font-extrabold uppercase tracking-wider text-forest-700">First-try score</div>
            <div className="font-display text-3xl text-forest-700 sm:text-4xl">{score !== null ? `${Math.round(score * 100)}%` : "—"}</div>
          </div>
        </motion.div>
        {score !== null && score < 0.67 && (
          <p className="mt-4 rounded-2xl bg-white p-4 text-sm shadow-[0_3px_0_#e7ddc9]">
            The questions you found tricky are waiting in your <Link href="/review" className="font-bold text-sky-deep underline">review session</Link>, with simpler explanations.
          </p>
        )}
        <div className="mt-8 flex w-full flex-col gap-3">
          {nextHref && (
            <Link href={nextHref} className="btn btn-primary w-full">
              Next lesson <ArrowRight className="h-5 w-5" />
            </Link>
          )}
          <Link href="/" className={`btn w-full ${nextHref ? "btn-secondary" : "btn-primary"}`}>
            Back to my journey
          </Link>
          <Link href="/ripple" className="btn btn-secondary w-full">
            Explore ripples
          </Link>
        </div>
      </div>
    </div>
  );
}
