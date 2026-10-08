import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllVendors } from '../../data/suppliers';
import {
  Store,
  ExternalLink,
  Truck,
  ChevronRight,
  ShieldCheck,
  FlaskConical,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Building2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Commercial Chemical Vendors | Trustly Pharma',
  description:
    'Directory of verified commercial chemical vendors and laboratory synthesis partners supplying research-grade peptides, solvents, and analytical accessories.',
  alternates: {
    canonical: 'https://trustlypharma.co.uk/vendors/',
  },
};

export default function VendorsDirectoryPage() {
  const vendors = getAllVendors();

  const pageUrl = 'https://trustlypharma.co.uk/vendors/';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://trustlypharma.co.uk/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Commercial Vendors',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Commercial Chemical Vendors Directory | Trustly Pharma',
        description:
          'Directory of verified commercial chemical vendors and laboratory synthesis partners supplying research-grade peptides, solvents, and analytical accessories.',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: vendors.map((v, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: v.name,
            url: `https://trustlypharma.co.uk/vendors/${v.id}/`,
          })),
        },
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
            <span className="text-white font-semibold">Commercial Vendors Directory</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-14 sm:py-16 border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] to-[#041638]">
        <div className="container-wide space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#103059] text-sky-400 border border-sky-500/30">
            <Store className="w-3.5 h-3.5" />
            <span>Commercial Reagent Partners & Chemical Vendors</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Commercial Chemical Vendors Directory
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Independent partner directory cataloging verified commercial distributors of research-grade chemical reagents, lyophilized peptide vials, multidose cartridges, and reconstitution solvents for institutional and laboratory investigation.
          </p>
        </div>
      </section>

      {/* Main Vendors Grid */}
      <div className="container-wide mt-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="rounded-3xl p-6 sm:p-8 card-paper border border-[rgba(141,168,195,0.25)] flex flex-col justify-between space-y-6 shadow-xl hover:border-sky-400/50 transition-all bg-gradient-to-br from-[#02102b] to-[#05193c]"
            >
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[rgba(141,168,195,0.18)]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Partner
                      </span>
                      <span className="text-[11px] font-mono text-slate-300 bg-[#02102b] px-2 py-0.5 rounded-lg border border-[rgba(141,168,195,0.2)]">
                        Est. {vendor.establishedYear}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-white pt-1">{vendor.name}</h2>
                    <span className="text-xs font-mono text-sky-400 block">{vendor.domain}</span>
                  </div>

                  {vendor.logoUrl ? (
                    <div className="h-14 px-3 py-1.5 rounded-xl bg-white/95 border border-white/20 flex items-center justify-center shrink-0 shadow-md max-w-[150px]">
                      <img
                        src={vendor.logoUrl}
                        alt={`${vendor.name} logo`}
                        width={130}
                        height={36}
                        className="max-h-9 max-w-[130px] object-contain"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500/20 to-emerald-500/20 border border-[rgba(141,168,195,0.3)] flex items-center justify-center font-bold text-white font-mono text-base shrink-0">
                      {vendor.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {vendor.productCatalogSummary}
                </p>

                {/* Key Quality Standards */}
                <div className="space-y-2.5">
                  <span className="text-xs font-mono uppercase tracking-wider text-sky-300 block font-bold flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-sky-400" /> Analytical Protocols:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    {vendor.labTestingStandards.slice(0, 2).map((std, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-[#02102b] border border-[rgba(141,168,195,0.18)] text-slate-200 text-xs leading-snug font-mono"
                      >
                        ✓ {std}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dispatch Hubs */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-300 block font-semibold flex items-center gap-2">
                    <Truck className="w-4 h-4 text-sky-400" /> Dispatch Locations:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {vendor.dispatchLocations.map((loc, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-3 py-1.5 rounded-xl bg-[#02102b] border border-[rgba(141,168,195,0.2)] text-slate-200"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-[rgba(141,168,195,0.18)] flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={`/vendors/${vendor.id}/`}
                  className="px-4 py-2.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 text-sky-300 hover:text-white font-mono text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>View Full Vendor Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={vendor.baseUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#02102b] hover:bg-[#071d42] border border-[rgba(141,168,195,0.2)] text-slate-300 hover:text-white font-mono text-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Architecture Banner */}
        <div className="rounded-3xl p-6 sm:p-8 card-paper border border-sky-500/25 bg-gradient-to-br from-[#02102b] via-[#041638] to-[#0a2149] shadow-xl space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-400/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Trustly Pharma Partner Verification Criteria
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-4xl">
            Commercial vendors cataloged in this directory are indexed for laboratory researcher convenience. Inclusion criteria require published Certificate of Analysis (COA) data, verifiable mass spectrometry and liquid chromatography records, sealed nitrogen packaging, and explicit research-only labeling. Trustly Pharma maintains complete editorial independence.
          </p>
        </div>
      </div>
    </div>
  );
}
