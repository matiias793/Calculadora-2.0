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
        logoGreen: '#22C55E',
        logoGreenHover: '#16A34A',
        logoGreenDisabled: '#86EFAC'
      },
    },
  },
  plugins: [],
};
export default config;
