import Link from 'next/link';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export function SmarterBuyer() {
  const items = [
    {
      title: '1. Lot-Specific HPLC Assays',
      text: 'Analytical laboratories require batch-specific Certificates of Analysis where the lot number printed on the vial directly matches the raw chromatographic data.',
    },
    {
      title: '2. Mass Spectrometry Identity',
      text: 'While HPLC confirms purity percentage, Electrospray Ionization Mass Spectrometry (ESI-MS) confirms exact molecular weight, verifying amino acid chain integrity.',
    },
    {
      title: '3. Cold-Chain Packaging',
      text: 'Lyophilized cakes remain stable during standard transit, but sensitive reconstituted solutions demand monitored cold-chain storage to prevent enzymatic degradation.',
    },
    {
      title: '4. Verifiable Corporate Entity',
      text: 'Commercial distributors must demonstrate registered business operations, verifiable corporate jurisdiction, and auditable analytical testing documentation.',
    },
  ];

  return (
    <section className="border-b border-[rgba(141,168,195,0.18)] bg-[#03132e] py-16 md:py-20">
      <div className="container-wide space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 mb-2">
              Analytical Procurement Standards
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              The 4 Quality Benchmarks for Research Compounds
            </h2>
          </div>
          <Link
            href="/verification/"
            className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 hover:text-sky-300"
          >
            Review Audit Criteria →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-gradient-to-br from-[#0a2149] via-[#071d42] to-[#04122d] border border-[rgba(141,168,195,0.25)] hover:border-sky-400/50 transition-all space-y-3.5 shadow-xl"
            >
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
