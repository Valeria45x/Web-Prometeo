import { useRef } from "react";
import { Link } from "react-router-dom";
import { COLORS, FONTS } from "../../design/tokens";
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

const PROOF_POINTS = [
  {
    index: "01",
    title: "Prácticas",
    body: "Lo que la empresa hace para cuidar los datos.",
  },
  {
    index: "02",
    title: "Evidencias",
    body: "Lo que permite comprobar ese compromiso.",
  },
  {
    index: "03",
    title: "Señal visible",
    body: "Lo que el usuario puede reconocer y verificar.",
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

function ProofPoint({ item }) {
  return (
    <article className="empresas-proof__item">
      <span className="empresas-meta">{item.index}</span>
      <div>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
    </article>
  );
}

export default function EmpresasPage() {
  const pageRef = useRef(null);
  useScrollTextReveal(pageRef);

  return (
    <Page light>
      <div ref={pageRef} className="empresas-page">
        <Grid as="section" columns="site" className="empresas-hero">
          <GridCell
            span={3}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="empresas-hero__copy"
          >
            <div className="empresas-hero__meta">
              <Label color={COLORS.accent}>Vista general</Label>
              <span className="empresas-meta">002 / Organizaciones</span>
            </div>

            <TextReveal
              as="h1"
              once={false}
              lines={[
                "Para",
                <span className="empresas-accent">empresas.</span>,
              ]}
              maskColor={UI.bg}
              className="empresas-hero__title"
              style={{
                fontFamily: FONTS.display,
                color: UI.text,
                margin: 0,
              }}
            />
          </GridCell>

          <GridCell className="empresas-hero__action">
            <span className="empresas-meta">PMT / B2B</span>
            <div className="empresas-hero__action-inner">
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
            </div>
            <span className="empresas-hero__signal" aria-hidden="true" />
          </GridCell>
        </Grid>

        <LandingTransitionSection light title="El reto" column={2} />

        <Grid as="section" columns="site" className="empresas-trust">
          <GridCell className="empresas-trust__intro">
            <Label color={COLORS.accent}>Confianza digital</Label>
            <p>
              Las políticas existen, pero muchas veces el usuario no puede
              verlas, entenderlas ni comprobarlas.
            </p>
          </GridCell>

          <GridCell
            span={3}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="empresas-trust__statement"
          >
            <TextReveal
              as="h2"
              once={false}
              lines={["La confianza no se declara.", "Se demuestra."]}
              maskColor={UI.bg}
              className="empresas-trust__title"
            />

            <div className="empresas-trust__shift" aria-label="Cambio de enfoque">
              <span>De una promesa</span>
              <span className="empresas-trust__shift-line" aria-hidden="true" />
              <strong>A una prueba visible</strong>
            </div>
          </GridCell>
        </Grid>

        <LandingTransitionSection light title="La respuesta" column={4} />

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
                lines={["Privacidad visible.", "Compromiso verificable."]}
                maskColor={UI.bg}
                className="empresas-certification__title"
              />
            </GridCell>
            <GridCell className="empresas-certification__body">
              <p>
                Prometeo conecta prácticas, evidencias y comunicación en una
                señal que el usuario puede reconocer.
              </p>
            </GridCell>
          </Grid>

          <div className="empresas-proof">
            {PROOF_POINTS.map((item) => (
              <ProofPoint key={item.index} item={item} />
            ))}
          </div>

          <Link
            to="/certificacion"
            className="empresas-certification__link"
            onClick={scrollToTopImmediate}
          >
            <span className="empresas-meta">Explorar el sistema PMT</span>
            <strong>Ver certificación</strong>
            <span className="empresas-certification__arrow">
              <ArrowIcon />
            </span>
          </Link>
        </section>
      </div>
    </Page>
  );
}
