import { B } from "../constants";
import { L } from "../components/Primitives";
import { Page, PageHeader } from "../components/Page";
import GridMeta from "../components/GridMeta";
import RedCell from "../components/RedCell";
import StripeDecor from "../components/StripeDecor";

export default function Contacto() {
  return (
    <Page>
      <PageHeader index="005" title="Contacto" />

      <GridMeta code="PRO-005" />

      {/* Declaración + formulario */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderLeft: B,
          minHeight: "50vh",
        }}
      >
        <div
          style={{
            gridColumn: "span 2",
            borderRight: B,
            borderBottom: B,
            background: "#0f0f0f",
            padding: "44px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <L style={{ color: "#444" }}>Hablemos</L>
          <h2
            className="sub-title"
            style={{ color: "#c0c0c0", lineHeight: 1.4 }}
          >
            Preguntas sobre certificación, colaboraciones o simplemente algo que
            querías contar.
          </h2>
          <div style={{ display: "flex", gap: 28 }}>
            <L style={{ color: "#FF3C54", cursor: "pointer" }}>Instagram →</L>
            <L style={{ color: "#555", cursor: "pointer" }}>TikTok →</L>
          </div>
        </div>

        <div
          style={{
            gridColumn: "span 2",
            borderRight: B,
            borderBottom: B,
            padding: "44px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <L style={{ color: "#333" }}>Formulario</L>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 0,
            }}
          >
            {[
              ["Email", "tu@email.com"],
              ["Asunto", "Certificación / Colaboración / Otro"],
              ["Mensaje", "Escribe aquí..."],
            ].map(([label, ph], i) => (
              <div
                key={i}
                style={{ borderTop: "1px solid #1e1e1e", padding: "18px 0" }}
              >
                <L style={{ color: "#333", display: "block", marginBottom: 6 }}>
                  {label}
                </L>
                <L style={{ color: "#252525" }}>{ph}</L>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <L style={{ color: "#FF3C54", cursor: "pointer" }}>→ Enviar</L>
          </div>
        </div>
      </div>

      {/* Canales + info */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderLeft: B,
        }}
      >
        {[
          { label: "Instagram", handle: "@prometeo.privacidad", link: true },
          { label: "TikTok", handle: "@prometeo", link: true },
          { label: "Certificación", handle: "→ Solicitar", link: false },
          { label: "Comunidad", handle: "→ Foro", link: false },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              borderRight: B,
              borderBottom: B,
              background: i % 2 === 0 ? undefined : "#0a0a0a",
              padding: "24px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <L style={{ color: "#444" }}>{s.label}</L>
            <L style={{ color: s.link ? "#FF3C54" : "#333" }}>{s.handle}</L>
          </div>
        ))}
      </div>

      {/* RedCell esquina */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderLeft: B,
        }}
      >
        <div
          style={{
            gridColumn: "span 3",
            borderRight: B,
            borderBottom: B,
            padding: "28px 40px",
            background: "#0a0a0a",
          }}
        >
          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 12,
              color: "#333",
              lineHeight: 1.7,
            }}
          >
            Prometeo responde en 2–3 días laborables. Para certificaciones
            urgentes, indícalo en el asunto.
          </p>
        </div>
        <RedCell text="PRO-005" style={{ borderRight: B, borderBottom: B }} />
      </div>

      <div style={{ borderLeft: B, borderRight: B }}>
        <StripeDecor />
      </div>
    </Page>
  );
}
