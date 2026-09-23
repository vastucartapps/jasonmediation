export interface FAQItem {
  question: string;
  answer: string;
}

export interface DesignatedCourt {
  name: string;
  address: string;
  postcode: string;
  jurisdiction: string;
  c100SubmissionNote: string;
}

export interface TownLocation {
  slug: string;
  name: string;
  county: string;
  countySlug: string;
  population: number;
  censusRank: number;
  postalDistricts: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  designatedCourt: DesignatedCourt;
  transportAndAccess: string;
  neighbouringAreas: string[];
  localContext: string;
  wikidataId?: string;
  wikipediaUrl?: string;
  faqs: FAQItem[];
}

export interface CountyRegion {
  slug: string;
  name: string;
  region: string;
  description: string;
  wikidataId?: string;
  wikipediaUrl?: string;
  towns: TownLocation[];
}

export interface ServiceProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  duration: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  navLabel: string;
  badge: string;
  summary: string;
  heroHeadline: string;
  heroSubheadline: string;
  statutoryBasis: string;
  legalFramework: string;
  courtFormRequired?: string;
  typicalDuration: string;
  keyBenefits: string[];
  processSteps: ServiceProcessStep[];
  faqs: FAQItem[];
  heroImage: string;
  cardImage?: string;
}

export interface ArticleImage {
  url: string;
  alt: string;
  caption: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
}

export interface StatutoryRule {
  title: string;
  act: string;
  rule: string;
  sanctionOrConsequence: string;
}

export interface PracticalStepDetail {
  step: string;
  detail: string;
}

export interface CommonPitfall {
  title: string;
  description: string;
  solution: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  clusterNumber: string;
  clusterName: string;
  summary: string;
  readingTime: string;
  publishedDate: string;
  targetKeyword: string;
  searchIntent: string;
  relatedServiceSlug: string;
  relatedTownSlugs: string[];
  relatedPostSlugs?: string[];
  coreQuestion: string;
  directAnswer: string;
  legalFramework: string;
  statutoryRules?: StatutoryRule[];
  practicalSteps: string[] | PracticalStepDetail[];
  commonPitfalls?: CommonPitfall[];
  mediatorInsights?: string;
  limitsOfMediation: string;
  faqs: FAQItem[];
  image: string;
  imageAlt: string;
  images?: ArticleImage[];
  tableOfContents?: TableOfContentsItem[];
}

export interface GuideArticle {
  slug: string;
  title: string;
  clusterNumber: string;
  clusterName: string;
  summary: string;
  readingTime: string;
  publishedDate: string;
  relatedServiceSlug: string;
  coreQuestion: string;
  legalFramework: string;
  practicalSteps: string[] | PracticalStepDetail[];
  faqs: FAQItem[];
  targetKeyword?: string;
  searchIntent?: string;
  relatedTownSlugs?: string[];
  relatedPostSlugs?: string[];
  directAnswer?: string;
  statutoryRules?: StatutoryRule[];
  commonPitfalls?: CommonPitfall[];
  mediatorInsights?: string;
  limitsOfMediation?: string;
  image?: string;
  imageAlt?: string;
  images?: ArticleImage[];
  tableOfContents?: TableOfContentsItem[];
}

export interface BrandConfig {
  brandId: 'alderton' | 'cavendish';
  brandName: string;
  legalEntityName: string;
  siteUrl: string;
  domain: string;
  tagline: string;
  strapline: string;
  phone: string;
  formattedPhone: string;
  contactEmail: string;
  primaryServiceArea: string;
  fmcAccreditationText: string;
  leadWebhookUrl: string;
  leadRecipientEmail?: string;
  leadSubmitEndpoint?: string;
  counties: CountyRegion[];
  theme: {
    primaryHex: string;
    primaryLightHex: string;
    accentHex: string;
    accentHoverHex: string;
    surfaceBgHex: string;
    cardBorderHex: string;
  };
  googleAnalyticsId?: string;
  googleSiteVerification?: string;
}
