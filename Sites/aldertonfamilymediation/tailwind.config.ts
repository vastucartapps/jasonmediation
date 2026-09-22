import type { Config } from 'tailwindcss';

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
        alderton: {
          50: '#f0f5fa',
          100: '#e1ebf5',
          200: '#c5d8ec',
          300: '#99bde0',
          400: '#679cd0',
          500: '#437ec0',
          600: '#3064a4',
          700: '#275085',
          800: '#1e3e62',
          900: '#0b192c',
          950: '#060f1c',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card-soft': '0 10px 30px -10px rgba(11, 25, 44, 0.08)',
        'card-hover': '0 20px 40px -15px rgba(11, 25, 44, 0.16)',
        'badge-glow': '0 0 20px rgba(217, 119, 6, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
