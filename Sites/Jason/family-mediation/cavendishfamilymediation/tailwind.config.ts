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
        cavendish: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        champagne: {
          50: '#faf8f5',
          100: '#f4efe8',
          200: '#e8ddcd',
          300: '#d8c4ab',
          400: '#c5a880',
          500: '#b89462',
          600: '#aa8254',
          700: '#8e6b45',
          800: '#73573c',
          900: '#5f4833',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card-soft': '0 10px 30px -10px rgba(6, 78, 59, 0.08)',
        'card-hover': '0 20px 40px -15px rgba(6, 78, 59, 0.16)',
        'badge-glow': '0 0 20px rgba(184, 148, 98, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
