"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Map, RotateCcw, User, Waves, Zap } from "lucide-react";
import { streak, useHydrated, useProgress } from "@/lib/progress";

const LINKS = [
  { href: "/", label: "Journey" },
  { href: "/ripple", label: "Ripple Explorer" },
  { href: "/companies", label: "Companies" },
  { href: "/capstone", label: "Capstone" },
  { href: "/sources", label: "Sources" },
];

const TABS = [
  { href: "/", label: "Journey", icon: Map },
  { href: "/ripple", label: "Ripple", icon: Waves },
  { href: "/review", label: "Review", icon: RotateCcw },
  { href: "/dashboard", label: "Me", icon: User },
];

export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden>
        <circle cx="16" cy="16" r="15" fill="#1b8048" />
        <path d="M9 21c0-7 5-12 14-12 0 8-5 13-12 13" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
        <path d="m15.5 12.5-3 5.5h4l-2 5" fill="none" stroke="#ffd23f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`font-display text-xl sm:text-[22px] ${light ? "text-white" : "text-forest-900"}`}>eco·teach</span>
    </span>
  );
}

/** Lessons run full-screen (focus mode): no global nav, tab bar or footer. */
function useFocusMode() {
  const pathname = usePathname();
  return { pathname, focus: pathname.startsWith("/learn/") };
}

export function Nav() {
  const p = useProgress();
  const hydrated = useHydrated();
  const { pathname, focus } = useFocusMode();
  if (focus) return null;
  const s = hydrated ? streak(p) : 0;

  return (
    <header className="no-print sticky top-0 z-40 border-b-2 border-sand/60 bg-paper/80 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-6xl sm:h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Eco-teach home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-xl px-3.5 py-2 text-sm font-bold transition ${active ? "bg-sky-soft text-sky-deep" : "text-ink-soft hover:bg-paper-2 hover:text-ink"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/dashboard" className="flex items-center gap-3 rounded-2xl border-2 border-sand bg-white px-3 py-1.5 text-sm font-extrabold shadow-[0_3px_0_#e7ddc9]" aria-label="Your progress">
          <span className="flex items-center gap-1 text-ember" title="Daily streak">
            <Flame className="h-4 w-4" aria-hidden />
            {s}
          </span>
          <span className="flex items-center gap-1 text-[#e09400]" title="Experience points">
            <Zap className="h-4 w-4" aria-hidden />
            {hydrated ? p.xp : 0}
          </span>
        </Link>
      </div>
    </header>
  );
}

/** App-style bottom tab bar on small screens */
export function TabBar() {
  const { pathname, focus } = useFocusMode();
  if (focus) return null;
  return (
    <nav className="no-print fixed inset-x-0 bottom-0 z-40 border-t-2 border-sand bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden" aria-label="App">
      <div className="mx-auto grid max-w-md grid-cols-4">
        {TABS.map((t) => {
          const active = t.href === "/" ? pathname === "/" || pathname.startsWith("/worlds") : pathname.startsWith(t.href);
          const Icon = t.icon;
          return (
            <Link key={t.href} href={t.href} className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-extrabold ${active ? "text-sky-deep" : "text-ink-soft"}`}>
              <span className={`flex h-8 w-12 items-center justify-center rounded-xl ${active ? "bg-sky-soft" : ""}`}>
                <Icon className="h-5 w-5" />
              </span>
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function SiteFooter() {
  const { focus } = useFocusMode();
  if (focus) return null;
  return (
    <footer className="no-print mt-12 bg-forest-900 pb-24 text-sm text-[#b9d3e6] sm:mt-16 lg:pb-0">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:grid-cols-[1.5fr_1fr_1fr] sm:px-6 sm:py-12">
        <div>
          <Logo light />
          <p className="mt-3 max-w-sm text-[13px] sm:text-sm">Understand the world that&apos;s changing our future. Progress is saved in your browser only: no account, no tracking.</p>
        </div>
        <div className="hidden space-y-2 sm:block">
          <div className="font-bold text-white">Learn</div>
          <Link href="/" className="block hover:text-white">Journey map</Link>
          <Link href="/start" className="block hover:text-white">Starting diagnostic</Link>
          <Link href="/review" className="block hover:text-white">Review session</Link>
          <Link href="/dashboard" className="block hover:text-white">Dashboard</Link>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 sm:block sm:space-y-2">
          <div className="hidden font-bold text-white sm:block">Explore</div>
          <Link href="/ripple" className="block hover:text-white">Ripple Explorer</Link>
          <Link href="/companies" className="block hover:text-white">Company Explorer</Link>
          <Link href="/capstone" className="block hover:text-white">Capstone challenge</Link>
          <Link href="/sources" className="block hover:text-white">Research &amp; sources</Link>
          <Link href="/about" className="block hover:text-white">About &amp; method</Link>
        </div>
      </div>
    </footer>
  );
}
