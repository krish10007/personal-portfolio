/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        accent:  '#c8f562',
        accent2: '#a8e040',
        card:    '#131316',
      },
    },
  },
  plugins: [],
}
