import { COLORS } from "@/design/tokens";
import Label from "@/shared/ui/Label";

export default function CertProof() {
  return (
    <section className="cert-proof" id="verificacion" data-ambient="light">
      <Label color={COLORS.textOnLight}>Verificación</Label>
      <p className="cert-proof__text">
        Una certificación no debería pedir que confíes. Debería permitirte{" "}
        <span className="cert-accent">comprobar.</span>
      </p>
    </section>
  );
}
