import Link from 'next/link';
import { HeroHelix } from '../components/HeroHelix';
import { ChemicalFormulaBadge } from '../components/ChemicalFormulaBadge';
import { PEPTIDE_COMPOUNDS } from '../data/compounds';
import { RESEARCH_CATEGORIES } from '../data/categories';
import { SUPPLIER_PROFILES } from '../data/suppliers';
import { FORMAT_PROFILES } from '../data/formats';
import {
  ShieldCheck,
  Search,
  FlaskConical,
  Beaker,
  Dna,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

export default function HomePage() {
  const flagshipBpc = PEPTIDE_COMPOUNDS.find((c) => c.slug === 'bpc-157');

  return (
    <div className="relative">
      {/* =========================================================================
          HERO SECTION WITH ANIMATED HELIX
      ========================================================================= */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/10 bg-gradient-to-b from-obsidian-950 via-obsidian-900 to-obsidian-950 pt-10 pb-16">
        {/* Animated Peptide Chains Canvas */}
        <HeroHelix />

        {/* Ambient Glow Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-emerald-500/10 blur-[110px] rounded-full pointer-events-none"></div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-850/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 backdrop-blur-md shadow-glow-cyan/20">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>WORLDWIDE PEPTIDE RESEARCH REPOSITORY & LAB MATRIX</span>
          </div>

          {/* Main Hero Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Standardised Peptide Data.{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Independently Audited Suppliers.
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Curated molecular formulas, CAS registries, amino acid sequence ribbons, and verified laboratory vendor links featuring third-party HPLC analytical assays for in vitro academic research.
            </p>
          </div>

          {/* Quick Search & Filter Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative flex items-center glass-panel rounded-2xl p-2 border border-white/15 shadow-2xl focus-within:border-cyan-400 transition-colors">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Search by peptide name, CAS number, or formula (e.g. BPC-157, 137525-51-0)..."
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none font-mono"
              />
              <button
                type="button"
                className="shrink-0 px-5 py-2.5 rounded-xl bg-cyan-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider font-mono hover:bg-cyan-400 transition-colors shadow-glow-cyan/40"
              >
                Search Index
              </button>
            </div>

            {/* Quick Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-mono text-slate-400">
              <span className="text-slate-500">Popular Queries:</span>
              <Link href="/peptides/bpc-157" className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors border border-white/5">
                BPC-157
              </Link>
              <Link href="/peptides/tb-500" className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors border border-white/5">
                TB-500
              </Link>
              <Link href="/peptides/semax" className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors border border-white/5">
                Semax
              </Link>
              <Link href="/peptides/ghk-cu" className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors border border-white/5">
                GHK-Cu
              </Link>
              <Link href="/peptides/cjc-1295" className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors border border-white/5">
                CJC-1295
              </Link>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl glass-panel border border-white/5">
              <div className="text-2xl font-bold font-mono text-cyan-400">≥99.0%</div>
              <div className="text-xs text-slate-400 mt-0.5">HPLC Purity Benchmark</div>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/5">
              <div className="text-2xl font-bold font-mono text-emerald-400">5 Stores</div>
              <div className="text-xs text-slate-400 mt-0.5">Audited Partner Network</div>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/5">
              <div className="text-2xl font-bold font-mono text-white">4 Formats</div>
              <div className="text-xs text-slate-400 mt-0.5">Vials, Pens, Sprays, Blends</div>
            </div>
            <div className="p-4 rounded-xl glass-panel border border-white/5">
              <div className="text-2xl font-bold font-mono text-amber-400">100% RUO</div>
              <div className="text-xs text-slate-400 mt-0.5">Strict Research Compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FLAGSHIP COMPOUND SPOTLIGHT: BPC-157
      ========================================================================= */}
      {flagshipBpc && (
        <section className="py-16 border-b border-white/10 bg-obsidian-900/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-8 sm:p-10 rounded-3xl glass-panel border border-cyan-500/20 bg-gradient-to-br from-obsidian-850 to-obsidian-900 shadow-2xl">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Flagship Reference
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    CAS: {flagshipBpc.casNumber}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {flagshipBpc.name} — Comprehensive Chemical Profile
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {flagshipBpc.shortOverview}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {flagshipBpc.availableFormats.map((fmt) => (
                    <span
                      key={fmt}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-obsidian-950 border border-white/10 text-slate-300"
                    >
                      {FORMAT_PROFILES[fmt].label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-auto shrink-0 flex flex-col gap-4">
                <ChemicalFormulaBadge
                  formula={flagshipBpc.molecularFormula}
                  molecularWeight={flagshipBpc.molecularWeight}
                  casNumber={flagshipBpc.casNumber}
                  pubchemCid={flagshipBpc.pubchemCid}
                  className="w-full lg:w-96"
                />
                <Link
                  href="/peptides/bpc-157"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold font-mono text-obsidian-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-glow-cyan/40"
                >
                  <span>Explore BPC-157 Dossier & Suppliers</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          RESEARCH PATHWAYS CATEGORIES
      ========================================================================= */}
      <section className="py-20 border-b border-white/10 bg-obsidian-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block mb-1">
                Classification System
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Peptide Biological Signaling Pathways
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              Grouped systematically according to cellular receptor affinity, secondary messenger cascades, and documented in vitro tissue targets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESEARCH_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group glass-panel rounded-3xl p-6 border border-white/5 hover:border-cyan-500/30 transition-all hover:-translate-y-1 hover:shadow-glow-cyan/20 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/20">
                      {cat.featuredCompoundSlugs.length} Compounds
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                    Signaling Axis
                  </span>
                  <span className="text-xs font-mono text-slate-300 line-clamp-1">
                    {cat.signalingFocus}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          INDEX OF CATALOGED PEPTIDES
      ========================================================================= */}
      <section className="py-20 border-b border-white/10 bg-obsidian-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                Active Database
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Cataloged Research Compounds
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Showing {PEPTIDE_COMPOUNDS.length} Verified Master Entries
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PEPTIDE_COMPOUNDS.map((compound) => (
              <div
                key={compound.slug}
                className="glass-panel rounded-3xl p-6 border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400">
                      CAS: {compound.casNumber}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-500/20">
                      ≥99.0% Assayed
                    </span>
                  </div>

                  <div>
                    <Link
                      href={`/peptides/${compound.slug}`}
                      className="text-xl font-bold text-white hover:text-cyan-400 transition-colors block"
                    >
                      {compound.name}
                    </Link>
                    <span className="text-xs text-cyan-400 font-mono">
                      {compound.categoryName}
                    </span>
                  </div>

                  {/* Formula ribbon */}
                  <div className="p-2.5 rounded-xl bg-obsidian-950/80 border border-white/5 font-mono text-xs flex items-center justify-between">
                    <span className="text-slate-400">Formula:</span>
                    <span className="text-cyan-300 font-bold">{compound.molecularFormula}</span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {compound.shortOverview}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {compound.availableFormats.map((fmt) => (
                      <span
                        key={fmt}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300"
                      >
                        {FORMAT_PROFILES[fmt].label.split(' ')[0]}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/peptides/${compound.slug}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-200 bg-white/5 hover:bg-cyan-500 hover:text-obsidian-950 transition-all border border-white/10"
                  >
                    <span>Inspect Compound Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          VERIFIED 5-STORE SUPPLIER NETWORK
      ========================================================================= */}
      <section className="py-20 border-b border-white/10 bg-obsidian-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>INDEPENDENT ANALYTICAL AUDITING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Verified Laboratory Supplier Network
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every vendor indexed on Trustly Pharma adheres to documented analytical quality benchmarks, providing HPLC and Mass Spectrometry Certificates of Analysis for each production batch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(SUPPLIER_PROFILES).map((sup) => (
              <div
                key={sup.id}
                className="glass-panel rounded-3xl p-6 border border-white/10 bg-gradient-to-br from-obsidian-850 to-obsidian-900 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">{sup.name}</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">
                      ★ {sup.verifiedScore}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 block -mt-1">
                    {sup.domain}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {sup.reputationSummary}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                      Testing Standards:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {sup.analyticalAssays.map((assay, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-obsidian-950 text-cyan-300 border border-white/5"
                        >
                          {assay}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <a
                    href={sup.baseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-200 bg-white/5 hover:bg-emerald-400 hover:text-obsidian-950 transition-all border border-white/10"
                  >
                    <span>Visit Verified Storefront</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
