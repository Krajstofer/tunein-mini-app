import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fbfbf7",
          100: "#f1f0ea",
          200: "#e7e3cb",
          300: "#d9d2af",
          400: "#c0b387",
          500: "#a39362",
          600: "#937b4c",
          700: "#5c492d",
          800: "#352a1d",
          900: "#231c15",
          950: "#110c09",
        },
      },
    },
  },
  plugins: [],
};
export default config;
