import { useState } from "react";
import { Link } from "react-router-dom";
import { TH } from "../../constants";
import { EASE, DARK_GRID, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";
import { useReveal } from "../../hooks/useReveal";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { L } from "../Primitives";
import Button from "../system/Button";

const MISSION_PANELS = [
  {
    label: "Educación",
    title: "educación.",
    body: "Contenido claro, visual y directo para entender mejor la privacidad digital y cómo nos afecta.",
    to: "/articulos",
    cta: "Ir a artículos",
  },
  {
    label: "Certificación",
    title: "certificación.",
    body: "Una manera clara de demostrar que una empresa cumple y se toma la privacidad en serio, para que las personas puedan reconocerlo al instante.",
    to: "/certificacion",
    cta: "Ir a certificación",
  },
  {
    label: "Comunidad",
    title: "comunidad.",
    body: "Hacer de la privacidad un habito natural y compartido, integrandola en el dia a dia para que deje de ser un concepto tecnico y pase a ser un valor comun.",
    to: "/tienda",
    cta: "Ir a tienda",
  },
];

export default function FrentesSection({ light }) {
  const [rTitle, sTitle] = useReveal(0, true);
  const [rContent, sContent] = useReveal(140, true);
  const [rAction, sAction] = useReveal(240, true);
  const [activeIndex, setActiveIndex] = useState(0);
  const isCompactLayout = useMediaQuery("(max-width: 1024px)");
  const activePanel = MISSION_PANELS[activeIndex];

  const bg = light ? PAGE_LIGHT_BG : "#0a0a0a";
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? "#0a0a0a" : "#e4e4e4";
  const subColor = light ? "#6b6b6b" : "#8a8a8a";
  const accentColor = "#ff3c54";
  const accentTextOnFill = "#1a0509";
  const footerNumberColor = "#5c1220";
  const CT = `background ${EASE}, border-color ${EASE}`;

  if (isCompactLayout) {
    return (
      <section
        className="mission-section mission-section--compact"
        style={{
          borderTop: bd,
          borderLeft: bd,
          background: bg,
          transition: CT,
        }}
      >
        <div style={{ padding: "32px 16px", display: "grid", gap: 32 }}>
          <div ref={rTitle} style={sTitle}>
            <L style={{ color: accentColor, transition: `color ${EASE}` }}>
              Prometeo promueve la privacidad digital mediante
            </L>
          </div>

          <div
            className="mission-mobile-card"
            style={{
              display: "grid",
              borderTop: bd,
              borderLeft: bd,
              transition: CT,
            }}
          >
            <div
              className="mission-panel-list"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                transition: CT,
              }}
            >
              {MISSION_PANELS.map((panel, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={panel.label}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="mission-panel mission-panel--compact"
                    aria-pressed={isActive}
                    aria-label={`Abrir ${panel.label}`}
                    style={{
                      border: "none",
                      borderRight: bd,
                      borderBottom: bd,
                      background: isActive ? accentColor : "transparent",
                      padding: 16,
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      cursor: "pointer",
                      transition: `background ${EASE}, border-color ${EASE}`,
                    }}
                  >
                    <span
                      className="mission-panel-label"
                      style={{
                        fontFamily: '"Funnel Display", serif',
                        fontSize: 16,
                        lineHeight: "32px",
                        fontWeight: 800,
                        letterSpacing: 0,
                        textTransform: "uppercase",
                        color: isActive ? accentTextOnFill : titleColor,
                        transition: `color ${EASE}`,
                      }}
                    >
                      {panel.label}
                    </span>

                    <span
                      className="mission-panel-status"
                      style={{
                        fontFamily: '"Funnel Sans", sans-serif',
                        fontSize: 8,
                        lineHeight: "16px",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: isActive ? footerNumberColor : subColor,
                        transition: `color ${EASE}`,
                      }}
                    >
                      {isActive ? "Activa" : "Abrir"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              ref={rContent}
              style={{
                ...sContent,
                borderRight: bd,
                borderBottom: bd,
                padding: 16,
                display: "grid",
                gap: 16,
                background: light
                  ? "rgba(255, 60, 84, 0.04)"
                  : "rgba(255, 255, 255, 0.02)",
                transition: `${sContent.transition}, ${CT}`,
              }}
            >
              <h2
                className="section-title"
                style={{
                  color: titleColor,
                  lineHeight: "32px",
                  margin: 0,
                  maxWidth: "12ch",
                  textWrap: "balance",
                  transition: `color ${EASE}`,
                }}
              >
                {activePanel.title}
              </h2>

              <p
                style={{
                  fontFamily: '"Funnel Sans", sans-serif',
                  fontSize: 16,
                  color: subColor,
                  lineHeight: "32px",
                  maxWidth: "34ch",
                  margin: 0,
                  textWrap: "pretty",
                  transition: `color ${EASE}`,
                }}
              >
                {activePanel.body}
              </p>

              <div ref={rAction} style={{ ...sAction, marginTop: 4 }}>
                <Button
                  as={Link}
                  to={activePanel.to}
                  variant="outline"
                  surface={light ? "light" : "dark"}
                  emphasis="neutral"
                  font="sans"
                  size="lg"
                  fullWidth
                  align="start"
                >
                  {activePanel.cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="mission-section"
      style={{
        minHeight: "65vh",
        borderTop: bd,
        borderLeft: bd,
        background: bg,
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        transition: CT,
      }}
    >
      <div
        style={{
          borderRight: bd,
          gridColumn: "span 2",
          padding: `${TH}px 64px 64px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 32,
          transition: CT,
        }}
      >
        <div ref={rTitle} style={sTitle}>
          <L style={{ color: accentColor, transition: `color ${EASE}` }}>
            Prometeo promueve la privacidad digital mediante
          </L>
        </div>

        <div ref={rContent} style={{ ...sContent, display: "grid", gap: 16 }}>
          <h2
            className="section-title"
            style={{
              color: titleColor,
              lineHeight: "64px",
              maxWidth: "11ch",
              margin: 0,
              transition: `color ${EASE}`,
            }}
          >
            {activePanel.title}
          </h2>

          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 16,
              color: subColor,
              lineHeight: "32px",
              maxWidth: "35ch",
              margin: 0,
              transition: `color ${EASE}`,
            }}
          >
            {activePanel.body}
          </p>
        </div>

        <div ref={rAction} style={{ ...sAction, display: "flex", flexDirection: "column", gap: 16 }}>
          <Button
            as={Link}
            to={activePanel.to}
            variant="outline"
            surface={light ? "light" : "dark"}
            emphasis="neutral"
            font="sans"
            size="lg"
            align="start"
            style={{ alignSelf: "flex-start", minWidth: "22ch" }}
          >
            {activePanel.cta}
          </Button>
        </div>
      </div>

      <div
        className="mission-grid"
        style={{
          display: "grid",
          gridColumn: "span 2",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        }}
      >
        {MISSION_PANELS.map((panel, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={panel.label}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="mission-panel"
              aria-pressed={isActive}
              aria-label={`Abrir ${panel.label}`}
              style={{
                border: "none",
                borderRight: index < MISSION_PANELS.length - 1 ? bd : undefined,
                background: isActive ? accentColor : "transparent",
                padding: "32px",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 16,
                cursor: "pointer",
                transition: `background ${EASE}, border-color ${EASE}, transform 0.2s ease`,
              }}
            >
              <span
                className="mission-panel-status"
                style={{
                  fontFamily: '"Funnel Sans", sans-serif',
                  fontSize: 8,
                  lineHeight: "16px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: isActive ? footerNumberColor : subColor,
                  transition: `color ${EASE}`,
                }}
              >
                {isActive ? "Seleccionada" : "Haz clic"}
              </span>

              <p
                className="mission-panel-number"
                style={{
                  fontFamily: '"Funnel Display", serif',
                  fontSize: 64,
                  lineHeight: "64px",
                  fontWeight: 800,
                  letterSpacing: 0,
                  color: isActive ? footerNumberColor : titleColor,
                  margin: 0,
                  transition: `color ${EASE}`,
                }}
              >
                0{index + 1}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
