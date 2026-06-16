import { Link } from "react-router-dom";
import { COLORS, FONTS } from "@/design/tokens";
import { placeholderImage as heroImage } from "@/lib/media";
import Label from "@/shared/ui/Label";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { Grid, GridCell } from "@/shared/ui/Grid";

export default function CertHero({ heroBgRef }) {
  return (
    <section className="cert-hero" data-ambient="light">
      <div className="cert-hero__bg" aria-hidden="true">
        <img
          ref={heroBgRef}
          src={heroImage}
          alt=""
          className="cert-hero__bg-img"
          decoding="async"
          fetchPriority="high"
        />
        <div className="cert-hero__overlay" />
      </div>
      <Grid
        columns="site"
        className="cert-hero__content"
        style={{ gridTemplateRows: "auto auto" }}
      >
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="cert-hero__copy"
        >
          <div className="cert-hero__heading">
            <Label color={COLORS.textOnLight}>Certificación Prometeo</Label>
            <h1
              className="cert-hero__title"
              style={{
                fontFamily: FONTS.display,
                color: COLORS.textOnLight,
                margin: 0,
              }}
            >
              <span>Privacidad que se</span>
              <span className="cert-accent">puede demostrar.</span>
            </h1>
          </div>
        </GridCell>
        <GridCell
          span={2}
          className="cert-hero__copy-aside"
          aria-hidden="true"
        />
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="cert-hero__desc-spacer"
          aria-hidden="true"
        />
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="cert-hero__desc"
        >
          <div className="cert-hero__desc-inner">
            <p>
              Prometeo es una certificación independiente de privacidad.
              Auditamos lo que tus usuarios ven y viven (políticas, permisos,
              interfaz y terceros) y lo convertimos en una prueba pública y
              verificable de que cumples lo que prometes.
            </p>
            <SplitCtaButton
              as={Link}
              to="/contacto"
              label="Solicitar certificación"
              color={COLORS.textOnLight}
              iconBg={COLORS.pageLight}
              className="cert-hero__cta"
              style={{ "--ds-split-cta-width": "320px", maxWidth: "100%" }}
            />
          </div>
        </GridCell>
      </Grid>
    </section>
  );
}
