import { COLORS } from "../design/tokens";
import { TH } from "../constants";
import Frame from "../components/Frame";
import { EASE, PAGE_LIGHT_BG } from "../components/landing/theme";
import Topbar from "../components/Topbar";
import HeroSection from "../components/landing/HeroSection";
import LandingTransitionSection from "../components/landing/LandingTransitionSection";
import MisionSection from "../components/landing/MisionSection";
import NexoSection from "../components/landing/NexoSection";
import PrometeoScrollSection from "../components/landing/PrometeoScrollSection";
import ContactSection from "../components/landing/ContactSection";
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
      <LandingTransitionSection
        title="El problema"
        column={1}
      />
      <MisionSection />
      <NexoSection light={light} setLight={setLight} />
      <PrometeoScrollSection light={light} />

      {isMobile ? (
        <>
          <ContactSection light={light} mobileFlow />
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
            <ContactSection light={light} flow />
          </div>
        </div>
      )}
    </Frame>
  );
}
