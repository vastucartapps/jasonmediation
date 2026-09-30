import { NextResponse } from 'next/server';
import { CAVENDISH_BRAND } from '../../config/brand';
import { SITE2_COUNTIES, CORE_SERVICES, SITE2_BLOG_POSTS } from '@mediation/core';

export const dynamic = 'force-static';

export async function GET() {
  const content = `# ${CAVENDISH_BRAND.brandName}
> ${CAVENDISH_BRAND.tagline}

## Overview & Regulatory Accreditation
- Practice Name: ${CAVENDISH_BRAND.brandName} (${CAVENDISH_BRAND.legalEntityName})
- Primary URL: ${CAVENDISH_BRAND.siteUrl}/
- Accreditation: Family Mediation Council (FMC)
- Core Statutory Mandate: Section 10, Children and Families Act 2014 & Family Procedure Rules 2010 Part 3
- Service Area: South East England & East Anglia (Suffolk, Essex, Kent, Sussex)
- Telephone: ${CAVENDISH_BRAND.formattedPhone} (${CAVENDISH_BRAND.phone})
- Email: ${CAVENDISH_BRAND.contactEmail}

## Practice Directory & Key Portals
- [Home](${CAVENDISH_BRAND.siteUrl}/): FMC Accredited Family Mediation & Fast MIAM Assessments
- [All Mediation Services](${CAVENDISH_BRAND.siteUrl}/services/): Overview of accredited dispute resolution pathways
- [Regional Practice Locations](${CAVENDISH_BRAND.siteUrl}/locations/): Comprehensive South East catchment directory
- [Practice Background & Ethics](${CAVENDISH_BRAND.siteUrl}/about/): FMC professional code of conduct and mediator credentials
- [Book Assessment & Contact](${CAVENDISH_BRAND.siteUrl}/contact/): Confidential booking intake and crisis lines
- [Complete Site Sitemap](${CAVENDISH_BRAND.siteUrl}/sitemap/): Full architectural page index and navigation directory
- [Privacy Policy](${CAVENDISH_BRAND.siteUrl}/privacy/): GDPR compliance and statutory mediation confidentiality
- [Terms of Engagement](${CAVENDISH_BRAND.siteUrl}/terms/): Practice standards and fee transparency

## Core Mediation Services
${CORE_SERVICES.map(
  (s) => `- [${s.title}](${CAVENDISH_BRAND.siteUrl}/services/${s.slug}/): ${s.summary} (Statutory Basis: ${s.statutoryBasis})`
).join('\n')}

## Statutory Procedural Fact Matrix
- Ministry of Justice Family Mediation Voucher Scheme: Up to £500 non-means-tested government grant for eligible child dispute cases.
- MIAM Assessment Fee: £120 - £160 per individual assessment meeting.
- Form C100 / Form A Sign-Off Turnaround: 24 to 48 hours following individual MIAM.
- Certificate Validity: Signed court mediation certificates remain valid for 4 months from assessment date.
- Legal Authority: Section 10 Children and Families Act 2014 & Family Procedure Rules (FPR 2024 Part 3). Cost sanctions apply for unreasonable refusal.

## Regional Practice Locations & Coverage
${SITE2_COUNTIES.map((county) =>
  county.towns
    .map(
      (town) =>
        `- [Family Mediation ${town.name}](${CAVENDISH_BRAND.siteUrl}/locations/${county.slug}/${town.slug}/): Serving ${town.name} and surrounding ${town.county} communities. Regional court reference: ${town.designatedCourt.name}.`
    )
    .join('\n')
).join('\n')}

## Regional Service Practice Hubs (Deep URLs)
${SITE2_COUNTIES.map((county) =>
  county.towns
    .map((town) =>
      CORE_SERVICES.map(
        (service) =>
          `- [${service.title} in ${town.name}](${CAVENDISH_BRAND.siteUrl}/locations/${county.slug}/${town.slug}/${service.slug}/): Fast FMC assessment & resolution for ${service.title.toLowerCase()} in ${town.name}, ${town.county}.`
      ).join('\n')
    )
    .join('\n')
).join('\n')}

## Practical Guidance & Family Law Knowledge Bank
${SITE2_BLOG_POSTS.map(
  (g) => `- [${g.title}](${CAVENDISH_BRAND.siteUrl}/blog/${g.slug}/): ${g.summary}`
).join('\n')}
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
