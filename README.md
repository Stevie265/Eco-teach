# Eco-teach

**Understand the world that's changing our future.**

Eco-teach is an interactive learning platform that takes curious, non-technical people to genuine fluency in the Eco-Tech industry: energy systems, climate science, technology, business models, start-ups, the future of the home, foresight and opportunity design.

- **Live:** https://eco-teach.vercel.app
- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion (scroll & parallax) · Vercel
- **Design language: "Current"** (see `/design`): a continuous wire through the app (journey as a circuit diagram), schematic symbols from electrical single-line diagrams, appliance rating-plate cards, riso-print illustration (spot inks, halftone, misregistration, grain) and meter readouts instead of trophies. Bricolage Grotesque + Inter + JetBrains Mono.

---

## What's in v1

| Area | What it does |
| --- | --- |
| **Journey** (`/`) | A scroll-driven parallax landscape (sky, mountains, turbines, grid, homes), then a winding path that draws itself as you scroll, with each world as an illustrated place. |
| **World pages** (`/worlds/[worldId]`) | Lesson path with progressive unlocking, mastery badges and links to connected worlds. |
| **Lesson player** (`/learn/[worldId]/[lessonId]`) | The 8-step lesson structure: hook → explain → visual → real-world example → interaction → knowledge check → application → recap. Resumes where you left off. |
| **Visual metaphors** | Tap & bath (kW vs kWh), grid seesaw (frequency), energy ladder, additions sketch, roads (transmission vs distribution), personal trainer / coach / choir / traffic control (HEMS, DRMS, VPP, DERMS). |
| **Interactive visuals** | Energy timeline, centralised vs distributed grid, appliance kW/kWh calculator, grid frequency balancer, HEMS/DRMS/VPP/DERMS control stack. |
| **Interactions** | Ordering, sorting into buckets and scenario decisions, all data-driven from lesson content. |
| **Adaptive checks** | A wrong answer offers a simpler, different explanation. Missed questions go into the review queue. |
| **Diagnostic** (`/start`) | Seven questions on knowledge, familiarity, goals and role, which recommend a starting lesson and focus worlds. |
| **Progression** | XP, levels, daily streaks, achievements, mastery per lesson, review sessions (`/review`). |
| **Dashboard** (`/dashboard`) | Overall and per-world progress, mastered topics, topics to revise, activity and achievements, plus export and reset. |
| **Breakthrough Breakdown** (`/breakthroughs`) | Seven technologies (sodium-ion, perovskite tandem solar, iron-air, enhanced geothermal, solid-state, vehicle-to-grid, heat pumps) explained in four swipeable illustrated steps each, then the actual breakthrough with sourced, evidence-labelled facts, a Lab → Mainstream maturity track, gains, limits and what it means for homes. Content in `src/content/breakthroughs.ts`, scenes in `src/components/breakthroughs/Scenes.tsx`. |
| **Ripple Explorer** (`/ripple`) | Follow a trend through environment → industry → customer. "Play the ripple", inspect evidence status, add your own nodes and save notes. |
| **Company Explorer** (`/companies`) | Incumbents, insurgents, scale-ups and failures; filter and compare up to three business models. |
| **Capstone** (`/capstone`) | Seven-step strategic opportunity assessment with a shareable view, Markdown copy and print/PDF. |
| **Sources** (`/sources`) | Every source with publisher, publication date, last-checked date, UK/US/global grouping and where it's used. |

**Fully written lessons:** *From muscle to megawatts*, *The grid: built big, now going small* (World 1), *Power vs energy*, *Keeping 50 Hz* (World 2), and *HEMS, DERMS, DRMS, VPPs: who controls what?* (World 8). All other lessons are outlined in the curriculum and marked "In development".

---

## Getting started

Requirements: Node.js 20+ (22 recommended) and npm.

```bash
git clone https://github.com/Stevie265/eco-teach.git
cd eco-teach
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build (also type-checks)
npm run start        # serve the production build
npm run lint         # ESLint (incl. React Compiler rules)
```

## Environment variables

**None are required for v1.** The app is fully static and stores learner progress in the browser.

When accounts are added, secrets go in Vercel project settings (and `.env.local` for local development, which is git-ignored). Never put secrets in client code or in variables prefixed `NEXT_PUBLIC_`. See `.env.example`.

---

## Project structure

```
src/
  app/                      Routes (App Router)
    page.tsx                Home + learning map
    worlds/[worldId]/       World page
    learn/[worldId]/[lessonId]/  Lesson player
    start/ dashboard/ review/ ripple/ companies/ capstone/ sources/ about/
  components/
    lesson/                 LessonPlayer, Quiz
    interactions/           Order / Sort / Scenario tasks
    visuals/                Interactive diagrams + registry.tsx
    visuals/metaphors/      Visual metaphors used alongside explanations
    landscape/              Parallax landscape + illustrated world scenes
    brand/                  Rating plate, segment meter, riso defs (halftone, grain)
    motion/                 Reveal / Parallax primitives (respect reduced motion)
    ui/                     Nav, glyphs, evidence badges, rich text
  content/                  ← all curriculum content lives here
    types.ts                Content model (World → Lesson → Step)
    worlds.ts               Ten worlds + lesson outlines
    lessons/                One file per full lesson + index.ts registry
    sources.ts              Source registry (dated, linkable)
    breakthroughs.ts        Breakthrough Breakdown content (frames, facts, maturity)
    ripples.ts              Ripple Explorer trends
    companies.ts            Company Explorer profiles
    diagnostic.ts           Diagnostic questions + recommendation logic
  lib/
    progress.ts             Progress store (localStorage adapter)
    achievements.ts         Achievement rules
    curriculum.ts           Unlocking + progress helpers
```

## Adding content

**A new lesson**

1. Create `src/content/lessons/my-lesson.ts` exporting a `Lesson` (copy an existing one). Use the 8 step types in order.
2. Register it in `src/content/lessons/index.ts`.
3. Set `available: true` on its outline in `src/content/worlds.ts`.
4. Reference sources by id. Add any new source to `src/content/sources.ts` with its URL, publication date and checked date.

**A new interactive visual or metaphor**: build a client component in `src/components/visuals/`, add it to `registry.tsx`, then reference it by name from a `visual` step, or as `visual: { component }` on an `explain` or `example` step to show it beside the text.

**A new interaction**: `order`, `sort` and `scenario` are data-only. Just describe them in the lesson file.

**A new Ripple trend or company**: add an entry to `ripples.ts` or `companies.ts`.

### Content rules

- Never invent statistics, research or citations. Every factual claim links to a dated source.
- Label evidence: `established`, `forecast`, `company-claim`, `speculative` (reasoned scenario) or `illustrative`.
- Explain every acronym on first use, and build up from fundamentals (e.g. DERs before DERMS).
- Include UK and US perspectives where they differ.

---

## Deployment

The GitHub repo is connected to the Vercel project **eco-teach**.

- **Production:** every push to `main` deploys to https://eco-teach.vercel.app.
- **Previews:** every other branch and every pull request gets its own preview URL, posted on the PR.
- **Build settings:** auto-detected Next.js (`npm run build`), Node 22.

Recommended workflow:

```bash
git checkout -b feature/new-lesson
# ...make changes...
npm run lint && npm run build
git push -u origin feature/new-lesson   # → preview deployment
# open a PR, review the preview, merge → production deployment
```

Rollbacks: Vercel dashboard → eco-teach → Deployments → pick a previous deployment → *Promote to Production*.

---

## Accounts & saved progress (roadmap)

v1 deliberately has **no accounts**, so colleagues can open the link and start straight away, and no personal or company data is stored on a server. Progress lives in `localStorage` via `src/lib/progress.ts`, and every read and write goes through that module.

To add accounts later:

1. Add an auth provider (e.g. Auth.js with Microsoft Entra ID for work SSO, or Supabase Auth / email magic links).
2. Add a database (e.g. Supabase Postgres or Neon via the Vercel Marketplace) with a `progress` table keyed by user id, storing the same `ProgressState` JSON.
3. Replace `load`/`save` in `progress.ts` with a server adapter (route handlers or server actions), keeping localStorage as an offline cache, and migrate existing local progress on first sign-in.
4. Team workspaces (cohorts, shared capstones, admin views) can then build on user ids.

## Accessibility

Semantic landmarks, skip link, keyboard-operable interactions (no drag-only controls), visible focus rings, ARIA roles and live regions on quizzes and simulations, colour pairs chosen for contrast, and `prefers-reduced-motion` support.

## Licence

Private project. All rights reserved.
