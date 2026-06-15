import { placeholderImage as heroImage } from "@/lib/media";
import GridImageReveal from "@/shared/ui/GridImageReveal";

export default function CertParallaxBand() {
  return (
    <section className="cert-parallax-band" data-ambient="light">
      <GridImageReveal
        src={heroImage}
        alt=""
        label=""
        tone="light"
        parallaxOnly
        minHeight="clamp(360px, 48vh, 520px)"
        objectPosition="center 45%"
      />
    </section>
  );
}
