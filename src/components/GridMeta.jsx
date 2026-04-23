import { COLORS } from "../design/tokens";
import { Grid, GridCell } from "./system/Grid";

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
    <Grid
      columns="site"
      style={{
        borderBottom: `1px solid ${COLORS.grid}`,
      }}
    >
      <GridCell
        style={{ ...META_STYLE, borderRight: `1px solid ${COLORS.grid}` }}
      >
        44.80Â° N / 41.69Â° E
      </GridCell>
      <GridCell
        style={{ ...META_STYLE, borderRight: `1px solid ${COLORS.grid}` }}
      >
        {code}
      </GridCell>
      <GridCell
        style={{ ...META_STYLE, borderRight: `1px solid ${COLORS.grid}` }}
      >
        ES â€” 2025
      </GridCell>
      <GridCell style={META_STYLE}>PROMETEO Â®</GridCell>
    </Grid>
  );
}
