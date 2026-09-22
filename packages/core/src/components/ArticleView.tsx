import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, BrandConfig, CountyRegion, ServiceItem } from '../types';
import { Breadcrumbs } from './Breadcrumbs';
import { FAQSection } from './FAQSection';
import {
  ShieldCheckIcon,
  PhoneCallIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  ClockIcon,
  CourtBuildingIcon,
  AwardSealIcon,
  BuildingOfficeIcon,
} from './Icons';

interface ArticleViewProps {
  brand: BrandConfig;
  post: BlogPost;
  allPosts: BlogPost[];
  counties: CountyRegion[];
  services: ServiceItem[];
  brandVariant?: 'alderton' | 'cavendish';
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  brand,
  post,
  allPosts,
  counties,
  services,
  brandVariant = 'alderton',
}) => {
  const isAlderton = brandVariant === 'alderton';

  const breadcrumbs = [
    { label: 'Family Law Blog', href: '/blog' },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  const relatedService = services.find((s) => s.slug === post.relatedServiceSlug);

  // Match towns for internal links to Money Pages
  const matchedTowns = counties.flatMap((county) =>
    county.towns.filter((t) => post.relatedTownSlugs?.includes(t.slug))
  );

  // Match related blog posts for bidirectional internal links
  const relatedPosts = allPosts.filter(
    (p) => p.slug !== post.slug && (post.relatedPostSlugs?.includes(p.slug) || p.relatedServiceSlug === post.relatedServiceSlug)
  ).slice(0, 3);

  // Default images fallback to ensure at least 3 images
  const articleImages = post.images && post.images.length >= 3
    ? post.images
    : [
        {
          url: post.image || '/images/hero-mediation.webp',
          alt: post.imageAlt || post.title,
          caption: `Professional accredited family dispute resolution session focusing on ${post.clusterName}.`,
        },
        {
          url: isAlderton ? '/images/parenting-schedule-plan.webp' : '/images/financial-settlement-papers.webp',
          alt: `${post.title} - Documentation and Legal Agreement`,
          caption: `Official paperwork, parenting schedules, and financial disclosure records structured during confidential mediation.`,
        },
        {
          url: '/images/mediator-consultation.webp',
          alt: `${post.title} - Mediator Consultation`,
          caption: `Accredited mediator conducting a private, without-prejudice assessment for separating parties.`,
        },
      ];

  return (
    <div className="w-full bg-white">
      <Breadcrumbs items={breadcrumbs} />

      {/* Article Hero Header */}
      <header className={`py-14 lg:py-20 border-b ${isAlderton ? 'bg-slate-900 border-slate-800' : 'bg-[#064E3B] border-emerald-900'} text-white`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${isAlderton ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40'}`}>
              {post.clusterName}
            </span>
            <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <ClockIcon className="w-3.5 h-3.5" />
              <span>{post.readingTime}</span>
              <span>•</span>
              <span>Published {post.publishedDate}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-6 tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-normal mb-8">
            {post.summary}
          </p>

          {/* Quick-Jump Table of Contents */}
          <nav className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-white/20 text-xs sm:text-sm">
            <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px] mb-3 flex items-center gap-2">
              <span>Table of Contents &amp; Key Sections</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-200">
              <a href="#quick-answer" className="hover:text-amber-300 transition flex items-center gap-1.5">
                <span className="text-amber-400 font-mono">01.</span> Executive Summary &amp; Direct Answer
              </a>
              <a href="#legal-framework" className="hover:text-amber-300 transition flex items-center gap-1.5">
                <span className="text-amber-400 font-mono">02.</span> UK Statutory Legal Framework
              </a>
              <a href="#step-by-step" className="hover:text-amber-300 transition flex items-center gap-1.5">
                <span className="text-amber-400 font-mono">03.</span> Practical Resolution Protocol
              </a>
              <a href="#pitfalls" className="hover:text-amber-300 transition flex items-center gap-1.5">
                <span className="text-amber-400 font-mono">04.</span> Tactical Pitfalls &amp; Mistakes
              </a>
              <a href="#local-courts" className="hover:text-amber-300 transition flex items-center gap-1.5">
                <span className="text-amber-400 font-mono">05.</span> Designated Family Court Centres
              </a>
              <a href="#faqs" className="hover:text-amber-300 transition flex items-center gap-1.5">
                <span className="text-amber-400 font-mono">06.</span> Detailed FAQs (10 Questions Answered)
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Article Content Body */}
      <article className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Image 1: Primary Featured Visual */}
          <figure className="space-y-2">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md bg-slate-100">
              <Image
                src={articleImages[0].url}
                alt={articleImages[0].alt}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover object-center"
                priority
              />
            </div>
            <figcaption className="text-xs text-slate-500 italic text-center pt-1">
              {articleImages[0].caption}
            </figcaption>
          </figure>

          {/* Section 1: Quick Answer & Executive Summary (AEO) */}
          <section id="quick-answer" className="scroll-mt-24">
            <div className={`rounded-2xl p-6 sm:p-8 border-2 shadow-sm ${isAlderton ? 'bg-amber-50/70 border-amber-200' : 'bg-emerald-50/70 border-emerald-200'}`}>
              <div className="flex items-start gap-3.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isAlderton ? 'bg-amber-500 text-slate-950' : 'bg-emerald-700 text-white'}`}>
                  <ShieldCheckIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-slate-950 text-xl mb-3">
                    Executive Summary &amp; Legal Position
                  </h2>
                  <p className="text-slate-900 text-sm sm:text-base leading-relaxed font-medium mb-3">
                    {post.directAnswer}
                  </p>
                  <p className="text-xs text-slate-600">
                    <strong className="text-slate-800">Core Dispute Question:</strong> {post.coreQuestion}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Statutory Legal Framework */}
          <section id="legal-framework" className="scroll-mt-24 space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Statutory Rules &amp; Precedents</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 mt-1">
                Applicable UK Family Law &amp; Judicial Rules
              </h2>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border-2 border-slate-200 text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
              <p className="font-medium text-slate-900">
                {post.legalFramework}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                    <AwardSealIcon className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Family Procedure Rules (FPR 2024)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Judges possess statutory authority to pause court timetables and order cost sanctions against parties unreasonably refusing mediation.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                    <BuildingOfficeIcon className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Statutory MIAM Exemption Audit</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 10 of the Children and Families Act 2014, self-certification is strictly scrutinized. Authorised FMC mediator signatures are mandatory on Form C100 / Form A.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Image 2: Mid-Article Agreement & Documentation Visual */}
          <figure className="space-y-2">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md bg-slate-100">
              <Image
                src={articleImages[1].url}
                alt={articleImages[1].alt}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="text-xs text-slate-500 italic text-center pt-1">
              {articleImages[1].caption}
            </figcaption>
          </figure>

          {/* Section 3: Practical Resolution Protocol */}
          <section id="step-by-step" className="scroll-mt-24 space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Practical Protocol</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 mt-1">
                Step-by-Step Resolution Roadmap for Parents &amp; Spouses
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3.5">
              {post.practicalSteps.map((step, idx) => {
                const isObject = typeof step !== 'string';
                const title = isObject ? step.step : `Stage ${idx + 1}`;
                const detail = isObject ? step.detail : step;

                return (
                  <div
                    key={idx}
                    className="flex items-start gap-4 bg-white p-5 rounded-xl border-2 border-slate-200 shadow-xs hover:border-slate-300 transition"
                  >
                    <span className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 shadow-xs ${
                      isAlderton ? 'bg-slate-900 text-amber-400' : 'bg-emerald-950 text-amber-300'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-slate-950">
                        {title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Mid-Article Fast Contact CTA */}
          <div className={`rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 border shadow-sm ${
            isAlderton ? 'bg-slate-900 border-slate-800 text-white' : 'bg-emerald-950 border-emerald-900 text-white'
          }`}>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold mb-1 text-white">
                Facing an Urgent Standoff on This Issue?
              </h3>
              <p className="text-xs text-slate-200 max-w-md">
                Fast-track confidential MIAM sessions available within 24–48 hours. Accredited court form sign-off provided.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition text-center w-full sm:w-auto"
              >
                Book Assessment
              </Link>
              <a
                href={`tel:${brand.phone}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 font-bold text-xs border border-white/20 transition whitespace-nowrap text-center w-full sm:w-auto"
              >
                <PhoneCallIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{brand.formattedPhone}</span>
              </a>
            </div>
          </div>

          {/* Image 3: Mediator Consultation / Neutral Joint Session Visual */}
          <figure className="space-y-2">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md bg-slate-100">
              <Image
                src={articleImages[2].url}
                alt={articleImages[2].alt}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="text-xs text-slate-500 italic text-center pt-1">
              {articleImages[2].caption}
            </figcaption>
          </figure>

          {/* Section 4: Common Tactical Pitfalls & Mistakes */}
          <section id="pitfalls" className="scroll-mt-24 space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-widest">Risk Avoidance</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 mt-1">
                Common Tactical Mistakes to Avoid
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-rose-50/50 border-2 border-rose-200 space-y-2">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                  <AlertTriangleIcon className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Unilateral Action or Ultimatums</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Booking flights without written consent, cancelling joint mortgages unilaterally, or withholding passports triggers emergency court applications that judges view with severe disfavor.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-amber-50/50 border-2 border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                  <AlertTriangleIcon className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Ignoring Pre-Action Dispute Protocols</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Filing Form C100 or Form A without an accredited mediator signature risks automatic strike-out or adverse cost sanctions under amended Family Procedure Rules Part 28.3.
                </p>
              </div>
            </div>
          </section>

          {/* Limits of Mediation */}
          <section className="bg-stone-50 rounded-2xl p-6 sm:p-8 border-2 border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-base">
              <BuildingOfficeIcon className="w-4 h-4 text-stone-600" />
              <span>Limits of Mediation &amp; When Court Injunctions Are Essential</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
              {post.limitsOfMediation}
            </p>
          </section>

          {/* Section 5: Local Family Court Centers & Catchment Areas */}
          {matchedTowns.length > 0 && (
            <section id="local-courts" className="scroll-mt-24 space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Regional Jurisdiction</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 mt-1">
                  Designated Family Court Centres in Your Catchment Area
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-700">
                If mediation does not reach complete settlement, your accredited FMC mediator issues the official signed certificate required for submission to these regional family court centres:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {matchedTowns.map((town) => (
                  <div key={town.slug} className="p-4 bg-slate-50 rounded-xl border-2 border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <CourtBuildingIcon className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{town.designatedCourt.name}</span>
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                        {town.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      {town.designatedCourt.address} • {town.designatedCourt.postcode}
                    </p>
                    <p className="text-[11px] text-slate-700 italic">
                      {town.designatedCourt.c100SubmissionNote}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* In-Line Contextual Links to Services and Local Landing Pages */}
          {relatedService && (
            <section className="bg-slate-50 rounded-2xl p-6 sm:p-8 border-2 border-slate-200 space-y-4">
              <h3 className="font-serif font-bold text-slate-950 text-lg">
                Explore Accredited {relatedService.title} in Your Practice Hub:
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                Our accredited mediators deliver fast-track video appointments and in-person sessions across regional family court districts:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                {matchedTowns.map((town) => (
                  <Link
                    key={town.slug}
                    href={`/locations/${town.countySlug}/${town.slug}/${relatedService.slug}`}
                    className="p-3 bg-white rounded-xl border-2 border-slate-200 hover:border-amber-500 text-xs font-bold text-slate-900 hover:text-amber-800 transition flex items-center justify-between shadow-xs"
                  >
                    <span>{relatedService.navLabel} in {town.name}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 text-amber-600" />
                  </Link>
                ))}
              </div>
              <div className="pt-2 text-right">
                <Link
                  href={`/services/${relatedService.slug}`}
                  className="text-xs font-bold text-amber-700 hover:text-amber-900 underline inline-flex items-center gap-1"
                >
                  <span>Read full statutory procedure for {relatedService.title}</span>
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              </div>
            </section>
          )}

          {/* Bidirectional Internal Links to Related Guide Articles */}
          {relatedPosts.length > 0 && (
            <section className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Recommended Dispute Guides</span>
                  <h3 className="text-xl font-serif font-bold text-slate-950 mt-0.5">
                    Related Family Law Articles &amp; Practical Advice
                  </h3>
                </div>
                <Link href="/blog" className="text-xs font-bold text-amber-700 hover:underline">
                  Browse All Family Law Guides &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((relPost) => (
                  <Link
                    key={relPost.slug}
                    href={`/blog/${relPost.slug}`}
                    className="p-4 rounded-xl border-2 border-slate-200 hover:border-amber-500 bg-white hover:bg-slate-50 transition space-y-2 flex flex-col justify-between group shadow-xs"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 group-hover:bg-amber-100 group-hover:text-amber-900 transition">
                        {relPost.clusterName}
                      </span>
                      <h4 className="font-bold text-xs text-slate-950 leading-snug group-hover:text-amber-800 transition">
                        {relPost.title}
                      </h4>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <span>{relPost.readingTime}</span>
                      <span className="text-amber-600 font-bold group-hover:translate-x-0.5 transition-transform">Read Guide &rarr;</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Bottom Action Card with SSOT Telephone Link */}
          <div className={`rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md ${
            isAlderton ? 'bg-slate-950 text-white' : 'bg-emerald-950 text-white'
          }`}>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-white">
                Book Your Confidential MIAM Consultation
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-lg leading-relaxed">
                Take the first constructive step toward resolution. Individual pre-court assessment meetings conducted remotely or at regional centres.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
              >
                Book Consultation
              </Link>
              <a
                href={`tel:${brand.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-center px-5 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs border-2 border-slate-700 transition whitespace-nowrap shadow-xs"
              >
                <PhoneCallIcon className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="whitespace-nowrap tracking-wide">{brand.formattedPhone}</span>
              </a>
            </div>
          </div>

        </div>
      </article>

      {/* Section 6: 10+ Comprehensive FAQs */}
      <section id="faqs" className="scroll-mt-24">
        <FAQSection
          title={`Frequently Asked Questions: ${post.title}`}
          subtitle="Practical, legally sound answers from accredited UK family mediators on court procedures, rights, and negotiation strategies."
          faqs={post.faqs}
        />
      </section>
    </div>
  );
};
