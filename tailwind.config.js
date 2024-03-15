/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwind-scrollbar-hide')],
}
