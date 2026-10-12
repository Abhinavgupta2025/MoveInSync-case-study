/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          50:  '#f5f7fa',
          100: '#e8ecf0',
          200: '#d1d9e0',
          300: '#a8b8c8',
          400: '#7a96ab',
          500: '#4f748e',
          600: '#3b5d76',
          700: '#2e4a5f',
          800: '#243a4a',
          900: '#1a2c38',
          950: '#0f1c24',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
