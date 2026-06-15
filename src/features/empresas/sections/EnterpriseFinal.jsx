import { Link } from "react-router-dom";
import { COLORS, FONTS } from "@/design/tokens";
import { scrollToTopImmediate } from "@/lib/lenis";
import Label from "@/shared/ui/Label";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { Grid, GridCell } from "@/shared/ui/Grid";

export default function EnterpriseFinal() {
  return (
    <section className="enterprise-final">
      <Grid
        columns="site"
        className="enterprise-final__content"
        style={{ gridTemplateRows: "auto auto" }}
      >
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="enterprise-final__intro"
        >
          <Label color={COLORS.textOnLight} className="enterprise-final__kicker">
            Siguiente paso
          </Label>
          <p>
            La certificación Prometeo es el primer paso para convertir la
            privacidad en una ventaja competitiva.
          </p>
        </GridCell>
        <GridCell
          span={2}
          className="enterprise-final__intro-aside"
          aria-hidden="true"
        />
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="enterprise-final__cta-spacer"
          aria-hidden="true"
        />
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="enterprise-final__cta"
        >
          <div className="enterprise-final__cta-inner">
            <h2
              className="enterprise-final__title"
              style={{ fontFamily: FONTS.display, color: COLORS.textOnLight, margin: 0 }}
            >
              Haz de la privacidad una{" "}
              <span className="enterprise-accent">ventaja.</span>
            </h2>
            <SplitCtaButton
              as={Link}
              to="/certificacion"
              label="Solicitar certificación"
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
