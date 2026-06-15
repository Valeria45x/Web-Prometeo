import { COLORS } from "@/design/tokens";
import Label from "@/shared/ui/Label";
import { useCasesCarousel } from "@/features/empresas/hooks/useCasesCarousel";
import { CASES } from "@/features/empresas/empresas.content";

export default function EnterpriseCases() {
  const { casesRef, trackRef } = useCasesCarousel();

  return (
    <section className="enterprise-cases" ref={casesRef}>
      <div className="enterprise-cases__pin">
        <div className="enterprise-cases__header">
          <Label color={COLORS.textOnLight}>Experiencia</Label>
          <h2>
            No lo decimos.{" "}
            <span className="enterprise-accent">Lo demostramos.</span>
          </h2>
          <p>
            Los siguientes casos representan el tipo de impacto que tiene la
            certificación Prometeo.
          </p>
        </div>
        <div className="enterprise-cases__viewport">
          <ul className="enterprise-cases__track" ref={trackRef}>
            {CASES.map((study) => (
              <li key={study.id} className="enterprise-cases__item">
                <blockquote
                  className={[
                    "enterprise-cases__quote",
                    !study.quote && "enterprise-cases__quote--placeholder",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {study.quote ? (
                    study.quote
                  ) : (
                    <span
                      className="enterprise-cases__quote-lines"
                      aria-hidden="true"
                    />
                  )}
                </blockquote>
                <div className="enterprise-cases__footer">
                  <div className="enterprise-cases__person-meta">
                    <span className="enterprise-cases__person-name">
                      {study.person}
                    </span>
                    <span className="enterprise-cases__person-role">
                      {study.role}
                    </span>
                    <span className="enterprise-cases__person-company">
                      {study.company}
                    </span>
                  </div>
                  <div className="enterprise-cases__photo" aria-hidden="true" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
