import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../../design/tokens";
import { typeStyle } from "../../design/typography";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { scrollToTopImmediate } from "../../lib/lenis";
import { Grid, GridCell } from "../system/Grid";
import GridImageReveal from "../system/GridImageReveal";
import { DARK_GRID, EASE, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";
import misionImage from "../../../Instagram Feed USB v1.png";
import "./entryPointsSection.css";

const ENTRY_POINTS = [
  {
    label: "Para ti",
    title: "Privacidad clara",
    body: "Recursos y comunidad para empezar.",
    cta: "Ir a Para ti",
    to: "/para-ti",
  },
  {
    label: "Para empresas",
    title: "Privacidad visible",
    body: "Certificacion y acompanamiento para organizaciones.",
    cta: "Ir a Para empresas",
    to: "/empresas",
  },
];

const SECTION_TRANSITION = `background ${EASE}, color ${EASE}, border-color ${EASE}`;

export default function EntryPointsSection({ light = false }) {
  const isTabletLayout = useMediaQuery("(max-width: 1024px)");
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const imageRegionRef = useRef(null);

  const bg = light ? PAGE_LIGHT_BG : COLORS.canvasDark;
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const lineColor = light ? COLORS.gridLight : COLORS.grid;
  const titleColor = light ? COLORS.textOnLight : COLORS.textOnDark;
  const mutedColor = light ? "rgba(5, 5, 5, 0.72)" : COLORS.textMutedDark;
  const cellMinHeight = isMobileLayout ? 288 : 420;
  const [imageLineX, setImageLineX] = useState(isTabletLayout ? "100%" : "75%");

  useEffect(() => {
    const region = imageRegionRef.current;
    const reveal = region?.querySelector(".entry-points-section__image-reveal");

    if (!reveal) return undefined;

    const readLineX = () => {
      const nextLineX = getComputedStyle(reveal)
        .getPropertyValue("--grid-image-edge-x")
        .trim();

      if (!nextLineX) return;

      setImageLineX((current) => (current === nextLineX ? current : nextLineX));
    };

    readLineX();

    if (typeof MutationObserver !== "function") return undefined;

    const observer = new MutationObserver(readLineX);
    observer.observe(reveal, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, [isTabletLayout]);

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
              Dos formas de entrar.
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
              Para ti, claridad en tu vida digital. Para empresas, una forma
              clara de demostrar compromiso.
            </p>
          </div>
        </GridCell>

        <GridCell
          style={{
            ...getCellBorders(1),
            minHeight: cellMinHeight,
            background: bg,
            display: "grid",
            gridTemplateRows: "1.03fr 0.97fr",
            transition: SECTION_TRANSITION,
          }}
        >
          <div
            ref={imageRegionRef}
            className="entry-points-section__image-region"
          >
            <GridImageReveal
              className="entry-points-section__image-reveal"
              src={misionImage}
              alt=""
              label="PMT / entrada"
              tone={light ? "light" : "dark"}
              minHeight="0"
              revealWidthRatio={isTabletLayout ? 1 : 0.75}
              style={{
                height: "100%",
                "--grid-image-bg": bg,
                "--grid-image-overlay": "transparent",
                "--grid-image-placeholder-bg": light ? "#050505" : "#fcfcfc",
                "--grid-image-placeholder-text": light ? "#fcfcfc" : "#050505",
                "--grid-image-placeholder-accent": COLORS.accent,
              }}
            />
          </div>

          <div
            aria-hidden="true"
            className="entry-points-section__image-tail"
            style={{
              "--entry-points-image-line-x": imageLineX,
              "--entry-points-image-line-color": lineColor,
              background: bg,
              transition: SECTION_TRANSITION,
            }}
          />
        </GridCell>

        {ENTRY_POINTS.map((entry, index) => {
          const cellIndex = index + 2;

          return (
            <GridCell
              key={entry.to}
              as={Link}
              to={entry.to}
              onClick={scrollToTopImmediate}
              style={{
                ...getCellBorders(cellIndex),
                minHeight: cellMinHeight,
                padding: isMobileLayout ? "32px 16px" : "64px 32px",
                background: bg,
                color: titleColor,
                textDecoration: "none",
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

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    ...typeStyle("titleSm"),
                    color: titleColor,
                    transition: `color ${EASE}`,
                  }}
                >
                  {entry.cta}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    color: COLORS.accent,
                    ...typeStyle("displaySm"),
                    lineHeight: "1",
                  }}
                >
                  →
                </span>
              </div>
            </GridCell>
          );
        })}
      </Grid>
    </section>
  );
}
