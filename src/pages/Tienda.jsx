import { B } from "../constants";
import { L } from "../components/Primitives";
import { Page, PageHeader } from "../components/Page";

const products = ["Joyería", "Camisas", "Gorros", "Pegatinas"];

export default function Tienda() {
  return (
    <Page>
      <PageHeader index="003" title="Tienda" />

      {/* Producto destacado */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B, minHeight: "46vh" }}>
        <div style={{ gridColumn: "span 2", borderRight: B, borderBottom: B, background: "#111", padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <L style={{ color: "#444" }}>Destacado</L>
          <h2 className="section-title" style={{ color: "#e0e0e0" }}>Lorem ipsum<br />dolor sit.</h2>
          <L style={{ color: "#555" }}>→ Ver producto</L>
        </div>
        <div style={{ borderRight: B, borderBottom: B, background: "#0f0f0f", padding: "36px 28px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 12 }}>
          <L style={{ color: "#333" }}>Lorem ipsum</L>
          <h3 className="sub-title" style={{ color: "#777" }}>Lorem ipsum<br />dolor.</h3>
        </div>
        <div style={{ borderRight: B, borderBottom: B, background: "#141414", padding: "36px 28px", display: "flex", alignItems: "flex-end" }}>
          <h3 className="sub-title" style={{ color: "#555" }}>Lorem. →</h3>
        </div>
      </div>

      {/* Cuadrícula de productos */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        {products.map((p, i) => (
          <div key={i} style={{ borderRight: B, borderBottom: B, background: i % 2 === 1 ? "#0f0f0f" : undefined, padding: "36px 32px", minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
            <L>{String(i + 1).padStart(2, "0")}</L>
            <h3 className="sub-title" style={{ color: "#d0d0d0" }}>{p}.</h3>
            <L style={{ color: "#444" }}>→ Lorem ipsum</L>
          </div>
        ))}
      </div>
    </Page>
  );
}
