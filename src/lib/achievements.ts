import type { ProgressState } from "./progress";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name key used in UI
  test: (s: ProgressState, d: { streak: number }) => boolean;
}

const completed = (s: ProgressState) => Object.values(s.lessons).filter((l) => l.completedAt).length;

export const ACHIEVEMENTS: Achievement[] = [
  { id: "oriented", title: "Oriented", description: "Completed the starting diagnostic", icon: "compass", test: (s) => !!s.profile },
  { id: "first-lesson", title: "First spark", description: "Completed your first lesson", icon: "zap", test: (s) => completed(s) >= 1 },
  { id: "three-lessons", title: "Building current", description: "Completed three lessons", icon: "layers", test: (s) => completed(s) >= 3 },
  {
    id: "perfect",
    title: "Clear signal",
    description: "Scored 100% on a knowledge check",
    icon: "target",
    test: (s) => Object.values(s.lessons).some((l) => (l.best ?? 0) >= 0.99),
  },
  { id: "streak-3", title: "Three-day rhythm", description: "Learned on three days in a row", icon: "flame", test: (_s, d) => d.streak >= 3 },
  { id: "streak-7", title: "Weekly baseload", description: "Learned on seven days in a row", icon: "flame", test: (_s, d) => d.streak >= 7 },
  {
    id: "ripple",
    title: "Systems thinker",
    description: "Added your own connection in the Ripple Explorer",
    icon: "waves",
    test: (s) => Object.values(s.ripple.custom).flat().length > 0,
  },
  {
    id: "historian",
    title: "Historian",
    description: "Completed every available lesson in How We Got Here",
    icon: "scroll",
    test: (s) => !!s.lessons["history/muscle-to-megawatts"]?.completedAt && !!s.lessons["history/built-big-going-small"]?.completedAt,
  },
  {
    id: "capstone",
    title: "Strategist",
    description: "Drafted a strategic opportunity assessment",
    icon: "flag",
    test: (s) => !!s.capstone && [s.capstone.trend, s.capstone.problem, s.capstone.opportunity, s.capstone.validation].every((v) => v && v.trim().length > 10),
  },
  { id: "xp-500", title: "Half a kilowatt", description: "Earned 500 XP", icon: "battery", test: (s) => s.xp >= 500 },
];
