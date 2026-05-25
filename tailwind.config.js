export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        xs: "4px",
        "sm-grid": "12px",
        "md-grid": "24px",
        "lg-grid": "36px",
        "xl-grid": "48px",
        "2xl-grid": "64px",
      },
      colors: {
        "gris-casi-blanco": "#fcfcfc",
        "gris-claro": "#d9d9d6",
        "gris-oscuro": "#050505",
        "rojo-prometeo": "#ff0b3a",
        rojo: "#ff0b3a",
        line: "#050505",
        bg: "#fcfcfc",
        "bg-dark": "#050505",
        "grid-border": "#050505",
        "grid-accent": "#ff0b3a",
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
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
