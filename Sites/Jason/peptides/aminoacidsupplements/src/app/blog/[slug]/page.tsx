import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlug, getAllBlogSlugs, getAllBlogPosts } from '@/lib/blog';
import { constructMetadata } from '@/lib/metadata';
import {
  Calendar,
  Clock,
  ChevronRight,
  ShieldAlert,
  BookOpen,
  ArrowRight,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  Layers,
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return constructMetadata({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.tldr,
    path: `/blog/${slug}/`,
    type: 'article',
    image: post.heroImage?.url,
    imageAlt: post.heroImage?.alt,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllBlogPosts().filter((p) => p.slug !== slug);

  const postJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `https://aminoacidsupplements.co/blog/${post.slug}/#webpage`,
        url: `https://aminoacidsupplements.co/blog/${post.slug}/`,
        name: post.title,
        description: post.metaDescription,
        datePublished: post.isoDate,
        dateModified: post.isoDate,
        author: {
          '@type': 'Organization',
          name: 'AminoAcidSupplements.co Academic Editorial Desk',
        },
        publisher: {
          '@type': 'Organization',
          name: 'AminoAcidSupplements.co',
        },
        about: {
          '@type': 'ChemicalSubstance',
          name: post.targetKeyword,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://aminoacidsupplements.co/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Research Blog',
            item: 'https://aminoacidsupplements.co/blog/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `https://aminoacidsupplements.co/blog/${post.slug}/`,
          },
        ],
      },
      ...(post.faqs && post.faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: post.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />

      <article className="container-ultra-wide py-10 lg:py-16">
        {/* Breadcrumb Navigation & Top Metadata Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:px-5 bg-white rounded-2xl border border-zinc-200/90 shadow-2xs mb-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs font-mono text-zinc-600">
              <li>
                <Link href="/" className="hover:text-indigo-800 transition-colors font-semibold">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              </li>
              <li>
                <Link href="/blog/" className="hover:text-indigo-800 transition-colors font-semibold">
                  Research Blog
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              </li>
              <li className="text-zinc-950 font-bold line-clamp-1 max-w-[280px] sm:max-w-md">
                {post.title}
              </li>
            </ol>
          </nav>

          <div className="flex items-center gap-2.5 text-xs font-mono">
            <span className="badge-amino-indigo text-[11px] py-0.5 px-2.5">{post.clusterName}</span>
            <span className="text-zinc-500 font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3 text-indigo-700" />
              {post.readingTime}
            </span>
            <span className="text-zinc-500 font-semibold hidden md:flex items-center gap-1">
              <Calendar className="w-3 h-3 text-orange-700" />
              {post.publishedDate}
            </span>
          </div>
        </div>

        {/* Article Header */}
        <header className="space-y-6 pb-8 border-b border-zinc-200/90">

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          {/* Hero Image */}
          {post.heroImage && (
            <figure className="space-y-2 my-8">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-zinc-200/90 shadow-md">
                <img
                  src={post.heroImage.url}
                  alt={post.heroImage.alt}
                  fetchPriority="high"
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                />
              </div>
              {post.heroImage.caption && (
                <figcaption className="text-xs text-zinc-600 font-mono italic">
                  {post.heroImage.caption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Executive Summary & Key Findings Callout */}
          <section
            aria-label="Executive Summary and Key Empirical Findings"
            className="p-6 sm:p-8 rounded-3xl border-2 border-indigo-200/90 bg-gradient-to-br from-indigo-50/70 via-white to-indigo-50/40 shadow-xs space-y-5"
          >
            <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-indigo-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-700 text-white flex items-center justify-center shadow-xs">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-mono font-black uppercase tracking-wider text-indigo-950">
                    Executive Summary &amp; Key Findings
                  </h2>
                  <p className="text-[11px] font-mono text-zinc-600">
                    Empirical Monograph Takeaways &bull; Validated Laboratory Assays
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200 shadow-2xs">
                Key Analytical Benchmarks
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {post.tldr
                .split(/\n+/)
                .map((p) => p.trim())
                .filter(Boolean)
                .map((paragraph, idx) => {
                  const clean = paragraph.replace(/^(?:[-•*]|\d+[\.\)])\s*/, '');
                  const match = clean.match(
                    /^(?:\*\*(.+?)\*\*|([A-Za-z0-9\s&,/\-–—()]{3,80}))\s*:\s*([\s\S]+)$/
                  );

                  if (match) {
                    const label = (match[1] || match[2]).trim().replace(/:$/, '');
                    const body = match[3].trim().replace(/\*\*/g, '');
                    return (
                      <div
                        key={idx}
                        className="group p-4 sm:p-5 bg-white rounded-2xl border border-indigo-100 shadow-2xs hover:border-indigo-300 hover:shadow-xs transition-all flex items-start gap-3.5"
                      >
                        <span className="w-7 h-7 rounded-xl bg-indigo-700 text-white font-mono text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs sm:text-[13px] font-black uppercase tracking-wider text-indigo-950 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 inline-flex items-center gap-1.5 shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 flex-shrink-0" />
                              <span>{label}</span>
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
                            {body}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 bg-white rounded-2xl border border-indigo-100 shadow-2xs flex items-start gap-3.5"
                    >
                      <span className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-900 border border-indigo-200 font-mono text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed flex-1">
                        {clean.replace(/\*\*/g, '')}
                      </p>
                    </div>
                  );
                })}
            </div>
          </section>
        </header>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10">
          {/* Main Prose Content (8 Cols) */}
          <div className="lg:col-span-8 space-y-12">
            {post.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight border-b border-zinc-100 pb-3">
                  {section.heading}
                </h2>

                {/* Prose Body */}
                <div
                  className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed space-y-4 text-sm sm:text-base"
                  dangerouslySetInnerHTML={{ __html: section.contentHtml }}
                />

                {/* Section Image / Infographic */}
                {section.image && (
                  <figure className="space-y-2 my-8">
                    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-zinc-200/90 shadow-md">
                      <img
                        src={section.image.url}
                        alt={section.image.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        width={1200}
                        height={675}
                      />
                    </div>
                    {section.image.caption && (
                      <figcaption className="text-xs text-zinc-600 font-mono italic">
                        {section.image.caption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {/* Optional Callout Box */}
                {section.calloutBox && (
                  <div className="p-5 sm:p-6 rounded-2xl border border-orange-200/90 bg-gradient-to-r from-orange-50/80 via-amber-50/50 to-orange-50/30 text-zinc-900 space-y-2 my-6 shadow-2xs">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-800 border border-orange-200 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-700" />
                      </span>
                      <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-orange-950">
                        {section.calloutBox.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed pl-8">
                      {section.calloutBox.content}
                    </p>
                  </div>
                )}

                {/* Optional Data Table */}
                {section.dataTable && (
                  <div className="overflow-x-auto my-6 border border-zinc-200 rounded-xl shadow-xs">
                    <table className="w-full text-left text-xs min-w-[500px]">
                      <caption className="text-xs font-mono font-bold text-zinc-700 p-3 bg-zinc-50 border-b border-zinc-200 text-left">
                        {section.dataTable.caption}
                      </caption>
                      <thead className="bg-zinc-100 font-mono text-[11px] uppercase tracking-wider text-zinc-800 border-b border-zinc-200">
                        <tr>
                          {section.dataTable.headers.map((header, i) => (
                            <th key={i} className="py-3 px-4 font-bold">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {section.dataTable.rows.map((row, i) => (
                          <tr key={i} className="hover:bg-zinc-50/70 transition-colors">
                            {row.map((cell, j) => (
                              <td key={j} className="py-3 px-4 font-mono text-zinc-800">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            {/* Methodological Protocols Section (if present) */}
            {post.methodologicalProtocols && post.methodologicalProtocols.length > 0 && (
              <section id="laboratory-protocols" className="scroll-mt-24 space-y-6 pt-6 border-t border-zinc-200">
                <h2 className="text-2xl font-black text-zinc-950 tracking-tight">
                  Standard Methodological Handling Protocols
                </h2>
                <div className="space-y-4">
                  {post.methodologicalProtocols.map((protocol: any, idx: number) => {
                    const stepNum = protocol.stepNumber ?? (idx + 1);
                    const desc = protocol.description || (Array.isArray(protocol.steps) ? protocol.steps.join(' ') : (protocol.steps || ''));
                    return (
                      <div
                        key={stepNum}
                        className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/90 space-y-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-indigo-700 text-white font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                            {stepNum}
                          </span>
                          <h3 className="text-base font-bold text-zinc-950">
                            {protocol.title}
                          </h3>
                        </div>
                        {Array.isArray(protocol.steps) ? (
                          <ol className="list-decimal list-inside space-y-2 pl-2 text-xs sm:text-sm text-zinc-800 leading-relaxed font-sans">
                            {protocol.steps.map((st: string, sidx: number) => (
                              <li key={sidx} className="pl-1">
                                <span className="font-medium text-zinc-900">{st}</span>
                              </li>
                            ))}
                          </ol>
                        ) : desc ? (
                          <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed pl-10">
                            {desc}
                          </p>
                        ) : null}
                        {protocol.cautionNote && (
                          <div className="ml-2 sm:ml-10 p-2.5 rounded-lg bg-orange-50 border border-orange-200 text-xs text-orange-950 flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-orange-700 flex-shrink-0" />
                            <span>
                              <strong className="text-orange-900">Caution:</strong> {protocol.cautionNote}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* FAQs Accordion */}
            {post.faqs && post.faqs.length > 0 && (
              <section id="faqs" className="scroll-mt-24 space-y-6 pt-6 border-t border-zinc-200">
                <h2 className="text-2xl font-black text-zinc-950 tracking-tight">
                  Frequently Asked Laboratory Questions
                </h2>
                <div className="space-y-3">
                  {post.faqs.map((faq: any, i: number) => {
                    const qText = faq.question || faq.q || "Laboratory Query";
                    const aText = faq.answer || faq.a || "";
                    return (
                      <div key={i} className="p-5 rounded-2xl bg-white border border-zinc-200/90 space-y-2 shadow-xs">
                        <h3 className="text-base font-bold text-zinc-950 flex items-start gap-2">
                          <HelpCircle className="w-5 h-5 text-indigo-700 flex-shrink-0 mt-0.5" />
                          <span>{qText}</span>
                        </h3>
                        {aText && (
                          <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed pl-7">
                            {aText}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Empirical Citations & Reference Sources */}
            {post.sources && post.sources.length > 0 && (
              <section id="sources" className="scroll-mt-24 space-y-4 pt-6 border-t border-zinc-200">
                <h2 className="text-xl font-bold text-zinc-950 tracking-tight font-mono uppercase">
                  Verified Academic References &amp; Primary Sources
                </h2>
                <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-xl overflow-hidden text-xs">
                  {post.sources.map((source: any, i: number) => {
                    const citNumber = source.citationNumber ?? source.id ?? (i + 1);
                    const metaParts = [];
                    if (source.publication) metaParts.push(source.publication);
                    if (source.year) metaParts.push(`(${source.year})`);
                    if (source.pmid) metaParts.push(`• PMID: ${source.pmid}`);
                    return (
                      <div key={citNumber} className="p-4 bg-white flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <p className="font-semibold text-zinc-900">
                            [{citNumber}] {source.title}
                          </p>
                          {metaParts.length > 0 && (
                            <p className="text-zinc-600 font-mono">
                              {metaParts.join(' ')}
                            </p>
                          )}
                        </div>
                        {source.url && (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-700 hover:text-indigo-900 flex items-center gap-1 font-mono flex-shrink-0 font-bold"
                          >
                            <span>PubMed</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Statutory Disclaimer Notice */}
            <div className="p-6 rounded-2xl bg-zinc-100 border border-zinc-300/80 space-y-2 text-xs text-zinc-700 leading-relaxed">
              <div className="flex items-center gap-2 text-orange-800 font-mono font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-orange-700" />
                <span>UK Statutory Non-Clinical Research Disclaimer</span>
              </div>
              <p>{post.statutoryDisclaimer}</p>
            </div>
          </div>

          {/* Sticky Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Table of Contents Box */}
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents Box */}
              <div className="rounded-2xl bg-white border border-zinc-300 shadow-sm overflow-hidden space-y-0">
                <div className="bg-gradient-to-r from-indigo-950 via-zinc-950 to-indigo-900 text-white px-5 py-3 border-b border-indigo-900/60 flex items-center justify-between">
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-200 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-orange-400" />
                    <span>On This Page (TOC)</span>
                  </h2>
                  <span className="text-[10px] font-mono text-zinc-400 font-semibold">
                    {post.tableOfContents.length} Sections
                  </span>
                </div>
                <nav className="p-5">
                  <ul className="space-y-2.5 text-xs">
                    {post.tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-zinc-700 hover:text-indigo-800 hover:translate-x-0.5 transition-all block py-0.5 font-medium"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                    {post.methodologicalProtocols && post.methodologicalProtocols.length > 0 && (
                      <li>
                        <a href="#laboratory-protocols" className="text-zinc-700 hover:text-indigo-800 hover:translate-x-0.5 transition-all block py-0.5 font-medium">
                          Methodological Protocols
                        </a>
                      </li>
                    )}
                    {post.faqs && post.faqs.length > 0 && (
                      <li>
                        <a href="#faqs" className="text-zinc-700 hover:text-indigo-800 hover:translate-x-0.5 transition-all block py-0.5 font-medium">
                          Frequently Asked Questions
                        </a>
                      </li>
                    )}
                    {post.sources && post.sources.length > 0 && (
                      <li>
                        <a href="#sources" className="text-zinc-700 hover:text-indigo-800 hover:translate-x-0.5 transition-all block py-0.5 font-medium">
                          Academic References
                        </a>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>

              {/* Related Articles Card */}
              {allPosts.length > 0 && (
                <div className="rounded-2xl bg-white border border-zinc-300 shadow-sm overflow-hidden space-y-0">
                  <div className="bg-gradient-to-r from-indigo-950 via-zinc-950 to-purple-950 text-white px-5 py-3 border-b border-indigo-900/60 flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-200 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                      <span>Related Monograph Studies</span>
                    </h3>
                  </div>
                  <div className="p-5 space-y-3.5 divide-y divide-zinc-100">
                    {allPosts.slice(0, 3).map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/blog/${rel.slug}/`}
                        className="block group pt-3 first:pt-0"
                      >
                        <h4 className="text-xs font-bold text-zinc-900 group-hover:text-indigo-700 transition-colors line-clamp-2">
                          {rel.title}
                        </h4>
                        <span className="text-[11px] font-mono text-zinc-500 mt-0.5 block">
                          {rel.readingTime} &bull; {rel.publishedDate}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
