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
        'apple-store-pri': '#2563eb',
        'apple-store-faded': '#6b7280',
        'apple-store-faded-max': '#9ca3af',
        'apple-store-outline-faded': '#d1d5db',
        'apple-store-outline-faded-max': '#e5e7eb',
      }
    },
  },
  plugins: [],
}
export default config
