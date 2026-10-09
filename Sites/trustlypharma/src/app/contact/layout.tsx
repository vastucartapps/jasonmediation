import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Institutional Contact Desk | Trustly Pharma',
  description:
    'Direct contact desk for chemical errata, PubMed citations, academic partnerships, and commercial vendor directory inclusions at Trustly Pharma.',
  alternates: {
    canonical: 'https://trustlypharma.uk/contact/',
  },
  openGraph: {
    title: 'Institutional Contact Desk | Trustly Pharma',
    description:
      'Direct contact desk for chemical errata, PubMed citations, academic partnerships, and commercial vendor directory inclusions at Trustly Pharma.',
    url: 'https://trustlypharma.uk/contact/',
    siteName: 'Trustly Pharma',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
