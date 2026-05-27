import EntryPointsSection from "../entry-points/EntryPointsSection";
import HeroSection from "../hero/HeroSection";
import LandingTransitionSection from "../transition/LandingTransitionSection";
import MisionSection from "../mision/MisionSection";
import NexoSection from "../nexo/NexoSection";
import PrometeoScrollSection from "../scroll/PrometeoScrollSection";
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
