import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';
import {
  ShieldAlert,
  AlertTriangle,
  FlaskConical,
  CheckCircle2,
  ChevronRight,
  FileText,
  Eye,
  Hand,
  Wind,
  Trash2,
  PhoneCall,
  Scale,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'COSHH Chemical Safety & Laboratory Handling Protocols | Peptides UK',
  description:
    'Comprehensive UK laboratory chemical safety guidelines under the Control of Substances Hazardous to Health Regulations 2002 (COSHH): PPE specifications, spill response, exposure protocols, and hazardous waste disposal.',
  alternates: {
    canonical: `${SITE_METADATA.url}/safety/`,
  },
  openGraph: {
    title: 'COSHH Laboratory Chemical Safety Guide | Peptides UK',
    description: 'UK statutory laboratory safety, COSHH assessments, and emergency exposure protocols.',
    url: `${SITE_METADATA.url}/safety/`,
    images: [`${SITE_METADATA.url}/icon-512x512.png`],
  },
};

export default function SafetyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_METADATA.url}/#website`,
        url: SITE_METADATA.url,
        name: SITE_METADATA.name,
      },
      {
        '@type': 'MedicalWebPage',
        '@id': `${SITE_METADATA.url}/safety/#webpage`,
        url: `${SITE_METADATA.url}/safety/`,
        name: 'COSHH Chemical Safety & Laboratory Handling Protocols',
        description:
          'Standard operating procedures for chemical hazard containment, personal protective equipment, and emergency response in UK research facilities.',
        isPartOf: { '@id': `${SITE_METADATA.url}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_METADATA.url}/safety/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_METADATA.url}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Laboratory Safety & COSHH',
            item: `${SITE_METADATA.url}/safety/`,
          },
        ],
      },
    ],
  };

  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">Laboratory Safety &amp; COSHH</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4 relative overflow-hidden bg-benzene-washout">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>Statutory Health &amp; Safety Executive (HSE) Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          COSHH Laboratory Safety &amp; Handling Standards
        </h1>
        <p className="text-base text-slate-600 max-w-4xl leading-relaxed">
          Standard operating procedures for chemical hazard containment, Personal Protective Equipment (PPE) standards,
          aseptic handling techniques, emergency spill response, and hazardous waste disposal under the United Kingdom{' '}
          <strong className="text-slate-900">Control of Substances Hazardous to Health Regulations 2002 (COSHH)</strong>.
        </p>
      </div>

      {/* Statutory Mandate Strip */}
      <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-3 shadow-md">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
          <Scale className="w-4 h-4" />
          <span>Statutory Foundation: COSHH Regulations 2002 (SI 2002/2677)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          Mandatory Risk Assessment for UK Laboratories
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          Under Regulation 6 of COSHH 2002, employers and principal investigators in England, Scotland, Wales, and Northern Ireland
          must conduct a formal, documented assessment of the risks to health arising from work with hazardous chemical substances
          before commencing experimental procedures. While synthetic peptides are generally of low acute systemic toxicity, their biological
          activity as signaling ligands requires comprehensive containment protocols.
        </p>
      </div>

      {/* PPE 4-Pillar Requirements Grid */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono font-bold uppercase text-emerald-700">Physical Protection</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Personal Protective Equipment (PPE) Standards
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Personnel handling lyophilized peptide powders and concentrated stock solutions must adhere strictly
            to certified British Standards (BS EN) equipment ratings:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="card-inner-elevated p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Eye Protection (BS EN 166)</h3>
            <p className="text-slate-600 leading-relaxed">
              Safety spectacles with side shields or chemical splash goggles meeting BS EN 166 Optical Class 1.
              Must provide full lateral coverage during syringe needle handling, reconstitution, and liquid transfers.
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-500 border-t border-slate-100">
              Standard: BS EN 166:2002 Grade F/B
            </div>
          </div>

          <div className="card-inner-elevated p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <Hand className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Nitrile Gloves (BS EN 374)</h3>
            <p className="text-slate-600 leading-relaxed">
              Medical-grade chemical-resistant disposable nitrile gloves (minimum thickness 0.11 mm / 4 mil).
              Latex gloves are not recommended due to allergen sensitization risks and lower resistance to organic solvents.
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-500 border-t border-slate-100">
              Standard: BS EN ISO 374-1:2016 Type B
            </div>
          </div>

          <div className="card-inner-elevated p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Laboratory Coat (BS EN 14126)</h3>
            <p className="text-slate-600 leading-relaxed">
              Full-length 100% cotton or poly-cotton barrier laboratory coat with press-stud fastenings and knitted cuffs.
              Coats must remain buttoned at all times and must not be laundered in domestic washing machines.
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-500 border-t border-slate-100">
              Standard: ISO 13688 / BS EN 14126
            </div>
          </div>

          <div className="card-inner-elevated p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Respiratory &amp; Containment</h3>
            <p className="text-slate-600 leading-relaxed">
              Handle open bulk powders inside a certified Class II microbiological safety cabinet or ducted chemical fume cupboard.
              If handling powders outside containment, wear a particulate respirator meeting BS EN 149 (FFP2/FFP3).
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-500 border-t border-slate-100">
              Standard: BS EN 149:2001+A1:2009 FFP3
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Spill Response Protocols */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="text-xs font-mono font-bold uppercase text-red-700 mb-1">
            Emergency Response SOP
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Emergency Chemical Spill &amp; Exposure Protocols
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            In the event of physical glass breakage, chemical spillage, or accidental cutaneous exposure, laboratory
            personnel must execute the following structured response:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="card-inner-elevated p-6 space-y-3">
            <div className="font-mono font-bold text-xs uppercase text-slate-800 flex items-center gap-2 border-b border-slate-200/80 pb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Dry Powder Spill Containment</span>
            </div>
            <ol className="space-y-2 text-slate-700 list-decimal list-inside leading-relaxed">
              <li>Do not use high-velocity dry sweeping, which aerosolizes microfine peptide particles.</li>
              <li>Dampen absorbent paper towels with 70% isopropanol or sterile deionized water.</li>
              <li>Carefully place moist towels over the powder to absorb it passively without generating airborne dust.</li>
              <li>Collect solid residue with a plastic spatula into a sealed, labeled chemical waste container.</li>
              <li>Decontaminate the work surface with 1% sodium hypochlorite solution followed by distilled water.</li>
            </ol>
          </div>

          <div className="card-inner-elevated p-6 space-y-3">
            <div className="font-mono font-bold text-xs uppercase text-slate-800 flex items-center gap-2 border-b border-slate-200/80 pb-2">
              <FlaskConical className="w-4 h-4 text-blue-600" />
              <span>Reconstituted Liquid Spill</span>
            </div>
            <ol className="space-y-2 text-slate-700 list-decimal list-inside leading-relaxed">
              <li>Deploy chemical spill pillow or universal absorbent pads directly around the perimeter of the pool.</li>
              <li>Work inward from the perimeter to absorb all liquid volume without spreading.</li>
              <li>Use forceps or mechanical tongs to collect broken glass fragments; never use bare or gloved hands.</li>
              <li>Transfer all contaminated pads and glass into a rigid yellow clinical sharps container.</li>
              <li>Disinfect the area thoroughly with laboratory-grade antimicrobial surface spray.</li>
            </ol>
          </div>

          <div className="card-inner-elevated p-6 space-y-3">
            <div className="font-mono font-bold text-xs uppercase text-slate-800 flex items-center gap-2 border-b border-slate-200/80 pb-2">
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>Accidental Direct Exposure</span>
            </div>
            <ol className="space-y-2 text-slate-700 list-decimal list-inside leading-relaxed">
              <li><strong>Skin Contact:</strong> Immediately irrigate the affected area with running tepid water for a minimum of 15 minutes. Remove contaminated garments.</li>
              <li><strong>Eye Splash:</strong> Hold eyelids open and flush under emergency plumbed eyewash station for at least 15 minutes. Seek immediate ophthalmological evaluation.</li>
              <li><strong>Inhalation:</strong> Evacuate casualty to fresh air immediately. If respiratory distress develops, summon NHS emergency services (999).</li>
              <li>Complete statutory HSE Form F2508 under RIDDOR if incident qualifies.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Waste Disposal & Environmental Regulations */}
      <section className="bg-slate-50 rounded-3xl border border-slate-200/90 p-6 sm:p-10 space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="text-xs font-mono font-bold uppercase text-slate-500 mb-1">
            Environmental Stewardship
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Hazardous Waste Disposal (Hazardous Waste Regulations 2005)
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Under the Hazardous Waste (England and Wales) Regulations 2005 and Environmental Protection Act 1990,
            chemical research reagents must never be discharged into domestic drainage or general municipal refuse streams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
            <div className="font-mono font-bold text-slate-800 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-amber-600" />
              <span>Sharps &amp; Glass Vial Disposal</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              All empty, expired, or broken borosilicate glass vials, reconstitution syringes, and hypodermic needles
              must be segregated into rigid, puncture-resistant yellow UN-approved sharps bins (EWC Code 18 01 01 / 18 01 03*).
              Bins must be incinerated at licensed high-temperature thermal disposal facilities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
            <div className="font-mono font-bold text-slate-800 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-blue-600" />
              <span>Residual Chemical Solutions</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Aqueous stock solutions containing research peptides and organic solvent residues (acetonitrile, TFA, methanol)
              must be collected in labeled non-halogenated organic waste drums. Maintain consignment notes for a minimum
              of 3 years as mandated by the Environment Agency.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
