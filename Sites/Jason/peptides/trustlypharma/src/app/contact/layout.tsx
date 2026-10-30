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
    images: [
      {
        url: 'https://trustlypharma.uk/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Trustly Pharma Institutional Contact Desk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Institutional Contact Desk | Trustly Pharma',
    description:
      'Direct contact desk for chemical errata, PubMed citations, academic partnerships, and commercial vendor directory inclusions at Trustly Pharma.',
    images: ['https://trustlypharma.uk/icon-512x512.png'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
