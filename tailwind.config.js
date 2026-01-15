/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff00',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 255, 0, 0.5), 0 0 40px rgba(0, 255, 0, 0.3)',
        'neon-lg': '0 0 30px rgba(0, 255, 0, 0.6), 0 0 60px rgba(0, 255, 0, 0.4)',
      },
    },
  },
  plugins: [],
};

