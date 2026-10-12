import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';
import { Mail, ChevronRight, Clock, MapPin, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Laboratory Desk & Enquiries',
  description:
    'Contact the Peptides-UK.org academic registry desk for laboratory auditing requests, verification enquiries, or data updates.',
  alternates: {
    canonical: `${SITE_METADATA.url}/contact/`,
  },
};

export default function ContactPage() {
  return (
    <div className="container-wide py-8 md:py-12 space-y-12">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">Contact</span>
      </nav>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
          <Mail className="w-3.5 h-3.5" />
          <span>Laboratory Desk Communications</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Contact Peptides UK
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          For analytical verification submissions, academic citation updates, or supplier audit enquiries, contact
          our British laboratory editorial desk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Desk Details</h2>
          <div className="space-y-4 text-xs font-mono text-slate-700">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-emerald-600 mt-0.5" />
              <div>
                <div className="text-slate-500">Email Address:</div>
                <div className="font-bold text-slate-900">{SITE_METADATA.contactEmail}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <div className="text-slate-500">Operational Hours:</div>
                <div>{SITE_METADATA.operatingHours}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-600 mt-0.5" />
              <div>
                <div className="text-slate-500">Jurisdiction &amp; Region:</div>
                <div>London &amp; Manchester, United Kingdom</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Supplier Verification Inquiries</span>
          </div>
          <h3 className="text-xl font-bold">Submit a Chemical Lot for Audit</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            UK chemical suppliers requesting inclusion in the verified directory must supply third-party ISO-17025
            HPLC chromatograms, ESI mass spectrometry data, and proof of cold-chain packaging protocols.
          </p>
        </div>
      </div>
    </div>
  );
}
