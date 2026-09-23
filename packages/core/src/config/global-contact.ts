/**
 * Single Source of Truth (SSOT) for shared corporate and contact records.
 * Updating values here cascades across all pages, structured JSON-LD schemas,
 * click-to-call buttons, and contact forms.
 */
export const GLOBAL_CONTACT = {
  // Central Tracking Telephone - strictly configured as single source of truth
  phone: '08008611050',
  formattedPhone: '0800 861 1050',
  telUri: 'tel:08008611050',

  // Emergency & Domestic Abuse Signposting (Statutory UK Family Law Requirement)
  nationalDomesticAbuseHelpline: '0808 2000 247',
  childline: '0800 1111',

  // Office hours
  openingHoursSpecification: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '18:00',
    },
    {
      dayOfWeek: ['Saturday'],
      opens: '09:00',
      closes: '13:00',
    },
  ],
  openingHoursText: 'Monday to Friday: 8:30am – 6:00pm | Saturday: 9:00am – 1:00pm',

  // Professional Accreditations
  accreditationBody: 'Family Mediation Council (FMC)',
  regulatoryStandards: 'FMC Code of Professional Conduct',
  courtStandardsCitation: 'Section 10 of the Children and Families Act 2014 & Family Procedure Rules 2010 Part 3',

  // Form Submission & Lead Notification Destination (SSOT for all brands)
  leadRecipientEmail: 'venturevidyahindi@gmail.com',
  formSubmitToken: 'abdf15fb72b87ae3039219a094638be0',
  leadSubmitEndpoint: 'https://formsubmit.co/ajax/abdf15fb72b87ae3039219a094638be0',
  leadWebhookEndpoint: 'https://formsubmit.co/ajax/abdf15fb72b87ae3039219a094638be0',
};

export const ALDERTON_CONTACT = {
  ...GLOBAL_CONTACT,
  brandName: 'Alderton Family Mediation',
  legalName: 'Alderton Family Mediation Services Ltd',
  email: 'enquiries@aldertonfamilymediation.co.uk',
  siteUrl: 'https://www.aldertonfamilymediation.co.uk',
  phone: '01164974555',
  formattedPhone: '0116 497 4555',
  telUri: 'tel:01164974555',
  headOfficeAddress: {
    street: 'Rutland House, 23 Friar Lane',
    locality: 'Leicester',
    region: 'Leicestershire',
    postalCode: 'LE1 5QQ',
    country: 'GB',
  },
};

export const CAVENDISH_CONTACT = {
  ...GLOBAL_CONTACT,
  brandName: 'Cavendish Family Mediation',
  legalName: 'Cavendish Family Mediation Practice Ltd',
  email: 'enquiries@cavendishfamilymediation.co.uk',
  siteUrl: 'https://www.cavendishfamilymediation.co.uk',
  phone: '01473943933',
  formattedPhone: '01473 943 933',
  telUri: 'tel:01473943933',
  headOfficeAddress: {
    street: 'Cavendish Chambers, 14 Museum Street',
    locality: 'Ipswich',
    region: 'Suffolk',
    postalCode: 'IP1 1HE',
    country: 'GB',
  },
};
