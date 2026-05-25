import { TH } from "../../constants";
import { COLORS } from "../../design/tokens";
import { Grid, GridCell } from "../system/Grid";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { EASE, DARK_GRID, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";

export default function SectionTransition({ light = false, splitColumn = 2 }) {
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const bg = light ? PAGE_LIGHT_BG : "#050505";
  const lineColor = light ? COLORS.gridLight : COLORS.grid;
  const CT = `background-color ${EASE}`;
  const isCollapsedLayout = useMediaQuery("(max-width: 1024px)");
  const collapsedDividerPosition = splitColumn === 3 ? "75%" : "50%";

  if (isCollapsedLayout) {
    return (
      <Grid
        as="section"
        columns="site"
        aria-hidden="true"
        style={{
          height: TH,
          backgroundColor: bg,
          backgroundImage: `linear-gradient(to right, transparent calc(${collapsedDividerPosition} - 0.5px), ${lineColor} calc(${collapsedDividerPosition} - 0.5px), ${lineColor} calc(${collapsedDividerPosition} + 0.5px), transparent calc(${collapsedDividerPosition} + 0.5px))`,
          backgroundRepeat: "no-repeat",
          borderTop: bd,
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
        backgroundColor: bg,
        borderTop: bd,
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
