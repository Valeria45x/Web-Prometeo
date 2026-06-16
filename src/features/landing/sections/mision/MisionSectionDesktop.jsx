import { Link } from "react-router-dom";
import { COLORS, FONTS } from "@/design/tokens";
import { Grid, GridCell } from "@/shared/ui/Grid";
import GridImageReveal from "@/shared/ui/GridImageReveal";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { MISION_COPY } from "@/features/landing/sections/mision/mision.content";

const IMAGE_STYLE = {
  flexShrink: 0,
  "--grid-image-bg": COLORS.grayDark,
  "--grid-image-overlay": "transparent",
  "--grid-image-placeholder-bg": COLORS.grayWhite,
  "--grid-image-placeholder-text": COLORS.grayDark,
  "--grid-image-placeholder-accent": "transparent",
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
    color: COLORS.grayWhite,
    textWrap: "pretty",
  };
  const cellStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "clamp(720px, 100svh, 1120px)",
  };
  const contentBlock = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "var(--s32)",
    padding: "48px",
    borderTop: border,
  };

  return (
    <section
      id="sobre"
      className="s2-section"
      style={{ borderTop: border, background: COLORS.grayDark }}
    >
      <Grid columns="site">
        {/* Columna izquierda: foto + texto */}
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{ ...cellStyle, borderRight: border }}
        >
          <GridImageReveal
            src={imageSrc}
            label=""
            minHeight="clamp(320px, 48svh, 560px)"
            revealWidthRatio={imageRevealWidthRatio}
            style={IMAGE_STYLE}
          />
          <div style={contentBlock}>
            <p
              ref={leadRevealRef}
              style={{
                ...leadRevealStyle,
                ...narrative,
                fontWeight: 400,
                maxWidth: "34ch",
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
                maxWidth: "34ch",
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
          </div>
        </GridCell>

        {/* Columna derecha: foto + botón */}
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={cellStyle}
        >
          {/* Cuadrante superior vacío (antes la imagen), misma altura para que
              la línea divisoria cuadre con la columna izquierda. */}
          <div
            aria-hidden="true"
            style={{ flexShrink: 0, minHeight: "clamp(320px, 48svh, 560px)" }}
          />
          <div
            style={{
              ...contentBlock,
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ ...outroRevealStyle, width: "fit-content" }}>
              <SplitCtaButton
                as={Link}
                to="/sobre-prometeo"
                label="Conoce por qué existe Prometeo"
                color={COLORS.grayWhite}
                iconBg={COLORS.grayDark}
              />
            </div>
          </div>
        </GridCell>
      </Grid>
    </section>
  );
}
