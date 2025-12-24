import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    // Ini pola yang harus Anda gunakan untuk memastikan Vercel memindai folder src/
    './src/**/*.{js,ts,jsx,tsx,mdx}', 
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
