import { COLORS } from "@/design/tokens";
import Label from "@/shared/ui/Label";
import { useOutcomesNumberReveal } from "@/features/empresas/hooks/useOutcomesNumberReveal";
import { OUTCOMES } from "@/features/empresas/empresas.content";

export default function EnterpriseOutcomes() {
  const outcomesRef = useOutcomesNumberReveal();

  return (
    <section className="enterprise-outcomes" ref={outcomesRef}>
      <div className="enterprise-outcomes__header">
        <Label color={COLORS.textOnLight}>Resultados</Label>
        <h2>
          Lo que <span className="enterprise-accent">cambia.</span>
        </h2>
      </div>
      <ul className="enterprise-outcomes__list">
        {OUTCOMES.map((outcome) => (
          <li key={outcome.number} className="enterprise-outcomes__item">
            <span className="enterprise-outcomes__number-mask">
              <span
                className="enterprise-outcomes__item-number"
                aria-hidden="true"
              >
                {outcome.number}
              </span>
            </span>
            <p className="enterprise-outcomes__item-copy">
              <strong>{outcome.title}.</strong> {outcome.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
