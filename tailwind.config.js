export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rojo:     "#FF4545",
        amarillo: "#F2CD5C",
        crema:    "#FEFFE3",
        negro:    "#212121",
        line:     "#212121",
        bg:       "#FEFFE3",
        "bg-dark":"#212121",
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
