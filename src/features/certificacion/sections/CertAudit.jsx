import { useState } from "react";
import { COLORS } from "@/design/tokens";
import { placeholderImage as heroImage } from "@/lib/media";
import Label from "@/shared/ui/Label";
import TransitionSection from "@/shared/transition/TransitionSection";
import GridImageReveal from "@/shared/ui/GridImageReveal";
import AuditScopeItem from "@/features/certificacion/components/AuditScopeItem";
import {
  SCOPE,
  AUDIT_STORIES,
} from "@/features/certificacion/certificacion.content";

export default function CertAudit() {
  const [activeAuditScope, setActiveAuditScope] = useState(0);

  return (
    <section className="cert-audit" id="alcance" data-ambient="light">
      <div className="cert-audit__scope">
        <header className="cert-audit__header">
          <Label color={COLORS.textOnLight}>La auditoría</Label>
          <h2>
            Lo que tu producto{" "}
            <span className="cert-accent">promete, comprobado.</span>
          </h2>
          <p>
            Auditamos solo lo que se puede comprobar desde fuera: lo que tu
            producto enseña, pide y comparte. Revisamos cuatro áreas conectadas
            y las convertimos en acciones concretas. No sustituimos a tu
            asesoría legal: somos la capa pública que demuestra, ante usuarios y
            mercado, que cumples lo que dices.
          </p>
        </header>

        <div
          className="cert-audit__accordions"
          aria-label="Áreas que revisa Prometeo"
        >
          {SCOPE.map((item, index) => (
            <AuditScopeItem
              key={item.title}
              item={item}
              index={index}
              open={activeAuditScope === index}
              onOpen={() => setActiveAuditScope(index)}
            />
          ))}
        </div>
      </div>

      <div className="cert-transition cert-audit__transition">
        <TransitionSection light title="Cómo lo comprobamos" column={3} />
      </div>

      <div
        className="cert-audit__stories"
        aria-label="Cómo se desarrolla la auditoría"
      >
        {AUDIT_STORIES.map((story) => (
          <article
            key={story.title}
            className={[
              "cert-audit-story",
              story.reverse && "cert-audit-story--reverse",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="cert-audit-story__visual" aria-hidden="true">
              <GridImageReveal
                src={heroImage}
                alt=""
                label=""
                tone="light"
                minHeight="100%"
                revealWidthRatio={1}
                objectPosition={story.objectPosition}
                className="cert-audit-story__image"
                style={{ height: "100%" }}
              />
            </div>

            <div className="cert-audit-story__copy">
              <div className="cert-audit-story__copy-inner">
                <h3>{story.title}</h3>
                <p>{story.body}</p>
                <p className="cert-audit-story__outcome">{story.outcome}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
