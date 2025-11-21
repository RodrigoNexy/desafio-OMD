/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007bff',
          50: '#e6f2ff',
          100: '#b3d9ff',
          200: '#80bfff',
          300: '#4da6ff',
          400: '#1a8cff',
          500: '#007bff',
          600: '#0066cc',
          700: '#0052a3',
          800: '#003d7a',
          900: '#002952',
        },
        secondary: '#6c757d',
        danger: '#dc3545',
        success: '#28a745',
        warning: '#ffc107',
        info: '#17a2b8',
      },
    },
  },
  plugins: [],
}
