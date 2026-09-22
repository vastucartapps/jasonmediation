import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CAVENDISH_BRAND } from '../../../config/brand';
import {
  CORE_SERVICES,
  SITE2_COUNTIES,
  SITE2_BLOG_POSTS,
  Breadcrumbs,
  FAQSection,
  LeadIntakeForm,
  CheckCircleIcon,
  AwardSealIcon,
  PhoneCallIcon,
  ArrowRightIcon,
  AccreditationTrustBar,
  generateServiceSchema,
} from '@mediation/core';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CORE_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = CORE_SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} | ${CAVENDISH_BRAND.brandName}`,
    description: service.summary,
    openGraph: {
      title: `${service.title} | ${CAVENDISH_BRAND.brandName}`,
      description: service.summary,
      url: `${CAVENDISH_BRAND.siteUrl}/services/${service.slug}`,
      type: 'website',
      images: [
        {
          url: `${CAVENDISH_BRAND.siteUrl}${service.heroImage}`,
          width: 1200,
          height: 675,
          alt: service.title,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = CORE_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Services', href: '/services' },
    { label: service.navLabel, href: `/services/${service.slug}` },
  ];

  const serviceSchema = generateServiceSchema(CAVENDISH_BRAND, service);

  return (
    <div className="w-full bg-[#FAF9F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <section className="bg-emerald-950 text-white py-14 lg:py-20 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <AwardSealIcon className="w-3.5 h-3.5 text-amber-300" />
                {service.badge}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white">
                {service.heroHeadline}
              </h1>

              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
                {service.heroSubheadline}
              </p>

              <div className="bg-emerald-900/80 rounded-xl p-4 border-2 border-emerald-800 text-xs text-emerald-100 space-y-1.5 font-medium">
                <div>
                  <strong className="text-white font-bold">Statutory Framework:</strong> {service.statutoryBasis}
                </div>
                {service.courtFormRequired && (
                  <div>
                    <strong className="text-white font-bold">Court Form Endorsed:</strong> {service.courtFormRequired}
                  </div>
                )}
                <div>
                  <strong className="text-white font-bold">Estimated Duration:</strong> {service.typicalDuration}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-md transition text-center"
                >
                  Book Assessment
                </Link>
                <a
                  href={`tel:${CAVENDISH_BRAND.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-bold text-sm border-2 border-emerald-700 transition whitespace-nowrap shadow-xs"
                >
                  <PhoneCallIcon className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="whitespace-nowrap tracking-wide">{CAVENDISH_BRAND.formattedPhone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <LeadIntakeForm
                brandName={CAVENDISH_BRAND.brandName}
                phone={CAVENDISH_BRAND.phone}
                formattedPhone={CAVENDISH_BRAND.formattedPhone}
                defaultService={service.slug}
                buttonBgClass="bg-emerald-700 hover:bg-emerald-800 text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visual Service Context Section with Sincere Image */}
      <section className="py-14 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 relative aspect-video rounded-2xl overflow-hidden border-2 border-stone-200 shadow-md bg-stone-100">
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center"
              />
            </div>
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                FMC Accredited Dispute Resolution
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
                Professional Mediation for {service.navLabel}
              </h2>
              <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-medium">
                {service.legalFramework}
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition"
                >
                  <span>Book your initial confidential assessment</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800 block mb-2">
              Structured Pathway
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 mb-3">
              How the {service.title} Process Works
            </h2>
            <p className="text-stone-700 font-medium text-sm leading-relaxed">
              Step-by-step guidance tailored to achieve sustainable resolution and meet statutory standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-950 text-amber-300 flex items-center justify-center font-bold text-base mb-4 shadow-sm">
                  {step.stepNumber}
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 font-medium mb-4 leading-relaxed">
                  {step.description}
                </p>
                <div className="text-xs font-bold text-emerald-900 bg-emerald-100/80 border border-emerald-200 px-3 py-1 rounded-md inline-block">
                  {step.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-3">
              Why Families Choose This Pathway
            </h2>
            <p className="text-stone-600 text-sm max-w-xl mx-auto">
              Clear, practical benefits designed to protect family stability and save legal expenses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.keyBenefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200/80"
              >
                <CheckCircleIcon className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Practice Connections */}
      <section className="py-12 bg-stone-100/60 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-wider text-stone-800 mb-4 text-center">
            {service.title} Available Across South East &amp; East Anglia Locations:
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {SITE2_COUNTIES.flatMap((c) =>
              c.towns.map((town) => (
                <Link
                  key={town.slug}
                  href={`/locations/${town.countySlug}/${town.slug}/${service.slug}`}
                  className="px-3 py-1.5 rounded-lg bg-white border-2 border-stone-200 text-stone-900 font-bold hover:border-emerald-700 hover:text-emerald-950 transition shadow-sm"
                >
                  {service.navLabel} in {town.name}
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Related Legal Guides & Case Studies */}
      {(() => {
        const relatedArticles = SITE2_BLOG_POSTS.filter(
          (p) => p.relatedServiceSlug === service.slug
        );
        if (relatedArticles.length === 0) return null;
        return (
          <section className="py-16 bg-white border-t border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                    Topical Legal Guidance
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                    Related Financial &amp; Dispute Guides
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 hover:underline"
                >
                  <span>Browse Family Law &amp; Mediation Guides</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((article) => (
                  <article
                    key={article.slug}
                    className="p-6 rounded-2xl bg-stone-50 border-2 border-stone-200 hover:border-emerald-700 transition shadow-xs hover:shadow-sm flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-950 border border-emerald-300">
                          {article.clusterName}
                        </span>
                        <span className="text-[11px] font-semibold text-stone-600">{article.readingTime}</span>
                      </div>
                      <h3 className="font-serif font-bold text-stone-950 text-base mb-2 group-hover:text-emerald-900 transition">
                        <Link href={`/blog/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-stone-700 leading-relaxed line-clamp-3 mb-4 font-medium">
                        {article.summary}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-emerald-950">
                      <span>Read Complete Guidance on {article.clusterName}</span>
                      <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Cross-Service Hub Navigation */}
      <section className="py-12 bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
              Explore Our Other Accredited Mediation Pathways
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100">
              Specialized dispute resolution services delivered by accredited Family Mediation Council practitioners across the South East.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CORE_SERVICES.filter((s) => s.slug !== service.slug).map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="p-5 rounded-2xl bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-800/80 hover:border-emerald-400 transition group flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-[10px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
                    {other.badge}
                  </span>
                  <h3 className="font-serif font-bold text-white text-base group-hover:text-emerald-200 transition mb-2">
                    {other.title}
                  </h3>
                  <p className="text-xs text-emerald-100 leading-relaxed line-clamp-2">
                    {other.summary}
                  </p>
                </div>
                <div className="pt-4 mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-300 group-hover:translate-x-1 transition-transform">
                  <span>Explore Service</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation Trust Bar */}
      <AccreditationTrustBar />

      <FAQSection faqs={service.faqs} />
    </div>
  );
}
