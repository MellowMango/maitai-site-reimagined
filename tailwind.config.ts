import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add Greycliff CF, falling back to sans-serif
        greycliff: ['var(--font-greycliff)', 'sans-serif'],
      },
      colors: {
        // Core Brand Colors
        'maitai-lagoon': '#255D70', // Primary Lagoon
        'maitai-lime': '#21B892',   // Primary Lime
        'maitai-mint-cream': '#F2FBF9', // Primary Mint Cream (Light Background)
        'maitai-vampire-black': '#090F0D', // Primary Vampire Black (Dark Text/Background)
        // Secondary Brand Colors (Accents)
        'maitai-pineapple': '#FFDB6A', // Secondary Pineapple
        'maitai-marnier': '#FFA658',   // Secondary Marnier
        'maitai-rum': '#EA5F40',     // Secondary Rum (Accent/CTA)
        // Additional colors (optional, add if needed)
        // ... add colors from 'Additional Colors' section if required
        // Base Tailwind colors can still be used alongside these
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // Add Brand Gradients if needed (using CSS variables or direct values)
        // Example:
        // 'maitai-gradient-a': 'linear-gradient(to right, #250f0a 0%, #4c1f15 10%, ... , #fcece8 99%)', 
      },
      // Add typography scale from guidelines if desired (can also be applied via global CSS or utility classes)
      fontSize: {
        'display': ['4rem', { lineHeight: '1.25', letterSpacing: '0.025em' }], // 64px
        'h1': ['2.5rem', { lineHeight: '1.25', letterSpacing: '0em' }],     // 40px
        'h2': ['1.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],    // 28px
        'h3': ['1.5rem', { lineHeight: '1.25', letterSpacing: '0em' }],     // 24px
        'body': ['1.25rem', { lineHeight: '1.5', letterSpacing: '0em' }],    // 20px
        'body-2': ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.025em' }], // 18px
        'overline': ['1rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],   // 16px
      },
    },
  },
  plugins: [],
};
export default config;
