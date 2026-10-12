'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NAV_ITEMS, SITE_METADATA } from '@/data/site';
import { Menu, X, ShieldCheck, Search, ChevronRight } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Clinical Utility Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="container-wide flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono font-medium text-slate-200">UK Laboratory Dispatch:</span>
            <span className="text-slate-400 hidden sm:inline">Royal Mail Tracked 24 &amp; Cold-Chain Priority</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs font-mono">
            <span className="hidden md:inline">MHRA In Vitro Standard (SI 2012/1916)</span>
            <Link href="/regulatory/uk-legal-status/" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
              Legal Status
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container-wide py-3.5 flex items-center justify-between">
        {/* Brand Crest */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                Peptides<span className="text-emerald-600">UK</span>
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded px-1.5 py-0.5">
                .org
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 tracking-tight mt-0.5">
              British Clinical Chemical Registry
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all ${
                item.primary
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/#catalog"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Catalog
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 shadow-lg animate-fadeIn">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/50 transition-colors"
            >
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 font-mono text-xs text-slate-500">
            <div>Jurisdiction: United Kingdom (MHRA)</div>
            <Link
              href="/regulatory/uk-legal-status/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-emerald-600 font-semibold hover:underline"
            >
              View UK Legal Status Matrix →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
