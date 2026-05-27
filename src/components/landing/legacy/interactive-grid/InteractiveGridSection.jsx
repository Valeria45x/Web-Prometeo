import { COLORS } from "../../../../design/tokens";
import { GRID_SYSTEM_COPY } from "../../../../design/gridSystem";
import { useInteractiveGridMotion } from "../../../../hooks/useInteractiveGridMotion";
import GridMeta from "../../../GridMeta";
import { DARK_GRID, EASE, LIGHT_GRID, PAGE_LIGHT_BG } from "../../shared/theme";
import InteractiveGridIntro from "./InteractiveGridIntro";
import InteractiveGridVisual from "./InteractiveGridVisual";
import "./interactiveGrid.css";

function getPalette(light) {
  return {
    bg: light ? PAGE_LIGHT_BG : COLORS.canvasDark,
    border: light ? LIGHT_GRID : DARK_GRID,
    title: light ? COLORS.textOnLight : COLORS.textOnDark,
    body: light ? COLORS.textMutedLight : COLORS.textMutedDark,
    panel: light ? "rgba(5, 5, 5, 0.035)" : "rgba(217, 217, 214, 0.035)",
    gridTint: light ? "rgba(56, 6, 21, 0.24)" : "rgba(217, 217, 214, 0.13)",
  };
}

export default function InteractiveGridSection({ light }) {
  const sectionRef = useInteractiveGridMotion();
  const palette = getPalette(light);

  return (
    <section
      ref={sectionRef}
      className="interactive-grid"
      style={{
        "--interactive-bg": palette.bg,
        "--interactive-border": palette.border,
        "--interactive-title": palette.title,
        "--interactive-body": palette.body,
        "--interactive-panel": palette.panel,
        "--interactive-grid-tint": palette.gridTint,
        "--interactive-structure": light ? COLORS.gridLight : COLORS.grid,
        "--interactive-transition": EASE,
      }}
    >
      <GridMeta code={GRID_SYSTEM_COPY.code} light={light} />

      <div className="interactive-grid__body">
        <InteractiveGridIntro />
        <InteractiveGridVisual />
      </div>
    </section>
  );
}
