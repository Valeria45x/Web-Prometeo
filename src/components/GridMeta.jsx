const META_STYLE = {
  fontFamily: "monospace",
  fontSize: 7,
  opacity: 0.35,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#c8c8c8",
  padding: "6px 10px",
  whiteSpace: "nowrap",
};

export default function GridMeta({ code = "PRO-001" }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderBottom: "1px solid #303030",
      }}
    >
      <div style={{ ...META_STYLE, borderRight: "1px solid #303030" }}>
        44.80° N / 41.69° E
      </div>
      <div style={{ ...META_STYLE, borderRight: "1px solid #303030" }}>
        {code}
      </div>
      <div style={{ ...META_STYLE, borderRight: "1px solid #303030" }}>
        ES — 2025
      </div>
      <div style={META_STYLE}>PROMETEO ®</div>
    </div>
  );
}
