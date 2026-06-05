import { useRef } from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../../design/tokens";
import { useScrollTextReveal } from "../../hooks/useScrollTextReveal";
import { scrollToTopImmediate } from "../../lib/lenis";
import { Page } from "../Page";
import LandingTransitionSection from "../landing/transition/LandingTransitionSection";
import Label from "../system/Label";
import SplitCtaButton from "../system/SplitCtaButton";
import TextReveal from "../system/TextReveal";
import { Grid, GridCell } from "../system/Grid";
import "../landing/shared/scrollTextReveal.css";
import "./certificacion.css";

const UI = {
  bg: COLORS.pageLight,
  text: COLORS.textOnLight,
};

const CRITERIA = [
  {
    index: "01",
    title: "Práctica",
    body: "Cómo se integran la privacidad y el cuidado de los datos en el trabajo cotidiano.",
  },
  {
    index: "02",
    title: "Evidencia",
    body: "Qué documentos, decisiones y procesos permiten comprobar ese compromiso.",
  },
  {
    index: "03",
    title: "Comunicación",
    body: "Cómo se explica la privacidad para que el usuario pueda reconocerla y entenderla.",
  },
];

const PROCESS = [
  {
    index: "01",
    title: "Diagnóstico",
    body: "Revisamos el punto de partida y el contexto de la organización.",
  },
  {
    index: "02",
    title: "Criterios",
    body: "Definimos qué nivel PMT encaja con su madurez actual.",
  },
  {
    index: "03",
    title: "Evidencias",
    body: "Ordenamos la documentación necesaria para sostener cada criterio.",
  },
  {
    index: "04",
    title: "Revisión",
    body: "Comprobamos la coherencia entre lo que la empresa dice, hace y muestra.",
  },
  {
    index: "05",
    title: "Publicación",
    body: "La certificación se activa como una señal visible y verificable.",
  },
];

const LEVELS = [
  {
    index: "01",
    name: "Essential",
    label: "Punto de partida",
    body: "Para organizaciones que empiezan a ordenar su privacidad y quieren mostrar un primer compromiso.",
  },
  {
    index: "02",
    name: "Verified",
    label: "Evidencia revisada",
    body: "Para equipos con procesos documentados, evidencias comprobables y una comunicación clara.",
    featured: true,
  },
  {
    index: "03",
    name: "Continuous",
    label: "Práctica continua",
    body: "Para organizaciones que revisan cambios y mantienen la privacidad como parte del producto.",
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

function CriterionRow({ item }) {
  return (
    <article className="certification-criteria__item">
      <span className="certification-meta">{item.index}</span>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </article>
  );
}

function ProcessRow({ item }) {
  return (
    <li className="certification-process__step">
      <span className="certification-process__marker" aria-hidden="true" />
      <span className="certification-meta">{item.index}</span>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </li>
  );
}

function Level({ item }) {
  return (
    <article
      className={[
        "certification-level",
        item.featured && "certification-level--featured",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="certification-level__meta">
        <span className="certification-meta">{item.index}</span>
        <span className="certification-level__label">{item.label}</span>
      </div>
      <div className="certification-level__copy">
        <h3>{item.name}</h3>
        <p>{item.body}</p>
      </div>
    </article>
  );
}

export default function CertificacionPage() {
  const pageRef = useRef(null);
  useScrollTextReveal(pageRef);

  return (
    <Page light>
      <div ref={pageRef} className="certification-page">
        <Grid as="section" columns="site" className="certification-hero">
          <GridCell
            span={3}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="certification-hero__copy"
          >
            <div className="certification-hero__meta">
              <Label color={COLORS.accent}>Certificación Prometeo</Label>
              <span className="certification-meta">003 / Sistema PMT</span>
            </div>

            <TextReveal
              as="h1"
              once={false}
              lines={[
                "Privacidad",
                <span className="certification-accent">verificable.</span>,
              ]}
              maskColor={UI.bg}
              className="certification-hero__title"
            />
          </GridCell>

          <GridCell className="certification-hero__aside">
            <span className="certification-meta">PMT / CERT</span>
            <div className="certification-hero__aside-copy">
              <p>
                Un sistema para revisar, documentar y hacer visible el
                compromiso de una organización con la privacidad.
              </p>
              <SplitCtaButton
                as={Link}
                to="/contacto"
                label="Solicitar evaluación"
                color={UI.text}
                iconBg={UI.bg}
                fullWidth
                onClick={scrollToTopImmediate}
              />
            </div>
            <span className="certification-hero__signal" aria-hidden="true" />
          </GridCell>
        </Grid>

        <LandingTransitionSection light title="Qué certifica" column={1} />

        <Grid as="section" columns="site" className="certification-criteria">
          <GridCell className="certification-criteria__intro">
            <div className="certification-criteria__intro-inner">
              <Label color={COLORS.accent}>Tres dimensiones</Label>
              <TextReveal
                as="h2"
                once={false}
                lines={["Una señal apoyada", "en evidencia."]}
                maskColor={UI.bg}
                className="certification-section-title"
              />
              <p>
                El sello no sustituye las buenas prácticas. Resume una revisión
                estructurada que el usuario puede consultar.
              </p>
            </div>
          </GridCell>

          <GridCell
            span={3}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="certification-criteria__list"
          >
            {CRITERIA.map((item) => (
              <CriterionRow key={item.index} item={item} />
            ))}
          </GridCell>
        </Grid>

        <LandingTransitionSection light title="El proceso" column={2} />

        <section className="certification-process">
          <Grid columns="site" className="certification-process__header">
            <GridCell className="certification-process__label">
              <Label color={COLORS.accent}>Cinco pasos</Label>
            </GridCell>
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="certification-process__heading"
            >
              <TextReveal
                as="h2"
                once={false}
                lines={["De la práctica", "a una señal pública."]}
                maskColor={UI.bg}
                className="certification-section-title"
              />
            </GridCell>
            <GridCell className="certification-process__body">
              <p>
                Cada fase deja una decisión o una evidencia concreta. El
                resultado no depende de una declaración aislada.
              </p>
            </GridCell>
          </Grid>

          <ol className="certification-process__steps">
            {PROCESS.map((item) => (
              <ProcessRow key={item.index} item={item} />
            ))}
          </ol>
        </section>

        <LandingTransitionSection light title="Los niveles" column={3} />

        <section className="certification-levels">
          <Grid columns="site" className="certification-levels__header">
            <GridCell className="certification-levels__label">
              <Label color={COLORS.accent}>Una escala progresiva</Label>
            </GridCell>
            <GridCell
              span={3}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="certification-levels__heading"
            >
              <TextReveal
                as="h2"
                once={false}
                lines={["Cada organización empieza", "desde un lugar distinto."]}
                maskColor={UI.bg}
                className="certification-section-title"
              />
            </GridCell>
          </Grid>

          <div className="certification-levels__grid">
            {LEVELS.map((item) => (
              <Level key={item.name} item={item} />
            ))}
          </div>
        </section>

        <Link
          to="/contacto"
          className="certification-closing"
          onClick={scrollToTopImmediate}
        >
          <span className="certification-meta">Siguiente paso</span>
          <strong>Solicitar evaluación</strong>
          <span className="certification-closing__arrow">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </Page>
  );
}
