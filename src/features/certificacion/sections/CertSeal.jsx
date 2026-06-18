import { Link } from "react-router-dom";
import { COLORS } from "@/design/tokens";
import Label from "@/shared/ui/Label";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { SEAL_GUARANTEES } from "@/features/certificacion/certificacion.content";

export default function CertSeal() {
  return (
    <section className="cert-seal" id="sello" data-ambient="light">
      <div className="cert-seal__composition">
        <div className="cert-seal__header">
          <div className="cert-seal__header-inner">
            <div className="cert-seal__heading">
              <Label color={COLORS.textOnLight}>El sello</Label>
              <h2>
                Un solo estándar.{" "}
                <span className="cert-accent">Sin niveles.</span>
              </h2>
            </div>
            <p>
              No certificamos grados de privacidad. O una empresa cumple el
              Estándar Prometeo —público y verificable— o no lo cumple. El sello
              es uno y significa exactamente eso: «Privacidad certificada por
              Prometeo».
            </p>
          </div>
        </div>

        <div className="cert-seal__levels">
          {SEAL_GUARANTEES.map((item) => (
            <article key={item.index} className="cert-seal-level">
              <div className="cert-seal-level__badge" aria-hidden="true">
                <span className="cert-seal-level__badge-level">
                  {item.index}
                </span>
              </div>
              <div className="cert-seal-level__copy">
                <span className="cert-seal-level__index">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="cert-seal__next">
        <div className="cert-seal__next-panel">
          <div className="cert-seal__action-copy">
            <h3>Empezar por la auditoría.</h3>
            <p>
              Revisamos tu producto, te entregamos un diagnóstico claro y, si
              cumple el estándar, emitimos el sello.
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

        <div className="cert-seal__next-panel">
          <div className="cert-seal__action-copy">
            <h3>Registro público.</h3>
            <p>Cada sello emitido es público y verificable en el registro.</p>
          </div>
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
