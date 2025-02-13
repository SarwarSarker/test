/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        passionOne: ["Passion One", "cursive"],
        poppins: ["Poppins", "serif"],
        fontRem: ["REM", "serif"],
        lato: ["Lato", "serif"],
      },
      boxShadow: {
        custom: "0px 4px 7.8px 0px rgba(0, 0, 0, 0.25)",
        custom1: "0px 8px 8px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
