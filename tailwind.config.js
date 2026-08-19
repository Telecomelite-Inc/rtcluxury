/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#0A2A22',
          900: '#0E3B31',
          800: '#124A3D',
          700: '#186051',
          600: '#1F7A65',
          500: '#2B9679',
        },
        gold: {
          300: '#F0DBA0',
          400: '#E9C874',
          500: '#C9A24A',
          600: '#B8912F',
          700: '#9C7A2E',
        },
        cream: {
          DEFAULT: '#F5F1E6',
          light: '#FAF8F2',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', '"Times New Roman"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 4px 24px -6px rgba(201, 162, 74, 0.45)',
      },
    },
  },
  plugins: [],
}
