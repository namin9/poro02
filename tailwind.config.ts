import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0ea5e9' // sky-500
        }
      }
    }
  },
  darkMode: 'class',
  plugins: []
} satisfies Config
