import { GuideArticle } from '../types';

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    slug: 'who-keeps-childrens-passports-after-separation',
    title: "Who Keeps the Children's Passports After Separation?",
    clusterNumber: '01',
    clusterName: 'Children – Holidays, Passports & Travel',
    summary: 'A clear UK legal and practical guide for separated parents on passport custody, international travel permissions, and resolving passport disputes without court orders.',
    readingTime: '6 min read',
    publishedDate: '12 September 2026',
    relatedServiceSlug: 'child-arrangements',
    coreQuestion: 'Under English family law, who has the legal right to hold a child’s passport, and what happens when one parent refuses to hand it over for a holiday?',
    legalFramework: 'Under the Child Abduction Act 1984, taking a child outside the United Kingdom without the consent of everyone with Parental Responsibility (or leave of the court) is an offence. Passports belong to the UK Passport Office (HMPO), but physical custody is typically shared or mediated.',
    practicalSteps: [
      'Document agreement in your Parenting Plan regarding where passports are kept (e.g. primary residence home or neutral deposit).',
      'Establish a mandatory notice window (typically 28 to 60 days) before any overseas departure.',
      'Exchange comprehensive trip details: flight numbers, hotel address, contact telephone numbers, and emergency medical insurance details.',
      'Return the passports promptly within 48 to 72 hours of returning to the UK.',
    ],
    faqs: [
      {
        question: 'Can one parent hold onto the passports and refuse to let the other take the children on holiday?',
        answer: 'Unless there is a genuine, evidence-based risk of child abduction or harm, unreasonable withholding of a passport can result in the other parent applying to court for a Specific Issue Order (Form C100). Attending a MIAM is mandatory before making such an application.',
      },
      {
        question: 'Do I need a written consent letter to take my child abroad?',
        answer: 'Yes. Border Force officers at UK ports and international border authorities regularly request a signed letter from the other parent confirming consent, along with a copy of the child’s birth certificate or court order.',
      },
      {
        question: 'Can mediation resolve an urgent passport dispute before summer holidays?',
        answer: 'Yes. Urgent online mediation sessions can be arranged within 48 hours to negotiate safe travel terms, return guarantees, and flight itineraries without incurring thousands in emergency solicitor costs.',
      },
    ],
  },
  {
    slug: 'what-happens-to-family-home-in-divorce',
    title: 'What Happens to the Family Home During Separation and Divorce?',
    clusterNumber: '06',
    clusterName: 'The Family Home & Mortgage',
    summary: 'An authoritative review of how English family law treats the matrimonial home: mortgage capacity, equity transfers, and Mesher deferred sale orders.',
    readingTime: '8 min read',
    publishedDate: '15 September 2026',
    relatedServiceSlug: 'financial-mediation',
    coreQuestion: 'Can one partner stay in the family house with the children, or must the property always be sold and the equity divided?',
    legalFramework: 'Section 25 of the Matrimonial Causes Act 1973 places the housing and welfare needs of minor children first. Courts and mediators evaluate whether a clean break is viable or if a deferred sale is necessary.',
    practicalSteps: [
      'Obtain 3 independent estate agent market appraisals to establish an agreed gross valuation.',
      'Request an official mortgage redemption statement showing the exact outstanding balance and early repayment fees.',
      'Conduct a formal mortgage borrowing capacity assessment with an independent financial advisor.',
      'Explore buyout options, equity division percentages, or deferred sale conditions in mediation.',
    ],
    faqs: [
      {
        question: 'Does the mother automatically get to keep the family house in England?',
        answer: 'No. The law does not give preference based on gender. The primary consideration is meeting the practical housing needs of any dependent children, balanced against the financial resources and mortgage capacities of both parents.',
      },
      {
        question: 'What is a Mesher Order?',
        answer: 'A Mesher Order is a court order that defers the sale of the family home until a triggering event occurs—typically when the youngest child turns 18 or finishes secondary education, or if the resident parent remarries or cohabits.',
      },
      {
        question: 'How does mediation help resolve property disputes?',
        answer: 'In mediation, you explore real numbers with full transparency, evaluating whether one person can realistically refinance the mortgage or whether selling and purchasing two smaller homes best secures both parties’ futures.',
      },
    ],
  },
  {
    slug: 'dividing-pensions-in-family-mediation',
    title: 'How Are Pensions Divided in Divorce and Family Mediation?',
    clusterNumber: '08',
    clusterName: 'Pensions, Bonuses & Financial Disclosure',
    summary: 'Understanding Cash Equivalent Valuations (CEVs), Pension Sharing Orders, and pension offsetting principles in UK matrimonial financial settlements.',
    readingTime: '7 min read',
    publishedDate: '18 September 2026',
    relatedServiceSlug: 'financial-mediation',
    coreQuestion: 'Are workplace and private pensions included in divorce financial settlements, and how is equality achieved?',
    legalFramework: 'The Welfare Reform and Pensions Act 1999 introduced Pension Sharing Orders. Pensions accumulated before and during a marriage are recognized as marital assets capable of division.',
    practicalSteps: [
      'Obtain up-to-date Cash Equivalent Transfer Value (CETV) statements from all pension scheme administrators.',
      'Identify whether schemes are Defined Benefit (e.g. NHS, Teachers, Civil Service, Armed Forces) or Defined Contribution.',
      'Determine whether an independent Pension on Divorce Expert (PODE) report is needed for high-value disparities.',
      'Negotiate in mediation whether to share pensions directly or offset pension value against home equity.',
    ],
    faqs: [
      {
        question: 'Can my ex-partner claim half of my workplace pension?',
        answer: 'Pensions are considered part of the overall marital pot. While an automatic 50/50 split is not guaranteed, the court aims to ensure both parties have adequate retirement income, especially where one partner took time out of their career to raise children.',
      },
      {
        question: 'What is pension offsetting?',
        answer: 'Pension offsetting occurs where one party keeps their pension intact in exchange for the other party receiving a larger share of the equity in the family home or other capital assets.',
      },
      {
        question: 'Is a court order needed to implement a pension share?',
        answer: 'Yes. Pension trustees can only execute a pension split upon receiving an official court Pension Sharing Order, which is easily drafted following an agreed mediation Memorandum of Understanding.',
      },
    ],
  },
  {
    slug: '50-50-shared-parenting-schedules-uk',
    title: 'How to Agree a 50/50 Shared Parenting Schedule in the UK',
    clusterNumber: '03',
    clusterName: '50/50 Parenting & Changing Routines',
    summary: 'A practical examination of 2-2-3, 2-2-5-5, and alternating week rotas for separated parents seeking equal, stable care for their children.',
    readingTime: '7 min read',
    publishedDate: '20 September 2026',
    relatedServiceSlug: 'child-arrangements',
    coreQuestion: 'Does English family law mandate a 50/50 shared parenting split, and how can parents structure an equal rota that works practically?',
    legalFramework: 'The Children and Families Act 2014 introduced a legal presumption that the involvement of both parents in a child’s life furthers their welfare, unless there is evidence of risk. However, 50/50 shared care is determined by practical suitability, not an automatic statutory entitlement.',
    practicalSteps: [
      'Evaluate practical proximity: travel distances between homes, school transport, and morning logistics.',
      'Choose a rota model that fits the child’s age: 2-2-5-5 for younger children, or alternate 7-day blocks for teenagers.',
      'Define clear handover protocols (e.g. drop-off and pick-up directly from school to minimize parental conflict).',
      'Agree on shared costs for school uniforms, extracurricular clubs, and medical appointments in mediation.',
    ],
    faqs: [
      {
        question: 'Can 50/50 shared care work if parents do not live next door to each other?',
        answer: 'Yes, provided both homes are within reasonable travelling distance of the child’s school and neither parent has to undergo excessive daily commutes that exhaust the child.',
      },
      {
        question: 'Does 50/50 care cancel out child maintenance completely?',
        answer: 'Under Child Maintenance Service (CMS) rules, exact equal shared care (equal nights) means neither parent is legally obligated to pay statutory child maintenance to the other, though private agreements on shared direct expenses are recommended.',
      },
      {
        question: 'How do we trial a 50/50 routine through mediation?',
        answer: 'Mediation allows parents to agree on a structured 3-month or 6-month trial period, with a planned review session to assess how the children are adapting before cementing terms in a final Parenting Plan.',
      },
    ],
  },
];
