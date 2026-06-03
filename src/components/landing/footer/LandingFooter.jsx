import { Link } from "react-router-dom";
import { TH } from "../../../constants";
import { getPrometeoFooterTokens } from "../../../design/prometeoSystem";
import { typeStyle } from "../../../design/typography";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { LEGAL_LINKS } from "../../../data/legal";
import { EASE, DARK_GRID, LIGHT_GRID } from "../shared/theme";
import { L } from "../../Primitives";

const SOCIAL_LINKS = ["Instagram", "TikTok"];
const CONTACT_LINKS = [{ label: "hola@prometeo.info", to: "/contacto" }];

function FooterGroup({ title, children }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {title}
      <div style={{ display: "grid", gap: 6 }}>{children}</div>
    </div>
  );
}

export default function LandingFooter({
  light,
  mobileFlow = false,
  mobileReveal = false,
  compact,
}) {
  const isPhoneLayout = useMediaQuery("(max-width: 767px)");
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const CT = `background ${EASE}`;
  const isCompactFooter = compact ?? (mobileFlow || mobileReveal);
  const footerTokens = getPrometeoFooterTokens({ compact: isCompactFooter });
  const linkStyle = {
    ...typeStyle("caption", { fontWeight: 700 }),
    color: footerTokens.text,
    transition: `color ${EASE}`,
  };
  const groupTitleStyle = {
    ...typeStyle("titleSm", {
      fontFamily: footerTokens.wordmarkFamily,
    }),
    color: footerTokens.text,
    opacity: 1,
    transition: `color ${EASE}`,
  };
  const compactClaimStyle = {
    ...typeStyle("bodyStrong"),
    margin: 0,
    maxWidth: isPhoneLayout ? "20ch" : "28ch",
    color: footerTokens.text,
  };
  const copyrightStyle = {
    ...linkStyle,
    maxWidth: "34rem",
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
        justifyContent: isCompactFooter ? "flex-start" : "space-between",
        padding: footerTokens.padding,
        overflow: isCompactFooter ? "visible" : "hidden",
        gap: footerTokens.containerGap,
        transition: CT,
      }}
    >
      <div
        className="lf-top"
        style={{
          display: "grid",
          gap: isCompactFooter ? (isPhoneLayout ? 24 : 28) : 0,
        }}
      >
        {isCompactFooter ? (
          <p style={compactClaimStyle}>
            Privacidad digital que se entiende.
          </p>
        ) : null}

        <div
          className="lf-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: isPhoneLayout
              ? "1fr"
              : "minmax(18rem, 1.35fr) repeat(3, minmax(9rem, auto))",
            alignItems: "start",
            gap: isCompactFooter ? 24 : 32,
          }}
        >
          <L style={copyrightStyle}>
            Copyright &copy; 2026 Prometeo Inc. Reservados todos los derechos.
          </L>

          <FooterGroup title={<L style={groupTitleStyle}>Legal</L>}>
            {LEGAL_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                style={{ textDecoration: "none" }}
              >
                <L style={linkStyle}>{item.label}</L>
              </Link>
            ))}
          </FooterGroup>

          <FooterGroup title={<L style={groupTitleStyle}>Redes</L>}>
            {SOCIAL_LINKS.map((label) => (
              <L key={label} style={linkStyle}>
                {label}
              </L>
            ))}
          </FooterGroup>

          <FooterGroup title={<L style={groupTitleStyle}>Contacto</L>}>
            {CONTACT_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                style={{ textDecoration: "none" }}
              >
                <L style={linkStyle}>{item.label}</L>
              </Link>
            ))}
          </FooterGroup>
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
          marginTop: isCompactFooter ? (isPhoneLayout ? 20 : 24) : 0,
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
