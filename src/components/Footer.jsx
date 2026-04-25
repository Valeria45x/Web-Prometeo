import { B, TH } from "../constants";
import { COLORS, FONTS } from "../design/tokens";
import { L } from "./Primitives";
import { Grid, GridCell } from "./system/Grid";

export default function Footer({ variant = "default" }) {
  if (variant === "none") return null;

  if (variant === "landing") {
    return (
      <footer
        className="site-footer site-footer--landing"
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
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            <L style={{ color: COLORS.footerText }}>Instagram ↗</L>
            <L style={{ color: COLORS.footerText }}>TikTok ↗</L>
            <L style={{ color: COLORS.footerText }}>hola@prometeo.info ↗</L>
          </div>
          <L style={{ color: COLORS.footerText }}>v6</L>
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
        <L style={{ color: COLORS.footerText }}>
          Prometeo – proyectoprometeo.info
        </L>
      </GridCell>
      <GridCell
        style={{
          borderRight: B,
          borderBottom: B,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "18px 24px",
          background: COLORS.accent,
        }}
      >
        <L style={{ color: COLORS.footerText }}>v6</L>
      </GridCell>
    </Grid>
  );
}
