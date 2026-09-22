import { NextResponse } from 'next/server';
import { ALDERTON_BRAND } from '../../config/brand';
import { SITE1_COUNTIES, CORE_SERVICES, SITE1_BLOG_POSTS } from '@mediation/core';

export const dynamic = 'force-static';

export async function GET() {
  const content = `# ${ALDERTON_BRAND.brandName}
> ${ALDERTON_BRAND.tagline}

## Overview & Regulatory Accreditation
- Practice Name: ${ALDERTON_BRAND.brandName} (${ALDERTON_BRAND.legalEntityName})
- Primary URL: ${ALDERTON_BRAND.siteUrl}
- Accreditation: Family Mediation Council (FMC)
- Core Statutory Mandate: Section 10, Children and Families Act 2014 & Family Procedure Rules 2010 Part 3
- Service Area: East Midlands (Leicestershire, Rutland, Lincolnshire, Nottinghamshire)
- Telephone: ${ALDERTON_BRAND.formattedPhone} (${ALDERTON_BRAND.phone})
- Email: ${ALDERTON_BRAND.contactEmail}

## Core Mediation Services
${CORE_SERVICES.map(
  (s) => `- [${s.title}](${ALDERTON_BRAND.siteUrl}/services/${s.slug}): ${s.summary} (Statutory Basis: ${s.statutoryBasis})`
).join('\n')}

## Regional Practice Locations & Coverage
${SITE1_COUNTIES.map((county) =>
  county.towns
    .map(
      (town) =>
        `- [Family Mediation ${town.name}](${ALDERTON_BRAND.siteUrl}/locations/${county.slug}/${town.slug}): Serving ${town.name} and surrounding ${town.county} communities. Regional court reference: ${town.designatedCourt.name}.`
    )
    .join('\n')
).join('\n')}

## Practical Guidance & Family Law Knowledge Bank
${SITE1_BLOG_POSTS.map(
  (g) => `- [${g.title}](${ALDERTON_BRAND.siteUrl}/blog/${g.slug}): ${g.summary}`
).join('\n')}
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
