import { B, TH } from "../constants";
import { COLORS, FONTS } from "../design/tokens";
import { L } from "./Primitives";
import { Grid, GridCell } from "./system/Grid";

export default function Footer({ variant = "default", mobileReveal = false }) {
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
          padding: "40px 48px 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <L style={{ color: COLORS.footerText }}>Instagram ↗</L>
            <L style={{ color: COLORS.footerText }}>TikTok ↗</L>
            <L style={{ color: COLORS.footerText }}>hola@prometeo.info ↗</L>
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
          <L style={{ color: COLORS.footerText }}>
            Copyright &copy; 2026 Prometeo Inc.
          </L>
        </div>

        <h2
          className="site-footer__wordmark"
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(4.5rem, 13vw, 15rem)",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            color: COLORS.accentDeep,
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
          padding: "18px 24px",
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
          borderTop: "1px solid rgba(255,255,255,0.12)",
          padding: "14px 24px",
          background: COLORS.accent,
          display: "flex",
          flexWrap: "wrap",
          gap: "6px 28px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 9,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
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
              fontSize: 9,
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "0.06em",
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationColor: "rgba(255,255,255,0.3)",
            }}
          >
            {label}
          </a>
        ))}
      </GridCell>
    </Grid>
  );
}
