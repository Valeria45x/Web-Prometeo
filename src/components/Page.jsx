import { B } from "../constants";
import { COLORS } from "../design/tokens";
import Frame from "./Frame";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { Grid, GridCell } from "./system/Grid";

export function Page({ children, light = false, footerVariant = "default" }) {
  const background = light ? COLORS.canvasLight : COLORS.canvasDark;

  return (
    <div style={{ minHeight: "100vh", background }}>
      <Frame
        style={{
          borderLeft: B,
          borderRight: B,
          background,
          minHeight: "100vh",
        }}
      >
        <Topbar light={light} />
        {children}
        <Footer variant={footerVariant} />
      </Frame>
    </div>
  );
}

export function PageHeader({ index, title }) {
  return (
    <Grid
      columns="site"
      style={{
        borderLeft: B,
        height: "36vh",
      }}
    >
      <GridCell
        style={{
          borderRight: B,
          borderBottom: B,
          display: "flex",
          alignItems: "flex-end",
          padding: "28px 24px",
        }}
      >
        <span className="small-label" style={{ color: "#333" }}>
          {index}
        </span>
      </GridCell>
      <GridCell
        span={3}
        style={{
          borderRight: B,
          borderBottom: B,
          display: "flex",
          alignItems: "flex-end",
          padding: "44px 36px",
        }}
      >
        <h1 className="section-title" style={{ color: "#e0e0e0" }}>
          {title}
        </h1>
      </GridCell>
    </Grid>
  );
}
