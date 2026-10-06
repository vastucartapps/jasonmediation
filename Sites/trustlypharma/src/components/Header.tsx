'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Beaker, Shield, Search, ChevronDown, Menu, X, ExternalLink } from 'lucide-react';
import { RESEARCH_CATEGORIES } from '../data/categories';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-obsidian-900/90 backdrop-blur-xl">
      {/* Top micro-bar for regulatory RUO compliance */}
      <div className="bg-obsidian-950/80 border-b border-white/5 py-1 px-4 text-center text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5 font-mono">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          <strong className="text-amber-400 font-semibold">LABORATORY RESEARCH USE ONLY:</strong> All cataloged compounds and citations are intended strictly for in vitro and academic experimentation. Not for human or clinical consumption.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 via-obsidian-800 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-400 transition-colors shadow-glow-cyan/20">
              <Beaker className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
                TRUSTLY<span className="text-cyan-400">PHARMA</span>
              </span>
              <span className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase -mt-1">
                Peptide Index & Supplier Matrix
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Compound Index
            </Link>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                onBlur={() => setTimeout(() => setCategoriesOpen(false), 200)}
                className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                <span>Research Pathways</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {categoriesOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-xl bg-obsidian-850/95 border border-white/10 shadow-2xl p-2 z-50 backdrop-blur-2xl">
                  {RESEARCH_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="block px-3 py-2 rounded-lg text-xs hover:bg-white/5 transition-colors"
                    >
                      <div className="font-semibold text-slate-200">{cat.name}</div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">{cat.signalingFocus}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/peptides/bpc-157"
              className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              Flagship: BPC-157
            </Link>

            <Link
              href="/suppliers"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Verified Suppliers
            </Link>

            <Link
              href="/formats"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Formats (Vials/Pens/Sprays)
            </Link>
          </nav>

          {/* Right Action & Search */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search CAS, formula, peptide..."
                className="w-56 bg-obsidian-950/70 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
              />
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/30 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>5 Verified Partners</span>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-obsidian-950/95 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 py-1"
          >
            Compound Index
          </Link>
          <div className="text-xs uppercase font-mono text-slate-500 pt-2">Pathways</div>
          {RESEARCH_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs text-slate-300 pl-3 py-1"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/peptides/bpc-157"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-cyan-400 py-1"
          >
            Flagship: BPC-157 Profile
          </Link>
          <Link
            href="/suppliers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 py-1"
          >
            Verified 5-Store Supplier Matrix
          </Link>
          <Link
            href="/formats"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 py-1"
          >
            Delivery Formats (Vials, Pens, Sprays, Stacks)
          </Link>
        </div>
      )}
    </header>
  );
}
