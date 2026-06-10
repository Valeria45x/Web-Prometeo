import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../../design/tokens";
import { useScrollTextReveal } from "../../hooks/useScrollTextReveal";
import { scrollToTopImmediate } from "../../lib/lenis";
import { Page } from "../Page";
import LandingTransitionSection from "../landing/transition/LandingTransitionSection";
import Label from "../system/Label";
import SplitCtaButton from "../system/SplitCtaButton";
import GridImageReveal from "../system/GridImageReveal";
import heroImage from "../../../Instagram Feed USB v1.png";
import "./empresas.css";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

const DATA_METRICS = [
  { value: "98%", label: "De los usuarios acepta cookies sin leer la política" },
  { value: "0", label: "Empresas en España con certificación de privacidad verificable" },
  { value: "72%", label: "Confiaría más en una empresa con un sello de privacidad visible" },
];

const STEPS = [
  {
    index: "01",
    title: "Auditoría",
    body: "Revisamos tus políticas de privacidad, flujos de consentimiento y prácticas de datos. Sin jerga legal. Con criterio de diseño.",
  },
  {
    index: "02",
    title: "Diagnóstico",
    body: "Identificamos qué funciona, qué falta y qué puede mejorar. El informe es tuyo\u00a0— con o sin certificación.",
  },
  {
    index: "03",
    title: "Implementación",
    body: "Acompañamos los cambios necesarios: desde el copy de una cookie banner hasta la arquitectura de permisos.",
  },
  {
    index: "04",
    title: "Certificación",
    body: "Si cumples los estándares, recibes el sello Prometeo. Visible para tus usuarios, verificable para cualquiera.",
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

export default function EmpresasPage() {
  const pageRef = useRef(null);
  const imgRef = useRef(null);
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

  return (
    <Page light>
      <div ref={pageRef} className="enterprise-page">
        {/* ── Hero (dark — unique to Empresas) ── */}
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

          <div className="enterprise-hero__top">
            <Label color={COLORS.accent} className="enterprise-hero__kicker">
              Para empresas
            </Label>
            <h1 className="enterprise-hero__title">
              Privacidad que se{" "}
              <span className="enterprise-accent">demuestra.</span>
            </h1>
          </div>

          <div className="enterprise-hero__bottom">
            <p>
              La mayoría de empresas piden confianza. Pocas pueden probar que
              la merecen. Prometeo convierte tu compromiso con la privacidad
              en algo visible, verificable y diferencial.
            </p>
            <SplitCtaButton
              as={Link}
              to="/certificacion"
              label="Solicitar certificación"
              color={COLORS.textOnDark}
              iconBg={COLORS.canvasDark}
              className="enterprise-hero__cta"
              onClick={scrollToTopImmediate}
            />
          </div>
        </section>

        {/* ── Data strip (unique to Empresas) ── */}
        <div className="enterprise-data-strip">
          {DATA_METRICS.map((metric) => (
            <div key={metric.label} className="enterprise-data-strip__item">
              <span className="enterprise-data-strip__value">
                {metric.value}
              </span>
              <span className="enterprise-data-strip__label">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Transition ── */}
        <div className="enterprise-transition">
          <LandingTransitionSection light title="El problema" column={1} />
        </div>

        {/* ── Narrative (centered, no sidebar) ── */}
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

        {/* ── Visual break ── */}
        <div className="enterprise-visual-break">
          <GridImageReveal
            src={heroImage}
            alt=""
            label=""
            tone="light"
            minHeight="416px"
            revealWidthRatio={0.85}
            objectPosition="center 38%"
            style={{
              "--grid-image-bg": "#fcfcfc",
              "--grid-image-overlay": "transparent",
            }}
          />
        </div>

        {/* ── Transition ── */}
        <div className="enterprise-transition">
          <LandingTransitionSection light title="Cómo funciona" column={2} />
        </div>

        {/* ── Process (horizontal 4-column — unique to Empresas) ── */}
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
                burocrático. Cada paso genera valor antes de llegar al sello.
              </p>
            </div>
          </div>

          <ol className="enterprise-process__track">
            {STEPS.map((step) => (
              <li key={step.index} className="enterprise-process__step">
                <span className="enterprise-process__step-index">
                  {step.index}
                </span>
                <div className="enterprise-process__step-content">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Transition ── */}
        <div className="enterprise-transition">
          <LandingTransitionSection light title="Los resultados" column={3} />
        </div>

        {/* ── Outcomes (full-width rows — unique to Empresas) ── */}
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
