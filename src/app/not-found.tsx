import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="font-mono text-sm text-moss-500">48.8 Hz</div>
      <h1 className="font-display mt-2 text-4xl text-forest-900">This page has been disconnected</h1>
      <p className="mt-3 text-ink-soft">We couldn&apos;t find what you were looking for. It may be a lesson that&apos;s still in development.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-forest-800 px-6 py-3 font-semibold text-paper">
        Back to the learning map
      </Link>
    </div>
  );
}
