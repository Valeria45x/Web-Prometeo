import { Link } from "react-router-dom";
import { TH } from "@/constants";
import { COLORS, FONTS } from "@/design/tokens";
import { scrollToTopImmediate } from "@/lib/lenis";
import { Grid, GridCell } from "@/shared/ui/Grid";
import GridImageReveal from "@/shared/ui/GridImageReveal";
import { MISION_COPY } from "@/features/landing/mision/mision.content";

const MISION_LINK_STYLE = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  width: "fit-content",
  fontFamily: FONTS.sans,
  fontSize: "var(--type-title-sm-size)",
  lineHeight: "var(--type-title-sm-line)",
  fontWeight: 800,
  letterSpacing: 0,
};

export default function MisionSectionDesktop({
  border,
  imageRevealWidthRatio,
  leadRevealRef,
  leadRevealStyle,
  bodyRevealRef,
  bodyRevealStyle,
  outroRevealRef,
  outroRevealStyle,
  imageSrc,
}) {
  const narrative = {
    fontFamily: FONTS.sans,
    fontSize: "var(--type-display-sm-size)",
    lineHeight: "var(--type-display-sm-line)",
    letterSpacing: 0,
    margin: 0,
    color: "#fcfcfc",
    textWrap: "pretty",
  };

  return (
    <section
      id="sobre"
      className="s2-section"
      style={{
        borderTop: border,
        background: "#050505",
      }}
    >
      <Grid columns="site">
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "var(--s32)",
            borderRight: border,
            padding: `${TH}px 64px`,
          }}
        >
          <p
            ref={leadRevealRef}
            style={{
              ...leadRevealStyle,
              ...narrative,
              fontWeight: 400,
              maxWidth: "26ch",
            }}
          >
            {MISION_COPY.lead}
          </p>
          <p
            ref={bodyRevealRef}
            style={{
              ...bodyRevealStyle,
              ...narrative,
              fontWeight: 900,
              color: COLORS.accent,
              maxWidth: "28ch",
            }}
          >
            {MISION_COPY.tension}
          </p>
          <p
            ref={outroRevealRef}
            style={{
              ...outroRevealStyle,
              ...narrative,
              fontWeight: 900,
              maxWidth: "20ch",
            }}
          >
            {MISION_COPY.resolve}
          </p>
          <Link
            to="/sobre-prometeo"
            onClick={scrollToTopImmediate}
            className="ds-link-secondary"
            style={{ ...outroRevealStyle, ...MISION_LINK_STYLE }}
          >
            Conoce por qué existe Prometeo
            <span className="ds-link-secondary__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </GridCell>

        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <GridImageReveal
            src={imageSrc}
            label=""
            minHeight="0"
            revealWidthRatio={imageRevealWidthRatio}
            style={{
              flex: 1,
              "--grid-image-bg": "#050505",
              "--grid-image-overlay": "transparent",
              "--grid-image-placeholder-bg": "#fcfcfc",
              "--grid-image-placeholder-text": "#050505",
              "--grid-image-placeholder-accent": "transparent",
            }}
          />
        </GridCell>
      </Grid>
    </section>
  );
}
