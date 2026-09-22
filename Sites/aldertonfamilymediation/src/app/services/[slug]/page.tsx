import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ALDERTON_BRAND } from '../../../config/brand';
import {
  CORE_SERVICES,
  SITE1_COUNTIES,
  SITE1_BLOG_POSTS,
  Breadcrumbs,
  FAQSection,
  LeadIntakeForm,
  CheckCircleIcon,
  CalendarClockIcon,
  ShieldCheckIcon,
  AwardSealIcon,
  PhoneCallIcon,
  MapPinLocationIcon,
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
    title: `${service.title} | ${ALDERTON_BRAND.brandName}`,
    description: service.summary,
    openGraph: {
      title: `${service.title} | ${ALDERTON_BRAND.brandName}`,
      description: service.summary,
      url: `${ALDERTON_BRAND.siteUrl}/services/${service.slug}`,
      type: 'website',
      images: [
        {
          url: `${ALDERTON_BRAND.siteUrl}${service.heroImage}`,
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

  const serviceSchema = generateServiceSchema(ALDERTON_BRAND, service);

  return (
    <div className="w-full bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <section className="bg-slate-900 text-white py-14 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <AwardSealIcon className="w-3.5 h-3.5 text-amber-400" />
                {service.badge}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white">
                {service.heroHeadline}
              </h1>

              <p className="text-slate-100 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
                {service.heroSubheadline}
              </p>

              <div className="bg-slate-800/90 rounded-xl p-4 border-2 border-slate-700 text-xs text-slate-200 space-y-1.5 font-medium">
                <div>
                  <strong className="text-white font-bold">Statutory Framework:</strong> {service.statutoryBasis}
                </div>
                {service.courtFormRequired && (
                  <div>
                    <strong className="text-white font-bold">Court Form Endorsed:</strong> {service.courtFormRequired}
                  </div>
                )}
                <div>
                  <strong className="text-white font-bold">Estimated Pathway:</strong> {service.typicalDuration}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition text-center"
                >
                  Book Assessment
                </Link>
                <a
                  href={`tel:${ALDERTON_BRAND.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-sm border-2 border-slate-600 transition whitespace-nowrap shadow-xs"
                >
                  <PhoneCallIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="whitespace-nowrap tracking-wide">{ALDERTON_BRAND.formattedPhone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <LeadIntakeForm
                brandName={ALDERTON_BRAND.brandName}
                phone={ALDERTON_BRAND.phone}
                formattedPhone={ALDERTON_BRAND.formattedPhone}
                defaultService={service.slug}
                buttonBgClass="bg-amber-600 hover:bg-amber-700 text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visual Service Context Section with Sincere Image */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md bg-slate-100">
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center"
              />
            </div>
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                FMC Accredited Dispute Resolution
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
                Professional Mediation for {service.navLabel}
              </h2>
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                {service.legalFramework}
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-800 hover:text-amber-950 transition"
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
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-700 block mb-2">
              Structured & Clear
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-3">
              How the {service.title} Process Works
            </h2>
            <p className="text-slate-800 font-medium text-sm leading-relaxed">
              Step-by-step guidance tailored to achieve practical resolution and meet official statutory standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm relative"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-base mb-4 shadow-sm">
                  {step.stepNumber}
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-950 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 font-medium mb-4 leading-relaxed">
                  {step.description}
                </p>
                <div className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-md inline-block">
                  {step.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-3">
              Why Families Choose This Pathway
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Clear, practical benefits designed to protect family stability and save legal expenses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.keyBenefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80"
              >
                <CheckCircleIcon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Practice Connections */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4 text-center">
            {service.title} Available Across East Midlands Locations:
          </h3>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {SITE1_COUNTIES.flatMap((c) =>
              c.towns.map((town) => (
                <Link
                  key={town.slug}
                  href={`/locations/${town.countySlug}/${town.slug}/${service.slug}`}
                  className="px-3 py-1.5 rounded-lg bg-white border-2 border-slate-200 text-slate-900 font-bold hover:border-amber-500 hover:text-amber-900 transition"
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
        const relatedArticles = SITE1_BLOG_POSTS.filter(
          (p) => p.relatedServiceSlug === service.slug
        );
        if (relatedArticles.length === 0) return null;
        return (
          <section className="py-16 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
                    Topical Legal Guidance
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    Related Dispute Guides &amp; Practical Advice
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((article) => (
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
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
              Explore Our Other Accredited Mediation Pathways
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Specialized dispute resolution services delivered by accredited Family Mediation Council practitioners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CORE_SERVICES.filter((s) => s.slug !== service.slug).map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 transition group flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                    {other.badge}
                  </span>
                  <h4 className="font-serif font-bold text-white text-base group-hover:text-amber-300 transition mb-2">
                    {other.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {other.summary}
                  </p>
                </div>
                <div className="pt-4 mt-2 flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
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
