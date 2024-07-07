import type { Config } from "tailwindcss"

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
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
            backgroundImage: {
                "title-gradient":
                    "linear-gradient(31deg, rgb(0, 0, 0) 0%, hsl(var(--primary)) 100%)",
                "hero-radial-gradient":
                    "radial-gradient(102.4% 100% at 75.5% -5.1%, rgb(124, 58, 237) .9009009009009009%, rgb(124,153,255) 34.08291103603604%, rgb(124,194,255) 54.82650619369369%, rgb(255,255,255) 100%)",
                "dark-hero-radial-gradient":
                    "radial-gradient(102.4% 100% at 75.5% -5.1%, rgb(124, 58, 237) .9009009009009009%, rgb(124,153,255) 34.08291103603604%, rgb(124,194,255) 54.82650619369369%, rgb(0,0,0) 100%)",
                "hero-patterns-gradient": `
          radial-gradient(circle at center center, rgb(0, 0, 0), rgba(33, 222, 222, 0)),
          repeating-radial-gradient(circle at center center, rgb(0, 0, 0), rgb(0, 0, 0) 70px, transparent 140px, transparent 70px)
        `,
            },
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
                marquee: {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(calc(-100% - var(--gap)))" },
                },
                "marquee-vertical": {
                    from: { transform: "translateY(0)" },
                    to: { transform: "translateY(calc(-100% - var(--gap)))" },
                },
                gradient: {
                    to: {
                        backgroundPosition: "var(--bg-size) 0",
                    },
                },
                fadeOut: {
                    "0%": { opacity: "1" },
                    "100%": { opacity: "0", display: "none" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                marquee: "marquee var(--duration) linear infinite",
                "marquee-vertical":
                    "marquee-vertical var(--duration) linear infinite",
                gradient: "gradient 8s linear infinite",
                "fade-out": "fadeOut 2s ease-in-out forwards",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
