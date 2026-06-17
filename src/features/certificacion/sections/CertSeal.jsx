import { Link } from "react-router-dom";
import { COLORS } from "@/design/tokens";
import Label from "@/shared/ui/Label";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { LEVELS } from "@/features/certificacion/certificacion.content";

export default function CertSeal() {
  return (
    <section className="cert-seal" id="sello" data-ambient="light">
      <div className="cert-seal__composition">
        <div className="cert-seal__header">
          <div className="cert-seal__heading">
            <Label color={COLORS.textOnLight}>El sello</Label>
            <h2>
              Una señal. <span className="cert-accent">Tres niveles.</span>
            </h2>
          </div>
          <p>
            Cualquier nivel significa que la empresa cumple el Estándar
            Prometeo, público y verificable. Los niveles no miden si se puede
            confiar, sino hasta dónde llega ese compromiso.
          </p>
        </div>

        <div className="cert-seal__levels">
          {LEVELS.map((level) => (
            <article key={level.number} className="cert-seal-level">
              <div className="cert-seal-level__badge" aria-hidden="true">
                <span className="cert-seal-level__badge-mark">PRO ®</span>
                <span className="cert-seal-level__badge-level">
                  N{level.number}
                </span>
                <span className="cert-seal-level__badge-note">
                  Sello · placeholder
                </span>
              </div>
              <div className="cert-seal-level__copy">
                <span className="cert-seal-level__index">
                  Nivel {level.number}
                </span>
                <h3>{level.name}</h3>
              </div>
            </article>
          ))}
        </div>

        <div className="cert-seal__action">
          <div className="cert-seal__action-copy">
            <h3>Empezar por la auditoría.</h3>
            <p>
              Revisamos tu producto, te entregamos un diagnóstico claro y, si
              cumple el estándar, emitimos el sello correspondiente.
            </p>
          </div>
          <SplitCtaButton
            as={Link}
            to="/contacto"
            label="Solicitar auditoría"
            color={COLORS.textOnLight}
            iconBg={COLORS.pageLight}
            style={{ "--ds-split-cta-width": "320px", maxWidth: "100%" }}
          />
        </div>

        <div className="cert-seal__note">
          <p>Cada sello emitido es público y verificable en el registro.</p>
          <SplitCtaButton
            as={Link}
            to="/empresas/registro"
            label="Ver el registro público"
            color={COLORS.textOnLight}
            iconBg={COLORS.pageLight}
            style={{ "--ds-split-cta-width": "320px", maxWidth: "100%" }}
          />
        </div>
      </div>
    </section>
  );
}
