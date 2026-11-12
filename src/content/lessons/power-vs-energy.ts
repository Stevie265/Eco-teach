import type { Lesson } from "../types";

export const powerVsEnergy: Lesson = {
  id: "power-vs-energy",
  worldId: "energy-system",
  title: "Power vs energy: kW and kWh",
  subtitle: "The single most useful distinction in the whole industry",
  minutes: 12,
  level: "foundation",
  reviewed: "2026-11-12",
  sources: [{ id: "ofgem-tdcv" }, { id: "energyuk-tdcv-2026" }, { id: "ofgem-price-cap" }, { id: "eia-bills-2024" }],
  steps: [
    {
      type: "hook",
      title: "The kettle and the fridge",
      body: [
        "A kettle is one of the most power-hungry things in your home. Your fridge is one of the gentlest. Yet over a year, the fridge can easily use **more electricity** than the kettle.",
        "How can both be true? The answer is the difference between **power** and **energy**, or **kW** and **kWh**. Once you have it, battery specs, heat pump quotes, EV chargers and grid headlines all start to make sense.",
      ],
    },
    {
      type: "explain",
      title: "Rate vs amount",
      body: [
        "**Power** is a *rate*: how fast energy is being used or produced at a given moment. It's measured in **watts (W)** and **kilowatts (kW)**, where 1 kW = 1,000 W.",
        "**Energy** is an *amount*: how much has been used or produced over time. Electricity energy is usually measured in **kilowatt-hours (kWh)**. One kWh is what you use running something at 1 kW for one hour.",
        "The water analogy: **power is how fast the tap is running** (litres per minute) and **energy is how much water ends up in the bath** (litres). A tap on full for one minute can fill less of the bath than a trickle left running all night.",
        "So: **energy (kWh) = power (kW) × time (hours)**. A 3 kW kettle running for 3 minutes (0.05 hours) uses 3 × 0.05 = 0.15 kWh. A fridge drawing an average of 0.1 kW for 24 hours uses 2.4 kWh a day.",
      ],
      terms: [
        { term: "kW (kilowatt)", definition: "A unit of power, a rate. 1,000 watts. Think 'how hard is it working right now?'" },
        { term: "kWh (kilowatt-hour)", definition: "A unit of energy, an amount. It's what your bill charges you for: 'how much work was done in total?'" },
        { term: "MW / GW", definition: "Megawatts (1,000 kW) and gigawatts (1,000 MW). Power station and grid-scale units." },
      ],
    },
    {
      type: "visual",
      title: "Run your own home",
      intro: "Pick appliances and set how long they run each day. Watch how power (the spike) and energy (the total) tell different stories.",
      component: "ApplianceCalculator",
      caption: "Appliance power ratings are typical, illustrative values. Real models vary, so check the label. Set the unit price to match your own tariff.",
    },
    {
      type: "example",
      title: "Where kW and kWh show up in real life",
      body: [
        "**Your bill** charges mainly for **energy** (pence per kWh) plus a daily standing charge. Ofgem's 'typical' British household uses **2,700 kWh** of electricity a year (and 11,500 kWh of gas). These are the Typical Domestic Consumption Values used to work out the price cap. Ofgem has consulted on lowering them to 2,500 kWh and 9,500 kWh.",
        "**A home battery** has *two* numbers: power (e.g. 5 kW, how much it can supply at once) and capacity (e.g. 13.5 kWh, how much it can store). A big capacity with low power can run the fridge all evening but can't boil the kettle and run the oven at the same time.",
        "**The grid** worries about **power at peak**: the highest kW demand at any moment, usually on winter weekday evenings. Networks and power stations have to be sized for that peak, even if it only lasts an hour.",
        "**UK vs US:** the average US residential customer used about **865 kWh a month** in 2024 (around 10,400 kWh a year), close to four times the British 'typical' figure. Air conditioning, electric heating and bigger homes explain much of the gap.",
      ],
      facts: [
        { text: "Ofgem's medium Typical Domestic Consumption Values are 2,700 kWh/year electricity and 11,500 kWh/year gas.", evidence: "established", sources: [{ id: "ofgem-tdcv" }] },
        { text: "Ofgem has proposed revising the medium values to 2,500 kWh electricity and 9,500 kWh gas.", evidence: "established", sources: [{ id: "energyuk-tdcv-2026" }] },
        { text: "US residential customers used on average 865 kWh per month in 2024.", evidence: "established", sources: [{ id: "eia-bills-2024" }] },
      ],
    },
    {
      type: "interact",
      title: "Power or energy?",
      interaction: {
        kind: "sort",
        instructions: "Is each statement about power (a rate, kW) or energy (an amount, kWh)? Tap an item, then a bucket.",
        buckets: [
          { id: "power", label: "Power (kW)", hint: "How fast, right now" },
          { id: "energy", label: "Energy (kWh)", hint: "How much, in total" },
        ],
        items: [
          { id: "charger", label: "'This EV charger is 7 kW'", bucket: "power", why: "It describes the maximum rate of charging." },
          { id: "bill", label: "'You used 230 units this month'", bucket: "energy", why: "A 'unit' on a UK bill is 1 kWh, an amount over the month." },
          { id: "battery", label: "'This battery stores 10 kWh'", bucket: "energy", why: "Storage capacity is an amount of energy." },
          { id: "peak", label: "'GB demand peaked on Tuesday evening'", bucket: "power", why: "Peak demand is the highest instantaneous rate, measured in GW." },
          { id: "solar", label: "'Our panels made 3,400 kWh last year'", bucket: "energy", why: "Generation over a year is an amount." },
          { id: "shower", label: "'Electric showers are often 8–10 kW'", bucket: "power", why: "That's the rate it draws while it's on, which is why showers need a dedicated circuit." },
        ],
      },
    },
    {
      type: "check",
      title: "Knowledge check",
      questions: [
        {
          id: "pve-q1",
          prompt: "A 2 kW heater runs for 3 hours. How much energy does it use?",
          options: [
            { id: "a", text: "0.67 kWh" },
            { id: "b", text: "5 kWh" },
            { id: "c", text: "6 kWh" },
            { id: "d", text: "6 kW" },
          ],
          correct: "c",
          explanation: "Energy = power × time = 2 kW × 3 h = 6 kWh. Note the unit: kWh, not kW.",
          simpler: "If the heater uses 2 'units' every hour, and it runs for 3 hours, that's 2 + 2 + 2 = 6 units. A UK 'unit' is exactly 1 kWh.",
        },
        {
          id: "pve-q2",
          prompt: "Your electricity bill mainly charges you for…",
          options: [
            { id: "a", text: "Power (kW)" },
            { id: "b", text: "Energy (kWh), plus a daily standing charge" },
            { id: "c", text: "Voltage (V)" },
            { id: "d", text: "Frequency (Hz)" },
          ],
          correct: "b",
          explanation: "Domestic bills in Britain are based on kWh used plus a fixed daily standing charge. Some business (and some US) tariffs also charge for peak kW demand.",
          simpler: "A bill is like a water bill: it charges for how much water went down the drain, not how fast the tap ran.",
        },
        {
          id: "pve-q3",
          prompt: "Why does the grid care so much about peak power, not just total energy?",
          options: [
            { id: "a", text: "Because bills are based on peak power" },
            { id: "b", text: "Because wires, substations and power stations must be big enough for the highest moment of demand" },
            { id: "c", text: "Because energy can't be measured" },
            { id: "d", text: "It doesn't. Only total energy matters" },
          ],
          correct: "b",
          explanation: "Infrastructure is sized for the peak. Shaving the peak (shifting demand to other times) can avoid expensive network upgrades. That's the economic heart of 'flexibility'.",
          simpler: "A motorway has to be wide enough for rush hour, even if it's empty at 3am. The grid is the same: it's built for the busiest moment.",
        },
      ],
    },
    {
      type: "apply",
      title: "Why this matters at work",
      body: [
        "Many product conversations quietly mix up power and energy. 'This battery can power your home' raises the question: for how long (kWh), and with which appliances at once (kW)?",
        "Electrifying homes (heat pumps, EVs, induction hobs) **adds both energy and power**. The energy is mostly a customer bill question. The extra **peak power** is a network question, which is why smart charging and flexibility matter so much to suppliers and network operators.",
      ],
      prompt: "Pick a home energy product (battery, EV charger, heat pump). Write one sentence that describes it correctly using both a kW and a kWh number.",
    },
    {
      type: "recap",
      title: "Three things to remember",
      points: [
        "Power (kW) is a rate, how fast. Energy (kWh) is an amount, how much. Energy = power × time.",
        "Bills charge mostly for energy (kWh). The grid is built for peak power (kW).",
        "A 'typical' British home uses about 2,700 kWh of electricity a year. A typical US home uses roughly four times that.",
      ],
      next: "Next: why supply and demand must match every single second, and what happened when they didn't on 9 August 2019.",
    },
  ],
};
