import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-dm-sans)", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        h1: ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.1" }],
        h2: ["clamp(1.875rem, 4vw, 3rem)", { lineHeight: "1.2" }],
        h3: ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.3" }],
        "body-lg": ["clamp(1.125rem, 2vw, 1.25rem)", { lineHeight: "1.6" }],
        body: ["clamp(1rem, 1.5vw, 1.125rem)", { lineHeight: "1.6" }],
        "body-sm": ["clamp(0.875rem, 1.2vw, 1rem)", { lineHeight: "1.5" }],
        caption: ["0.75rem", { lineHeight: "1.4" }],
      },
    },
  },
  plugins: [],
};
export default config;
