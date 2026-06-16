import { Link } from "react-router-dom";
import { COLORS } from "@/design/tokens";
import { placeholderImage as heroImage } from "@/lib/media";
import Label from "@/shared/ui/Label";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";

export default function AccessCard({ item, index, onSelect }) {
  return (
    <article
      id={`para-ti-access-card-${index + 1}`}
      className="para-ti-access-card"
      style={{ "--para-ti-card-index": index }}
      aria-labelledby={`para-ti-access-title-${index + 1}`}
    >
      <div className="para-ti-access-card__number" aria-hidden="true">
        {item.number}
      </div>

      <div className="para-ti-access-card__image-wrap" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          className="para-ti-access-card__image"
          style={{ objectPosition: item.imagePosition }}
          loading="lazy"
          decoding="async"
        />
      </div>

      <button
        type="button"
        id={`para-ti-access-title-${index + 1}`}
        className="para-ti-access-card__title"
        onClick={() => onSelect(index)}
        aria-label={`Mostrar la tarjeta de ${item.title}`}
      >
        <span>{item.title}</span>
        <span className="para-ti-access-card__title-action" aria-hidden="true">
          Ver
        </span>
      </button>

      <div className="para-ti-access-card__detail">
        <div className="para-ti-access-card__copy">
          <Label
            color={COLORS.textOnLight}
            className="para-ti-access-card__eyebrow"
          >
            {item.eyebrow}
          </Label>
          <p>{item.description}</p>
        </div>
        <SplitCtaButton
          as={Link}
          to={item.to}
          label={item.cta}
          color={COLORS.textOnLight}
          iconBg={COLORS.pageLight}
          className="para-ti-access-card__cta"
          style={{ "--ds-split-cta-width": "320px", maxWidth: "100%" }}
        />
      </div>
    </article>
  );
}
