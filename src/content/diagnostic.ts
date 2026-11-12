import type { WorldId } from "./types";

export interface DiagQuestion {
  id: string;
  prompt: string;
  kind: "knowledge" | "familiarity" | "goals" | "role";
  multi?: boolean;
  options: { id: string; label: string; score?: number }[];
  correct?: string;
}

export const DIAGNOSTIC: DiagQuestion[] = [
  {
    id: "familiarity",
    kind: "familiarity",
    prompt: "How familiar are you with the energy industry today?",
    options: [
      { id: "new", label: "Very new: I mostly know my own bills", score: 0 },
      { id: "some", label: "Some knowledge from work or the news", score: 1 },
      { id: "solid", label: "Solid: I work with energy concepts regularly", score: 2 },
      { id: "expert", label: "Deep: I could explain grid balancing to a colleague", score: 3 },
    ],
  },
  {
    id: "kw",
    kind: "knowledge",
    prompt: "A 3 kW heater runs for 2 hours. How much energy does it use?",
    options: [
      { id: "a", label: "1.5 kWh" },
      { id: "b", label: "6 kWh" },
      { id: "c", label: "6 kW" },
      { id: "d", label: "Not sure" },
    ],
    correct: "b",
  },
  {
    id: "freq",
    kind: "knowledge",
    prompt: "What does falling grid frequency usually signal?",
    options: [
      { id: "a", label: "Demand is exceeding supply" },
      { id: "b", label: "Supply is exceeding demand" },
      { id: "c", label: "Prices are falling" },
      { id: "d", label: "Not sure" },
    ],
    correct: "a",
  },
  {
    id: "vpp",
    kind: "knowledge",
    prompt: "What is a virtual power plant (VPP)?",
    options: [
      { id: "a", label: "A power station simulated in software for training" },
      { id: "b", label: "Many small devices (batteries, EVs…) aggregated to act and trade like one power plant" },
      { id: "c", label: "A nuclear plant controlled remotely" },
      { id: "d", label: "Not sure" },
    ],
    correct: "b",
  },
  {
    id: "lfp",
    kind: "knowledge",
    prompt: "LFP and NMC are…",
    options: [
      { id: "a", label: "Two UK energy regulators" },
      { id: "b", label: "Types of heat pump" },
      { id: "c", label: "Lithium-ion battery chemistries" },
      { id: "d", label: "Not sure" },
    ],
    correct: "c",
  },
  {
    id: "goals",
    kind: "goals",
    multi: true,
    prompt: "What do you most want from Eco-teach? (choose any)",
    options: [
      { id: "fundamentals", label: "Understand the fundamentals properly" },
      { id: "home", label: "Understand the future of the home" },
      { id: "business", label: "Understand business models and markets" },
      { id: "strategy", label: "Spot trends and think strategically" },
      { id: "opportunities", label: "Turn knowledge into product opportunities" },
    ],
  },
  {
    id: "role",
    kind: "role",
    prompt: "Which best describes your work?",
    options: [
      { id: "cx", label: "Customer experience" },
      { id: "product", label: "Product management" },
      { id: "innovation", label: "Innovation and experimentation" },
      { id: "strategy", label: "Strategy and transformation" },
      { id: "home-services", label: "Energy and home services" },
      { id: "commercial", label: "Technology and commercial" },
      { id: "other", label: "Something else" },
    ],
  },
];

export interface Recommendation {
  level: "foundation" | "intermediate" | "advanced";
  worldId: WorldId;
  lessonId: string;
  reason: string;
  focusWorlds: WorldId[];
}

export function recommend(answers: Record<string, string[]>): Recommendation {
  const knowledge = DIAGNOSTIC.filter((q) => q.kind === "knowledge");
  const correct = knowledge.filter((q) => answers[q.id]?.[0] === q.correct).length;
  const fam = DIAGNOSTIC[0].options.find((o) => o.id === answers.familiarity?.[0])?.score ?? 0;
  const score = correct + fam * 0.5; // 0..5.5
  const goals = answers.goals ?? [];

  const focus = new Set<WorldId>();
  if (goals.includes("fundamentals")) focus.add("energy-system");
  if (goals.includes("home")) focus.add("future-home");
  if (goals.includes("business")) focus.add("business");
  if (goals.includes("strategy")) focus.add("foresight");
  if (goals.includes("opportunities")) focus.add("opportunities");

  if (score < 2) {
    return {
      level: "foundation",
      worldId: "history",
      lessonId: "muscle-to-megawatts",
      reason: "You're early in your energy journey, so we'll start with the big picture of how we got here, then build up the fundamentals step by step.",
      focusWorlds: [...focus],
    };
  }
  if (score < 4) {
    return {
      level: "intermediate",
      worldId: "energy-system",
      lessonId: "power-vs-energy",
      reason: "You've got some grounding. Start with the core mechanics of the energy system (power, energy and balancing), which everything else builds on.",
      focusWorlds: [...focus],
    };
  }
  return {
    level: "advanced",
    worldId: "future-home",
    lessonId: "who-controls-what",
    reason: "You know the fundamentals. Jump into the future home, where the industry's hardest coordination problems and biggest opportunities sit.",
    focusWorlds: [...focus],
  };
}
