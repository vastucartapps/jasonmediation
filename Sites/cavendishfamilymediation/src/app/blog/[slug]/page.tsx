import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CAVENDISH_BRAND } from '../../../config/brand';
import {
  SITE2_BLOG_POSTS,
  SITE2_COUNTIES,
  CORE_SERVICES,
  ArticleView,
  generateArticleSchema,
} from '@mediation/core';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SITE2_BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = SITE2_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return { title: 'Article Not Found' };

  return {
    title: `${post.title} | ${CAVENDISH_BRAND.brandName}`,
    description: post.summary,
    keywords: [
      post.targetKeyword,
      'family mediation South East',
      'FMC accredited mediator',
      'financial remedy mediation',
    ],
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${CAVENDISH_BRAND.siteUrl}/blog/${post.slug}`,
      type: 'article',
      images: [
        {
          url: `${CAVENDISH_BRAND.siteUrl}${post.images?.[0]?.url || post.image}`,
          width: 1200,
          height: 675,
          alt: post.images?.[0]?.alt || post.imageAlt,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = SITE2_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema(CAVENDISH_BRAND, post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ArticleView
        brand={CAVENDISH_BRAND}
        post={post}
        allPosts={SITE2_BLOG_POSTS}
        counties={SITE2_COUNTIES}
        services={CORE_SERVICES}
        brandVariant="cavendish"
      />
    </>
  );
}
