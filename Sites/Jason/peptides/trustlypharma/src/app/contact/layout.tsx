import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Editorial & Academic Contact | Trustly Pharma',
  description:
    'Contact the Trustly Pharma scientific curation team for CAS registry corrections, PubMed citations, or laboratory vendor inquiries.',
  alternates: {
    canonical: 'https://trustlypharma.uk/contact/',
  },
  openGraph: {
    title: 'Editorial & Academic Contact | Trustly Pharma',
    description:
      'Contact the Trustly Pharma scientific curation team for CAS registry corrections, PubMed citations, or laboratory vendor inquiries.',
    url: 'https://trustlypharma.uk/contact/',
    siteName: 'Trustly Pharma',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
