import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#05070e",
        surface: "#0a101f",
        raised: "#0f1729",
        line: "rgba(148, 163, 184, 0.14)",
        ink: {
          DEFAULT: "#e7ecf5",
          muted: "#9aa7bd",
          faint: "#67748d",
        },
        electric: { DEFAULT: "#4f7cff", bright: "#6b93ff", deep: "#2b5beb" },
        violet: { DEFAULT: "#8b5cf6", bright: "#a78bfa", deep: "#6d3fe0" },
        fuchsia: { DEFAULT: "#c05bff" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 44px -10px rgba(79, 124, 255, 0.5)",
        "glow-violet": "0 0 48px -10px rgba(139, 92, 246, 0.55)",
        card: "inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 24px 48px -24px rgba(0, 0, 0, 0.6)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #4f7cff 0%, #8b5cf6 55%, #c05bff 100%)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 36s linear infinite",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        blink: "blink 1.1s step-end infinite",
        shimmer: "shimmer 3.2s linear infinite",
        "gradient-x": "gradient-x 9s ease infinite",
        "pulse-soft": "pulse-soft 6s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
