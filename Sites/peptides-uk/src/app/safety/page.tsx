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
  Thermometer,
  FileCheck2,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'COSHH Chemical Safety & Laboratory Handling Protocols | Peptides UK',
  description:
    'UK laboratory chemical safety protocols under COSHH 2002: PPE specifications, spill response, exposure protocols, and hazardous waste disposal.',
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

      {/* Protocol Section 06: UK Statutory COSHH 2002 Framework & CL2 Protocol */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-emerald-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Statutory Compliance Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Section 06: COSHH 2002 Assessment &amp; CL2 Laboratory Protocol
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Standard operating procedure aligned with Health and Safety Executive (HSE) statutory directives under
            the Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), BS EN standards, and UN transport codes.
          </p>
        </div>

        {/* 4-Column Statutory Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="card-inner-elevated p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold font-mono text-sm border-b border-slate-200/80 pb-2">
              <Scale className="w-4 h-4 text-emerald-600" />
              <span>COSHH Reg 6 &amp; 7</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Mandatory documented risk assessment prior to handling. Elimination of hazard or control of exposure via engineering containment (ducted laminar flow hoods) before relying on PPE.
            </p>
            <div className="text-[10px] font-mono text-emerald-700 font-bold pt-1">
              Statutory Basis: SI 2002/2677
            </div>
          </div>

          <div className="card-inner-elevated p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold font-mono text-sm border-b border-slate-200/80 pb-2">
              <FlaskConical className="w-4 h-4 text-blue-600" />
              <span>Containment Level 2</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Negative-pressure laboratory airflow, HEPA air filtration, restricted biohazard access, and Class II microbiological safety cabinets for aerosol-generating reconstitution procedures.
            </p>
            <div className="text-[10px] font-mono text-blue-700 font-bold pt-1">
              Standard: ACDP CL2 Guidance
            </div>
          </div>

          <div className="card-inner-elevated p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold font-mono text-sm border-b border-slate-200/80 pb-2">
              <Hand className="w-4 h-4 text-purple-600" />
              <span>BS EN 374 Gloves</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Nitrile gloves meeting BS EN ISO 374-1:2016 Type B. Chemical permeation breakthrough time Class 2 (&gt;30 min) against organic solvents and reconstitution diluents.
            </p>
            <div className="text-[10px] font-mono text-purple-700 font-bold pt-1">
              Breakthrough: Class 2 (&gt;30m)
            </div>
          </div>

          <div className="card-inner-elevated p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold font-mono text-sm border-b border-slate-200/80 pb-2">
              <Trash2 className="w-4 h-4 text-amber-600" />
              <span>UN 3291 Waste</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Rigid puncture-resistant yellow sharps bins compliant with UN 3291 and EWC Code 18 01 03*. Final high-temperature thermal incineration (&gt;1100°C) at authorized facilities.
            </p>
            <div className="text-[10px] font-mono text-amber-700 font-bold pt-1">
              Code: EWC 18 01 03*
            </div>
          </div>
        </div>

        {/* HSE EH40 Workplace Exposure Limits (WEL) Reference Table */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-bold uppercase text-slate-700 flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            <span>HSE EH40/2005 Workplace Exposure Limits (WEL) for Reconstitution Media</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 font-mono text-slate-500 uppercase text-[11px] bg-slate-50">
                  <th className="py-2.5 px-3">Substance / Reagent</th>
                  <th className="py-2.5 px-3">CAS Number</th>
                  <th className="py-2.5 px-3">8-Hour TWA Limit</th>
                  <th className="py-2.5 px-3">15-Min STEL Limit</th>
                  <th className="py-2.5 px-3">Risk Notation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900 font-sans">Benzyl Alcohol (Bacteriostatic Preservative)</td>
                  <td className="py-2.5 px-3 text-slate-600">100-51-6</td>
                  <td className="py-2.5 px-3 text-slate-800">10 ppm (44 mg/m³)</td>
                  <td className="py-2.5 px-3 text-slate-800">20 ppm (88 mg/m³)</td>
                  <td className="py-2.5 px-3 text-amber-700 font-semibold font-sans">Skin irritant; aerosol containment</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900 font-sans">Acetic Acid (0.1M Diluent for Basic Peptides)</td>
                  <td className="py-2.5 px-3 text-slate-600">64-19-7</td>
                  <td className="py-2.5 px-3 text-slate-800">10 ppm (25 mg/m³)</td>
                  <td className="py-2.5 px-3 text-slate-800">20 ppm (50 mg/m³)</td>
                  <td className="py-2.5 px-3 text-amber-700 font-semibold font-sans">Corrosive vapour; use fume hood</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900 font-sans">Acetonitrile (HPLC Mobile Phase Residue)</td>
                  <td className="py-2.5 px-3 text-slate-600">75-05-8</td>
                  <td className="py-2.5 px-3 text-slate-800">40 ppm (68 mg/m³)</td>
                  <td className="py-2.5 px-3 text-slate-800">60 ppm (102 mg/m³)</td>
                  <td className="py-2.5 px-3 text-red-700 font-semibold font-sans">Sk notation (cutaneous absorption)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cold-Chain Thermal Stability Half-Life Matrix */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-bold uppercase text-slate-700 flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-blue-600" />
            <span>Peptide Cold-Chain Thermal Degradation Kinetic Matrix</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 font-mono text-slate-500 uppercase text-[11px] bg-slate-50">
                  <th className="py-2.5 px-3">Storage Condition</th>
                  <th className="py-2.5 px-3">Temperature</th>
                  <th className="py-2.5 px-3">Lyophilized Stability</th>
                  <th className="py-2.5 px-3">Reconstituted Aqueous (t1/2)</th>
                  <th className="py-2.5 px-3">Degradation Mechanism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900 font-sans">Cryogenic Ultra-Low</td>
                  <td className="py-2.5 px-3 text-blue-700 font-bold">-80°C (Argon seal)</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-bold">Up to 36 months</td>
                  <td className="py-2.5 px-3 text-slate-600">Not recommended (freeze-thaw shock)</td>
                  <td className="py-2.5 px-3 text-slate-600 font-sans">Negligible; lattice immobilization</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900 font-sans">Standard Laboratory Freezer</td>
                  <td className="py-2.5 px-3 text-blue-700 font-bold">-20°C (Desiccated)</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-bold">Up to 24 months</td>
                  <td className="py-2.5 px-3 text-slate-600">Up to 90 days (aliquoted)</td>
                  <td className="py-2.5 px-3 text-slate-600 font-sans">Slow atmospheric deamidation</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900 font-sans">Refrigerated Operating Cold-Chain</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-bold">2°C to 8°C</td>
                  <td className="py-2.5 px-3 text-slate-700">Up to 90 days</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-bold">28 days (0.9% benzyl alcohol)</td>
                  <td className="py-2.5 px-3 text-slate-600 font-sans">Methionine oxidation, hydrolysis</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900 font-sans">Ambient Benchtop Exposure</td>
                  <td className="py-2.5 px-3 text-amber-700 font-bold">20°C to 25°C</td>
                  <td className="py-2.5 px-3 text-amber-700">Up to 14 days</td>
                  <td className="py-2.5 px-3 text-amber-700 font-bold">24 – 48 hours max</td>
                  <td className="py-2.5 px-3 text-slate-600 font-sans">Rapid peptide bond cleavage, aggregation</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900 font-sans">Thermal Stress / Incubator</td>
                  <td className="py-2.5 px-3 text-red-700 font-bold">37°C+</td>
                  <td className="py-2.5 px-3 text-red-700">&lt; 48 hours</td>
                  <td className="py-2.5 px-3 text-red-700 font-bold">&lt; 6 hours</td>
                  <td className="py-2.5 px-3 text-slate-600 font-sans">Extensive denaturation, racemization</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SOP-SP-04 Protocol Card */}
        <div className="card-inner-elevated p-6 space-y-3 bg-slate-50/50">
          <div className="font-mono font-bold text-xs uppercase text-slate-900 flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Standard Operating Procedure: SOP-SP-04 (Spill Remediation &amp; Neutralization)</span>
            </span>
            <span className="badge-emerald text-[10px] py-0 px-2 font-mono">Mandatory Compliance</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs pt-1">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block font-mono">Phase 1: Isolation</span>
              <p className="text-slate-600 leading-relaxed">
                Immediately clear a 2-metre exclusion zone. Post COSHH warning notice and deactivate local forced ventilation to prevent powder migration.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block font-mono">Phase 2: PPE Donning</span>
              <p className="text-slate-600 leading-relaxed">
                Don BS EN 149 FFP3 particulate respirator, double BS EN 374 nitrile gloves, and BS EN 166 Grade 1B ocular splash goggles prior to entry.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block font-mono">Phase 3: Damp Absorption</span>
              <p className="text-slate-600 leading-relaxed">
                Cover spill with lint-free wipes pre-moistened with 70% ethanol / 0.1M sodium hypochlorite. Do NOT sweep dry powder. Collect into sealed container.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block font-mono">Phase 4: Waste Segregation</span>
              <p className="text-slate-600 leading-relaxed">
                Seal all cleaning media, gloves, and broken borosilicate glass in UN 3291 clinical sharps waste (EWC 18 01 03*). Complete HSE RIDDOR form if required.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
