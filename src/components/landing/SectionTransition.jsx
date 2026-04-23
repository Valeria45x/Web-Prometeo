import { TH } from "../../constants";
import { Grid, GridCell } from "../system/Grid";
import { EASE, DARK_GRID, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";

export default function SectionTransition({ light = false, splitColumn = 2 }) {
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const bg = light ? PAGE_LIGHT_BG : "#0a0a0a";
  const CT = `background ${EASE}, border-color ${EASE}`;

  return (
    <Grid
      as="section"
      columns="site"
      aria-hidden="true"
      style={{
        height: TH,
        background: bg,
        borderTop: bd,
        borderLeft: bd,
        transition: CT,
      }}
    >
      <GridCell
        span={splitColumn}
        style={{
          borderRight: bd,
          transition: CT,
        }}
      />
      <GridCell span={4 - splitColumn} />
    </Grid>
  );
}
