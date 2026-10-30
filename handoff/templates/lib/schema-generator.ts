/**
 * No-GBP Multi-Node Entity Triangulation Schema Generator
 * Builds a single-script unified @graph JSON-LD structure that anchors
 * Organization, Service, WebPage, BreadcrumbList, and FAQPage nodes via @id.
 */

export interface SchemaGeneratorParams {
  brandName: string;
  brandUrl: string;
  brandLogo: string;
  phone: string;
  sameAsLinks: string[];
  serviceName: string;
  pageUrl: string;
  cityName: string;
  stateOrRegion: string;
  wikiCityUri?: string;
  latitude: number;
  longitude: number;
  minPrice: string;
  maxPrice: string;
  currency?: string;
  breadcrumbs: Array<{ name: string; url: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  citations?: string[];
}

export function buildUnifiedSchemaGraph(params: SchemaGeneratorParams): object {
  const cleanBase = params.brandUrl.replace(/\/$/, '');
  const cleanPage = params.pageUrl.replace(/\/$/, '');

  const orgId = `${cleanBase}/#organization`;
  const websiteId = `${cleanBase}/#website`;
  const serviceId = `${cleanPage}/#service`;
  const webpageId = `${cleanPage}/#webpage`;
  const breadcrumbId = `${cleanPage}/#breadcrumb`;

  const graph: any[] = [
    {
      "@type": "Organization",
      "@id": orgId,
      "name": params.brandName,
      "url": cleanBase,
      "logo": params.brandLogo,
      "telephone": params.phone,
      "sameAs": params.sameAsLinks,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      "url": cleanBase,
      "name": params.brandName,
      "publisher": { "@id": orgId },
    },
    {
      "@type": "Service",
      "@id": serviceId,
      "name": `${params.serviceName} in ${params.cityName}, ${params.stateOrRegion}`,
      "serviceType": params.serviceName,
      "provider": { "@id": orgId },
      "areaServed": {
        "@type": "City",
        "name": params.cityName,
        "sameAs": params.wikiCityUri || `https://en.wikipedia.org/wiki/${encodeURIComponent(params.cityName)}`,
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": params.latitude,
          "longitude": params.longitude,
        },
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${params.serviceName} Tiers`,
        "itemListElement": [
          {
            "@type": "Offer",
            "name": `Standard ${params.serviceName}`,
            "priceSpecification": {
              "@type": "PriceSpecification",
              "priceCurrency": params.currency || "USD",
              "minPrice": params.minPrice,
              "maxPrice": params.maxPrice,
            },
          },
        ],
      },
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      "url": `${cleanPage}/`,
      "name": `${params.serviceName} in ${params.cityName}, ${params.stateOrRegion} | ${params.brandName}`,
      "isPartOf": { "@id": websiteId },
      "about": { "@id": serviceId },
      "citation": params.citations || [],
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".bluf-answer", "h1", "h2"],
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      "itemListElement": params.breadcrumbs.map((b, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": b.name,
        "item": b.url,
      })),
    },
  ];

  if (params.faqs && params.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${cleanPage}/#faq`,
      "mainEntity": params.faqs.map((f) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
