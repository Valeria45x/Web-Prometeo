import { TH } from "../../../constants";
import { COLORS } from "../../../design/tokens";
import { typeStyle } from "../../../design/typography";
import { Grid, GridCell } from "../../system/Grid";
import GridImageReveal from "../../system/GridImageReveal";
import TextReveal from "../../system/TextReveal";
import { MISION_COPY } from "./mision.content";

export default function MisionSectionDesktop({
  border,
  maskColor,
  hasWideBodySpacing,
  hasBalancedDesktopBlocks,
  imageRevealWidthRatio,
  bodyRevealRef,
  bodyRevealStyle,
  outroRevealRef,
  outroRevealStyle,
  imageSrc,
}) {
  const problemBodyColumns = hasWideBodySpacing
    ? "minmax(0, 520px) minmax(0, 1fr)"
    : "minmax(0, 1fr)";
  const problemTitlePadding = hasBalancedDesktopBlocks
    ? "0 64px"
    : `${TH}px 64px 32px`;
  const problemBodyPadding = hasBalancedDesktopBlocks ? "0 64px" : "32px 64px";
  const problemOutroPadding = hasBalancedDesktopBlocks
    ? "0 64px"
    : `32px 64px ${TH}px`;
  const problemBlockMinHeight = hasBalancedDesktopBlocks ? 192 : undefined;

  return (
    <section
      id="sobre"
      className="s2-section"
      style={{
        borderTop: border,
        background: "#050505",
      }}
    >
      <Grid
        columns="site"
        style={{
          gridTemplateRows: "auto auto",
        }}
      >
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            display: "grid",
            gridTemplateColumns: problemBodyColumns,
            alignItems: hasBalancedDesktopBlocks ? "center" : undefined,
            borderRight: border,
            padding: problemTitlePadding,
            minHeight: problemBlockMinHeight,
          }}
        >
          <TextReveal
            as="h2"
            lines={MISION_COPY.titleLines}
            once={false}
            maskColor={maskColor}
            style={{
              ...typeStyle("displayMd"),
              color: "#fcfcfc",
              margin: 0,
              maxWidth: hasBalancedDesktopBlocks ? "11ch" : "13ch",
              textWrap: "balance",
            }}
          />
        </GridCell>

        <GridCell
          span={2}
          rowSpan={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          collapseRowSpanOnTablet
          collapseRowSpanOnMobile
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

        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            borderRight: border,
            borderTop: border,
          }}
        >
          <div
            ref={bodyRevealRef}
            style={{
              ...bodyRevealStyle,
              padding: problemBodyPadding,
              display: "grid",
              gridTemplateColumns: problemBodyColumns,
              alignItems: hasBalancedDesktopBlocks ? "center" : undefined,
              minHeight: problemBlockMinHeight,
            }}
          >
            <p
              style={{
                ...typeStyle("body"),
                color: "#fcfcfc",
                margin: 0,
                maxWidth: "100%",
                textWrap: hasWideBodySpacing ? "pretty" : undefined,
              }}
            >
              {MISION_COPY.body}
            </p>
          </div>

          <div
            ref={outroRevealRef}
            style={{
              ...outroRevealStyle,
              borderTop: border,
              padding: problemOutroPadding,
              display: "grid",
              gridTemplateColumns: problemBodyColumns,
              alignItems: hasBalancedDesktopBlocks ? "center" : undefined,
              minHeight: problemBlockMinHeight,
            }}
          >
            <h3
              className="section-title"
              style={{
                ...typeStyle("displayMd"),
                color: "#fcfcfc",
                maxWidth: "20ch",
                margin: 0,
              }}
            >
              <span style={{ color: COLORS.accent }}>{MISION_COPY.outro}</span>
            </h3>
          </div>
        </GridCell>
      </Grid>
    </section>
  );
}
