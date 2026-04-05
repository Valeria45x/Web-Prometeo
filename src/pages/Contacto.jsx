import { B } from "../constants";
import { L } from "../components/Primitives";
import { Page, PageHeader } from "../components/Page";

export default function Contacto() {
  return (
    <Page>
      <PageHeader index="005" title="Contacto" />

      {/* Declaración izquierda + formulario derecha */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B, minHeight: "50vh" }}>
        <div style={{ gridColumn: "span 2", borderRight: B, borderBottom: B, background: "#0f0f0f", padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <L style={{ color: "#444" }}>Lorem ipsum</L>
          <h2 className="sub-title" style={{ color: "#c0c0c0", lineHeight: 1.4 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.
          </h2>
          <div style={{ display: "flex", gap: 28 }}>
            <L style={{ color: "#555" }}>Instagram →</L>
            <L style={{ color: "#555" }}>TikTok →</L>
          </div>
        </div>

        <div style={{ gridColumn: "span 2", borderRight: B, borderBottom: B, padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <L>Formulario</L>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>
            {[["Email", "lorem@ipsum.com"], ["Asunto", "Lorem ipsum"], ["Mensaje", "Lorem ipsum dolor sit..."]].map(([label, ph], i) => (
              <div key={i} style={{ borderTop: "1px solid #1e1e1e", padding: "18px 0" }}>
                <L style={{ color: "#252525", display: "block", marginBottom: 6 }}>{label}</L>
                <L style={{ color: "#333" }}>{ph}</L>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <L style={{ color: "#444" }}>→ Enviar</L>
          </div>
        </div>
      </div>

      {/* Canales sociales */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        {["Instagram", "TikTok", "Lorem", "Ipsum"].map((s, i) => (
          <div key={i} style={{ borderRight: B, borderBottom: B, background: i % 2 === 0 ? undefined : "#0a0a0a", padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <L style={{ color: "#444" }}>{s}</L>
            <L style={{ color: "#333" }}>→</L>
          </div>
        ))}
      </div>
    </Page>
  );
}
