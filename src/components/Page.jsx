import { B } from "../constants";
import { BORDERS, COLORS } from "../design/tokens";
import Frame from "./Frame";
import Topbar from "./Topbar";
import Footer from "./Footer";
import HeroTransitionGrid from "./HeroTransitionGrid";
import { Grid, GridCell } from "./system/Grid";

export function Page({ children, light = false, footerVariant = "default" }) {
  const background = light ? COLORS.pageLight : COLORS.canvasDark;
  const border = light ? BORDERS.light : B;

  return (
    <div style={{ minHeight: "100vh", background }}>
      <Frame
        style={{
          borderLeft: border,
          borderRight: border,
          background,
          minHeight: "100vh",
        }}
      >
        <a className="skip-link" href="#contenido-principal">
          Saltar al contenido
        </a>
        <Topbar light={light} background={background} />
        <main id="contenido-principal" tabIndex={-1}>
          {children}
        </main>
        <Footer variant={footerVariant} />
      </Frame>
    </div>
  );
}

export function PageHeader({ index, title }) {
  return (
    <>
      <Grid
        columns="site"
        className="page-header"
        style={{
          borderLeft: B,
          minHeight: "var(--prometeo-hero-height)",
        }}
      >
        <GridCell
          style={{
            borderRight: B,
            display: "flex",
            alignItems: "flex-end",
            padding: "32px",
          }}
        >
          <span className="small-label" style={{ color: "#050505" }}>
            {index}
          </span>
        </GridCell>
        <GridCell
          span={3}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            borderRight: B,
            display: "flex",
            alignItems: "flex-end",
            padding: "64px 32px",
          }}
        >
          <h1 className="section-title" style={{ color: COLORS.textOnDark }}>
            {title}
          </h1>
        </GridCell>
      </Grid>
      <HeroTransitionGrid background={COLORS.canvasDark} border={B} />
    </>
  );
}
