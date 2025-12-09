/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './services/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff0f3',
          100: '#ffc2d1',
          200: '#ff8fa3',
          300: '#ff4d6d',
          400: '#c9184a',
          500: '#a4133c',
          600: '#800f2f',
          700: '#590d22',
          800: '#2b070f',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Nunito Sans"', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
