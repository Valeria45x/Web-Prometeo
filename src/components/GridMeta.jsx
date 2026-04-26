const META_STYLE = {
  fontFamily: "monospace",
  fontSize: 7,
  opacity: 0.35,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "currentColor",
  whiteSpace: "nowrap",
};

const CELL_STYLE = {
  padding: "6px 10px",
  borderRight: "1px solid #303030",
  display: "flex",
  alignItems: "center",
};

export default function GridMeta({ code = "PRO-000", light = false }) {
  const color = light ? "#0a0a0a" : "#e4e4e4";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        color,
      }}
    >
      <div style={{ ...META_STYLE, ...CELL_STYLE }}>44.80° N / 41.69° E</div>
      <div style={{ ...META_STYLE, ...CELL_STYLE }}>{code}</div>
      <div style={{ ...META_STYLE, ...CELL_STYLE }}>ES — 2025</div>
      <div style={{ ...META_STYLE, ...CELL_STYLE, borderRight: "none" }}>
        PROMETEO ®
      </div>
    </div>
  );
}
