import { TH } from "../../constants";
import { EASE, DARK_GRID, LIGHT_GRID } from "./theme";
import { L } from "../Primitives";

export default function LandingFooter({ light, mobileFlow = false }) {
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const CT = `background ${EASE}, border-color ${EASE}`;

  return (
    <footer
      className={`landing-footer ${mobileFlow ? "landing-footer--flow" : "reveal-footer"}`}
      style={{
        position: mobileFlow ? "relative" : "sticky",
        top: mobileFlow ? "auto" : TH,
        zIndex: 1,
        height: mobileFlow ? "auto" : `calc(100vh - ${TH}px)`,
        background: "#ff3c54",
        borderTop: bd,
        borderLeft: bd,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: mobileFlow ? "28px 20px 0" : "40px 48px 0",
        overflow: mobileFlow ? "visible" : "hidden",
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
        className="landing-footer__wordmark"
        style={{
          fontFamily: '"Funnel Display", serif',
          fontSize: mobileFlow
            ? "clamp(2.4rem, 14vw, 4.8rem)"
            : "clamp(4.5rem, 13vw, 15rem)",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "-0.04em",
          lineHeight: 0.85,
          color: "#5c1220",
          margin: 0,
          maxWidth: "100%",
          paddingBottom: "0.08em",
          transition: `color ${EASE}`,
          userSelect: "none",
        }}
      >
        Prometeo
      </h2>
    </footer>
  );
}
