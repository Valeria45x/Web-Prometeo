import { B } from "../constants";
import { L } from "./Primitives";

export default function Footer() {
  return (
    <footer style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
      <div style={{ gridColumn: "span 3", borderRight: B, borderBottom: B, display: "flex", alignItems: "center", padding: "18px 24px" }}>
        <L style={{ color: "#252525" }}>
          Proyecto Prometeo — Valeria Cabrera · UDIT 2025/26 · proyectoprometeo.info
        </L>
      </div>
      <div style={{ borderRight: B, borderBottom: B, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "18px 24px", background: "#0a0a0a" }}>
        <L style={{ color: "#252525" }}>v6</L>
      </div>
    </footer>
  );
}
