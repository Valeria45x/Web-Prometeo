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
import "./empresas.css";

const UI = {
  bg: COLORS.pageLight,
  text: COLORS.textOnLight,
};

const TRUST_GAPS = [
  {
    title: "La promesa",
    body: "Una política puede explicar la intención, pero no muestra cómo se toman las decisiones.",
  },
  {
    title: "El proceso",
    body: "El cuidado sucede dentro de la organización y normalmente permanece fuera de la vista.",
  },
  {
    title: "La prueba",
    body: "Sin una evidencia legible, al usuario todavía le cuesta saber en quién confiar.",
  },
];

const TRUST_FLOW = [
  {
    title: "Prácticas",
    body: "Lo que la organización integra en su trabajo cotidiano.",
  },
  {
    title: "Evidencias",
    body: "Lo que permite revisar y sostener cada decisión.",
  },
  {
    title: "Señal visible",
    body: "Lo que una persona puede reconocer antes de elegir.",
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

function TrustGap({ item }) {
  return (
    <li className="empresas-problem__item">
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </li>
  );
}

function TrustFlowPoint({ item, index }) {
  return (
    <li
      className={[
        "empresas-flow__item",
        index % 2 === 0
          ? "empresas-flow__item--top"
          : "empresas-flow__item--bottom",
      ].join(" ")}
    >
      <span className="empresas-flow__marker" aria-hidden="true" />
      <div className="empresas-flow__copy">
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
    </li>
  );
}

export default function EmpresasPage() {
  const pageRef = useRef(null);
  useScrollTextReveal(pageRef);

  return (
    <Page light>
      <div ref={pageRef} className="empresas-page">
        <section className="empresas-hero">
          <Grid
            columns="site"
            className="empresas-hero__grid"
            style={{ gridTemplateRows: "minmax(0, 1fr) auto" }}
          >
            <GridCell
              span={3}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="empresas-hero__heading"
            >
              <div className="empresas-hero__heading-inner">
                <Label color={COLORS.accent}>Vista general</Label>
                <h1 className="empresas-hero__title">
                  <span>Para</span>
                  <span className="empresas-accent">empresas.</span>
                </h1>
              </div>
            </GridCell>

            <GridCell className="empresas-hero__signature" aria-hidden="true">
              <span className="empresas-meta">PMT / B2B</span>
              <span className="empresas-hero__signal" />
            </GridCell>

            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="empresas-hero__base"
              aria-hidden="true"
            />

            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="empresas-hero__action"
            >
              <Label color={COLORS.accent}>Siguiente paso</Label>
              <SplitCtaButton
                as={Link}
                to="/certificacion"
                label="Ver certificación"
                color={UI.text}
                iconBg={UI.bg}
                fullWidth
                onClick={scrollToTopImmediate}
              />
            </GridCell>
          </Grid>
        </section>

        <div className="empresas-transition">
          <LandingTransitionSection light title="El reto" column={2} />
        </div>

        <Grid as="section" columns="site" className="empresas-problem">
          <GridCell
            span={2}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="empresas-problem__intro"
          >
            <div className="empresas-problem__intro-inner">
              <Label color={COLORS.accent}>Confianza digital</Label>
              <TextReveal
                as="h2"
                once={false}
                lines={["La privacidad ocurre", "fuera de la vista."]}
                maskColor={UI.bg}
                className="empresas-section-title"
              />
              <p>
                Entre lo que una empresa afirma y lo que una persona puede
                comprobar existe una distancia. Prometeo trabaja precisamente
                en ese espacio.
              </p>
            </div>
          </GridCell>

          <GridCell
            span={2}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="empresas-problem__list-cell"
          >
            <ol className="empresas-problem__list">
              {TRUST_GAPS.map((item) => (
                <TrustGap key={item.title} item={item} />
              ))}
            </ol>
          </GridCell>
        </Grid>

        <div className="empresas-transition">
          <LandingTransitionSection light title="El cambio" column={4} />
        </div>

        <section className="empresas-flow">
          <Grid columns="site" className="empresas-flow__header">
            <GridCell className="empresas-flow__label">
              <Label color={COLORS.accent}>Un sistema legible</Label>
            </GridCell>
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="empresas-flow__heading"
            >
              <TextReveal
                as="h2"
                once={false}
                lines={["De una intención", "a una confianza visible."]}
                maskColor={UI.bg}
                className="empresas-section-title"
              />
            </GridCell>
            <GridCell className="empresas-flow__body">
              <p>
                La confianza se construye conectando lo que la organización
                hace, lo que puede demostrar y lo que el usuario finalmente ve.
              </p>
            </GridCell>
          </Grid>

          <ol className="empresas-flow__track">
            {TRUST_FLOW.map((item, index) => (
              <TrustFlowPoint key={item.title} item={item} index={index} />
            ))}
          </ol>
        </section>

        <div className="empresas-transition">
          <LandingTransitionSection
            light
            title="La certificación"
            column={1}
          />
        </div>

        <section className="empresas-certification">
          <Grid columns="site" className="empresas-certification__intro">
            <GridCell className="empresas-certification__label">
              <Label color={COLORS.accent}>Certificación Prometeo</Label>
            </GridCell>
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="empresas-certification__heading"
            >
              <TextReveal
                as="h2"
                once={false}
                lines={["El compromiso", "se puede reconocer."]}
                maskColor={UI.bg}
                className="empresas-section-title"
              />
            </GridCell>
            <GridCell className="empresas-certification__body">
              <p>
                Una señal verificable para empresas que quieren convertir sus
                prácticas de privacidad en confianza comprensible.
              </p>
            </GridCell>
          </Grid>

          <Link
            to="/certificacion"
            className="empresas-certification__link"
            onClick={scrollToTopImmediate}
          >
            <h3>Ver certificación</h3>
            <p>
              Conoce los criterios, el proceso de evaluación y los niveles del
              sistema PMT.
            </p>
            <span className="empresas-certification__action">
              <ArrowIcon />
            </span>
          </Link>
        </section>
      </div>
    </Page>
  );
}
