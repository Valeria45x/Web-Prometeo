import { Link } from "react-router-dom";
import { PROMETEO_SYSTEM } from "../../../design/prometeoSystem";
import { COLORS, FONTS } from "../../../design/tokens";
import { typeStyle } from "../../../design/typography";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useReveal } from "../../../hooks/useReveal";
import { scrollToTopImmediate } from "../../../lib/lenis";
import { Grid, GridCell } from "../../system/Grid";
import GridImageReveal from "../../system/GridImageReveal";
import SplitCtaButton from "../../system/SplitCtaButton";
import TextReveal from "../../system/TextReveal";
import { ENTRY_POINTS, ENTRY_POINTS_INTRO } from "../content/landing.content";
import { DARK_GRID, EASE, LIGHT_GRID, PAGE_LIGHT_BG } from "../shared/theme";
import misionImage from "../../../../Instagram Feed USB v1.png";
import "./EntryPointsSection.css";

const SECTION_TRANSITION = `background ${EASE}, color ${EASE}, border-color ${EASE}`;
const ENTRY_POINT_MOTION = PROMETEO_SYSTEM.motion.pillars;
const ENTRY_POINT_LABEL_BASE_DELAY_MS = ENTRY_POINT_MOTION.indexDelayMs;
const ENTRY_POINT_LABEL_STAGGER_MS = 120;
const ENTRY_POINT_TITLE_BASE_DELAY_MS = 520;
const ENTRY_POINT_TITLE_STAGGER_MS = 120;
const ENTRY_POINT_TITLE_REVEAL_MS = 860;
const ENTRY_POINT_BODY_BASE_DELAY_MS = 860;
const ENTRY_POINT_BODY_STAGGER_MS = 120;
const ENTRY_POINT_BODY_REVEAL_MS = ENTRY_POINT_MOTION.transitionMs;
const ENTRY_POINT_ACTION_BASE_DELAY_MS = 1280;
const ENTRY_POINT_ACTION_STAGGER_MS = 120;

function EntryPointCard({
  entry,
  borderStyle,
  cellMinHeight,
  isMobileLayout,
  bg,
  titleColor,
  mutedColor,
  sequenceIndex,
}) {
  const labelDelay =
    ENTRY_POINT_LABEL_BASE_DELAY_MS +
    sequenceIndex * ENTRY_POINT_LABEL_STAGGER_MS;
  const titleDelay =
    ENTRY_POINT_TITLE_BASE_DELAY_MS +
    sequenceIndex * ENTRY_POINT_TITLE_STAGGER_MS;
  const bodyDelay =
    ENTRY_POINT_BODY_BASE_DELAY_MS +
    sequenceIndex * ENTRY_POINT_BODY_STAGGER_MS;
  const actionDelay =
    ENTRY_POINT_ACTION_BASE_DELAY_MS +
    sequenceIndex * ENTRY_POINT_ACTION_STAGGER_MS;
  const [eyebrowRef, eyebrowStyle] = useReveal(
    labelDelay,
    false,
  );
  const [actionRef, actionStyle] = useReveal(actionDelay, false);

  return (
    <GridCell
      className="entry-points-section__card"
      style={{
        ...borderStyle,
        minHeight: cellMinHeight,
        padding: isMobileLayout ? "32px 16px" : "64px 32px",
        background: bg,
        color: titleColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 32,
        transition: SECTION_TRANSITION,
      }}
    >
      <div className="entry-points-section__card-copy">
        <div className="entry-points-section__card-heading">
          <div ref={eyebrowRef} style={eyebrowStyle}>
            <span
              className="entry-points-section__card-eyebrow"
              style={{
                color: COLORS.accent,
                ...typeStyle("eyebrow"),
              }}
            >
              {entry.label}
            </span>
          </div>

          <TextReveal
            as="h3"
            className="entry-points-section__card-title entry-points-section__title-reveal"
            lines={[entry.title]}
            once={false}
            baseDelay={titleDelay}
            delayStep={0}
            maskColor={bg}
            style={{
              ...typeStyle("displaySm"),
              color: titleColor,
              margin: 0,
              transition: `color ${EASE}`,
              "--entry-title-reveal-duration": `${ENTRY_POINT_TITLE_REVEAL_MS}ms`,
            }}
          >
            {entry.title}
          </TextReveal>
        </div>

        <TextReveal
          as="p"
          className="entry-points-section__card-body entry-points-section__card-body-reveal"
          lines={[entry.body]}
          once={false}
          baseDelay={bodyDelay}
          delayStep={0}
          maskColor={bg}
          style={{
            ...typeStyle("body"),
            margin: 0,
            color: mutedColor,
            transition: `color ${EASE}`,
            "--text-reveal-duration": `${ENTRY_POINT_BODY_REVEAL_MS}ms`,
          }}
        >
          {entry.body}
        </TextReveal>
      </div>

      <div
        ref={actionRef}
        className="entry-points-section__action"
        style={actionStyle}
      >
        <SplitCtaButton
          as={Link}
          to={entry.to}
          label={entry.cta}
          color={titleColor}
          iconBg={bg}
          fullWidth
          onClick={scrollToTopImmediate}
        />
      </div>
    </GridCell>
  );
}

export default function EntryPointsSection({ light = false }) {
  const isTabletLayout = useMediaQuery("(max-width: 1024px)");
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const [introEyebrowRef, introEyebrowStyle] = useReveal(
    ENTRY_POINT_LABEL_BASE_DELAY_MS,
    false,
  );

  const bg = light ? PAGE_LIGHT_BG : COLORS.canvasDark;
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? COLORS.textOnLight : COLORS.textOnDark;
  const mutedColor = light ? "rgba(5, 5, 5, 0.72)" : COLORS.textMutedDark;
  const cellMinHeight = isMobileLayout ? 248 : 420;
  const getCellBorders = (index) => {
    if (isMobileLayout) {
      return {
        borderRight: "none",
        borderTop: index === 0 ? "none" : bd,
      };
    }

    if (isTabletLayout) {
      return {
        borderRight: index % 2 === 0 ? bd : "none",
        borderTop: index > 1 ? bd : "none",
      };
    }

    return {
      borderRight: index < 3 ? bd : "none",
      borderTop: "none",
    };
  };

  return (
    <section
      id="punto-de-entrada"
      style={{
        background: bg,
        borderTop: bd,
        borderBottom: bd,
        transition: SECTION_TRANSITION,
      }}
    >
      <Grid
        columns="site"
        style={{ background: bg, transition: SECTION_TRANSITION }}
      >
        <GridCell
          className="entry-points-section__card entry-points-section__card--intro"
          style={{
            ...getCellBorders(0),
            minHeight: cellMinHeight,
            padding: isMobileLayout ? "32px 16px" : "64px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 32,
            transition: SECTION_TRANSITION,
          }}
        >
          <div className="entry-points-section__card-copy entry-points-section__card-copy--intro">
            <div className="entry-points-section__card-heading entry-points-section__card-heading--intro">
              <div ref={introEyebrowRef} style={introEyebrowStyle}>
                <span
                  className="entry-points-section__card-eyebrow"
                  style={{
                    color: COLORS.accent,
                    ...typeStyle("eyebrow"),
                  }}
                >
                  {ENTRY_POINTS_INTRO.eyebrow}
                </span>
              </div>

              <TextReveal
                as="h2"
                className="entry-points-section__intro-title entry-points-section__title-reveal"
                lines={[ENTRY_POINTS_INTRO.title]}
                once={false}
                baseDelay={ENTRY_POINT_TITLE_BASE_DELAY_MS}
                delayStep={0}
                maskColor={bg}
                style={{
                  ...typeStyle("displaySm"),
                  fontFamily: FONTS.display,
                  color: titleColor,
                  margin: 0,
                  transition: `color ${EASE}`,
                  "--entry-title-reveal-duration": `${ENTRY_POINT_TITLE_REVEAL_MS}ms`,
                }}
              >
                {ENTRY_POINTS_INTRO.title}
              </TextReveal>
            </div>

            <TextReveal
              as="p"
              className="entry-points-section__card-body entry-points-section__intro-body-reveal"
              lines={[ENTRY_POINTS_INTRO.body]}
              once={false}
              baseDelay={ENTRY_POINT_BODY_BASE_DELAY_MS}
              delayStep={0}
              maskColor={bg}
              style={{
                ...typeStyle("body"),
                margin: 0,
                color: mutedColor,
                transition: `color ${EASE}`,
                "--text-reveal-duration": `${ENTRY_POINT_BODY_REVEAL_MS}ms`,
              }}
            >
              {ENTRY_POINTS_INTRO.body}
            </TextReveal>
          </div>
        </GridCell>

        <GridCell
          style={{
            ...getCellBorders(1),
            minHeight: cellMinHeight,
            background: bg,
            transition: SECTION_TRANSITION,
          }}
        >
          <div className="entry-points-section__image-region">
            <GridImageReveal
              src={misionImage}
              label=""
              tone={light ? "light" : "dark"}
              minHeight="100%"
              revealWidthRatio={1}
              className="entry-points-section__grid-image"
              style={{
                height: "100%",
                "--grid-image-bg": bg,
                "--grid-image-overlay": "transparent",
              }}
            />
          </div>
        </GridCell>

        {ENTRY_POINTS.map((entry, index) => {
          const cellIndex = index + 2;

          return (
            <EntryPointCard
              key={entry.to}
              entry={entry}
              borderStyle={getCellBorders(cellIndex)}
              cellMinHeight={cellMinHeight}
              isMobileLayout={isMobileLayout}
              bg={bg}
              titleColor={titleColor}
              mutedColor={mutedColor}
              sequenceIndex={index + 1}
            />
          );
        })}
      </Grid>
    </section>
  );
}
