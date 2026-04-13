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
          dark: '#0F1A12',
          forest: '#1B4332',
          primary: '#2D6A4F',
          mid: '#40916C',
          light: '#52B788',
          pale: '#B7E4C7',
          surface: '#D8F3DC',
          gold: '#B69121',
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
