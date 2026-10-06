import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#030712',
          900: '#040711',
          850: '#070D1E',
          800: '#0B132B',
          700: '#111D3B',
          600: '#1C2E59',
        },
        biotech: {
          cyan: '#00F2FE',
          blue: '#4FACFE',
          emerald: '#10B981',
          mint: '#34D399',
          amber: '#F59E0B',
          rose: '#F43F5E',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        'glow-cyan': '0 0 35px -5px rgba(0, 242, 254, 0.25)',
        'glow-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.25)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
