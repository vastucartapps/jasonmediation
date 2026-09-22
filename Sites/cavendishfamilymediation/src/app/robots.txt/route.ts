import { NextResponse } from 'next/server';
import { CAVENDISH_BRAND } from '../../config/brand';

export const dynamic = 'force-static';

export async function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${CAVENDISH_BRAND.siteUrl}/sitemap.xml
`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
