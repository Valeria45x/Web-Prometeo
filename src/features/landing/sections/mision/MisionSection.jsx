import { useReveal } from "@/hooks/useReveal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MisionSectionDesktop from "@/features/landing/sections/mision/MisionSectionDesktop";
import MisionSectionMobile from "@/features/landing/sections/mision/MisionSectionMobile";
import { DARK_GRID } from "@/shared/styles/theme";
import { placeholderImage as misionImage } from "@/lib/media";

export default function MisionSection() {
  const [rLead, sLead] = useReveal(0);
  const [rBody, sBody] = useReveal(160);
  const [rOutro, sOutro] = useReveal(320);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const isCompactTopbar = useMediaQuery("(max-width: 1024px)");
  const bd = DARK_GRID;
  const imageRevealWidthRatio = isCompactTopbar ? 1 : 0.75;

  if (isMobileLayout) {
    return (
      <MisionSectionMobile
        border={bd}
        leadRevealRef={rLead}
        leadRevealStyle={sLead}
        bodyRevealRef={rBody}
        bodyRevealStyle={sBody}
        outroRevealRef={rOutro}
        outroRevealStyle={sOutro}
      />
    );
  }

  return (
    <MisionSectionDesktop
      border={bd}
      imageRevealWidthRatio={imageRevealWidthRatio}
      leadRevealRef={rLead}
      leadRevealStyle={sLead}
      bodyRevealRef={rBody}
      bodyRevealStyle={sBody}
      outroRevealRef={rOutro}
      outroRevealStyle={sOutro}
      imageSrc={misionImage}
    />
  );
}
