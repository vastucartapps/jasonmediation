import { BrandConfig, SITE1_COUNTIES, ALDERTON_CONTACT } from '@mediation/core';

export const ALDERTON_BRAND: BrandConfig = {
  brandId: 'alderton',
  brandName: 'Alderton Family Mediation',
  legalEntityName: 'Alderton Family Mediation Services Ltd',
  siteUrl: 'https://www.aldertonfamilymediation.co.uk',
  domain: 'aldertonfamilymediation.co.uk',
  tagline: 'Accredited Family Mediation & Fast MIAM Assessments in the East Midlands',
  strapline: 'Resolving children arrangements and financial settlements calmly, affordably, and confidentially without painful court battles.',
  phone: ALDERTON_CONTACT.phone, // SSOT: 01164974555
  formattedPhone: ALDERTON_CONTACT.formattedPhone, // SSOT: 0116 497 4555
  contactEmail: ALDERTON_CONTACT.email,
  primaryServiceArea: 'Leicestershire, Rutland, Lincolnshire & Nottinghamshire',
  fmcAccreditationText: 'Family Mediation Council (FMC) Accredited Practice',
  leadWebhookUrl: ALDERTON_CONTACT.leadWebhookEndpoint,
  leadRecipientEmail: ALDERTON_CONTACT.leadRecipientEmail,
  counties: SITE1_COUNTIES,
  theme: {
    primaryHex: '#0B192C',
    primaryLightHex: '#1E3E62',
    accentHex: '#D97706',
    accentHoverHex: '#B45309',
    surfaceBgHex: '#F8FAFC',
    cardBorderHex: '#E2E8F0',
  },
};
