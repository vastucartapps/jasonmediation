/**
 * apply-brand-images-alt.js
 * Updates image assets and alt tags with brand name and curated infographics/photos across Site 1 & Site 2
 */

const fs = require('fs');
const path = require('path');

const site1ImageMap = {
  'who-keeps-childrens-passports-after-separation': [
    {
      url: '/images/travel-consent-letter.webp',
      alt: 'Parent reviewing travel consent letter and child passport for holiday approval from Alderton Family Mediation',
      caption: 'Reviewing a formal Travel Consent Letter and flight itinerary during mediation to prevent international travel disputes.'
    },
    {
      url: '/images/dividing-school-holidays-calendar.webp',
      alt: 'School holiday rota and passport handover schedule from Alderton Family Mediation',
      caption: 'A structured school holiday rota establishing clear passport release dates and return protocols.'
    },
    {
      url: '/images/mediation-vs-court-comparison.webp',
      alt: 'Mediation vs family court pathway comparison infographic from Alderton Family Mediation',
      caption: 'Infographic illustrating why non-court mediation resolves passport disputes faster and without contested court litigation.'
    }
  ],
  'dividing-six-week-summer-holiday-separated-parents': [
    {
      url: '/images/dividing-school-holidays-calendar.webp',
      alt: 'Dividing six-week school summer holidays calendar from Alderton Family Mediation',
      caption: 'Parents negotiating half-term and six-week summer holiday rotas using a structured schedule.'
    },
    {
      url: '/images/parenting-plan-living-arrangements.webp',
      alt: 'Parenting plan living arrangements and summer holiday schedule infographic from Alderton Family Mediation',
      caption: 'Parenting plan diagram establishing transparent holiday handovers and routine arrangements.'
    },
    {
      url: '/images/shared-parenting-two-homes-rota.webp',
      alt: 'Shared care two homes rota and holiday transition from Alderton Family Mediation',
      caption: 'Structuring seamless transitions between parents\' homes during school holidays.'
    }
  ],
  'parents-disagree-taking-child-abroad-holiday-mediation': [
    {
      url: '/images/travel-consent-letter.webp',
      alt: 'International travel consent letter and passport verification from Alderton Family Mediation',
      caption: 'Formal travel consent paperwork with verified flight itineraries prepared during mediation.'
    },
    {
      url: '/images/different-mediation-formats.webp',
      alt: 'Different mediation formats including online and shuttle from Alderton Family Mediation',
      caption: 'Visual guide to shuttle and online video mediation options for high-conflict travel disputes.'
    },
    {
      url: '/images/accredited-mediator-session-discussion.webp',
      alt: 'Accredited family mediator helping parents resolve overseas holiday dispute from Alderton Family Mediation',
      caption: 'Facilitating child-centred agreement on foreign travel dates and emergency contact provisions.'
    }
  ],
  'how-to-agree-50-50-parenting-rota-mediation': [
    {
      url: '/images/shared-parenting-two-homes-rota.webp',
      alt: '50-50 shared parenting rota between two homes from Alderton Family Mediation',
      caption: 'Visualizing a balanced 50-50 shared care rota between two loving family homes.'
    },
    {
      url: '/images/parenting-schedule-planning-table.webp',
      alt: 'Parents planning weekly co-parenting schedule at table from Alderton Family Mediation',
      caption: 'Drafting weekly overnight schedules, school drop-offs, and weekend arrangements.'
    },
    {
      url: '/images/child-arrangements-mediation-infographic.webp',
      alt: 'Child arrangements through mediation process infographic from Alderton Family Mediation',
      caption: 'Comprehensive framework for structuring living arrangements and co-parenting plans.'
    }
  ],
  'child-maintenance-shared-care-calculator-mediation': [
    {
      url: '/images/parenting-schedule-planning-table.webp',
      alt: 'Child maintenance budget and shared care overnight calculation from Alderton Family Mediation',
      caption: 'Balancing household expenses, school costs, and overnight band reductions in mediation.'
    },
    {
      url: '/images/child-arrangements-mediation-infographic.webp',
      alt: 'Child-centred financial arrangements infographic from Alderton Family Mediation',
      caption: 'Aligning child maintenance contributions with practical day-to-day parenting schedules.'
    },
    {
      url: '/images/accredited-mediator-session-discussion.webp',
      alt: 'Family mediator facilitating child maintenance dialogue from Alderton Family Mediation',
      caption: 'Neutral mediation ensuring both parents contribute fairly to children\'s clubs, school trips, and uniforms.'
    }
  ],
  'grandparents-rights-see-grandchildren-mediation': [
    {
      url: '/images/child-inclusive-mediation-process.webp',
      alt: 'Child inclusive mediation and extended family relationships from Alderton Family Mediation',
      caption: 'Preserving vital grandparent relationships and family history through constructive mediation.'
    },
    {
      url: '/images/accredited-mediator-session-discussion.webp',
      alt: 'Grandparent contact consultation session from Alderton Family Mediation',
      caption: 'Resolving extended family contact barriers without adversarial court applications.'
    },
    {
      url: '/images/mediation-vs-court-comparison.webp',
      alt: 'Grandparents court application Section 10 vs mediation comparison from Alderton Family Mediation',
      caption: 'Comparing leave of the court applications under Section 10 Children Act with fast-track mediation.'
    }
  ],
  'what-age-can-child-choose-where-to-live-uk': [
    {
      url: '/images/child-inclusive-mediation-process.webp',
      alt: 'Child inclusive mediation listening to child wishes and feelings from Alderton Family Mediation',
      caption: 'Qualified child-inclusive mediator providing a safe space for older children to share their perspectives.'
    },
    {
      url: '/images/parenting-plan-living-arrangements.webp',
      alt: 'Parenting plan adapting to older children growing needs from Alderton Family Mediation',
      caption: 'Structuring adaptable living arrangements as teenagers develop greater autonomy and study commitments.'
    },
    {
      url: '/images/accredited-mediator-session-discussion.webp',
      alt: 'Mediation consultation on child living arrangements from Alderton Family Mediation',
      caption: 'Helping parents align with adolescent developmental needs without court custody battles.'
    }
  ],
  'shuttle-mediation-domestic-abuse-high-conflict': [
    {
      url: '/images/separate-rooms-shuttle-mediation.webp',
      alt: 'Separate rooms shuttle mediation for high-conflict separation from Alderton Family Mediation',
      caption: 'Shuttle mediation ensures parties remain in separate rooms with no direct interaction.'
    },
    {
      url: '/images/different-mediation-formats.webp',
      alt: 'Different mediation formats ensuring safety and neutrality from Alderton Family Mediation',
      caption: 'Visual overview of remote video and separate-room shuttle mediation options.'
    },
    {
      url: '/images/online-video-mediation-laptop.webp',
      alt: 'Secure online video mediation from home from Alderton Family Mediation',
      caption: 'Online shuttle sessions conducted via private Zoom/Teams breakout rooms for maximum comfort and safety.'
    }
  ]
};

const site2ImageMap = {
  'house-deposit-provided-by-parents-divorce-mediation': [
    {
      url: '/images/the-family-home-separation-options.webp',
      alt: 'The family home options and parental deposit equity division from Cavendish Family Mediation',
      caption: 'Exploring property sale, transfer of equity, and deposit ring-fencing options under Section 25.'
    },
    {
      url: '/images/financial-mediation-overview.webp',
      alt: 'Financial mediation overview and property assets from Cavendish Family Mediation',
      caption: 'Comprehensive framework for resolving matrimonial property, mortgages, and third-party contributions.'
    },
    {
      url: '/images/property-mediation-equity-division.webp',
      alt: 'Property mediation equity division and Deed of Trust from Cavendish Family Mediation',
      caption: 'Reviewing mortgage statements and parental deposit documentation with an accredited mediator.'
    }
  ],
  'inherited-money-used-for-mortgage-separation-mediation': [
    {
      url: '/images/the-family-home-separation-options.webp',
      alt: 'Matrimonial home options when inheritance was injected into mortgage from Cavendish Family Mediation',
      caption: 'Evaluating non-matrimonial inheritance claims against matrimonial housing needs.'
    },
    {
      url: '/images/financial-mediation-documentation-table.webp',
      alt: 'Financial disclosure documents and inheritance bank statements from Cavendish Family Mediation',
      caption: 'Tracing inherited funds through bank statements and property redemption documentation.'
    },
    {
      url: '/images/after-mediation-next-steps.webp',
      alt: 'After mediation next steps consent order roadmap from Cavendish Family Mediation',
      caption: 'Converting mediated inheritance settlements into a binding financial Consent Order.'
    }
  ],
  'final-salary-pension-sharing-divorce-mediation': [
    {
      url: '/images/pensions-long-term-financial-planning.webp',
      alt: 'Final salary pension sharing and CEV actuarial valuation from Cavendish Family Mediation',
      caption: 'Analyzing Cash Equivalent Values (CEV) and defined benefit pension scheme valuations in mediation.'
    },
    {
      url: '/images/financial-mediation-overview.webp',
      alt: 'Financial mediation pension rights and asset sharing infographic from Cavendish Family Mediation',
      caption: 'Structured approach to dividing NHS, USS, civil service, and private workplace pensions.'
    },
    {
      url: '/images/after-mediation-next-steps.webp',
      alt: 'Pension Sharing Order legal progression from Cavendish Family Mediation',
      caption: 'Translating mediated pension agreements into formal Pension Sharing Annexes (Form P1).'
    }
  ],
  'offsetting-pension-against-house-equity-divorce-mediation': [
    {
      url: '/images/the-family-home-separation-options.webp',
      alt: 'Offsetting pension capital against family home equity from Cavendish Family Mediation',
      caption: 'Evaluating the trade-off between retaining the marital home and relinquishing pension rights.'
    },
    {
      url: '/images/pensions-long-term-financial-planning.webp',
      alt: 'Actuarial pension valuation vs immediate property equity from Cavendish Family Mediation',
      caption: 'Calculating the true net present value of pensions when offsetting against house equity.'
    },
    {
      url: '/images/family-home-after-separation-property.webp',
      alt: 'Family home property equity division in divorce from Cavendish Family Mediation',
      caption: 'Ensuring housing affordability and mortgage capacity before finalizing pension offsets.'
    }
  ],
  'dividing-family-business-divorce-mediation-uk': [
    {
      url: '/images/financial-mediation-documentation-table.webp',
      alt: 'Business financial disclosure accounts and dividend history from Cavendish Family Mediation',
      caption: 'Examining statutory company accounts, director loan accounts, and dividend distributions in mediation.'
    },
    {
      url: '/images/preparing-for-family-mediation-guide.webp',
      alt: 'Preparing business valuation and financial disclosure for mediation from Cavendish Family Mediation',
      caption: 'Guide to gathering neutral expert business valuations without commercial disruption.'
    },
    {
      url: '/images/mediation-outcome-mou-document.webp',
      alt: 'Business share transfer and clean break MOU document from Cavendish Family Mediation',
      caption: 'Structuring share buybacks and deferred consideration terms in an Open Financial Summary.'
    }
  ],
  'can-parent-relocate-with-child-uk-internal-relocation': [
    {
      url: '/images/what-happens-if-no-agreement-mediation.webp',
      alt: 'What happens if parents disagree on internal relocation infographic from Cavendish Family Mediation',
      caption: 'Step-by-step pathways when parents dispute relocating children to a different county.'
    },
    {
      url: '/images/children-and-finances-maintenance.webp',
      alt: 'Child arrangements and relocation travel cost sharing from Cavendish Family Mediation',
      caption: 'Negotiating extended holiday contact and commuting cost contributions during mediation.'
    },
    {
      url: '/images/how-family-mediation-works-process.webp',
      alt: 'How family mediation works for relocation disputes from Cavendish Family Mediation',
      caption: 'Facilitating realistic compromises on school transitions and weekend travel logistics.'
    }
  ],
  'spousal-maintenance-clean-break-order-mediation': [
    {
      url: '/images/financial-mediation-overview.webp',
      alt: 'Spousal maintenance vs clean break financial mediation infographic from Cavendish Family Mediation',
      caption: 'Exploring term maintenance, capitalization, and clean break dismissals under Section 25A.'
    },
    {
      url: '/images/financial-mediation-documentation-table.webp',
      alt: 'Household monthly expenditure and income disclosure from Cavendish Family Mediation',
      caption: 'Completing Form E income needs schedules and verifying realistic future budgets.'
    },
    {
      url: '/images/after-mediation-next-steps.webp',
      alt: 'Consent order clean break finalization after mediation from Cavendish Family Mediation',
      caption: 'Securing court approval for a binding clean break dismissals of all future financial claims.'
    }
  ],
  'financial-disclosure-form-e-mediation-consent-orders': [
    {
      url: '/images/preparing-for-family-mediation-guide.webp',
      alt: 'Preparing full financial disclosure Form E for mediation from Cavendish Family Mediation',
      caption: 'Essential checklist for compiling 12 months of bank statements, P60s, and valuations.'
    },
    {
      url: '/images/financial-mediation-overview.webp',
      alt: 'Financial disclosure and consent order process from Cavendish Family Mediation',
      caption: 'Navigating transparent full and frank disclosure under the rules of Sharland v Sharland.'
    },
    {
      url: '/images/moving-forward-after-settlement.webp',
      alt: 'Finalizing Form D81 and court consent order after mediation from Cavendish Family Mediation',
      caption: 'Achieving certainty and financial freedom with a judge-sealed consent order.'
    }
  ]
};

// Update site1-blog.ts
const site1BlogPath = path.resolve('packages/core/src/data/site1-blog.ts');
let site1Content = fs.readFileSync(site1BlogPath, 'utf8');
const site1PostsMatch = site1Content.match(/export const SITE1_BLOG_POSTS: BlogPost\[\] = (\[[\s\S]*\]);/);
if (site1PostsMatch) {
  const posts = JSON.parse(site1PostsMatch[1]);
  posts.forEach((post) => {
    if (site1ImageMap[post.slug]) {
      post.images = site1ImageMap[post.slug];
      post.image = post.images[0].url;
      post.imageAlt = post.images[0].alt;
    }
  });
  const newContent = `import { BlogPost } from '../types';\n\nexport const SITE1_BLOG_POSTS: BlogPost[] = ${JSON.stringify(posts, null, 2)};\n`;
  fs.writeFileSync(site1BlogPath, newContent);
  console.log('[SUCCESS] Updated Site 1 (Alderton) images and brand alt tags.');
} else {
  console.error('[ERROR] Could not parse SITE1_BLOG_POSTS');
}

// Update site2-blog.ts
const site2BlogPath = path.resolve('packages/core/src/data/site2-blog.ts');
let site2Content = fs.readFileSync(site2BlogPath, 'utf8');
const site2PostsMatch = site2Content.match(/export const SITE2_BLOG_POSTS: BlogPost\[\] = (\[[\s\S]*\]);/);
if (site2PostsMatch) {
  const posts = JSON.parse(site2PostsMatch[1]);
  posts.forEach((post) => {
    if (site2ImageMap[post.slug]) {
      post.images = site2ImageMap[post.slug];
      post.image = post.images[0].url;
      post.imageAlt = post.images[0].alt;
    }
  });
  const newContent = `import { BlogPost } from '../types';\n\nexport const SITE2_BLOG_POSTS: BlogPost[] = ${JSON.stringify(posts, null, 2)};\n`;
  fs.writeFileSync(site2BlogPath, newContent);
  console.log('[SUCCESS] Updated Site 2 (Cavendish) images and brand alt tags.');
} else {
  console.error('[ERROR] Could not parse SITE2_BLOG_POSTS');
}
