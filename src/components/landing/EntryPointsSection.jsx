import { Link } from "react-router-dom";
import { COLORS, FONTS } from "../../design/tokens";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { scrollToTopImmediate } from "../../lib/lenis";
import { DARK_GRID, EASE, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";

const ENTRY_POINTS = [
  {
    label: "Aprender primero",
    title: "Entender que aceptas y por que.",
    body: "Empieza por articulos y recursos que convierten la privacidad digital en algo legible y accionable.",
    cta: "Ir a articulos",
    to: "/articulos",
  },
  {
    label: "Entrar en comunidad",
    title: "Hablarlo con gente que ya lo ve.",
    body: "Pregunta, contrasta y comparte hallazgos con personas que estan pasando ese conocimiento.",
    cta: "Ir a comunidad",
    to: "/comunidad",
  },
  {
    label: "Para empresas",
    title: "Hacer visible el compromiso.",
    body: "Explora como llevar esa claridad a una organizacion mediante criterio, acompanamiento y certificacion.",
    cta: "Ir a empresas",
    to: "/empresas",
  },
];

const SECTION_TRANSITION = `background ${EASE}, color ${EASE}, border-color ${EASE}`;

export default function EntryPointsSection({ light = false }) {
  const isTabletLayout = useMediaQuery("(max-width: 1024px)");
  const isMobileLayout = useMediaQuery("(max-width: 767px)");

  const bg = light ? PAGE_LIGHT_BG : COLORS.canvasDark;
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? COLORS.textOnLight : COLORS.textOnDark;
  const mutedColor = light ? COLORS.textMutedLight : COLORS.textMutedDark;
  const gridTemplateColumns = isMobileLayout
    ? "minmax(0, 1fr)"
    : isTabletLayout
      ? "repeat(2, minmax(0, 1fr))"
      : "repeat(4, minmax(0, 1fr))";

  return (
    <section
      id="punto-de-entrada"
      style={{
        background: bg,
        borderTop: bd,
        transition: SECTION_TRANSITION,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns,
          background: bg,
          transition: SECTION_TRANSITION,
        }}
      >
        <div
          style={{
            gridColumn: isMobileLayout || !isTabletLayout ? "auto" : "1 / -1",
            minHeight: isMobileLayout ? "auto" : 320,
            padding: isMobileLayout ? "32px 16px" : "64px 32px",
            borderRight: !isMobileLayout && !isTabletLayout ? bd : "none",
            borderBottom: isTabletLayout ? bd : "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 32,
            transition: SECTION_TRANSITION,
          }}
        >
          <div style={{ display: "grid", gap: 24, maxWidth: 520 }}>
            <span
              style={{
                color: COLORS.accent,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 12,
                lineHeight: "16px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              El siguiente paso
            </span>

            <h2
              style={{
                margin: 0,
                color: titleColor,
                fontFamily: FONTS.sans,
                fontSize: isMobileLayout ? 32 : 48,
                lineHeight: isMobileLayout ? "32px" : "56px",
                fontWeight: 900,
                letterSpacing: 0,
                transition: `color ${EASE}`,
              }}
            >
              No hace falta saberlo todo para{" "}
              <span style={{ color: COLORS.accent, fontFamily: FONTS.display }}>
                empezar.
              </span>
            </h2>

            <p
              style={{
                margin: 0,
                color: mutedColor,
                fontFamily: FONTS.sans,
                fontSize: 16,
                lineHeight: "32px",
                maxWidth: 28 * 16,
                transition: `color ${EASE}`,
              }}
            >
              La claridad sirve cuando te mueve. Elige tu punto de entrada segun
              lo que necesitas hacer ahora: entender mejor, hablarlo con otros o
              llevarlo a una organizacion.
            </p>
          </div>

          <p
            style={{
              margin: 0,
              color: titleColor,
              fontFamily: FONTS.display,
              fontSize: isMobileLayout ? 20 : 24,
              lineHeight: isMobileLayout ? "24px" : "28px",
              maxWidth: 18 * 16,
              transition: `color ${EASE}`,
            }}
          >
            Elegir una ruta ya es una forma de no aceptar por defecto.
          </p>
        </div>

        {ENTRY_POINTS.map((entry, index) => {
          const isLast = index === ENTRY_POINTS.length - 1;
          const spansFullTablet = isTabletLayout && !isMobileLayout && isLast;

          return (
            <Link
              key={entry.to}
              to={entry.to}
              onClick={scrollToTopImmediate}
              style={{
                gridColumn: spansFullTablet ? "1 / -1" : "auto",
                minHeight: isMobileLayout ? "auto" : 320,
                padding: isMobileLayout ? "32px 16px" : "64px 32px",
                borderRight: isMobileLayout
                  ? "none"
                  : isTabletLayout
                    ? spansFullTablet
                      ? "none"
                      : index % 2 === 0
                        ? bd
                        : "none"
                    : isLast
                      ? "none"
                      : bd,
                borderTop: isMobileLayout ? bd : spansFullTablet ? bd : "none",
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
              <div style={{ display: "grid", gap: 24, maxWidth: 26 * 16 }}>
                <span
                  style={{
                    color: COLORS.accent,
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 12,
                    lineHeight: "16px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {entry.label}
                </span>

                <h3
                  style={{
                    margin: 0,
                    color: titleColor,
                    fontFamily: FONTS.display,
                    fontSize: isMobileLayout ? 28 : 32,
                    lineHeight: isMobileLayout ? "32px" : "32px",
                    fontWeight: 900,
                    letterSpacing: 0,
                    transition: `color ${EASE}`,
                  }}
                >
                  {entry.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: mutedColor,
                    fontFamily: FONTS.sans,
                    fontSize: 16,
                    lineHeight: "32px",
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
                    color: titleColor,
                    fontFamily: FONTS.sans,
                    fontSize: 16,
                    lineHeight: "20px",
                    fontWeight: 800,
                    transition: `color ${EASE}`,
                  }}
                >
                  {entry.cta}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    color: COLORS.accent,
                    fontFamily: FONTS.display,
                    fontSize: 32,
                    lineHeight: "32px",
                  }}
                >
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
