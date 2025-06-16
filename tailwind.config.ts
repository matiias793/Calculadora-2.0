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
        logoGreen: '#8CBF43',
        logoGreenHover: '#7AA73C',
        logoGreenDisabled: '#B5D89C'
      },
    },
  },
  plugins: [],
};
export default config;
