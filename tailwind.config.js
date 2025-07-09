/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./services.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B8860B',
        secondary: '#1A1A1A'
      },
    },
  },
  plugins: [],
}