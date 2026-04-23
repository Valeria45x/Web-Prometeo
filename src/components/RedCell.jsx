import { COLORS } from "../design/tokens";

export default function RedCell({ text, style = {} }) {
  return (
    <div
      style={{
        background: COLORS.accent,
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
            color: COLORS.textOnLight,
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
}
