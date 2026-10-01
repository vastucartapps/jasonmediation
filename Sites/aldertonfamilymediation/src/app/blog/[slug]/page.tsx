import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ALDERTON_BRAND } from '../../../config/brand';
import {
  SITE1_BLOG_POSTS,
  SITE1_COUNTIES,
  CORE_SERVICES,
  ArticleView,
  generateArticleSchema,
  generateFAQSchema,
  generateDefinedTermSetSchema,
} from '@mediation/core';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SITE1_BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = SITE1_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return { title: 'Article Not Found' };

  const postImageUrl = post.images?.[0]?.url || post.image || '/images/hero-mediation.webp';
  const fullImageUrl = `${ALDERTON_BRAND.siteUrl}${postImageUrl.startsWith('/') ? postImageUrl : `/${postImageUrl}`}`;
  const canonicalUrl = `${ALDERTON_BRAND.siteUrl}/blog/${post.slug}/`;

  return {
    title: post.metaTitle || post.title.slice(0, 55),
    description: post.metaDescription || post.summary.slice(0, 155),
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      post.targetKeyword,
      'family mediation East Midlands',
      'FMC accredited mediator',
      'MIAM assessment',
    ],
    openGraph: {
      title: post.metaTitle || post.title.slice(0, 55),
      description: post.metaDescription || post.summary.slice(0, 155),
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 675,
          alt: post.images?.[0]?.alt || post.imageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title.slice(0, 55),
      description: post.metaDescription || post.summary.slice(0, 155),
      images: [fullImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = SITE1_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema(ALDERTON_BRAND, post);
  const pageUrl = `${ALDERTON_BRAND.siteUrl}/blog/${post.slug}/`;
  const faqSchema = generateFAQSchema(post.faqs, pageUrl, true);
  const glossarySchema = generateDefinedTermSetSchema(ALDERTON_BRAND.siteUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              articleSchema,
              glossarySchema,
              ...(faqSchema ? [faqSchema] : []),
            ],
          }),
        }}
      />
      <ArticleView
        brand={ALDERTON_BRAND}
        post={post}
        allPosts={SITE1_BLOG_POSTS}
        counties={SITE1_COUNTIES}
        services={CORE_SERVICES}
        brandVariant="alderton"
      />
    </>
  );
}
