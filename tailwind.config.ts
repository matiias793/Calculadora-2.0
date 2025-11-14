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
        // Paleta de colores principal
        primary: {
          DEFAULT: '#8BCF85',      // Verde primario
          hover: '#6BBF71',         // Verde secundario (hover)
          dark: '#3F8A4A',          // Verde oscuro
        },
        // Colores neutros
        neutral: {
          bg: '#F5FAF5',            // Fondo principal
          card: '#FFFFFF',           // Fondo de tarjetas
          soft: '#DDE6DD',          // Gris suave
          text: '#5F6F5F',          // Gris texto
        },
        // Color de acento
        accent: {
          DEFAULT: '#F7C66F',       // Amarillo pastel
        },
        // Mantener logoGreen para compatibilidad durante la transición
        logoGreen: '#8BCF85',
        logoGreenHover: '#6BBF71',
        logoGreenDisabled: '#A8C66C'
      },
    },
  },
  plugins: [],
};
export default config;
