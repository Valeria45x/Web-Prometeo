import { B } from "@/constants";
import { BORDERS, COLORS } from "@/design/tokens";
import { useLandingFooterReveal } from "@/hooks/useLandingFooterReveal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Frame from "@/shared/layout/Frame";
import Topbar from "@/shared/layout/Topbar";
import LandingFooter from "@/features/landing/footer/LandingFooter";
import HeroTransitionGrid from "@/shared/HeroTransitionGrid";
import { Grid, GridCell } from "@/shared/ui/Grid";

export function Page({
  children,
  light = false,
  ambientBackground,
  topbarLight = light,
  topbarBackground,
  frameLight = light,
  footerVariant = "default",
  footer = undefined,
  footerReveal = true,
}) {
  const background = light ? COLORS.pageLight : COLORS.canvasDark;
  const outerBackground = ambientBackground ?? background;
  const resolvedTopbarBackground =
    topbarBackground ??
    (topbarLight ? COLORS.pageLight : COLORS.canvasDark);
  const border = frameLight ? BORDERS.light : BORDERS.dark;
  const isMobile = useMediaQuery("(max-width: 767px)");
  const resolvedFooter =
    footer !== undefined
      ? footer
      : footerVariant === "none"
        ? null
        : (
            <LandingFooter
              light={light}
              mobileFlow={isMobile}
              compact={isMobile}
            />
          );
  const shouldRevealFooter = footerReveal && resolvedFooter && !isMobile;
  const { contentRef, footerWrapperHeight } =
    useLandingFooterReveal(!shouldRevealFooter);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: outerBackground,
        transition: "background-color 240ms ease",
      }}
    >
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
        <Topbar
          light={topbarLight}
          background={resolvedTopbarBackground}
        />

        {shouldRevealFooter ? (
          <div style={{ position: "relative", height: footerWrapperHeight }}>
            {resolvedFooter}
            <div
              ref={contentRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 2,
                background,
              }}
            >
              <main id="contenido-principal" tabIndex={-1}>
                {children}
              </main>
            </div>
          </div>
        ) : (
          <>
            <main id="contenido-principal" tabIndex={-1}>
              {children}
            </main>
            {resolvedFooter}
          </>
        )}
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
      <HeroTransitionGrid background={COLORS.canvasDark} border={B} topBorder />
    </>
  );
}
