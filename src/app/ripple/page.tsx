import type { Metadata } from "next";
import { RippleExplorer } from "@/components/RippleExplorer";

export const metadata: Metadata = { title: "Ripple Explorer" };

export default function RipplePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 max-w-3xl">
        <div className="text-xs font-bold uppercase tracking-widest text-moss-500">Signature feature</div>
        <h1 className="font-display mt-1 text-4xl text-forest-900 sm:text-5xl">The Ripple Explorer</h1>
        <p className="mt-3 text-lg text-ink-soft">
          Drop a change into the system and watch it ripple through three levels: the <strong className="text-[#2f3d7a]">external environment</strong>, the{" "}
          <strong className="text-forest-700">industry and business models</strong>, and the <strong className="text-[#7a5309]">customer</strong>. Then add your own connections.
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          These chains are reasoning tools, not predictions. Each card says whether it&apos;s established evidence or a reasoned scenario to test.
        </p>
      </div>
      <RippleExplorer />
    </div>
  );
}
