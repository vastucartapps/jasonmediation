import React from 'react';
import Link from 'next/link';
import { FlaskConical, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container-ultra-wide py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-800 flex items-center justify-center mx-auto border border-indigo-200">
        <FlaskConical className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <div className="font-mono text-xs font-bold text-indigo-800 uppercase">Error 404 &middot; Reagent Not Found</div>
        <h1 className="text-3xl font-extrabold text-zinc-950">Requested Compound or Pathway Not Indexed</h1>
        <p className="text-sm text-zinc-600 max-w-md mx-auto">
          The requested monograph URL does not exist or has been relocated to another canonical path.
        </p>
      </div>
      <div className="pt-4 flex items-center justify-center gap-4">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-indigo-800 text-white font-semibold text-xs hover:bg-indigo-900 transition-colors inline-flex items-center gap-1.5"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/sitemap/"
          className="px-5 py-2.5 rounded-xl bg-zinc-100 text-zinc-700 font-semibold text-xs hover:bg-zinc-200 transition-colors"
        >
          Explore Visual Sitemap
        </Link>
      </div>
    </div>
  );
}
