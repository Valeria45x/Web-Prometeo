import { TH } from "../../../constants";
import { getPrometeoFooterTokens } from "../../../design/prometeoSystem";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { EASE, DARK_GRID, LIGHT_GRID } from "../shared/theme";
import { L } from "../../Primitives";

const LEGAL_LINKS = [
  "Política de privacidad",
  "Uso de cookies",
  "Condiciones de uso",
  "Ventas y reembolsos",
  "Avisos legales",
  "Accesibilidad",
];

const SOCIAL_LINKS = ["Instagram", "TikTok"];
const CONTACT_LINKS = ["hola@prometeo.info"];

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
}) {
  const isPhoneLayout = useMediaQuery("(max-width: 767px)");
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const CT = `background ${EASE}`;
  const isCompactFooter = mobileFlow || mobileReveal;
  const footerTokens = getPrometeoFooterTokens({ compact: isCompactFooter });
  const linkStyle = {
    color: footerTokens.text,
    fontSize: isPhoneLayout ? 12 : 14,
    lineHeight: isPhoneLayout ? "16px" : "20px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    transition: `color ${EASE}`,
  };
  const groupTitleStyle = {
    color: footerTokens.text,
    fontFamily: footerTokens.wordmarkFamily,
    fontSize: isPhoneLayout ? 16 : 18,
    lineHeight: isPhoneLayout ? "20px" : "24px",
    fontWeight: 800,
    letterSpacing: 0,
    opacity: 1,
    transition: `color ${EASE}`,
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
          <p
            style={{
              margin: 0,
              maxWidth: isPhoneLayout ? "20ch" : "28ch",
              color: footerTokens.text,
              fontSize: isPhoneLayout ? 15 : 16,
              lineHeight: isPhoneLayout ? "20px" : "24px",
              fontWeight: 700,
            }}
          >
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
            {LEGAL_LINKS.map((label) => (
              <a
                key={label}
                href="#"
                onClick={(event) => event.preventDefault()}
                style={{ textDecoration: "none" }}
              >
                <L style={linkStyle}>{label}</L>
              </a>
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
            {CONTACT_LINKS.map((label) => (
              <L key={label} style={linkStyle}>
                {label}
              </L>
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
