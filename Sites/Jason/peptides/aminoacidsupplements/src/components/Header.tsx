'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, SITE_METADATA } from '@/data/site';
import { Menu, X, ShieldCheck, ChevronRight, FlaskConical, Dna, Search } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname() || '/';

  // Helper function to check if a navigation item is active
  const isItemActive = (href: string) => {
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
      {/* Top Clinical Utility Strip (Wider layout) */}
      <div className="bg-[#13111c] text-zinc-300 text-xs py-1.5 border-b border-zinc-800/80 relative z-40">
        <div className="container-ultra-wide flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse flex-shrink-0" />
            <span className="font-mono font-medium text-white tracking-wide text-[11px] sm:text-xs">
              <span className="sm:hidden">UK Chemical Registry:</span>
              <span className="hidden sm:inline">UK &amp; Global Chemical Registry:</span>
            </span>
            <span className="text-zinc-400 hidden md:inline text-xs">Analytical Sequences &amp; In Vitro Standards</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400 text-xs font-mono flex-shrink-0">
            <span className="hidden lg:inline text-zinc-300">MHRA In Vitro Standard (SI 2012/1916)</span>
            <Link
              href="/regulatory/uk-legal-status/"
              className="text-orange-400 hover:text-orange-300 font-semibold underline underline-offset-4 transition-colors text-[11px] sm:text-xs"
            >
              UK Legal Matrix
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar (Expansive Ultra-Wide Row) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-zinc-200/90 shadow-xs transition-all">
        <div className="container-ultra-wide py-3.5 flex items-center justify-between">
          {/* Brand Crest (Divided into two compact rows so header breathes freely) */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-950 flex items-center justify-center text-white shadow-sm shadow-indigo-950/20 group-hover:scale-105 transition-transform border border-indigo-400/20">
              <Dna className="w-5 h-5 text-indigo-200" />
            </div>
            <div className="flex flex-col justify-center leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-zinc-950 group-hover:text-indigo-800 transition-colors">
                  AminoAcid
                </span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-indigo-50 text-indigo-900 border border-indigo-200/80 rounded px-1.5 py-0.5">
                  REGISTRY
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs tracking-tight text-indigo-700">
                  Supplements<span className="text-orange-600 font-mono font-bold">.co</span>
                </span>
                <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">• UK &amp; Global</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                    active
                      ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200/80 shadow-2xs'
                      : 'text-zinc-700 hover:text-indigo-900 hover:bg-zinc-100/80'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
            <Link
              href="/#catalog"
              className="btn-amino-primary text-xs py-2 px-3.5 rounded-xl shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search Registry</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center xl:hidden gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-700 hover:text-indigo-900 hover:bg-zinc-100 transition-colors border border-zinc-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-zinc-200 py-4 px-6 space-y-3 shadow-lg">
            <nav className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => {
                const active = isItemActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
                      active
                        ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200'
                        : 'text-zinc-700 hover:bg-zinc-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </Link>
                );
              })}
            </nav>
            <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
              <Link
                href="/#catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-amino-primary text-xs text-center py-2.5 w-full"
              >
                Search Chemical Registry
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
