/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dura: {
          bg: '#F9F2EB',
          'bg-secondary': '#F1E4D8',
          card: '#FFF9F4',
          gold: '#B99A73',
          button: '#B89A75',
          'button-hover': '#96764F',
          text: '#30251F',
          muted: '#827166',
          border: '#E7D9CC',
          cream: '#FAF6F0',
          sand: '#EBDCCE',
          dark: '#211814',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(48, 37, 31, 0.05)',
        'card': '0 2px 12px rgba(184, 154, 117, 0.08)',
        'modal': '0 10px 40px -10px rgba(48, 37, 31, 0.15)',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
