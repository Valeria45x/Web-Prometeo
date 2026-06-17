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
          <Label color={COLORS.textOnLight}>Empresas</Label>
          <h2>
            Confianza con{" "}
            <span className="enterprise-accent">nombre propio.</span>
          </h2>
          <p>
            Cada empresa entiende la privacidad desde su propio mundo. Prometeo
            les ayuda a convertir esa confianza en algo claro, reconocible y
            verificable.
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
