/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*.jsx",
    "./src/components/*.jsx",
    "./src/components/*/*.jsx",
    "./src/pages/*/*.jsx",
    "./src/pages/*/*/*.jsx"
  ],
  theme: {
    screens: {
      'xs': '450px',
      'sm': '640px',
      'md': '769px',
      'lg': '1025px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      fontFamily:{
        poppins: "'Poppins', sans-serif"
      },
      aspectRatio:{
        '9/16': '9 / 13.48',
        '16/9' : '16 / 9',
        '1/1' : '1 / 1 '
      }
    },
  },
  plugins: [],
}

