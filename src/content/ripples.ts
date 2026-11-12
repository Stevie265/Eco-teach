import type { Evidence, SourceRef } from "./types";

/**
 * Ripple Explorer content.
 * Each trend is a causal chain that runs through three levels:
 *   environment → industry & business model → customer (→ opportunity)
 * Chains are *reasoning tools*, not predictions. Each node carries an evidence label.
 */

export type RippleLevel = "environment" | "industry" | "customer";

export interface RippleNode {
  id: string;
  level: RippleLevel;
  /** PESTEL+M lens or business/customer facet */
  lens: string;
  title: string;
  detail: string;
  evidence: Evidence;
  sources?: SourceRef[];
  /** id of the node that causes this one */
  from?: string;
}

export interface RippleTrend {
  id: string;
  title: string;
  lens: "Political" | "Economic" | "Social" | "Technological" | "Environmental" | "Legal" | "Market";
  summary: string;
  nodes: RippleNode[];
  opportunity: string;
  questions: string[];
}

export const LEVELS: { id: RippleLevel; label: string; blurb: string }[] = [
  { id: "environment", label: "1 · External environment", blurb: "Macro and micro forces: PESTEL plus market shifts" },
  { id: "industry", label: "2 · Industry & business model", blurb: "Structures, value chains, costs, revenues, competition" },
  { id: "customer", label: "3 · Customer", blurb: "Needs, behaviour, affordability, barriers, experience" },
];

export const RIPPLE_TRENDS: RippleTrend[] = [
  {
    id: "battery-costs",
    title: "Battery costs keep falling",
    lens: "Technological",
    summary: "Lithium-ion battery pack prices have fallen dramatically over 15 years. What happens next?",
    nodes: [
      {
        id: "b1",
        level: "environment",
        lens: "Technology",
        title: "Battery packs get much cheaper",
        detail:
          "BloombergNEF's 2025 survey put the average lithium-ion pack price at $108/kWh, down 8% on 2024 and about 93% lower than in 2010. Stationary storage packs averaged $70/kWh. Drivers cited: manufacturing overcapacity, competition and a shift to LFP chemistry.",
        evidence: "established",
        sources: [{ id: "bnef-battery-2025" }, { id: "esn-battery-2025" }],
      },
      {
        id: "b2",
        level: "industry",
        lens: "Costs",
        from: "b1",
        title: "Home battery system costs fall, though more slowly",
        detail:
          "Pack prices are only part of an installed system. Inverters, installation labour, margins and certification don't fall as fast, so the price customers pay drops less than the headline pack price.",
        evidence: "illustrative",
      },
      {
        id: "b3",
        level: "industry",
        lens: "Competition",
        from: "b2",
        title: "More providers enter the market",
        detail:
          "Lower hardware costs reduce barriers to entry for installers, manufacturers and energy suppliers, and could compress margins for incumbents.",
        evidence: "speculative",
      },
      {
        id: "b4",
        level: "industry",
        lens: "Business model",
        from: "b3",
        title: "Financing and subscription propositions become viable",
        detail:
          "When hardware is cheaper and flexibility can be monetised (e.g. via a VPP), a provider might fund the battery and recover the cost through a monthly fee or a share of savings: 'battery-as-a-service'.",
        evidence: "speculative",
      },
      {
        id: "b5",
        level: "customer",
        lens: "Affordability",
        from: "b4",
        title: "More households can afford to store electricity",
        detail:
          "Lower upfront cost or no-upfront-cost models widen the market beyond early adopters, but renters, people in flats and people without good credit may still be left out.",
        evidence: "speculative",
      },
      {
        id: "b6",
        level: "customer",
        lens: "Behaviour",
        from: "b5",
        title: "Customers expect smart, automatic optimisation",
        detail:
          "If a battery is installed, customers will likely expect it to 'just work': charging cheaply, avoiding peaks and earning rewards without daily effort.",
        evidence: "speculative",
      },
    ],
    opportunity:
      "Energy suppliers could develop integrated home energy propositions (battery + smart tariff + automated optimisation + VPP revenue share), but must solve for trust, installation capacity and fair access.",
    questions: [
      "Which node in this chain is the weakest link, the one most likely not to happen?",
      "Who loses if this chain plays out?",
      "What evidence would you look for in the next 12 months to know it's happening?",
    ],
  },
  {
    id: "time-of-use",
    title: "Time-of-use pricing goes mainstream",
    lens: "Market",
    summary: "More tariffs charge different prices at different times of day. Who wins, who loses, and what gets built?",
    nodes: [
      {
        id: "t1",
        level: "environment",
        lens: "Market & regulation",
        title: "Half-hourly data enables time-varying prices",
        detail:
          "Smart meters record consumption in half-hour blocks, which lets suppliers offer tariffs that vary through the day. Britain is moving towards settling all customers on half-hourly data (Market-wide Half-Hourly Settlement).",
        evidence: "established",
      },
      { id: "t2", level: "industry", lens: "Revenue", from: "t1", title: "Suppliers compete on tariff design", detail: "Tariffs become products: EV tariffs, heat pump tariffs, peak-avoidance tariffs. Differentiation shifts from price-per-kWh to 'how cleverly can you help me shift?'", evidence: "speculative" },
      { id: "t3", level: "industry", lens: "Value chain", from: "t2", title: "Device control becomes a supplier capability", detail: "To make time-of-use work for customers, suppliers increasingly integrate with EV chargers, batteries and heat pumps, either directly or via partners.", evidence: "speculative" },
      { id: "t4", level: "customer", lens: "Behaviour", from: "t2", title: "Households with flexible devices save money", detail: "Customers who can shift (EV owners, battery owners) can benefit most. Those who can't shift may not benefit, or may pay more at peak.", evidence: "speculative" },
      { id: "t5", level: "customer", lens: "Adoption barriers", from: "t4", title: "Complexity and fairness concerns grow", detail: "Some customers may find variable prices confusing or stressful. Vulnerable customers need protection, which is a design and regulatory challenge.", evidence: "speculative" },
    ],
    opportunity: "Design 'set and forget' propositions that capture time-of-use savings automatically, with simple guarantees for customers who can't shift.",
    questions: ["What would a time-of-use tariff for someone who can't shift look like?", "Which customer segment is the most underserved here?"],
  },
  {
    id: "heat-pump-policy",
    title: "Government boosts heat pump incentives",
    lens: "Political",
    summary: "A policy change raises the upfront grant for heat pumps. Follow the consequences.",
    nodes: [
      { id: "h1", level: "environment", lens: "Political", title: "Bigger upfront grant for heat pumps", detail: "A hypothetical scenario for exploration. Britain's Boiler Upgrade Scheme already provides upfront grants towards heat pumps; check gov.uk for current amounts.", evidence: "illustrative" },
      { id: "h2", level: "industry", lens: "Demand", from: "h1", title: "Installer demand spikes", detail: "Order books fill faster than installers can be trained, and lead times lengthen.", evidence: "speculative" },
      { id: "h3", level: "industry", lens: "Supply chain", from: "h2", title: "Skills become the bottleneck", detail: "Installer training, MCS certification capacity and survey quality become the constraint, not demand.", evidence: "speculative" },
      { id: "h4", level: "industry", lens: "Business model", from: "h3", title: "Vertically integrated installers gain an edge", detail: "Firms controlling survey, design, install and aftercare may scale faster and protect quality.", evidence: "speculative" },
      { id: "h5", level: "customer", lens: "Experience", from: "h3", title: "Install quality and aftercare become decisive", detail: "Poorly designed systems can disappoint on comfort or running costs, and word of mouth matters a lot in heating.", evidence: "speculative" },
    ],
    opportunity: "Win on the end-to-end experience: fast quality surveys, transparent running-cost estimates, and aftercare with performance monitoring.",
    questions: ["What happens if the grant is removed suddenly?", "Where would you place a bet: installer capacity or customer demand?"],
  },
  {
    id: "ai-optimisation",
    title: "AI makes home optimisation near-free",
    lens: "Technological",
    summary: "Software that forecasts prices, weather and household behaviour gets cheaper and better.",
    nodes: [
      { id: "a1", level: "environment", lens: "Technology", title: "Forecasting and control software improves", detail: "Better forecasting of prices, solar output and household routines makes automated decisions more accurate.", evidence: "speculative" },
      { id: "a2", level: "industry", lens: "Competitive dynamics", from: "a1", title: "Optimisation becomes a commodity", detail: "If many providers can optimise well, the advantage shifts to who owns the customer relationship, device integrations and data.", evidence: "speculative" },
      { id: "a3", level: "industry", lens: "Partnerships", from: "a2", title: "Platforms and ecosystems form", detail: "Device makers, software platforms and suppliers form partnerships, which puts interoperability standards in focus.", evidence: "speculative" },
      { id: "a4", level: "customer", lens: "Expectations", from: "a1", title: "Customers expect energy to be invisible", detail: "Customers want outcomes (warm home, charged car, lower bill) rather than dashboards.", evidence: "speculative" },
      { id: "a5", level: "customer", lens: "Trust", from: "a4", title: "Trust and control become the product", detail: "Automation needs transparency, override and clear accountability when things go wrong.", evidence: "speculative" },
    ],
    opportunity: "Differentiate on trust: explainable automation, easy override, outcome guarantees.",
    questions: ["What would make you trust software to control your heating?", "Who should be accountable if automation makes a bad call?"],
  },
];
