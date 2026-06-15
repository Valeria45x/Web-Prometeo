import { Link } from "react-router-dom";
import { COLORS } from "@/design/tokens";
import { scrollToTopImmediate } from "@/lib/lenis";
import Label from "@/shared/ui/Label";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { Grid, GridCell } from "@/shared/ui/Grid";

export default function CertFinal() {
  return (
    <section className="cert-final" data-ambient="light">
      <Grid
        columns="site"
        className="cert-final__content"
        style={{ gridTemplateRows: "auto auto" }}
      >
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="cert-final__intro"
        >
          <Label color={COLORS.textOnLight}>Siguiente paso</Label>
          <p>
            Cuéntanos qué hace tu producto. Respondemos con alcance, plazos y
            coste en menos de una semana.
          </p>
        </GridCell>
        <GridCell
          span={2}
          className="cert-final__intro-aside"
          aria-hidden="true"
        />
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="cert-final__cta-spacer"
          aria-hidden="true"
        />
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="cert-final__cta"
        >
          <div className="cert-final__cta-inner">
            <h2 className="cert-final__title">
              Convierte la privacidad en algo que se{" "}
              <span className="cert-accent">puede demostrar.</span>
            </h2>
            <SplitCtaButton
              as={Link}
              to="/contacto"
              label="Empezar la solicitud"
              color={COLORS.textOnLight}
              iconBg={COLORS.pageLight}
              style={{ "--ds-split-cta-width": "320px", maxWidth: "100%" }}
              onClick={scrollToTopImmediate}
            />
          </div>
        </GridCell>
      </Grid>
    </section>
  );
}
