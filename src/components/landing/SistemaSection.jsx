import { TH } from "../../constants";
import { useReveal } from "../../hooks/useReveal";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { EASE, DARK_GRID, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";

const SCALE = [4, 8, 16, 32, 64, 128, 256];

export default function SistemaSection({ light }) {
  const [rLabel, sLabel] = useReveal(0, true);
  const [rTitle, sTitle] = useReveal(80, true);
  const [rBody, sBody] = useReveal(180, true);
  const [rGrid, sGrid] = useReveal(260, true);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const bg = light ? PAGE_LIGHT_BG : "#0a0a0a";
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? "#0a0a0a" : "#e4e4e4";
  const mutedColor = light ? "#6b6b6b" : "#8a8a8a";
  const accentColor = "#ff3c54";
  const CT = `background ${EASE}, border-color ${EASE}`;

  if (isMobile) {
    return (
      <section
        style={{
          borderTop: bd,
          background: bg,
          transition: CT,
        }}
      >
        {/* Label row */}
        <div
          style={{
            borderBottom: bd,
            padding: "16px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              letterSpacing: "0.1em",
              color: mutedColor,
            }}
          >
            000 — El sistema
          </span>
        </div>

        {/* Title */}
        <div
          ref={rTitle}
          style={{
            ...sTitle,
            borderBottom: bd,
            padding: "32px 16px",
          }}
        >
          <h2
            className="section-title"
            style={{
              color: titleColor,
              lineHeight: "32px",
              margin: 0,
              textWrap: "balance",
              transition: `color ${EASE}`,
            }}
          >
            Prometeo es un sistema.
          </h2>
        </div>

        {/* Body */}
        <div
          ref={rBody}
          style={{
            ...sBody,
            borderBottom: bd,
            padding: "32px 16px",
          }}
        >
          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 16,
              lineHeight: "32px",
              color: mutedColor,
              margin: 0,
              transition: `color ${EASE}`,
            }}
          >
            No un artículo suelto, no una app cerrada, no un logo. Un sistema
            para entender, conversar, hacer visible y demostrar privacidad
            digital desde la{" "}
            <span style={{ color: accentColor }}>claridad.</span>
          </p>
        </div>

        {/* AES scale */}
        <div
          ref={rGrid}
          style={{
            ...sGrid,
            borderBottom: bd,
            padding: "32px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              letterSpacing: "0.1em",
              color: mutedColor,
            }}
          >
            AES-256 → escala de diseño
          </span>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
            {SCALE.map((v) => (
              <div key={v} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: Math.min(v, 40),
                    height: Math.min(v, 40),
                    background: accentColor,
                    opacity: 0.1 + (SCALE.indexOf(v) * 0.12),
                  }}
                />
                <span style={{ fontFamily: "monospace", fontSize: 7, color: mutedColor }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      style={{
        borderTop: bd,
        background: bg,
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        transition: CT,
      }}
    >
      {/* Col 1: label + index */}
      <div
        style={{
          borderRight: bd,
          padding: `${TH}px 32px 64px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 32,
          transition: CT,
        }}
      >
        <div ref={rLabel} style={sLabel}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              letterSpacing: "0.1em",
              color: mutedColor,
            }}
          >
            000
          </span>
        </div>
        {/* AES scale visualization */}
        <div
          ref={rGrid}
          style={{
            ...sGrid,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 7,
              letterSpacing: "0.1em",
              color: mutedColor,
              opacity: 0.6,
            }}
          >
            AES-256
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {SCALE.map((v, i) => (
              <div key={v} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: Math.min(v, 32),
                    height: 4,
                    background: accentColor,
                    opacity: 0.12 + i * 0.12,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontFamily: "monospace", fontSize: 7, color: mutedColor, opacity: 0.5 }}>
                  {v}px
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cols 2-3: main copy */}
      <div
        style={{
          borderRight: bd,
          gridColumn: "span 2",
          padding: `${TH}px 64px 64px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 48,
          transition: CT,
        }}
      >
        <div ref={rTitle} style={{ ...sTitle, display: "flex", flexDirection: "column", gap: 32 }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              letterSpacing: "0.1em",
              color: mutedColor,
            }}
          >
            El sistema
          </span>
          <h2
            className="section-title"
            style={{
              color: titleColor,
              lineHeight: "64px",
              margin: 0,
              transition: `color ${EASE}`,
            }}
          >
            Prometeo es un sistema.
          </h2>
        </div>

        <div ref={rBody} style={sBody}>
          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 16,
              lineHeight: "32px",
              color: mutedColor,
              margin: 0,
              maxWidth: "38ch",
              transition: `color ${EASE}`,
            }}
          >
            No un artículo suelto, no una app cerrada, no un logo. Un sistema
            para entender, conversar, hacer visible y demostrar privacidad
            digital desde la{" "}
            <span style={{ color: accentColor }}>claridad.</span>
          </p>
          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 16,
              lineHeight: "32px",
              color: mutedColor,
              margin: "32px 0 0",
              maxWidth: "38ch",
              transition: `color ${EASE}`,
            }}
          >
            Su retícula nace de AES-256: una escala de potencias de dos que
            convierte la privacidad en una experiencia ordenada, reconocible y
            precisa.
          </p>
        </div>
      </div>

      {/* Col 4: stats */}
      <div
        style={{
          padding: `${TH}px 32px 64px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 48,
          transition: CT,
        }}
      >
        {[
          { value: "4", label: "Columnas de retícula" },
          { value: "256", label: "Unidad base criptográfica" },
          { value: "3", label: "Frentes de acción" },
        ].map(({ value, label }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span
              style={{
                fontFamily: '"Funnel Display", serif',
                fontSize: 48,
                fontWeight: 900,
                lineHeight: 1,
                color: accentColor,
              }}
            >
              {value}
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 8,
                color: mutedColor,
                letterSpacing: "0.08em",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
