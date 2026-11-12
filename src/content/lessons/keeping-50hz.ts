import type { Lesson } from "../types";

export const keeping50hz: Lesson = {
  id: "keeping-50hz",
  worldId: "energy-system",
  title: "Keeping 50 Hz: balancing the grid",
  subtitle: "Why supply must match demand every second, and what happens when it doesn't",
  minutes: 14,
  level: "foundation",
  reviewed: "2026-11-12",
  sources: [
    { id: "eso-aug-2019-technical" },
    { id: "e3c-aug-2019" },
    { id: "ukerc-aug-2019" },
    { id: "neso-frcp-2020" },
    { id: "eia-electricity" },
  ],
  steps: [
    {
      type: "hook",
      title: "4:52pm, Friday 9 August 2019",
      body: [
        "On a wet Friday afternoon, a lightning strike hit a transmission line north of London. Within seconds, a large offshore wind farm and a gas power station dropped off the system, along with many small generators.",
        "Moments later, around **1.1 million customers** lost power and rail services were badly disrupted. Yet the system did exactly what it was designed to do. To understand why, you need to understand a single number: **50 Hz**.",
      ],
      fact: {
        text: "On 9 August 2019, system frequency fell to 48.8 Hz, triggering automatic demand disconnection affecting about 1.1 million customers.",
        evidence: "established",
        sources: [{ id: "eso-aug-2019-technical" }, { id: "e3c-aug-2019" }],
      },
    },
    {
      type: "explain",
      title: "The grid is a giant spinning machine",
      body: [
        "Electricity is very hard to store at grid scale, so for most of history the grid has had to produce **exactly as much power as is being used, every second**.",
        "The signal that tells operators whether they're winning is **frequency**. In Great Britain, AC electricity alternates **50 times a second (50 Hz)**. In North America it's 60 Hz. Traditional generators have huge spinning turbines locked in step with that rhythm.",
        "If demand exceeds supply, those turbines are slightly 'dragged', so they slow down and **frequency falls**. If supply exceeds demand, they speed up and **frequency rises**. Think of a cyclist going up and down hills: the pedalling (supply) must match the slope (demand) or the speed (frequency) changes.",
        "The system operator (today **NESO**, the National Energy System Operator) keeps frequency within tight limits. The normal operating range is **49.8–50.2 Hz**. The statutory limits are **49.5–50.5 Hz**. If frequency falls to **48.8 Hz**, an automatic last line of defence called **Low Frequency Demand Disconnection (LFDD)** cuts off blocks of customers to save the rest of the system.",
      ],
      terms: [
        { term: "Frequency (Hz)", definition: "How many times per second alternating current changes direction. It's the grid's heartbeat and its real-time balance gauge." },
        { term: "Inertia", definition: "The stored momentum in large spinning machines. It slows down how fast frequency changes, buying operators time. Wind and solar connect through electronics and provide little natural inertia." },
        { term: "Frequency response / reserve", definition: "Generators, batteries or flexible demand paid to react within seconds or minutes when frequency moves." },
        { term: "NESO", definition: "National Energy System Operator, the publicly owned body that balances Great Britain's electricity system (formerly National Grid ESO)." },
      ],
    },
    {
      type: "visual",
      title: "You're in the control room",
      intro: "Balance the grid. Change demand and generation, then try tripping a power station and see whether your reserves can catch it.",
      component: "GridBalancer",
      caption: "A simplified teaching model, not a real power-system simulation. Real frequency response happens in fractions of a second.",
    },
    {
      type: "example",
      title: "What actually happened on 9 August",
      body: [
        "According to the system operator's technical report, the lightning strike caused the near-simultaneous loss of output from **Hornsea One** offshore wind farm and the **Little Barford** gas power station, plus a large amount of small embedded generation that disconnected automatically.",
        "Backup reserves were deployed, but the combined loss was bigger than the reserve being held. Frequency fell below the 49.5 Hz statutory limit to **48.8 Hz**, and LFDD disconnected around **5% of demand**, about 1.1 million customers, for roughly 15–45 minutes. Frequency was back to normal within about 5 minutes.",
        "The lesson experts drew: the automatic safety net **worked**, keeping a much bigger blackout from happening. But the event exposed how a system with less inertia and more distributed generation can behave in unexpected ways. It led to tighter rules for small generators and investment in faster-responding services, including batteries.",
      ],
      facts: [
        { text: "Hornsea One and Little Barford lost output following a lightning strike at about 4:52pm.", evidence: "established", sources: [{ id: "eso-aug-2019-technical" }] },
        { text: "Frequency fell below the 49.5 Hz statutory limit to 48.8 Hz.", evidence: "established", sources: [{ id: "e3c-aug-2019" }] },
        { text: "LFDD starts operating at 48.8 Hz; 49.5 Hz is not itself 'dangerously low'.", evidence: "established", sources: [{ id: "ukerc-aug-2019" }] },
      ],
    },
    {
      type: "interact",
      title: "Your call",
      interaction: {
        kind: "scenario",
        instructions: "Choose the response you'd reach for first.",
        situation:
          "It's 5:30pm on a cold, still January evening. Wind output has fallen sharply, demand is rising towards its daily peak, and frequency is drifting down towards 49.85 Hz. You have a few minutes before it becomes a real problem.",
        choices: [
          {
            id: "battery",
            label: "Dispatch fast-acting batteries and contracted demand reduction",
            outcome:
              "Strong. Batteries respond in under a second and demand-side flexibility can be called quickly. This is how a modern operator buys time cheaply and cleanly.",
            quality: "strong",
          },
          {
            id: "gas",
            label: "Instruct gas power stations to ramp up",
            outcome:
              "Reasonable, and very common, but gas plants ramp over minutes rather than seconds, and it adds emissions and cost. Often used alongside faster resources.",
            quality: "ok",
          },
          {
            id: "wait",
            label: "Wait. Frequency is still above 49.8 Hz",
            outcome:
              "Risky. Frequency is still inside the normal range, but the trend is downward and demand is still rising. Operators act on the trend, not just the current value.",
            quality: "weak",
          },
          {
            id: "disconnect",
            label: "Manually disconnect a region to be safe",
            outcome:
              "Far too drastic. Deliberate disconnection is a last resort used only when everything else has failed.",
            quality: "weak",
          },
        ],
      },
    },
    {
      type: "check",
      title: "Knowledge check",
      questions: [
        {
          id: "k50-q1",
          prompt: "If electricity demand suddenly rises faster than generation, grid frequency will…",
          options: [
            { id: "a", text: "Rise above 50 Hz" },
            { id: "b", text: "Fall below 50 Hz" },
            { id: "c", text: "Stay exactly at 50 Hz" },
            { id: "d", text: "Switch to 60 Hz" },
          ],
          correct: "b",
          explanation: "More demand than supply drags the spinning generators, so they slow and frequency falls.",
          simpler: "Imagine pedalling a bike when the road suddenly turns uphill. If you don't pedal harder, you slow down. Demand is the hill, generation is the pedalling, and frequency is your speed.",
        },
        {
          id: "k50-q2",
          prompt: "What was the main reason around 1.1 million customers lost power on 9 August 2019?",
          options: [
            { id: "a", text: "Someone switched off the wrong cable" },
            { id: "b", text: "An automatic protection scheme deliberately disconnected some demand when frequency hit 48.8 Hz, protecting the rest of the system" },
            { id: "c", text: "Too much wind power" },
            { id: "d", text: "A cyber attack" },
          ],
          correct: "b",
          explanation: "LFDD is designed to shed a small share of demand to stop frequency collapsing further. It's a safety net, and on the day it worked as intended.",
          simpler: "It's like a fuse in your house. When something goes badly wrong, a small part switches off on purpose so that the whole house doesn't burn out.",
        },
        {
          id: "k50-q3",
          prompt: "Why are batteries increasingly valuable to grid operators?",
          options: [
            { id: "a", text: "They produce energy from nothing" },
            { id: "b", text: "They can respond to frequency changes within a fraction of a second" },
            { id: "c", text: "They provide large amounts of natural spinning inertia" },
            { id: "d", text: "They are required by law in every home" },
          ],
          correct: "b",
          explanation: "Battery inverters can react almost instantly, making them ideal for fast frequency response as inertia from big spinning plants declines.",
          simpler: "A battery is like a goalkeeper with lightning reflexes. When the ball (a sudden imbalance) comes, it can react before anyone else can move.",
        },
      ],
    },
    {
      type: "apply",
      title: "Why this matters at work",
      body: [
        "Balancing used to be done almost entirely by large power stations. Increasingly it can be done by **millions of small devices**: home batteries, EV chargers and heat pumps that shift or pause demand for a few minutes.",
        "That turns a technical problem into a **commercial and customer** opportunity. Someone has to recruit those customers, earn their trust, control the devices safely and share the value. That's the business of flexibility, which you'll explore in World 8.",
      ],
      prompt: "Would you let your energy supplier pause your EV charging for 30 minutes during a grid emergency? What would they need to offer, explain or promise?",
    },
    {
      type: "recap",
      title: "Three things to remember",
      points: [
        "Supply and demand must match second by second, and frequency (50 Hz in GB, 60 Hz in the US) is the real-time gauge.",
        "Normal range is 49.8–50.2 Hz. At 48.8 Hz, automatic disconnection protects the system, as happened on 9 August 2019.",
        "As spinning inertia declines, fast resources (batteries, flexible demand) become more valuable, creating commercial opportunities.",
      ],
      next: "Jump ahead to World 8 to see who controls all those flexible devices.",
    },
  ],
};
