/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryRed: "#d21c27",
        primaryText: "#331a0b",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        playfair: ["var(--font-playfair)", "sans-serif"],
        tannimbus: ["tannimbus"],
      },
    },
  },
  plugins: [],
};
