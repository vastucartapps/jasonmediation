'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { navItems, topBanner } from '../data/site';
import { SearchModal } from './SearchModal';
import { Beaker, Search, Menu, X, ShieldCheck } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Global Cmd+K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Top Banner Ticker */}
      <div className="bg-[#03132e] border-b border-[rgba(141,168,195,0.18)] py-1.5 px-4 text-center text-xs text-slate-300">
        <div className="container-wide flex items-center justify-between font-mono text-[11px]">
          <span className="hidden sm:inline text-slate-300">
            {topBanner.desktop}
          </span>
          <span className="sm:hidden text-slate-300">
            {topBanner.mobile}
          </span>
          <Link
            href={topBanner.href}
            className="text-amber-400 hover:text-amber-300 transition-colors font-semibold"
          >
            {topBanner.highlight} →
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#02102b]/95 border-b border-[rgba(141,168,195,0.22)] shadow-sm">
        <div className="container-wide flex items-center justify-between py-3.5 gap-3">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500/20 to-emerald-500/20 border border-sky-500/30 flex items-center justify-center group-hover:border-sky-400 transition-colors">
              <Beaker className="w-5 h-5 text-sky-400 group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center">
                TRUSTLY<span className="text-sky-400">PHARMA</span>
              </span>
              <span className="block text-[10px] font-mono tracking-wider text-slate-300 uppercase -mt-0.5">
                UK & Global Peptide Index
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-xs font-semibold">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  item.primary
                    ? 'gold-pill px-3.5 xl:px-4 py-2 rounded-full shadow-sm transition-all whitespace-nowrap'
                    : 'nav-pill px-3 xl:px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap'
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action: Search Bar & Mobile Toggle */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Desktop Quick Search Pill */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="hidden md:inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#03132e] hover:bg-[#071f48] border border-[rgba(141,168,195,0.28)] hover:border-sky-400/60 text-slate-300 hover:text-white text-xs font-mono transition-all group shadow-inner"
              aria-label="Search chemical index by name, CAS or vendor (Shortcut: Ctrl+K or Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline text-slate-300">Search chemical index...</span>
              <span className="xl:hidden text-slate-300">Search index...</span>
              <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-800/90 border border-slate-700 text-[10px] text-slate-300 font-sans shadow-sm">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            {/* Mobile Search Icon Button */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[rgba(141,168,195,0.25)] text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
              aria-label="Search chemical index"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[rgba(141,168,195,0.25)] text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal open={searchModalOpen} onClose={() => setSearchModalOpen(false)} />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="lg:hidden fixed inset-0 z-50 bg-[#02102b] p-6 overflow-y-auto border-t border-slate-800"
        >
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
              <Beaker className="w-6 h-6 text-sky-400" />
              <span className="text-lg font-bold text-white">TRUSTLYPHARMA</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-400 hover:text-white"
              aria-label="Close mobile menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Search inside Drawer */}
          <div className="mt-5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchModalOpen(true);
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#03132e] border border-sky-500/30 text-slate-200 text-sm font-mono"
            >
              <span className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-sky-400" />
                <span>Search chemical index & CAS...</span>
              </span>
              <kbd className="px-2 py-0.5 rounded bg-slate-800 text-xs text-sky-300 font-sans border border-slate-700">
                ⌘K
              </kbd>
            </button>
          </div>

          <nav className="mt-6 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold ${
                  item.primary
                    ? 'gold-pill text-center font-bold'
                    : 'bg-[#103059] text-sky-200 border border-[rgba(141,168,195,0.2)]'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block px-2 font-semibold">
                Institutional & Scientific
              </span>
              <Link
                href="/about/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-xs font-mono text-slate-200 hover:text-white bg-[#071b3e]"
              >
                About & Methodology
              </Link>
              <Link
                href="/safety/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-xs font-mono text-emerald-400 hover:text-emerald-300 bg-[#071b3e]"
              >
                Research Safety Policy
              </Link>
              <Link
                href="/contact/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-xs font-mono text-sky-400 hover:text-sky-300 bg-[#071b3e]"
              >
                Institutional Contact Desk
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
