import EntryPointsSection from "@/features/landing/entry-points/EntryPointsSection";
import HeroSection from "@/features/landing/hero/HeroSection";
import LandingTransitionSection from "@/features/landing/transition/LandingTransitionSection";
import MisionSection from "@/features/landing/mision/MisionSection";
import NexoSection from "@/features/landing/nexo/NexoSection";
import PrometeoScrollSection from "@/features/landing/scroll/PrometeoScrollSection";
import { LANDING_TRANSITIONS } from "@/features/landing/content/landing.content";

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
