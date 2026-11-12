/**
 * Company Explorer data (World 7).
 * Descriptions are deliberately high-level and neutral, reviewed on the date shown.
 * Company claims are marked as such. Verify current details before relying on them.
 */
export interface Company {
  id: string;
  name: string;
  hq: string;
  founded?: string;
  type: "Incumbent" | "Insurgent" | "Scale-up" | "Failed";
  segment: "Energy supply" | "Home hardware" | "Solar & storage" | "EV charging" | "Heating" | "Battery manufacturing" | "Platform & software";
  proposition: string;
  businessModel: string;
  revenue: string[];
  competesWith: string[];
  watch: string;
  url?: string;
}

export const COMPANIES_REVIEWED = "2026-11-12";

export const COMPANIES: Company[] = [
  {
    id: "centrica",
    name: "Centrica (British Gas)",
    hq: "UK",
    founded: "1997 (demerged from British Gas plc)",
    type: "Incumbent",
    segment: "Energy supply",
    proposition: "Britain's largest legacy energy supplier brand, with home services (boiler cover, servicing, installation) and smart home products under the Hive brand.",
    businessModel: "Integrated: energy supply, home services, trading and some generation and storage assets.",
    revenue: ["Energy supply margins", "Service contracts and repairs", "Installation", "Trading and optimisation"],
    competesWith: ["octopus", "ovo"],
    watch: "How an incumbent with a large customer base and engineer workforce converts that into heat pump, solar, battery and flexibility propositions.",
    url: "https://www.centrica.com/",
  },
  {
    id: "octopus",
    name: "Octopus Energy",
    hq: "UK",
    founded: "2015",
    type: "Scale-up",
    segment: "Energy supply",
    proposition: "Fast-growing supplier known for innovative tariffs (time-of-use, EV and agile pricing) and its in-house Kraken technology platform.",
    businessModel: "Supply plus technology licensing. Kraken is licensed to other utilities; the group also invests in generation and heat pumps.",
    revenue: ["Energy supply margins", "Software licensing (Kraken)", "Heat pump and EV propositions", "Generation investment"],
    competesWith: ["centrica", "ovo"],
    watch: "A case study in an insurgent becoming an incumbent, and in whether software licensing is a durable advantage.",
    url: "https://octopus.energy/",
  },
  {
    id: "ovo",
    name: "OVO Energy",
    hq: "UK",
    founded: "2009",
    type: "Insurgent",
    segment: "Energy supply",
    proposition: "Independent supplier that grew via acquisition (including SSE's retail business in 2020) with a focus on green propositions.",
    businessModel: "Energy supply with home energy products and services.",
    revenue: ["Energy supply margins", "Home energy products"],
    competesWith: ["centrica", "octopus"],
    watch: "Scale through acquisition: integration, capital requirements and customer service at scale.",
    url: "https://www.ovoenergy.com/",
  },
  {
    id: "tesla-energy",
    name: "Tesla Energy",
    hq: "US",
    type: "Scale-up",
    segment: "Solar & storage",
    proposition: "Powerwall home batteries, Megapack grid-scale storage and solar. Runs virtual power plant programmes in several markets.",
    businessModel: "Hardware sales plus software (optimisation, VPP participation).",
    revenue: ["Battery hardware", "Solar", "Software and VPP services"],
    competesWith: ["enphase", "givenergy"],
    watch: "Hardware plus software plus brand. Watch how much value comes from software and grid services versus hardware margin.",
    url: "https://www.tesla.com/energy",
  },
  {
    id: "enphase",
    name: "Enphase Energy",
    hq: "US",
    founded: "2006",
    type: "Scale-up",
    segment: "Home hardware",
    proposition: "Microinverters (one per solar panel), home batteries and energy management software.",
    businessModel: "Hardware sold through installers, with a software ecosystem.",
    revenue: ["Microinverters", "Batteries", "EV chargers", "Software"],
    competesWith: ["tesla-energy"],
    watch: "Exposure to cycles in residential solar demand, which are often driven by policy and interest rates.",
    url: "https://enphase.com/",
  },
  {
    id: "sunrun",
    name: "Sunrun",
    hq: "US",
    founded: "2007",
    type: "Scale-up",
    segment: "Solar & storage",
    proposition: "Residential solar and batteries, mostly offered via leases and power purchase agreements, so customers pay monthly instead of buying the system.",
    businessModel: "'Solar-as-a-service': finance, install and own the system, earning long-term customer payments and grid services revenue.",
    revenue: ["Monthly lease or PPA payments", "Incentives and tax credits", "Grid services"],
    competesWith: ["tesla-energy"],
    watch: "A classic energy-as-a-service model: sensitive to interest rates, incentive policy and customer lifetime value.",
    url: "https://www.sunrun.com/",
  },
  {
    id: "ohme",
    name: "Ohme",
    hq: "UK",
    type: "Insurgent",
    segment: "EV charging",
    proposition: "Smart home EV chargers that integrate with energy tariffs to charge at cheaper, greener times.",
    businessModel: "Charger hardware plus tariff-integrated software and partnerships with suppliers and carmakers.",
    revenue: ["Charger sales", "Partnerships"],
    competesWith: [],
    watch: "How hardware makers capture recurring value once a charger is installed.",
    url: "https://ohme-ev.com/",
  },
  {
    id: "givenergy",
    name: "GivEnergy",
    hq: "UK",
    type: "Insurgent",
    segment: "Home hardware",
    proposition: "Home batteries and inverters sold through installers, with an app for monitoring and control.",
    businessModel: "Hardware through installer channels, plus software.",
    revenue: ["Battery and inverter sales"],
    competesWith: ["tesla-energy"],
    watch: "Competition from cheaper imported hardware as battery prices fall.",
    url: "https://givenergy.co.uk/",
  },
  {
    id: "aira",
    name: "Aira",
    hq: "Sweden",
    founded: "2022",
    type: "Insurgent",
    segment: "Heating",
    proposition: "Heat pump company offering design, installation and financing as a package, with its own hardware and app.",
    businessModel: "Vertically integrated heat pumps, including monthly payment options.",
    revenue: ["Heat pump sales and installation", "Financing", "Service"],
    competesWith: ["centrica", "octopus"],
    watch: "Can a well-funded start-up scale installer capacity and quality fast enough to justify its investment?",
    url: "https://www.airahome.com/",
  },
  {
    id: "northvolt",
    name: "Northvolt",
    hq: "Sweden",
    founded: "2016",
    type: "Failed",
    segment: "Battery manufacturing",
    proposition: "Aimed to build a European champion in sustainable lithium-ion battery cells at gigafactory scale.",
    businessModel: "Capital-intensive cell manufacturing with offtake agreements from carmakers.",
    revenue: ["Battery cells (planned)"],
    competesWith: [],
    watch: "Filed for US Chapter 11 in November 2024 and for bankruptcy in Sweden in March 2025. A case study in manufacturing ramp-up risk, capital intensity and competing with established Asian producers.",
  },
  {
    id: "bulb",
    name: "Bulb",
    hq: "UK",
    founded: "2015",
    type: "Failed",
    segment: "Energy supply",
    proposition: "Simple, green-branded supplier that grew rapidly to over a million customers.",
    businessModel: "Low-cost supply with limited hedging of wholesale prices.",
    revenue: ["Energy supply margins"],
    competesWith: ["octopus", "ovo"],
    watch: "Entered special administration in November 2021 as wholesale prices soared, and was later sold to Octopus. Shows the risk of thin margins and inadequate hedging in a volatile market.",
  },
];
