'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, SITE_METADATA } from '@/data/site';
import { Menu, X, ShieldCheck, ChevronRight, FlaskConical, Scale } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname() || '/';

  // Helper function to check if a navigation item is active
  const isItemActive = (href: string) => {
    // Anchor jump links on the homepage should never be marked as active pages
    if (href.includes('#')) {
      return false;
    }
    const cleanHref = href.replace(/\/$/, '');
    const cleanPath = pathname.replace(/\/$/, '');
    if (cleanHref === '') return cleanPath === '';
    return cleanPath === cleanHref || cleanPath.startsWith(cleanHref + '/');
  };

  return (
    <>
      {/* Top Clinical Utility Strip (static at top) */}
      <div className="bg-[#0a192f] text-slate-200 text-xs py-1.5 px-4 sm:px-6 border-b border-slate-800 relative z-40">
        <div className="container-wide flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono font-medium text-slate-100">UK Laboratory Dispatch:</span>
            <span className="text-slate-300 hidden sm:inline">Royal Mail Tracked 24 &amp; Cold-Chain Priority</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-xs font-mono">
            <span className="hidden md:inline">MHRA In Vitro Standard (SI 2012/1916)</span>
            <Link
              href="/regulatory/uk-legal-status/"
              className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 transition-colors"
            >
              UK Legal Matrix
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Frosted Glass Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-xs transition-all">
        <div className="container-wide py-3 flex items-center justify-between">
          {/* Brand Crest */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform border border-emerald-500/20">
              <FlaskConical className="w-5 h-5 text-emerald-100" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                  Peptides<span className="text-emerald-600">UK</span>
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300/80 rounded px-1.5 py-0.5">
                  .org
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 tracking-tight mt-0.5">
                British Clinical Chemical Registry
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item.href);
              const isRegulatory = item.href === '/regulatory/';

              if (isRegulatory) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold tracking-tight transition-all ${
                      active
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-sky-50 text-sky-800 border border-sky-300/70 hover:bg-sky-100 shadow-2xs'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5 text-sky-700" />
                    <span>{item.label}</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all ${
                    active
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/#catalog"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-xs"
            >
              Catalog
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-4 py-4 space-y-2 shadow-xl animate-fadeIn">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`w-4 h-4 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                </Link>
              );
            })}
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2 font-mono text-xs text-slate-500">
              <div>Jurisdiction: United Kingdom (MHRA / Home Office)</div>
              <Link
                href="/regulatory/uk-legal-status/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-emerald-700 font-semibold hover:underline"
              >
                View UK Legal Status Matrix →
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
