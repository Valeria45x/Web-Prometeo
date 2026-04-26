export default function RedCell({ text, style = {} }) {
  return (
    <div
      style={{
        background: "#FF3C54",
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {text && (
        <span
          style={{
            writingMode: "vertical-rl",
            fontFamily: "monospace",
            fontSize: 7,
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#0A0A0A",
            letterSpacing: "0.08em",
            userSelect: "none",
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
}
