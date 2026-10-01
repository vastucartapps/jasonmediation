import { BrandConfig, FAQItem, TownLocation, ServiceItem, GuideArticle } from '../types';

export function generateLocalBusinessSchema(
  brand: BrandConfig,
  town?: TownLocation,
  service?: ServiceItem,
  inGraph = false
) {
  const pageUrl = town
    ? service
      ? `${brand.siteUrl}/locations/${town.countySlug}/${town.slug}/${service.slug}/`
      : `${brand.siteUrl}/locations/${town.countySlug}/${town.slug}/`
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
        streetAddress: `${town.name} Consultation Chambers, High Street`,
        addressLocality: town.name,
        addressRegion: town.county,
        postalCode: town.postalDistricts[0],
        addressCountry: 'GB',
      }
    : {
        '@type': 'PostalAddress',
        streetAddress: brand.brandId === 'alderton' ? 'Rutland House, 23 Friar Lane' : 'Cavendish Chambers, 14 Museum Street',
        addressLocality: brand.brandId === 'alderton' ? 'Leicester' : 'Ipswich',
        addressRegion: brand.brandId === 'alderton' ? 'Leicestershire' : 'Suffolk',
        postalCode: brand.brandId === 'alderton' ? 'LE1 5QQ' : 'IP1 1HE',
        addressCountry: 'GB',
      };

  return {
    ...(inGraph ? {} : { '@context': 'https://schema.org' }),
    '@type': 'LegalService',
    '@id': `${pageUrl}#localbusiness`,
    name,
    legalName: brand.legalEntityName,
    url: pageUrl,
    telephone: brand.phone,
    email: brand.contactEmail,
    priceRange: '££',
    description,
    logo: {
      '@type': 'ImageObject',
      '@id': `${brand.siteUrl}/#logo`,
      url: `${brand.siteUrl}/icon.svg`,
      contentUrl: `${brand.siteUrl}/icon.svg`,
      caption: `${brand.brandName} - FMC Accredited Practice Crest`,
      width: 512,
      height: 512,
    },
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
                streetAddress: `${town.name} Consultation Chambers, High Street`,
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
    sameAs: [
      'https://www.familymediationcouncil.org.uk/',
      'https://www.gov.uk/looking-after-children-divorce',
      'https://www.wikidata.org/wiki/Q1048835', // Family mediation
      'https://www.wikidata.org/wiki/Q1519789', // Ministry of Justice (United Kingdom)
      'https://www.wikidata.org/wiki/Q5818968', // HMCTS
      'https://www.wikidata.org/wiki/Q5098319', // Children Act 1989
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Accredited UK Family Dispute Resolution Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Mediation Information and Assessment Meeting (MIAM)',
          description: 'Statutory individual assessment meeting with accredited FMC mediator for court certificate sign-off (Form C100 / Form A).',
          price: '130.00',
          priceCurrency: 'GBP',
          availability: 'https://schema.org/InStock',
        },
        {
          '@type': 'Offer',
          name: 'MoJ £500 Family Mediation Voucher Scheme',
          description: 'Ministry of Justice non-means-tested £500 grant applied directly toward mediation sessions for eligible child arrangements.',
          price: '0.00',
          priceCurrency: 'GBP',
          availability: 'https://schema.org/InStock',
        },
      ],
    },
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
      'Family Mediation Council (FMC) Accreditation Standards',
      'Mediation Information and Assessment Meeting (MIAM)',
      'Children and Families Act 2014 Section 10',
      'Family Procedure Rules (FPR 2024 Part 3)',
      'Children Act 1989 Section 8 Child Arrangements Orders',
      'Matrimonial Causes Act 1973 Section 25 Financial Remedy',
      'Parenting Plans and Holiday Rotas',
      'Pension Sharing Orders and CETV Division',
      'Ministry of Justice £500 Family Mediation Voucher Scheme',
    ],
  };
}

export function generateDefinedTermSetSchema(siteUrl: string) {
  return {
    '@type': 'DefinedTermSet',
    '@id': `${siteUrl}/#glossary`,
    name: 'UK Family Mediation Statutory Lexicon',
    hasDefinedTerm: [
      {
        '@type': 'DefinedTerm',
        name: 'MIAM (Mediation Information and Assessment Meeting)',
        description: 'A statutory pre-action dispute assessment required by Section 10 of the Children and Families Act 2014 prior to court application.',
        inDefinedTermSet: `${siteUrl}/#glossary`,
      },
      {
        '@type': 'DefinedTerm',
        name: 'Family Procedure Rules (FPR 2024)',
        description: 'Court rules empowering judges in England and Wales to order cost sanctions against parties unreasonably refusing non-court dispute resolution.',
        inDefinedTermSet: `${siteUrl}/#glossary`,
      },
      {
        '@type': 'DefinedTerm',
        name: 'Family Mediation Voucher Scheme',
        description: 'Ministry of Justice financial grant contributing up to £500 towards accredited mediation costs for qualifying disputes involving children.',
        inDefinedTermSet: `${siteUrl}/#glossary`,
      },
      {
        '@type': 'DefinedTerm',
        name: 'Consent Order',
        description: 'A legally binding court order drafted from a mediated Memorandum of Understanding, approved by a judge without contentious hearings.',
        inDefinedTermSet: `${siteUrl}/#glossary`,
      },
    ],
  };
}

export function generateFAQSchema(faqs: FAQItem[], pageUrl?: string, inGraph = false) {
  if (!faqs || faqs.length === 0) return null;

  return {
    ...(inGraph ? {} : { '@context': 'https://schema.org' }),
    '@type': 'FAQPage',
    ...(pageUrl ? { '@id': `${pageUrl}#faq` } : {}),
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
  town?: TownLocation,
  inGraph = false
) {
  const serviceUrl = town
    ? `${brand.siteUrl}/locations/${town.countySlug}/${town.slug}/${service.slug}/`
    : `${brand.siteUrl}/services/${service.slug}/`;

  const imagePath = service.cardImage || service.heroImage || '/images/sincere-mediation-session.webp';
  const imageUrl = `${brand.siteUrl}${imagePath}`;

  const postalAddress = town
    ? {
        '@type': 'PostalAddress',
        streetAddress: `${town.name} Consultation Chambers, High Street`,
        addressLocality: town.name,
        addressRegion: town.county,
        postalCode: town.postalDistricts[0],
        addressCountry: 'GB',
      }
    : {
        '@type': 'PostalAddress',
        streetAddress: brand.brandId === 'alderton' ? 'Rutland House, 23 Friar Lane' : 'Cavendish Chambers, 14 Museum Street',
        addressLocality: brand.brandId === 'alderton' ? 'Leicester' : 'Ipswich',
        addressRegion: brand.brandId === 'alderton' ? 'Leicestershire' : 'Suffolk',
        postalCode: brand.brandId === 'alderton' ? 'LE1 5QQ' : 'IP1 1HE',
        addressCountry: 'GB',
      };

  return {
    ...(inGraph ? {} : { '@context': 'https://schema.org' }),
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name: town ? `${service.title} in ${town.name}` : service.title,
    serviceType: service.title,
    provider: {
      '@type': 'LegalService',
      '@id': town
        ? `${brand.siteUrl}/locations/${town.countySlug}/${town.slug}/${service.slug}/#localbusiness`
        : `${brand.siteUrl}#localbusiness`,
      name: town ? `${brand.brandName} – ${service.title} in ${town.name}` : brand.brandName,
      legalName: brand.legalEntityName,
      url: serviceUrl,
      telephone: brand.phone,
      email: brand.contactEmail,
      priceRange: '££',
      image: imageUrl,
      address: postalAddress,
    },
    offers: {
      '@type': 'Offer',
      name: town ? `${service.title} in ${town.name}` : service.title,
      price: '130.00',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      url: serviceUrl,
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
                streetAddress: `${town.name} Consultation Chambers, High Street`,
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
  service?: ServiceItem,
  inGraph = false
) {
  const imageUrl = `${brand.siteUrl}${imagePath}`;
  const caption = town
    ? service
      ? `FMC-accredited ${service.title} consultation serving ${town.name}, ${town.county}`
      : `Accredited Family Mediation Centre serving ${town.name}, ${town.county}`
    : `${title} - ${brand.brandName}`;

  return {
    ...(inGraph ? {} : { '@context': 'https://schema.org' }),
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
              streetAddress: `${town.name} Consultation Chambers, High Street`,
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
        url: `${brand.siteUrl}/icon.svg`,
        width: 512,
        height: 512,
      },
    },
    datePublished: '2026-09-15T09:00:00+01:00',
    dateModified: '2026-09-21T10:00:00+01:00',
  };
}
