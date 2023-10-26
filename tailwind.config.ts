import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'store-pri': '#2563eb',
        'store-faded': '#6b7280',
        'store-faded-max': '#9ca3af',
        'store-outline-faded': '#d1d5db',
        'store-outline-faded-max': '#e5e7eb',
      }
    },
  },
  plugins: [],
}
export default config
