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
        logoGreen: '#60A5FA',
        logoGreenHover: '#3B82F6',
        logoGreenDisabled: '#93C5FD'
      },
    },
  },
  plugins: [],
};
export default config;
