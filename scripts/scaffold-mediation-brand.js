#!/usr/bin/env node

/**
 * UK Family Mediation Portfolio Brand Generator & Scaffold Engine
 * 
 * Scaffolds an FMC-accredited family mediation website in one command,
 * including all 13 standard Next.js route templates, configuration files,
 * Tailwind design tokens, and build-time static generators.
 * 
 * Works both within the monorepo ('Sites/<brand>') and in standalone directories.
 * 
 * Usage:
 *   node scripts/scaffold-mediation-brand.js \
 *     --name "Kingsley Family Mediation" \
 *     --slug "kingsleyfamilymediation" \
 *     --phone "01214974000" \
 *     --formattedPhone "0121 497 4000" \
 *     --primaryHex "#0F172A" \
 *     --accentHex "#D97706"
 */

const fs = require('fs');
const path = require('path');

function parseArgs() {
  const args = process.argv.slice(2);
  const params = {
    name: '',
    slug: '',
    phone: '',
    formattedPhone: '',
    countyData: 'SITE1_COUNTIES',
    blogData: 'SITE1_BLOG_POSTS',
    primaryHex: '#0F172A',
    primaryLightHex: '#1E293B',
    accentHex: '#D97706',
    accentHoverHex: '#B45309',
    surfaceBgHex: '#F8FAFC',
    email: '',
    siteUrl: '',
    targetDir: '',
  };

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    const val = args[i + 1];
    if (key in params) {
      params[key] = val;
    }
  }

  if (!params.name || !params.slug || !params.phone || !params.formattedPhone) {
    console.error('Missing required arguments: --name, --slug, --phone, --formattedPhone');
    process.exit(1);
  }

  if (!params.email) {
    params.email = `enquiries@${params.slug}.co.uk`;
  }
  if (!params.siteUrl) {
    params.siteUrl = `https://www.${params.slug}.co.uk`;
  }

  return params;
}

const config = parseArgs();
const targetDir = config.targetDir
  ? path.resolve(config.targetDir)
  : path.resolve(__dirname, '..', 'Sites', config.slug);

if (fs.existsSync(targetDir)) {
  console.error(`Target directory already exists: ${targetDir}`);
  process.exit(1);
}

console.log(`\n========================================`);
console.log(`Generating Brand: ${config.name}`);
console.log(`Destination: ${targetDir}`);
console.log(`========================================\n`);

// 1. Create directory tree
const dirs = [
  targetDir,
  path.join(targetDir, 'public'),
  path.join(targetDir, 'public', 'images'),
  path.join(targetDir, 'src'),
  path.join(targetDir, 'src', 'config'),
  path.join(targetDir, 'src', 'app'),
  path.join(targetDir, 'src', 'app', 'about'),
  path.join(targetDir, 'src', 'app', 'contact'),
  path.join(targetDir, 'src', 'app', 'privacy'),
  path.join(targetDir, 'src', 'app', 'terms'),
  path.join(targetDir, 'src', 'app', 'services'),
  path.join(targetDir, 'src', 'app', 'services', '[slug]'),
  path.join(targetDir, 'src', 'app', 'locations'),
  path.join(targetDir, 'src', 'app', 'locations', '[county]', '[town]'),
  path.join(targetDir, 'src', 'app', 'locations', '[county]', '[town]', '[service]'),
  path.join(targetDir, 'src', 'app', 'blog'),
  path.join(targetDir, 'src', 'app', 'blog', '[slug]'),
  path.join(targetDir, 'src', 'app', 'sitemap'),
  path.join(targetDir, 'src', 'app', 'sitemap.xml'),
  path.join(targetDir, 'src', 'app', 'robots.txt'),
  path.join(targetDir, 'src', 'app', 'llms.txt'),
];

dirs.forEach((d) => fs.mkdirSync(d, { recursive: true }));

// 2. package.json
const packageJson = {
  name: config.slug.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
  version: '1.0.0',
  private: true,
  scripts: {
    dev: 'next dev -p 3003',
    build: 'next build',
    start: 'next start',
    lint: 'next lint',
  },
  dependencies: {
    '@mediation/core': 'workspace:*',
    next: '^15.5.25',
    react: '^19.3.0',
    'react-dom': '^19.3.0',
  },
  devDependencies: {
    '@types/node': '^22.20.4',
    '@types/react': '^19.2.14',
    '@types/react-dom': '^19.2.3',
    autoprefixer: '^10.4.21',
    postcss: '^8.5.8',
    tailwindcss: '^3.4.17',
    typescript: '^5.7.3',
  },
};
fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(packageJson, null, 2));

// 3. next.config.ts
const nextConfig = `import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@mediation/core'],
};

export default nextConfig;
`;
fs.writeFileSync(path.join(targetDir, 'next.config.ts'), nextConfig);

// 4. tsconfig.json
const tsConfig = {
  compilerOptions: {
    target: 'ES2017',
    lib: ['dom', 'dom.iterable', 'esnext'],
    allowJs: true,
    skipLibCheck: true,
    strict: true,
    noEmit: true,
    esModuleInterop: true,
    module: 'esnext',
    moduleResolution: 'bundler',
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: 'preserve',
    incremental: true,
    plugins: [{ name: 'next' }],
    paths: { '@/*': ['./src/*'] },
  },
  include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
  exclude: ['node_modules'],
};
fs.writeFileSync(path.join(targetDir, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2));

// 5. postcss.config.js
fs.writeFileSync(
  path.join(targetDir, 'postcss.config.js'),
  `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`
);

// 6. tailwind.config.ts
const tailwindConfig = `import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/core/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '${config.primaryHex}',
          'primary-light': '${config.primaryLightHex}',
          accent: '${config.accentHex}',
          'accent-hover': '${config.accentHoverHex}',
          surface: '${config.surfaceBgHex}',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
`;
fs.writeFileSync(path.join(targetDir, 'tailwind.config.ts'), tailwindConfig);

// 7. src/config/brand.ts
const brandTs = `import { BrandConfig, ${config.countyData} } from '@mediation/core';

export const BRAND: BrandConfig = {
  brandId: '${config.slug}',
  brandName: '${config.name}',
  legalEntityName: '${config.name} Ltd',
  siteUrl: '${config.siteUrl}',
  domain: '${config.slug}.co.uk',
  tagline: 'Accredited Family Mediation & Fast MIAM Assessments',
  strapline: 'Resolving children arrangements and financial settlements calmly, affordably, and confidentially without painful court battles.',
  phone: '${config.phone}',
  formattedPhone: '${config.formattedPhone}',
  contactEmail: '${config.email}',
  primaryServiceArea: 'Regional Family Court Jurisdictions',
  fmcAccreditationText: 'Family Mediation Council (FMC) Accredited Practice',
  leadWebhookUrl: 'https://formsubmit.co/ajax/abdf15fb72b87ae3039219a094638be0',
  counties: ${config.countyData},
  theme: {
    primaryHex: '${config.primaryHex}',
    primaryLightHex: '${config.primaryLightHex}',
    accentHex: '${config.accentHex}',
    accentHoverHex: '${config.accentHoverHex}',
    surfaceBgHex: '${config.surfaceBgHex}',
    cardBorderHex: '#E2E8F0',
  },
};
`;
fs.writeFileSync(path.join(targetDir, 'src', 'config', 'brand.ts'), brandTs);

// 8. src/app/globals.css
const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply antialiased text-slate-900 bg-white;
  }
}
`;
fs.writeFileSync(path.join(targetDir, 'src', 'app', 'globals.css'), globalsCss);

// 9. src/app/layout.tsx
const layoutTsx = `import type { Metadata } from 'next';
import './globals.css';
import { BRAND } from '../config/brand';
import { Header, Footer, MobileStickyBar, generateLocalBusinessSchema } from '@mediation/core';

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: \`\${BRAND.brandName} | FMC-Accredited Family Mediation & MIAM Assessments\`,
    template: \`%s | \${BRAND.brandName}\`,
  },
  description: BRAND.strapline,
  authors: [{ name: BRAND.brandName }],
  creator: BRAND.brandName,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: BRAND.siteUrl,
    title: \`\${BRAND.brandName} | UK Family Mediation Practice\`,
    description: BRAND.strapline,
    siteName: BRAND.brandName,
    images: [{ url: '/images/hero-mediation.webp', width: 1200, height: 630, alt: BRAND.brandName }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const businessSchema = generateLocalBusinessSchema(BRAND);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          media="print"
          // @ts-ignore
          onLoad="this.media='all'"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans text-slate-800 bg-white antialiased pb-20 md:pb-0">
        <Header brand={BRAND} />
        <main className="flex-grow">{children}</main>
        <Footer brand={BRAND} />
        <MobileStickyBar brand={BRAND} />
      </body>
    </html>
  );
}
`;
fs.writeFileSync(path.join(targetDir, 'src', 'app', 'layout.tsx'), layoutTsx);

// 10. src/app/contact/page.tsx
const contactPageTsx = `import React from 'react';
import { Metadata } from 'next';
import { BRAND } from '../../config/brand';
import {
  Breadcrumbs,
  LeadIntakeForm,
  PhoneCallIcon,
  ShieldCheckIcon,
  CalendarClockIcon,
  ClockIcon,
  MailIcon,
  BuildingOfficeIcon,
} from '@mediation/core';

export const metadata: Metadata = {
  title: \`Contact & Book MIAM Assessment | \${BRAND.brandName}\`,
  description: \`Book your confidential MIAM assessment or inquire about family mediation with \${BRAND.brandName}. Appointments within 48 hours.\`,
};

export default function ContactPage() {
  const breadcrumbs = [{ label: 'Contact & Bookings', href: '/contact' }];

  return (
    <div className="w-full bg-white">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-slate-900 text-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block mb-2">
              Confidential Client Bookings
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Contact & Bookings
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Schedule your private Mediation Information & Assessment Meeting (MIAM) with an accredited practitioner. Consultations are confidential and available remotely or locally.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <LeadIntakeForm
                brandName={BRAND.brandName}
                phone={BRAND.phone}
                formattedPhone={BRAND.formattedPhone}
                buttonBgClass="bg-amber-600 hover:bg-amber-700 text-white"
              />
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Direct Contact Information</h2>
                <div className="space-y-4 text-sm text-slate-700">
                  <div className="flex items-center gap-3">
                    <PhoneCallIcon className="w-5 h-5 text-amber-600" />
                    <a href={\`tel:\${BRAND.phone}\`} className="font-semibold text-slate-900 hover:text-amber-600">
                      {BRAND.formattedPhone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MailIcon className="w-5 h-5 text-amber-600" />
                    <a href={\`mailto:\${BRAND.contactEmail}\`} className="text-slate-700 hover:text-amber-600">
                      {BRAND.contactEmail}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <ClockIcon className="w-5 h-5 text-amber-600" />
                    <span>Monday – Friday: 8:00 AM – 6:30 PM</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-3">Statutory Court Certificates</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Signed Form C100, Form A, and Form FM1 certificates for family court applications are issued within 24 to 48 hours following your individual MIAM assessment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
`;
fs.writeFileSync(path.join(targetDir, 'src', 'app', 'contact', 'page.tsx'), contactPageTsx);

// 11. public/.htaccess
const htaccess = `# LiteSpeed / Apache Production Web Server Configuration
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Strip .html extension
  RewriteCond %{THE_REQUEST} ^[A-Z]{3,}\s([^.]+)\.html [NC]
  RewriteRule ^ %1 [R=301,L]

  # Redirect non-trailing-slash directories
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_URI} !(.[a-zA-Z0-9]{1,5}|/)$
  RewriteRule ^(.*)$ $1/ [R=301,L]

  # Serve index.html for directories
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteCond %{REQUEST_FILENAME}/index.html -f
  RewriteRule ^(.*)$ $1/index.html [L]
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(html|txt)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
  </FilesMatch>
  <FilesMatch "\\.(js|css|webp|png|jpg|jpeg|svg|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>
`;
fs.writeFileSync(path.join(targetDir, 'public', '.htaccess'), htaccess);

console.log(`[SUCCESS] Scaffolded new site: ${config.name}`);
console.log(`Directory: ${targetDir}`);
console.log(`To install and test:`);
console.log(`  pnpm install`);
console.log(`  pnpm --filter ${packageJson.name} build\n`);
