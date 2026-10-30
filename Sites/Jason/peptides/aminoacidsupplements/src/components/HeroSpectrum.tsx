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
  Layers,
  Search,
} from 'lucide-react';

const QUICK_LOOKUP = [
  { name: 'BPC-157', cas: '137525-51-0', slug: 'bpc-157' },
  { name: 'TB-500', cas: '77591-33-4', slug: 'tb-500' },
  { name: 'Semax', cas: '80714-61-0', slug: 'semax' },
  { name: 'GHK-Cu', cas: '49557-75-7', slug: 'ghk-cu' },
  { name: 'MOTS-c', cas: '1627580-64-6', slug: 'mots-c' },
  { name: 'Tirzepatide', cas: '2023788-19-2', slug: 'tirzepatide' },
];

export function HeroSpectrum() {
  const [activeCompound, setActiveCompound] = useState<'bpc157' | 'tb500' | 'ghkcu'>('bpc157');

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
    ghkcu: {
      name: 'GHK-Cu Copper Tripeptide',
      cas: '49557-75-7',
      formula: 'C14H24CuN6O4',
      mw: '403.92 g/mol',
      purity: '99.5%',
      sequenceList: ['Gly', 'His', 'Lys', 'Cu(II)'],
      indication: 'Extracellular Matrix Synthesis & Collagen I/III',
      testingMethod: 'Atomic Absorption Spectroscopy & HPLC',
      status: 'Analytical Reference Standard Certified',
      slug: 'ghk-cu',
    },
  };

  const current = compoundDetails[activeCompound];

  return (
    <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-zinc-200/90 bg-zinc-50/60 bg-washout-formula max-w-full">
      {/* Background Decorative Gradient Orbs (Desktop only to prevent horizontal overflow on mobile) */}
      <div className="hidden sm:block absolute top-0 right-10 w-[600px] h-[600px] bg-indigo-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="hidden sm:block absolute bottom-0 left-10 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container-ultra-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authority Copy & Quick Lookups */}
          <div className="lg:col-span-7 space-y-7">
            {/* Regulatory Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge-amino-copper">
                <Dna className="w-3.5 h-3.5 text-orange-600" />
                ACADEMIC &amp; ANALYTICAL CHEMICAL REGISTRY
              </span>
              <span className="badge-amino-indigo">
                <Scale className="w-3.5 h-3.5 text-indigo-700" />
                UK SI 2012/1916 COMPLIANT
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight leading-[1.15] break-words">
                British &amp; Global Analytical <span className="text-indigo-700">Amino Acid</span> &amp; <span className="text-orange-700">Peptide Register</span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed max-w-2xl">
                Independent chemical monograph registry documenting synthetic peptide sequences, verified CAS identifiers, molecular formulas, HPLC purity standards, and audited laboratory chemical suppliers across the UK &amp; Europe.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <Link
                href="/#catalog"
                className="btn-amino-primary text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl w-full sm:w-auto text-center"
              >
                <FlaskConical className="w-4 h-4 flex-shrink-0" />
                <span>Explore 12 Chemical Monographs</span>
              </Link>
              <Link
                href="/vendors/"
                className="btn-amino-copper text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl w-full sm:w-auto text-center"
              >
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Verified Supplier Audits</span>
              </Link>
              <Link
                href="/blog/"
                className="btn-amino-secondary text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl w-full sm:w-auto text-center"
              >
                <span>Research Blog</span>
                <ArrowRight className="w-4 h-4 text-indigo-700 flex-shrink-0" />
              </Link>
            </div>

            {/* Quick Lookup Bar */}
            <div className="pt-5 border-t border-zinc-200 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900">
                  Quick Compound Directory (Direct CAS Indices):
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_LOOKUP.map((q) => (
                  <Link
                    key={q.slug}
                    href={`/peptides/${q.slug}/`}
                    className="group inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium bg-white text-zinc-900 border border-zinc-300 shadow-2xs hover:border-indigo-600 hover:shadow-xs hover:bg-indigo-50/50 hover:-translate-y-0.5 transition-all"
                  >
                    <span className="font-bold text-zinc-950 group-hover:text-indigo-900 transition-colors">
                      {q.name}
                    </span>
                    <span className="font-mono text-[10px] font-semibold text-indigo-700 bg-indigo-50/80 px-1.5 py-0.5 rounded border border-indigo-100/80 group-hover:bg-indigo-100/80 group-hover:text-indigo-950 transition-colors">
                      CAS {q.cas}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Molecular Identity Monograph Card */}
          <div className="lg:col-span-5 w-full max-w-full">
            <div className="amino-card bg-white p-4 sm:p-8 shadow-am-elevated border-2 border-indigo-100 w-full max-w-full">
              {/* Header Tab Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping flex-shrink-0" />
                  <span className="text-xs font-mono font-bold text-zinc-950 uppercase tracking-wider">
                    Live Analytical Specimen
                  </span>
                </div>
                {/* Compound Selector Pills */}
                <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg text-xs font-mono self-start sm:self-auto">
                  {(['bpc157', 'tb500', 'ghkcu'] as const).map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setActiveCompound(k)}
                      className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md transition-all font-bold ${
                        activeCompound === k
                          ? 'bg-indigo-700 text-white shadow-xs'
                          : 'text-zinc-700 hover:text-zinc-950'
                      }`}
                    >
                      {k === 'bpc157' ? 'BPC-157' : k === 'tb500' ? 'TB-500' : 'GHK-Cu'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compound Details */}
              <div className="py-5 sm:py-6 space-y-4 sm:space-y-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight break-words">
                    {current.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-700 pt-1">
                    <span>CAS {current.cas}</span>
                    <span className="hidden sm:inline">&bull;</span>
                    <span className="font-semibold text-indigo-700">PubChem CID Verified</span>
                  </div>
                </div>

                {/* Formula Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 p-3 sm:p-3.5 bg-zinc-50 rounded-xl border border-zinc-100 text-xs font-mono">
                  <div>
                    <span className="text-zinc-600 block text-[10px] uppercase">Molecular Formula</span>
                    <span className="font-bold text-zinc-900 break-all">{current.formula}</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 block text-[10px] uppercase">Molecular Weight</span>
                    <span className="font-bold text-zinc-900">{current.mw}</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 block text-[10px] uppercase">HPLC Purity Baseline</span>
                    <span className="font-bold text-orange-700">{current.purity} Analytical Grade</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 block text-[10px] uppercase">Assay Standard</span>
                    <span className="font-bold text-zinc-900">RP-HPLC &amp; ESI-MS</span>
                  </div>
                </div>

                {/* Sequence String */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-700 block">
                    Amino Acid Sequence String:
                  </span>
                  <div className="flex flex-wrap gap-1 p-2 bg-indigo-50/50 rounded-lg border border-indigo-100">
                    {current.sequenceList.map((res, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-mono font-bold bg-white text-indigo-900 border border-indigo-200/80 shadow-2xs"
                      >
                        {res}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Signaling Indication */}
                <div className="p-3 rounded-lg bg-orange-50/60 border border-orange-100 text-xs text-orange-950">
                  <span className="font-bold block mb-0.5">Primary Signaling Pathway:</span>
                  <span>{current.indication}</span>
                </div>
              </div>

              {/* View Full Monograph Link */}
              <div className="pt-2">
                <Link
                  href={`/peptides/${current.slug}/`}
                  className="w-full flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-zinc-950 text-white hover:bg-indigo-900 text-xs sm:text-sm font-semibold transition-all group"
                >
                  <span>Open Complete Research Monograph</span>
                  <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
