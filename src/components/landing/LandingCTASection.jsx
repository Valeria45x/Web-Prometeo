import { Link } from "react-router-dom";
import { COLORS, FONTS } from "../../design/tokens";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Button from "../system/Button";
import { DARK_GRID, EASE, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";

const ACTIONS = [
  {
    label: "Personas",
    body: "Para entender lo que aceptas, preguntar desde casos reales y actuar con más criterio en tu vida digital.",
    links: [
      { label: "Ir a Para ti", to: "/para-ti", variant: "primary" },
      { label: "Leer artículos", to: "/articulos", variant: "outline" },
      { label: "Entrar en comunidad", to: "/comunidad", variant: "outline" },
    ],
  },
  {
    label: "Empresas",
    body: "Para equipos que quieren convertir su compromiso con la privacidad en señales claras y verificables.",
    links: [
      { label: "Ir a Empresas", to: "/empresas", variant: "primary" },
      { label: "Ver certificación", to: "/certificacion", variant: "outline" },
      { label: "Contactar", to: "/contacto", variant: "outline" },
    ],
  },
  {
    label: "Orientación",
    body: "Si no tienes claro qué camino encaja contigo, cuéntanos tu caso y te ayudamos a ubicar el siguiente paso.",
    links: [
      { label: "Hablar con Prometeo", to: "/contacto", variant: "primary" },
      { label: "Conocer el proyecto", to: "/proyecto", variant: "outline" },
    ],
  },
];

export default function LandingCTASection({ light = false }) {
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const bg = light ? PAGE_LIGHT_BG : COLORS.canvasDark;
  const cardBg = light ? COLORS.canvasLight : "#101010";
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? COLORS.textOnLight : COLORS.textOnDark;
  const mutedColor = light ? COLORS.textMutedLight : COLORS.textMutedDark;
  const surface = light ? "light" : "dark";
  const stickyHeight = "calc(100svh - var(--prometeo-topbar-height))";

  return (
    <section
      className="landing-cta-section"
      style={{
        minHeight: isMobileLayout
          ? "auto"
          : `calc(${ACTIONS.length} * ${stickyHeight})`,
        background: bg,
        color: titleColor,
        display: "grid",
        gridTemplateColumns: isMobileLayout
          ? "minmax(0, 1fr)"
          : "repeat(4, minmax(0, 1fr))",
        alignItems: "start",
        borderTop: bd,
        transition: `background ${EASE}, color ${EASE}`,
      }}
    >
      <div
        style={{
          gridColumn: isMobileLayout ? "auto" : "span 2",
          position: isMobileLayout ? "relative" : "sticky",
          top: isMobileLayout ? "auto" : "var(--prometeo-topbar-height)",
          minHeight: isMobileLayout ? "auto" : stickyHeight,
          borderRight: isMobileLayout ? 0 : bd,
          borderBottom: isMobileLayout ? bd : 0,
          padding: isMobileLayout
            ? "var(--s64) var(--s16)"
            : "var(--s128) var(--s64)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "var(--s32)",
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.sans,
            fontSize: isMobileLayout ? 40 : 64,
            fontWeight: 900,
            lineHeight: isMobileLayout ? "40px" : "64px",
            letterSpacing: 0,
            margin: 0,
            maxWidth: "12ch",
          }}
        >
          Elige tu punto de entrada.
        </h2>
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 16,
            lineHeight: "32px",
            color: mutedColor,
            margin: 0,
            maxWidth: "34ch",
          }}
        >
          Prometeo acompaña a personas y organizaciones desde necesidades
          distintas. Empieza por el recorrido que mejor encaja contigo.
        </p>
      </div>

      <div
        style={{
          gridColumn: isMobileLayout ? "auto" : "span 2",
          minHeight: isMobileLayout
            ? "auto"
            : `calc(${ACTIONS.length} * ${stickyHeight})`,
          display: "block",
        }}
      >
        {ACTIONS.map((action, index) => (
          <div
            key={action.label}
            style={{
              position: isMobileLayout ? "relative" : "sticky",
              top: isMobileLayout
                ? "auto"
                : `calc(var(--prometeo-topbar-height) + ${index * 16}px)`,
              zIndex: index + 1,
              minHeight: isMobileLayout
                ? "auto"
                : `calc(${stickyHeight} - ${index * 16}px)`,
              borderTop: index === 0 ? 0 : bd,
              borderBottom:
                isMobileLayout && index === ACTIONS.length - 1 ? 0 : bd,
              background: index % 2 === 0 ? bg : cardBg,
              padding: isMobileLayout ? "var(--s32) var(--s16)" : "var(--s64)",
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              gap: isMobileLayout ? "var(--s16)" : "var(--s32)",
              alignItems: "start",
              transition: `background ${EASE}`,
            }}
          >
            <div style={{ display: "grid", gap: "var(--s16)" }}>
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 12,
                  lineHeight: "16px",
                  color: COLORS.accent,
                }}
              >
                0{index + 1}
              </span>
              <h3
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: isMobileLayout ? 32 : 48,
                  fontWeight: 900,
                  lineHeight: isMobileLayout ? "32px" : "48px",
                  color: titleColor,
                  margin: 0,
                  maxWidth: "12ch",
                }}
              >
                {action.label}
              </h3>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: isMobileLayout ? "flex-start" : "center",
              }}
            >
              <p
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 16,
                  lineHeight: "32px",
                  color: mutedColor,
                  margin: 0,
                  maxWidth: "36ch",
                }}
              >
                {action.body}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--s16)",
                alignItems: "center",
              }}
            >
              {action.links.map((link) => (
                <Button
                  key={link.to}
                  as={Link}
                  to={link.to}
                  variant={link.variant}
                  surface={surface}
                  size="md"
                  font="sans"
                >
                  {link.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
