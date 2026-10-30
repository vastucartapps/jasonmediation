import React from 'react';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';
import { constructMetadata } from '@/lib/metadata';
import { BookOpen, Calendar, Clock, ArrowRight, Dna, ShieldAlert } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Research Blog & Technical Monographs',
  description:
    'Empirical research monographs, reconstitution standards, and stability studies for synthetic peptides and amino acids in analytical laboratory assays.',
  path: '/blog/',
});

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  const blogIndexJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://aminoacidsupplements.co/blog/#collection',
    url: 'https://aminoacidsupplements.co/blog/',
    name: 'Research Blog & Technical Monographs | AminoAcidSupplements',
    description:
      'Empirical research monographs, reconstitution standards, and stability studies for synthetic peptides and amino acids in analytical laboratory assays.',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://aminoacidsupplements.co/#website',
    },
    hasPart: posts.map((post) => ({
      '@type': 'Article',
      headline: post.title,
      url: `https://aminoacidsupplements.co/blog/${post.slug}/`,
      datePublished: post.isoDate,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexJsonLd) }}
      />

      <div className="container-ultra-wide py-12 lg:py-16 space-y-12">
        {/* Editorial Header */}
        <div className="border-b border-zinc-200/90 pb-8 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/80">
            <BookOpen className="w-4 h-4 text-indigo-700" />
            <span>Academic &amp; Analytical Monograph Archive</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight">
            Laboratory Research Blog &amp; Technical Monographs
          </h1>
          <p className="text-base sm:text-lg text-zinc-700 max-w-3xl leading-relaxed">
            Empirical research analyses, chemical stability profiles, reconstitution standards, and statutory regulatory guidance for synthetic amino acid sequences and investigational peptides.
          </p>
        </div>

        {/* Featured Post (if at least one post exists) */}
        {posts.length > 0 && (
          <div className="amino-card p-6 md:p-8 bg-white border border-zinc-200/90 rounded-3xl shadow-am-elevated">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 relative aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-200">
                <img
                  src={posts[0].heroImage.url}
                  alt={posts[0].heroImage.alt}
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="badge-amino-indigo">{posts[0].clusterName}</span>
                  <span className="text-zinc-600">&bull;</span>
                  <span className="text-zinc-600 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {posts[0].readingTime}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight leading-snug">
                  <Link
                    href={`/blog/${posts[0].slug}/`}
                    className="hover:text-indigo-800 transition-colors"
                  >
                    {posts[0].title}
                  </Link>
                </h2>
                {(() => {
                  const firstLine = posts[0].tldr.split(/\n+/)[0] || '';
                  const match = firstLine
                    .replace(/^(?:[-•*]|\d+[\.\)])\s*/, '')
                    .match(/^(?:\*\*(.+?)\*\*|([A-Za-z0-9\s&,/\-–—()]{3,80}))\s*:\s*([\s\S]+)$/);
                  if (match) {
                    const label = (match[1] || match[2]).trim().replace(/:$/, '');
                    const body = match[3].trim().replace(/\*\*/g, '');
                    return (
                      <p className="text-sm text-zinc-700 leading-relaxed line-clamp-3">
                        <strong className="font-mono text-xs font-black uppercase tracking-wider text-indigo-950 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200 mr-2 inline-block">
                          {label}:
                        </strong>
                        {body}
                      </p>
                    );
                  }
                  return (
                    <p className="text-sm text-zinc-700 leading-relaxed line-clamp-3">
                      {posts[0].tldr}
                    </p>
                  );
                })()}
                <div className="pt-2">
                  <Link
                    href={`/blog/${posts[0].slug}/`}
                    className="btn-amino-primary text-xs py-2.5 px-5 rounded-xl inline-flex items-center gap-2"
                  >
                    <span>Read Full Monograph</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid (Remaining Posts) */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-zinc-950 font-mono uppercase tracking-wider">
            All Monograph Publications ({posts.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="amino-card p-6 bg-white border border-zinc-200/90 rounded-2xl hover:border-indigo-400 hover:shadow-am-elevated group flex flex-col justify-between transition-all"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-zinc-200">
                    <img
                      src={post.heroImage.url}
                      alt={post.heroImage.alt}
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={338}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-600">
                    <span className="text-indigo-800 font-bold">{post.clusterName}</span>
                    <span>&bull;</span>
                    <span>{post.readingTime}</span>
                    <span>&bull;</span>
                    <span>{post.publishedDate}</span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950 group-hover:text-indigo-800 transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                  </h3>
                  {(() => {
                    const firstLine = post.tldr.split(/\n+/)[0] || '';
                    const match = firstLine
                      .replace(/^(?:[-•*]|\d+[\.\)])\s*/, '')
                      .match(/^(?:\*\*(.+?)\*\*|([A-Za-z0-9\s&,/\-–—()]{3,80}))\s*:\s*([\s\S]+)$/);
                    if (match) {
                      const label = (match[1] || match[2]).trim().replace(/:$/, '');
                      const body = match[3].trim().replace(/\*\*/g, '');
                      return (
                        <p className="text-xs text-zinc-700 line-clamp-3 leading-relaxed">
                          <strong className="font-mono text-[11px] font-black uppercase tracking-wider text-indigo-950 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200 mr-1.5 inline-block">
                            {label}:
                          </strong>
                          {body}
                        </p>
                      );
                    }
                    return (
                      <p className="text-xs text-zinc-700 line-clamp-3 leading-relaxed">
                        {post.tldr.replace(/\*\*/g, '')}
                      </p>
                    );
                  })()}
                </div>

                <Link
                  href={`/blog/${post.slug}/`}
                  aria-label={`Open full monograph: ${post.title}`}
                  className="pt-4 border-t border-zinc-100 mt-5 flex items-center justify-between text-xs font-bold text-indigo-700 hover:text-indigo-900 group-hover:text-indigo-900 transition-colors"
                >
                  <span>Open Full Monograph</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Statutory Non-Clinical Disclaimer */}
        <div className="p-6 rounded-2xl bg-zinc-100 border border-zinc-300/80 text-xs text-zinc-700 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 text-orange-800 font-mono font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-orange-700" />
            <span>Statutory UK Non-Clinical Laboratory Mandate</span>
          </div>
          <p>
            All monographs published in this archive are written strictly for academic, educational, and analytical laboratory research purposes. Under the UK Human Medicines Regulations 2012 (SI 2012/1916) and Misuse of Drugs Act 1971, synthetic peptides are unapproved investigational chemicals strictly prohibited from human consumption, therapeutic use, or clinical self-administration.
          </p>
        </div>
      </div>
    </>
  );
}
