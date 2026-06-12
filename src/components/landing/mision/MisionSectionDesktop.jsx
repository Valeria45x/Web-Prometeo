import { TH } from "../../../constants";
import { COLORS, FONTS } from "../../../design/tokens";
import { Grid, GridCell } from "../../system/Grid";
import GridImageReveal from "../../system/GridImageReveal";
import { MISION_COPY } from "./mision.content";

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
