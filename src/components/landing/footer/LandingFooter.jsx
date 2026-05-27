import { TH } from "../../../constants";
import { getPrometeoFooterTokens } from "../../../design/prometeoSystem";
import { EASE, DARK_GRID, LIGHT_GRID } from "../shared/theme";
import { L } from "../../Primitives";

export default function LandingFooter({
  light,
  mobileFlow = false,
  mobileReveal = false,
}) {
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const CT = `background ${EASE}`;
  const isCompactFooter = mobileFlow || mobileReveal;
  const footerTokens = getPrometeoFooterTokens({ compact: isCompactFooter });
  const linkStyle = {
    color: footerTokens.text,
    fontSize: footerTokens.linkFontSize,
    lineHeight: footerTokens.linkLineHeight,
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
        background: footerTokens.background,
        borderTop: mobileFlow ? bd : "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: footerTokens.padding,
        overflow: isCompactFooter ? "visible" : "hidden",
        gap: footerTokens.containerGap,
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
          gap: footerTokens.bottomGap,
        }}
      >
        <div
          className="lf-links"
          style={{
            display: "flex",
            gap: footerTokens.linkGap,
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
          fontFamily: footerTokens.wordmarkFamily,
          fontSize: footerTokens.wordmarkSize,
          fontWeight: footerTokens.wordmarkWeight,
          letterSpacing: 0,
          lineHeight: footerTokens.wordmarkLineHeight,
          color: footerTokens.text,
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
