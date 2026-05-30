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
const CTA_TITLE_DELAY_MS = 140;
const CTA_TITLE_REVEAL_MS = 980;
const CTA_BODY_DELAY_MS = CTA_TITLE_DELAY_MS + CTA_TITLE_REVEAL_MS + 80;
const CTA_BODY_REVEAL_MS = 860;
const CTA_ACTION_DELAY_MS = CTA_BODY_DELAY_MS + 180;

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
  motion,
}) {
  const titleDelay = revealDelay + CTA_TITLE_DELAY_MS;
  const bodyDelay = revealDelay + CTA_BODY_DELAY_MS;
  const [eyebrowRef, eyebrowStyle] = useReveal(revealDelay, true);
  const [actionRef, actionStyle] = useReveal(
    revealDelay + CTA_ACTION_DELAY_MS,
    true,
  );

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
                ...typeStyle("bodyStrong"),
              }}
            >
              {entry.label}
            </span>
          </div>

          <TextReveal
            as="h3"
            className={`entry-points-section__card-title-reveal entry-points-section__card-title-reveal--${motion.key}`}
            lines={[entry.title]}
            once
            baseDelay={titleDelay}
            delayStep={0}
            maskColor={bg}
            style={{
              ...typeStyle("displaySm"),
              color: titleColor,
              margin: 0,
              transition: `color ${EASE}`,
              "--text-reveal-block": motion.titleBlock,
              "--text-reveal-duration": `${motion.titleDuration}ms`,
            }}
          >
            {entry.title}
          </TextReveal>
        </div>

        <TextReveal
          as="p"
          className={`entry-points-section__card-body entry-points-section__card-body-reveal entry-points-section__card-body-reveal--${motion.key}`}
          lines={[entry.body]}
          once
          baseDelay={bodyDelay}
          delayStep={0}
          maskColor={bg}
          style={{
            ...typeStyle("body"),
            margin: 0,
            color: mutedColor,
            transition: `color ${EASE}`,
            "--text-reveal-block": motion.bodyBlock,
            "--text-reveal-duration": `${motion.bodyDuration}ms`,
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
        <EntryPointButton label={entry.cta} color={titleColor} to={entry.to} />
      </div>
    </GridCell>
  );
}

export default function EntryPointsSection({ light = false }) {
  const isTabletLayout = useMediaQuery("(max-width: 1024px)");
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const [introEyebrowRef, introEyebrowStyle] = useReveal(0, true);

  const bg = light ? PAGE_LIGHT_BG : COLORS.canvasDark;
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? COLORS.textOnLight : COLORS.textOnDark;
  const mutedColor = light ? "rgba(5, 5, 5, 0.72)" : COLORS.textMutedDark;
  const cellMinHeight = isMobileLayout ? 248 : 420;
  const neutralRevealBlock = light
    ? "rgba(5, 5, 5, 0.16)"
    : "rgba(252, 252, 252, 0.16)";
  const softRevealBlock = light
    ? "rgba(5, 5, 5, 0.08)"
    : "rgba(252, 252, 252, 0.1)";
  const entryPointMotion = [
    {
      key: "people",
      titleBlock: COLORS.accent,
      titleDuration: 900,
      bodyBlock: "rgba(255, 11, 58, 0.24)",
      bodyDuration: CTA_BODY_REVEAL_MS,
    },
    {
      key: "organizations",
      titleBlock: neutralRevealBlock,
      titleDuration: 1040,
      bodyBlock: softRevealBlock,
      bodyDuration: CTA_BODY_REVEAL_MS + 60,
    },
  ];

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
                    ...typeStyle("bodyStrong"),
                  }}
                >
                  {ENTRY_POINTS_INTRO.eyebrow}
                </span>
              </div>

              <TextReveal
                as="h2"
                className="entry-points-section__intro-title-reveal"
                lines={[ENTRY_POINTS_INTRO.title]}
                once
                baseDelay={CTA_TITLE_DELAY_MS}
                delayStep={0}
                maskColor={bg}
                style={{
                  ...typeStyle("displaySm"),
                  fontFamily: FONTS.display,
                  color: titleColor,
                  margin: 0,
                  transition: `color ${EASE}`,
                  "--text-reveal-block": COLORS.accent,
                  "--text-reveal-duration": `${CTA_TITLE_REVEAL_MS}ms`,
                }}
              >
                {ENTRY_POINTS_INTRO.title}
              </TextReveal>
            </div>

            <TextReveal
              as="p"
              className="entry-points-section__card-body entry-points-section__intro-body-reveal"
              lines={[ENTRY_POINTS_INTRO.body]}
              once
              baseDelay={CTA_BODY_DELAY_MS}
              delayStep={0}
              maskColor={bg}
              style={{
                ...typeStyle("body"),
                margin: 0,
                color: mutedColor,
                transition: `color ${EASE}`,
                "--text-reveal-block": softRevealBlock,
                "--text-reveal-duration": `${CTA_BODY_REVEAL_MS}ms`,
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
              revealDelay={160 + index * 220}
              motion={entryPointMotion[index]}
            />
          );
        })}
      </Grid>
    </section>
  );
}
