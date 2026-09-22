import { BrandConfig, FAQItem, TownLocation, ServiceItem, GuideArticle } from '../types';

export function generateLocalBusinessSchema(
  brand: BrandConfig,
  town?: TownLocation,
  service?: ServiceItem
) {
  const pageUrl = town
    ? service
      ? `${brand.siteUrl}/locations/${town.countySlug}/${town.slug}/${service.slug}`
      : `${brand.siteUrl}/locations/${town.countySlug}/${town.slug}`
    : brand.siteUrl;

  const name = town
    ? service
      ? `${brand.brandName} – ${service.title} in ${town.name}`
      : `${brand.brandName} – Family Mediation in ${town.name}, ${town.county}`
    : brand.brandName;

  const description = town
    ? service
      ? `FMC-accredited ${service.title} in ${town.name}. Fast MIAM certificates, child arrangements, and financial settlements. Serving families and couples across ${town.name} and surrounding communities.`
      : `Accredited family mediation services in ${town.name}, ${town.county}. Rapid MIAM assessments and parenting plans. Designated court: ${town.designatedCourt.name}.`
    : brand.tagline;

  const coordinates = town
    ? {
        '@type': 'GeoCoordinates',
        latitude: town.coordinates.latitude,
        longitude: town.coordinates.longitude,
      }
    : undefined;

  const postalAddress = town
    ? {
        '@type': 'PostalAddress',
        addressLocality: town.name,
        addressRegion: town.county,
        postalCode: town.postalDistricts[0],
        addressCountry: 'GB',
      }
    : {
        '@type': 'PostalAddress',
        addressLocality: brand.brandId === 'alderton' ? 'Leicester' : 'Ipswich',
        addressRegion: brand.brandId === 'alderton' ? 'Leicestershire' : 'Suffolk',
        postalCode: brand.brandId === 'alderton' ? 'LE1 5QQ' : 'IP1 1HE',
        addressCountry: 'GB',
      };

  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${pageUrl}#localbusiness`,
    name,
    legalName: brand.legalEntityName,
    url: pageUrl,
    telephone: brand.phone,
    email: brand.contactEmail,
    priceRange: '££',
    description,
    image: {
      '@type': 'ImageObject',
      '@id': `${pageUrl}#primaryimage`,
      url: `${brand.siteUrl}${service?.cardImage || service?.heroImage || '/images/sincere-mediation-session.webp'}`,
      contentUrl: `${brand.siteUrl}${service?.cardImage || service?.heroImage || '/images/sincere-mediation-session.webp'}`,
      width: 1200,
      height: 675,
      caption: town
        ? service
          ? `FMC-accredited ${service.title} session serving ${town.name}, ${town.county}`
          : `Accredited Family Mediation Practice serving ${town.name}, ${town.county}`
        : `${brand.brandName} - Accredited Family Mediation Practice`,
      ...(town
        ? {
            contentLocation: {
              '@type': 'Place',
              name: `${town.name} Family Mediation Services`,
              address: {
                '@type': 'PostalAddress',
                addressLocality: town.name,
                addressRegion: town.county,
                postalCode: town.postalDistricts[0],
                addressCountry: 'GB',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: town.coordinates.latitude,
                longitude: town.coordinates.longitude,
              },
            },
          }
        : {}),
    },
    address: postalAddress,
    geo: coordinates,
    areaServed: town
      ? [
          {
            '@type': 'City',
            name: town.name,
          },
          {
            '@type': 'AdministrativeArea',
            name: town.county,
          },
        ]
      : brand.counties.map((c) => ({
          '@type': 'AdministrativeArea',
          name: c.name,
        })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '13:00',
      },
    ],
    knowsAbout: [
      'Family Mediation Council Standards',
      'Mediation Information and Assessment Meeting (MIAM)',
      'Children Act 1989 Section 8 Orders',
      'Matrimonial Causes Act 1973 Section 25 Financial Remedy',
      'Parenting Plans and Child Arrangements',
      'Pension Sharing Orders on Divorce',
    ],
  };
}

export function generateFAQSchema(faqs: FAQItem[]) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  siteUrl: string,
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}

export function generateServiceSchema(
  brand: BrandConfig,
  service: ServiceItem,
  town?: TownLocation
) {
  const serviceUrl = town
    ? `${brand.siteUrl}/locations/${town.countySlug}/${town.slug}/${service.slug}`
    : `${brand.siteUrl}/services/${service.slug}`;

  const imagePath = service.cardImage || service.heroImage || '/images/sincere-mediation-session.webp';
  const imageUrl = `${brand.siteUrl}${imagePath}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name: town ? `${service.title} in ${town.name}` : service.title,
    serviceType: service.title,
    provider: {
      '@type': 'LegalService',
      name: brand.brandName,
      url: brand.siteUrl,
      telephone: brand.phone,
    },
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      contentUrl: imageUrl,
      width: 1200,
      height: 675,
      caption: town
        ? `FMC-accredited ${service.title} in ${town.name}, ${town.county}`
        : service.title,
      ...(town
        ? {
            contentLocation: {
              '@type': 'Place',
              name: `${town.name} Family Dispute Resolution`,
              address: {
                '@type': 'PostalAddress',
                addressLocality: town.name,
                addressRegion: town.county,
                postalCode: town.postalDistricts[0],
                addressCountry: 'GB',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: town.coordinates.latitude,
                longitude: town.coordinates.longitude,
              },
            },
          }
        : {}),
    },
    description: service.summary,
    url: serviceUrl,
    areaServed: town
      ? {
          '@type': 'City',
          name: town.name,
        }
      : undefined,
  };
}

export function generateGeoImageSchema(
  brand: BrandConfig,
  imagePath: string,
  title: string,
  town?: TownLocation,
  service?: ServiceItem
) {
  const imageUrl = `${brand.siteUrl}${imagePath}`;
  const caption = town
    ? service
      ? `FMC-accredited ${service.title} consultation serving ${town.name}, ${town.county}`
      : `Accredited Family Mediation Centre serving ${town.name}, ${town.county}`
    : `${title} - ${brand.brandName}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: imageUrl,
    contentUrl: imageUrl,
    name: title,
    caption,
    description: `${caption}. Delivered in accordance with Family Procedure Rules (FPR) Part 3 standards.`,
    creditText: `${brand.brandName} Dispute Resolution`,
    creator: {
      '@type': 'Organization',
      name: brand.brandName,
      url: brand.siteUrl,
    },
    copyrightHolder: {
      '@type': 'Organization',
      name: brand.legalEntityName,
    },
    ...(town
      ? {
          contentLocation: {
            '@type': 'Place',
            name: `${town.name} Mediation Chambers`,
            address: {
              '@type': 'PostalAddress',
              addressLocality: town.name,
              addressRegion: town.county,
              postalCode: town.postalDistricts[0],
              addressCountry: 'GB',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: town.coordinates.latitude,
              longitude: town.coordinates.longitude,
            },
          },
        }
      : {}),
  };
}

export function generateArticleSchema(brand: BrandConfig, article: GuideArticle) {
  const articleUrl = `${brand.siteUrl}/blog/${article.slug}`;
  const imageUrl = `${brand.siteUrl}${article.image || '/images/sincere-mediation-session.webp'}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    headline: article.title,
    description: article.summary,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 675,
      caption: article.imageAlt || article.title,
    },
    thumbnailUrl: imageUrl,
    author: {
      '@type': 'Organization',
      name: brand.brandName,
      url: brand.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: brand.brandName,
      logo: {
        '@type': 'ImageObject',
        url: `${brand.siteUrl}/images/sincere-mediation-session.webp`,
        width: 1200,
        height: 675,
      },
    },
    datePublished: '2026-09-15T09:00:00+01:00',
    dateModified: '2026-09-21T10:00:00+01:00',
  };
}
