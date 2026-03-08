/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{tsx,ts,jsx,js}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#efeee6',
        dark: '#160026',
        accent: '#92004a',
        pink: '#9f004a',
      },
      fontFamily: {
        display: ['Degular Display', 'sans-serif'],
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
