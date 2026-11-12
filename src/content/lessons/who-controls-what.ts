import type { Lesson } from "../types";

export const whoControlsWhat: Lesson = {
  id: "who-controls-what",
  worldId: "future-home",
  title: "HEMS, DERMS, DRMS, VPPs: who controls what?",
  subtitle: "Four acronyms, one connected system, explained from the ground up",
  minutes: 14,
  level: "intermediate",
  reviewed: "2026-11-12",
  sources: [{ id: "neso-dfs-review-2023" }, { id: "neso-dfs-news-2023" }, { id: "carbonbrief-dfs" }],
  steps: [
    {
      type: "hook",
      title: "1.6 million homes, one request",
      body: [
        "In winter 2022/23, Britain's system operator asked something new of ordinary households: **use less electricity for an hour at peak time, and get paid for it**. Over **1.6 million** households and businesses took part through 31 providers, across 22 events.",
        "Behind that simple ask sits a stack of systems with confusing acronyms: **HEMS, DRMS, VPP, DERMS**. People in the industry often use them loosely. By the end of this lesson you'll be able to explain each one, and which one is in control when.",
      ],
      fact: {
        text: "Over 1.6 million households and businesses participated in the Demand Flexibility Service in winter 2022/23, across 31 providers and 22 events.",
        evidence: "established",
        sources: [{ id: "neso-dfs-review-2023" }],
      },
    },
    {
      type: "explain",
      title: "Build it up one layer at a time",
      body: [
        "**Start with the devices.** Solar panels, home batteries, EV chargers, heat pumps and smart hot-water tanks are all **distributed energy resources (DERs)**. Each one can produce, store or shift electricity, but on its own each is tiny: a few kW.",
        "**Layer 1: the home. HEMS (Home Energy Management System)** is software, sometimes with a hub, that coordinates the DERs *inside one home*. It decides when to charge the car, heat the water or store solar, usually to cut the customer's bill or carbon. *Its loyalty is to the household.*",
        "**Layer 2: the programme. DRMS (Demand Response Management System)** is a platform a supplier or utility uses to run **demand response programmes**: enrolling customers, sending 'please reduce use 5–6pm' events, and measuring and rewarding the result. *It's about changing behaviour or load at specific times.*",
        "**Layer 3: the portfolio. VPP (Virtual Power Plant)** aggregates thousands of DERs so that together they **act like one power station**: they can be dispatched, forecast and **sold into energy and balancing markets**. Many small batteries become, say, 50 MW of flexible capacity. *It's about earning money from many devices acting as one.*",
        "**Layer 4: the network. DERMS (Distributed Energy Resource Management System)** is used mainly by **network operators** to see and manage DERs on the local distribution network, keeping voltages and cables within safe limits. For example, it might limit solar export on a congested street. *Its loyalty is to the physical network.*",
      ],
      terms: [
        { term: "DER", definition: "Distributed energy resource: a small generator, storage device or flexible load near where energy is used." },
        { term: "Aggregator", definition: "A company that bundles many small DERs or flexible customers and sells their combined flexibility." },
        { term: "Flexibility", definition: "The ability to shift when electricity is used or produced, in response to a price or signal." },
        { term: "DSO", definition: "Distribution System Operator: the evolving role of local network companies as they actively manage DERs rather than just maintaining wires." },
      ],
    },
    {
      type: "visual",
      title: "The control stack",
      intro: "Tap each layer to see who typically runs it, what it optimises for, and how fast it acts.",
      component: "ControlStack",
      caption: "The boundaries are blurry in practice. Vendors often market one product as several of these, and the same company can operate more than one layer.",
    },
    {
      type: "example",
      title: "The Demand Flexibility Service",
      body: [
        "Britain's **Demand Flexibility Service (DFS)** was introduced by the system operator for winter 2022/23 as a contingency tool for tight evenings. Suppliers and aggregators (the 31 'providers') signed customers up, sent them event notifications and paid them for measured reductions against their normal usage, using smart meter data.",
        "That is, in effect, a **national demand response programme**: the system operator bought flexibility, and providers used their own DRMS-style platforms to deliver it. Across the winter it delivered around **3,300 MWh** of demand reduction. Some households acted manually, by turning things off, while others had devices (batteries, EVs) shifted automatically by their provider: the VPP and HEMS end of the spectrum.",
        "The system operator also commissioned independent research into *who* took part and how. A design question worth holding onto: a household with a battery or EV can shift load without changing its routine, while one without has to change its behaviour. That matters for **fairness** and for **product design**.",
      ],
      facts: [
        { text: "DFS delivered over 3,300 MWh of demand reduction across winter 2022/23.", evidence: "established", sources: [{ id: "neso-dfs-news-2023" }] },
        { text: "Providers (suppliers and aggregators) recruited and rewarded customers; the system operator procured the flexibility.", evidence: "established", sources: [{ id: "neso-dfs-review-2023" }, { id: "carbonbrief-dfs" }] },
      ],
    },
    {
      type: "interact",
      title: "Which system is acting?",
      interaction: {
        kind: "sort",
        instructions: "For each situation, choose the system most likely to be making the decision. Tap a situation, then a system.",
        buckets: [
          { id: "hems", label: "HEMS", hint: "Inside one home" },
          { id: "drms", label: "DRMS", hint: "Running a programme" },
          { id: "vpp", label: "VPP", hint: "Selling aggregated flexibility" },
          { id: "derms", label: "DERMS", hint: "Protecting the local network" },
        ],
        items: [
          { id: "preheat", label: "A heat pump pre-warms the house at 2pm to avoid the 4–7pm peak tariff", bucket: "hems", why: "It's optimising one household's bill, a classic HEMS job." },
          { id: "street", label: "A network operator caps solar export on a congested street at midday", bucket: "derms", why: "It's protecting physical network limits." },
          { id: "event", label: "A supplier texts 80,000 customers: 'cut use 5–6pm tomorrow and earn rewards'", bucket: "drms", why: "Enrolling, notifying and rewarding is a demand response programme." },
          { id: "bid", label: "20 MW of home batteries are offered into a balancing market as one unit", bucket: "vpp", why: "Aggregating devices to act and trade like a power plant is the VPP role." },
          { id: "solarcar", label: "A car charges from rooftop solar instead of exporting it", bucket: "hems", why: "Self-consumption decisions inside the home are HEMS." },
          { id: "verify", label: "After an event, each customer's reduction is calculated against their baseline and they're paid", bucket: "drms", why: "Measurement and settlement are core DRMS functions." },
        ],
      },
    },
    {
      type: "check",
      title: "Knowledge check",
      questions: [
        {
          id: "wcw-q1",
          prompt: "What best distinguishes a VPP from a HEMS?",
          options: [
            { id: "a", text: "A VPP is hardware and a HEMS is software" },
            { id: "b", text: "A HEMS optimises one home; a VPP aggregates many homes' devices to act and trade like one power plant" },
            { id: "c", text: "They're the same thing" },
            { id: "d", text: "A VPP only works with solar panels" },
          ],
          correct: "b",
          explanation: "Scale and purpose. HEMS serves the household; a VPP pools many DERs to sell flexibility into markets.",
          simpler: "A HEMS is like a personal trainer for one person. A VPP is like a choir: lots of individual voices singing together so they sound like one big instrument.",
        },
        {
          id: "wcw-q2",
          prompt: "Who is the most typical user of a DERMS?",
          options: [
            { id: "a", text: "A homeowner" },
            { id: "b", text: "A distribution network operator managing local network limits" },
            { id: "c", text: "An EV manufacturer" },
            { id: "d", text: "A price comparison website" },
          ],
          correct: "b",
          explanation: "DERMS is primarily a network operator tool for visibility and control of DERs on the distribution network.",
          simpler: "DERMS is the traffic control centre for the local streets of the grid. Its job is to stop jams on the cables, not to save any one household money.",
        },
        {
          id: "wcw-q3",
          prompt: "Why might the household, the VPP and the network want different things at the same moment?",
          options: [
            { id: "a", text: "They never conflict" },
            { id: "b", text: "Each optimises for something different (bill, market revenue, network safety), so the best action for one may not suit another" },
            { id: "c", text: "Because regulation forbids cooperation" },
            { id: "d", text: "Because batteries can only do one thing per day" },
          ],
          correct: "b",
          explanation: "A battery might save the household most by discharging at 6pm, earn the VPP most by holding charge for a balancing call, and help the network most by charging at midday. Coordinating these is a live industry challenge.",
          simpler: "Three people share one car. One wants to go shopping, one wants to rent it out, one wants it parked to keep the road clear. Someone has to decide, and the rules for deciding matter.",
        },
      ],
    },
    {
      type: "apply",
      title: "Why this matters at work",
      body: [
        "For an energy supplier, the question shifts from 'how many kWh can we sell?' to **'which layers do we play in, and who owns the customer relationship?'** A supplier could offer a HEMS app, run DRMS-style programmes, operate a VPP, or partner with others for some layers.",
        "The customer experience question is just as big. People need to **understand, trust and stay in control**: override buttons, clear rewards, and assurance that the house stays warm and the car is charged when they need it.",
      ],
      prompt: "Which layer of the stack do you think creates the most customer value, and which creates the most commercial value? Are they the same?",
    },
    {
      type: "recap",
      title: "Three things to remember",
      points: [
        "HEMS serves one home. DRMS runs demand response programmes. VPPs aggregate many DERs to act and trade like a power plant. DERMS helps network operators protect local network limits.",
        "Each layer optimises for something different, so coordination (and who decides) is a core industry challenge.",
        "Britain's Demand Flexibility Service showed household flexibility at scale: 1.6m+ participants in winter 2022/23.",
      ],
      next: "Try the Ripple Explorer: follow 'cheaper batteries' through to new home energy propositions.",
    },
  ],
};
