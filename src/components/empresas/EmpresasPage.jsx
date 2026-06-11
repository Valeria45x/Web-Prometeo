import { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { COLORS, FONTS } from "../../design/tokens";
import { useScrollTextReveal } from "../../hooks/useScrollTextReveal";
import { getLenisInstance, scrollToTopImmediate } from "../../lib/lenis";
import { Page } from "../Page";
import LandingTransitionSection from "../landing/transition/LandingTransitionSection";
import Label from "../system/Label";
import SplitCtaButton from "../system/SplitCtaButton";
import { Grid, GridCell } from "../system/Grid";
import GridImageReveal from "../system/GridImageReveal";
import heroImage from "../../../Instagram Feed USB v1.png";
import "../landing/shared/scrollTextReveal.css";
import "./empresas.css";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

const UI = {
  bg: COLORS.pageLight,
  text: COLORS.textOnLight,
};

// ── Vista general: panel derecho (2 tarjetas + titular) ──
const OVERVIEW_CARDS = [
  {
    eyebrow: "Acompañamiento",
    title: "Diseñamos contigo",
    body: "No entregamos un informe y desaparecemos. Trabajamos cada punto de contacto donde la privacidad se vuelve visible para el usuario.",
    cta: "Conocer la certificación",
    to: "/certificacion",
  },
  {
    eyebrow: "Verificación",
    title: "Cualquiera lo comprueba",
    body: "Cada sello Prometeo es público y auditable. Tus usuarios no tienen que creerte: pueden verificarlo en segundos.",
    cta: "Hablar con el equipo",
    to: "/contacto",
  },
];

// ── Proceso: tarjetas apiladas, cada una enlaza a su detalle ──
const STEPS = [
  {
    index: "01",
    title: "Auditoría",
    body: "Revisamos tus políticas de privacidad, flujos de consentimiento y prácticas de datos. Sin jerga legal. Con criterio de diseño.",
    cta: "Solicitar una auditoría",
    to: "/contacto",
    imagePosition: "28% center",
  },
  {
    index: "02",
    title: "Diagnóstico",
    body: "Identificamos qué funciona, qué falta y qué puede mejorar. El informe es tuyo — con o sin certificación.",
    cta: "Qué evaluamos",
    to: "/certificacion",
    imagePosition: "48% center",
  },
  {
    index: "03",
    title: "Implementación",
    body: "Acompañamos los cambios necesarios: desde el copy de una cookie banner hasta la arquitectura de permisos.",
    cta: "Cómo trabajamos",
    to: "/proyecto",
    imagePosition: "64% center",
  },
  {
    index: "04",
    title: "Certificación",
    body: "Si cumples los estándares, recibes el sello Prometeo. Visible para tus usuarios, verificable para cualquiera.",
    cta: "Conocer el sello",
    to: "/certificacion",
    imagePosition: "80% center",
  },
];

const OUTCOMES = [
  {
    number: "01",
    title: "Confianza visible",
    body: "Un sello que tus usuarios reconocen. No un PDF enterrado en el footer.",
  },
  {
    number: "02",
    title: "Diferenciación real",
    body: "En un mercado donde todos dicen lo mismo, demostrar es la nueva forma de competir.",
  },
  {
    number: "03",
    title: "Menos riesgo",
    body: "Anticiparte al cumplimiento reduce sanciones, crisis de reputación y deuda técnica.",
  },
  {
    number: "04",
    title: "Comunidad",
    body: "Acceso a una red de empresas que comparten el mismo estándar. Visibilidad compartida.",
  },
];

// ── Experiencia: casos ilustrativos ──
const CASES = [
  {
    sector: "Fintech",
    name: "Nodo Pay",
    body: "Rediseñamos su flujo de consentimiento y el copy de la cookie banner. De cuatro pantallas a una, sin perder cumplimiento.",
    metric: "+34%",
    metricLabel: "aceptación informada",
  },
  {
    sector: "Salud digital",
    name: "Vita",
    body: "Auditoría completa de permisos y arquitectura de datos antes de su ronda de inversión. El sello cerró la due diligence.",
    metric: "0",
    metricLabel: "incidencias en auditoría externa",
  },
  {
    sector: "E-commerce",
    name: "Raíz",
    body: "Implementamos un centro de privacidad visible y certificamos sus prácticas. La confianza dejó de ser una promesa.",
    metric: "×2",
    metricLabel: "tiempo en el centro de privacidad",
  },
];

function StepCard({ item, index, onReveal }) {
  return (
    <article
      className="enterprise-step-card"
      style={{ "--enterprise-card-index": index }}
      aria-labelledby={`enterprise-step-title-${index + 1}`}
    >
      <div className="enterprise-step-card__number" aria-hidden="true">
        {item.index}
      </div>

      <div className="enterprise-step-card__image-wrap" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          className="enterprise-step-card__image"
          style={{ objectPosition: item.imagePosition }}
          loading="lazy"
          decoding="async"
        />
      </div>

      <button
        type="button"
        id={`enterprise-step-title-${index + 1}`}
        className="enterprise-step-card__title"
        onClick={() => onReveal(index)}
        aria-label={`Mostrar el paso ${item.title}`}
      >
        <span>{item.title}</span>
        <span className="enterprise-step-card__title-action" aria-hidden="true">
          Ver
        </span>
      </button>

      <div className="enterprise-step-card__detail">
        <p>{item.body}</p>
        <SplitCtaButton
          as={Link}
          to={item.to}
          label={item.cta}
          color={COLORS.textOnLight}
          iconBg={COLORS.pageLight}
          className="enterprise-step-card__cta"
          style={{ "--ds-split-cta-width": "320px", maxWidth: "100%" }}
          onClick={scrollToTopImmediate}
        />
      </div>
    </article>
  );
}

export default function EmpresasPage() {
  const pageRef = useRef(null);
  const imgRef = useRef(null);
  const stepAnchorsRef = useRef([]);
  useScrollTextReveal(pageRef);

  useEffect(() => {
    const image = imgRef.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
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
      image.style.setProperty("--enterprise-hero-parallax", `${offset}px`);
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

  function revealStep(index) {
    const anchor = stepAnchorsRef.current[index];
    if (!anchor) return;

    const rootStyles = window.getComputedStyle(document.documentElement);
    const topbarHeight =
      Number.parseFloat(
        rootStyles.getPropertyValue("--prometeo-topbar-height"),
      ) || 64;
    const stackTab =
      Number.parseFloat(rootStyles.getPropertyValue("--s64")) || 64;
    const cardOffset = topbarHeight + index * stackTab;
    const target =
      window.scrollY + anchor.getBoundingClientRect().top - cardOffset;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lenis = getLenisInstance();

    if (lenis) {
      lenis.scrollTo(target, {
        duration: reducedMotion ? 0 : 0.9,
        immediate: reducedMotion,
        force: true,
      });
      return;
    }

    window.scrollTo({
      top: target,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <Page light>
      <div ref={pageRef} className="enterprise-page">
        {/* ── Hero (light grid — alineado con Para Ti) ── */}
        <section className="enterprise-hero">
          <div className="enterprise-hero__bg" aria-hidden="true">
            <img
              ref={imgRef}
              src={heroImage}
              alt=""
              className="enterprise-hero__bg-img"
            />
            <div className="enterprise-hero__overlay" />
          </div>

          <Grid
            columns="site"
            className="enterprise-hero__content"
            style={{ gridTemplateRows: "auto auto" }}
          >
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="enterprise-hero__copy"
            >
              <div className="enterprise-hero__heading">
                <Label color={COLORS.accent} className="enterprise-hero__kicker">
                  Para empresas
                </Label>
                <h1
                  className="enterprise-hero__title"
                  style={{ fontFamily: FONTS.display, color: UI.text, margin: 0 }}
                >
                  <span>Privacidad que se</span>
                  <span className="enterprise-accent">demuestra.</span>
                </h1>
              </div>
            </GridCell>
            <GridCell
              span={2}
              className="enterprise-hero__copy-aside"
              aria-hidden="true"
            />
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="enterprise-hero__desc-spacer"
              aria-hidden="true"
            />
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="enterprise-hero__desc"
            >
              <div className="enterprise-hero__desc-inner">
                <p>
                  La mayoría de empresas piden confianza. Pocas pueden probar que
                  la merecen. Prometeo convierte tu compromiso con la privacidad
                  en algo visible, verificable y diferencial.
                </p>
                <SplitCtaButton
                  as={Link}
                  to="/certificacion"
                  label="Solicitar certificación"
                  color={COLORS.textOnLight}
                  iconBg={COLORS.pageLight}
                  className="enterprise-hero__cta"
                  style={{ "--ds-split-cta-width": "320px", maxWidth: "100%" }}
                  onClick={scrollToTopImmediate}
                />
              </div>
            </GridCell>
          </Grid>
        </section>

        {/* ── Transition ── */}
        <div className="enterprise-transition">
          <LandingTransitionSection light title="El problema" column={1} />
        </div>

        {/* ── Narrative ── */}
        <section className="enterprise-narrative">
          <p>
            Tu empresa respeta la privacidad de sus usuarios. Tus políticas
            son claras. Tus flujos de consentimiento, honestos.
          </p>
          <p className="enterprise-narrative__accent">
            Pero el usuario no lo sabe. Porque no hay forma de distinguirte
            de quien no hace nada de eso.
          </p>
          <p className="enterprise-narrative__resolve">
            Prometeo cambia eso.
          </p>
        </section>

        {/* ── Vista general (bento: imagen + panel de 3 partes) ── */}
        <section className="enterprise-overview" aria-label="Vista general">
          <div className="enterprise-overview__visual">
            <GridImageReveal
              src={heroImage}
              alt=""
              label=""
              tone="light"
              minHeight="100%"
              revealWidthRatio={1}
              objectPosition="center 40%"
              className="enterprise-overview__reveal"
              style={{
                height: "100%",
                "--grid-image-bg": "#fcfcfc",
                "--grid-image-overlay": "transparent",
              }}
            />
          </div>

          <div className="enterprise-overview__panel">
            <div className="enterprise-overview__headline">
              <Label color={COLORS.accent}>La propuesta</Label>
              <h2>
                Más que un sello.{" "}
                <span className="enterprise-accent">Un sistema.</span>
              </h2>
            </div>

            <div className="enterprise-overview__cards">
              {OVERVIEW_CARDS.map((card) => (
                <div key={card.title} className="enterprise-overview__card">
                  <div className="enterprise-overview__card-copy">
                    <Label
                      color={COLORS.accent}
                      className="enterprise-overview__card-eyebrow"
                    >
                      {card.eyebrow}
                    </Label>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </div>
                  <SplitCtaButton
                    as={Link}
                    to={card.to}
                    label={card.cta}
                    color={COLORS.textOnLight}
                    iconBg={COLORS.pageLight}
                    className="enterprise-overview__card-cta"
                    style={{ "--ds-split-cta-width": "100%", maxWidth: "100%" }}
                    onClick={scrollToTopImmediate}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Transition ── */}
        <div className="enterprise-transition">
          <LandingTransitionSection light title="Cómo funciona" column={2} />
        </div>

        {/* ── Process (stacking cards — cada paso enlaza a su detalle) ── */}
        <section className="enterprise-process">
          <div className="enterprise-process__header">
            <div className="enterprise-process__header-title">
              <h2>
                El{" "}
                <span className="enterprise-accent">proceso</span>
              </h2>
            </div>
            <div className="enterprise-process__header-body">
              <p>
                Un proceso de certificación diseñado para ser útil, no
                burocrático. Cada paso es un servicio en sí mismo y genera
                valor antes de llegar al sello.
              </p>
            </div>
          </div>

          <div className="enterprise-process__stack">
            {STEPS.map((step, index) => (
              <Fragment key={step.index}>
                <div
                  ref={(node) => {
                    stepAnchorsRef.current[index] = node;
                  }}
                  className="enterprise-step-card__anchor"
                  aria-hidden="true"
                />
                <StepCard item={step} index={index} onReveal={revealStep} />
              </Fragment>
            ))}
          </div>
        </section>

        {/* ── Parallax band (panel horizontal, sin grid) ── */}
        <div className="enterprise-parallax-band">
          <GridImageReveal
            src={heroImage}
            alt=""
            label=""
            tone="dark"
            parallaxOnly
            minHeight="clamp(360px, 48vh, 520px)"
            objectPosition="center 45%"
          />
          <div className="enterprise-parallax-band__caption">
            <p>
              La privacidad no es un trámite. Es la forma en que una empresa
              decide tratar a las personas.
            </p>
          </div>
        </div>

        {/* ── Transition ── */}
        <div className="enterprise-transition">
          <LandingTransitionSection light title="Los resultados" column={3} />
        </div>

        {/* ── Outcomes ── */}
        <section className="enterprise-outcomes">
          <div className="enterprise-outcomes__header">
            <Label color={COLORS.accent}>Resultados</Label>
            <h2>
              Lo que{" "}
              <span className="enterprise-accent">cambia.</span>
            </h2>
          </div>
          <ul className="enterprise-outcomes__list">
            {OUTCOMES.map((outcome) => (
              <li key={outcome.number} className="enterprise-outcomes__item">
                <span
                  className="enterprise-outcomes__item-number"
                  aria-hidden="true"
                >
                  {outcome.number}
                </span>
                <h3>{outcome.title}</h3>
                <p>{outcome.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Transition ── */}
        <div className="enterprise-transition">
          <LandingTransitionSection light title="La experiencia" column={4} />
        </div>

        {/* ── Case studies / Experiencia ── */}
        <section className="enterprise-cases">
          <div className="enterprise-cases__header">
            <Label color={COLORS.accent}>Experiencia</Label>
            <h2>
              No lo decimos.{" "}
              <span className="enterprise-accent">Lo demostramos.</span>
            </h2>
            <p>
              Primero explicamos lo que hacemos. Después lo enseñamos con casos
              reales. Estos son algunos de los proyectos donde la privacidad se
              volvió una ventaja.
            </p>
          </div>
          <ul className="enterprise-cases__list">
            {CASES.map((study) => (
              <li key={study.name} className="enterprise-cases__item">
                <div className="enterprise-cases__item-head">
                  <span className="enterprise-cases__sector">
                    {study.sector}
                  </span>
                  <h3>{study.name}</h3>
                </div>
                <p className="enterprise-cases__body">{study.body}</p>
                <div className="enterprise-cases__metric">
                  <span className="enterprise-cases__metric-value">
                    {study.metric}
                  </span>
                  <span className="enterprise-cases__metric-label">
                    {study.metricLabel}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── CTA ── */}
        <section className="enterprise-cta">
          <div className="enterprise-cta__content">
            <Label color={COLORS.accent}>Siguiente paso</Label>
            <h2 className="enterprise-cta__title">
              Demuestra tu{" "}
              <span className="enterprise-accent">compromiso.</span>
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
          <div className="enterprise-cta__body">
            <p>
              La certificación Prometeo es el primer paso para convertir la
              privacidad en una ventaja competitiva.
            </p>
          </div>
        </section>
      </div>
    </Page>
  );
}
