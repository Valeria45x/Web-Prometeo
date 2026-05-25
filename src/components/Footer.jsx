import { useLocation } from "react-router-dom";
import { B, TH, NAV } from "../constants";
import { COLORS, FONTS } from "../design/tokens";
import { L } from "./Primitives";
import { Grid, GridCell } from "./system/Grid";

export default function Footer({ variant = "default", mobileReveal = false }) {
  const { pathname } = useLocation();
  if (variant === "none") return null;

  if (variant === "landing") {
    return (
      <footer
        className={`site-footer site-footer--landing${
          mobileReveal ? " site-footer--mobile-reveal" : ""
        }`}
        style={{
          position: "sticky",
          top: `calc(${TH}px - 1px)`,
          zIndex: 1,
          height: `calc(100vh - ${TH}px + 1px)`,
          background: COLORS.accent,
          borderLeft: B,
          borderTop: "none",
          borderBottom: B,
          padding: "64px 64px 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <L style={{ color: COLORS.footerText }}>
          Copyright &copy; 2026 Prometeo Inc.
        </L>

        <div
          style={{
            display: "flex",
            gap: 64,
            marginTop: "auto",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <L
              style={{
                color: COLORS.footerText,
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              Páginas
            </L>
            {NAV.filter((item) => item.to !== pathname).map((item) => (
              <a
                key={item.to}
                href={item.to}
                style={{ textDecoration: "none" }}
              >
                <L style={{ color: COLORS.footerText }}>{item.label} ↗</L>
              </a>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <L
              style={{
                color: COLORS.footerText,
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              Redes
            </L>
            <L style={{ color: COLORS.footerText }}>Instagram ↗</L>
            <L style={{ color: COLORS.footerText }}>TikTok ↗</L>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <L
              style={{
                color: COLORS.footerText,
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              Contacto
            </L>
            <L style={{ color: COLORS.footerText }}>hola@prometeo.info ↗</L>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <L
              style={{
                color: COLORS.footerText,
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              Legal
            </L>
            {[
              "Política de privacidad",
              "Uso de cookies",
              "Condiciones de uso",
              "Ventas y reembolsos",
              "Avisos legales",
            ].map((label) => (
              <a key={label} href="#" style={{ textDecoration: "none" }}>
                <L style={{ color: COLORS.footerText }}>{label} ↗</L>
              </a>
            ))}
          </div>
        </div>

        <h2
          className="site-footer__wordmark"
          style={{
            fontFamily: FONTS.display,
            fontSize: "128px",
            fontWeight: 800,
            letterSpacing: 0,
            lineHeight: "128px",
            color: COLORS.textOnAccent,
            margin: 0,
            maxWidth: "100%",
            paddingBottom: "0.08em",
            userSelect: "none",
          }}
        >
          Prometeo
        </h2>
      </footer>
    );
  }

  return (
    <Grid
      as="footer"
      columns="site"
      className="site-footer site-footer--default"
      style={{
        borderLeft: B,
        background: COLORS.accent,
      }}
    >
      <GridCell
        span={3}
        collapseSpanOnTablet
        collapseSpanOnMobile
        style={{
          borderRight: B,
          borderBottom: B,
          display: "flex",
          alignItems: "center",
          padding: "16px 32px",
          background: COLORS.accent,
        }}
      >
        <L style={{ color: COLORS.footerText }}>Prometeo – prometeo.info</L>
      </GridCell>
      <GridCell
        style={{
          borderRight: B,
          borderBottom: B,
          background: COLORS.accent,
        }}
      />
      <GridCell
        span={4}
        style={{
          borderBottom: B,
          borderTop: "1px solid rgba(217,217,214,0.12)",
          padding: "16px 32px",
          background: COLORS.accent,
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 32px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 8,
            lineHeight: "16px",
            color: "rgba(217,217,214,0.55)",
            letterSpacing: "0.08em",
            flexBasis: "100%",
          }}
        >
          Copyright &copy; 2026 Prometeo Inc. Reservados todos los derechos.
        </span>
        {[
          "Política de privacidad",
          "Uso de cookies",
          "Condiciones de uso",
          "Ventas y reembolsos",
          "Avisos legales",
        ].map((label) => (
          <a
            key={label}
            href="#"
            style={{
              fontFamily: FONTS.mono,
              fontSize: 8,
              lineHeight: "16px",
              color: "rgba(217,217,214,0.75)",
              letterSpacing: "0.06em",
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationColor: "rgba(217,217,214,0.3)",
            }}
          >
            {label}
          </a>
        ))}
      </GridCell>
    </Grid>
  );
}
