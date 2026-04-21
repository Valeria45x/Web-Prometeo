export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        'xs':      '4px',
        'sm-grid': '12px',
        'md-grid': '24px',
        'lg-grid': '36px',
        'xl-grid': '48px',
        '2xl-grid':'64px',
      },
      colors: {
        rojo:         "#FF4545",
        amarillo:     "#F2CD5C",
        crema:        "#FEFFE3",
        negro:        "#212121",
        line:         "#212121",
        bg:           "#FEFFE3",
        "bg-dark":    "#212121",
        "grid-border":"#303030",
        "grid-accent":"#FF3C54",
      },
      fontFamily: {
        display: ['"Funnel Display"', "serif"],
        sans:    ['"Funnel Sans"', "sans-serif"],
      },
      fontSize: {
        hero:    ["clamp(3rem, 9vw, 8rem)",   { lineHeight: "0.88" }],
        display: ["clamp(2rem, 5vw, 5.5rem)", { lineHeight: "0.92" }],
      },
      maxWidth: {
        frame: "1600px",
      },
    },
  },
  plugins: [],
};
