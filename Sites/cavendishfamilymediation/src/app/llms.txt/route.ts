import { NextResponse } from 'next/server';
import { CAVENDISH_BRAND } from '../../config/brand';
import { SITE2_COUNTIES, CORE_SERVICES, SITE2_BLOG_POSTS } from '@mediation/core';

export const dynamic = 'force-static';

export async function GET() {
  const content = `# ${CAVENDISH_BRAND.brandName}
> ${CAVENDISH_BRAND.tagline}

## Overview & Regulatory Accreditation
- Practice Name: ${CAVENDISH_BRAND.brandName} (${CAVENDISH_BRAND.legalEntityName})
- Primary URL: ${CAVENDISH_BRAND.siteUrl}
- Accreditation: Family Mediation Council (FMC)
- Core Statutory Mandate: Section 10, Children and Families Act 2014 & Family Procedure Rules 2010 Part 3
- Service Area: South East England & East Anglia (Suffolk, Essex, Kent, Sussex)
- Telephone: ${CAVENDISH_BRAND.formattedPhone} (${CAVENDISH_BRAND.phone})
- Email: ${CAVENDISH_BRAND.contactEmail}

## Core Mediation Services
${CORE_SERVICES.map(
  (s) => `- [${s.title}](${CAVENDISH_BRAND.siteUrl}/services/${s.slug}): ${s.summary} (Statutory Basis: ${s.statutoryBasis})`
).join('\n')}

## Regional Practice Locations & Coverage
${SITE2_COUNTIES.map((county) =>
  county.towns
    .map(
      (town) =>
        `- [Family Mediation ${town.name}](${CAVENDISH_BRAND.siteUrl}/locations/${county.slug}/${town.slug}): Serving ${town.name} and surrounding ${town.county} communities. Regional court reference: ${town.designatedCourt.name}.`
    )
    .join('\n')
).join('\n')}

## Practical Guidance & Family Law Knowledge Bank
${SITE2_BLOG_POSTS.map(
  (g) => `- [${g.title}](${CAVENDISH_BRAND.siteUrl}/blog/${g.slug}): ${g.summary}`
).join('\n')}
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
