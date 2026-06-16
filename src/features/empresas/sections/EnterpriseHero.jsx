import { Link } from "react-router-dom";
import { COLORS, FONTS } from "@/design/tokens";
import { placeholderImage as heroImage } from "@/lib/media";
import Label from "@/shared/ui/Label";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { Grid, GridCell } from "@/shared/ui/Grid";
import { useEnterpriseHeroParallax } from "@/features/empresas/hooks/useEnterpriseHeroParallax";

export default function EnterpriseHero() {
  const imgRef = useEnterpriseHeroParallax();

  return (
    <section className="enterprise-hero">
      <div className="enterprise-hero__bg" aria-hidden="true">
        <img
          ref={imgRef}
          src={heroImage}
          alt=""
          className="enterprise-hero__bg-img"
          decoding="async"
          fetchPriority="high"
        />
        <div className="enterprise-hero__overlay" />
      </div>

      <Grid
        columns="site"
        className="enterprise-hero__content"
        style={{ gridTemplateRows: "auto auto" }}
      >
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="enterprise-hero__copy"
        >
          <div className="enterprise-hero__heading">
            <Label
              color={COLORS.textOnLight}
              className="enterprise-hero__kicker"
            >
              Para empresas
            </Label>
            <h1
              className="enterprise-hero__title"
              style={{
                fontFamily: FONTS.display,
                color: COLORS.textOnLight,
                margin: 0,
              }}
            >
              <span>Privacidad que te</span>
              <span className="enterprise-accent">diferencia.</span>
            </h1>
          </div>
        </GridCell>
        <GridCell
          span={2}
          className="enterprise-hero__copy-aside"
          aria-hidden="true"
        />
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="enterprise-hero__desc-spacer"
          aria-hidden="true"
        />
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="enterprise-hero__desc"
        >
          <div className="enterprise-hero__desc-inner">
            <p>
              La mayoría de empresas piden confianza. Pocas pueden probar que la
              merecen. Prometeo convierte tu compromiso con la privacidad en
              algo visible, verificable y diferencial.
            </p>
            <SplitCtaButton
              as={Link}
              to="/certificacion"
              label="Solicitar certificación"
              color={COLORS.textOnLight}
              iconBg={COLORS.pageLight}
              className="enterprise-hero__cta"
              style={{ "--ds-split-cta-width": "320px", maxWidth: "100%" }}
            />
          </div>
        </GridCell>
      </Grid>
    </section>
  );
}
