'use client';

import Link from 'next/link';
import { useState } from 'react';
import { navItems, topBanner } from '../data/site';
import { SearchModal } from './SearchModal';
import { Beaker, Search, Menu, X, ShieldCheck } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <>
      {/* Top Banner Ticker */}
      <div className="bg-[#03132e] border-b border-[rgba(141,168,195,0.18)] py-1.5 px-4 text-center text-xs text-slate-300">
        <div className="container-wide flex items-center justify-between font-mono text-[11px]">
          <span className="hidden sm:inline text-slate-400">
            {topBanner.desktop}
          </span>
          <span className="sm:hidden text-slate-400">
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
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#02102b]/90 border-b border-[rgba(141,168,195,0.18)]">
        <div className="container-wide flex items-center justify-between py-3.5">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500/20 to-emerald-500/20 border border-sky-500/30 flex items-center justify-center group-hover:border-sky-400 transition-colors">
              <Beaker className="w-5 h-5 text-sky-400 group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center">
                TRUSTLY<span className="text-sky-400">PHARMA</span>
              </span>
              <span className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase -mt-1">
                UK & Global Peptide Index
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-2 text-xs font-semibold">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  item.primary
                    ? 'gold-pill px-4 py-2 rounded-full shadow-sm transition-all whitespace-nowrap'
                    : 'nav-pill px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap'
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action: Search & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[rgba(141,168,195,0.25)] text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
              aria-label="Search peptides or sellers"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[rgba(141,168,195,0.25)] text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal open={searchModalOpen} onClose={() => setSearchModalOpen(false)} />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#02102b] p-6 overflow-y-auto border-t border-slate-800">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
              <Beaker className="w-6 h-6 text-sky-400" />
              <span className="text-lg font-bold text-white">TRUSTLYPHARMA</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
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
                    : 'bg-[#103059] text-sky-300 border border-[rgba(141,168,195,0.2)]'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block px-2">
                Institutional & Scientific
              </span>
              <Link
                href="/about/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-[#071b3e]"
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
