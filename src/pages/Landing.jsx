import { TH } from "../constants";
import { COLORS } from "../design/tokens";
import Frame from "../components/Frame";
import { EASE, PAGE_LIGHT_BG } from "../components/landing/theme";
import Topbar from "../components/Topbar";
import SectionTransition from "../components/landing/SectionTransition";
import HeroSection from "../components/landing/HeroSection";
import MisionSection from "../components/landing/MisionSection";
import NexoSection from "../components/landing/NexoSection";
import FrentesSection from "../components/landing/FrentesSection";
import ContactSection from "../components/landing/ContactSection";
import LandingFooter from "../components/landing/LandingFooter";
import { useLandingShell } from "../hooks/useLandingShell";

export default function Landing() {
  const { light, setLight, showWordmark, frameBorder } = useLandingShell();

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
      <FrentesSection light={light} />
      <div
        className="reveal-wrapper"
        style={{ position: "relative", height: `calc(2 * (100vh - ${TH}px))` }}
      >
        <LandingFooter light={light} />
        <ContactSection light={light} />
      </div>
    </Frame>
  );
}
