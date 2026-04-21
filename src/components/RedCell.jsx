export default function RedCell({ text, style = {} }) {
  return (
    <div
      style={{
        background: "#FF3C54",
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
            letterSpacing: "0.1em",
            color: "#0A0A0A",
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
}
