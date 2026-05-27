import EntryPointsSection from "./EntryPointsSection";
import HeroSection from "./HeroSection";
import LandingTransitionSection from "./LandingTransitionSection";
import MisionSection from "./MisionSection";
import NexoSection from "./NexoSection";
import PrometeoScrollSection from "./PrometeoScrollSection";
import { LANDING_TRANSITIONS } from "./landing.content";

export default function LandingContent({ light, setLight }) {
  return (
    <>
      <HeroSection />
      <LandingTransitionSection
        title={LANDING_TRANSITIONS.challenge.title}
        column={LANDING_TRANSITIONS.challenge.column}
      />
      <MisionSection />
      <NexoSection light={light} setLight={setLight} />
      <PrometeoScrollSection light={light} />
      <LandingTransitionSection
        light={light}
        title={LANDING_TRANSITIONS.nextStep.title}
        column={LANDING_TRANSITIONS.nextStep.column}
      />
      <EntryPointsSection light={light} />
    </>
  );
}
