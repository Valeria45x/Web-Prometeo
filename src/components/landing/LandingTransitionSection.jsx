import { TH } from "../../constants";
import { COLORS } from "../../design/tokens";
import { typeStyle } from "../../design/typography";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import ScrambleText from "./ScrambleText";
import { DARK_GRID, EASE, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";

function isElementOutsideViewport(element) {
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight || 0;
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth || 0;

  if (!viewportHeight || !viewportWidth) return false;
  if (rect.width === 0 && rect.height === 0) return false;

  return (
    rect.bottom <= 0 ||
    rect.right <= 0 ||
    rect.left >= viewportWidth ||
    rect.top >= viewportHeight
  );
}

export default function LandingTransitionSection({
  light = false,
  label,
  text,
  title,
  column = 1,
}) {
  const sectionRef = useRef(null);
  const [scrambleActive, setScrambleActive] = useState(false);
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
    ...typeStyle("transitionLabel", {
      fontSize: isMobileLayout
        ? "var(--type-caption-size)"
        : "var(--type-transition-label-size)",
    }),
    transition: `color ${EASE}`,
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.85) {
          setScrambleActive(true);
        } else if (isElementOutsideViewport(section)) {
          setScrambleActive(false);
        }
      },
      { threshold: [0, 0.85, 1] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
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
