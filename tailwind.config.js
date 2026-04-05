export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#ecebe7",
        line: "#1a1a1a",
        panel: "#f2f1ed",
        accent: "#d9ff3f"
      },
      fontSize: {
        hero: ["clamp(2.8rem, 6.8vw, 6.5rem)", { lineHeight: "0.95" }],
        display: ["clamp(2rem, 4.4vw, 4.8rem)", { lineHeight: "0.95" }]
      },
      maxWidth: {
        frame: "1600px"
      }
    }
  },
  plugins: []
};
