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
        rojo: "#ff0a54",
        amarillo: "#d9d9d6",
        crema: "#d9d9d6",
        negro: "#050505",
        line: "#380615",
        bg: "#d9d9d6",
        "bg-dark": "#050505",
        "grid-border": "#380615",
        "grid-accent": "#ff0a54",
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
