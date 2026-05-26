import { Link } from "react-router-dom";
import { COLORS } from "../../design/tokens";
import { typeStyle } from "../../design/typography";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { scrollToTopImmediate } from "../../lib/lenis";
import { Grid, GridCell } from "../system/Grid";
import TextReveal from "../system/TextReveal";
import { DARK_GRID, EASE, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";
import misionImage from "../../../Instagram Feed USB v1.png";
import "./entryPointsSection.css";

const ENTRY_POINTS = [
  {
    label: "Para ti",
    title: "Privacidad clara",
    body: "Recursos y comunidad para empezar.",
    cta: "Explora m\u00E1s",
    to: "/para-ti",
  },
  {
    label: "Para empresas",
    title: "Privacidad visible",
    body: "Certificacion y acompanamiento para organizaciones.",
    cta: "Explora m\u00E1s",
    to: "/empresas",
  },
];

const SECTION_TRANSITION = `background ${EASE}, color ${EASE}, border-color ${EASE}`;

function EntryPointArrow() {
  return (
    <svg
      className="entry-points-section__button-arrow"
      width="20"
      height="20"
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
    fontSize: 18,
    lineHeight: "24px",
    fontWeight: 800,
  });

  return (
    <Link
      to={to}
      className="entry-points-section__button"
      onClick={scrollToTopImmediate}
      style={{
        "--entry-points-button-border": color,
        "--entry-points-button-color": color,
      }}
    >
      <span className="entry-points-section__button-copy" style={buttonType}>
        {label}
      </span>

      <span className="entry-points-section__button-icon" aria-hidden="true">
        <EntryPointArrow />
      </span>
    </Link>
  );
}

export default function EntryPointsSection({ light = false }) {
  const isTabletLayout = useMediaQuery("(max-width: 1024px)");
  const isMobileLayout = useMediaQuery("(max-width: 767px)");

  const bg = light ? PAGE_LIGHT_BG : COLORS.canvasDark;
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? COLORS.textOnLight : COLORS.textOnDark;
  const mutedColor = light ? "rgba(5, 5, 5, 0.72)" : COLORS.textMutedDark;
  const cellMinHeight = isMobileLayout ? 288 : 420;

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
          <div style={{ display: "grid", gap: 24, maxWidth: 440 }}>
            <span
              style={{
                color: COLORS.accent,
                ...typeStyle("transitionLabel"),
                textTransform: "uppercase",
              }}
            >
              Tu punto de entrada
            </span>

            <h2
              style={{
                ...typeStyle(isMobileLayout ? "displaySm" : "displayMd"),
                color: titleColor,
                margin: 0,
                transition: `color ${EASE}`,
              }}
            >
              La claridad cambia de escala.
            </h2>

            <p
              style={{
                ...typeStyle("body"),
                margin: 0,
                color: mutedColor,
                maxWidth: 26 * 16,
                transition: `color ${EASE}`,
              }}
            >
              Un camino empieza en tu vida digital. El otro, en como una
              organizacion demuestra su compromiso.
            </p>
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
            <GridCell
              key={entry.to}
              className="entry-points-section__card"
              style={{
                ...getCellBorders(cellIndex),
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
              <div style={{ display: "grid", gap: 24, maxWidth: 24 * 16 }}>
                <span
                  style={{
                    color: COLORS.accent,
                    ...typeStyle("transitionLabel"),
                    textTransform: "uppercase",
                  }}
                >
                  {entry.label}
                </span>

                <h3
                  style={{
                    ...typeStyle(isMobileLayout ? "displaySm" : "displaySm"),
                    color: titleColor,
                    margin: 0,
                    transition: `color ${EASE}`,
                  }}
                >
                  {entry.title}
                </h3>

                <p
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

              <div className="entry-points-section__action">
                <EntryPointButton
                  label={entry.cta}
                  color={titleColor}
                  to={entry.to}
                />
              </div>
            </GridCell>
          );
        })}
      </Grid>
    </section>
  );
}
