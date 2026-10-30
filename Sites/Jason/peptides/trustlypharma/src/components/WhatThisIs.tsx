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

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {scientificStandards.pillars.map((pillar, idx) => {
            const IconComponent = icons[idx] || Database;
            return (
              <div
                key={pillar.num}
                className="rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-[#0a2149] to-[#061838] border border-[rgba(141,168,195,0.25)] hover:border-sky-400/50 transition-all space-y-5 flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[rgba(141,168,195,0.18)]">
                    <span className="w-11 h-11 rounded-2xl bg-sky-500/15 border border-sky-400/35 text-sky-300 flex items-center justify-center font-mono font-bold text-base shadow-sm">
                      {pillar.num}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.2)]">
                      <IconComponent className="w-5 h-5 text-sky-400" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-200 leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commercial Vendor & Partner Directory Banner */}
        <div className="rounded-3xl p-7 sm:p-9 bg-gradient-to-r from-[#0a2149] via-[#0b2756] to-[#081e42] border border-sky-500/35 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-300 font-bold bg-[#02102b] px-3 py-1 rounded-full border border-sky-400/30">
                Independent Vendor Directory
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Commercial Laboratory Vendor Catalogues
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              Direct catalog listings for established peptide distributors (PharmaGrade, Direct Peptides, Direct Sarms, Peptide Works, PharmaLab Global) providing research-grade materials, lyophilized vials, and solvent reagents.
            </p>
          </div>

          <Link
            href="/vendors/"
            className="shrink-0 px-7 py-3.5 rounded-full font-mono text-xs font-bold text-slate-950 gradient-bg shadow-lg hover:shadow-xl transition-all"
          >
            Explore Vendor Directory →
          </Link>
        </div>
      </div>
    </section>
  );
}
