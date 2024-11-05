import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-space-grotesk)'],
        satoshi: ['var(--font-satoshi)'],
        'satoshi-italic': ['var(--font-satoshi-italic)'],
      },
      colors: {
        foreground: {
          DEFAULT: '#faf7f2',
          100: '#47371b',
          200: '#8d6d37',
          300: '#c2a063',
          400: '#decbaa',
          500: '#faf7f2',
          600: '#faf8f3',
          700: '#fcfaf6',
          800: '#fdfbf9',
          900: '#fefdfc',
        },
        'cadet-gray': {
          DEFAULT: '#94a3b8',
          100: '#1b2028',
          200: '#354050',
          300: '#506077',
          400: '#6c819d',
          500: '#94a3b8',
          600: '#a9b5c6',
          700: '#bfc8d4',
          800: '#d4dae2',
          900: '#eaedf1',
        },
        viridian: {
          DEFAULT: '#4c8577',
          100: '#0f1b18',
          200: '#1f352f',
          300: '#2e5047',
          400: '#3d6a5f',
          500: '#4c8577',
          600: '#66a797',
          700: '#8cbdb1',
          800: '#b3d3cb',
          900: '#d9e9e5',
        },
        gunmetal: {
          DEFAULT: '#1b323b',
          100: '#050a0c',
          200: '#0b1418',
          300: '#101e24',
          400: '#162830',
          500: '#1b323b',
          600: '#366375',
          700: '#5194af',
          800: '#8bb8ca',
          900: '#c5dbe4',
        },
        bittersweet: {
          DEFAULT: '#ee6352',
          100: '#3a0c06',
          200: '#75180c',
          300: '#af2411',
          400: '#e83119',
          500: '#ee6352',
          600: '#f18476',
          700: '#f5a398',
          800: '#f8c2ba',
          900: '#fce0dd',
        },
        arylide: {
          DEFAULT: '#e7cc65',
          100: '#393009',
          200: '#735f12',
          300: '#ac8f1b',
          400: '#deba2b',
          500: '#e7cc65',
          600: '#ecd783',
          700: '#f1e1a2',
          800: '#f5ebc1',
          900: '#faf5e0',
        },
        persian: {
          DEFAULT: '#e1895d',
          100: '#35180a',
          200: '#6b3114',
          300: '#a0491d',
          400: '#d66127',
          500: '#e1895d',
          600: '#e7a07c',
          700: '#edb79d',
          800: '#f3cfbd',
          900: '#f9e7de',
        },
        'midnight-green': {
          DEFAULT: '#1b383a',
          100: '#060b0c',
          200: '#0b1718',
          300: '#112223',
          400: '#162e2f',
          500: '#1b383a',
          600: '#377075',
          700: '#52a8ae',
          800: '#8cc5c9',
          900: '#c5e2e4',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: {
          background: 'var(--background-color)',
          foreground: 'var(--foreground-color)',
          accent: 'var(--accent-color)',
        },
        test: {
          '1': 'var(--background-color)',
          '2': 'var(--foreground-color)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config

export default config
