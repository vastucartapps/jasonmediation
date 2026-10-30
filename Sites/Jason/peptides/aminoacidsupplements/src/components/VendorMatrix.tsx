import React from 'react';
import Link from 'next/link';
import { getAllVendors } from '@/data/suppliers';
import { OutboundPartnerLink } from '@/components/OutboundPartnerLink';
import { CheckCircle2, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

export function VendorMatrix() {
  const vendors = getAllVendors();

  return (
    <section className="py-12 bg-white rounded-3xl border border-zinc-200/90 p-6 md:p-10 shadow-am-card space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-orange-800 bg-orange-50 px-3 py-1 rounded-full border border-orange-200/80 mb-2.5">
            <ShieldCheck className="w-4 h-4 text-orange-700" />
            <span>Commercial Supplier Audit Register</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
            The 5 Verified Chemical Suppliers
          </h2>
          <p className="text-sm text-zinc-700 max-w-2xl mt-1 leading-relaxed">
            Standardized chemical audit comparing UK and European dispatch corridors, third-party HPLC analytical baselines, and certified packaging integrity.
          </p>
        </div>
        <Link
          href="/vendors/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-700 hover:text-indigo-900 underline underline-offset-4"
        >
          <span>View All Supplier Dossiers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Responsive Matrix Grid / Table */}
      <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-zinc-200">
        <table className="w-full text-left text-xs border-collapse min-w-[720px]">
          <thead className="bg-zinc-50 text-zinc-700 font-mono text-[11px] uppercase tracking-wider border-b border-zinc-200">
            <tr>
              <th className="py-3.5 px-4 font-bold">Supplier &amp; Dispatch Hub</th>
              <th className="py-3.5 px-4 font-bold">HPLC Baseline</th>
              <th className="py-3.5 px-4 font-bold">Quality Protocols</th>
              <th className="py-3.5 px-4 font-bold">Packaging Standard</th>
              <th className="py-3.5 px-4 font-bold">Dispatch Corridors</th>
              <th className="py-3.5 px-4 font-bold text-right">Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="hover:bg-zinc-50/80 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    {vendor.logoUrl && (
                      <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 p-1 flex items-center justify-center flex-shrink-0 shadow-2xs">
                        <img
                          src={vendor.logoUrl}
                          alt={vendor.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <Link
                        href={`/vendors/${vendor.id}/`}
                        className="font-bold text-zinc-950 hover:text-indigo-700 transition-colors block text-sm"
                      >
                        {vendor.name}
                      </Link>
                      <span className="text-[11px] text-zinc-600 block">{vendor.headquarters}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 font-mono font-bold text-orange-700">
                  &ge;{vendor.hplcBaseline}%
                </td>
                <td className="py-4 px-4 text-zinc-700 max-w-[200px]">
                  <ul className="space-y-1">
                    {vendor.labTestingStandards.slice(0, 2).map((std, i) => (
                      <li key={i} className="line-clamp-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-indigo-600 flex-shrink-0" />
                        <span className="text-[11px]">{std}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-4 px-4 text-zinc-700 max-w-[180px]">
                  <p className="line-clamp-2 text-[11px]">{vendor.packagingStandards}</p>
                </td>
                <td className="py-4 px-4 text-zinc-700 font-mono text-[11px]">
                  {vendor.dispatchLocations[0]}
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/vendors/${vendor.id}/`}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors border border-zinc-200"
                    >
                      Dossier
                    </Link>
                    <OutboundPartnerLink
                      href={vendor.baseUrl}
                      className="btn-amino-copper text-xs py-1.5 px-3 rounded-lg"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3 h-3" />
                    </OutboundPartnerLink>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
