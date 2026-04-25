import { TH } from "../../constants";
import { Grid, GridCell } from "../system/Grid";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { EASE, DARK_GRID, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";

export default function SectionTransition({ light = false, splitColumn = 2 }) {
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const bg = light ? PAGE_LIGHT_BG : "#0a0a0a";
  const CT = `background ${EASE}, border-color ${EASE}`;
  const isCollapsedLayout = useMediaQuery("(max-width: 1024px)");

  if (isCollapsedLayout) {
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
        <GridCell style={{ transition: CT }} />
      </Grid>
    );
  }

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
        collapseSpanOnTablet
        collapseSpanOnMobile
        style={{
          borderRight: bd,
          transition: CT,
        }}
      />
      <GridCell
        span={4 - splitColumn}
        collapseSpanOnTablet
        collapseSpanOnMobile
      />
    </Grid>
  );
}
