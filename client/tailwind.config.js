/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'rubik':['Rubik', 'sans-serif']
      },
      backgroundImage: {
        'login': "url('../public/assets/bg-login.svg')",
        'login-phone': "url('../public/assets/bg-login-phone.svg')",
        'wave': "url('../public/assets/asset-wave.svg')",
        'book-purple': "url('../public/assets/asset-book-purple.svg')",
        'book-green': "url('../public/assets/asset-book-green.svg')",
        'book-darkbrown': "url('../public/assets/asset-book-darkbrown.svg')",
        'book-pink': "url('../public/assets/asset-book-pink.svg')",
        'star': "url('../public/assets/asset-star.svg')",
      },
      colors: {
        'tosca': '#D9E5D6',
        'green': '#0B3C49',
        'purple': '#5E2BFF',
        'pink': '#FF1053'
      },
    },
  },
  plugins: [],
}
