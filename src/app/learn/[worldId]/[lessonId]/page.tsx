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

/** Lessons run in focus mode: the global nav, tab bar and footer hide themselves on /learn routes. */
export default async function LessonPage({ params }: PageProps<"/learn/[worldId]/[lessonId]">) {
  const { worldId, lessonId } = await params;
  const lesson = getLesson(worldId, lessonId);
  const world = getWorld(worldId);
  if (!lesson || !world) notFound();

  const idx = world.lessons.findIndex((l) => l.id === lessonId);
  const nextOutline = world.lessons.slice(idx + 1).find((l) => l.available);
  const nextHref = nextOutline ? `/learn/${world.id}/${nextOutline.id}` : undefined;

  return <LessonPlayer lesson={lesson} world={world} nextHref={nextHref} />;
}
