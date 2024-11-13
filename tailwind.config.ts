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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "secondary-black": "#010100",
        "blur-black": "#030303",
        "form-input": "#FAFAFA",
        "form-input-text": "#ABABAB",
        button: "#F6CA6A"
      },
      fontFamily: {
        montserrat: "'Montserrat', sans-serif",
        poppins: "'Poppins', sans-serif"
      }
    },
  },
  plugins: [],
};
export default config;
