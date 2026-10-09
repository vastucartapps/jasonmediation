import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllVendors, getVendorById } from '../../../data/suppliers';
import { PEPTIDE_COMPOUNDS } from '../../../data';
import {
  Store,
  ExternalLink,
  Truck,
  ShieldCheck,
  ChevronRight,
  FlaskConical,
  Package,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Calendar,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllVendors().map((vendor) => ({
    slug: vendor.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vendor = getVendorById(slug);

  if (!vendor) {
    return {
      title: 'Vendor Not Found | Trustly Pharma',
    };
  }

  const pageUrl = `https://trustlypharma.uk/vendors/${vendor.id}/`;

  return {
    title: `${vendor.name} Analytical Profile | Trustly Pharma`,
    description: `Analytical profile for ${vendor.name} (${vendor.domain}): quality standards, HPLC/MS verification, cold-chain packaging, and research peptide catalogue.`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${vendor.name} Analytical Profile | Trustly Pharma`,
      description: vendor.productCatalogSummary,
      url: pageUrl,
      type: 'profile',
      siteName: 'Trustly Pharma',
    },
  };
}

export default async function VendorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vendor = getVendorById(slug);

  if (!vendor) {
    notFound();
  }

  const pageUrl = `https://trustlypharma.uk/vendors/${vendor.id}/`;

  // Find compounds stocked by this vendor
  const stockedCompounds = PEPTIDE_COMPOUNDS.filter((compound) =>
    vendor.supportedCompoundSlugs.includes(compound.slug)
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://trustlypharma.uk/#website',
        url: 'https://trustlypharma.uk',
        name: 'Trustly Pharma',
      },
      {
        '@type': 'Organization',
        '@id': `${pageUrl}#organization`,
        name: vendor.name,
        url: vendor.baseUrl,
        description: vendor.productCatalogSummary,
        foundingDate: `${vendor.establishedYear}`,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://trustlypharma.uk/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Commercial Vendors',
            item: 'https://trustlypharma.uk/vendors/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: vendor.name,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${vendor.name} Commercial Vendor Dossier & Independent Testing Matrix`,
        description: vendor.productCatalogSummary,
        isPartOf: { '@id': 'https://trustlypharma.uk/#website' },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        mainEntity: { '@id': `${pageUrl}#organization` },
      },
    ],
  };

  return (
    <div className="relative pb-24">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-[rgba(141,168,195,0.18)] bg-[#020e24] py-3">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Link href="/" className="hover:text-sky-400 transition-colors">
              Index
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/vendors/" className="hover:text-sky-400 transition-colors">
              Commercial Vendors
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-white font-semibold">{vendor.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Dossier Header */}
      <section className="py-12 sm:py-16 border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] to-[#041638]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Header */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Reagent Partner</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#0a2149] text-slate-200 border border-[rgba(141,168,195,0.25)] flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-sky-400" />
                  <span>Est. {vendor.establishedYear}</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#0a2149] text-slate-200 border border-[rgba(141,168,195,0.25)] flex items-center gap-1.5">
                  <Building2 className="w-3 h-3 text-amber-400" />
                  <span>{vendor.headquarters}</span>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                {vendor.logoUrl && (
                  <div className="h-16 px-4 py-2 rounded-2xl bg-white/95 border border-white/20 flex items-center justify-center shrink-0 shadow-lg max-w-[200px]">
                    <img
                      src={vendor.logoUrl}
                      alt={`${vendor.name} logo`}
                      width={170}
                      height={40}
                      className="max-h-10 max-w-[170px] object-contain"
                    />
                  </div>
                )}
                <div className="space-y-1.5">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                    {vendor.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    {vendor.faviconUrl && (
                      <img
                        src={vendor.faviconUrl}
                        alt={`${vendor.name} favicon`}
                        width={16}
                        height={16}
                        className="w-4 h-4 rounded object-contain"
                        loading="lazy"
                      />
                    )}
                    <span className="text-sm font-mono text-sky-300 font-semibold">
                      {vendor.domain}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
                {vendor.productCatalogSummary}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={vendor.baseUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="gradient-bg px-5 py-2.5 rounded-full font-mono text-xs font-bold text-white inline-flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-transform"
                >
                  <span>Visit {vendor.name} Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#catalogues"
                  className="px-4 py-2.5 rounded-full font-mono text-xs font-semibold text-slate-200 bg-[#061a38] hover:bg-[#0a2347] border border-[rgba(141,168,195,0.25)] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Stocked Compounds ({stockedCompounds.length}) ↓</span>
                </a>
              </div>
            </div>

            {/* Right Header: Operations & Dispatch Box */}
            <div className="lg:col-span-4 rounded-3xl border border-[rgba(141,168,195,0.3)] bg-gradient-to-br from-[#071d42] to-[#03112c] p-6 sm:p-7 shadow-xl space-y-5">
              <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-sky-300 block">
                Logistics & Fulfillment Hubs
              </span>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-slate-300 block text-xs uppercase font-semibold">Dispatch Coverage</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {vendor.dispatchLocations.map((loc, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] text-slate-200 text-xs"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[rgba(141,168,195,0.18)]">
                  <span className="text-slate-300 block text-xs uppercase font-semibold">Packaging Integrity</span>
                  <p className="text-slate-200 font-sans text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {vendor.packagingStandards}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container-wide mt-12 space-y-12">
        {/* Quality Standards & Analytical Protocols */}
        <section className="rounded-3xl p-6 sm:p-8 card-paper border border-sky-500/25 bg-gradient-to-br from-[#02102b] via-[#041638] to-[#0a2149] shadow-xl space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[rgba(141,168,195,0.18)]">
            <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-400/20">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-300 font-bold block">
                Analytical Integrity
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Quality Assurance & Laboratory Verification Protocols
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vendor.labTestingStandards.map((std, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#02102b]/90 border border-sky-500/20 hover:border-sky-400/40 transition-colors flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-lg bg-sky-500/15 text-sky-400 border border-sky-400/30 flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{std}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Official Category Sourcing Links */}
        <section className="rounded-3xl p-6 sm:p-8 card-paper border border-[rgba(141,168,195,0.25)] shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[rgba(141,168,195,0.18)]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-400/20">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold block">
                  Category Catalogues
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Official Sourcing Portals for {vendor.name}
                </h2>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-300 bg-[#020e24] px-3 py-1 rounded-full border border-[rgba(141,168,195,0.2)]">
              Outbound Partner Catalogues
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
            Direct navigation links to official catalog sections. All procurement activities occur directly on the partner platform under their stated laboratory supply terms.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vendor.officialCategoryLinks.map((cat, idx) => (
              <a
                key={idx}
                href={cat.url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="p-5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 hover:bg-[#041638] transition-all group flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-sky-400 font-semibold block mb-1">
                    Direct Hub {idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                    {cat.categoryName}
                  </h3>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-300 pt-2 border-t border-[rgba(141,168,195,0.15)]">
                  <span>Open Catalogue</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-sky-400" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Stocked Compounds In Our Index */}
        <section id="catalogues" className="scroll-mt-24 rounded-3xl p-6 sm:p-8 card-paper border border-[rgba(141,168,195,0.25)] shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[rgba(141,168,195,0.18)]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-400/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold block">
                  Chemical Dossiers
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Compounds Cataloged by {vendor.name} in Trustly Pharma Index
                </h2>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-300 bg-[#020e24] px-3 py-1 rounded-full border border-[rgba(141,168,195,0.2)]">
              {stockedCompounds.length} Indexed Compounds
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stockedCompounds.map((comp) => (
              <Link
                key={comp.slug}
                href={`/peptides/${comp.slug}/`}
                className="p-5 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] hover:border-sky-400/60 hover:bg-[#041638] transition-all group flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>CAS {comp.casNumber}</span>
                    <span className="text-emerald-400 font-bold">MW {comp.molecularWeight}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {comp.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-mono mt-0.5 line-clamp-1">
                    {comp.systematicName}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-sky-400 pt-2 border-t border-[rgba(141,168,195,0.15)]">
                  <span>View Chemical Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Strict Regulatory Notice */}
        <div className="rounded-2xl p-5 bg-[#0a1b38] border border-amber-500/30 text-xs text-slate-200 leading-relaxed flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-mono uppercase font-bold text-amber-300 block mb-1">
              Laboratory Research Only Notice
            </span>
            <p>
              Trustly Pharma provides analytical reference specifications, chemical identity registries, and directory links for scientific review. Products cataloged by independent vendors are synthesized strictly for in vitro laboratory research, receptor assays, and academic analysis. None of the listed reagents are licensed for human medical treatment, diagnosis, or clinical ingestion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
