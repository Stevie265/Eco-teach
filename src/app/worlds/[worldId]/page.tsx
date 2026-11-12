import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WORLDS, getWorld, totalMinutes } from "@/content/worlds";
import { WorldGlyph } from "@/components/ui/WorldGlyph";
import { WorldLessons } from "@/components/WorldLessons";
import Link from "next/link";
import { WorldScene } from "@/components/landscape/WorldScene";
import { Parallax } from "@/components/motion/Motion";
import { shade } from "@/lib/color";

export function generateStaticParams() {
  return WORLDS.map((w) => ({ worldId: w.id }));
}

export async function generateMetadata({ params }: PageProps<"/worlds/[worldId]">): Promise<Metadata> {
  const { worldId } = await params;
  const w = getWorld(worldId);
  return { title: w ? `World ${w.number}: ${w.title}` : "World" };
}

export default async function WorldPage({ params }: PageProps<"/worlds/[worldId]">) {
  const { worldId } = await params;
  const world = getWorld(worldId);
  if (!world) notFound();
  const connected = world.connects.map((c) => getWorld(c)!).filter(Boolean);
  const feeds = WORLDS.filter((w) => w.connects.includes(world.id));

  return (
    <div>
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${world.tint} 0%, ${world.tint} 70%, #fffaf0 100%)` }}>
        <div className="mx-auto grid max-w-5xl items-center gap-6 px-4 pb-10 pt-8 sm:px-6 md:grid-cols-[1.2fr_1fr] md:pb-14 md:pt-12">
          <div>
            <Link href="/" className="btn btn-secondary px-3 py-1.5 text-sm">
              ← Journey
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: world.color, boxShadow: `0 5px 0 ${shade(world.color)}` }}>
                <WorldGlyph glyph={world.glyph} color="#fff" className="h-8 w-8" />
              </span>
              <span className="font-mono text-sm font-bold" style={{ color: shade(world.color, 0.1) }}>
                WORLD {String(world.number).padStart(2, "0")} · {world.lessons.length} lessons · ~{Math.round(totalMinutes(world) / 6) / 10}h
              </span>
            </div>
            <h1 className="font-display mt-4 text-5xl leading-[1] text-forest-900 sm:text-6xl">{world.title}</h1>
            <p className="mt-2 text-xl font-semibold text-ink-soft">{world.tagline}</p>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink">{world.description}</p>
          </div>
          <Parallax speed={0.25}>
            <WorldScene id={world.id} className="mx-auto w-full max-w-md drop-shadow-sm" />
          </Parallax>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_280px]">
        <WorldLessons worldId={world.id} />
        <aside className="space-y-6">
          {feeds.length > 0 && (
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-ink-soft">Builds on</div>
              <div className="space-y-2">
                {feeds.map((w) => (
                  <ConnLink key={w.id} id={w.id} title={w.title} glyph={w.glyph} color={w.color} tint={w.tint} />
                ))}
              </div>
            </div>
          )}
          {connected.length > 0 && (
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-ink-soft">Leads into</div>
              <div className="space-y-2">
                {connected.map((w) => (
                  <ConnLink key={w.id} id={w.id} title={w.title} glyph={w.glyph} color={w.color} tint={w.tint} />
                ))}
              </div>
            </div>
          )}
          {world.id === "startups" && (
            <Link href="/companies" className="block rounded-2xl bg-forest-900 p-4 text-white shadow-[0_5px_0_#0b2133]">
              <div className="font-display text-lg">Company Explorer →</div>
              <p className="text-sm text-moss-300">Compare incumbents, insurgents and failures.</p>
            </Link>
          )}
          {(world.id === "foresight" || world.id === "pestel") && (
            <Link href="/ripple" className="block rounded-2xl bg-forest-900 p-4 text-white shadow-[0_5px_0_#0b2133]">
              <div className="font-display text-lg">Ripple Explorer →</div>
              <p className="text-sm text-moss-300">Practise following causal chains.</p>
            </Link>
          )}
          {world.id === "opportunities" && (
            <Link href="/capstone" className="block rounded-2xl bg-forest-900 p-4 text-white shadow-[0_5px_0_#0b2133]">
              <div className="font-display text-lg">Capstone challenge →</div>
              <p className="text-sm text-moss-300">Build a strategic opportunity assessment.</p>
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}

function ConnLink({ id, title, glyph, color, tint }: { id: string; title: string; glyph: string; color: string; tint: string }) {
  return (
    <Link href={`/worlds/${id}`} className="card-chunky flex items-center gap-3 rounded-2xl bg-white p-2.5 text-sm font-bold transition hover:-translate-y-0.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: tint }}>
        <WorldGlyph glyph={glyph} color={color} className="h-6 w-6" />
      </span>
      {title}
    </Link>
  );
}
