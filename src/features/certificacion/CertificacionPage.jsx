import { useRef } from "react";
import { COLORS } from "@/design/tokens";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";
import { Page } from "@/shared/layout/Page";
import { useCertHeroParallax } from "@/features/certificacion/useCertHeroParallax";
import CertHero from "@/features/certificacion/sections/CertHero";
import CertIntro from "@/features/certificacion/sections/CertIntro";
import CertAudit from "@/features/certificacion/sections/CertAudit";
import CertSeal from "@/features/certificacion/sections/CertSeal";
import CertProof from "@/features/certificacion/sections/CertProof";
import CertParallaxBand from "@/features/certificacion/sections/CertParallaxBand";
import CertFaq from "@/features/certificacion/sections/CertFaq";
import CertFinal from "@/features/certificacion/sections/CertFinal";
import "@/features/landing/shared/scrollTextReveal.css";
import "@/features/certificacion/certificacion.css";

export default function CertificacionPage() {
  const pageRef = useRef(null);
  useScrollTextReveal(pageRef);
  const { heroBgRef, animReady } = useCertHeroParallax();

  return (
    <Page
      light
      ambientBackground={COLORS.pageLight}
      topbarLight
      topbarBackground={COLORS.pageLight}
      frameLight
    >
      <div
        ref={pageRef}
        className={`cert-page ${animReady ? "cert-page--anim" : ""}`}
      >
        <CertHero heroBgRef={heroBgRef} />
        <CertIntro />
        <CertAudit />
        <CertSeal />
        <CertProof />
        <CertParallaxBand />
        <CertFaq />
        <CertFinal />
      </div>
    </Page>
  );
}
