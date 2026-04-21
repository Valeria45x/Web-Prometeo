import { B } from "../constants";
import { L } from "./Primitives";

export default function Footer() {
  return (
    <footer
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderLeft: B,
        background: "#ff3c54",
      }}
    >
      <div
        style={{
          gridColumn: "span 3",
          borderRight: B,
          borderBottom: B,
          display: "flex",
          alignItems: "center",
          padding: "18px 24px",
          background: "#ff3c54",
        }}
      >
        <L style={{ color: "#160509" }}>Prometeo — proyectoprometeo.info</L>
      </div>
      <div
        style={{
          borderRight: B,
          borderBottom: B,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "18px 24px",
          background: "#ff3c54",
        }}
      >
        <L style={{ color: "#160509" }}>v6</L>
      </div>
    </footer>
  );
}
