import { useRef } from "react";
import { Link } from "react-router-dom";
import audienceImage from "../../../Instagram Feed USB v1.png";
import { COLORS, FONTS } from "../../design/tokens";
import { useScrollTextReveal } from "../../hooks/useScrollTextReveal";
import { scrollToTopImmediate } from "../../lib/lenis";
import { Page } from "../Page";
import GridImageReveal from "../system/GridImageReveal";
import Label from "../system/Label";
import SplitCtaButton from "../system/SplitCtaButton";
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

function AccessLink({ item }) {
  return (
    <Link
      to={item.to}
      className="para-ti-access-link"
      onClick={scrollToTopImmediate}
    >
      <span className="para-ti-access-link__index">{item.index}</span>
      <div className="para-ti-access-link__copy">
        <span className="para-ti-access-link__eyebrow">{item.eyebrow}</span>
        <h3>{item.title}</h3>
      </div>
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

            <div className="para-ti-hero__support">
              <p className="para-ti-hero__body">
                Prometeo traduce la privacidad cotidiana en decisiones que
                puedes comprender, cuestionar y tomar con más intención.
              </p>

              <SplitCtaButton
                as={Link}
                to="/articulos"
                label="Encontrar un punto de entrada"
                color={UI.text}
                iconBg={UI.bg}
                fullWidth
                onClick={scrollToTopImmediate}
              />
            </div>
          </GridCell>

          <GridCell className="para-ti-hero__visual">
            <GridImageReveal
              src={audienceImage}
              alt="Persona sosteniendo una pieza de la colección Prometeo"
              label=""
              tone="light"
              minHeight="100%"
              revealWidthRatio={1}
              objectPosition="58% center"
              className="para-ti-hero__image"
              style={{
                height: "100%",
                "--grid-image-overlay": "transparent",
              }}
            />
            <div className="para-ti-hero__visual-meta">
              <span>Privacidad cotidiana</span>
              <span>PMT / 001</span>
            </div>
          </GridCell>
        </Grid>

        <section className="para-ti-path">
          <div className="para-ti-path__intro">
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

          <ol className="para-ti-path__steps">
            {PRINCIPLES.map((item) => (
              <PrincipleRow key={item.index} item={item} />
            ))}
          </ol>
        </section>

        <div className="para-ti-rail" aria-hidden="true">
          <div className="para-ti-rail__track">
            <span>Entiende / Decide / Comparte /</span>
            <span>Entiende / Decide / Comparte /</span>
          </div>
        </div>

        <section className="para-ti-access">
          <div className="para-ti-access__intro">
            <Label color={COLORS.accent}>Elige por dónde entrar</Label>
            <h2>Una pregunta puede abrir distintos caminos.</h2>
            <p>Escoge el formato que te resulte útil ahora.</p>
          </div>

          <nav className="para-ti-access__links" aria-label="Recursos para ti">
            {ACCESS_POINTS.map((item) => (
              <AccessLink key={item.to} item={item} />
            ))}
          </nav>
        </section>
      </div>
    </Page>
  );
}
