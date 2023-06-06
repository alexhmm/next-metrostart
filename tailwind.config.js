/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      containers: {
        '8xl': '96rem',
        '9xl': '112rem',
        '10xl': '128rem',
        '11xl': '160rem',
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
};
