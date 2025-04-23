const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // sans: ["var(--font-sans)", ...fontFamily.sans],
        sans: ['Greycliff CF', ...fontFamily.sans], // Use font family name defined in @font-face
      },
      colors: {
        // Custom Maitai Brand Colors from blueprint
        'maitai-lagoon': '#255D70',
        'maitai-lime': '#21B892',
        'maitai-mint-cream': '#F2FBF9', // Renamed from MintCream for consistency
        'maitai-vampire-black': '#090F0D',
        'maitai-pineapple': '#FFDB6A',
        'maitai-rum': '#EA5F40',
        // shadcn/ui theme variables
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Maitai Custom Colors
        maitai: {
          lagoon: "hsl(var(--maitai-lagoon))", // #255D70
          lime: "hsl(var(--maitai-lime))",     // #21B892
          mint: "hsl(var(--maitai-mint-cream))",// #F2FBF9 (adjusted name)
          black: "hsl(var(--maitai-vampire-black))", // #090F0D (adjusted name)
          pineapple: "hsl(var(--maitai-pineapple))", // #FFDB6A
          rum: "hsl(var(--maitai-rum))",         // #EA5F40
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 40s linear infinite", // Adjust duration as needed
      },
      // Safelist placeholder - will add specific classes later if needed for header scroll
      // safelist: [], 
      boxShadow: {
        // Add custom shadows if needed, e.g., for header scroll state
        header: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} 