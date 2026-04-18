import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9B4A5B',
          light: '#D4A5A5',
          dark: '#7A3A49',
        },
        secondary: '#F5F0E8',
        accent: '#C9A962',
        background: '#FEFEFA',
        'text-primary': '#2D2D2D',
        'text-secondary': '#6B6B6B',
        success: '#5B8A6B',
        error: '#C45B5B',
        border: '#E5E5E5',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
    },
  },
  plugins: [],
}
export default config