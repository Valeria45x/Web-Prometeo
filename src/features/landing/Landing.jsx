import { useRef } from "react";
import { COLORS } from "@/design/tokens";
import Frame from "@/shared/layout/Frame";
import { PAGE_LIGHT_BG } from "@/shared/styles/theme";
import Topbar from "@/shared/layout/Topbar";
import LandingContent from "@/features/landing/content/LandingContent";
import LoadingScreen from "@/features/landing/components/LoadingScreen";
import SiteFooter from "@/shared/layout/SiteFooter";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useLandingFooterReveal } from "@/hooks/useLandingFooterReveal";
import { useLandingShell } from "@/hooks/useLandingShell";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";
import "@/shared/styles/scrollTextReveal.css";

export default function Landing() {
  const landingRef = useRef(null);
  const { light, setLight, showWordmark, frameBorder } = useLandingShell();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { contentRef, footerWrapperHeight } = useLandingFooterReveal(isMobile);

  useScrollTextReveal(landingRef);

  return (
    <div ref={landingRef}>
      <LoadingScreen />
      <Frame
        style={{
          borderLeft: frameBorder,
          borderRight: frameBorder,
          background: light ? PAGE_LIGHT_BG : COLORS.canvasDark,
          transition: "none",
        }}
      >
        <Topbar light={light} showWordmark={showWordmark} />

        {isMobile ? (
          <>
            <div
              style={{
                position: "relative",
                zIndex: 1,
                background: light ? PAGE_LIGHT_BG : COLORS.canvasDark,
                transition: "none",
              }}
            >
              <LandingContent light={light} setLight={setLight} />
            </div>
            <SiteFooter light={light} mobileFlow />
          </>
        ) : (
          <div style={{ position: "relative", height: footerWrapperHeight }}>
            <SiteFooter light={light} />

            <div
              ref={contentRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 2,
                background: light ? PAGE_LIGHT_BG : COLORS.canvasDark,
                transition: "none",
              }}
            >
              <LandingContent light={light} setLight={setLight} />
            </div>
          </div>
        )}
      </Frame>
    </div>
  );
}
