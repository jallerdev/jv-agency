import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        primary: {
          DEFAULT: "#985C3E",
          dark: "#6E4128",
        },
        secondary: "#B08968",
        accent: "#C0763B",
        surface: "#FAF6F1",
        background: "#F4EDE4",
        ink: {
          DEFAULT: "#2B2420",
          soft: "#6B5E54",
        },
        line: "#E4D8CB",
        success: "#4F7A52",
        warning: "#B57E2C",
        danger: "#B0453C",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(43, 36, 32, 0.08), 0 8px 24px -8px rgba(43, 36, 32, 0.12)",
        lift: "0 12px 40px -12px rgba(110, 65, 40, 0.28)",
        glow: "0 0 0 1px rgba(192, 118, 59, 0.25), 0 16px 48px -16px rgba(192, 118, 59, 0.45)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.7s cubic-bezier(0.4,0,0.2,1) both",
        "fade-in-down": "fade-in-down 0.5s cubic-bezier(0.4,0,0.2,1) both",
        shimmer: "shimmer 6s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
