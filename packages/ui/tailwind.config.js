/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        accent: ["var(--font-accent)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        switzer: ["var(--font-switzer)", "sans-serif"],
        switzerItalic: ["var(--font-switzer-italic)", "sans-serif"],
      },
      letterSpacing: {
        reduced: "-3%",
        expanded: "5%",
      },
      colors: {
        primary: {
          background: "var(--background-color)",
          foreground: "var(--foreground-color)",
          accent: "var(--accent-color)",
        },
      },
    },
  },
  plugins: [],
};
