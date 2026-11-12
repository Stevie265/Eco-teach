/**
 * Eco-teach content model.
 *
 * Curriculum = Worlds → Lessons → Steps.
 * Lessons follow the 8-part structure: hook, explain, visual, example,
 * interact, check, apply, recap. Content is plain typed data so new
 * lessons can be added by dropping a file into src/content/lessons and
 * registering it in src/content/lessons/index.ts.
 */

export type WorldId =
  | "history"
  | "energy-system"
  | "climate"
  | "pestel"
  | "technology"
  | "business"
  | "startups"
  | "future-home"
  | "foresight"
  | "opportunities";

export interface LessonOutline {
  id: string;
  title: string;
  summary: string;
  minutes: number;
  /** true once a full lesson file exists for this outline */
  available?: boolean;
}

export interface World {
  id: WorldId;
  number: number;
  title: string;
  tagline: string;
  description: string;
  /** Visual identity */
  color: string; // primary hex
  tint: string; // soft background hex
  glyph: string; // key into WorldGlyph
  /** Worlds this one builds on / feeds into (for the map) */
  connects: WorldId[];
  lessons: LessonOutline[];
}

/** Evidence status, used on facts, ripple nodes and company claims */
export type Evidence = "established" | "forecast" | "company-claim" | "speculative" | "illustrative";

export interface SourceRef {
  id: string;
  /** Optional pinpoint, e.g. "p. 4" or "section 2" */
  note?: string;
}

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url?: string;
  /** ISO date or year of publication */
  published: string;
  kind: "regulator" | "government" | "system-operator" | "research" | "intergovernmental" | "industry" | "company" | "news" | "book" | "reference";
  region?: "UK" | "US" | "Global" | "EU";
  /** When we last checked the link and claim */
  checked: string;
}

export interface Fact {
  text: string;
  evidence: Evidence;
  sources?: SourceRef[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
  correct: string;
  explanation: string;
  /** Adaptive: a simpler re-explanation offered after a wrong answer */
  simpler: string;
}

export type InteractionSpec =
  | { kind: "component"; component: string; props?: Record<string, unknown> }
  | {
      kind: "order";
      instructions: string;
      items: { id: string; label: string; detail?: string }[];
      /** correct order of ids */
      solution: string[];
      feedback: string;
    }
  | {
      kind: "sort";
      instructions: string;
      buckets: { id: string; label: string; hint?: string }[];
      items: { id: string; label: string; bucket: string; why: string }[];
    }
  | {
      kind: "scenario";
      instructions: string;
      situation: string;
      choices: { id: string; label: string; outcome: string; quality: "strong" | "ok" | "weak" }[];
    };

export type Step =
  | { type: "hook"; title: string; body: string[]; fact?: Fact }
  | { type: "explain"; title: string; body: string[]; terms?: GlossaryTerm[] }
  | { type: "visual"; title: string; intro?: string; component: string; props?: Record<string, unknown>; caption?: string }
  | { type: "example"; title: string; body: string[]; facts?: Fact[] }
  | { type: "interact"; title: string; intro?: string; interaction: InteractionSpec }
  | { type: "check"; title: string; questions: QuizQuestion[] }
  | { type: "apply"; title: string; body: string[]; prompt?: string }
  | { type: "recap"; title: string; points: [string, string, string]; next?: string };

export interface Lesson {
  id: string;
  worldId: WorldId;
  title: string;
  subtitle: string;
  minutes: number;
  level: "foundation" | "intermediate" | "advanced";
  steps: Step[];
  sources: SourceRef[];
  /** ISO date the content was last reviewed */
  reviewed: string;
}
