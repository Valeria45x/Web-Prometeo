import { Link } from "react-router-dom";
import { getPrometeoCtaButtonTokens } from "../../../design/prometeoSystem";
import { COLORS, FONTS } from "../../../design/tokens";
import { typeStyle } from "../../../design/typography";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useReveal } from "../../../hooks/useReveal";
import { scrollToTopImmediate } from "../../../lib/lenis";
import { Grid, GridCell } from "../../system/Grid";
import TextReveal from "../../system/TextReveal";
import { ENTRY_POINTS, ENTRY_POINTS_INTRO } from "../content/landing.content";
import { DARK_GRID, EASE, LIGHT_GRID, PAGE_LIGHT_BG } from "../shared/theme";
import misionImage from "../../../../Instagram Feed USB v1.png";
import "./EntryPointsSection.css";

const SECTION_TRANSITION = `background ${EASE}, color ${EASE}, border-color ${EASE}`;
const CTA_BUTTON_TOKENS = getPrometeoCtaButtonTokens();

function EntryPointArrow() {
  return (
    <svg
      className="entry-points-section__button-arrow"
      width={CTA_BUTTON_TOKENS.arrowSize}
      height={CTA_BUTTON_TOKENS.arrowSize}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 10h11" />
      <path d="M10.5 4.5 16 10l-5.5 5.5" />
    </svg>
  );
}

function EntryPointButton({ label, color, to }) {
  const buttonType = typeStyle("titleSm", {
    fontSize: CTA_BUTTON_TOKENS.fontSize,
    lineHeight: CTA_BUTTON_TOKENS.lineHeight,
    fontWeight: CTA_BUTTON_TOKENS.fontWeight,
  });

  return (
    <Link
      to={to}
      className="entry-points-section__button"
      onClick={scrollToTopImmediate}
      style={{
        "--entry-points-button-border": color,
        "--entry-points-button-color": color,
        "--entry-points-button-min-height": `${CTA_BUTTON_TOKENS.minHeight}px`,
        "--entry-points-button-icon-size": `${CTA_BUTTON_TOKENS.iconSize}px`,
        "--entry-points-button-copy-padding": CTA_BUTTON_TOKENS.copyPadding,
        "--entry-points-button-arrow-size": `${CTA_BUTTON_TOKENS.arrowSize}px`,
        "--entry-points-button-transition": CTA_BUTTON_TOKENS.transition,
      }}
    >
      <span className="entry-points-section__button-copy" style={buttonType}>
        <span className="entry-points-section__button-copy-window">
          <span className="entry-points-section__button-copy-track">
            <span className="entry-points-section__button-copy-text">
              {label}
            </span>
            <span
              className="entry-points-section__button-copy-text entry-points-section__button-copy-text--ghost"
              aria-hidden="true"
            >
              {label}
            </span>
          </span>
        </span>
      </span>

      <span className="entry-points-section__button-icon" aria-hidden="true">
        <EntryPointArrow />
      </span>
    </Link>
  );
}

function EntryPointCard({
  entry,
  borderStyle,
  cellMinHeight,
  isMobileLayout,
  bg,
  titleColor,
  mutedColor,
  revealDelay,
}) {
  const [copyRef, copyStyle] = useReveal(revealDelay, false);
  const [actionRef, actionStyle] = useReveal(revealDelay + 120, false);

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
      <div
        ref={copyRef}
        className="entry-points-section__card-copy"
        style={copyStyle}
      >
        <div className="entry-points-section__card-heading">
          <span
            className="entry-points-section__card-eyebrow"
            style={{
              color: COLORS.accent,
              ...typeStyle("bodyStrong"),
            }}
          >
            {entry.label}
          </span>

          <h3
            style={{
              ...typeStyle("displaySm"),
              color: titleColor,
              margin: 0,
              transition: `color ${EASE}`,
            }}
          >
            {entry.title}
          </h3>
        </div>

        <p
          className="entry-points-section__card-body"
          style={{
            ...typeStyle("body"),
            margin: 0,
            color: mutedColor,
            transition: `color ${EASE}`,
          }}
        >
          {entry.body}
        </p>
      </div>

      <div
        ref={actionRef}
        className="entry-points-section__action"
        style={actionStyle}
      >
        <EntryPointButton label={entry.cta} color={titleColor} to={entry.to} />
      </div>
    </GridCell>
  );
}

export default function EntryPointsSection({ light = false }) {
  const isTabletLayout = useMediaQuery("(max-width: 1024px)");
  const isMobileLayout = useMediaQuery("(max-width: 767px)");

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
              <span
                className="entry-points-section__card-eyebrow"
                style={{
                  color: COLORS.accent,
                  ...typeStyle("bodyStrong"),
                }}
              >
                {ENTRY_POINTS_INTRO.eyebrow}
              </span>

              <TextReveal
                as="h2"
                className="entry-points-section__intro-title-reveal"
                lines={[ENTRY_POINTS_INTRO.title]}
                once={false}
                delayStep={0}
                maskColor={bg}
                style={{
                  ...typeStyle("displaySm"),
                  fontFamily: FONTS.display,
                  color: titleColor,
                  margin: 0,
                  transition: `color ${EASE}`,
                  "--text-reveal-block": COLORS.accent,
                }}
              >
                {ENTRY_POINTS_INTRO.title}
              </TextReveal>
            </div>

            <TextReveal
              as="p"
              className="entry-points-section__card-body entry-points-section__card-body--intro entry-points-section__intro-body-reveal"
              lines={[ENTRY_POINTS_INTRO.body]}
              once={false}
              delayStep={0}
              maskColor={bg}
              style={{
                ...typeStyle("body"),
                margin: 0,
                color: mutedColor,
                transition: `color ${EASE}`,
                "--text-reveal-block": COLORS.accent,
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
            <TextReveal
              className="entry-points-section__image-reveal"
              lineClassName="entry-points-section__image-reveal-line"
              once={false}
              delayStep={0}
              style={{
                height: "100%",
                "--text-reveal-duration": "1.1s",
                "--text-reveal-block": COLORS.grayDark,
              }}
            >
              <img
                className="entry-points-section__image-media"
                src={misionImage}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
            </TextReveal>
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
              revealDelay={180 + index * 120}
            />
          );
        })}
      </Grid>
    </section>
  );
}
