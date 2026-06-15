import EntryPointsSection from "@/features/landing/sections/entry-points/EntryPointsSection";
import HeroSection from "@/features/landing/sections/hero/HeroSection";
import TransitionSection from "@/shared/transition/TransitionSection";
import MisionSection from "@/features/landing/sections/mision/MisionSection";
import NexoSection from "@/features/landing/sections/nexo/NexoSection";
import PrometeoScrollSection from "@/features/landing/sections/scroll/PrometeoScrollSection";
import { LANDING_TRANSITIONS } from "@/features/landing/content/landing.content";

export default function LandingContent({ light, setLight }) {
  return (
    <>
      <HeroSection />
      <TransitionSection
        title={LANDING_TRANSITIONS.challenge.title}
        column={LANDING_TRANSITIONS.challenge.column}
      />
      <MisionSection />
      <NexoSection light={light} setLight={setLight} />
      <PrometeoScrollSection light={light} />
      <TransitionSection
        light={light}
        title={LANDING_TRANSITIONS.nextStep.title}
        column={LANDING_TRANSITIONS.nextStep.column}
      />
      <EntryPointsSection light={light} />
    </>
  );
}
