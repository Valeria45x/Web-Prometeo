import { useReveal } from "../../../hooks/useReveal";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import MisionSectionDesktop from "./MisionSectionDesktop";
import MisionSectionMobile from "./MisionSectionMobile";
import { DARK_GRID } from "../shared/theme";
import misionImage from "../../../../Instagram Feed USB v1.png";

export default function MisionSection() {
  const [rBody, sBody] = useReveal(140, false);
  const [rOutro, sOutro] = useReveal(280, false);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const isCompactTopbar = useMediaQuery("(max-width: 1024px)");
  const hasWideBodySpacing = useMediaQuery("(min-width: 1440px)");
  const bd = DARK_GRID;
  const maskColor = "#050505";
  const hasBalancedDesktopBlocks = !isCompactTopbar;
  const imageRevealWidthRatio = isCompactTopbar ? 1 : 0.75;

  if (isMobileLayout) {
    return (
      <MisionSectionMobile
        border={bd}
        maskColor={maskColor}
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
      maskColor={maskColor}
      hasWideBodySpacing={hasWideBodySpacing}
      hasBalancedDesktopBlocks={hasBalancedDesktopBlocks}
      imageRevealWidthRatio={imageRevealWidthRatio}
      bodyRevealRef={rBody}
      bodyRevealStyle={sBody}
      outroRevealRef={rOutro}
      outroRevealStyle={sOutro}
      imageSrc={misionImage}
    />
  );
}
