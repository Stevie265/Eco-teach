import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import Link from "next/link";
import { Nav, Logo } from "@/components/ui/Nav";

export const metadata: Metadata = {
  title: {
    default: "Eco-teach: Understand the world that's changing our future",
    template: "%s · Eco-teach",
  },
  description:
    "An interactive learning platform for the Eco-Tech industry: energy, climate, technology, business models and the future of the home. Bite-sized, visual and grounded in credible sources.",
  openGraph: {
    title: "Eco-teach",
    description: "Understand the world that's changing our future. Interactive lessons on energy, climate tech and the future home.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className="h-full antialiased">
      <body className="grain flex min-h-full flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <footer className="no-print mt-20 border-t border-sand bg-paper-2/60">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm text-ink-soft sm:grid-cols-[1.5fr_1fr_1fr] sm:px-6">
            <div>
              <Logo />
              <p className="mt-3 max-w-sm">
                Understand the world that&apos;s changing our future. Progress is saved in your browser only: no account, no tracking.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-ink">Learn</div>
              <Link href="/" className="block hover:text-ink">Learning map</Link>
              <Link href="/start" className="block hover:text-ink">Starting diagnostic</Link>
              <Link href="/review" className="block hover:text-ink">Review session</Link>
              <Link href="/capstone" className="block hover:text-ink">Capstone challenge</Link>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-ink">Explore</div>
              <Link href="/ripple" className="block hover:text-ink">Ripple Explorer</Link>
              <Link href="/companies" className="block hover:text-ink">Company Explorer</Link>
              <Link href="/sources" className="block hover:text-ink">Research &amp; sources</Link>
              <Link href="/about" className="block hover:text-ink">About &amp; method</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
