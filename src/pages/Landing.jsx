import { useEffect, useRef, useState } from "react";
import { TH } from "../constants";
import { COLORS } from "../design/tokens";
import Frame from "../components/Frame";
import { EASE, PAGE_LIGHT_BG } from "../components/landing/theme";
import Topbar from "../components/Topbar";
import HeroSection from "../components/landing/HeroSection";
import LandingTransitionSection from "../components/landing/LandingTransitionSection";
import MisionSection from "../components/landing/MisionSection";
import NexoSection from "../components/landing/NexoSection";
import PrometeoScrollSection from "../components/landing/PrometeoScrollSection";
import EntryPointsSection from "../components/landing/EntryPointsSection";
import LandingFooter from "../components/landing/LandingFooter";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useLandingShell } from "../hooks/useLandingShell";
import { useScrollTextReveal } from "../hooks/useScrollTextReveal";
import "../components/landing/scrollTextReveal.css";

export default function Landing() {
  const landingRef = useRef(null);
  const contentRef = useRef(null);
  const { light, setLight, showWordmark, frameBorder } = useLandingShell();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [contentHeight, setContentHeight] = useState(0);

  useScrollTextReveal(landingRef);

  useEffect(() => {
    if (isMobile) return undefined;

    const contentElement = contentRef.current;
    if (!contentElement) return undefined;

    const updateContentHeight = () => {
      setContentHeight(contentElement.scrollHeight);
    };

    updateContentHeight();

    const observer = new ResizeObserver(() => {
      updateContentHeight();
    });

    observer.observe(contentElement);
    window.addEventListener("resize", updateContentHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateContentHeight);
    };
  }, [isMobile]);

  const viewportHeight = typeof window === "undefined" ? 0 : window.innerHeight;
  const footerWrapperHeight =
    contentHeight > 0
      ? contentHeight + viewportHeight - TH
      : `calc(200svh - ${TH}px)`;

  const landingContent = (
    <>
      <Topbar light={light} showWordmark={showWordmark} />
      <HeroSection />
      <LandingTransitionSection title="El reto" column={1} />
      <MisionSection />
      <NexoSection light={light} setLight={setLight} />
      <PrometeoScrollSection light={light} />
      <LandingTransitionSection
        light={light}
        title="El siguiente paso"
        column={4}
      />
      <EntryPointsSection light={light} />
    </>
  );

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
              {landingContent}
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
              {landingContent}
            </div>
          </div>
        )}
      </Frame>
    </div>
  );
}
