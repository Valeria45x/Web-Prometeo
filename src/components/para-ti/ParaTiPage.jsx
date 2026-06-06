import { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { COLORS, FONTS } from "../../design/tokens";
import { useScrollTextReveal } from "../../hooks/useScrollTextReveal";
import { scrollToTopImmediate } from "../../lib/lenis";
import { Page } from "../Page";
import LandingTransitionSection from "../landing/transition/LandingTransitionSection";
import Label from "../system/Label";
import { Grid, GridCell } from "../system/Grid";
import "../landing/shared/scrollTextReveal.css";
import "./para-ti.css";
import heroImage from "../../../Instagram Feed USB v1.png";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

const UI = {
  bg: COLORS.pageLight,
  text: COLORS.textOnLight,
};

const PRINCIPLES = [
  {
    title: "Entiende",
    body: "Pon nombre a lo que ocurre antes de cambiar ajustes o instalar herramientas.",
  },
  {
    title: "Decide",
    body: "Compara opciones con contexto y elige qué tiene sentido para ti.",
  },
  {
    title: "Comparte",
    body: "Contrasta tu experiencia y convierte una duda individual en conocimiento común.",
  },
];

const ACCESS_POINTS = [
  {
    title: "Artículos",
    description: "Ideas y recursos para comprender la privacidad cotidiana.",
    to: "/articulos",
    transitionTitle: "La conversación",
    transitionColumn: 2,
  },
  {
    title: "Comunidad",
    description:
      "Preguntas reales, experiencias compartidas y respuestas claras.",
    to: "/comunidad",
    transitionTitle: "La tienda",
    transitionColumn: 3,
  },
  {
    title: "Tienda",
    description:
      "Objetos que trasladan la conversación digital al espacio cotidiano.",
    to: "/tienda",
    transitionTitle: "Sigue explorando",
    transitionColumn: 4,
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function PrincipleRow({ item }) {
  return (
    <li className="para-ti-path__step">
      <div className="para-ti-path__step-copy">
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
    </li>
  );
}

function AccessLink({ item }) {
  return (
    <Link
      to={item.to}
      className="para-ti-access-link"
      onClick={scrollToTopImmediate}
    >
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <span className="para-ti-access-link__action">
        <ArrowIcon />
      </span>
    </Link>
  );
}

export default function ParaTiPage() {
  const pageRef = useRef(null);
  const imgRef = useRef(null);
  const accessImageFrameRef = useRef(null);
  const accessImageRef = useRef(null);
  useScrollTextReveal(pageRef);

  useEffect(() => {
    const accessImageFrame = accessImageFrameRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = null;

    function updateHeroImage() {
      if (!imgRef.current) return;

      const frame = imgRef.current.parentElement;
      const rect = frame?.getBoundingClientRect();

      if (!rect) return;

      const offset = clamp(
        (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.1,
        -48,
        48,
      );

      imgRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.12)`;
    }

    function updateAccessImage() {
      if (!accessImageFrame || !accessImageRef.current) return;

      if (reducedMotion.matches) {
        accessImageFrame.style.setProperty("--para-ti-access-clip-right", "0%");
        accessImageFrame.style.setProperty("--para-ti-access-shift", "0%");
        accessImageRef.current.style.transform =
          "translate3d(0, 0, 0) scale(1.14)";
        return;
      }

      const rect = accessImageFrame.getBoundingClientRect();
      const revealStart = window.innerHeight * 0.96;
      const revealEnd = window.innerHeight * 0.42;
      const revealRange = Math.max(revealStart - revealEnd, 1);
      const revealProgress = clamp(
        (revealStart - rect.top) / revealRange,
        0,
        1,
      );
      const offset = clamp(
        (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.12,
        -48,
        48,
      );

      accessImageFrame.style.setProperty(
        "--para-ti-access-clip-right",
        `${(1 - revealProgress) * 100}%`,
      );
      accessImageFrame.style.setProperty(
        "--para-ti-access-shift",
        `${(1 - revealProgress) * 6}%`,
      );
      accessImageRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.14)`;
    }

    function updateMotion() {
      updateHeroImage();
      updateAccessImage();
    }

    function scheduleUpdate() {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateMotion();
      });
    }

    updateMotion();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <Page light>
      <div ref={pageRef} className="para-ti-page">
        <section className="para-ti-hero">
          <div className="para-ti-hero__bg" aria-hidden="true">
            <img
              ref={imgRef}
              src={heroImage}
              alt=""
              className="para-ti-hero__bg-img"
            />
            <div className="para-ti-hero__overlay" />
          </div>
          <Grid
            columns="site"
            className="para-ti-hero__content"
            style={{ gridTemplateRows: "auto auto" }}
          >
            {/* Fila 1: label + título */}
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="para-ti-hero__copy"
            >
              <div className="para-ti-hero__heading">
                <Label color={COLORS.accent} className="para-ti-hero__kicker">
                  Para ti
                </Label>
                <h1
                  className="para-ti-hero__title"
                  style={{
                    fontFamily: FONTS.display,
                    color: UI.text,
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
            {/* Fila 2: descripción */}
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
                Recursos, comunidad y herramientas para tomar decisiones sobre
                tu privacidad digital con más intención.
              </p>
            </GridCell>
          </Grid>
        </section>

        <div className="para-ti-transition">
          <LandingTransitionSection light title="El recorrido" column={1} />
        </div>

        <Grid as="section" columns="site" className="para-ti-path">
          <GridCell className="para-ti-path__intro">
            <div className="para-ti-path__intro-inner">
              <h2 className="para-ti-path__heading">Un recorrido posible</h2>
              <p className="para-ti-path__statement">
                Empieza por una situación concreta y avanza a tu ritmo.
              </p>
              <p>
                No necesitas comprender todo internet hoy. El objetivo es
                recuperar capacidad de decisión en lo que ya forma parte de tu
                día a día.
              </p>
            </div>
          </GridCell>

          <GridCell
            span={3}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="para-ti-path__steps-cell"
          >
            <ol className="para-ti-path__steps">
              {PRINCIPLES.map((item) => (
                <PrincipleRow key={item.title} item={item} />
              ))}
            </ol>
          </GridCell>
        </Grid>

        <div className="para-ti-transition">
          <LandingTransitionSection light title="Los caminos" column={3} />
        </div>

        <section className="para-ti-access">
          <Grid columns="site" className="para-ti-access__header">
            <GridCell
              span={3}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="para-ti-access__image-cell"
            >
              <div
                ref={accessImageFrameRef}
                className="para-ti-access__image-reveal"
              >
                <img
                  ref={accessImageRef}
                  src={heroImage}
                  alt=""
                  className="para-ti-access__image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </GridCell>
            <GridCell className="para-ti-access__label">
              <Label color={COLORS.accent}>Elige por dónde entrar</Label>
            </GridCell>
          </Grid>

          <div className="para-ti-transition">
            <LandingTransitionSection light title="Los recursos" column={4} />
          </div>

          <nav className="para-ti-access__links" aria-label="Recursos para ti">
            {ACCESS_POINTS.map((item) => (
              <Fragment key={item.to}>
                <AccessLink item={item} />
                <div className="para-ti-transition">
                  <LandingTransitionSection
                    light
                    title={item.transitionTitle}
                    column={item.transitionColumn}
                  />
                </div>
              </Fragment>
            ))}
          </nav>
        </section>
      </div>
    </Page>
  );
}
