import React from 'react';
import Link from 'next/link';
import { FlaskConical, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container-wide py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
        <FlaskConical className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <div className="font-mono text-xs font-bold text-emerald-700 uppercase">Error 404 &middot; Reagent Not Found</div>
        <h1 className="text-3xl font-extrabold text-slate-900">Requested Compound or Pathway Not Indexed</h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          The requested monograph URL does not exist or has been relocated to another canonical path.
        </p>
      </div>
      <div className="pt-4 flex items-center justify-center gap-4">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold text-xs hover:bg-emerald-800 transition-colors inline-flex items-center gap-1.5"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/sitemap/"
          className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-colors"
        >
          Explore Visual Sitemap
        </Link>
      </div>
    </div>
  );
}
