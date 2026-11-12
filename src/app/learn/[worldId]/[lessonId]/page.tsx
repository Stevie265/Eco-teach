import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LESSONS, getLesson } from "@/content/lessons";
import { getWorld } from "@/content/worlds";
import { LessonPlayer } from "@/components/lesson/LessonPlayer";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ worldId: l.worldId, lessonId: l.id }));
}

export async function generateMetadata({ params }: PageProps<"/learn/[worldId]/[lessonId]">): Promise<Metadata> {
  const { worldId, lessonId } = await params;
  const l = getLesson(worldId, lessonId);
  return { title: l?.title ?? "Lesson", description: l?.subtitle };
}

export default async function LessonPage({ params }: PageProps<"/learn/[worldId]/[lessonId]">) {
  const { worldId, lessonId } = await params;
  const lesson = getLesson(worldId, lessonId);
  const world = getWorld(worldId);
  if (!lesson || !world) notFound();

  const idx = world.lessons.findIndex((l) => l.id === lessonId);
  const nextOutline = world.lessons.slice(idx + 1).find((l) => l.available);
  const nextHref = nextOutline ? `/learn/${world.id}/${nextOutline.id}` : undefined;

  return (
    <div className="mx-auto max-w-5xl px-4 pb-10 sm:px-6">
      <header className="mx-auto max-w-3xl pb-2 pt-8">
        <div className="font-mono text-xs" style={{ color: world.color }}>
          World {world.number} · {world.title} · {lesson.minutes} min · {lesson.level}
        </div>
        <h1 className="font-display mt-1 text-2xl text-ink-soft">{lesson.title}</h1>
      </header>
      <LessonPlayer lesson={lesson} world={world} nextHref={nextHref} />
    </div>
  );
}
