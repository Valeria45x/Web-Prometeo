import { useRef } from "react";
import { COLORS } from "../design/tokens";
import Frame from "../components/Frame";
import { EASE, PAGE_LIGHT_BG } from "../components/landing/theme";
import Topbar from "../components/Topbar";
import LandingContent from "../components/landing/LandingContent";
import LandingFooter from "../components/landing/LandingFooter";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useLandingFooterReveal } from "../hooks/useLandingFooterReveal";
import { useLandingShell } from "../hooks/useLandingShell";
import { useScrollTextReveal } from "../hooks/useScrollTextReveal";
import "../components/landing/scrollTextReveal.css";

export default function Landing() {
  const landingRef = useRef(null);
  const { light, setLight, showWordmark, frameBorder } = useLandingShell();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { contentRef, footerWrapperHeight } = useLandingFooterReveal(isMobile);

  useScrollTextReveal(landingRef);

  return (
    <div ref={landingRef}>
      <Frame
        style={{
          borderLeft: frameBorder,
          borderRight: frameBorder,
          background: light ? PAGE_LIGHT_BG : COLORS.canvasDark,
          transition: `background ${EASE}`,
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
                transition: `background ${EASE}`,
              }}
            >
              <LandingContent light={light} setLight={setLight} />
            </div>
            <LandingFooter light={light} mobileFlow />
          </>
        ) : (
          <div style={{ position: "relative", height: footerWrapperHeight }}>
            <LandingFooter light={light} />

            <div
              ref={contentRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 2,
                background: light ? PAGE_LIGHT_BG : COLORS.canvasDark,
                transition: `background ${EASE}`,
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
