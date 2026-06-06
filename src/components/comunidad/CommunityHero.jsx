import { useEffect, useRef } from "react";
import { COLORS } from "../../design/tokens";
import Label from "../system/Label";
import { Grid, GridCell } from "../system/Grid";
import heroImage from "../../../Instagram Feed USB v1.png";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function CommunityHero() {
  const imageRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = null;

    if (!image || reducedMotion.matches) return undefined;

    function updateParallax() {
      frameId = null;
      const bounds = image.parentElement?.getBoundingClientRect();

      if (!bounds) return;

      const offset = clamp(
        (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) * 0.08,
        -44,
        44,
      );
      image.style.setProperty("--community-hero-parallax", `${offset}px`);
    }

    function scheduleUpdate() {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateParallax);
    }

    updateParallax();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <section className="community-hero">
      <div className="community-hero__bg" aria-hidden="true">
        <img
          ref={imageRef}
          src={heroImage}
          alt=""
          className="community-hero__bg-img"
        />
        <div className="community-hero__overlay" />
      </div>

      <Grid
        columns="site"
        className="community-hero__content"
        style={{ gridTemplateRows: "auto auto" }}
      >
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="community-hero__copy"
        >
          <div className="community-hero__heading">
            <Label color={COLORS.accent} className="community-hero__kicker">
              Comunidad Prometeo
            </Label>
            <h1 className="community-hero__title">
              <span>Preguntar para</span>
              <span className="community-accent">entender en común.</span>
            </h1>
          </div>
        </GridCell>

        <GridCell
          span={2}
          className="community-hero__copy-aside"
          aria-hidden="true"
        />

        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="community-hero__desc-spacer"
          aria-hidden="true"
        />

        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="community-hero__desc"
        >
          <p>
            Un espacio para convertir dudas sobre privacidad digital en
            conversaciones útiles, contrastar experiencias y avanzar con más
            contexto.
          </p>
        </GridCell>
      </Grid>
    </section>
  );
}
