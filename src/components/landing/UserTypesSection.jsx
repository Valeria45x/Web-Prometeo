import { useState } from "react";
import { Link } from "react-router-dom";
import { EASE, DARK_GRID, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";
import { L } from "../Primitives";

const USER_TYPES = [
  {
    label: "Personas",
    title: "Aprende sobre privacidad digital",
    description:
      "Artículos, guías y mejores prácticas para proteger tus datos.",
    to: "/articulos",
    cta: "Explorar artículos",
  },
  {
    label: "Empresas",
    title: "Certifícate como privacidad-friendly",
    description: "Demuestra que tu empresa se toma la privacidad en serio.",
    to: "/certificacion",
    cta: "Conocer certificación",
  },
  {
    label: "Comunidad",
    title: "Conecta con otros usuarios",
    description: "Comparte dudas, experiencias y aprende en comunidad.",
    to: "/comunidad",
    cta: "Unirse a la comunidad",
  },
];

export default function UserTypesSection({ light }) {
  const bg = light ? PAGE_LIGHT_BG : "#0a0a0a";
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? "#0a0a0a" : "#e4e4e4";
  const subColor = light ? "#6b6b6b" : "#8a8a8a";
  const cardBg = light ? "#e7eaee" : "#1a1d20";
  const cardHoverBg = light ? "#d6d6d6" : "#2b2f34";
  const accentColor = "#ff3c54";
  const CT = `background ${EASE}, border-color ${EASE}`;

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section
      className="user-types-section"
      style={{
        background: bg,
        borderTop: bd,
        borderLeft: bd,
        borderRight: bd,
        padding: "96px 48px",
        transition: CT,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 72, maxWidth: "60ch" }}>
        <L style={{ color: accentColor, marginBottom: 16, display: "block" }}>
          Para todos
        </L>
        <h2
          style={{
            fontFamily: "Funnel Display, serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 1.05,
            fontWeight: 900,
            color: titleColor,
            margin: "0 0 24px",
            letterSpacing: "-0.02em",
          }}
        >
          Explora Prometeo según tu perfil
        </h2>
        <p
          style={{
            fontFamily: '"Funnel Sans", sans-serif',
            fontSize: 16,
            lineHeight: 1.65,
            color: subColor,
            margin: 0,
          }}
        >
          Eres persona, empresa o simplemente alguien interesado en la
          privacidad digital. Aquí encontrarás exactamente lo que necesitas.
        </p>
      </div>

      {/* Grid de tipos de usuarios */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24,
        }}
      >
        {USER_TYPES.map((userType, index) => (
          <Link
            key={userType.label}
            to={userType.to}
            style={{ textDecoration: "none" }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              style={{
                background: hoveredIndex === index ? cardHoverBg : cardBg,
                border: bd,
                padding: 32,
                display: "flex",
                flexDirection: "column",
                gap: 24,
                minHeight: 280,
                cursor: "pointer",
                transition: `background ${EASE}, transform 0.2s ease`,
                transform:
                  hoveredIndex === index ? "translateY(-4px)" : "translateY(0)",
              }}
            >
              {/* Label accent */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 8,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: accentColor,
                    backgroundColor: light
                      ? "rgba(255,60,84,0.1)"
                      : "rgba(255,60,84,0.15)",
                    padding: "6px 12px",
                  }}
                >
                  {userType.label}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3
                  style={{
                    fontFamily: "Funnel Display, serif",
                    fontSize: 20,
                    lineHeight: 1.2,
                    fontWeight: 900,
                    color: titleColor,
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {userType.title}
                </h3>
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: '"Funnel Sans", sans-serif',
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: subColor,
                  margin: 0,
                  flex: 1,
                }}
              >
                {userType.description}
              </p>

              {/* CTA */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: '"Funnel Sans", sans-serif',
                    fontSize: 13,
                    fontWeight: 600,
                    color: accentColor,
                  }}
                >
                  {userType.cta}
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 12,
                    color: accentColor,
                    opacity: hoveredIndex === index ? 1 : 0.5,
                    transition: `opacity ${EASE}`,
                  }}
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
