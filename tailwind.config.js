const scrollbar = require('tailwind-scrollbar');

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [scrollbar],
};
