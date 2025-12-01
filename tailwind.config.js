/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Tech Theme - Azul ao invés de verde
        background: '#0d0d0d',
        foreground: '#f5f5f5',
        surface: '#151515',
        'surface-muted': '#111111',
        'surface-hover': '#1c1c1c',
        'surface-elevated': '#1f1f1f',
        'text-primary': '#f5f5f5',
        'text-secondary': '#b0b0b0',
        'text-muted': '#8a8a8a',
        'border-subtle': 'rgba(255, 255, 255, 0.03)',
        border: 'rgba(255, 255, 255, 0.08)',
        'border-strong': 'rgba(255, 255, 255, 0.16)',

        // Accent Azul (substituindo o verde)
        accent: {
          DEFAULT: '#00d4ff', // Azul neon principal
          soft: '#4de3ff',    // Azul mais claro
          strong: '#00b8e6',  // Azul mais escuro
        },

        // Cores para badges e status
        primary: {
          DEFAULT: '#00d4ff',
          50: '#e6f9ff',
          100: '#b3f0ff',
          200: '#80e7ff',
          300: '#4de3ff',
          400: '#1ad9ff',
          500: '#00d4ff',
          600: '#00b8e6',
          700: '#0099cc',
          800: '#007ab3',
          900: '#005c99',
        },
        secondary: '#6c757d',
        danger: '#dc3545',
        success: '#00d4ff', // Usando azul para success também
        warning: '#ffc107',
        info: '#17a2b8',
      },
      boxShadow: {
        'accent-soft': '0 24px 80px rgba(0, 212, 255, 0.08)',
        'accent-medium': '0 18px 40px rgba(0, 212, 255, 0.2)',
        'accent-strong': '0 26px 60px rgba(0, 212, 255, 0.28)',
        'dark': '0 24px 60px rgba(0, 0, 0, 0.45), 0 6px 18px rgba(0, 212, 255, 0.08)',
        'dark-xl': '0 40px 120px rgba(0, 0, 0, 0.65), 0 12px 36px rgba(0, 212, 255, 0.12)',
      },
    },
  },
  plugins: [],
}
