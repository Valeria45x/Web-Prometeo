import { useState } from "react";
import { Link } from "react-router-dom";
import { TH } from "../../constants";
import { EASE, DARK_GRID, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";
import { useReveal } from "../../hooks/useReveal";
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
  const [rTitle, sTitle] = useReveal(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activePanel = MISSION_PANELS[activeIndex];

  const bg = light ? PAGE_LIGHT_BG : "#0a0a0a";
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? "#0a0a0a" : "#e4e4e4";
  const subColor = light ? "#6b6b6b" : "#8a8a8a";
  const accentColor = "#ff3c54";
  const accentTextOnFill = "#1a0509";
  const footerNumberColor = "#5c1220";
  const CT = `background ${EASE}, border-color ${EASE}`;

  return (
    <section
      className="mission-section"
      style={{
        minHeight: "65vh",
        borderTop: bd,
        borderLeft: bd,
        background: bg,
        display: "grid",
        gridTemplateColumns: "1.15fr 0.85fr",
        transition: CT,
      }}
    >
      <div
        style={{
          borderRight: bd,
          padding: `${TH}px 48px 52px`,
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
          <h2
            className="section-title"
            style={{
              color: titleColor,
              lineHeight: 1.02,
              maxWidth: "11ch",
              margin: "18px 0 0",
              transition: `color ${EASE}`,
            }}
          >
            {activePanel.title}
          </h2>

          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 18,
              color: subColor,
              lineHeight: 1.6,
              maxWidth: "35ch",
              margin: "18px 0 0",
              transition: `color ${EASE}`,
            }}
          >
            {activePanel.body}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Button
            as={Link}
            to={activePanel.to}
            variant="outline"
            surface={light ? "light" : "dark"}
            emphasis="neutral"
            font="sans"
            size="lg"
            align="start"
            style={{ minWidth: 240 }}
          >
            {activePanel.cta}
          </Button>
        </div>
      </div>

      <div
        className="mission-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
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
                padding: "24px 26px",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 18,
                cursor: "pointer",
                transition: `background ${EASE}, border-color ${EASE}, transform 0.2s ease`,
              }}
            >
              <span
                className="mission-panel-status"
                style={{
                  fontFamily: '"Funnel Sans", sans-serif',
                  fontSize: 11,
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
                  fontSize: "clamp(1.8rem, 4.5vw, 4.8rem)",
                  lineHeight: 0.92,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
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
