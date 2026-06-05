import { useRef } from "react";
import { Link } from "react-router-dom";
import { COLORS, FONTS } from "../../design/tokens";
import { useScrollTextReveal } from "../../hooks/useScrollTextReveal";
import { scrollToTopImmediate } from "../../lib/lenis";
import { Page } from "../Page";
import LandingTransitionSection from "../landing/transition/LandingTransitionSection";
import Label from "../system/Label";
import TextReveal from "../system/TextReveal";
import { Grid, GridCell } from "../system/Grid";
import "../landing/shared/scrollTextReveal.css";
import "./para-ti.css";

const UI = {
  bg: COLORS.pageLight,
  text: COLORS.textOnLight,
};

const PRINCIPLES = [
  {
    index: "01",
    title: "Entiende",
    body: "Pon nombre a lo que ocurre antes de cambiar ajustes o instalar herramientas.",
  },
  {
    index: "02",
    title: "Decide",
    body: "Compara opciones con contexto y elige qué tiene sentido para ti.",
  },
  {
    index: "03",
    title: "Comparte",
    body: "Contrasta tu experiencia y convierte una duda individual en conocimiento común.",
  },
];

const ACCESS_POINTS = [
  {
    index: "01",
    eyebrow: "Leer",
    title: "Artículos",
    description: "Ideas y recursos para comprender la privacidad cotidiana.",
    to: "/articulos",
  },
  {
    index: "02",
    eyebrow: "Conversar",
    title: "Comunidad",
    description: "Preguntas reales, experiencias compartidas y respuestas claras.",
    to: "/comunidad",
  },
  {
    index: "03",
    eyebrow: "Llevarlo contigo",
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
      <span className="para-ti-path__index">{item.index}</span>
      <div className="para-ti-path__step-copy">
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
    </li>
  );
}

function AccessLink({ item, sequenceIndex }) {
  return (
    <Link
      to={item.to}
      className={`para-ti-access-link para-ti-access-link--${sequenceIndex + 1}`}
      onClick={scrollToTopImmediate}
    >
      <span className="para-ti-access-link__lead">
        <span className="para-ti-access-link__index">{item.index}</span>
        <span className="para-ti-access-link__eyebrow">{item.eyebrow}</span>
      </span>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <span className="para-ti-access-link__arrow">
        <ArrowIcon />
      </span>
    </Link>
  );
}

export default function ParaTiPage() {
  const pageRef = useRef(null);
  useScrollTextReveal(pageRef);

  return (
    <Page light>
      <div ref={pageRef} className="para-ti-page">
        <Grid as="section" columns="site" className="para-ti-hero">
          <GridCell
            span={3}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="para-ti-hero__copy"
          >
            <div className="para-ti-hero__meta">
              <Label color={COLORS.accent}>Para ti</Label>
              <span className="para-ti-meta">001 / Personas</span>
            </div>

            <TextReveal
              as="h1"
              once={false}
              lines={[
                "Entender primero.",
                <span className="para-ti-accent">Elegir después.</span>,
              ]}
              maskColor={UI.bg}
              className="para-ti-hero__title"
              style={{
                fontFamily: FONTS.display,
                color: UI.text,
                margin: 0,
              }}
            />
          </GridCell>

          <GridCell className="para-ti-hero__aside">
            <span className="para-ti-meta">PMT / 001</span>
            <div className="para-ti-hero__aside-copy">
              <Label color={COLORS.accent}>Privacidad cotidiana</Label>
              <p>
                Prometeo traduce situaciones digitales en decisiones que
                puedes comprender, cuestionar y tomar con más intención.
              </p>
            </div>
            <span className="para-ti-hero__signal" aria-hidden="true" />
          </GridCell>
        </Grid>

        <LandingTransitionSection light title="El recorrido" column={1} />

        <Grid as="section" columns="site" className="para-ti-path">
          <GridCell className="para-ti-path__intro">
            <div className="para-ti-path__intro-inner">
              <Label color={COLORS.accent}>Un recorrido posible</Label>
              <TextReveal
                as="h2"
                once={false}
                lines={["No necesitas entender", "todo internet hoy."]}
                maskColor={UI.bg}
                className="para-ti-path__title"
              />
              <p>
                Empieza por una situación concreta. El objetivo no es saberlo
                todo, sino recuperar capacidad de decisión.
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
                <PrincipleRow key={item.index} item={item} />
              ))}
            </ol>
          </GridCell>
        </Grid>

        <LandingTransitionSection light title="Los caminos" column={3} />

        <section className="para-ti-access">
          <Grid columns="site" className="para-ti-access__header">
            <GridCell className="para-ti-access__label">
              <Label color={COLORS.accent}>Elige por dónde entrar</Label>
            </GridCell>
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="para-ti-access__title-cell"
            >
              <TextReveal
                as="h2"
                once={false}
                lines={["Una pregunta.", "Distintos caminos."]}
                maskColor={UI.bg}
                className="para-ti-access__title"
              />
            </GridCell>
            <GridCell className="para-ti-access__note">
              <p>
                Lee, conversa o lleva la idea al espacio cotidiano. Empieza por
                el formato que te resulte útil ahora.
              </p>
            </GridCell>
          </Grid>

          <nav className="para-ti-access__links" aria-label="Recursos para ti">
            {ACCESS_POINTS.map((item, index) => (
              <AccessLink
                key={item.to}
                item={item}
                sequenceIndex={index}
              />
            ))}
          </nav>
        </section>
      </div>
    </Page>
  );
}
