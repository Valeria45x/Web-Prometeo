import { B } from "../constants";
import { L } from "../components/Primitives";
import { Page, PageHeader } from "../components/Page";
import GridMeta from "../components/GridMeta";
import RedCell from "../components/RedCell";
import StripeDecor from "../components/StripeDecor";

export default function Sigilo() {
  return (
    <Page>
      <PageHeader index="007" title="Tu Sigilo" />

      <GridMeta code="PRO-007" />

      {/* Descripción del ritual */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        <div
          style={{
            gridColumn: "span 3",
            borderRight: B,
            borderBottom: B,
            padding: "44px 40px",
          }}
        >
          <h2
            className="sub-title"
            style={{ color: "#d0d0d0", lineHeight: 1.4, marginBottom: 20 }}
          >
            El mismo gesto que el mito: tomar el fuego con tus propias manos.
          </h2>
          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 13,
              color: "#777",
              lineHeight: 1.8,
              maxWidth: "60ch",
            }}
          >
            Cada miembro de Prometeo puede generar su propio sigilo — una forma
            única que es su marca dentro de la marca. No se comparte
            públicamente. Es una herramienta de expresión propia. El ritual es
            el gesto de crear.
          </p>
        </div>
        <RedCell text="SIGILO" style={{ borderRight: B, borderBottom: B }} />
      </div>

      {/* Placeholder herramienta generativa */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderLeft: B,
          minHeight: "52vh",
        }}
      >
        <div
          style={{
            gridColumn: "span 3",
            borderRight: B,
            borderBottom: B,
            background: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            padding: "60px 40px",
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              border: "1px solid #1e1e1e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 9,
                color: "#333",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Generador — Próximamente
            </span>
          </div>
          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 12,
              color: "#444",
              textAlign: "center",
              maxWidth: "36ch",
              lineHeight: 1.7,
            }}
          >
            La herramienta generativa de sigilos estará disponible en breve para
            miembros de Prometeo.
          </p>
        </div>

        {/* Parámetros — vacíos por ahora */}
        <div
          style={{
            borderRight: B,
            borderBottom: B,
            background: "#0f0f0f",
            padding: "32px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          <L style={{ color: "#333", marginBottom: 24 }}>Parámetros</L>
          {["Forma base", "Densidad", "Rotación", "Variación"].map((p, i) => (
            <div
              key={i}
              style={{
                borderTop: "1px solid #1a1a1a",
                padding: "16px 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <L style={{ color: "#2a2a2a" }}>{p}</L>
              <L style={{ color: "#1e1e1e" }}>—</L>
            </div>
          ))}
        </div>
      </div>

      {/* Info miembros */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        {[
          { label: "01", title: "Exclusivo para miembros", text: "El sigilo es una herramienta para usuarios registrados de Prometeo." },
          { label: "02", title: "No se comparte", text: "El resultado es tuyo. No aparece en ningún feed ni se indexa." },
          { label: "03", title: "El gesto es el ritual", text: "Crear el sigilo es en sí mismo el acto de pertenencia." },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              borderRight: B,
              borderBottom: B,
              padding: "36px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              background: i === 1 ? "#0f0f0f" : undefined,
            }}
          >
            <L style={{ color: "#333" }}>{item.label}</L>
            <h3 className="sub-title" style={{ color: "#888" }}>{item.title}</h3>
            <p
              style={{
                fontFamily: '"Funnel Sans", sans-serif',
                fontSize: 12,
                color: "#555",
                lineHeight: 1.7,
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
        <RedCell text="PRO-007" style={{ borderRight: B, borderBottom: B }} />
      </div>

      <div style={{ borderLeft: B, borderRight: B }}>
        <StripeDecor />
      </div>
    </Page>
  );
}
