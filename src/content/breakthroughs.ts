import type { Fact, SourceRef } from "./types";

/**
 * Breakthrough Breakdown
 * Each technology is explained in four illustrated frames (how it works → what changed),
 * followed by the breakthrough itself, its maturity, trade-offs and what it means for homes.
 * Company statements are labelled as company claims; dates and figures are sourced.
 */

export const MATURITY = ["Lab", "Pilot", "First commercial", "Scaling up", "Mainstream"] as const;

export interface Frame {
  title: string;
  caption: string;
  simpler: string;
  takeaway: string;
  /** jargon used in this step, explained */
  terms?: { term: string; meaning: string }[];
}

export interface Breakthrough {
  id: string;
  name: string;
  category: "Storage" | "Generation" | "Home" | "Grid";
  oneLiner: string;
  /** the everyday analogy that anchors the explanation */
  analogy: string;
  /**
   * Steps written for a complete newcomer. The learner taps "Got it" to move on,
   * or "Not yet" to see `simpler` (the same idea from a different, everyday angle).
   * `takeaway` is the one sentence to hold onto.
   */
  frames: Frame[];
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
    analogy: "Two car parks, with tiny 'cars' driving between them.",
    frames: [
      {
        title: "A battery saves electricity for later",
        caption: "Plug it in and it fills up with energy. Unplug it, and that energy comes back out to run your phone, car or home.",
        simpler: "It's like filling a water bottle at the tap so you can drink later, away from the tap. Charging is filling the bottle; using the battery is drinking from it.",
        takeaway: "A battery is a store: fill it now, use it later.",
      },
      {
        title: "Inside, tiny 'cars' drive between two car parks",
        caption: "A battery has two sides. Charging drives millions of tiny particles into the car park on one side. When you use the battery, they drive back across, and that stream of traffic is the electricity.",
        simpler: "Picture a hill. Charging carries balls up to the top. Using the battery lets them roll back down, and the rolling is what powers your device. No balls moving, no power.",
        takeaway: "Electricity comes out when the tiny particles travel from one side to the other.",
        terms: [{ term: "Ion", meaning: "The tiny particle doing the travelling. In this picture, each ion is a car." }],
      },
      {
        title: "Most batteries today use lithium 'cars'",
        caption: "The phone in your pocket and most electric cars use lithium. Lithium cars are small and nimble, so lots of them fit in a small space. But lithium is mined in only a few countries, so it's costly and its price jumps around.",
        simpler: "Lithium is a premium ingredient. It works brilliantly, but only a handful of places supply it, so you pay more and can't be sure what it will cost next year.",
        takeaway: "Lithium works well, but it's pricey and comes from only a few places.",
      },
      {
        title: "Sodium is cheap, but its 'cars' are vans",
        caption: "Sodium is in ordinary table salt and seawater, so there's a lot of it everywhere. The catch: sodium particles are bigger. They're vans, and they don't fit the narrow parking spaces built for lithium.",
        simpler: "Try parking a van in a space built for a Mini. It doesn't go in, however cheap the van was. That's why nobody could just swap lithium for sodium.",
        takeaway: "Sodium is cheap and plentiful, but too big for a normal battery's parking spaces.",
        terms: [{ term: "Sodium", meaning: "The 'sodium' in sodium chloride, which is table salt." }],
      },
      {
        title: "The breakthrough: a car park with bigger spaces",
        caption: "Engineers built one side of the battery from a material with wider, roomier spaces (called hard carbon). Now the sodium vans park easily. The result is a cheaper battery that also works much better in freezing weather.",
        simpler: "Nothing magic changed. They redesigned the car park so the vans fit. Same idea as any battery, made with a cheaper, more common ingredient.",
        takeaway: "Bigger parking spaces let cheap sodium do lithium's job.",
        terms: [{ term: "Hard carbon", meaning: "A carbon material, a bit like charcoal, with uneven, roomy gaps for the vans to park in." }],
      },
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
      { title: "Sunlight is a mix of colours", caption: "Light arrives as a spectrum, from high-energy blue to lower-energy red. A solar cell turns that energy into electricity.", simpler: "Think of a rainbow: sunlight already contains all those colours mixed together. Some colours carry more punch than others.", takeaway: "Sunlight is many colours, and each carries a different amount of energy." },
      { title: "Silicon is great at red, wasteful with blue", caption: "Standard silicon panels catch the red end well, but much of the extra energy in blue light is lost as heat.", simpler: "Imagine a net built for medium-sized fish. Big fish get caught, but you only keep part of them; the rest is wasted. Blue light is the big fish for silicon.", takeaway: "Normal panels waste a chunk of the energy in blue light." },
      { title: "Add a perovskite layer on top", caption: "Perovskite is a crystal that can be printed in a thin film. It catches the blue light first and lets the red pass through to the silicon below.", simpler: "Put a second net in front of the first, designed for the big fish. It catches them properly and lets the smaller ones swim through to the net behind.", takeaway: "A thin top layer catches the blue light; silicon still catches the red." },
      { title: "Two catchers beat one", caption: "Together, the stack converts more of each sunbeam into electricity, so more power from the same roof.", simpler: "Two specialist nets catch more than one all-purpose net, so the same roof makes more electricity.", takeaway: "Two layers turn more of the sunlight into power than one." },
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
      { title: "Rust releases energy", caption: "When iron rusts, it combines with oxygen from the air and gives off a little energy. Usually it's too slow and small to notice.", simpler: "Hand warmers you shake in winter work this way: iron powder rusting inside them gives off heat.", takeaway: "Rusting iron gives off a little energy." },
      { title: "Discharge: breathe in, rust", caption: "The battery 'breathes in' air and turns its iron into rust in a controlled way, releasing electricity.", simpler: "Like the hand warmer, but controlled: instead of heat, the battery collects the energy as electricity while its iron slowly rusts.", takeaway: "Using the battery = letting its iron rust on purpose." },
      { title: "Charge: breathe out, un-rust", caption: "Feeding electricity back in turns the rust back into iron, and the battery 'breathes out' oxygen.", simpler: "Run the film backwards: push electricity in and the rust turns back into shiny iron, ready to rust again.", takeaway: "Charging the battery = turning the rust back into iron." },
      { title: "Slow, cheap, and very long", caption: "It's too heavy and slow for a car, but it's ideal for storing wind and solar for days rather than hours.", simpler: "Think of a slow cooker rather than a microwave: no good for quick bursts, but it keeps going for days, and iron is about as cheap as materials get.", takeaway: "Too heavy for cars, but cheap storage that lasts for days." },
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
      { title: "The Earth is hot inside", caption: "A few kilometres down, rock is hot everywhere. Traditional geothermal only works where hot water naturally rises, which is rare.", simpler: "Dig deep enough anywhere and it gets hot, like the middle of a baked potato. Hot springs are the rare spots where that heat leaks out by itself.", takeaway: "There's heat under our feet everywhere; we just can't usually reach it." },
      { title: "Hot, but dry and tight", caption: "Most hot rock has no water and no cracks for water to flow through, so the heat is trapped.", simpler: "It's a hot potato with no holes in it: the heat is there, but there's no way for water to get in, warm up and carry it out.", takeaway: "The rock is hot, but water can't flow through it to collect the heat." },
      { title: "Borrow tricks from oil and gas", caption: "Drill two wells, turn them sideways, and open fine cracks between them, creating a man-made reservoir.", simpler: "The oil industry already knows how to drill sideways and crack rock open. Geothermal companies reuse those exact skills to make paths through the hot rock.", takeaway: "Drilling methods from oil and gas create paths for water through hot rock." },
      { title: "A loop that runs 24/7", caption: "Pump cold water down one well, it heats up in the rock, and comes up the other to spin a turbine, day and night, in any weather.", simpler: "It's like a kettle hidden underground: cold water goes in one pipe, hot water comes up the other, and the steam drives a generator. The sun and wind don't matter.", takeaway: "Water loops down, heats up, comes back and makes power all day and night." },
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
    analogy: "Swapping the liquid road between two car parks for a solid bridge.",
    frames: [
      { title: "Today: a liquid in the middle", caption: "In a normal lithium battery, the tiny particles travel through a liquid between the two sides. The liquid is flammable.", simpler: "Remember the two car parks? In today's batteries the road between them is a liquid, and that liquid can burn if the battery is damaged.", takeaway: "Normal batteries have a flammable liquid inside." },
      { title: "Swap the liquid for a solid", caption: "A thin solid layer (ceramic or similar) lets ions through, but nothing can leak or catch fire as easily.", simpler: "Replace the liquid road with a solid bridge. The 'cars' can still cross, but there's nothing to spill or catch fire.", takeaway: "A solid layer replaces the liquid, making the battery safer." },
      { title: "That unlocks a pure-lithium side", caption: "With a solid barrier, one side can be thin lithium metal, which packs far more energy into the same space.", simpler: "With a solid bridge, one car park can be made of pure lithium, which squeezes far more 'cars' into the same space. More cars, more energy, smaller battery.", takeaway: "Solid batteries could hold much more energy in the same size." },
      { title: "The hard part: making millions", caption: "Solid layers can crack as the battery charges and discharges, and they're hard to manufacture at high yield.", simpler: "Making one perfect solid layer in a lab is easy-ish. Making millions without tiny cracks, cheaply, is the real challenge.", takeaway: "The idea works; making them cheaply at huge scale is the hurdle." },
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
      { title: "A big battery on wheels", caption: "An EV carries far more battery than it uses on a typical day, and it's parked most of the time.", simpler: "Most cars spend most of the day parked. A full electric-car battery holds enough to run a typical home for a day or more, and it's just sitting there.", takeaway: "An EV is a big battery that's parked most of the time." },
      { title: "Fill up when power is cheap", caption: "Overnight, when demand is low and wind is often strong, the car charges cheaply.", simpler: "Like doing the washing on cheap off-peak electricity, but the car does it automatically while you sleep.", takeaway: "Charge the car overnight, when electricity is cheapest." },
      { title: "Give a little back at peak", caption: "In the early evening rush, a two-way charger sends some energy back to the home or grid.", simpler: "Around 5 to 7pm everyone cooks and switches on lights, so electricity is in high demand. Your car can lend some back, like a neighbour lending sugar.", takeaway: "At busy times, the car sends some power back to your home or the grid." },
      { title: "You set the rules", caption: "You choose how much charge you need by morning. The supplier's software does the rest, and shares the value with you.", simpler: "You tell the app 'I need 80% by 7am'. The software only borrows what's left over, so you're never stranded, and you get paid or credited for it.", takeaway: "You stay in control; the car only shares spare charge, and you're rewarded for it." },
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
      { title: "Your fridge moves heat", caption: "A fridge doesn't make cold. It pumps heat out of the box and releases it at the back. Feel the warm grille.", simpler: "Put your hand by the back of a fridge: it's warm. That's the heat taken out of your food.", takeaway: "A fridge carries heat out of the box; it doesn't create cold." },
      { title: "Run it the other way", caption: "A heat pump pulls heat from outside air, even on cold days, because there's still heat energy in air well below freezing.", simpler: "Even a freezing day still has heat in the air (it's far warmer than the coldest possible temperature). A heat pump scoops that heat up and carries it indoors.", takeaway: "A heat pump carries heat from outside air into your home." },
      { title: "Squeeze to get hotter", caption: "A compressor squeezes a special fluid (refrigerant). Squeezing makes it hotter, hot enough to warm radiators and water.", simpler: "Pump up a bike tyre and feel the pump get warm. Squeezing a gas heats it up. A heat pump does this to a special fluid to make it hot enough for radiators.", takeaway: "Squeezing the fluid turns a little gathered heat into useful hot heat." },
      { title: "Move, don't make", caption: "Because it moves heat rather than burning fuel, one unit of electricity can deliver several units of heat (around 3 is a common rule of thumb).", simpler: "Carrying heat is cheaper than making it. Like using a bucket to move water rather than making water from scratch.", takeaway: "Moving heat takes far less energy than making it, so bills can fall." },
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
