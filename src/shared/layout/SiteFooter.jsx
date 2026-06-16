import { useState } from "react";
import { Link } from "react-router-dom";
import { TH } from "@/constants";
import { getPrometeoFooterTokens } from "@/design/prometeoSystem";
import { typeStyle } from "@/design/typography";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { LEGAL_LINKS } from "@/data/legal";
import { EASE, DARK_GRID, LIGHT_GRID } from "@/shared/styles/theme";
import { L } from "@/shared/components/Primitives";

const SOCIAL_LINKS = ["Instagram", "TikTok"];
const CONTACT_LINKS = [{ label: "hola@prometeo.info", to: "/contacto" }];
const PROMETEO_LINKS = [{ label: "Sobre Prometeo", to: "/sobre-prometeo" }];

const FOOTER_GROUPS = [
  {
    title: "Prometeo",
    items: PROMETEO_LINKS,
  },
  {
    title: "Legal",
    items: LEGAL_LINKS,
  },
  {
    title: "Redes",
    items: SOCIAL_LINKS.map((label) => ({ label })),
  },
  {
    title: "Contacto",
    items: CONTACT_LINKS,
  },
];

function FooterGroup({ title, children }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {title}
      <div style={{ display: "grid", gap: 6 }}>{children}</div>
    </div>
  );
}

// Newsletter como demo: no hay backend. Guarda el correo en localStorage y
// muestra confirmación, igual que la del modal de artículo.
function FooterNewsletter({ titleStyle, textStyle, tokens, isPhoneLayout }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const normalized = email.trim();
    if (!normalized) return;
    try {
      window.localStorage.setItem("prometeo-newsletter-email", normalized);
    } catch {
      // La confirmación funciona aunque el almacenamiento falle.
    }
    setSubscribed(true);
  }

  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        maxWidth: isPhoneLayout ? "100%" : "26rem",
      }}
    >
      <L style={titleStyle}>Newsletter</L>
      {subscribed ? (
        <L style={textStyle} role="status">
          Ya estás dentro. Gracias por leernos.
        </L>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <L style={textStyle}>
            Una idea clara sobre privacidad, una vez por semana.
          </L>
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              borderBottom: `1px solid ${tokens.text}`,
            }}
          >
            <label htmlFor="footer-newsletter-email" style={visuallyHidden}>
              Tu correo
            </label>
            <input
              id="footer-newsletter-email"
              name="footer-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@email.com"
              autoComplete="email"
              style={{
                ...textStyle,
                flex: 1,
                minWidth: 0,
                background: "transparent",
                border: 0,
                outline: 0,
                padding: "8px 0",
              }}
            />
            <button
              type="submit"
              style={{
                ...textStyle,
                background: "transparent",
                border: 0,
                color: tokens.text,
                cursor: "pointer",
                padding: "8px 0 8px 16px",
                whiteSpace: "nowrap",
              }}
            >
              Suscribirme
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

const visuallyHidden = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
};

export default function SiteFooter({
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
    ...typeStyle("titleSm", { fontWeight: 700 }),
    color: footerTokens.text,
    transition: `color ${EASE}`,
  };
  const groupTitleStyle = {
    ...typeStyle("titleMd", {
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
          minHeight: 0,
          flexShrink: 1,
        }}
      >
        {isCompactFooter ? (
          <p style={compactClaimStyle}>Privacidad digital que se entiende.</p>
        ) : null}

        <div
          className="lf-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: isPhoneLayout
              ? "1fr"
              : isCompactFooter
                ? "minmax(0, 1fr)"
                : "minmax(18rem, 0.8fr) minmax(0, 1.6fr)",
            alignItems: "start",
            columnGap: isPhoneLayout ? 0 : "clamp(32px, 4vw, 64px)",
            rowGap: isCompactFooter ? 24 : 32,
          }}
        >
          <div style={{ display: "grid", gap: isPhoneLayout ? 24 : 32 }}>
            <L style={copyrightStyle}>
              Copyright &copy; 2026 Prometeo Inc. Reservados todos los derechos.
            </L>
            <FooterNewsletter
              titleStyle={groupTitleStyle}
              textStyle={linkStyle}
              tokens={footerTokens}
              isPhoneLayout={isPhoneLayout}
            />
          </div>

          <div
            className="lf-footer-groups"
            style={{
              display: "grid",
              gridTemplateColumns: isPhoneLayout
                ? "1fr"
                : "repeat(auto-fit, minmax(9rem, 1fr))",
              columnGap: isPhoneLayout ? 0 : "clamp(24px, 3vw, 48px)",
              rowGap: isPhoneLayout ? 24 : 28,
              alignItems: "start",
            }}
          >
            {FOOTER_GROUPS.map((group) => (
              <FooterGroup
                key={group.title}
                title={<L style={groupTitleStyle}>{group.title}</L>}
              >
                {group.items.map((item) =>
                  item.to ? (
                    <Link
                      key={item.to}
                      to={item.to}
                      style={{ textDecoration: "none" }}
                    >
                      <L style={linkStyle}>{item.label}</L>
                    </Link>
                  ) : (
                    <L key={item.label} style={linkStyle}>
                      {item.label}
                    </L>
                  ),
                )}
              </FooterGroup>
            ))}
          </div>
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
          marginTop: isCompactFooter ? (isPhoneLayout ? 20 : 24) : "auto",
          width: "100%",
          maxWidth: "100%",
          textAlign: "center",
          paddingBottom: "0.08em",
          flexShrink: 0,
          transition: `color ${EASE}`,
          userSelect: "none",
        }}
      >
        Prometeo
      </h2>
    </footer>
  );
}
