import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllVendors } from '@/data/suppliers';
import { SITE_METADATA } from '@/data/site';
import { OutboundPartnerLink } from '@/components/OutboundPartnerLink';
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Truck,
  FlaskConical,
  PackageCheck,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Verified UK Peptide Suppliers Matrix',
  description:
    'Independent audit of 5 verified UK peptide distributors: purity standards, HPLC batch verification, dispatch corridors, and laboratory research catalogs.',
  path: '/vendors/',
});

export default function VendorsIndexPage() {
  const vendors = getAllVendors();

  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">Verified UK Suppliers</span>
      </nav>

      {/* Directory Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Independent Commercial Quality Audit</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Verified UK Peptide Suppliers
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Standardized laboratory benchmarking across Britain&apos;s leading chemical research suppliers.
          Every listed partner is evaluated on third-party HPLC analytical baselines, mass spectrometry (ESI-MS)
          identity verification, nitrogen-purged borosilicate vial packaging, and UK cold-chain dispatch reliability.
        </p>
      </div>

      {/* Detailed Vendor Cards */}
      <div className="space-y-8">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="clinical-card p-6 sm:p-8 bg-white border border-slate-200/90 rounded-3xl shadow-sm hover:border-emerald-500/40 transition-all space-y-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                {vendor.logoUrl && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200 shadow-xs p-2 flex items-center justify-center flex-shrink-0">
                    <img
                      src={vendor.logoUrl}
                      alt={vendor.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge-emerald font-mono text-xs">
                      HPLC Baseline ≥{vendor.hplcBaseline}%
                    </span>
                    <span className="badge-cobalt font-mono text-xs">
                      Est. {vendor.establishedYear}
                    </span>
                    <span className="text-xs font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-300 font-semibold">
                      {vendor.headquarters}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {vendor.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-700 max-w-3xl leading-relaxed">
                    {vendor.productCatalogSummary}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 lg:flex-col lg:items-end flex-shrink-0">
                <OutboundPartnerLink
                  href={vendor.baseUrl}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold text-xs hover:bg-emerald-800 transition-colors shadow-sm inline-flex items-center gap-1.5"
                >
                  <span>Visit Supplier Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </OutboundPartnerLink>
                <Link
                  href={`/vendors/${vendor.id}/`}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-900 font-semibold text-xs hover:bg-slate-200 transition-colors inline-flex items-center gap-1"
                >
                  <span>Read Full Audit Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs">
              {/* Quality Testing Protocols */}
              <div className="space-y-2">
                <div className="font-mono font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                  <FlaskConical className="w-4 h-4 text-emerald-700" />
                  <span>Analytical Standards</span>
                </div>
                <ul className="space-y-1.5 text-slate-700">
                  {vendor.labTestingStandards.map((std, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                      <span>{std}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Packaging Protocols */}
              <div className="space-y-2">
                <div className="font-mono font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                  <PackageCheck className="w-4 h-4 text-blue-700" />
                  <span>Packaging Standard</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {vendor.packagingStandards}
                </p>
              </div>

              {/* Dispatch Corridors */}
              <div className="space-y-2">
                <div className="font-mono font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  <span>Dispatch Network</span>
                </div>
                <ul className="space-y-1 text-slate-700 font-mono">
                  {vendor.dispatchLocations.map((loc, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                      <span>{loc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
