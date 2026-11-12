import type { World, WorldId } from "./types";

/**
 * The ten learning worlds. Lessons with `available: true` have a full lesson
 * file in src/content/lessons; the rest are the planned curriculum.
 */
export const WORLDS: World[] = [
  {
    id: "history",
    number: 1,
    title: "How We Got Here",
    tagline: "The history of energy and environmental change",
    description:
      "From muscle and firewood to coal, oil, the grid and renewables. The historical context behind today's energy transition, and why transitions take decades.",
    color: "#b5762a",
    tint: "#f6e9d4",
    glyph: "spiral",
    connects: ["energy-system", "climate"],
    lessons: [
      { id: "muscle-to-megawatts", title: "From muscle to megawatts", summary: "Ten thousand years of human energy use, and why new sources pile on top of old ones.", minutes: 12, available: true },
      { id: "built-big-going-small", title: "The grid: built big, now going small", summary: "How Britain built a centralised grid, and why it is now becoming distributed.", minutes: 12, available: true },
      { id: "industrial-revolution", title: "Coal, steam and the industrial revolution", summary: "How fossil fuels unlocked growth and how that growth built our energy habits.", minutes: 12 },
      { id: "environmental-awareness", title: "Waking up to the environment", summary: "From smog to science: how environmental awareness grew.", minutes: 10 },
      { id: "climate-agreements", title: "Rio, Kyoto, Paris and beyond", summary: "What international climate agreements commit countries to, and what they don't.", minutes: 14 },
      { id: "home-heating-history", title: "A short history of home heating", summary: "Open fires to town gas to North Sea gas to heat pumps.", minutes: 10 },
    ],
  },
  {
    id: "energy-system",
    number: 2,
    title: "The Energy System",
    tagline: "Understanding how energy actually works",
    description:
      "Power versus energy, how electricity is made and moved, why the grid must balance second by second, and who does what in the market.",
    color: "#2f7d9a",
    tint: "#dceef5",
    glyph: "pulse",
    connects: ["technology", "business", "future-home"],
    lessons: [
      { id: "power-vs-energy", title: "Power vs energy: kW and kWh", summary: "The single most useful distinction in the whole industry, with a calculator to prove it.", minutes: 12, available: true },
      { id: "keeping-50hz", title: "Keeping 50 Hz: balancing the grid", summary: "Why supply must match demand every second, and what happens when it doesn't.", minutes: 14, available: true },
      { id: "generation-to-socket", title: "From power station to plug socket", summary: "Generation, transmission and distribution networks explained.", minutes: 12 },
      { id: "markets-and-prices", title: "How electricity is priced", summary: "Wholesale markets, marginal pricing and why gas often sets the price.", minutes: 14 },
      { id: "tariffs-smart-meters", title: "Tariffs, smart meters and time of use", summary: "Why the time you use energy is becoming as important as how much you use.", minutes: 12 },
      { id: "who-does-what", title: "Suppliers, generators, networks and aggregators", summary: "A map of the players and how money flows between them.", minutes: 12 },
    ],
  },
  {
    id: "climate",
    number: 3,
    title: "Climate & Environment",
    tagline: "The science behind the transition",
    description:
      "The greenhouse effect, carbon accounting, net zero and embodied carbon, with a constant eye on what is established science versus projection.",
    color: "#3f8a5c",
    tint: "#ddefe3",
    glyph: "leaf",
    connects: ["pestel", "foresight"],
    lessons: [
      { id: "greenhouse-effect", title: "The greenhouse effect in five minutes", summary: "The physics, the gases and what we know with high confidence.", minutes: 10 },
      { id: "weather-vs-climate", title: "Weather vs climate", summary: "Why a cold winter doesn't disprove warming.", minutes: 8 },
      { id: "carbon-accounting", title: "Carbon accounting and Scopes 1, 2, 3", summary: "How organisations count emissions, and where it gets slippery.", minutes: 14 },
      { id: "net-zero", title: "What net zero actually means", summary: "Reductions, removals and offsets.", minutes: 12 },
      { id: "embodied-carbon", title: "Embodied carbon and resource limits", summary: "The emissions inside the things we build, from heat pumps to batteries.", minutes: 12 },
      { id: "adaptation", title: "Adaptation and resilience", summary: "Preparing homes and grids for a changed climate.", minutes: 10 },
    ],
  },
  {
    id: "pestel",
    number: 4,
    title: "Forces of Change",
    tagline: "PESTEL and the forces shaping the industry",
    description:
      "Political, Economic, Social, Technological, Environmental and Legal forces, and the causal chains that connect a policy change to a customer decision.",
    color: "#8a5aa8",
    tint: "#ece2f3",
    glyph: "compass",
    connects: ["foresight", "business"],
    lessons: [
      { id: "pestel-intro", title: "PESTEL without the box-ticking", summary: "Using the six lenses to find causes and consequences, not lists.", minutes: 12 },
      { id: "political-economic", title: "Policy and money", summary: "Incentives, levies and how they change the economics of the home.", minutes: 12 },
      { id: "social-tech", title: "People and technology", summary: "Adoption, trust and the pace of technological change.", minutes: 12 },
      { id: "env-legal", title: "Environment and the law", summary: "Regulation as a driver of markets.", minutes: 12 },
      { id: "causal-chains", title: "Thinking in causal chains", summary: "From a policy announcement to a new product.", minutes: 14 },
    ],
  },
  {
    id: "technology",
    number: 5,
    title: "The Technology Landscape",
    tagline: "The technologies changing the industry",
    description:
      "Solar, wind, nuclear, hydrogen, batteries (LFP, NMC, sodium-ion), heat pumps, EV charging, smart grids and AI: how each works, how mature it is and what it costs.",
    color: "#d9602e",
    tint: "#fbe3d6",
    glyph: "bolt",
    connects: ["future-home", "business", "startups"],
    lessons: [
      { id: "solar-pv", title: "How solar PV turns light into electricity", summary: "Cells, panels, inverters and capacity factors.", minutes: 12 },
      { id: "wind-nuclear-hydrogen", title: "Wind, nuclear and hydrogen", summary: "Strengths, limits and where each fits.", minutes: 14 },
      { id: "battery-chemistry", title: "Inside a battery: LFP, NMC and sodium-ion", summary: "Why chemistry choices shape cost, safety and lifespan.", minutes: 14 },
      { id: "heat-pumps", title: "Heat pumps: moving heat, not making it", summary: "Coefficient of performance explained with a fridge.", minutes: 12 },
      { id: "ev-charging-v2g", title: "EV charging and vehicle-to-grid", summary: "A car as a battery on wheels.", minutes: 12 },
      { id: "digital-ai", title: "AI, IoT and digital twins", summary: "Software as the new energy infrastructure.", minutes: 12 },
    ],
  },
  {
    id: "business",
    number: 6,
    title: "The Business of Eco-Tech",
    tagline: "How the industry makes money",
    description:
      "Value chains, unit economics, CAC and LTV, capex versus opex, payback periods, financing, subscriptions and energy-as-a-service, with real company examples.",
    color: "#2b6b55",
    tint: "#d9ebe3",
    glyph: "coins",
    connects: ["startups", "opportunities"],
    lessons: [
      { id: "value-chains", title: "Industry value chains", summary: "Where value is created and captured.", minutes: 12 },
      { id: "unit-economics", title: "Unit economics: CAC, LTV and margin", summary: "The maths behind every proposition.", minutes: 14 },
      { id: "capex-opex-payback", title: "Capex, opex and payback periods", summary: "Why a heat pump is a financing problem as much as a technology problem.", minutes: 12 },
      { id: "as-a-service", title: "Subscriptions and energy-as-a-service", summary: "Turning hardware into recurring revenue.", minutes: 12 },
      { id: "hardware-software", title: "Hardware vs software economics", summary: "Margins, scale and the platform play.", minutes: 12 },
    ],
  },
  {
    id: "startups",
    number: 7,
    title: "Insurgents & Innovation",
    tagline: "Start-ups and the companies challenging the market",
    description:
      "Incumbents versus insurgents, disruptive innovation, venture capital, product-market fit, and why some business models fail. Includes the Company Explorer.",
    color: "#c2455a",
    tint: "#f7dfe3",
    glyph: "rocket",
    connects: ["business", "opportunities"],
    lessons: [
      { id: "incumbents-insurgents", title: "Incumbents vs insurgents", summary: "What makes a start-up different, and what incumbents do well.", minutes: 12 },
      { id: "disruption", title: "Disruptive innovation, properly defined", summary: "It's not just 'new and exciting'.", minutes: 12 },
      { id: "venture-capital", title: "How venture capital shapes the market", summary: "Why VC-backed firms behave the way they do.", minutes: 12 },
      { id: "why-models-fail", title: "Why business models fail", summary: "Case studies from supplier collapses to battery gigafactories.", minutes: 14 },
    ],
  },
  {
    id: "future-home",
    number: 8,
    title: "The Future Home",
    tagline: "The home as a connected energy system",
    description:
      "HEMS, smart tariffs, solar, batteries, EVs and heat pumps working together. The difference between HEMS, DERMS, DRMS and VPPs, customer segments and adoption barriers.",
    color: "#c58a17",
    tint: "#f8ecd0",
    glyph: "home",
    connects: ["opportunities", "technology", "energy-system"],
    lessons: [
      { id: "who-controls-what", title: "HEMS, DERMS, DRMS, VPPs: who controls what?", summary: "Four acronyms, one connected system, explained from the ground up.", minutes: 14, available: true },
      { id: "home-flexibility", title: "Home flexibility and smart tariffs", summary: "How households get paid to shift demand.", minutes: 12 },
      { id: "customer-segments", title: "Who adopts, and why", summary: "Segments, motivations and barriers.", minutes: 12 },
      { id: "supplier-role", title: "The changing role of the energy supplier", summary: "From selling kWh to orchestrating homes.", minutes: 12 },
      { id: "future-cx", title: "The future customer experience", summary: "What 'invisible' energy management could feel like.", minutes: 12 },
    ],
  },
  {
    id: "foresight",
    number: 9,
    title: "Foresight & Strategy",
    tagline: "Learning to understand and anticipate change",
    description:
      "Horizon scanning, weak signals, futures wheels, scenario planning, adoption curves and systems thinking, practised in the Ripple Explorer.",
    color: "#4b5fb0",
    tint: "#e0e4f5",
    glyph: "eye",
    connects: ["opportunities", "pestel"],
    lessons: [
      { id: "horizon-scanning", title: "Horizon scanning and weak signals", summary: "Spotting change before it is obvious.", minutes: 12 },
      { id: "futures-wheels", title: "Futures wheels and ripple effects", summary: "Mapping first-, second- and third-order consequences.", minutes: 12 },
      { id: "scenario-planning", title: "Scenario planning", summary: "Preparing for several futures, not predicting one.", minutes: 14 },
      { id: "adoption-curves", title: "Technology adoption curves", summary: "S-curves, chasms and tipping points.", minutes: 12 },
      { id: "systems-thinking", title: "Systems thinking", summary: "Feedback loops and unintended consequences.", minutes: 12 },
    ],
  },
  {
    id: "opportunities",
    number: 10,
    title: "Opportunity Studio",
    tagline: "Customer, product and innovation opportunities",
    description:
      "Customer problems, jobs to be done, value propositions, hypotheses and experiments, turning industry knowledge into credible opportunities. Ends in the Capstone.",
    color: "#167a73",
    tint: "#d6efed",
    glyph: "spark",
    connects: [],
    lessons: [
      { id: "jobs-to-be-done", title: "Jobs to be done in energy", summary: "What customers are really hiring a heat pump for.", minutes: 12 },
      { id: "value-propositions", title: "Value propositions that land", summary: "Gains, pains and fit.", minutes: 12 },
      { id: "hypotheses", title: "From assumption to testable hypothesis", summary: "Writing hypotheses worth testing.", minutes: 12 },
      { id: "experiments", title: "Designing experiments", summary: "Picking the cheapest test that could change your mind.", minutes: 14 },
      { id: "opportunity-assessment", title: "Assessing commercial opportunity", summary: "Desirability, feasibility, viability.", minutes: 12 },
    ],
  },
];

export const WORLD_BY_ID: Record<WorldId, World> = Object.fromEntries(WORLDS.map((w) => [w.id, w])) as Record<WorldId, World>;

export function getWorld(id: string): World | undefined {
  return WORLD_BY_ID[id as WorldId];
}

export function totalMinutes(world: World): number {
  return world.lessons.reduce((sum, l) => sum + l.minutes, 0);
}
