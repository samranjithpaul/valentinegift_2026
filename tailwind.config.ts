import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "heart-bloom": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "60%": { transform: "scale(1.35)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "wobble-in": {
          "0%": { transform: "rotate(-4deg) scale(0.88)", opacity: "0" },
          "60%": { transform: "rotate(2.5deg) scale(1.03)", opacity: "1" },
          "100%": { transform: "rotate(0deg) scale(1)", opacity: "1" },
        },
        "gentle-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-8px) rotate(1.5deg)" },
          "66%": { transform: "translateY(-4px) rotate(-1deg)" },
        },
        "float2": {
          "0%, 100%": { transform: "translateY(0px) rotate(-2deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
        "twinkle": {
          "0%, 100%": { opacity: "0.15", transform: "scale(0.7)" },
          "50%": { opacity: "1", transform: "scale(1.3)" },
        },
        "confetti-fall": {
          "0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(70px) rotate(360deg)", opacity: "0" },
        },
        "star-drift": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.9" },
          "100%": { transform: "translateY(-100vh) scale(0.5)", opacity: "0" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "count-up": {
          from: { transform: "scale(0.8) translateY(10px)", opacity: "0" },
          to: { transform: "scale(1) translateY(0)", opacity: "1" },
        },
        "glitch": {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 1px)" },
          "40%": { transform: "translate(2px, -1px)" },
          "60%": { transform: "translate(-1px, 2px)" },
          "80%": { transform: "translate(1px, -1px)" },
        },
        "light-particle": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.8" },
          "100%": { transform: "translateY(-120px) scale(0)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.65s ease-out forwards",
        "heart-bloom": "heart-bloom 0.55s ease-out forwards",
        "wobble-in": "wobble-in 0.55s ease-out forwards",
        "gentle-pulse": "gentle-pulse 3s ease-in-out infinite",
        "blink": "blink 1s step-end infinite",
        "float": "float 4s ease-in-out infinite",
        "float2": "float2 5s ease-in-out infinite",
        "twinkle": "twinkle 2.5s ease-in-out infinite",
        "confetti-fall": "confetti-fall 1.2s ease-out forwards",
        "star-drift": "star-drift 3s ease-out forwards",
        "marquee": "marquee 22s linear infinite",
        "glitch": "glitch 0.5s steps(1) 1",
        "light-particle": "light-particle 2s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
