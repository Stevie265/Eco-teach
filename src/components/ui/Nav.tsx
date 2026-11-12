"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Map, User, Waves, Zap } from "lucide-react";
import { streak, useHydrated, useProgress } from "@/lib/progress";

const LINKS = [
  { href: "/", label: "Journey" },
  { href: "/breakthroughs", label: "Breakthroughs" },
  { href: "/ripple", label: "Ripple Explorer" },
  { href: "/companies", label: "Companies" },
  { href: "/capstone", label: "Capstone" },
  { href: "/sources", label: "Sources" },
];

const TABS = [
  { href: "/", label: "Journey", icon: Map },
  { href: "/breakthroughs", label: "Tech", icon: Zap },
  { href: "/ripple", label: "Ripple", icon: Waves },
  { href: "/dashboard", label: "Me", icon: User },
];

/** The Eco-teach mark: a leaf with circuit-wire veins whose stem ends in a plug. */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden>
      <defs>
        <pattern id="logo-ht" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <circle cx="7" cy="7" r="2.6" fill="#1b2a4a" opacity=".28" />
        </pattern>
        <clipPath id="logo-leaf">
          <path d="M146 318 C146 168 246 82 392 78 C396 232 306 318 146 318Z" />
        </clipPath>
      </defs>
      <rect x="10" y="10" width="492" height="492" rx="112" fill="#ffc83d" stroke="#1b2a4a" strokeWidth="20" />
      <g transform="translate(256 262) scale(.86) translate(-256 -262)">
        <path d="M162 334 C162 184 262 98 408 94 C412 248 322 334 162 334Z" fill="#1b2a4a" />
        <path d="M146 318 C146 168 246 82 392 78 C396 232 306 318 146 318Z" fill="#2fa560" stroke="#1b2a4a" strokeWidth="18" strokeLinejoin="round" />
        <g clipPath="url(#logo-leaf)">
          <path d="M146 318 L392 78 L392 318Z" fill="url(#logo-ht)" />
        </g>
        <g fill="none" stroke="#1b2a4a" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round">
          <path d="M146 318 L352 118" />
          <path d="M222 244 V176" />
          <path d="M288 180 H338" />
        </g>
        <circle cx="222" cy="170" r="15" fill="#fffdf7" stroke="#1b2a4a" strokeWidth="10" />
        <circle cx="344" cy="180" r="15" fill="#fffdf7" stroke="#1b2a4a" strokeWidth="10" />
        <path d="M146 318 V350" stroke="#1b2a4a" strokeWidth="16" strokeLinecap="round" />
        <rect x="104" y="350" width="84" height="62" rx="12" fill="#fffdf7" stroke="#1b2a4a" strokeWidth="16" />
        <path d="M128 412 V446 M164 412 V446" stroke="#1b2a4a" strokeWidth="16" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="h-8 w-8 sm:h-9 sm:w-9" />
      <span className={`font-display text-xl tracking-tight sm:text-[22px] ${light ? "text-white" : "text-ink"}`}>Eco-teach</span>
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
    <header className="no-print sticky top-0 z-40 border-b-[1.5px] border-ink bg-paper/90 backdrop-blur-lg">
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
        <Link href="/dashboard" className="flex items-center gap-3 rounded-2xl plate bg-white px-3 py-1.5 text-sm font-extrabold" aria-label="Your progress">
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
    <nav className="no-print fixed inset-x-0 bottom-0 z-40 border-t-[1.5px] border-ink bg-[#fffdf7]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden" aria-label="App">
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
          <Link href="/breakthroughs" className="block hover:text-white">Breakthrough Breakdown</Link>
          <Link href="/dashboard" className="block hover:text-white">Dashboard</Link>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 sm:block sm:space-y-2">
          <div className="hidden font-bold text-white sm:block">Explore</div>
          <Link href="/ripple" className="block hover:text-white">Ripple Explorer</Link>
          <Link href="/companies" className="block hover:text-white">Company Explorer</Link>
          <Link href="/capstone" className="block hover:text-white">Capstone challenge</Link>
          <Link href="/sources" className="block hover:text-white">Research &amp; sources</Link>
          <Link href="/about" className="block hover:text-white">About &amp; method</Link>
          <Link href="/design" className="block hover:text-white">Design language</Link>
        </div>
      </div>
    </footer>
  );
}
