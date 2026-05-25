import { TH } from "../../constants";
import { COLORS } from "../../design/tokens";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { DARK_GRID, EASE, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";

export default function LandingTransitionSection({
  light = false,
  label,
  text,
  title,
  column = 1,
}) {
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const bg = light ? PAGE_LIGHT_BG : COLORS.canvasDark;
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const lineColor = light ? COLORS.gridLight : COLORS.grid;
  const mutedColor = light ? COLORS.textMutedLight : COLORS.textMutedDark;
  const CT = `background ${EASE}, color ${EASE}`;
  const cellPadding = isMobileLayout ? "0 16px" : "0 32px";
  const headline = title ?? label ?? text;
  const activeColumn = Math.min(4, Math.max(1, column));
  const makeLine = (position) =>
    `linear-gradient(to right, transparent calc(${position} - 1px), ${lineColor} calc(${position} - 1px), ${lineColor} ${position}, transparent ${position})`;
  const linePositions = isMobileLayout
    ? []
    : [
        activeColumn > 1 ? `${(activeColumn - 1) * 25}%` : null,
        activeColumn < 4 ? `${activeColumn * 25}%` : null,
      ].filter(Boolean);
  const lineBackground = linePositions.map(makeLine).join(", ");
  const cellText = {
    color: mutedColor,
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: isMobileLayout ? 10 : 12,
    fontWeight: 400,
    letterSpacing: "0.08em",
    lineHeight: "16px",
    transition: `color ${EASE}`,
  };

  return (
    <section
      className="landing-transition-section"
      style={{
        height: TH,
        borderTop: bd,
        backgroundColor: bg,
        backgroundImage: lineBackground || "none",
        backgroundRepeat: "no-repeat",
        display: "grid",
        gridTemplateColumns: isMobileLayout
          ? "minmax(0, 1fr)"
          : "repeat(4, minmax(0, 1fr))",
        overflow: "hidden",
        transition: CT,
      }}
    >
      <span
        className="landing-transition-section__cell"
        style={{
          gridColumn: isMobileLayout ? "auto" : activeColumn,
          minWidth: 0,
          height: TH,
          padding: cellPadding,
          display: "flex",
          alignItems: "center",
          transition: CT,
        }}
      >
        <span
          className="landing-transition-section__label"
          style={{
            display: "inline-block",
            ...cellText,
          }}
        >
          {headline}
        </span>
      </span>
    </section>
  );
}
