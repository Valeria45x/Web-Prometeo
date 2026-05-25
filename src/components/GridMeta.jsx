const META_STYLE = {
  fontFamily: "monospace",
  fontSize: 8,
  lineHeight: "16px",
  opacity: 0.35,
  letterSpacing: "0.08em",
  color: "currentColor",
  whiteSpace: "nowrap",
};

const CELL_STYLE = {
  minHeight: 32,
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
};

export default function GridMeta({ code = "PRO-000", light = false }) {
  const color = light ? "#050505" : "#d9d9d6";
  const borderRight = light ? "1px solid #050505" : "1px solid #d9d9d6";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 0,
        color,
      }}
    >
      <div style={{ ...META_STYLE, ...CELL_STYLE, borderRight }}>44.80° N / 41.69° E</div>
      <div style={{ ...META_STYLE, ...CELL_STYLE, borderRight }}>{code}</div>
      <div style={{ ...META_STYLE, ...CELL_STYLE, borderRight }}>ES — 2025</div>
      <div style={{ ...META_STYLE, ...CELL_STYLE, borderRight: "none" }}>
        PROMETEO ®
      </div>
    </div>
  );
}
