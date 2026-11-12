"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Flame, Menu, X } from "lucide-react";
import { streak, useHydrated, useProgress } from "@/lib/progress";

const LINKS = [
  { href: "/", label: "Map" },
  { href: "/ripple", label: "Ripple Explorer" },
  { href: "/companies", label: "Companies" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/sources", label: "Sources" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
        <circle cx="16" cy="16" r="15" fill="#153628" />
        <path d="M9 21c0-7 5-12 14-12 0 8-5 13-12 13" fill="none" stroke="#c6e66a" strokeWidth="2.4" strokeLinecap="round" />
        <path d="m15 13-3 5h4l-2 5" fill="none" stroke="#eeb33f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-display text-xl font-semibold text-forest-800">
        Eco<span className="text-moss-500">·</span>teach
      </span>
    </span>
  );
}

export function Nav() {
  const p = useProgress();
  const hydrated = useHydrated();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const s = hydrated ? streak(p) : 0;

  return (
    <header className="no-print sticky top-0 z-40 border-b border-sand/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Eco-teach home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${active ? "bg-forest-800 text-paper" : "text-ink-soft hover:bg-paper-2 hover:text-ink"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-full border border-sand bg-white/70 px-3 py-1.5 text-sm" aria-label="Your progress">
            <span className="flex items-center gap-1 font-semibold text-ember" title="Daily streak">
              <Flame className="h-4 w-4" aria-hidden />
              {hydrated ? s : 0}
            </span>
            <span className="h-4 w-px bg-sand" />
            <span className="font-mono text-xs font-semibold text-forest-700" title="Experience points">
              {hydrated ? p.xp : 0} XP
            </span>
          </Link>
          <button className="rounded-full p-2 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-sand bg-paper px-4 pb-4 md:hidden" aria-label="Mobile">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block border-b border-sand/60 py-3 font-medium text-ink">
              {l.label}
            </Link>
          ))}
          <Link href="/capstone" onClick={() => setOpen(false)} className="block py-3 font-medium text-ink">
            Capstone
          </Link>
        </nav>
      )}
    </header>
  );
}
