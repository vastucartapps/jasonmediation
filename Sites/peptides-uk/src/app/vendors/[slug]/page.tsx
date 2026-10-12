import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllVendors, getVendorById } from '@/data/suppliers';
import { getAllCompounds } from '@/data/compounds';
import { SITE_METADATA } from '@/data/site';
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Truck,
  FlaskConical,
  PackageCheck,
  ArrowRight,
  ChevronRight,
  Award,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const vendors = getAllVendors();
  return vendors.map((v) => ({ slug: v.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vendor = getVendorById(slug);
  if (!vendor) return {};

  return {
    title: `${vendor.name} UK Laboratory Audit & Supplier Profile`,
    description: `Independent UK audit of ${vendor.name} (${vendor.domain}): HPLC purity baseline ≥${vendor.hplcBaseline}%, dispatch corridors, packaging standards, and verified research compounds.`,
    alternates: {
      canonical: `${SITE_METADATA.url}/vendors/${vendor.id}/`,
    },
    openGraph: {
      title: `${vendor.name} UK Supplier Dossier`,
      description: vendor.productCatalogSummary,
      url: `${SITE_METADATA.url}/vendors/${vendor.id}/`,
      images: [`${SITE_METADATA.url}/icon-512x512.png`],
    },
  };
}

export default async function VendorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vendor = getVendorById(slug);
  if (!vendor) notFound();

  const allCompounds = getAllCompounds();
  const suppliedCompounds = allCompounds.filter((c) =>
    vendor.verifiedCompounds.includes(c.slug)
  );

  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/vendors/" className="hover:text-emerald-700">
          Verified UK Suppliers
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">{vendor.name}</span>
      </nav>

      {/* Supplier Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-emerald font-mono text-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Audited UK Commercial Partner</span>
              </span>
              <span className="badge-cobalt font-mono text-xs">
                HPLC Purity ≥{vendor.hplcBaseline}%
              </span>
              <span className="badge-amber font-mono text-xs">
                Established {vendor.establishedYear}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              {vendor.name}
            </h1>
            <div className="text-xs font-mono text-slate-500">
              Headquarters: <strong className="text-slate-800">{vendor.headquarters}</strong> &middot; Domain:{' '}
              <strong className="text-slate-800">{vendor.domain}</strong>
            </div>
          </div>

          <a
            href={vendor.baseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors shadow-md inline-flex items-center gap-2 flex-shrink-0"
          >
            <span>Visit Official {vendor.name} Store</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Narrative Summary */}
        <p className="text-base text-slate-700 leading-relaxed max-w-4xl">
          {vendor.productCatalogSummary}
        </p>

        {/* Audit Details 3-Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="font-mono font-bold uppercase text-slate-500 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-emerald-600" />
              <span>Analytical Quality Standards</span>
            </div>
            <ul className="space-y-1.5 text-slate-700">
              {vendor.labTestingStandards.map((std, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{std}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="font-mono font-bold uppercase text-slate-500 flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-blue-600" />
              <span>Packaging &amp; Cold-Chain</span>
            </div>
            <p className="text-slate-700 leading-relaxed">{vendor.packagingStandards}</p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="font-mono font-bold uppercase text-slate-500 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>UK &amp; International Dispatch</span>
            </div>
            <ul className="space-y-1 text-slate-700 font-mono">
              {vendor.dispatchLocations.map((loc, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{loc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Official Sourcing Links for Specific Categories */}
      {vendor.officialCategoryLinks && vendor.officialCategoryLinks.length > 0 && (
        <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Official Research Categories at {vendor.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {vendor.officialCategoryLinks.map((catLink, i) => (
              <a
                key={i}
                href={catLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all flex items-center justify-between group"
              >
                <span className="font-semibold text-xs text-slate-800 group-hover:text-emerald-700">
                  {catLink.categoryName}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Verified Compounds Supplied */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Reagents Verified with {vendor.name} ({suppliedCompounds.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliedCompounds.map((compound) => (
            <Link
              key={compound.slug}
              href={`/peptides/${compound.slug}/`}
              className="clinical-card p-5 group flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-xs text-slate-400 mb-1">
                  CAS {compound.casNumber}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {compound.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {compound.shortOverview}
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between text-xs font-semibold text-emerald-600">
                <span>View Full Monograph</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
