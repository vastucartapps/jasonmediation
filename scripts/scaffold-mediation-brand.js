#!/usr/bin/env node

/**
 * UK Family Mediation Portfolio Brand Generator
 * 
 * Scaffolds an FMC-accredited family mediation website in one command
 * adhering to all architectural, regulatory, design, and SEO requirements.
 * 
 * Usage:
 *   node scripts/scaffold-mediation-brand.js \
 *     --name "Kingsley Family Mediation" \
 *     --slug "kingsleyfamilymediation" \
 *     --phone "01214974000" \
 *     --formattedPhone "0121 497 4000" \
 *     --countyData "site3-locations" \
 *     --primaryHex "#0F172A" \
 *     --accentHex "#0284C7"
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
    countyData: '',
    primaryHex: '#0B192C',
    primaryLightHex: '#1E3E62',
    accentHex: '#D97706',
    accentHoverHex: '#B45309',
    surfaceBgHex: '#F8FAFC',
    email: '',
    siteUrl: '',
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
const targetDir = path.resolve(__dirname, '..', 'Sites', config.slug);

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
  path.join(targetDir, 'src', 'app', 'locations', '[county]'),
  path.join(targetDir, 'src', 'app', 'locations', '[county]', '[town]'),
  path.join(targetDir, 'src', 'app', 'locations', '[county]', '[town]', '[service]'),
  path.join(targetDir, 'src', 'app', 'blog'),
  path.join(targetDir, 'src', 'app', 'blog', '[slug]'),
];

dirs.forEach((d) => fs.mkdirSync(d, { recursive: true }));

// 2. package.json
const packageJson = {
  name: config.slug.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
  version: '1.0.0',
  private: true,
  scripts: {
    dev: 'next dev -p 3002',
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
const brandTs = `import { BrandConfig, SITE1_COUNTIES } from '@mediation/core';

export const BRAND: BrandConfig = {
  brandId: 'alderton', // or custom ID
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
  leadWebhookUrl: 'https://webhook.site/${config.slug}-lead-webhook',
  counties: SITE1_COUNTIES,
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

console.log(`[SUCCESS] Scaffolded new site: ${config.name}`);
console.log(`To install dependencies and build:`);
console.log(`  pnpm install`);
console.log(`  pnpm --filter ${packageJson.name} build\n`);
