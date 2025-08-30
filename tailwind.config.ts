import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        "british-green": {
          DEFAULT: "#004225",
          light: "#0F5132",
          dark: "#003319",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { 
            opacity: "0", 
            transform: "translateY(40px) scale(0.95)" 
          },
          to: { 
            opacity: "1", 
            transform: "translateY(0) scale(1)" 
          },
        },
        "fade-in-left": {
          from: { 
            opacity: "0", 
            transform: "translateX(-40px) scale(0.95)" 
          },
          to: { 
            opacity: "1", 
            transform: "translateX(0) scale(1)" 
          },
        },
        "fade-in-right": {
          from: { 
            opacity: "0", 
            transform: "translateX(40px) scale(0.95)" 
          },
          to: { 
            opacity: "1", 
            transform: "translateX(0) scale(1)" 
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "25%": { transform: "translateY(-10px) rotate(1deg)" },
          "50%": { transform: "translateY(-20px) rotate(0deg)" },
          "75%": { transform: "translateY(-10px) rotate(-1deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(0, 66, 37, 0.3)",
            transform: "scale(1)"
          },
          "50%": { 
            boxShadow: "0 0 40px rgba(0, 66, 37, 0.6)",
            transform: "scale(1.05)"
          },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "text-gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "morphing": {
          "0%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40%/50% 60% 30% 60%" },
          "100%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "rotate-3d": {
          "0%": { transform: "perspective(1000px) rotateY(0deg)" },
          "100%": { transform: "perspective(1000px) rotateY(360deg)" },
        },
        "bounce-in": {
          "0%": { 
            opacity: "0", 
            transform: "scale(0.3) translateY(-100px)" 
          },
          "50%": { 
            opacity: "1", 
            transform: "scale(1.05) translateY(10px)" 
          },
          "70%": { 
            transform: "scale(0.9) translateY(-5px)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "scale(1) translateY(0)" 
          },
        },
        "slide-in-from-top": {
          "0%": { 
            opacity: "0", 
            transform: "translateY(-100px)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0)" 
          },
        },
        "slide-in-from-bottom": {
          "0%": { 
            opacity: "0", 
            transform: "translateY(100px)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0)" 
          },
        },
        "scale-in": {
          "0%": { 
            opacity: "0", 
            transform: "scale(0.8)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "scale(1)" 
          },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.8s ease-in-out",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "fade-in-left": "fade-in-left 0.8s ease-out",
        "fade-in-right": "fade-in-right 0.8s ease-out",
        "float": "float 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "text-gradient": "text-gradient 4s ease infinite",
        "morphing": "morphing 8s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "rotate-3d": "rotate-3d 20s linear infinite",
        "bounce-in": "bounce-in 1s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.6s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.6s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        "wiggle": "wiggle 1s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-premium": "linear-gradient(135deg, #004225 0%, #0F5132 25%, #22C55E 50%, #0F5132 75%, #004225 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
