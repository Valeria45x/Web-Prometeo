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
  const wordmarkSize = isCompactFooter ? "clamp(112px, 30vw, 160px)" : "128px";
  const wordmarkLine = isCompactFooter ? "0.9" : "128px";
  const linkStyle = {
    color: "#050505",
    fontSize: isCompactFooter ? 18 : 20,
    lineHeight: isCompactFooter ? "24px" : "28px",
    fontWeight: 700,
    transition: `color ${EASE}`,
  };

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
        padding: isCompactFooter ? "40px 16px 12px" : "64px 32px 0",
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
          gap: isCompactFooter ? 20 : 0,
        }}
      >
        <div
          className="lf-links"
          style={{
            display: "flex",
            gap: isCompactFooter ? 20 : 32,
            flexWrap: "wrap",
          }}
        >
          <L style={linkStyle}>Instagram ↗</L>
          <L style={linkStyle}>TikTok ↗</L>
          <L style={linkStyle}>hola@prometeo.info ↗</L>
        </div>
      </div>

      <h2
        className="landing-footer__wordmark"
        style={{
          fontFamily: '"Funnel Display", serif',
          fontSize: wordmarkSize,
          fontWeight: 800,
          letterSpacing: 0,
          lineHeight: wordmarkLine,
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
