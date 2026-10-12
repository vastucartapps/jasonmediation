import type { Metadata } from 'next';
import { SITE_METADATA } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact Editorial Desk & Chemical Errata Portal',
  description:
    'Submit chemical monograph corrections, peer-reviewed PubMed citations, and laboratory accreditation inquiries to the Peptides UK registry team.',
  alternates: {
    canonical: `${SITE_METADATA.url}/contact/`,
  },
  openGraph: {
    title: 'Contact Editorial Desk & Chemical Errata Portal | Peptides UK',
    description:
      'Submit chemical monograph corrections, peer-reviewed PubMed citations, and laboratory accreditation inquiries to the Peptides UK registry team.',
    url: `${SITE_METADATA.url}/contact/`,
    siteName: SITE_METADATA.name,
    locale: SITE_METADATA.locale,
    type: 'website',
    images: [
      {
        url: `${SITE_METADATA.url}/icon-512x512.png`,
        width: 512,
        height: 512,
        alt: 'Contact Peptides UK Editorial Desk',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Contact Editorial Desk & Chemical Errata Portal | Peptides UK',
    description:
      'Submit chemical monograph corrections, peer-reviewed PubMed citations, and laboratory accreditation inquiries to the Peptides UK registry team.',
    images: [`${SITE_METADATA.url}/icon-512x512.png`],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
