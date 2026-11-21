import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme tokens — values live in globals.css (:root / .dark)
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        subtle: "rgb(var(--subtle) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          hover: "rgb(var(--accent-hover) / <alpha-value>)",
          fg: "rgb(var(--accent-fg) / <alpha-value>)",
        },
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "Menlo", "monospace"],
        display: ["var(--font-display)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
      },
      animation: {
        "fade-in": "fadeIn 200ms ease-in-out",
        "slide-up": "slideUp 250ms ease-out",
        "line-in": "lineIn 300ms ease-out forwards",
        blink: "blink 1s steps(2, start) infinite",
        rise: "rise 900ms cubic-bezier(0.22, 1, 0.36, 1) both",
        // backwards, not both: no transform lingers to trap position:fixed children
        "page-in": "pageIn 600ms cubic-bezier(0.22, 1, 0.36, 1) backwards",
        marquee: "marquee 40s linear infinite",
        "scroll-cue": "scrollCue 1.8s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        lineIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          to: { visibility: "hidden" },
        },
        // Line-by-line headline reveal: each line rises out of an overflow-hidden mask
        rise: {
          "0%": { transform: "translateY(105%)" },
          "100%": { transform: "translateY(0)" },
        },
        pageIn: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollCue: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "45%": { transform: "scaleY(1)", transformOrigin: "top" },
          "55%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
