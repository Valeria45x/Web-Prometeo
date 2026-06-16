import { COLORS, FONTS } from "@/design/tokens";
import { placeholderImage as heroImage } from "@/lib/media";
import Label from "@/shared/ui/Label";
import { Grid, GridCell } from "@/shared/ui/Grid";
import { useParaTiHeroParallax } from "@/features/para-ti/hooks/useParaTiHeroParallax";

export default function ParaTiHero() {
  const imgRef = useParaTiHeroParallax();

  return (
    <section className="para-ti-hero">
      <div className="para-ti-hero__bg" aria-hidden="true">
        <img
          ref={imgRef}
          src={heroImage}
          alt=""
          className="para-ti-hero__bg-img"
          decoding="async"
          fetchPriority="high"
        />
        <div className="para-ti-hero__overlay" />
        <div className="para-ti-hero__blackout" />
      </div>
      <Grid
        columns="site"
        className="para-ti-hero__content"
        style={{ gridTemplateRows: "auto auto" }}
      >
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="para-ti-hero__copy"
        >
          <div className="para-ti-hero__heading">
            <Label color={COLORS.textOnLight} className="para-ti-hero__kicker">
              Para ti
            </Label>
            <h1
              className="para-ti-hero__title"
              style={{
                fontFamily: FONTS.display,
                color: COLORS.textOnLight,
                margin: 0,
              }}
            >
              <span>Entender primero.</span>
              <span className="para-ti-accent">Elegir después.</span>
            </h1>
          </div>
        </GridCell>
        <GridCell
          span={2}
          className="para-ti-hero__copy-aside"
          aria-hidden="true"
        />
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="para-ti-hero__desc-spacer"
          aria-hidden="true"
        />
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="para-ti-hero__desc"
        >
          <p>
            Explicaciones claras, experiencias compartidas y herramientas para
            reconocer qué está pasando, comparar opciones y avanzar con
            criterio.
          </p>
        </GridCell>
      </Grid>
    </section>
  );
}
