import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { COLORS, FONTS } from "../../design/tokens";
import { useScrollTextReveal } from "../../hooks/useScrollTextReveal";
import { scrollToTopImmediate } from "../../lib/lenis";
import { Page } from "../Page";
import LandingTransitionSection from "../landing/transition/LandingTransitionSection";
import GridImageReveal from "../system/GridImageReveal";
import Label from "../system/Label";
import { Grid, GridCell } from "../system/Grid";
import "../landing/shared/scrollTextReveal.css";
import "./para-ti.css";
import heroImage from "../../../Instagram Feed USB v1.png";

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
  },
  {
    title: "Comunidad",
    description: "Preguntas reales, experiencias compartidas y respuestas claras.",
    to: "/comunidad",
  },
  {
    title: "Tienda",
    description: "Objetos que trasladan la conversación digital al espacio cotidiano.",
    to: "/tienda",
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
  useScrollTextReveal(pageRef);

  useEffect(() => {
    function onScroll() {
      if (imgRef.current) {
        imgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Page light>
      <div ref={pageRef} className="para-ti-page">
        <section className="para-ti-hero">
          <div className="para-ti-hero__bg" aria-hidden="true">
            <img ref={imgRef} src={heroImage} alt="" className="para-ti-hero__bg-img" />
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
                <Label
                  color={COLORS.accent}
                  className="para-ti-hero__kicker"
                >
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
              <Label color={COLORS.accent}>Un recorrido posible</Label>
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
              <GridImageReveal
                src={heroImage}
                alt=""
                label=""
                tone="light"
                minHeight="100%"
                revealWidthRatio={1}
                objectPosition="center 62%"
                className="para-ti-access__image"
                style={{
                  height: "100%",
                  "--grid-image-bg": UI.bg,
                  "--grid-image-overlay": "transparent",
                }}
              />
            </GridCell>
            <GridCell className="para-ti-access__label">
              <Label color={COLORS.accent}>Elige por dónde entrar</Label>
            </GridCell>
          </Grid>

          <div className="para-ti-transition">
            <LandingTransitionSection
              light
              title="Los recursos"
              column={4}
            />
          </div>

          <nav className="para-ti-access__links" aria-label="Recursos para ti">
            {ACCESS_POINTS.map((item) => (
              <AccessLink
                key={item.to}
                item={item}
              />
            ))}
          </nav>
        </section>
      </div>
    </Page>
  );
}
