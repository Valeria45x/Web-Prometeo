import { TH } from "../../constants";
import { COLORS } from "../../design/tokens";
import { typeStyle } from "../../design/typography";
import { useRef } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import ScrambleText from "./ScrambleText";
import { getTransitionLineBackground } from "./landingTransition.utils";
import { useLandingTransitionScramble } from "./useLandingTransitionScramble";
import { DARK_GRID, EASE, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";

export default function LandingTransitionSection({
  light = false,
  label,
  text,
  title,
  column = 1,
}) {
  const sectionRef = useRef(null);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const scrambleActive = useLandingTransitionScramble(sectionRef);
  const bg = light ? PAGE_LIGHT_BG : COLORS.canvasDark;
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const lineColor = light ? COLORS.gridLight : COLORS.grid;
  const mutedColor = light ? COLORS.textMutedLight : COLORS.textMutedDark;
  const CT = `background ${EASE}, color ${EASE}`;
  const cellPadding = isMobileLayout ? "0 16px" : "0 32px";
  const headline = title ?? label ?? text;
  const activeColumn = Math.min(4, Math.max(1, column));
  const lineBackground = getTransitionLineBackground({
    isMobileLayout,
    activeColumn,
    lineColor,
  });
  const cellText = {
    color: mutedColor,
    ...typeStyle("transitionLabel", {
      fontSize: isMobileLayout
        ? "var(--type-caption-size)"
        : "var(--type-transition-label-size)",
    }),
    transition: `color ${EASE}`,
  };

  return (
    <section
      ref={sectionRef}
      className="landing-transition-section"
      style={{
        height: TH,
        borderTop: bd,
        backgroundColor: bg,
        backgroundImage: lineBackground,
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
        <ScrambleText
          text={headline}
          play={scrambleActive}
          className="landing-transition-section__label"
          style={{
            display: "inline-block",
            ...cellText,
          }}
        />
      </span>
    </section>
  );
}
