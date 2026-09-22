import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ALDERTON_BRAND } from '../../config/brand';
import {
  SITE1_COUNTIES,
  CORE_SERVICES,
  SITE1_BLOG_POSTS,
  Breadcrumbs,
} from '@mediation/core';

export const metadata: Metadata = {
  title: `Site Directory & Sitemap | ${ALDERTON_BRAND.brandName}`,
  description:
    'Complete directory of all family mediation services, regional practices, local court information, and separation guides across the East Midlands.',
};

export default function SitemapPage() {
  const breadcrumbs = [{ label: 'Site Directory', href: '/sitemap' }];

  return (
    <div className="w-full bg-white">
      <Breadcrumbs items={breadcrumbs} />

      <section className="py-14 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-3">
            Practice Directory & Site Hierarchy
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl">
            A comprehensive, transparent index of all services, regional practice centres, local court guides, and separation resources.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Core Pages */}
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">
              Core Practice Pages
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
              <Link href="/" className="text-amber-800 hover:underline">
                Home
              </Link>
              <Link href="/services" className="text-amber-800 hover:underline">
                All Mediation Services
              </Link>
              <Link href="/locations" className="text-amber-800 hover:underline">
                Regional Locations Directory
              </Link>
              <Link href="/blog" className="text-amber-800 hover:underline">
                Family Law & Mediation Guides
              </Link>
              <Link href="/about" className="text-amber-800 hover:underline">
                About FMC Practice
              </Link>
              <Link href="/contact" className="text-amber-800 hover:underline">
                Book Consultation & Contact
              </Link>
              <Link href="/privacy" className="text-amber-800 hover:underline">
                Privacy & Confidentiality
              </Link>
              <Link href="/terms" className="text-amber-800 hover:underline">
                Terms of Engagement
              </Link>
            </div>
          </div>

          {/* Service Practices */}
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">
              Core Mediation Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              {CORE_SERVICES.map((s) => (
                <div key={s.slug} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <Link href={`/services/${s.slug}`} className="font-bold text-slate-900 hover:text-amber-700 block mb-1">
                    {s.title}
                  </Link>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Location Practices & Services */}
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">
              Local Family Mediation Practices by County (48 Community Services)
            </h2>
            <div className="space-y-8">
              {SITE1_COUNTIES.map((county) => (
                <div key={county.slug} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-lg font-serif font-bold text-slate-900 mb-4">
                    {county.name} County Coverage
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {county.towns.map((town) => (
                      <div key={town.slug} className="bg-white rounded-xl p-4 border border-slate-200/80">
                        <Link
                          href={`/locations/${county.slug}/${town.slug}`}
                          className="font-bold text-slate-900 hover:text-amber-700 block mb-2 text-sm"
                        >
                          Family Mediation {town.name} &rarr;
                        </Link>
                        <div className="text-[11px] font-bold text-slate-700 mb-3">
                          Regional Justice Reference: {town.designatedCourt.name}
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-800 font-semibold">
                          {CORE_SERVICES.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/locations/${county.slug}/${town.slug}/${s.slug}`}
                                className="hover:text-amber-800 hover:underline"
                              >
                                • {s.navLabel} in {town.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blog Articles */}
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">
              Family Law & Separation Blog Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              {SITE1_BLOG_POSTS.map((g) => (
                <div key={g.slug} className="p-4 rounded-xl bg-slate-50 border-2 border-slate-200">
                  <Link href={`/blog/${g.slug}`} className="font-bold text-slate-950 hover:text-amber-700 block mb-1">
                    {g.title} &rarr;
                  </Link>
                  <p className="text-xs text-slate-800 font-medium leading-relaxed">{g.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
