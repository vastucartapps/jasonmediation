'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  FlaskConical,
  Activity,
  CheckCircle2,
  FileCheck2,
  TrendingUp,
  Scale,
  Sparkles,
  ArrowRight,
  Dna,
} from 'lucide-react';

const QUICK_LOOKUP = [
  { name: 'BPC-157', cas: '137525-51-0', slug: 'bpc-157' },
  { name: 'TB-500', cas: '77591-33-4', slug: 'tb-500' },
  { name: 'Semax', cas: '80714-61-0', slug: 'semax' },
  { name: 'GHK-Cu', cas: '49557-75-7', slug: 'ghk-cu' },
  { name: 'MOTS-c', cas: '1627580-64-6', slug: 'mots-c' },
  { name: 'Tirzepatide', cas: '2023788-19-2', slug: 'tirzepatide' },
];

export function ClinicalHero() {
  const [activeCompound, setActiveCompound] = useState<'bpc157' | 'tb500' | 'semax'>('bpc157');

  const compoundDetails = {
    bpc157: {
      name: 'BPC-157 Pentadecapeptide',
      cas: '137525-51-0',
      formula: 'C62H98N16O22',
      mw: '1419.55 g/mol',
      purity: '99.2%',
      sequenceList: ['Gly', 'Glu', 'Pro', 'Pro', 'Pro', 'Gly', 'Lys', 'Pro', 'Ala', 'Asp', 'Asp', 'Ala', 'Gly', 'Leu', 'Val'],
      indication: 'VEGFR2 & FAK-Paxillin Cytoskeletal Activation',
      testingMethod: 'Reverse-Phase HPLC & ESI-MS Dual Assay',
      status: 'Analytical Reference Standard Certified',
      slug: 'bpc-157',
    },
    tb500: {
      name: 'TB-500 Active Hexapeptide',
      cas: '77591-33-4',
      formula: 'C212H350N56O78S',
      mw: '4963.50 g/mol',
      purity: '99.1%',
      sequenceList: ['Ac-Leu', 'Lys', 'Lys', 'Thr', 'Glu', 'Thr-OH'],
      indication: 'G-Actin Monomer Sequestration & Motility',
      testingMethod: 'C18 Reverse-Phase HPLC & MS/MS',
      status: 'Analytical Reference Standard Certified',
      slug: 'tb-500',
    },
    semax: {
      name: 'Semax Neuro-Heptapeptide',
      cas: '80714-61-0',
      formula: 'C37H51N9O10S',
      mw: '813.92 g/mol',
      purity: '99.4%',
      sequenceList: ['Met', 'Glu', 'His', 'Phe', 'Pro', 'Gly', 'Pro'],
      indication: 'Hippocampal BDNF/TrkB Axis Upregulation',
      testingMethod: 'Ion-Exchange HPLC & Spectrometry',
      status: 'Analytical Reference Standard Certified',
      slug: 'semax',
    },
  };

  const current = compoundDetails[activeCompound];

  return (
    <section className="relative overflow-hidden border-b border-slate-200/90 bg-gradient-to-b from-[#f8fafc] via-white to-[#f1f5f9] bg-benzene-washout py-8 sm:py-10 md:py-12">
      {/* Background Soft Accent Orbs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-6 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Clinical Briefing */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-[0_4px_25px_-5px_rgba(15,23,42,0.06)] space-y-5">
            {/* Top UK Clinical Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-700" />
              </span>
              <span>UK Clinical &amp; Academic Registry</span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-800">In Vitro Only</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              The British Clinical &amp; Academic{' '}
              <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-sky-700 bg-clip-text text-transparent">
                Peptide Directory
              </span>
            </h1>

            {/* Clinical Lede Paragraph */}
            <p className="border-l-3 border-emerald-700 pl-4 bg-emerald-50/50 py-2.5 rounded-r-xl text-slate-800 text-sm sm:text-base leading-relaxed">
              Curated PubChem molecular profiles, peer-reviewed PubMed citations, verified laboratory
              preparation standard operating procedures, and independent commercial vendor directories for
              scientific research across the United Kingdom.
            </p>

            {/* Key Trust Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">12</div>
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Compounds</div>
              </div>
              <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-800">≥98.5%</div>
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">HPLC Purity</div>
              </div>
              <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-mono text-sky-800">5</div>
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">UK Suppliers</div>
              </div>
              <div className="p-3 bg-slate-50/90 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">300+</div>
                <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">PubMed PMIDs</div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/#catalog"
                className="px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-700/25 transition-all hover:scale-[1.02] inline-flex items-center gap-2"
              >
                <span>Explore Reagents A–Z</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/vendors/"
                className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-xs font-mono transition-all shadow-xs"
              >
                Compare 5 UK Suppliers
              </Link>
              <Link
                href="/regulatory/uk-legal-status/"
                className="px-5 py-3 rounded-full bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-900 font-bold text-xs font-mono transition-all shadow-xs"
              >
                UK Legal Status
              </Link>
            </div>

            {/* Quick Peptide Jump Pills */}
            <div className="pt-2 border-t border-slate-200">
              <span className="text-[11px] font-mono uppercase text-slate-700 tracking-wider font-bold block mb-2">
                Quick Compound Lookup:
              </span>
              <div className="flex flex-wrap gap-2">
                {QUICK_LOOKUP.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/peptides/${p.slug}/`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-50/80 border border-slate-300 hover:border-emerald-400 text-xs font-mono text-slate-800 hover:text-emerald-900 transition-all shadow-xs"
                  >
                    <span className="font-bold text-slate-900">{p.name}</span>
                    <span className="text-[10px] text-slate-700 font-medium">CAS {p.cas}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Real-Time Assay Dashboard Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-[0_10px_35px_-5px_rgba(15,23,42,0.08)] space-y-4 relative">
              {/* Card Header & Compound Switcher */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700">
                    Analytical Assay Card
                  </span>
                </div>
                {/* Compound Toggles */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setActiveCompound('bpc157')}
                    className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded-md transition-all ${
                      activeCompound === 'bpc157'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    BPC
                  </button>
                  <button
                    onClick={() => setActiveCompound('tb500')}
                    className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded-md transition-all ${
                      activeCompound === 'tb500'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    TB-4
                  </button>
                  <button
                    onClick={() => setActiveCompound('semax')}
                    className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded-md transition-all ${
                      activeCompound === 'semax'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    SEMAX
                  </button>
                </div>
              </div>

              {/* Compound Headline */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-bold uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                  <span>Reference Lot: UK-2026-LOT</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">{current.name}</h2>
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="font-mono text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md border border-slate-300 font-semibold">
                    CAS {current.cas}
                  </span>
                  <span className="font-mono text-xs bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-300 font-bold">
                    HPLC {current.purity}
                  </span>
                  <span className="font-mono text-xs bg-sky-50 text-sky-900 px-2.5 py-1 rounded-md border border-sky-300 font-semibold">
                    {current.mw}
                  </span>
                </div>
              </div>

              {/* Chemical Specifications Data Matrix */}
              <div className="bg-slate-50/90 rounded-xl border border-slate-200 p-4 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between items-center py-0.5 border-b border-slate-200 pb-1.5">
                  <span className="text-slate-700 font-semibold">Formula:</span>
                  <span className="font-bold text-sky-900 formula-chip">{current.formula}</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-slate-200 pb-1.5">
                  <span className="text-slate-700 font-semibold">Methodology:</span>
                  <span className="font-semibold text-slate-900">{current.testingMethod}</span>
                </div>
                <div className="flex justify-between items-start py-0.5 border-b border-slate-200 pb-1.5">
                  <span className="text-slate-700 font-semibold">Signaling Axis:</span>
                  <span className="font-semibold text-slate-900 text-right max-w-[210px]">{current.indication}</span>
                </div>
                <div className="pt-1.5">
                  <div className="flex items-center gap-1 text-[11px] text-slate-700 font-semibold mb-1.5">
                    <Dna className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Sequence Residues ({current.sequenceList.length}):</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {current.sequenceList.map((res, i) => (
                      <span
                        key={i}
                        className="bg-white px-2 py-0.5 rounded text-[10px] font-bold text-emerald-950 border border-emerald-400 shadow-2xs"
                      >
                        {res}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quality Standards & Verification Footer */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                    <span>ISO 17025 Third-Party Chromatography</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-800">PASS</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                    <span>Neutral Borosilicate Type I Glass</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-800">PASS</span>
                </div>
              </div>

              {/* Direct Dossier Link Button */}
              <Link
                href={`/peptides/${current.slug}/`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all shadow-md shadow-emerald-700/20"
              >
                <span>View Full {current.name} Monograph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
