import { COLORS } from "../design/tokens";

const META_STYLE = {
  fontFamily: "monospace",
  fontSize: 7,
  opacity: 0.35,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: COLORS.textOnDark,
  padding: "6px 10px",
  whiteSpace: "nowrap",
};

export default function GridMeta({ code = "PRO-001" }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderBottom: `1px solid ${COLORS.grid}`,
      }}
    >
      <div style={{ ...META_STYLE, borderRight: `1px solid ${COLORS.grid}` }}>
        44.80° N / 41.69° E
      </div>
      <div style={{ ...META_STYLE, borderRight: `1px solid ${COLORS.grid}` }}>
        {code}
      </div>
      <div style={{ ...META_STYLE, borderRight: `1px solid ${COLORS.grid}` }}>
        ES — 2025
      </div>
      <div style={META_STYLE}>PROMETEO ®</div>
    </div>
  );
}
