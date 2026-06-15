import { COLORS } from "@/design/tokens";
import Label from "@/shared/ui/Label";
import FaqItem from "@/features/certificacion/components/FaqItem";
import { FAQ } from "@/features/certificacion/certificacion.content";

export default function CertFaq() {
  return (
    <section className="cert-faq" id="preguntas" data-ambient="light">
      <div className="cert-faq__header">
        <Label color={COLORS.textOnLight}>Antes de decidir</Label>
        <h2>
          Lo que todos <span className="cert-accent">preguntan.</span>
        </h2>
      </div>
      <div className="cert-faq__list">
        {FAQ.map((item, i) => (
          <FaqItem key={item.question} item={item} index={i} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}
