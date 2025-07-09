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
        primary: '#B8860B', // Darker gold
        secondary: '#1A1A1A',
        accent: '#B8860B',
        light: '#F5F5F5',
        dark: '#1A1A1A',
        textColor: '#333333',
        textLight: '#666666',
        borderColor: '#DDDDDD',
        success: '#4CAF50',
        bgLight: '#F9F9F9',
        bgDark: '#1A1A1A',
      },
      fontFamily: {
        primary: ['Poppins', 'sans-serif'],
        secondary: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'custom': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'custom-hover': '0 8px 20px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'custom': '4px',
        'custom-sm': '2px',
        'custom-lg': '8px',
      },
    },
  },
  plugins: [],
}
