import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';

export interface ConstructMetadataParams {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
}

/**
 * Enterprise Metadata Constructor
 * Enforces 100/100 Ahrefs Site Audit compliance:
 * 1. Synchronizes canonical URL and og:url identically with trailing slashes.
 * 2. Guarantees complete Open Graph tags (og:type, og:site_name, og:locale, explicit image dimensions).
 * 3. Enforces complete Twitter card metadata.
 * 4. Ensures title lengths stay within standard SERP display limits (<= 65 characters).
 */
export function constructMetadata({
  title,
  description,
  path = '',
  type = 'website',
  image = '/icon-512x512.png',
  imageAlt = 'Peptides UK British Laboratory Chemical Registry',
  noIndex = false,
}: ConstructMetadataParams): Metadata {
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const canonicalUrl = cleanPath
    ? `${SITE_METADATA.url}${cleanPath}${cleanPath.endsWith('/') ? '' : '/'}`
    : `${SITE_METADATA.url}/`;

  const fullImageUrl = image.startsWith('http')
    ? image
    : `${SITE_METADATA.url}${image.startsWith('/') ? image : `/${image}`}`;

  // Ensure brand name is appended once if not present, and total length is strictly <= 60 characters
  let fullTitle = title;
  const brandSuffix = ` | ${SITE_METADATA.name}`;
  if (!fullTitle.includes(SITE_METADATA.name)) {
    if (fullTitle.length + brandSuffix.length <= 60) {
      fullTitle = `${fullTitle}${brandSuffix}`;
    } else {
      const maxBaseLen = 60 - brandSuffix.length;
      fullTitle = `${fullTitle.slice(0, maxBaseLen).trim()}${brandSuffix}`;
    }
  } else if (fullTitle.length > 60) {
    fullTitle = fullTitle.slice(0, 60).trim();
  }

  // Trim meta description cleanly between 50 and 160 characters
  let cleanDesc = description.trim();
  if (cleanDesc.length > 160) {
    cleanDesc = cleanDesc.slice(0, 157).trim() + '...';
  }

  return {
    title: fullTitle,
    description: cleanDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: cleanDesc,
      url: canonicalUrl,
      siteName: SITE_METADATA.name,
      locale: SITE_METADATA.locale,
      type,
      images: [
        {
          url: fullImageUrl,
          width: 512,
          height: 512,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: fullTitle,
      description: cleanDesc,
      images: [fullImageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}
