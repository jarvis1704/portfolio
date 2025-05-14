/// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */

const config = { 
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // For App Router
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        indigo: {
          50: '#f0f5ff', 100: '#e0eaff', 200: '#c8d9ff',
          300: '#a7c0ff', 400: '#82a2ff', 500: '#627eea',
          600: '#4a63e0', 700: '#394faf', 800: '#2e3f8c',
          900: '#263470',
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', // Tailwind has a default pulse, this is if you customize
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) { // Custom plugin for animation delays
      const newUtilities = {};
      const delays = [0, 75, 100, 150, 200, 300, 400, 500, 700, 1000];
      delays.forEach(delay => {
        newUtilities[`.animation-delay-${delay}`] = {
          'animation-delay': `${delay}ms`,
        };
      });
      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
};

// Use ES Module export default syntax
export default config;