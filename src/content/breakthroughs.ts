import type { Fact, SourceRef } from "./types";

/**
 * Breakthrough Breakdown
 * Each technology is explained in four illustrated frames (how it works → what changed),
 * followed by the breakthrough itself, its maturity, trade-offs and what it means for homes.
 * Company statements are labelled as company claims; dates and figures are sourced.
 */

export const MATURITY = ["Lab", "Pilot", "First commercial", "Scaling up", "Mainstream"] as const;

export interface Breakthrough {
  id: string;
  name: string;
  category: "Storage" | "Generation" | "Home" | "Grid";
  oneLiner: string;
  /** the everyday analogy that anchors the explanation */
  analogy: string;
  frames: { title: string; caption: string }[];
  breakthrough: { headline: string; body: string; facts: Fact[] };
  maturity: number; // index into MATURITY
  maturityNote: string;
  gains: string[];
  limits: string[];
  home: string;
  watch: string[];
  sources: SourceRef[];
  reviewed: string;
  color: string;
  tint: string;
}

export const BREAKTHROUGHS: Breakthrough[] = [
  {
    id: "sodium-ion",
    name: "Sodium-ion batteries",
    category: "Storage",
    oneLiner: "A battery that swaps lithium for sodium, the stuff in table salt.",
    analogy: "Two bookshelves with travellers shuttling between them.",
    frames: [
      { title: "A battery is two shelves", caption: "Charging pushes tiny charged travellers (ions) onto one shelf. Using the battery lets them drift back, and that flow powers your device." },
      { title: "Lithium is the usual traveller", caption: "Lithium ions are small and light, so they pack a lot of energy. But lithium has to be mined in a few places, and its price can swing." },
      { title: "Sodium is everywhere, but bigger", caption: "Sodium is abundant and cheap. The catch: its ions are larger, and they jam on the graphite shelves lithium batteries use." },
      { title: "The fix: a roomier shelf", caption: "A 'hard carbon' shelf has wider, messier gaps that sodium can slip into. Result: a cheap battery that also copes far better in the cold." },
    ],
    breakthrough: {
      headline: "Sodium-ion goes from lab to the car park",
      body: "Sodium-ion batteries have existed for years, but they stored too little energy to matter for cars. In 2025–26 the world's largest battery maker, CATL, launched its Naxtra sodium-ion cells for passenger EVs and for grid storage, putting sodium alongside the cheaper lithium chemistry (LFP) for the first time.",
      facts: [
        { text: "CATL says its Naxtra sodium-ion cell reaches 175 Wh/kg, the highest for sodium in mass production, and retains over 90% of capacity at −40 °C.", evidence: "company-claim", sources: [{ id: "newatlas-naxtra" }, { id: "eepower-naxtra" }] },
        { text: "The Changan Nevo A06 is reported as the first mass-production EV with sodium-ion batteries, due mid-2026.", evidence: "established", sources: [{ id: "newatlas-naxtra" }] },
        { text: "CATL expects to equip 10,000–20,000 vehicles with sodium-ion batteries in 2026, and has launched a sodium-ion grid storage system.", evidence: "company-claim", sources: [{ id: "electrive-catl-sodium-2026" }] },
      ],
    },
    maturity: 2,
    maturityNote: "First commercial products in 2026; volumes still small compared with lithium.",
    gains: ["Cheap, abundant raw material", "Much better in freezing weather", "Less exposure to lithium price swings"],
    limits: ["Stores less energy per kg than the best lithium cells", "Supply chain is young", "Most claims so far are from the manufacturer"],
    home: "Cheaper home batteries and entry-level EVs, especially in cold climates. Over time it could push down the price of storage bundles that suppliers offer.",
    watch: ["Independent test results on real cars", "Price per kWh versus LFP", "Home battery brands adopting sodium cells"],
    sources: [{ id: "newatlas-naxtra" }, { id: "eepower-naxtra" }, { id: "electrive-catl-sodium-2026" }],
    reviewed: "2026-11-12",
    color: "#2a8fd6",
    tint: "#dbeefc",
  },
  {
    id: "perovskite-tandem",
    name: "Perovskite-silicon tandem solar",
    category: "Generation",
    oneLiner: "A second, ultra-thin solar layer on top of silicon that catches light silicon wastes.",
    analogy: "Two nets in a stream, each built for a different size of fish.",
    frames: [
      { title: "Sunlight is a mix of colours", caption: "Light arrives as a spectrum, from high-energy blue to lower-energy red. A solar cell turns that energy into electricity." },
      { title: "Silicon is great at red, wasteful with blue", caption: "Standard silicon panels catch the red end well, but much of the extra energy in blue light is lost as heat." },
      { title: "Add a perovskite layer on top", caption: "Perovskite is a crystal that can be printed in a thin film. It catches the blue light first and lets the red pass through to the silicon below." },
      { title: "Two catchers beat one", caption: "Together, the stack converts more of each sunbeam into electricity, so more power from the same roof." },
    ],
    breakthrough: {
      headline: "Tandem cells pass a theoretical ceiling",
      body: "There's a physical limit to how efficient a single-layer cell can ever be. Tandem cells have been climbing for years, and certified lab records have now gone past that single-layer limit, which is why manufacturers are racing to make them durable enough for real roofs.",
      facts: [
        { text: "LONGi reported a 34.85% efficient perovskite-silicon tandem cell, certified by NREL. It was the first certified two-junction tandem above the 33.7% single-junction (Shockley-Queisser) limit.", evidence: "established", sources: [{ id: "pvmag-longi-3485" }] },
        { text: "In early 2020 the certified record was 29.15%: rapid progress in five years.", evidence: "established", sources: [{ id: "techxplore-hzb-tandem" }] },
        { text: "Researchers cite a realistic practical limit of around 35% for this tandem pairing.", evidence: "forecast", sources: [{ id: "techxplore-hzb-tandem" }] },
      ],
    },
    maturity: 1,
    maturityNote: "Lab records are certified; long-term outdoor durability and mass manufacturing are still being proven.",
    gains: ["More electricity from the same roof area", "Perovskite layers can be printed cheaply", "Builds on existing silicon factories"],
    limits: ["Perovskites can degrade with heat and moisture", "Record cells are tiny lab samples", "Bankability (25-year warranties) not yet proven"],
    home: "Smaller roofs could generate what only large roofs manage today, which matters for terraced houses and flats.",
    watch: ["Outdoor durability data over several years", "First warrantied tandem panels for homes", "Price premium per watt"],
    sources: [{ id: "pvmag-longi-3485" }, { id: "techxplore-hzb-tandem" }],
    reviewed: "2026-11-12",
    color: "#f2a20c",
    tint: "#fdf0cf",
  },
  {
    id: "iron-air",
    name: "Iron-air batteries",
    category: "Storage",
    oneLiner: "A battery that stores energy by rusting iron, then un-rusting it.",
    analogy: "A rusting nail, run forwards and backwards on purpose.",
    frames: [
      { title: "Rust releases energy", caption: "When iron rusts, it combines with oxygen from the air and gives off a little energy. Usually it's too slow and small to notice." },
      { title: "Discharge: breathe in, rust", caption: "The battery 'breathes in' air and turns its iron into rust in a controlled way, releasing electricity." },
      { title: "Charge: breathe out, un-rust", caption: "Feeding electricity back in turns the rust back into iron, and the battery 'breathes out' oxygen." },
      { title: "Slow, cheap, and very long", caption: "It's too heavy and slow for a car, but it's ideal for storing wind and solar for days rather than hours." },
    ],
    breakthrough: {
      headline: "Multi-day storage leaves the lab",
      body: "Most grid batteries cover a few hours. Long, still, cloudy spells need storage that lasts days. US start-up Form Energy has begun delivering iron-air batteries designed for around 100 hours of output, with projects in the US and Ireland.",
      facts: [
        { text: "Form Energy began deploying its first commercial iron-air batteries in late 2025, for Great River Energy's project in Minnesota.", evidence: "established", sources: [{ id: "latitude-form-first" }] },
        { text: "The technology works by reversible rusting: iron becomes rust on discharge and rust becomes iron on charge, with a water-based, non-flammable electrolyte.", evidence: "established", sources: [{ id: "powereng-form-gre" }] },
        { text: "A 10 MW / 1,000 MWh project is planned in Ireland with FuturEnergy Ireland.", evidence: "established", sources: [{ id: "esn-form-ireland" }] },
      ],
    },
    maturity: 2,
    maturityNote: "First commercial units deployed; performance at scale still being proven.",
    gains: ["Very cheap, abundant materials", "Non-flammable", "Stores energy for days, not hours"],
    limits: ["Heavy and bulky: grid only", "Lower round-trip efficiency than lithium", "First-of-a-kind manufacturing risk"],
    home: "You won't have one at home, but it could make windless winter weeks cheaper and more secure, which affects prices and the case for electrifying heat.",
    watch: ["Operating results from the first projects", "Real costs versus company targets", "European deployments"],
    sources: [{ id: "latitude-form-first" }, { id: "powereng-form-gre" }, { id: "esn-form-ireland" }],
    reviewed: "2026-11-12",
    color: "#ff6b4a",
    tint: "#ffe3db",
  },
  {
    id: "enhanced-geothermal",
    name: "Enhanced geothermal",
    category: "Generation",
    oneLiner: "Making your own underground hot spring anywhere the rock is hot enough.",
    analogy: "A kettle underground: pour cold water down, get hot water back.",
    frames: [
      { title: "The Earth is hot inside", caption: "A few kilometres down, rock is hot everywhere. Traditional geothermal only works where hot water naturally rises, which is rare." },
      { title: "Hot, but dry and tight", caption: "Most hot rock has no water and no cracks for water to flow through, so the heat is trapped." },
      { title: "Borrow tricks from oil and gas", caption: "Drill two wells, turn them sideways, and open fine cracks between them, creating a man-made reservoir." },
      { title: "A loop that runs 24/7", caption: "Pump cold water down one well, it heats up in the rock, and comes up the other to spin a turbine, day and night, in any weather." },
    ],
    breakthrough: {
      headline: "First utility-scale enhanced geothermal on the grid",
      body: "Enhanced geothermal has been tried for decades. In 2026 Fervo Energy's Cape Station in Utah became the first utility-scale enhanced geothermal project to export power to the grid, using horizontal drilling techniques from the shale industry.",
      facts: [
        { text: "Cape Station achieved first power in September 2026, the first utility-scale enhanced geothermal project to sync to the grid.", evidence: "established", sources: [{ id: "blackridge-fervo-first-power" }] },
        { text: "Fervo declared commercial operation of its first unit at Cape Station and says the rest of Phase I will be online by 1 January 2027.", evidence: "company-claim", sources: [{ id: "energyglobal-fervo-cod" }] },
        { text: "Phase I is 100 MW, made up of three 33 MW 'GeoBlocks'.", evidence: "established", sources: [{ id: "fortune-fervo" }] },
      ],
    },
    maturity: 2,
    maturityNote: "First commercial plant online; costs and repeatability will decide how far it spreads.",
    gains: ["Clean power around the clock, any weather", "Small land footprint", "Reuses oil and gas skills and rigs"],
    limits: ["Deep drilling is expensive", "Best sites need hot rock fairly near the surface", "Long-term reservoir performance still being learned"],
    home: "Firm, clean power reduces how much backup the grid needs, a quiet but real influence on long-term bills and on the carbon content of every kWh.",
    watch: ["Cost per MWh as more wells are drilled", "UK and European pilots", "How reservoirs perform over years"],
    sources: [{ id: "blackridge-fervo-first-power" }, { id: "energyglobal-fervo-cod" }, { id: "fortune-fervo" }],
    reviewed: "2026-11-12",
    color: "#e0832a",
    tint: "#fde9d2",
  },
  {
    id: "solid-state",
    name: "Solid-state batteries",
    category: "Storage",
    oneLiner: "A lithium battery that replaces the flammable liquid inside with a solid.",
    analogy: "Replacing a paddling pool between two shelves with a solid glass bridge.",
    frames: [
      { title: "Today: a liquid in the middle", caption: "In a normal lithium battery, ions swim through a liquid between the two shelves. The liquid is flammable." },
      { title: "Swap the liquid for a solid", caption: "A thin solid layer (ceramic or similar) lets ions through, but nothing can leak or catch fire as easily." },
      { title: "That unlocks a pure-lithium shelf", caption: "With a solid barrier, one shelf can be thin lithium metal, which packs far more energy into the same space." },
      { title: "The hard part: making millions", caption: "Solid layers can crack as the battery charges and discharges, and they're hard to manufacture at high yield." },
    ],
    breakthrough: {
      headline: "From lab promise to pilot lines",
      body: "Solid-state has been 'five years away' for a long time. What's changed is that carmakers and start-ups now have pilot production lines and sample cells in testing, with first cars targeted for 2027–28. Treat dates as forecasts.",
      facts: [
        { text: "Toyota, working with Idemitsu Kosan, says it will start producing commercial-grade solid-state cells in 2027 or 2028.", evidence: "forecast", sources: [{ id: "mobility-ssb-2030" }] },
        { text: "Toyota names durability (cracking between electrodes and the solid electrolyte) as the biggest challenge.", evidence: "company-claim", sources: [{ id: "mobility-ssb-2030" }] },
        { text: "VW-backed QuantumScape opened its 'Eagle Line' pilot production facility in San Jose.", evidence: "established", sources: [{ id: "dealerfloor-ssb-2027" }] },
      ],
    },
    maturity: 1,
    maturityNote: "Pilot production and sample testing; mass-market EVs are later this decade at the earliest.",
    gains: ["More energy in the same space (longer range)", "Safer: less flammable", "Potential for faster charging"],
    limits: ["Cracking and durability", "Manufacturing yield and cost", "First uses likely premium cars"],
    home: "Mostly a car story, but over time it could mean EVs with more spare battery to share with the home and grid.",
    watch: ["Cars actually on sale (not concepts)", "Cost premium versus LFP and sodium", "Independent durability results"],
    sources: [{ id: "mobility-ssb-2030" }, { id: "dealerfloor-ssb-2027" }],
    reviewed: "2026-11-12",
    color: "#8f5be0",
    tint: "#ece3fb",
  },
  {
    id: "vehicle-to-grid",
    name: "Vehicle-to-grid (V2G)",
    category: "Home",
    oneLiner: "Your car's battery helps power the grid when it's parked, and you get paid in cheap or free miles.",
    analogy: "Renting out a spare room you're not using, but for energy.",
    frames: [
      { title: "A big battery on wheels", caption: "An EV carries far more battery than it uses on a typical day, and it's parked most of the time." },
      { title: "Fill up when power is cheap", caption: "Overnight, when demand is low and wind is often strong, the car charges cheaply." },
      { title: "Give a little back at peak", caption: "In the early evening rush, a two-way charger sends some energy back to the home or grid." },
      { title: "You set the rules", caption: "You choose how much charge you need by morning. The supplier's software does the rest, and shares the value with you." },
    ],
    breakthrough: {
      headline: "Two-way charging becomes a product you can buy",
      body: "V2G has been trialled for years. The shift is that it's now packaged as consumer products in the UK, with a car, a bidirectional charger and a tariff sold together.",
      facts: [
        { text: "Octopus Energy launched Octopus Power Pack in 2024, which it describes as the UK's first vehicle-to-grid tariff, offering free EV charging in exchange for exporting at peak.", evidence: "company-claim", sources: [{ id: "octopus-power-pack" }] },
        { text: "In June 2025 Octopus and BYD launched a 'Power Pack Bundle': a leased V2G-capable BYD Dolphin, a bidirectional charger and a smart tariff.", evidence: "established", sources: [{ id: "electrive-octopus-byd" }] },
        { text: "Octopus says a typical V2G driver could save £620 a year compared with its standard Flexible tariff.", evidence: "company-claim", sources: [{ id: "octopus-power-pack" }] },
      ],
    },
    maturity: 2,
    maturityNote: "Commercial in the UK, but limited to specific cars, chargers and tariffs.",
    gains: ["Uses batteries that already exist", "Cheaper or free driving for customers", "Helps the grid at peak times"],
    limits: ["Few compatible cars and chargers so far", "Bidirectional chargers cost more", "Customers worry about battery wear and having enough charge"],
    home: "A direct product opportunity for energy suppliers: a car, charger and tariff bundle where trust, control and simplicity decide who wins.",
    watch: ["More car models supporting V2G", "Charger prices", "Customer research on comfort with automated discharge"],
    sources: [{ id: "octopus-power-pack" }, { id: "electrive-octopus-byd" }],
    reviewed: "2026-11-12",
    color: "#2fa560",
    tint: "#dcf4e4",
  },
  {
    id: "heat-pumps",
    name: "Heat pumps",
    category: "Home",
    oneLiner: "A fridge run in reverse: it moves heat from outside into your home instead of making it.",
    analogy: "A sponge that soaks up warmth outside and wrings it out indoors.",
    frames: [
      { title: "Your fridge moves heat", caption: "A fridge doesn't make cold. It pumps heat out of the box and releases it at the back. Feel the warm grille." },
      { title: "Run it the other way", caption: "A heat pump pulls heat from outside air, even on cold days, because there's still heat energy in air well below freezing." },
      { title: "Squeeze to get hotter", caption: "A compressor squeezes a special fluid (refrigerant). Squeezing makes it hotter, hot enough to warm radiators and water." },
      { title: "Move, don't make", caption: "Because it moves heat rather than burning fuel, one unit of electricity can deliver several units of heat (around 3 is a common rule of thumb)." },
    ],
    breakthrough: {
      headline: "Not one breakthrough, but a tipping point",
      body: "Heat pumps are proven technology. What's changing is everything around them: better installation practice, smart tariffs that make running costs predictable, and integration with batteries and HEMS so they can pre-heat when power is cheap. Explore that in World 8.",
      facts: [{ text: "Efficiency (the 'coefficient of performance') varies with outdoor temperature, flow temperature and installation quality. '3 units of heat per unit of electricity' is a rule of thumb, not a guarantee.", evidence: "illustrative" }],
    },
    maturity: 4,
    maturityNote: "Mature technology; UK adoption is the challenge, not invention.",
    gains: ["Several units of heat per unit of electricity", "No gas or flue needed", "Can also cool in summer"],
    limits: ["Higher upfront cost than a boiler", "Performance depends on good design and install", "Some homes need bigger radiators or insulation"],
    home: "Central to the future home: running costs, comfort, installer quality and smart control are where customer experience is won or lost.",
    watch: ["Install quality and aftercare models", "Heat pump tariffs", "Pairing with batteries and HEMS"],
    sources: [],
    reviewed: "2026-11-12",
    color: "#12a08a",
    tint: "#d4f2ec",
  },
];

export function getBreakthrough(id: string) {
  return BREAKTHROUGHS.find((b) => b.id === id);
}
