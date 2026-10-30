import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Scale, FlaskConical, Layers, ShieldCheck, Store, ArrowRight } from 'lucide-react';

interface TrackerCard {
  title: string;
  subtitle: string;
  description: string;
  source: string;
  href: string;
  icon: typeof ShieldAlert;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
}

const TRACKERS: TrackerCard[] = [
  {
    title: 'MHRA Enforcement & Safety Tracker',
    subtitle: 'Rolling UK Government Action Feed',
    description: 'Archive of MHRA regulatory actions, counterfeit product seizures, and Drug Safety Updates concerning synthetic peptides, GLP-1 mimetics, and research salts.',
    source: 'gov.uk / MHRA Official Feeds',
    href: '/regulatory/mhra-tracker/',
    icon: ShieldAlert,
    accentColor: 'text-rose-700',
    badgeBg: 'bg-rose-50 border-rose-200',
    badgeText: 'text-rose-800',
  },
  {
    title: 'UK Statutory Classification Matrix',
    subtitle: 'Compound-by-Compound Legal Dossiers',
    description: 'Statutory cross-examinations mapping 12 synthetic peptides against Human Medicines Regulations 2012, Misuse of Drugs Act 1971, and WADA Prohibited List.',
    source: 'Legislation.gov.uk & Home Office',
    href: '/regulatory/uk-legal-status/',
    icon: Scale,
    accentColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-50 border-emerald-200',
    badgeText: 'text-emerald-800',
  },
  {
    title: 'CoA & Purity Verification Architecture',
    subtitle: 'Analytical Testing Benchmarks',
    description: 'Reverse-phase HPLC purity assays, electrospray mass spectrometry (ESI-MS), Karl Fischer water content, and methods for auditing falsified supplier certificates.',
    source: 'ISO/IEC 17025 Accredited Protocols',
    href: '/verification/',
    icon: FlaskConical,
    accentColor: 'text-blue-700',
    badgeBg: 'bg-blue-50 border-blue-200',
    badgeText: 'text-blue-800',
  },
  {
    title: 'Delivery Formats & Reconstitution SOP',
    subtitle: 'Physical State Handling Parameters',
    description: 'Volumetric reconstitution math, diluent chemistry (Bacteriostatic Water vs Sterile 0.9% Saline vs 0.1M Acetic Acid), and multi-dose pen mechanics.',
    source: 'British Pharmacopoeia & GLP Guidelines',
    href: '/formats/',
    icon: Layers,
    accentColor: 'text-amber-700',
    badgeBg: 'bg-amber-50 border-amber-200',
    badgeText: 'text-amber-800',
  },
  {
    title: 'COSHH Regulations 2002 Laboratory SOP',
    subtitle: 'Hazard Control & Sharps Disposal',
    description: 'Comprehensive occupational safety guidance covering BS EN 374 nitrile chemical resistance, laminar flow ventilation, and UN 3291 sharps containment.',
    source: 'UK Health & Safety Executive (HSE)',
    href: '/safety/',
    icon: ShieldCheck,
    accentColor: 'text-purple-700',
    badgeBg: 'bg-purple-50 border-purple-200',
    badgeText: 'text-purple-800',
  },
  {
    title: 'Commercial UK Reagent Directory',
    subtitle: '5 Vetted Laboratory Distributors',
    description: 'Direct catalog audit of established UK distributors providing analytical-grade lyophilized powders, reconstitution diluents, and verified domestic dispatch.',
    source: 'Independent Registry Supplier Audits',
    href: '/vendors/',
    icon: Store,
    accentColor: 'text-teal-700',
    badgeBg: 'bg-teal-50 border-teal-200',
    badgeText: 'text-teal-800',
  },
];

export function RegulatoryTrackersHub() {
  return (
    <section className="container-wide space-y-10 scroll-mt-20" id="intelligence-trackers">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800">
            <Scale className="w-3.5 h-3.5 text-slate-600" />
            <span>STATUTORY &amp; ANALYTICAL INTELLIGENCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Live Research &amp; Regulatory Dossiers
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Exhaustive analytical compendia examining UK medicine law, laboratory chemical handling, and independent reagent verification.
          </p>
        </div>

        <Link
          href="/regulatory/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 hover:text-emerald-800 hover:underline shrink-0"
        >
          <span>All Regulatory Hubs</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRACKERS.map((tracker, idx) => {
          const Icon = tracker.icon;
          return (
            <Link
              key={idx}
              href={tracker.href}
              className="clinical-card p-6 sm:p-7 bg-white border border-slate-200/90 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${tracker.badgeBg} ${tracker.badgeText}`}>
                    {tracker.subtitle}
                  </span>
                  <div className={`p-2 rounded-xl bg-slate-50 border border-slate-200/60 ${tracker.accentColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {tracker.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tracker.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 text-[11px] truncate max-w-[200px]">{tracker.source}</span>
                <span className="font-bold text-emerald-700 group-hover:text-emerald-800 flex items-center gap-1">
                  Access <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
