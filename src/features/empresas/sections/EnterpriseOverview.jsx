import { Link } from "react-router-dom";
import { COLORS } from "@/design/tokens";
import { placeholderImage as heroImage } from "@/lib/media";
import Label from "@/shared/ui/Label";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import GridImageReveal from "@/shared/ui/GridImageReveal";
import { OVERVIEW_CARDS } from "@/features/empresas/empresas.content";

export default function EnterpriseOverview() {
  return (
    <section className="enterprise-overview" aria-label="Vista general">
      <div className="enterprise-overview__visual">
        <GridImageReveal
          src={heroImage}
          alt=""
          label=""
          tone="light"
          minHeight="100%"
          revealWidthRatio={1}
          objectPosition="center 40%"
          className="enterprise-overview__reveal"
          style={{
            height: "100%",
            "--grid-image-bg": COLORS.grayWhite,
            "--grid-image-overlay": "transparent",
          }}
        />
      </div>

      <div className="enterprise-overview__panel">
        <div className="enterprise-overview__headline">
          <Label color={COLORS.textOnLight}>La propuesta</Label>
          <h2>
            Más que un sello.{" "}
            <span className="enterprise-accent">Un sistema.</span>
          </h2>
        </div>

        <div className="enterprise-overview__cards">
          {OVERVIEW_CARDS.map((card) => (
            <div key={card.title} className="enterprise-overview__card">
              <div className="enterprise-overview__card-copy">
                <Label
                  color={COLORS.textOnLight}
                  className="enterprise-overview__card-eyebrow"
                >
                  {card.eyebrow}
                </Label>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
              <SplitCtaButton
                as={Link}
                to={card.to}
                label={card.cta}
                color={COLORS.textOnLight}
                iconBg={COLORS.pageLight}
                className="enterprise-overview__card-cta"
                style={{ "--ds-split-cta-width": "100%", maxWidth: "100%" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
