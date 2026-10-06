import Link from 'next/link';
import type { Metadata } from 'next';
import { SUPPLIER_PROFILES } from '../../data/suppliers';
import {
  Store,
  ExternalLink,
  Truck,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Commercial Peptide Sourcing Outlets & Laboratory Catalogues',
  description:
    'Directory of independent commercial peptide retailers offering laboratory-grade synthesis batches, lyophilized vials, and temperature-controlled dispatch for research laboratories.',
};

export default function SuppliersPage() {
  return (
    <div className="relative pb-24">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[rgba(141,168,195,0.18)] bg-[#020e24] py-3">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-sky-400 transition-colors">
              Index
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">Commercial Sourcing Directory</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-14 sm:py-16 border-b border-[rgba(141,168,195,0.18)] bg-gradient-to-b from-[#02102b] to-[#041638]">
        <div className="container-wide space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#103059] text-sky-400 border border-sky-500/30">
            <Store className="w-3.5 h-3.5" />
            <span>Commercial Chemical Distributors</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Commercial Peptide Sourcing Directory
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Direct catalogue links to independent commercial vendors providing laboratory-grade research chemicals, lyophilized peptide vials, and reconstitution solvents for in vitro experimentation.
          </p>

          <div className="p-4 rounded-xl bg-[#0a2149] border border-[rgba(141,168,195,0.2)] text-xs text-slate-300 max-w-3xl flex items-start gap-3 mt-4">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>Scientific Notice:</strong> Commercial retail vendors are commercial sourcing outlets and do not constitute scientific regulatory authorities. Primary chemical data and scientific evidence are sourced from PubChem (NIH), UniProt, and peer-reviewed journals.
            </p>
          </div>
        </div>
      </section>

      {/* Supplier Profiles Grid */}
      <div className="container-wide mt-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(SUPPLIER_PROFILES).map((sup) => (
            <div
              key={sup.id}
              className="rounded-3xl p-6 sm:p-8 card-paper border border-[rgba(141,168,195,0.25)] flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(141,168,195,0.18)]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#02102b] to-[#0a2149] border border-[rgba(141,168,195,0.3)] flex items-center justify-center font-bold text-white font-mono text-base">
                      {sup.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{sup.name}</h3>
                      <span className="text-xs font-mono text-slate-400">{sup.domain}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-[#02102b] px-2.5 py-1 rounded-lg border border-[rgba(141,168,195,0.15)]">
                    Est. {sup.establishedYear}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {sup.productCatalogSummary}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-sky-400" /> Dispatch Locations:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sup.dispatchLocations.map((loc, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#02102b] border border-[rgba(141,168,195,0.2)] text-slate-300"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(141,168,195,0.18)]">
                <a
                  href={sup.baseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono font-bold gradient-bg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  <span>Visit Retailer Storefront</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
