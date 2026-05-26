import { useRef } from "react";
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
  const { light, setLight, showWordmark, frameBorder } = useLandingShell();
  const isMobile = useMediaQuery("(max-width: 767px)");

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
        <LandingFooter light={light} mobileFlow={isMobile} />
      </Frame>
    </div>
  );
}
