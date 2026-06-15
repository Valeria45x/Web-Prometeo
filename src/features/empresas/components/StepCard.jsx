import { Link } from "react-router-dom";
import { COLORS } from "@/design/tokens";
import { scrollToTopImmediate } from "@/lib/lenis";
import { placeholderImage as heroImage } from "@/lib/media";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";

export default function StepCard({ item, index, onReveal }) {
  return (
    <article
      className="enterprise-step-card"
      style={{ "--enterprise-card-index": index }}
      aria-labelledby={`enterprise-step-title-${index + 1}`}
    >
      <div className="enterprise-step-card__image-wrap" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          className="enterprise-step-card__image"
          style={{ objectPosition: item.imagePosition }}
          loading="lazy"
          decoding="async"
        />
      </div>

      <button
        type="button"
        id={`enterprise-step-title-${index + 1}`}
        className="enterprise-step-card__title"
        onClick={() => onReveal(index)}
        aria-label={`Mostrar el paso ${item.title}`}
      >
        <span>{item.title}</span>
        <span className="enterprise-step-card__title-action" aria-hidden="true">
          Ver
        </span>
      </button>

      <div className="enterprise-step-card__detail">
        <p>{item.body}</p>
        <SplitCtaButton
          as={Link}
          to={item.to}
          label={item.cta}
          color={COLORS.textOnLight}
          iconBg={COLORS.pageLight}
          className="enterprise-step-card__cta"
          style={{ "--ds-split-cta-width": "320px", maxWidth: "100%" }}
          onClick={scrollToTopImmediate}
        />
      </div>
    </article>
  );
}
