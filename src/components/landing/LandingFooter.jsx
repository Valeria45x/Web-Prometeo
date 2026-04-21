import { TH } from "../../constants";
import { EASE, DARK_GRID, LIGHT_GRID } from "./theme";
import { L } from "../Primitives";

export default function LandingFooter({ light }) {
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const CT = `background ${EASE}, border-color ${EASE}`;

  return (
    <footer
      className="reveal-footer"
      style={{
        position: "sticky",
        top: TH,
        zIndex: 1,
        height: `calc(100vh - ${TH}px)`,
        background: "#ff3c54",
        borderTop: bd,
        borderLeft: bd,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "40px 48px 0",
        overflow: "hidden",
        transition: CT,
      }}
    >
      <div
        className="lf-bottom"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div className="lf-links" style={{ display: "flex", gap: 40 }}>
          <L style={{ color: "#160509", transition: `color ${EASE}` }}>
            Instagram ↗
          </L>
          <L style={{ color: "#160509", transition: `color ${EASE}` }}>
            TikTok ↗
          </L>
          <L style={{ color: "#160509", transition: `color ${EASE}` }}>
            hola@prometeo.info ↗
          </L>
        </div>
      </div>

      <h2
        style={{
          fontFamily: '"Funnel Display", serif',
          fontSize: "clamp(4.5rem, 13vw, 15rem)",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "-0.04em",
          lineHeight: 0.85,
          color: "#5c1220",
          margin: 0,
          paddingBottom: "0.05em",
          transition: `color ${EASE}`,
          userSelect: "none",
        }}
      >
        Prometeo
      </h2>
    </footer>
  );
}
