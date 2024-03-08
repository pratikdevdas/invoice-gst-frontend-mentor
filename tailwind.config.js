/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwind-scrollbar-hide')],
}
