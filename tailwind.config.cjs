/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        'primary': 'rgb(3, 201, 215)',
        
      },
      backgroundColor: { 
        'blue-gray': '#eceff180'        
      }
    },
  },
  plugins: [],
}
