import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ALDERTON_BRAND } from '../../../../config/brand';
import {
  SITE1_COUNTIES,
  CORE_SERVICES,
  SITE1_BLOG_POSTS,
  Breadcrumbs,
  CourtAuthorityCard,
  FAQSection,
  LeadIntakeForm,
  MapPinLocationIcon,
  AwardSealIcon,
  PhoneCallIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  AccreditationTrustBar,
  LitigationComparisonTable,
  LocalProcedureGuide,
  generateLocalBusinessSchema,
  generateGeoImageSchema,
} from '@mediation/core';

interface TownLocationProps {
  params: Promise<{ county: string; town: string }>;
}

export async function generateStaticParams() {
  const params: { county: string; town: string }[] = [];
  SITE1_COUNTIES.forEach((county) => {
    county.towns.forEach((town) => {
      params.push({
        county: county.slug,
        town: town.slug,
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }: TownLocationProps): Promise<Metadata> {
  const { county: countySlug, town: townSlug } = await params;
  const county = SITE1_COUNTIES.find((c) => c.slug === countySlug);
  const town = county?.towns.find((t) => t.slug === townSlug);

  if (!town) return { title: 'Location Not Found' };

  return {
    title: `Family Mediation in ${town.name} Near Me | FMC Accredited Practice`,
    description: `FMC-accredited family mediation practice in ${town.name}, ${town.county}. Rapid MIAM assessments, child arrangements, and financial settlements. Serving families across ${town.name} and surrounding communities.`,
    keywords: [
      `family mediation ${town.name}`,
      `family mediation near me ${town.name}`,
      `MIAM assessment ${town.name}`,
      `divorce mediation ${town.name}`,
      `child arrangements ${town.name}`,
      `family court mediation ${town.county}`,
    ],
  };
}

export default async function TownLocationPage({ params }: TownLocationProps) {
  const { county: countySlug, town: townSlug } = await params;
  const county = SITE1_COUNTIES.find((c) => c.slug === countySlug);
  const town = county?.towns.find((t) => t.slug === townSlug);

  if (!town || !county) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Locations', href: '/locations' },
    { label: town.name, href: `/locations/${county.slug}/${town.slug}` },
  ];

  const localSchema = generateLocalBusinessSchema(ALDERTON_BRAND, town);
  const geoImagesSchema = CORE_SERVICES.map((service) =>
    generateGeoImageSchema(
      ALDERTON_BRAND,
      service.cardImage || service.heroImage,
      `${service.title} in ${town.name}`,
      town,
      service
    )
  );

  return (
    <div className="w-full bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [localSchema, ...geoImagesSchema],
          }),
        }}
      />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-14 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <MapPinLocationIcon className="w-3.5 h-3.5 text-amber-400" />
                  {town.name}, {town.county}
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online & In-Person Practice
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white">
                Family Mediation {town.name} Near Me
              </h1>

              <p className="text-slate-100 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
                {town.localContext}
              </p>

              <div className="bg-slate-800/90 rounded-xl p-4 border-2 border-slate-700 text-xs text-slate-200 space-y-2 font-medium">
                <div>
                  <strong className="text-white font-bold">Regional Coverage:</strong>{' '}
                  Serving families across {town.name} and surrounding {town.county} communities
                </div>
                <div>
                  <strong className="text-white font-bold">Local Access:</strong> {town.transportAndAccess}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition text-center"
                >
                  Book Assessment in {town.name}
                </Link>
                <a
                  href={`tel:${ALDERTON_BRAND.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-sm border-2 border-slate-600 transition whitespace-nowrap shadow-xs"
                >
                  <PhoneCallIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="whitespace-nowrap tracking-wide">{ALDERTON_BRAND.formattedPhone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <LeadIntakeForm
                brandName={ALDERTON_BRAND.brandName}
                phone={ALDERTON_BRAND.phone}
                formattedPhone={ALDERTON_BRAND.formattedPhone}
                defaultTown={town.name}
                buttonBgClass="bg-amber-600 hover:bg-amber-700 text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Targeted Services for this Town */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-700 block mb-2">
              Tailored Mediation Pathways
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-3">
              Mediation Services Available in {town.name}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Explore specialized resolution pathways serving parents and couples across {town.name} and surrounding districts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CORE_SERVICES.map((service) => (
              <div
                key={service.slug}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
              >
                {/* Visual Card Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={service.cardImage || service.heroImage}
                    alt={`FMC accredited ${service.title} session for separating couples in ${town.name}, ${town.county}`}
                    title={`FMC Accredited ${service.title} - ${town.name} Family Mediation Practice`}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 shadow-md">
                      {service.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-4">
                    <span className="text-xs font-semibold text-white bg-slate-950/80 border border-slate-700 px-3 py-1 rounded-full backdrop-blur-xs">
                      {service.typicalDuration}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-slate-950 mb-2">
                      <Link
                        href={`/locations/${county.slug}/${town.slug}/${service.slug}`}
                        className="hover:text-amber-700 transition"
                      >
                        {service.title} in {town.name}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-700 font-normal mb-6 leading-relaxed">
                      {service.summary}
                    </p>
                  </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/locations/${county.slug}/${town.slug}/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-900 transition"
                    >
                      <span>Schedule {service.title} in {town.name}</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/contact"
                      className="text-xs font-bold text-slate-900 hover:text-amber-700 transition"
                    >
                      Book Assessment
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Designated Family Court & Local Authority Details */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <CourtAuthorityCard
                townName={town.name}
                countyName={town.county}
                court={town.designatedCourt}
              />
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
                <h3 className="text-lg font-serif font-bold text-slate-900 mb-3">
                  Neighbouring Areas & Suburbs Served
                </h3>
                <p className="text-xs text-slate-800 font-medium mb-4 leading-relaxed">
                  Our family mediation practice regularly supports clients residing in and around {town.name}, including:
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {town.neighbouringAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-xs hover:border-amber-400 transition-all duration-150 text-xs font-semibold"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span>{area}</span>
                    </span>
                  ))}
                </div>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Transport & Accessibility
                </h4>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  {town.transportAndAccess}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In-Depth Litigation Comparison Table */}
      <LitigationComparisonTable townName={town.name} countyName={town.county} />

      {/* FPR Part 3 Legal Procedure Guide */}
      <LocalProcedureGuide
        townName={town.name}
        countyName={town.county}
        court={town.designatedCourt}
      />

      {/* Local Dispute Guides & Advice (Strict Topical Relevance & Diversity) */}
      {(() => {
        const townArticles = SITE1_BLOG_POSTS.filter(
          (p) => p.relatedTownSlugs?.includes(town.slug)
        );
        // Ensure diverse coverage across core pillars (MIAM, Financial, Child Arrangements)
        const displayArticles: typeof SITE1_BLOG_POSTS = [];
        const seenClusters = new Set<string>();
        for (const post of townArticles) {
          if (!seenClusters.has(post.relatedServiceSlug)) {
            displayArticles.push(post);
            seenClusters.add(post.relatedServiceSlug);
          }
          if (displayArticles.length === 3) break;
        }
        if (displayArticles.length < 3) {
          for (const post of townArticles) {
            if (!displayArticles.some((p) => p.slug === post.slug)) {
              displayArticles.push(post);
            }
            if (displayArticles.length === 3) break;
          }
        }
        if (displayArticles.length === 0) return null;

        return (
          <section className="py-16 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
                    Regional Legal Support
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    Separation &amp; Mediation Guidance for Families in {town.name}
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 hover:underline"
                >
                  <span>Browse Family Law &amp; Mediation Guides</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>

              {displayArticles.length === 1 ? (
                <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-amber-50/30 border-2 border-slate-200 hover:border-amber-500/80 p-6 sm:p-8 transition shadow-xs">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-8 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          {displayArticles[0].clusterName}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {displayArticles[0].readingTime}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-slate-950 text-xl sm:text-2xl hover:text-amber-800 transition">
                        <Link href={`/blog/${displayArticles[0].slug}`}>
                          {displayArticles[0].title}
                        </Link>
                      </h3>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        {displayArticles[0].summary}
                      </p>
                    </div>
                    <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end">
                      <Link
                        href={`/blog/${displayArticles[0].slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-sm transition group"
                      >
                        <span>Read Full Legal Analysis for {town.name}</span>
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`grid grid-cols-1 ${displayArticles.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
                  {displayArticles.map((article) => (
                    <article
                      key={article.slug}
                      className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-amber-500 transition shadow-xs hover:shadow-sm flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-950 border border-amber-300">
                            {article.clusterName}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-600">{article.readingTime}</span>
                        </div>
                        <h3 className="font-serif font-bold text-slate-950 text-base mb-2 group-hover:text-amber-800 transition">
                          <Link href={`/blog/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-slate-700 leading-relaxed line-clamp-3 mb-4 font-medium">
                          {article.summary}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:text-amber-900">
                        <span>Read Full Legal Analysis for {town.name}</span>
                        <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })()}

      {/* Sister Towns Directory in County */}
      {county.towns.filter((t) => t.slug !== town.slug).length > 0 && (
        <section className="py-10 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 text-center">
              Other Family Mediation Practice Centres in {county.name}:
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {county.towns
                .filter((t) => t.slug !== town.slug)
                .map((sister) => (
                  <Link
                    key={sister.slug}
                    href={`/locations/${county.slug}/${sister.slug}`}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:border-amber-500 hover:text-amber-900 transition shadow-2xs"
                  >
                    Family Mediation in {sister.name} &rarr;
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Accreditations Trust Bar */}
      <AccreditationTrustBar />

      {/* Town-Specific FAQs */}
      <FAQSection
        title={`Family Mediation FAQs for ${town.name}`}
        subtitle={`Answers to common questions from separating couples in ${town.name}, ${town.county}.`}
        faqs={town.faqs}
      />
    </div>
  );
}
