export default function TagChip({
  tag,
  active = false,
  onClick,
  small = false,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "monospace",
        fontSize: small ? 6 : 7,
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        padding: small ? "2px 6px" : "4px 8px",
        border: active ? "1px solid #FF3C54" : "1px solid #303030",
        background: active ? "#FF3C54" : "transparent",
        color: active ? "#0A0A0A" : "#C8C8C8",
        cursor: onClick ? "pointer" : "default",
        display: "inline-block",
        lineHeight: 1.4,
        transition: "background 0.15s, color 0.15s, border-color 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {tag}
    </button>
  );
}
