import { Link } from "react-router-dom";
import { COLORS, FONTS } from "@/design/tokens";
import { Page } from "@/shared/layout/Page";
import Label from "@/shared/ui/Label";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { Grid, GridCell } from "@/shared/ui/Grid";
import "@/features/not-found/not-found.css";

export default function NotFoundPage() {
  return (
    <Page light>
      <section className="notfound" data-ambient="light">
        <Grid
          columns="site"
          className="notfound__content"
          style={{ gridTemplateRows: "auto auto" }}
        >
          <GridCell
            span={2}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="notfound__copy"
          >
            <Label color={COLORS.textOnLight}>Error 404</Label>
            <h1
              className="notfound__title"
              style={{
                fontFamily: FONTS.display,
                color: COLORS.textOnLight,
                margin: 0,
              }}
            >
              <span>Esta página no</span>
              <span className="notfound-accent">deja rastro.</span>
            </h1>
          </GridCell>

          <GridCell span={2} className="notfound__aside" aria-hidden="true" />

          <GridCell
            span={2}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="notfound__cta-spacer"
            aria-hidden="true"
          />

          <GridCell
            span={2}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="notfound__cta"
          >
            <div className="notfound__cta-inner">
              <p className="notfound__desc">
                La página que buscabas no existe o cambió de sitio. Aquí no hay
                nada que rastrear, pero el camino de vuelta es fácil.
              </p>
              <div className="notfound__actions">
                <SplitCtaButton
                  as={Link}
                  to="/"
                  label="Volver al inicio"
                  color={COLORS.textOnLight}
                  iconBg={COLORS.pageLight}
                  style={{ "--ds-split-cta-width": "320px", maxWidth: "100%" }}
                />
                <SplitCtaButton
                  as={Link}
                  to="/para-ti"
                  label="Empezar por entender"
                  color={COLORS.textOnLight}
                  iconBg={COLORS.pageLight}
                  style={{ "--ds-split-cta-width": "320px", maxWidth: "100%" }}
                />
              </div>
            </div>
          </GridCell>
        </Grid>
      </section>
    </Page>
  );
}
