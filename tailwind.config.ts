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
        veld: {
          dark: '#07090C',
          forest: '#13161E',
          primary: '#E8C766',
          mid: '#E0935C',
          light: '#E8C766',
          pale: '#C7CDD8',
          surface: '#F4F6FA',
          gold: '#E8C766',
        },
        neutral: {
          50: '#F8FAF9',
          900: '#1A1A2E',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
