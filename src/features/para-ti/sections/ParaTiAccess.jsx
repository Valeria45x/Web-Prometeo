import { Link } from "react-router-dom";
import { COLORS } from "@/design/tokens";
import { placeholderImage as accessImage } from "@/lib/media";
import GridImageReveal from "@/shared/ui/GridImageReveal";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { ACCESS_POINTS } from "@/features/para-ti/para-ti.content";

export default function ParaTiAccess() {
  return (
    <section className="para-ti-access" aria-label="Elige tu camino">
      <div className="para-ti-access__image-band" aria-hidden="true">
        <GridImageReveal
          src={accessImage}
          alt=""
          tone="light"
          parallaxOnly
          minHeight="var(--para-ti-access-image-height)"
          objectPosition="center 48%"
          className="para-ti-access__image"
        />
      </div>

      <div className="para-ti-access__index">
        {ACCESS_POINTS.map((item) => (
          <article key={item.to} className="para-ti-access-row">
            <div className="para-ti-access-row__heading">
              <h3>{item.title}</h3>
            </div>

            <div className="para-ti-access-row__copy">
              <p>{item.description}</p>
            </div>

            <SplitCtaButton
              as={Link}
              to={item.to}
              label={item.cta}
              color={COLORS.textOnLight}
              iconBg={COLORS.pageLight}
              className="para-ti-access-row__cta"
              style={{ "--ds-split-cta-width": "340px", maxWidth: "100%" }}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
