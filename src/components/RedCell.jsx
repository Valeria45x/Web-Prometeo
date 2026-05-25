export default function RedCell({ text, style = {} }) {
  return (
    <div
      className="ds-grid-cell--red-signature"
      style={{
        background: "#ff0b3a",
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
            fontSize: 8,
            lineHeight: "16px",
            fontWeight: 700,
            color: "#050505",
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
