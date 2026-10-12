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
} from 'lucide-react';

export function ClinicalHero() {
  const [activeCompound, setActiveCompound] = useState<'bpc157' | 'tb500' | 'semax'>('bpc157');

  const compoundDetails = {
    bpc157: {
      name: 'BPC-157 Pentadecapeptide',
      cas: '137525-51-0',
      formula: 'C62H98N16O22',
      mw: '1419.55 g/mol',
      purity: '99.2%',
      sequence: 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val',
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
      sequence: 'Ac-Leu-Lys-Lys-Thr-Glu-Thr-OH',
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
      sequence: 'Met-Glu-His-Phe-Pro-Gly-Pro',
      indication: 'Hippocampal BDNF/TrkB Axis Upregulation',
      testingMethod: 'Ion-Exchange HPLC & Spectrometry',
      status: 'Analytical Reference Standard Certified',
      slug: 'semax',
    },
  };

  const current = compoundDetails[activeCompound];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/80">
      {/* Background Soft Accent Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Clinical Briefing */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top UK Clinical Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-mono font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>United Kingdom Clinical &amp; Academic Registry</span>
              <span className="text-emerald-400">|</span>
              <span className="text-emerald-700 font-bold">In Vitro Only</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              The British Clinical &amp; Academic{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 bg-clip-text text-transparent">
                Peptide Directory
              </span>
            </h1>

            {/* Clinical Lede Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Curated PubChem molecular profiles, peer-reviewed PubMed citations, verified laboratory
              preparation standard operating procedures, and independent commercial vendor directories for
              scientific research across the United Kingdom.
            </p>

            {/* Key Trust Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-sm">
                <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">12</div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Compounds</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-sm">
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600">≥98.5%</div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">HPLC Purity</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-sm">
                <div className="text-xl sm:text-2xl font-bold font-mono text-blue-600">5</div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">UK Suppliers</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-sm">
                <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">300+</div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">PubMed PMIDs</div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/#catalog"
                className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-all shadow-md shadow-emerald-700/20 hover:-translate-y-0.5"
              >
                Explore Reagents A–Z →
              </Link>
              <Link
                href="/vendors/"
                className="px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-sm hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm hover:-translate-y-0.5"
              >
                Compare 5 UK Suppliers
              </Link>
              <Link
                href="/#calculator"
                className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-all"
              >
                Dilution Calculator
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Real-Time Assay Dashboard Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xl shadow-slate-200/50 space-y-5 relative">
              {/* Card Header & Compound Switcher */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-emerald-600" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700">
                    Live Analytical Assay Card
                  </span>
                </div>
                {/* Compound Toggles */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveCompound('bpc157')}
                    className={`px-2 py-1 text-[11px] font-mono font-bold rounded ${
                      activeCompound === 'bpc157'
                        ? 'bg-white text-emerald-700 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    BPC
                  </button>
                  <button
                    onClick={() => setActiveCompound('tb500')}
                    className={`px-2 py-1 text-[11px] font-mono font-bold rounded ${
                      activeCompound === 'tb500'
                        ? 'bg-white text-emerald-700 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    TB-4
                  </button>
                  <button
                    onClick={() => setActiveCompound('semax')}
                    className={`px-2 py-1 text-[11px] font-mono font-bold rounded ${
                      activeCompound === 'semax'
                        ? 'bg-white text-emerald-700 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    SEMAX
                  </button>
                </div>
              </div>

              {/* Compound Headline */}
              <div>
                <div className="text-xs font-mono text-emerald-600 font-bold uppercase tracking-wide">
                  Active Reference Lot: UK-2026-LOT
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{current.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-mono text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                    CAS {current.cas}
                  </span>
                  <span className="font-mono text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                    HPLC {current.purity}
                  </span>
                  <span className="font-mono text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                    {current.mw}
                  </span>
                </div>
              </div>

              {/* Chemical Specifications Data Matrix */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Molecular Formula:</span>
                  <span className="font-bold text-slate-800">{current.formula}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assay Methodology:</span>
                  <span className="font-semibold text-slate-800">{current.testingMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Signaling Axis:</span>
                  <span className="font-semibold text-slate-800 text-right">{current.indication}</span>
                </div>
                <div className="pt-2 border-t border-slate-200/80">
                  <span className="text-slate-500 block mb-1">Sequence Fragment:</span>
                  <div className="text-[11px] bg-white p-2 rounded border border-slate-200 text-emerald-800 break-all font-mono">
                    {current.sequence}
                  </div>
                </div>
              </div>

              {/* Quality Standards & Verification Footer */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>European ISO 17025 Third-Party Tested</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-600">PASS</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Nitrogen-Purged Neutral Borosilicate Vial</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-600">PASS</span>
                </div>
              </div>

              {/* Direct Dossier Link Button */}
              <Link
                href={`/peptides/${current.slug}/`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors"
              >
                <span>View Full {current.name} Monograph &amp; Sourcing Matrix</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
