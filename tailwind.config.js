/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        glass: {
          light: 'rgba(255,255,255,0.7)',
          dark: 'rgba(17,24,39,0.7)',
        },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.06)',
        'glass-lg': '0 16px 48px rgba(0,0,0,0.08)',
        'glow': '0 0 20px rgba(34,197,94,0.15)',
        'glow-lg': '0 0 40px rgba(34,197,94,0.25)',
        'soft': '0 2px 8px rgba(0,0,0,0.04)',
        'soft-lg': '0 4px 24px rgba(0,0,0,0.06)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'count-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-12px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s ease-in-out infinite',
        'count-up': 'count-up 0.5s ease-out forwards',
        'slide-down': 'slide-down 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
      backgroundImage: {
        'shimmer-light':
          'linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 40%, #f3f4f6 80%)',
        'shimmer-dark':
          'linear-gradient(90deg, #1f2937 0%, #374151 40%, #1f2937 80%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      },
    },
  },
  plugins: [],
}
