import { TH } from "../../constants";
import { COLORS, FONTS } from "../../design/tokens";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { DARK_GRID, EASE, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";

export default function LandingTransitionSection({
  light = false,
  label,
  text,
}) {
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const bg = light ? PAGE_LIGHT_BG : COLORS.canvasDark;
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const mutedColor = light ? COLORS.textMutedLight : COLORS.textMutedDark;
  const CT = `background ${EASE}, border-color ${EASE}, color ${EASE}`;
  const cellPadding = isMobileLayout ? "0 16px" : "0 32px";
  const cellText = {
    color: mutedColor,
    fontFamily: FONTS.mono,
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: "0.1em",
    lineHeight: "16px",
    textTransform: "uppercase",
    transition: `color ${EASE}`,
  };

  return (
    <section
      className="landing-transition-section"
      style={{
        height: TH,
        borderTop: bd,
        background: bg,
        display: "grid",
        gridTemplateColumns: isMobileLayout
          ? "minmax(0, 1fr)"
          : "repeat(4, minmax(0, 1fr))",
        overflow: "hidden",
        transition: CT,
      }}
    >
      <span
        style={{
          minWidth: 0,
          height: TH,
          borderRight: isMobileLayout ? 0 : bd,
          padding: cellPadding,
          display: "flex",
          alignItems: "center",
          transition: CT,
          ...cellText,
        }}
      >
        {label}
      </span>

      <span
        style={{
          gridColumn: isMobileLayout ? "auto" : 4,
          minWidth: 0,
          height: TH,
          padding: cellPadding,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          textAlign: "right",
          transition: CT,
          ...cellText,
        }}
      >
        {text}
      </span>
    </section>
  );
}
