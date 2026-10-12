import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, ArrowRight, FlaskConical, Scale, ThermometerSnowflake, FileCheck } from 'lucide-react';

export function SmarterLaboratoryBuyer() {
  const standards = [
    {
      num: '01',
      title: 'Lot-Specific RP-HPLC Assays',
      summary: 'Chromatographic Purity ≥98.0%',
      text: 'Analytical laboratories require batch-specific Certificates of Analysis where the lot number printed on the vial label directly matches the raw chromatographic data file. The trace must show a single sharp peak under standard C18 reverse-phase elution without broad shoulder impurities.',
      icon: FlaskConical,
      tag: 'RP-HPLC CHROMATOGRAPHY',
    },
    {
      num: '02',
      title: 'ESI-MS Molecular Identity',
      summary: 'Electrospray Mass Accuracy ±1.0 Da',
      text: 'While HPLC confirms purity percentage, Electrospray Ionization Mass Spectrometry (ESI-MS) confirms exact molecular mass. The spectrum must confirm the protonated [M+H]+ and multivalent [M+2H]2+ ions matching theoretical monoisotopic mass to rule out amino acid deletion sequences.',
      icon: FileCheck,
      tag: 'MASS SPECTROMETRY',
    },
    {
      num: '03',
      title: 'Endotoxin & Pyrogen Control',
      summary: 'LAL Turbidimetric Testing <0.5 EU/mg',
      text: 'For cell culture and in vitro tissue viability experiments, bacterial endotoxin contamination induces inflammatory cytokine cascades (TNF-α, IL-6) that invalidate experimental assays. Certified reagents must pass Limulus Amebocyte Lysate (LAL) testing.',
      icon: ShieldCheck,
      tag: 'LAL ASSAY VALIDATION',
    },
    {
      num: '04',
      title: 'Cold-Chain Lyophilization Integrity',
      summary: 'Moisture <3.0% via Karl Fischer',
      text: 'Properly lyophilized cakes under high-vacuum nitrogen purge remain stable at room temperature during domestic Royal Mail Tracked 24 transit. However, moisture content must remain below 3.0% to prevent spontaneous peptide hydrolysis and chain fragmentation.',
      icon: ThermometerSnowflake,
      tag: 'COLD-CHAIN STABILITY',
    },
  ];

  return (
    <section className="container-wide space-y-10 scroll-mt-20" id="procurement-standards">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-mono font-bold text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ANALYTICAL PROCUREMENT STANDARDS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            The 4 Quality Benchmarks for UK Laboratories
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Essential analytical criteria required to verify synthetic peptide reagents prior to laboratory receipt, dilution, or in vitro cell culture.
          </p>
        </div>

        <Link
          href="/verification/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 hover:text-emerald-800 hover:underline shrink-0"
        >
          <span>Review 7-Point CoA Audit Checklist</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {standards.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.num}
              className="clinical-card p-6 bg-white border border-slate-200/90 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-mono font-bold text-xs text-slate-400 group-hover:text-emerald-600 transition-colors">
                    BENCHMARK {item.num}
                  </span>
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200/70 text-emerald-700">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono font-semibold text-emerald-700">
                    {item.summary}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {item.text}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[10px] font-mono font-bold text-slate-500 tracking-wider">
                {item.tag}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
