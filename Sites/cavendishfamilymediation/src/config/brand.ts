import { BrandConfig, SITE2_COUNTIES, CAVENDISH_CONTACT } from '@mediation/core';

export const CAVENDISH_BRAND: BrandConfig = {
  brandId: 'cavendish',
  brandName: 'Cavendish Family Mediation',
  legalEntityName: 'Cavendish Family Mediation Practice Ltd',
  siteUrl: 'https://www.cavendishfamilymediation.co.uk',
  domain: 'cavendishfamilymediation.co.uk',
  tagline: 'Premier FMC-Accredited Family Mediation across the South East & East Anglia',
  strapline: 'Discreet, high-empathy dispute resolution protecting family assets, children’s futures, and emotional well-being.',
  phone: CAVENDISH_CONTACT.phone, // SSOT: 03300100217
  formattedPhone: CAVENDISH_CONTACT.formattedPhone, // SSOT: 03300 100 217
  contactEmail: CAVENDISH_CONTACT.email,
  primaryServiceArea: 'Suffolk, Essex, Kent & Sussex',
  fmcAccreditationText: 'Family Mediation Council (FMC) Accredited Practice',
  leadWebhookUrl: CAVENDISH_CONTACT.leadWebhookEndpoint,
  leadRecipientEmail: CAVENDISH_CONTACT.leadRecipientEmail,
  counties: SITE2_COUNTIES,
  theme: {
    primaryHex: '#064E3B',
    primaryLightHex: '#047857',
    accentHex: '#C5A880',
    accentHoverHex: '#B89462',
    surfaceBgHex: '#FAF9F5',
    cardBorderHex: '#E9E4D6',
  },
};
