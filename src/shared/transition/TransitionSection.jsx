import { TH } from "@/constants";
import { COLORS } from "@/design/tokens";
import { typeStyle } from "@/design/typography";
import { useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ScrambleText from "@/shared/ui/ScrambleText";
import { useLandingTransitionScramble } from "@/shared/transition/useLandingTransitionScramble";
import {
  DARK_GRID,
  EASE,
  LIGHT_GRID,
  PAGE_LIGHT_BG,
} from "@/shared/styles/theme";

export default function TransitionSection({
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
  const mutedColor = light ? COLORS.textMutedLight : COLORS.textMutedDark;
  const CT = `background ${EASE}, color ${EASE}`;
  const cellPadding = isMobileLayout ? "0 16px" : "0 32px";
  const headline = title ?? label ?? text;
  const activeColumn = Math.min(4, Math.max(1, column));
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
        display: "grid",
        gridTemplateColumns: isMobileLayout
          ? "minmax(0, 1fr)"
          : "repeat(4, minmax(0, 1fr))",
        overflow: "hidden",
        transition: CT,
      }}
    >
      {isMobileLayout ? (
        <span
          className="landing-transition-section__cell landing-transition-section__cell--active"
          style={{
            minWidth: 0,
            height: TH,
            padding: cellPadding,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            transition: CT,
          }}
        >
          <ScrambleText
            text={headline}
            play={scrambleActive}
            cursor
            className="landing-transition-section__label"
            style={{
              display: "inline-block",
              ...cellText,
            }}
          />
        </span>
      ) : (
        Array.from({ length: 4 }, (_, index) => {
          const cellColumn = index + 1;
          const isActiveCell = cellColumn === activeColumn;
          const isLastCell = cellColumn === 4;

          return (
            <span
              key={cellColumn}
              className={[
                "landing-transition-section__cell",
                isActiveCell ? "landing-transition-section__cell--active" : "",
                `landing-transition-section__cell--column-${cellColumn}`,
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                minWidth: 0,
                height: TH,
                padding: cellPadding,
                boxSizing: "border-box",
                borderRight: isLastCell ? undefined : bd,
                display: "flex",
                alignItems: "center",
                transition: CT,
              }}
            >
              {isActiveCell ? (
                <ScrambleText
                  text={headline}
                  play={scrambleActive}
                  cursor
                  className="landing-transition-section__label"
                  style={{
                    display: "inline-block",
                    ...cellText,
                  }}
                />
              ) : null}
            </span>
          );
        })
      )}
    </section>
  );
}
