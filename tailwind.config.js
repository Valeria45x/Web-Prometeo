export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        // AES-256 scale — divisores de 256: unidad base 32px
        xs: "4px", // ×0.125
        "sm-grid": "12px", // ×0.375
        "md-grid": "24px", // ×0.75
        unit: "32px", // ×1 — unidad base AES-256
        "xl-grid": "48px", // ×1.5
        "2xl-grid": "64px", // ×2
        "4x": "128px", // ×4
        "8x": "256px", // ×8 — columna base digital
      },
      colors: {
        // Paleta sistema Prometeo
        "pro-red": "#FF3C54", // Rojo acento
        "pro-deep": "#5C1220", // Acento profundo
        "pro-gray": "#C8C8C8", // Gris medio
        "pro-structural": "#303030", // Bordes del grid
        "pro-bg": "#0A0A0A", // Fondo base
        // Aliases grid
        "grid-border": "#303030",
        "grid-accent": "#FF3C54",
      },
      fontFamily: {
        display: ['"Funnel Display"', "serif"],
        sans: ['"Funnel Sans"', "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(3rem, 9vw, 8rem)", { lineHeight: "0.88" }],
        display: ["clamp(2rem, 5vw, 5.5rem)", { lineHeight: "0.92" }],
      },
      maxWidth: {
        frame: "1600px",
      },
    },
  },
  plugins: [],
};
