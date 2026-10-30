import { generateUnifiedSitemapXml } from '@/lib/discovery';

export const dynamic = 'force-static';

export async function GET() {
  const xml = generateUnifiedSitemapXml();
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
