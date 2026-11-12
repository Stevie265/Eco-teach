import type { Lesson } from "../types";

export const builtBigGoingSmall: Lesson = {
  id: "built-big-going-small",
  worldId: "history",
  title: "The grid: built big, now going small",
  subtitle: "How Britain built a centralised grid, and why it is now becoming distributed",
  minutes: 12,
  level: "foundation",
  reviewed: "2026-11-12",
  sources: [{ id: "smg-ceb" }, { id: "wiki-national-grid-gb" }, { id: "eia-electricity" }],
  steps: [
    {
      type: "hook",
      title: "A patchwork of plugs",
      body: [
        "In the early 1920s, electricity in Britain was a patchwork. Hundreds of separate local companies and councils ran their own small power stations, often at **different voltages and frequencies**. An appliance that worked in one town might not work in the next.",
        "A century later we're heading somewhere new: millions of small generators on rooftops, batteries in garages, and cars that can push power back. How did we get from patchwork, to one giant machine, to something in between?",
      ],
    },
    {
      type: "explain",
      title: "Three eras of the grid",
      body: [
        "**1. Local (1880s–1920s).** Electricity was generated close to where it was used. It was simple but inefficient, because every small station needed spare capacity and couldn't share with its neighbours.",
        "**2. Centralised (1926–2000s).** The Electricity (Supply) Act 1926 created the **Central Electricity Board**, which built a national high-voltage network linking the most efficient power stations. Construction ran from about 1927 to 1933. The grid was built to a standard **50 Hz** (local areas running other frequencies were converted over the following years), and from 1938 it operated as a single integrated system. Big power stations were built near coalfields and rivers, and power flowed **one way**: from a few large generators, down through the network, to millions of passive consumers.",
        "**3. Distributed (2000s onwards).** Now generation is appearing *inside* the distribution network: rooftop solar, small wind, home batteries, EVs. These are called **distributed energy resources (DERs)**. Power can flow **both ways**, and the system has to coordinate millions of small devices instead of a few dozen big ones.",
      ],
      terms: [
        { term: "Transmission network", definition: "The high-voltage 'motorways' of electricity (in GB, 275 kV and 400 kV, plus 132 kV in Scotland) that move bulk power long distances." },
        { term: "Distribution network", definition: "The lower-voltage 'local roads' that carry power from transmission substations to homes and businesses, run by Distribution Network Operators (DNOs)." },
        { term: "Distributed energy resource (DER)", definition: "A small generator, storage device or flexible load connected near where energy is used, such as rooftop solar, a home battery or an EV charger." },
      ],
    },
    {
      type: "visual",
      title: "Then and now",
      intro: "Toggle between the centralised grid and the emerging distributed grid. Watch which way the power flows.",
      component: "GridEras",
    },
    {
      type: "example",
      title: "Nationalised, privatised, decentralised",
      body: [
        "The grid's **ownership** changed alongside its shape. The industry was nationalised in 1948. From 1958 the **Central Electricity Generating Board (CEGB)** ran generation and transmission in England and Wales as one organisation. In **1990** it was broken up and privatised: generation was split into competing companies, and the transmission grid passed to the National Grid Company.",
        "That split created the market structure we still have: generators, network companies, suppliers and a system operator (today the publicly owned **National Energy System Operator, NESO**). Each one is a separate business with separate incentives.",
        "**UK vs US:** the US never had a single national grid. It has three large interconnected systems (Eastern, Western and Texas) that run at **60 Hz** rather than 50 Hz, with a mix of investor-owned, public and cooperative utilities. Many US customers still buy from a single local utility that owns the wires *and* sells the power.",
      ],
      facts: [
        { text: "The Central Electricity Board was created by the Electricity (Supply) Act 1926 and built and ran the National Grid.", evidence: "established", sources: [{ id: "smg-ceb" }] },
        { text: "The 132 kV grid was completed in 1933 and operated as a single integrated system from 1938.", evidence: "established", sources: [{ id: "wiki-national-grid-gb" }] },
        { text: "The US grid comprises three main interconnections operating at 60 Hz.", evidence: "established", sources: [{ id: "eia-electricity" }] },
      ],
    },
    {
      type: "interact",
      title: "Centralised or distributed?",
      interaction: {
        kind: "sort",
        instructions: "Sort each asset by where it typically connects. Tap an item, then tap a bucket.",
        buckets: [
          { id: "central", label: "Centralised", hint: "Large, connected to the transmission network" },
          { id: "distributed", label: "Distributed", hint: "Small or local, connected to the distribution network or behind the meter" },
        ],
        items: [
          { id: "nuclear", label: "Nuclear power station", bucket: "central", why: "Gigawatt-scale and connected at transmission voltage." },
          { id: "rooftop", label: "Rooftop solar panels", bucket: "distributed", why: "A few kilowatts, behind the meter of a single home." },
          { id: "offshore", label: "Large offshore wind farm", bucket: "central", why: "Hundreds of MW, brought ashore to the transmission network. Renewable doesn't automatically mean distributed!" },
          { id: "battery", label: "Home battery", bucket: "distributed", why: "Sits in a garage or loft, behind the meter." },
          { id: "ev", label: "EV charging on a driveway", bucket: "distributed", why: "A flexible load on the local network, and potentially a generator too with vehicle-to-grid." },
          { id: "ccgt", label: "Large gas power station", bucket: "central", why: "Classic centralised plant." },
        ],
      },
    },
    {
      type: "check",
      title: "Knowledge check",
      questions: [
        {
          id: "bbgs-q1",
          prompt: "What was the main problem the 1926 Act and the Central Electricity Board set out to solve?",
          options: [
            { id: "a", text: "Climate change" },
            { id: "b", text: "A fragmented system of small, unconnected local suppliers at different standards" },
            { id: "c", text: "Too much renewable energy" },
            { id: "d", text: "A lack of smart meters" },
          ],
          correct: "b",
          explanation: "Linking the most efficient stations through a standardised national grid cut costs and allowed stations to share capacity.",
          simpler: "Before 1926 it was like every village having its own little water tank. The grid was like connecting all the tanks with pipes, so the best ones could supply everyone and nobody needed as many spares.",
        },
        {
          id: "bbgs-q2",
          prompt: "What's the biggest operational change as the grid becomes distributed?",
          options: [
            { id: "a", text: "Power can now flow both ways, and millions of small devices need coordinating" },
            { id: "b", text: "The grid no longer needs to balance supply and demand" },
            { id: "c", text: "Transmission lines are no longer needed" },
            { id: "d", text: "Frequency changes from 50 Hz to 60 Hz" },
          ],
          correct: "a",
          explanation: "The old grid was designed for one-way flow from a few big plants. Distributed resources make flows two-way and create a massive coordination task, which is where HEMS, VPPs and DERMS come in (World 8).",
          simpler: "The old grid was a one-way street from big power stations to homes. Now homes can send power back too, so it's becoming a two-way street with millions of cars that need traffic lights.",
        },
        {
          id: "bbgs-q3",
          prompt: "A 1 GW offshore wind farm is best described as…",
          options: [
            { id: "a", text: "Distributed, because it's renewable" },
            { id: "b", text: "Centralised, because it's large and connects to the transmission network" },
            { id: "c", text: "Neither" },
            { id: "d", text: "Distributed, because it's at sea" },
          ],
          correct: "b",
          explanation: "'Distributed' is about size and where something connects, not whether it's green. Big offshore wind is centralised generation.",
          simpler: "Ask 'how big is it, and does it plug into the big motorway grid or the local streets?' A giant wind farm plugs into the motorway, so it's centralised.",
        },
      ],
    },
    {
      type: "apply",
      title: "Why this matters at work",
      body: [
        "The centralised era made the customer a **passive consumer**: you paid for units and never thought about the grid. The distributed era makes the customer a potential **participant**: their solar, battery, car and heat pump can help or hurt the system.",
        "That shift creates new questions for any energy business. Who coordinates those devices? Who gets paid for their flexibility? Who does the customer trust to control their home? These questions are the heart of World 8.",
      ],
      prompt: "If customers become participants in the grid, what new needs and worries might they have that a 'passive consumer' never did?",
    },
    {
      type: "recap",
      title: "Three things to remember",
      points: [
        "Britain's grid went from a local patchwork, to a single centralised system (built 1927–1933), to an emerging distributed system.",
        "Centralised grids move power one way from a few big plants. Distributed grids are two-way, with millions of small DERs.",
        "'Distributed' describes size and connection point, not whether energy is renewable.",
      ],
      next: "Next world: get under the bonnet of the energy system, starting with the difference between power and energy.",
    },
  ],
};
