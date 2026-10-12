import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllVendors, getVendorById } from '@/data/suppliers';
import { getAllCompounds } from '@/data/compounds';
import { SITE_METADATA } from '@/data/site';
import { ReagentCard } from '@/components/ReagentCard';
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
  Clock,
  MapPin,
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
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-8 relative overflow-hidden bg-chem-lattice">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Vendor Official Brand Logo */}
            {vendor.logoUrl && (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border border-slate-200 shadow-md p-3 flex items-center justify-center flex-shrink-0">
                <img
                  src={vendor.logoUrl}
                  alt={`${vendor.name} UK verified laboratory supplier logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}

            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge-emerald font-mono text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Audited UK Commercial Partner</span>
                </span>
                <span className="badge-cobalt font-mono text-xs">
                  HPLC Purity ≥{vendor.hplcBaseline}%
                </span>
                <span className="badge-amber font-mono text-xs">
                  Est. {vendor.establishedYear}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                {vendor.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{vendor.headquarters}</span>
                </span>
                <span>&middot;</span>
                <span>Domain: <strong className="text-slate-800">{vendor.domain}</strong></span>
              </div>
            </div>
          </div>

          <a
            href={vendor.baseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-700/20 inline-flex items-center gap-2 flex-shrink-0"
          >
            <span>Visit Official {vendor.name} Store</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Narrative Summary */}
        <p className="text-base text-slate-700 leading-relaxed max-w-4xl">
          {vendor.productCatalogSummary}
        </p>

        {/* Audit Details 3-Col Elevated Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs">
          {/* 1. Analytical Quality Standards */}
          <div className="card-inner-elevated p-6 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
              <div className="font-mono font-bold text-xs uppercase text-emerald-800 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-700">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <span>Analytical Standards</span>
              </div>
              <span className="badge-emerald text-[10px] py-0 px-2">≥{vendor.hplcBaseline}% HPLC</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 pt-1">
              {vendor.labTestingStandards.map((std, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{std}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Packaging & Cold-Chain */}
          <div className="card-inner-elevated p-6 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
              <div className="font-mono font-bold text-xs uppercase text-blue-800 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100/80 flex items-center justify-center text-blue-700">
                  <PackageCheck className="w-4 h-4" />
                </div>
                <span>Packaging &amp; Cold-Chain</span>
              </div>
              <span className="badge-cobalt text-[10px] py-0 px-2">Type I Glass</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed pt-1">
              {vendor.packagingStandards}
            </p>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
              Tamper-evident crimp seals &amp; desiccant preservation verified.
            </div>
          </div>

          {/* 3. UK & International Dispatch */}
          <div className="card-inner-elevated p-6 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
              <div className="font-mono font-bold text-xs uppercase text-indigo-800 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-100/80 flex items-center justify-center text-indigo-700">
                  <Truck className="w-4 h-4" />
                </div>
                <span>UK Express Dispatch</span>
              </div>
              <span className="badge-purple text-[10px] py-0 px-2">Tracked 24</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 font-mono pt-1">
              {vendor.dispatchLocations.map((loc, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span>{loc}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
              Cold-pack insulated packaging for temperature-sensitive reagents.
            </div>
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

      {/* Verified Compounds Supplied (Rich ReagentCard Grid) */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase text-emerald-700">
              Audited Catalog Inventory
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Reagents Verified with {vendor.name} ({suppliedCompounds.length})
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-500">
            ≥{vendor.hplcBaseline}% Third-Party Assay Guaranteed
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliedCompounds.map((compound) => (
            <ReagentCard key={compound.slug} compound={compound} />
          ))}
        </div>
      </section>
    </div>
  );
}
