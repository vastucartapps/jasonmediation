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

  return {
    title: `${post.title} | ${ALDERTON_BRAND.brandName}`,
    description: post.summary,
    keywords: [
      post.targetKeyword,
      'family mediation East Midlands',
      'FMC accredited mediator',
      'MIAM assessment',
    ],
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${ALDERTON_BRAND.siteUrl}/blog/${post.slug}`,
      type: 'article',
      images: [
        {
          url: `${ALDERTON_BRAND.siteUrl}${post.images?.[0]?.url || post.image}`,
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
  const post = SITE1_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema(ALDERTON_BRAND, post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
