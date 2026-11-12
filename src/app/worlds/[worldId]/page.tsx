import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WORLDS, getWorld, totalMinutes } from "@/content/worlds";
import { WorldGlyph } from "@/components/ui/WorldGlyph";
import { WorldLessons } from "@/components/WorldLessons";
import Link from "next/link";

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
      <section style={{ background: world.tint }} className="border-b border-sand">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
          <Link href="/" className="text-sm font-medium text-ink-soft hover:text-ink">
            ← Learning map
          </Link>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white shadow-sm">
              <WorldGlyph glyph={world.glyph} color={world.color} className="h-14 w-14" />
            </div>
            <div>
              <div className="font-mono text-sm" style={{ color: world.color }}>
                World {String(world.number).padStart(2, "0")} · {world.lessons.length} lessons · ~{Math.round(totalMinutes(world) / 6) / 10} hours
              </div>
              <h1 className="font-display text-4xl text-forest-900 sm:text-5xl">{world.title}</h1>
              <p className="mt-1 text-lg text-ink-soft">{world.tagline}</p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-[17px] leading-relaxed">{world.description}</p>
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
            <Link href="/companies" className="block rounded-2xl bg-forest-900 p-4 text-paper">
              <div className="font-display text-lg">Company Explorer →</div>
              <p className="text-sm text-moss-300">Compare incumbents, insurgents and failures.</p>
            </Link>
          )}
          {(world.id === "foresight" || world.id === "pestel") && (
            <Link href="/ripple" className="block rounded-2xl bg-forest-900 p-4 text-paper">
              <div className="font-display text-lg">Ripple Explorer →</div>
              <p className="text-sm text-moss-300">Practise following causal chains.</p>
            </Link>
          )}
          {world.id === "opportunities" && (
            <Link href="/capstone" className="block rounded-2xl bg-forest-900 p-4 text-paper">
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
    <Link href={`/worlds/${id}`} className="flex items-center gap-3 rounded-xl border border-sand bg-white p-2.5 text-sm font-medium hover:shadow">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: tint }}>
        <WorldGlyph glyph={glyph} color={color} className="h-6 w-6" />
      </span>
      {title}
    </Link>
  );
}
