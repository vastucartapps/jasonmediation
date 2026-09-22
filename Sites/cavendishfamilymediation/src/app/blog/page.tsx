import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { CAVENDISH_BRAND } from '../../config/brand';
import {
  SITE2_BLOG_POSTS,
  CORE_SERVICES,
  SITE2_COUNTIES,
  Breadcrumbs,
  ArrowRightIcon,
  ShieldCheckIcon,
} from '@mediation/core';

export const metadata: Metadata = {
  title: 'Family Law & Separation Blog | South East & East Anglia Legal Insights',
  description:
    'Authoritative, solicitor-reviewed guides on UK parental relocation, parental house deposits, final salary pension sharing, and Form E financial disclosure.',
};

export default function BlogIndexPage() {
  const breadcrumbs = [{ label: 'Family Law Blog', href: '/blog' }];

  // Unique clusters
  const clusters = Array.from(
    new Set(SITE2_BLOG_POSTS.map((p) => p.clusterName))
  );

  return (
    <div className="w-full bg-white">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <section className="bg-emerald-950 text-white py-14 lg:py-20 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-2">
              South East & East Anglia Separation Knowledge Bank
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4 text-white">
              Family Mediation & Separation Blog
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-medium">
              High-trust, specialist guidance answering complex separation questions regarding high-value property, family loans, parental relocations, and pension sharing across Suffolk, Essex, Kent, and Sussex.
            </p>
          </div>
        </div>
      </section>

      {/* Cluster Navigation Tags */}
      <section className="py-6 bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase text-stone-700 mr-2">
              Topic Clusters:
            </span>
            {clusters.map((cluster) => (
              <span
                key={cluster}
                className="px-3 py-1 rounded-full text-xs font-bold bg-white text-stone-800 border-2 border-stone-200 shadow-xs"
              >
                {cluster}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Articles Grid */}
      <section className="py-16 sm:py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SITE2_BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  <div className="relative w-full h-52 rounded-xl overflow-hidden mb-5 bg-stone-100 border-2 border-stone-200">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 550px"
                      className="object-cover object-center group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-950 border border-emerald-300">
                      {post.clusterName}
                    </span>
                    <span className="text-xs font-bold text-stone-700">{post.readingTime}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-950 mb-3">
                    <Link href={`/blog/${post.slug}`} className="hover:text-emerald-800 transition">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-stone-800 font-medium text-xs sm:text-sm mb-6 leading-relaxed">
                    {post.summary}
                  </p>

                  <div className="bg-stone-50 rounded-xl p-4 border-2 border-stone-200 mb-6 text-xs text-stone-800 font-medium">
                    <strong className="text-stone-950 block mb-1 font-bold">Key Dilemma Addressed:</strong>
                    {post.coreQuestion}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-700">Published {post.publishedDate}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition group"
                  >
                    <span>Read Complete Legal Analysis</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Our Core Dispute Resolution Services */}
      <section className="py-14 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
              Statutory Resolution Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-2">
              Explore Accredited Family Mediation Services
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">
              Every guide relates to one of our core statutory mediation pathways. Discover procedures, fees, and FMC compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {CORE_SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="p-5 rounded-2xl bg-white border-2 border-stone-200 hover:border-emerald-700 transition shadow-xs hover:shadow-sm group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                    {s.badge}
                  </span>
                  <h3 className="font-serif font-bold text-stone-950 text-base mb-2 group-hover:text-emerald-900 transition">
                    {s.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {s.summary}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-emerald-950">
                  <span>Access {s.title} Practice Guide</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Regional Family Court Towns Directory */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-stone-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800 mb-2 text-center">
              Regional Family Court Districts &amp; Local Centres Served:
            </h3>
            <p className="text-xs text-stone-600 text-center mb-5 max-w-xl mx-auto">
              Our accredited family mediators serve separating parents and couples across all South East and East Anglia county court areas:
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {SITE2_COUNTIES.flatMap((c) =>
                c.towns.map((town) => (
                  <Link
                    key={town.slug}
                    href={`/locations/${c.slug}/${town.slug}`}
                    className="px-3 py-1.5 rounded-lg bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 border border-stone-200 hover:border-emerald-300 font-semibold transition"
                  >
                    Family Mediation {town.name}
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Box */}
      <section className="py-12 bg-white border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-white">
                Require Discrete, High-Trust Financial Mediation?
              </h3>
              <p className="text-sm text-emerald-100 font-medium max-w-xl">
                Our accredited FMC practitioners arrange confidential MIAM assessments within 24 to 48 hours across Ipswich, Chelmsford, Brighton, and Canterbury.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-md transition"
            >
              Book Confidential Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
