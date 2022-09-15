/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
          'square-peg': ['Square Peg', 'cursive'],
          'inter': ['Inter', 'sans-serif'],
    },textShadow: {
      '2xl': '1px 1px 5px rgb(33 34 43 / 20%)',
      '3xl': '0 0 3px rgba(0, 0, 0, .8), 0 0 5px rgba(0, 0, 0, .9)',
    },
},
  },
  plugins: [require('tailwindcss-textshadow')],
}
