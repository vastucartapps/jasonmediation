import Link from 'next/link';
import { scientificStandards } from '../data/site';
import { BookOpen, Database, Store, ArrowRight, ShieldCheck } from 'lucide-react';

export function WhatThisIs() {
  const icons = [Database, BookOpen, Store];

  return (
    <section className="border-b border-[rgba(141,168,195,0.18)] bg-[#03132e] py-16 md:py-20">
      <div className="container-wide space-y-12">
        <div className="max-w-3xl">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 mb-2">
            Database Architecture & Methodology
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {scientificStandards.heading}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-3 leading-relaxed">
            {scientificStandards.subheading}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {scientificStandards.pillars.map((pillar, idx) => {
            const IconComponent = icons[idx] || Database;
            return (
              <div
                key={pillar.num}
                className="rounded-3xl p-6 sm:p-7 bg-[#0a2149] border border-[rgba(141,168,195,0.25)] space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center font-mono font-bold">
                      {pillar.num}
                    </span>
                    <IconComponent className="w-5 h-5 text-sky-400" />
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commercial Supplier Directory Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#0a2149]/80 border border-sky-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                Independent Supplier Directory
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Commercial Supplier Catalogues
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Direct catalog listings for established peptide distributors (PharmaGrade, Direct Peptides, Direct Sarms, Peptide Works, PharmaLab Global) providing research-grade materials, lyophilized vials, and solvent reagents.
            </p>
          </div>

          <Link
            href="/suppliers/"
            className="shrink-0 px-6 py-3 rounded-full font-mono text-xs font-bold text-sky-300 bg-[#103059] border border-sky-500/30 hover:bg-[#123a6b] transition-colors"
          >
            Explore Supplier Directory →
          </Link>
        </div>
      </div>
    </section>
  );
}
