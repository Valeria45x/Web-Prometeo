import { COLORS } from "../design/tokens";
import { TH } from "../constants";
import Frame from "../components/Frame";
import { EASE, PAGE_LIGHT_BG } from "../components/landing/theme";
import Topbar from "../components/Topbar";
import SectionTransition from "../components/landing/SectionTransition";
import HeroSection from "../components/landing/HeroSection";
import MisionSection from "../components/landing/MisionSection";
import NexoSection from "../components/landing/NexoSection";
import FrentesSection from "../components/landing/FrentesSection";
import HeroTransitionGrid from "../components/HeroTransitionGrid";
import LandingFooter from "../components/landing/LandingFooter";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useLandingShell } from "../hooks/useLandingShell";

export default function Landing() {
  const { light, setLight, showWordmark, frameBorder } = useLandingShell();
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <Frame
      style={{
        borderLeft: frameBorder,
        borderRight: frameBorder,
        background: light ? PAGE_LIGHT_BG : COLORS.canvasDark,
        transition: `background ${EASE}, border-color ${EASE}`,
      }}
    >
      <Topbar light={light} showWordmark={showWordmark} />
      <HeroSection />
      <SectionTransition splitColumn={1} />
      <MisionSection />
      <SectionTransition splitColumn={3} />
      <NexoSection light={light} setLight={setLight} />
      <SectionTransition light={light} splitColumn={2} />
      {isMobile ? (
        <>
          <FrentesSection light={light} />
          <HeroTransitionGrid
            background={light ? PAGE_LIGHT_BG : COLORS.canvasDark}
            border={light ? "1px solid #303030" : "1px solid #303030"}
          />
          <LandingFooter light={light} mobileFlow />
        </>
      ) : (
        <div
          className="reveal-wrapper"
          style={{
            position: "relative",
            height: `calc(2 * (100vh - ${TH}px))`,
          }}
        >
          <LandingFooter light={light} />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 2,
            }}
          >
            <FrentesSection light={light} />
            <HeroTransitionGrid
              background={light ? PAGE_LIGHT_BG : COLORS.canvasDark}
              border={light ? "1px solid #303030" : "1px solid #303030"}
            />
          </div>
        </div>
      )}
    </Frame>
  );
}
