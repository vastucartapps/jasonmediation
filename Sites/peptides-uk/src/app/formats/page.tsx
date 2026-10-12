import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';
import { FORMAT_PROFILES } from '@/data/formats';
import {
  Package,
  ChevronRight,
  FlaskConical,
  SprayCan,
  CheckCircle2,
  Thermometer,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Peptide Formats & Laboratory Vial Specifications | Peptides UK',
  description:
    'Technical guide to research peptide physical formats: lyophilized powder vials, pre-metered pen cartridges, intranasal atomizers, and synergistic research stacks. Includes cold-chain kinetics, diluent parameters, and stability metrics.',
  alternates: {
    canonical: `${SITE_METADATA.url}/formats/`,
  },
  openGraph: {
    title: 'Peptide Formats & Laboratory Specifications | Peptides UK',
    description: 'Physical chemistry, cold-chain kinetics, and laboratory handling for all peptide delivery formats.',
    url: `${SITE_METADATA.url}/formats/`,
    images: [`${SITE_METADATA.url}/icon-512x512.png`],
  },
};

export default function FormatsPage() {
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
        '@id': `${SITE_METADATA.url}/formats/#webpage`,
        url: `${SITE_METADATA.url}/formats/`,
        name: 'Peptide Formats & Laboratory Vial Specifications',
        description:
          'Comprehensive technical dossier on physical peptide delivery formats, glass vial types, cold-chain storage parameters, and reconstitution requirements.',
        isPartOf: { '@id': `${SITE_METADATA.url}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_METADATA.url}/formats/#breadcrumb`,
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
            name: 'Vial & Reagent Formats',
            item: `${SITE_METADATA.url}/formats/`,
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
        <span className="text-slate-900 font-bold">Vial &amp; Reagent Formats</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4 relative overflow-hidden bg-chem-lattice">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
          <Package className="w-3.5 h-3.5" />
          <span>Vial &amp; Cartridge Physical Formats</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Peptide Delivery Formats &amp; Specifications
        </h1>
        <p className="text-base text-slate-600 max-w-4xl leading-relaxed">
          Comprehensive physical and chemical specifications for the four primary research peptide formats
          distributed across United Kingdom academic and clinical laboratories. Includes stability kinetics,
          temperature thresholds, and container closure integrity.
        </p>
      </div>

      {/* 4 Formats Detailed Dossiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 1. Lyophilized Vials */}
        <div className="card-inner-elevated p-8 space-y-5 bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="badge-emerald font-mono text-xs">Vial Format</span>
            <span className="text-xs font-mono text-slate-400">Type I Borosilicate</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Lyophilized Powder Vials (Freeze-Dried Cake)
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The international gold-standard analytical preparation. Peptides are freeze-dried under vacuum
            into an amorphous cake or crystalline matrix, sealed under inert nitrogen atmosphere in neutral
            borosilicate glass with bromobutyl rubber septa and aluminum crimp collars.
          </p>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Physical State:</span>
              <span className="font-semibold text-slate-800">Dry Lyophilized Matrix</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Unreconstituted Storage:</span>
              <span className="font-semibold text-emerald-700">-20°C Desiccated (24-36 months)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Reconstitution:</span>
              <span className="font-semibold text-slate-800">Mandatory (BAC Water / USP Saline)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Post-Dilution Life:</span>
              <span className="font-semibold text-slate-800">2°C – 8°C (21 to 30 days)</span>
            </div>
          </div>
        </div>

        {/* 2. Pre-Mixed Pens */}
        <div className="card-inner-elevated p-8 space-y-5 bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="badge-cobalt font-mono text-xs">Cartridge Pen</span>
            <span className="text-xs font-mono text-slate-400">Calibrated Micro-Dial</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Pre-Metered Multi-Dose Cartridge Pens
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pre-solubilized liquid solutions or integrated dual-chamber cartridges housed inside a precision mechanical
            delivery device. Built-in graduated dials permit micro-volumetric dispensing without syringe dead-space error,
            ideal for high-throughput dosing protocols.
          </p>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Physical State:</span>
              <span className="font-semibold text-slate-800">Sterile Aqueous Solution</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Storage Mandate:</span>
              <span className="font-semibold text-blue-700">Strict Cold-Chain (2°C – 8°C)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Reconstitution:</span>
              <span className="font-semibold text-slate-800">Ready to Use (No Mixing)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Volumetric Precision:</span>
              <span className="font-semibold text-slate-800">±2% Dial Repeatability</span>
            </div>
          </div>
        </div>

        {/* 3. Nasal Sprays */}
        <div className="card-inner-elevated p-8 space-y-5 bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="badge-purple font-mono text-xs">Metered Spray</span>
            <span className="text-xs font-mono text-slate-400">0.1 mL Metered Plume</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Calibrated Intranasal Metered Atomizers
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Buffered isotonic aqueous formulations designed specifically for mucosal absorption kinetics and blood-brain
            barrier bypassing studies (such as Semax and Selank neuropeptide research). Each actuation delivers a standardized
            0.1 mL plume with minimal droplet velocity shear.
          </p>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Physical State:</span>
              <span className="font-semibold text-slate-800">Buffered Mucosal Solution</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Storage Mandate:</span>
              <span className="font-semibold text-purple-700">2°C – 8°C (Protect from UV)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Actuation Volume:</span>
              <span className="font-semibold text-slate-800">0.1 mL (100 µL) ±3%</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Container Closure:</span>
              <span className="font-semibold text-slate-800">Amber Glass + Snap-On Pump</span>
            </div>
          </div>
        </div>

        {/* 4. Research Stacks */}
        <div className="card-inner-elevated p-8 space-y-5 bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="badge-amber font-mono text-xs">Synergistic Stack</span>
            <span className="text-xs font-mono text-slate-400">Co-Lyophilized Matrix</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Synergistic Multi-Peptide Blends &amp; Stacks
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Dual or triple compound combinations (e.g., BPC-157 + TB-500 or CJC-1295 + Ipamorelin) formulated in fixed
            stoichiometric molar ratios. Enables synchronized dual-pathway cellular cascade interrogation without the risk
            of incompatible pH or salt precipitation during manual mixing.
          </p>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Physical State:</span>
              <span className="font-semibold text-slate-800">Dual-Target Co-Lyophilized</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Storage Mandate:</span>
              <span className="font-semibold text-amber-700">-20°C Desiccated</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Assay Verification:</span>
              <span className="font-semibold text-slate-800">Dual-Peak RP-HPLC Required</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Synergy Model:</span>
              <span className="font-semibold text-slate-800">Receptor Crosstalk Kinetics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Format Comparison Matrix */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Cross-Format Technical Comparison Matrix
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Evaluate format trade-offs across stability, dilution requirements, cold-chain sensitivity, and procedural complexity.
          </p>
        </div>

        <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead className="bg-slate-50 text-slate-700 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 font-bold">Format</th>
                <th className="py-3.5 px-4 font-bold">Shelf Life (-20°C)</th>
                <th className="py-3.5 px-4 font-bold">Reconstitution</th>
                <th className="py-3.5 px-4 font-bold">Volumetric Precision</th>
                <th className="py-3.5 px-4 font-bold">Primary Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              <tr className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-bold text-slate-900 font-sans">Lyophilized Vials</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold">24 – 36 Months</td>
                <td className="py-3.5 px-4 text-slate-700">Required (Manual)</td>
                <td className="py-3.5 px-4 text-slate-600">Requires Calibrated Syringe</td>
                <td className="py-3.5 px-4 text-slate-800 font-sans">Gold standard analytical assays</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-bold text-slate-900 font-sans">Pre-Mixed Pens</td>
                <td className="py-3.5 px-4 text-blue-700 font-bold">60 – 90 Days (2-8°C)</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold">Ready to Use</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold">±2% Dial Repeatability</td>
                <td className="py-3.5 px-4 text-slate-800 font-sans">High-throughput micro-dosing</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-bold text-slate-900 font-sans">Metered Sprays</td>
                <td className="py-3.5 px-4 text-purple-700 font-bold">60 Days (2-8°C)</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold">Ready to Use</td>
                <td className="py-3.5 px-4 text-slate-600">0.1 mL Fixed Plume</td>
                <td className="py-3.5 px-4 text-slate-800 font-sans">CNS &amp; mucosal uptake assays</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-bold text-slate-900 font-sans">Synergistic Stacks</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold">24 Months</td>
                <td className="py-3.5 px-4 text-slate-700">Required (Manual)</td>
                <td className="py-3.5 px-4 text-slate-600">Dual-target calibration</td>
                <td className="py-3.5 px-4 text-slate-800 font-sans">Multi-pathway cascade synergy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Diluent Selection Guide */}
      <section className="bg-slate-50 rounded-3xl border border-slate-200/90 p-6 sm:p-10 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Aseptic Reconstitution Diluent Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="font-mono font-bold text-slate-800 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-emerald-600" />
              <span>Bacteriostatic Water (0.9% Benzyl Alcohol)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Recommended for multi-dose peptide solutions. The 0.9% benzyl alcohol bacteriostatic agent inhibits
              bacterial and fungal growth for up to 28 days post-vial puncture when refrigerated at 2°C – 8°C.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="font-mono font-bold text-slate-800 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-blue-600" />
              <span>USP Sterile Water for Injection</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Preservative-free single-use diluent. Ideal for sensitive cellular assays where benzyl alcohol could
              interfere with cellular viability or ion channel kinetics. Must be utilized immediately upon puncture.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="font-mono font-bold text-slate-800 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-purple-600" />
              <span>0.1M Sterile Acetic Acid</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Required for basic or hydrophobic peptides that exhibit low water solubility at neutral pH (e.g. GHRP-2,
              certain somatotrophic sequences). A minute volume of sterile dilute acetic acid initiates dissolution.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
