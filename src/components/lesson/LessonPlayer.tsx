"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, Sparkles } from "lucide-react";
import type { Lesson, Step, World } from "@/content/types";
import { completeLesson, recordStep, useHydrated, useProgress } from "@/lib/progress";
import { lessonKey } from "@/content/lessons";
import { Paragraphs } from "../ui/Rich";
import { FactCard, SourceList } from "../ui/Evidence";
import { VISUALS } from "../visuals/registry";
import { Interaction } from "../interactions/Interactions";
import { Quiz } from "./Quiz";

const STEP_LABEL: Record<Step["type"], string> = {
  hook: "Hook",
  explain: "Explain",
  visual: "Visualise",
  example: "Real world",
  interact: "Try it",
  check: "Check",
  apply: "Apply",
  recap: "Recap",
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
  const top = useRef<HTMLDivElement>(null);
  const resumed = useRef(false);

  // resume where the learner left off (once, after hydration)
  useEffect(() => {
    if (!hydrated || resumed.current) return;
    resumed.current = true;
    const saved = progress.lessons[key];
    if (saved && !saved.completedAt && saved.step > 0 && saved.step < lesson.steps.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setI(saved.step);
    }
  }, [hydrated, progress.lessons, key, lesson.steps.length]);

  const step = lesson.steps[i];
  const last = i === lesson.steps.length - 1;
  const gate =
    step.type === "check" ? score !== null : step.type === "interact" && step.interaction.kind !== "component" ? !!interactDone[i] : true;

  function go(n: number) {
    setI(n);
    if (n > i) recordStep(key, n);
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function finish() {
    completeLesson(key, lesson.title, score ?? 1);
    setFinished(true);
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (finished) {
    return (
      <div ref={top} className="mx-auto max-w-2xl scroll-mt-24 py-10 text-center">
        <div className="animate-rise mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full" style={{ background: world.tint }}>
          <Sparkles className="h-9 w-9" style={{ color: world.color }} />
        </div>
        <h1 className="font-display text-4xl text-forest-800">Lesson complete</h1>
        <p className="mt-3 text-lg text-ink-soft">
          You finished <strong className="text-ink">{lesson.title}</strong>
          {score !== null ? ` and scored ${Math.round(score * 100)}% first time on the check` : ""}.
        </p>
        {score !== null && score < 0.67 && (
          <p className="mx-auto mt-4 max-w-md rounded-xl bg-[#fdf3dc] p-4 text-sm">
            Tip: the questions you found tricky are waiting in your <Link href="/review" className="font-semibold underline">review session</Link>, with simpler explanations.
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {nextHref && (
            <Link href={nextHref} className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 font-semibold text-paper">
              Next lesson <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          <Link href={`/worlds/${world.id}`} className="rounded-full border border-sand bg-white px-6 py-3 font-semibold">
            Back to {world.title}
          </Link>
          <Link href="/ripple" className="rounded-full border border-sand bg-white px-6 py-3 font-semibold">
            Open the Ripple Explorer
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={top} className="scroll-mt-20">
      {/* step rail */}
      <div className="sticky top-16 z-30 -mx-4 mb-6 border-b border-sand/70 bg-paper/90 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-b-xl">
        <div className="flex items-center gap-3">
          <Link href={`/worlds/${world.id}`} className="rounded-full p-1.5 hover:bg-paper-2" aria-label={`Back to ${world.title}`}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex flex-1 gap-1" aria-label="Lesson progress">
            {lesson.steps.map((s, n) => (
              <button
                key={n}
                onClick={() => n <= Math.max(i, progress.lessons[key]?.step ?? 0) && go(n)}
                className="group flex-1"
                aria-label={`Step ${n + 1}: ${STEP_LABEL[s.type]}`}
                aria-current={n === i ? "step" : undefined}
              >
                <span className="block h-2 rounded-full transition-all" style={{ background: n < i ? world.color : n === i ? world.color : "#e3d8c3", opacity: n === i ? 1 : n < i ? 0.55 : 1 }} />
              </button>
            ))}
          </div>
          <span className="font-mono text-xs text-ink-soft">
            {i + 1}/{lesson.steps.length}
          </span>
        </div>
      </div>

      <article key={i} className="animate-rise mx-auto max-w-3xl">
        <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: world.color }}>
          {STEP_LABEL[step.type]}
        </div>
        <h2 className="font-display mb-5 text-3xl leading-tight text-forest-900 sm:text-4xl">{step.title}</h2>
        <StepBody step={step} worldColor={world.color} onInteractDone={() => setInteractDone((d) => ({ ...d, [i]: true }))} onQuiz={setScore} reflection={reflection} setReflection={setReflection} />

        {last && (
          <details className="mt-8 rounded-xl border border-sand bg-white/70 p-4">
            <summary className="flex cursor-pointer items-center gap-2 font-semibold">
              <BookOpen className="h-4 w-4" /> Sources for this lesson (reviewed {lesson.reviewed})
            </summary>
            <div className="mt-4">
              <SourceList refs={lesson.sources} />
            </div>
          </details>
        )}

        <div className="mt-10 flex items-center justify-between gap-3 border-t border-sand pt-6">
          <button onClick={() => go(i - 1)} disabled={i === 0} className="rounded-full px-4 py-2 text-sm font-semibold text-ink-soft disabled:opacity-30">
            ← Back
          </button>
          <div className="flex items-center gap-3">
            {!gate && step.type === "interact" && (
              <button onClick={() => go(i + 1)} className="text-sm text-ink-soft underline">
                Skip for now
              </button>
            )}
            {last ? (
              <button onClick={finish} className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 font-semibold text-paper shadow-lg shadow-forest-800/20">
                <Check className="h-4 w-4" /> Complete lesson
              </button>
            ) : (
              <button
                onClick={() => go(i + 1)}
                disabled={!gate}
                className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 font-semibold text-paper shadow-lg shadow-forest-800/20 transition disabled:bg-forest-800/30 disabled:shadow-none"
              >
                {step.type === "check" && !gate ? "Finish the check to continue" : "Continue"} <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

function StepBody({
  step,
  worldColor,
  onInteractDone,
  onQuiz,
  reflection,
  setReflection,
}: {
  step: Step;
  worldColor: string;
  onInteractDone: () => void;
  onQuiz: (s: number) => void;
  reflection: string;
  setReflection: (s: string) => void;
}) {
  switch (step.type) {
    case "hook":
      return (
        <div className="space-y-5">
          <div className="rounded-2xl p-6 sm:p-8" style={{ background: `${worldColor}14` }}>
            <Paragraphs body={step.body} className="text-[19px]" />
          </div>
          {step.fact && <FactCard fact={step.fact} />}
        </div>
      );
    case "explain":
      return (
        <div className="space-y-6">
          <Paragraphs body={step.body} />
          {step.terms && (
            <div className="rounded-2xl border border-sand bg-white p-5">
              <div className="mb-3 text-xs font-bold uppercase tracking-widest text-ink-soft">New terms</div>
              <dl className="grid gap-4 sm:grid-cols-2">
                {step.terms.map((t) => (
                  <div key={t.term}>
                    <dt className="font-semibold text-forest-800">{t.term}</dt>
                    <dd className="text-[15px] text-ink-soft">{t.definition}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      );
    case "visual": {
      const C = VISUALS[step.component];
      return (
        <div className="space-y-4">
          {step.intro && <p className="text-[17px] text-ink-soft">{step.intro}</p>}
          {C ? <C {...(step.props ?? {})} /> : <p>Visual unavailable.</p>}
          {step.caption && <p className="text-xs text-ink-soft">{step.caption}</p>}
        </div>
      );
    }
    case "example":
      return (
        <div className="space-y-6">
          <Paragraphs body={step.body} />
          {step.facts && (
            <div className="grid gap-3 sm:grid-cols-2">
              {step.facts.map((f, n) => (
                <FactCard key={n} fact={f} />
              ))}
            </div>
          )}
        </div>
      );
    case "interact":
      return (
        <div className="space-y-4">
          {step.intro && <p className="text-[17px] text-ink-soft">{step.intro}</p>}
          <Interaction spec={step.interaction} onDone={onInteractDone} />
        </div>
      );
    case "check":
      return <Quiz questions={step.questions} onComplete={onQuiz} />;
    case "apply":
      return (
        <div className="space-y-6">
          <Paragraphs body={step.body} />
          {step.prompt && (
            <div className="rounded-2xl border-2 border-dashed border-moss-300 bg-white p-5">
              <label htmlFor="reflect" className="mb-2 block font-semibold text-forest-800">
                Reflect: {step.prompt}
              </label>
              <textarea
                id="reflect"
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                rows={3}
                placeholder="Jot a thought. It stays in this browser only."
                className="w-full rounded-lg border border-sand bg-paper p-3 text-[15px]"
              />
            </div>
          )}
        </div>
      );
    case "recap":
      return (
        <div className="space-y-6">
          <ol className="space-y-3">
            {step.points.map((p, n) => (
              <li key={n} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-white" style={{ background: worldColor }}>
                  {n + 1}
                </span>
                <span className="pt-1.5 text-[16px] leading-relaxed">{p}</span>
              </li>
            ))}
          </ol>
          {step.next && <p className="text-ink-soft">{step.next}</p>}
        </div>
      );
  }
}
