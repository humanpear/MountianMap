/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'SUIT Variable',
          'SUIT',
          'Pretendard',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif'
        ],
        numeric: ['Geist', 'SUIT Variable', 'sans-serif']
      },
      colors: {
        mountain: {
          navy: '#002d4a',
          hero: '#06263a',
          red: '#e10f07',
          orange: '#f58600',
          green: '#237c18',
          ink: '#111111'
        }
      },
      boxShadow: {
        route: '0 4px 13px rgba(0, 0, 0, 0.13)',
        heroPanel: '0 12px 34px rgba(0, 0, 0, 0.26)'
      }
    }
  },
  plugins: []
};
