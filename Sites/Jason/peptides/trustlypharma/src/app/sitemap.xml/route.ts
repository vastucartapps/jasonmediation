import { NextResponse } from 'next/server';
import { generateXmlSitemap } from '../../lib/discovery';

export const dynamic = 'force-static';

export async function GET() {
  const xml = generateXmlSitemap();

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
