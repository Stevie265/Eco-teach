import type { Lesson } from "../types";

export const muscleToMegawatts: Lesson = {
  id: "muscle-to-megawatts",
  worldId: "history",
  title: "From muscle to megawatts",
  subtitle: "Ten thousand years of human energy use, and why new sources pile on top of old ones",
  minutes: 12,
  level: "foundation",
  reviewed: "2026-11-12",
  sources: [{ id: "ap-ratcliffe-2024" }, { id: "itv-ratcliffe-2024" }, { id: "owid-energy" }, { id: "smil-transitions" }],
  steps: [
    {
      type: "hook",
      title: "142 years",
      body: [
        "In 1882 London switched on the world's first coal-fired public power station, at Holborn Viaduct. On 30 September 2024, Britain's last coal power station, Ratcliffe-on-Soar, generated electricity for the final time.",
        "So the country that started the industrial revolution took **142 years** to stop making electricity from coal. Why so long? And if Britain has finished with coal power, why hasn't the rest of the world?",
      ],
      fact: {
        text: "Ratcliffe-on-Soar closed on 30 September 2024, ending 142 years of coal-fired electricity in Britain.",
        evidence: "established",
        sources: [{ id: "ap-ratcliffe-2024" }],
      },
    },
    {
      type: "explain",
      title: "An energy ladder",
      body: [
        "For almost all of human history, the energy we used came from two places: **muscle** (our own, and animals') and **burning plants** (wood, straw, dung). Energy people would call this *biomass*: plant and animal material burned for heat.",
        "Then we climbed a ladder of new sources. **Wind and water** turned mills and filled sails. **Coal** fed steam engines from the 1700s. **Electricity** arrived in the 1880s as a new way to *carry* energy, not a new source. **Oil and gas** dominated the 20th century. Now **renewables** such as wind and solar are growing fast.",
        "The important idea: each rung was **denser and more flexible** than the one before. Coal packs far more energy per kilogram than wood. Oil is a liquid you can pump and pour into a car. Electricity can be sent hundreds of miles in an instant and switched on at the touch of a button.",
      ],
      terms: [
        { term: "Primary energy", definition: "Energy in its raw form before conversion: coal in the ground, wind blowing, sunlight arriving." },
        { term: "Energy carrier", definition: "A form that moves energy from where it's produced to where it's used. Electricity and hydrogen are carriers, not sources." },
        { term: "Energy transition", definition: "A long shift in the mix of sources a society relies on, e.g. from wood to coal, or from fossil fuels to renewables." },
      ],
    },
    {
      type: "visual",
      title: "Explore the eras",
      intro: "Tap each era to see what changed, what it made possible, and what it left behind.",
      component: "EnergyTimeline",
      caption: "Dates are approximate and vary by country. The UK industrialised early, so many 'firsts' happened there.",
    },
    {
      type: "example",
      title: "Additions, not replacements",
      body: [
        "Here is the surprising part. If you look at **global** energy use over the last 200 years (Our World in Data has a good chart of this), new sources have mostly been **added on top** of old ones rather than replacing them. The world didn't stop burning wood when coal arrived, or stop burning coal when oil arrived. Total use grew so fast that every source could grow at once.",
        "Energy historian Vaclav Smil argues that this is why transitions take **decades, not years**. Whole systems are built around each fuel: mines, pipelines, power stations, boilers, cars, skills, jobs and habits. They have to be replaced, not just the fuel.",
        "Britain's coal exit shows both sides. Coal's share of UK electricity fell from about a third to almost nothing within roughly a decade. But that came after more than a century of slow change, and it happened in one country with mature alternatives available.",
      ],
      facts: [
        {
          text: "About ten years before Ratcliffe closed, coal generated around a third of Britain's electricity (Energy UK, quoted by PA).",
          evidence: "established",
          sources: [{ id: "itv-ratcliffe-2024" }],
        },
        {
          text: "Historically, new energy sources have mostly been added to the global mix rather than displacing earlier ones.",
          evidence: "established",
          sources: [{ id: "owid-energy" }, { id: "smil-transitions" }],
        },
      ],
    },
    {
      type: "interact",
      title: "Put the ladder in order",
      intro: "Arrange these milestones from earliest to latest.",
      interaction: {
        kind: "order",
        instructions: "Use the arrows to move each milestone into chronological order, then check.",
        items: [
          { id: "fire", label: "Controlled use of fire for heat and cooking" },
          { id: "mills", label: "Watermills and windmills grind grain" },
          { id: "steam", label: "Steam engines pump water from coal mines" },
          { id: "holborn", label: "First coal-fired public power station (London)" },
          { id: "ratcliffe", label: "Britain's last coal power station closes" },
        ],
        solution: ["fire", "mills", "steam", "holborn", "ratcliffe"],
        feedback:
          "Notice the gaps between rungs get shorter. Fire to mills took millennia, steam to the power station about 150 years, and the coal exit a decade or so. Change is speeding up, but each rung still took decades to spread.",
      },
    },
    {
      type: "check",
      title: "Knowledge check",
      questions: [
        {
          id: "mtm-q1",
          prompt: "Why is electricity described as an energy carrier rather than an energy source?",
          options: [
            { id: "a", text: "Because it can only be made from coal" },
            { id: "b", text: "Because it has to be generated from something else (coal, wind, sunlight…) and then moves that energy to where it's used" },
            { id: "c", text: "Because it can't be stored" },
            { id: "d", text: "Because it was discovered after oil" },
          ],
          correct: "b",
          explanation: "Electricity is produced by converting another form of energy. It's a very convenient way to move and use energy, but it isn't found ready to use in nature.",
          simpler: "Think of electricity like a delivery van. The van doesn't make the parcels; it carries them. Power stations and wind turbines make the 'parcel' of energy, and electricity delivers it to your kettle.",
        },
        {
          id: "mtm-q2",
          prompt: "Historically, what usually happened to older energy sources when a new one arrived?",
          options: [
            { id: "a", text: "They were quickly abandoned" },
            { id: "b", text: "They were banned" },
            { id: "c", text: "Global use often kept growing, because the new source was added on top" },
            { id: "d", text: "They became more expensive than the new source overnight" },
          ],
          correct: "c",
          explanation: "Global energy demand grew so fast that new sources were mostly additions. This is a key reason transitions take decades.",
          simpler: "Imagine a family that gets a car but keeps their bikes. They now travel more in total, and still ride the bikes sometimes. Energy has mostly worked like that: new sources joined the old ones instead of replacing them.",
        },
        {
          id: "mtm-q3",
          prompt: "Which best explains why energy transitions take decades?",
          options: [
            { id: "a", text: "Scientists are slow to invent new technologies" },
            { id: "b", text: "Whole systems (infrastructure, equipment, skills, habits) are built around each fuel and must be replaced" },
            { id: "c", text: "People don't like change" },
            { id: "d", text: "Fossil fuels never run out" },
          ],
          correct: "b",
          explanation: "The fuel is the easy part. Power stations, pipes, boilers, vehicles, supply chains and jobs all have long lifetimes and need replacing too.",
          simpler: "Switching fuel isn't like switching brands of tea. It's more like switching which side of the road a whole country drives on: every car, sign and habit has to change together.",
        },
      ],
    },
    {
      type: "apply",
      title: "Why this matters at work",
      body: [
        "When you hear a confident prediction that a technology will take over 'within five years', remember the ladder. Adoption depends on the **whole system** catching up: installers, finance, supply chains, regulation and customer trust.",
        "For product and strategy teams, that suggests the biggest opportunities often sit in the **transition period itself**, where old and new systems overlap: hybrid heating, gas boilers paired with heat pumps, homes with solar but old tariffs, and customers who need help bridging the two.",
      ],
      prompt: "Think of a product you work on. Which part of the 'old system' does it depend on, and what would need to change around it for a new technology to replace it?",
    },
    {
      type: "recap",
      title: "Three things to remember",
      points: [
        "Humanity climbed an energy ladder (muscle → wind and water → coal → oil and gas → renewables), with each rung denser and more flexible than the last.",
        "Electricity is a carrier, not a source. It moves energy made from something else.",
        "Globally, new sources have mostly been added on top of old ones, which is why transitions take decades and the overlap is where the opportunities are.",
      ],
      next: "Next: how Britain built one giant, centralised grid, and why it's now going small again.",
    },
  ],
};
