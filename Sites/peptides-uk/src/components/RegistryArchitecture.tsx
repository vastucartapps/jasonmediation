import React from 'react';
import Link from 'next/link';
import { Database, BookOpen, Store, ShieldCheck, ArrowRight, FlaskConical, Scale, CheckCircle2 } from 'lucide-react';

export function RegistryArchitecture() {
  const pillars = [
    {
      num: '01',
      title: 'Primary Chemical Identity & IUPAC Indexing',
      text: 'Every compound record is anchored to primary reference databases including PubChem, UniProt, and the CAS Registry. We catalog exact amino acid sequences, monoisotopic molecular weights, SMILES notation, and empirical formulas to eliminate mislabeled commercial preparations.',
      icon: Database,
      tag: 'PUBCHEM & CAS',
      tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      num: '02',
      title: 'Empirical Analytical Standards (HPLC & MS)',
      text: 'Lyophilized peptide batches require dual-assay analytical verification: Reversed-Phase High-Performance Liquid Chromatography (RP-HPLC) demonstrating ≥98.0% peak purity, and Electrospray Ionization Mass Spectrometry (ESI-MS) confirming exact isotopic mass without truncation artifacts.',
      icon: FlaskConical,
      tag: 'ISO/IEC 17025',
      tagColor: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      num: '03',
      title: 'UK Statutory Compliance & Laboratory Ethics',
      text: 'Our registry maps regulatory standing under the Human Medicines Regulations 2012 (SI 2012/1916), Misuse of Drugs Act 1971, and CAP Code 12.11. All compounds are cataloged exclusively for in vitro laboratory research, prohibiting consumer medical and self-administration claims.',
      icon: Scale,
      tag: 'SI 2012/1916',
      tagColor: 'text-purple-700 bg-purple-50 border-purple-200',
    },
  ];

  return (
    <section className="container-wide space-y-10 scroll-mt-20" id="architecture">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-mono font-bold text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>EDITORIAL CHARTER &amp; METHODOLOGY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Database Architecture &amp; Analytical Governance
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            The Peptides UK Registry operates as a non-commercial reference standard for academic research teams, biotechnology laboratories, and clinical analytical chemists.
          </p>
        </div>

        <Link
          href="/about/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 hover:text-emerald-800 hover:underline shrink-0"
        >
          <span>Read Verification Charter</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.num}
              className="clinical-card p-6 sm:p-7 flex flex-col justify-between space-y-5 bg-white border border-slate-200/90 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-sm shadow-xs">
                    {pillar.num}
                  </span>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${pillar.tagColor}`}>
                    {pillar.tag}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <Icon className="w-4 h-4 shrink-0" />
                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    {pillar.text}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Audited against UK statutory standards</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Commercial Vendor Cross-Reference Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md border border-slate-800">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold bg-emerald-900/60 px-2.5 py-0.5 rounded border border-emerald-700/60">
              Vetted Commercial Directory
            </span>
            <span className="text-xs text-slate-400 font-mono">5 UK Laboratory Suppliers</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Commercial Reagent Vendors &amp; Batch Availability
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Directly cross-reference UK suppliers providing lot-specific HPLC certificates, cold-chain Royal Mail Tracked 24 dispatch, and analytical-grade solvents: PharmaGrade, Direct Peptides, Direct Sarms, Peptide Works, and PharmaLab Global.
          </p>
        </div>

        <Link
          href="/vendors/"
          className="shrink-0 px-6 py-3 rounded-xl font-mono text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-sm flex items-center gap-2"
        >
          <Store className="w-4 h-4 text-slate-950" />
          <span>Inspect Vendor Directory →</span>
        </Link>
      </div>
    </section>
  );
}
