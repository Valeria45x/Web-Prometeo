import { COLORS } from "@/design/tokens";
import Label from "@/shared/ui/Label";

export default function CertIntro() {
  return (
    <section className="cert-intro" data-ambient="light">
      <Label color={COLORS.textOnLight}>El problema</Label>
      <p className="cert-intro__text">
        Una buena práctica de privacidad es invisible. El usuario no puede
        distinguir a quien le respeta de quien no.{" "}
        <span className="cert-accent">
          Lo que no se puede demostrar, no genera confianza.
        </span>
      </p>
    </section>
  );
}
