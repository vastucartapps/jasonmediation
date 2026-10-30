import Link from 'next/link';
import { ShieldAlert, Scale, FlaskConical, BookOpen, Layers, Store, ArrowRight } from 'lucide-react';

interface TrackerCard {
  title: string;
  subtitle: string;
  description: string;
  source: string;
  href: string;
  icon: typeof ShieldAlert;
  accentColor: string;
  borderColor: string;
}

const TRACKERS: TrackerCard[] = [
  {
    title: 'MHRA Enforcement & Safety Tracker',
    subtitle: 'Live UK Government Action Feed',
    description: 'Rolling 90-day archive of MHRA enforcement actions, illegal product seizures, and Drug Safety Updates concerning synthetic peptides and GLP-1 analogues.',
    source: 'Source: gov.uk / MHRA Official Feeds',
    href: '/regulatory/mhra-tracker/',
    icon: ShieldAlert,
    accentColor: 'text-rose-400',
    borderColor: 'hover:border-rose-400/60',
  },
  {
    title: 'UK Statutory Classification Matrix',
    subtitle: 'Compound-by-Compound Legal Dossiers',
    description: 'Authoritative analysis mapping 12 synthetic peptides against the Human Medicines Regulations 2012, Misuse of Drugs Act 1971, and WADA Prohibited List.',
    source: 'Source: Legislation.gov.uk & WADA 2026 Code',
    href: '/regulatory/uk-legal-status/',
    icon: Scale,
    accentColor: 'text-emerald-400',
    borderColor: 'hover:border-emerald-400/60',
  },
  {
    title: 'CoA & Purity Verification Standards',
    subtitle: 'Analytical Testing Benchmarks',
    description: 'Reverse-phase HPLC purity assays, electrospray mass spectrometry (ESI-MS), and criteria for detecting falsified or recycled chromatographic reports.',
    source: 'Source: Independent ISO/IEC 17025 Labs',
    href: '/verification/',
    icon: FlaskConical,
    accentColor: 'text-cyan-400',
    borderColor: 'hover:border-cyan-400/60',
  },
  {
    title: 'NCBI PubMed Research Index',
    subtitle: '304+ Peer-Reviewed Preclinical Citations',
    description: 'Documented cellular mechanisms, in vitro receptor binding assays, and pre-clinical animal models indexed with verified PMIDs and journal references.',
    source: 'Source: National Center for Biotechnology Information',
    href: '/#peptides-catalog',
    icon: BookOpen,
    accentColor: 'text-sky-400',
    borderColor: 'hover:border-sky-400/60',
  },
  {
    title: 'Delivery Formats & Reconstitution SOP',
    subtitle: 'Physical State Handling Parameters',
    description: 'Comparative volumetric precision, solvent compatibility (bacteriostatic vs sterile water), and cold-chain stability across vials, pens, and atomizers.',
    source: 'Source: Laboratory Pharmacopeia & GLP Guidelines',
    href: '/formats/',
    icon: Layers,
    accentColor: 'text-amber-400',
    borderColor: 'hover:border-amber-400/60',
  },
  {
    title: 'Commercial Vendor Reagent Directory',
    subtitle: '5 Vetted Laboratory Distributors',
    description: 'Direct catalog access to established commercial distributors providing analytical-grade lyophilized powders, multidose cartridges, and solvents.',
    source: 'Source: Independent Vendor Audits',
    href: '/vendors/',
    icon: Store,
    accentColor: 'text-purple-400',
    borderColor: 'hover:border-purple-400/60',
  },
];

export function DataTrackers() {
  return (
    <section className="border-b border-[rgba(141,168,195,0.18)] bg-[#03132e] py-16 md:py-24">
      <div className="container-wide space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[rgba(141,168,195,0.2)]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a2347] border border-sky-400/40 text-xs font-mono font-bold text-sky-300">
              <Scale className="w-3.5 h-3.5" />
              <span>LIVE REGULATORY & ANALYTICAL INTELLIGENCE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Live Data & Regulatory Trackers
            </h2>
            <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed font-medium">
              Continuous intelligence repositories tracking UK statutory notices, independent testing standards, and peer-reviewed biochemical literature.
            </p>
          </div>

          <Link
            href="/regulatory/"
            className="text-xs sm:text-sm font-mono font-bold text-sky-300 hover:text-white transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>All Regulatory Hubs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TRACKERS.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.title}
                href={t.href}
                className={`rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-[#071d42] via-[#051736] to-[#03112a] border border-[rgba(141,168,195,0.25)] ${t.borderColor} transition-all duration-200 group flex flex-col justify-between space-y-6 shadow-xl hover:shadow-2xl hover:-translate-y-1`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[rgba(141,168,195,0.18)]">
                    <div className="p-3 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)]">
                      <Icon className={`w-5 h-5 ${t.accentColor}`} />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold bg-[#02102b] px-3 py-1 rounded-full border border-[rgba(141,168,195,0.2)]">
                      Live Dataset
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                      {t.title}
                    </h3>
                    <p className={`text-xs font-mono ${t.accentColor} font-semibold mt-1`}>
                      {t.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed">
                    {t.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(141,168,195,0.18)] flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-slate-200 transition-colors">
                  <span className="truncate pr-2">{t.source}</span>
                  <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1.5 transition-transform shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
