import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CAVENDISH_BRAND } from '../../../../../config/brand';
import {
  SITE2_COUNTIES,
  CORE_SERVICES,
  SITE2_BLOG_POSTS,
  Breadcrumbs,
  CourtAuthorityCard,
  FAQSection,
  LeadIntakeForm,
  AwardSealIcon,
  PhoneCallIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  AccreditationTrustBar,
  LitigationComparisonTable,
  LocalProcedureGuide,
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateGeoImageSchema,
} from '@mediation/core';

interface LocationServicePageProps {
  params: Promise<{ county: string; town: string; service: string }>;
}

export async function generateStaticParams() {
  const params: { county: string; town: string; service: string }[] = [];
  SITE2_COUNTIES.forEach((county) => {
    county.towns.forEach((town) => {
      CORE_SERVICES.forEach((service) => {
        params.push({
          county: county.slug,
          town: town.slug,
          service: service.slug,
        });
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }: LocationServicePageProps): Promise<Metadata> {
  const { county: countySlug, town: townSlug, service: serviceSlug } = await params;
  const county = SITE2_COUNTIES.find((c) => c.slug === countySlug);
  const town = county?.towns.find((t) => t.slug === townSlug);
  const service = CORE_SERVICES.find((s) => s.slug === serviceSlug);

  if (!town || !service) return { title: 'Page Not Found' };

  return {
    title: `${service.title} in ${town.name} Near Me | FMC Accredited Practice`,
    description: `FMC-accredited ${service.title} in ${town.name}, ${town.county}. Rapid appointments, statutory certification paperwork, and expert mediation. Serving families across ${town.name} and surrounding communities.`,
    keywords: [
      `${service.title} in ${town.name}`,
      `${service.title} near me ${town.name}`,
      `family mediation ${town.name}`,
      `MIAM assessment ${town.name}`,
      `${town.name} ${service.navLabel}`,
      `${town.name} family dispute resolution`,
    ],
  };
}

export default async function LocationServicePage({ params }: LocationServicePageProps) {
  const { county: countySlug, town: townSlug, service: serviceSlug } = await params;
  const county = SITE2_COUNTIES.find((c) => c.slug === countySlug);
  const town = county?.towns.find((t) => t.slug === townSlug);
  const service = CORE_SERVICES.find((s) => s.slug === serviceSlug);

  if (!town || !county || !service) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Locations', href: '/locations' },
    { label: town.name, href: `/locations/${county.slug}/${town.slug}` },
    { label: service.navLabel, href: `/locations/${county.slug}/${town.slug}/${service.slug}` },
  ];

  const localSchema = generateLocalBusinessSchema(CAVENDISH_BRAND, town, service);
  const serviceSchema = generateServiceSchema(CAVENDISH_BRAND, service, town);
  const geoImageSchema = generateGeoImageSchema(
    CAVENDISH_BRAND,
    service.cardImage || service.heroImage,
    `${service.title} in ${town.name}`,
    town,
    service
  );

  const combinedFaqs = [
    ...service.faqs,
    ...town.faqs.slice(0, 5),
  ];

  return (
    <div className="w-full bg-[#FAF9F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [localSchema, serviceSchema, geoImageSchema],
          }),
        }}
      />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <section className="bg-emerald-950 text-white py-14 lg:py-20 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <AwardSealIcon className="w-3.5 h-3.5 text-amber-300" />
                  {service.badge} in {town.name}
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  48-Hour Assessment Slots Available
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white">
                {service.title} in {town.name} Near Me
              </h1>

              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
                Looking for FMC-accredited <strong>{service.title.toLowerCase()} in {town.name} near me</strong>? Our certified mediators guide separating couples and parents to sustainable, legally recognized agreements and provide essential statutory certification ({service.courtFormRequired || 'statutory paperwork'}) without the stress, delays, and costs of contested court litigation.
              </p>

              <div className="bg-emerald-900/80 rounded-xl p-4 border-2 border-emerald-800 text-xs text-emerald-100 space-y-2 font-medium">
                <div>
                  <strong className="text-white font-bold">Regional Coverage:</strong>{' '}
                  Serving families across {town.name} and surrounding {town.county} communities
                </div>
                <div>
                  <strong className="text-white font-bold">Statutory Authority:</strong> {service.statutoryBasis}
                </div>
                {service.courtFormRequired && (
                  <div>
                    <strong className="text-white font-bold">Statutory Certification:</strong> {service.courtFormRequired}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-md transition text-center"
                >
                  Book Assessment in {town.name}
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
                defaultTown={town.name}
                defaultService={service.slug}
                buttonBgClass="bg-emerald-700 hover:bg-emerald-800 text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Substantive Visual Feature & Legal Context */}
      <section className="py-14 sm:py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 relative aspect-video rounded-2xl overflow-hidden border-2 border-stone-200 shadow-md bg-emerald-950 group">
              <Image
                src={service.cardImage || service.heroImage}
                alt={`FMC accredited ${service.title} session for separating parents and couples in ${town.name}, ${town.county}`}
                title={`FMC Accredited ${service.title} in ${town.name} - Official Family Mediation`}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-stone-950 shadow-xs">
                  {service.badge}
                </span>
              </div>
              <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium bg-emerald-950/80 px-3 py-1.5 rounded-lg backdrop-blur-xs border border-emerald-800">
                FMC-Accredited Mediation Practice Serving {town.name}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Local Legal Authority &amp; Practice Standards
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
                Accredited {service.title} in {town.name}
              </h2>
              <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-medium">
                {service.legalFramework}
              </p>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                Families in <strong>{town.name}</strong> and surrounding {town.county} areas can access both secure encrypted online video mediation sessions and private meeting facilities. Our FMC-accredited mediators deliver impartial dispute resolution adhering strictly to Family Procedure Rules (FPR) Part 3. Agreements reached in mediation can be formalized into legally binding Consent Orders submitted directly to {town.designatedCourt.name}.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition"
                >
                  <span>Book confidential {service.navLabel.toLowerCase()} session</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Process Steps */}
      <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-800 block mb-2">
              Resolution Framework
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-950 mb-3">
              How {service.title} Works for {town.name} Clients
            </h2>
            <p className="text-stone-800 font-medium text-sm leading-relaxed">
              Our accredited mediators provide a calm, structured sequence of steps to guide you from initial inquiry to final legal paperwork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 border-t-4 border-t-emerald-700 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-950 to-slate-950 text-amber-300 flex items-center justify-center font-bold text-base shadow-md ring-4 ring-emerald-600/15 group-hover:scale-105 transition-transform duration-200">
                      {step.stepNumber}
                    </div>
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Stage {idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-950 mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mb-5 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
                <div className="mt-auto pt-4 border-t border-stone-100 flex items-center">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50/90 border border-emerald-200/80 px-3 py-1.5 rounded-full">
                    <ClockIcon className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{step.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits of this Service */}
      <section className="py-14 sm:py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
              Core Client Benefits
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
              Why Separating Parties in {town.name} Choose {service.title}
            </h2>
            <p className="text-stone-700 text-sm mt-2">
              Statutory mediation provides substantive advantages over contested court hearings at {town.designatedCourt.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.keyBenefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 rounded-xl bg-stone-50 border border-stone-200 shadow-2xs hover:shadow-sm transition"
              >
                <CheckCircleIcon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In-Depth Litigation Comparison Table */}
      <LitigationComparisonTable townName={town.name} countyName={town.county} />

      {/* Local Court Authority */}
      <section className="py-16 sm:py-20 bg-white border-b border-stone-200">
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
              <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
                <h3 className="text-lg font-serif font-bold text-stone-900 mb-3">
                  Serving {town.name} & Surrounding Communities
                </h3>
                <p className="text-xs text-stone-800 font-medium mb-4 leading-relaxed">
                  Our FMC-accredited practitioners support separating parents and couples across {town.name} and nearby areas:
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {town.neighbouringAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-white border border-stone-200 text-xs font-bold text-stone-800 shadow-2xs"
                    >
                      {area}
                    </span>
                  ))}
                </div>

                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Travel & Access Convenience
                </h4>
                <p className="text-xs text-stone-800 font-medium leading-relaxed">
                  {town.transportAndAccess}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                  Other Mediation Services in {town.name}:
                </h4>
                <div className="space-y-2">
                  {CORE_SERVICES.filter((s) => s.slug !== service.slug).map((other) => (
                    <Link
                      key={other.slug}
                      href={`/locations/${county.slug}/${town.slug}/${other.slug}`}
                      className="group flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-emerald-50/70 border border-stone-200 hover:border-emerald-300 transition"
                    >
                      <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-950 transition">
                        Schedule {other.title} in {town.name}
                      </span>
                      <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-stone-200 group-hover:border-emerald-500 text-stone-600 group-hover:text-emerald-800 text-xs font-bold transition shadow-2xs">
                        &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FPR Part 3 Legal Procedure Guide */}
      <LocalProcedureGuide
        townName={town.name}
        countyName={town.county}
        court={town.designatedCourt}
        serviceTitle={service.title}
      />

      {/* Parent Service Hub Connection */}
      <section className="py-12 bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-900/60 rounded-2xl p-6 sm:p-8 border-2 border-emerald-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-emerald-300 font-bold text-xs uppercase tracking-wider">
                Official Statutory Pathway
              </span>
              <h3 className="font-serif font-bold text-white text-xl sm:text-2xl">
                Statutory Standards &amp; Judicial Rules for {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
                Learn about the statutory legal basis under {service.statutoryBasis}, required court forms, and full mediation session frameworks.
              </p>
            </div>
            <Link
              href={`/services/${service.slug}`}
              className="px-6 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition flex-shrink-0 inline-flex items-center gap-2 border border-emerald-500/50 group"
            >
              <span>Statutory Guidelines &amp; Protocols for {service.title}</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Dispute Guides for this Service (Strict Topical Relevance & Adaptive Layout) */}
      {(() => {
        const rawMatching = SITE2_BLOG_POSTS.filter(
          (p) =>
            p.relatedServiceSlug === service.slug ||
            (service.slug === 'all-issues-mediation' &&
              (p.relatedServiceSlug === 'financial-mediation' || p.relatedServiceSlug === 'child-arrangements'))
        );
        // Prioritize guides referencing this town
        const serviceArticles = [...rawMatching].sort((a, b) => {
          const aMatch = a.relatedTownSlugs?.includes(town.slug) ? 1 : 0;
          const bMatch = b.relatedTownSlugs?.includes(town.slug) ? 1 : 0;
          return bMatch - aMatch;
        });

        if (serviceArticles.length === 0) return null;
        return (
          <section className="py-16 bg-white border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                    Related Legal Guides
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                    {service.navLabel} Case Studies &amp; Statutory Guidance
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

              {serviceArticles.length === 1 ? (
                <div className="rounded-2xl bg-gradient-to-br from-stone-50 to-emerald-50/30 border-2 border-stone-200 hover:border-emerald-700/80 p-6 sm:p-8 transition shadow-xs">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-8 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                          Essential Statutory Guidance for {town.name} Applicants
                        </span>
                        <span className="text-xs font-semibold text-stone-500">
                          {serviceArticles[0].readingTime}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-stone-950 text-xl sm:text-2xl hover:text-emerald-800 transition">
                        <Link href={`/blog/${serviceArticles[0].slug}`}>
                          {serviceArticles[0].title}
                        </Link>
                      </h3>
                      <p className="text-sm text-stone-700 leading-relaxed font-medium">
                        {serviceArticles[0].summary}
                      </p>
                    </div>
                    <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end">
                      <Link
                        href={`/blog/${serviceArticles[0].slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-sm transition group"
                      >
                        <span>Read Complete Guidance on {serviceArticles[0].clusterName}</span>
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`grid grid-cols-1 ${serviceArticles.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
                  {serviceArticles.slice(0, 3).map((article) => (
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
                        <span>Read Complete Guidance on {article.title}</span>
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

      {/* Same Service in Other Towns */}
      <section className="py-10 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 text-center">
            {service.title} in Other {county.name} Locations:
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {county.towns
              .filter((t) => t.slug !== town.slug)
              .map((sister) => (
                <Link
                  key={sister.slug}
                  href={`/locations/${county.slug}/${sister.slug}/${service.slug}`}
                  className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-stone-800 text-xs font-bold hover:border-emerald-700 hover:text-emerald-950 transition shadow-2xs"
                >
                  {service.title} in {sister.name} &rarr;
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Accreditations Trust Bar */}
      <AccreditationTrustBar />

      {/* Combined FAQs */}
      <FAQSection
        title={`${service.navLabel} FAQs for ${town.name}`}
        subtitle={`Practical answers for parents and couples in ${town.name}, ${town.county}.`}
        faqs={combinedFaqs}
      />
    </div>
  );
}
