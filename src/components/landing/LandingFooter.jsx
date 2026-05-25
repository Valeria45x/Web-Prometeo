import { TH } from "../../constants";
import { EASE, DARK_GRID, LIGHT_GRID } from "./theme";
import { L } from "../Primitives";

export default function LandingFooter({
  light,
  mobileFlow = false,
  mobileReveal = false,
}) {
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const CT = `background ${EASE}`;
  const isCompactFooter = mobileFlow || mobileReveal;

  return (
    <footer
      className={`landing-footer ${
        mobileFlow
          ? "landing-footer--flow"
          : mobileReveal
            ? "landing-footer--mobile-reveal"
            : "reveal-footer"
      }`}
      style={{
        position: mobileFlow ? "relative" : "sticky",
        top: mobileFlow ? "auto" : `calc(${TH}px - 1px)`,
        zIndex: 1,
        height: mobileFlow ? "auto" : `calc(100svh - ${TH}px + 1px)`,
        background: "#ff0b3a",
        borderTop: mobileFlow ? bd : "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: isCompactFooter ? "32px 16px 8px" : "64px 64px 0",
        overflow: isCompactFooter ? "visible" : "hidden",
        gap: isCompactFooter ? 32 : 0,
        transition: CT,
      }}
    >
      <div
        className="lf-bottom"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: isCompactFooter ? 16 : 0,
        }}
      >
        <div className="lf-links" style={{ display: "flex", gap: 32 }}>
          <L style={{ color: "#050505", transition: `color ${EASE}` }}>
            Instagram ↗
          </L>
          <L style={{ color: "#050505", transition: `color ${EASE}` }}>
            TikTok ↗
          </L>
          <L style={{ color: "#050505", transition: `color ${EASE}` }}>
            hola@prometeo.info ↗
          </L>
        </div>
      </div>

      <h2
        className="landing-footer__wordmark"
        style={{
          fontFamily: '"Funnel Display", serif',
          fontSize: isCompactFooter
            ? "64px"
            : "128px",
          fontWeight: 800,
          letterSpacing: 0,
          lineHeight: isCompactFooter ? "64px" : "128px",
          color: "#050505",
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
