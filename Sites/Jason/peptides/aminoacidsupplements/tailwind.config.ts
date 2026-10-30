import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        amino: {
          bg: '#fafafa',
          canvas: '#f4f4f6',
          surface: '#ffffff',
          surface2: '#f8f8fa',
          border: 'rgba(228, 228, 231, 0.85)',
          borderHover: '#4338ca',
          // Primary Brand: Bio-Indigo / Imperial Iris
          indigo: '#4338ca',
          indigoHover: '#3730a3',
          indigoDark: '#312e81',
          indigoLight: '#eef2ff',
          indigoMuted: '#c7d2fe',
          // Secondary Accent: Molten Terracotta / Bio-Copper
          copper: '#c2410c',
          copperHover: '#9a3412',
          copperDark: '#7c2d12',
          copperLight: '#fff7ed',
          copperBorder: '#fed7aa',
          // Tertiary Accent: Deep Royal Plum
          plum: '#6d28d9',
          plumLight: '#f3e8ff',
          plumDark: '#581c87',
          // High-contrast Neutrals (Strict WCAG AA/AAA)
          zinc950: '#09090b',
          zinc900: '#18181b',
          zinc800: '#27272a',
          zinc700: '#3f3f46',
          zinc600: '#52525b',
          zinc400: '#a1a1aa',
          zinc200: '#e4e4e7',
          zinc100: '#f4f4f5',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Plus Jakarta Sans', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'am-card': '0 1px 3px 0 rgba(24, 24, 27, 0.04), 0 1px 2px -1px rgba(24, 24, 27, 0.04)',
        'am-md': '0 4px 6px -1px rgba(24, 24, 27, 0.06), 0 2px 4px -2px rgba(24, 24, 27, 0.04)',
        'am-elevated': '0 12px 28px -4px rgba(67, 56, 202, 0.09), 0 6px 12px -4px rgba(67, 56, 202, 0.05)',
        'am-copper': '0 12px 28px -4px rgba(194, 65, 12, 0.12), 0 6px 12px -4px rgba(194, 65, 12, 0.06)',
        'am-pill': '0 2px 6px 0 rgba(67, 56, 202, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.4)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer-slide': 'shimmer 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
