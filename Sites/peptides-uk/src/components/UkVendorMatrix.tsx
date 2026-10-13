import React from 'react';
import Link from 'next/link';
import { getAllVendors } from '@/data/suppliers';
import { OutboundPartnerLink } from '@/components/OutboundPartnerLink';
import { CheckCircle2, ExternalLink, ShieldCheck, Truck, FlaskConical, ArrowRight } from 'lucide-react';

export function UkVendorMatrix() {
  const vendors = getAllVendors();

  return (
    <section className="py-12 bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Independent UK Commercial Benchmarking</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            The 5 Verified UK Peptide Suppliers
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Standardized laboratory audit comparing British dispatch locations, third-party HPLC analytical baselines, and certified packaging protocols.
          </p>
        </div>
        <Link
          href="/vendors/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 hover:text-emerald-700 underline underline-offset-4"
        >
          <span>View Full Supplier Dossiers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Responsive Matrix Grid / Table */}
      <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left text-xs border-collapse min-w-[700px]">
          <thead className="bg-slate-50 text-slate-700 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4 font-bold">Supplier &amp; UK Hub</th>
              <th className="py-3.5 px-4 font-bold">HPLC Baseline</th>
              <th className="py-3.5 px-4 font-bold">Quality Protocols</th>
              <th className="py-3.5 px-4 font-bold">Packaging Standard</th>
              <th className="py-3.5 px-4 font-bold">Dispatch Corridors</th>
              <th className="py-3.5 px-4 font-bold text-right">Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    {vendor.logoUrl && (
                      <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center flex-shrink-0 shadow-2xs">
                        <img
                          src={vendor.logoUrl}
                          alt={vendor.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{vendor.name}</div>
                      <div className="text-slate-500 font-mono text-[11px]">{vendor.headquarters}</div>
                      <div className="text-emerald-600 font-mono text-[10px] mt-0.5">Est. {vendor.establishedYear}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 font-mono">
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-bold border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>≥{vendor.hplcBaseline}%</span>
                  </span>
                </td>
                <td className="py-4 px-4 max-w-xs">
                  <ul className="space-y-1 text-slate-600">
                    {vendor.labTestingStandards.slice(0, 2).map((std, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span className="line-clamp-1">{std}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-4 px-4 max-w-xs text-slate-600">
                  <p className="line-clamp-2">{vendor.packagingStandards}</p>
                </td>
                <td className="py-4 px-4 text-slate-600 font-mono text-[11px]">
                  <div className="flex items-center gap-1 text-slate-700 font-semibold">
                    <Truck className="w-3.5 h-3.5 text-blue-600" />
                    <span>{vendor.dispatchLocations[0]}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex flex-col items-end gap-1.5">
                    <OutboundPartnerLink
                      href={vendor.baseUrl}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-xs"
                    >
                      <span>Visit Catalog</span>
                      <ExternalLink className="w-3 h-3" />
                    </OutboundPartnerLink>
                    <Link
                      href={`/vendors/${vendor.id}/`}
                      className="text-[11px] text-slate-500 hover:text-slate-800 underline"
                    >
                      Audit Dossier
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Independent verification protocol: all listed suppliers undergo blind quarterly HPLC testing.</span>
        </div>
        <Link href="/verification/" className="text-emerald-600 font-semibold hover:underline flex-shrink-0">
          Learn More About Our HPLC Testing Standards →
        </Link>
      </div>
    </section>
  );
}
