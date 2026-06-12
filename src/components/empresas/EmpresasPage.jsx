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
    cta: "Ver cómo se verifica",
    to: "/certificacion#verificacion",
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
    to: "/certificacion#alcance",
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
    to: "/certificacion#niveles",
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

// ── Experiencia: casos en primera persona (ilustrativos) ──
const CASES = [
  {
    sector: "Fintech",
    quote:
      "Dejamos de pedir confianza a ciegas. Ahora el sello habla por nosotros y los usuarios lo notan en el primer clic.",
    person: "Marta Ruiz",
    role: "Head of Product · Nodo Pay",
    initials: "MR",
    metric: "+34%",
    metricLabel: "más consentimientos informados",
  },
  {
    sector: "Salud digital",
    quote:
      "Llegamos a la ronda con los datos en orden y una auditoría que nadie pudo discutir. El sello cerró la conversación.",
    person: "Diego Salas",
    role: "CTO · Vita",
    initials: "DS",
    metric: "0",
    metricLabel: "incidencias en la due diligence",
  },
  {
    sector: "E-commerce",
    quote:
      "Nuestros clientes pasaron de aceptar cookies sin mirar a entrar a leer cómo cuidamos sus datos. Eso no tiene precio.",
    person: "Lucía Fernández",
    role: "Fundadora · Raíz",
    initials: "LF",
    metric: "×2",
    metricLabel: "tiempo en el centro de privacidad",
  },
  {
    sector: "Edtech",
    quote:
      "Reescribimos cada permiso para que familias y estudiantes entendieran qué datos usábamos y para qué. La confianza dejó de ser abstracta.",
    person: "Elena Torres",
    role: "COO · Aula Abierta",
    initials: "ET",
    metric: "91%",
    metricLabel: "de usuarios comprende los permisos",
  },
  {
    sector: "SaaS",
    quote:
      "La auditoría convirtió meses de dudas internas en una hoja de ruta clara. Producto, legal y ventas empezaron a hablar el mismo idioma.",
    person: "Javier Moreno",
    role: "VP Product · Nexo Cloud",
    initials: "JM",
    metric: "−28%",
    metricLabel: "consultas sobre privacidad",
  },
  {
    sector: "Movilidad",
    quote:
      "Explicar la geolocalización con honestidad no redujo la activación. Hizo que quienes aceptaban supieran exactamente qué estaban eligiendo.",
    person: "Sara Vidal",
    role: "Directora de Experiencia · Vía",
    initials: "SV",
    metric: "+22%",
    metricLabel: "de confianza tras el registro",
  },
];

function StepCard({ item, index, onReveal }) {
  return (
    <article
      className="enterprise-step-card"
      style={{ "--enterprise-card-index": index }}
      aria-labelledby={`enterprise-step-title-${index + 1}`}
    >
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
  const outcomesRef = useRef(null);
  const casesRef = useRef(null);
  const trackRef = useRef(null);
  useScrollTextReveal(pageRef);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let frameId = null;

    const layers = [
      { image: imgRef.current, prop: "--enterprise-hero-parallax" },
    ].filter((layer) => layer.image);

    if (!layers.length || reducedMotion.matches) return undefined;

    function updateParallax() {
      frameId = null;
      layers.forEach(({ image, prop }) => {
        const bounds = image.parentElement?.getBoundingClientRect();
        if (!bounds) return;

        const offset = clamp(
          (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) * 0.08,
          -44,
          44,
        );
        image.style.setProperty(prop, `${offset}px`);
      });
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

  useEffect(() => {
    const section = outcomesRef.current;
    if (!section) return undefined;

    const items = Array.from(
      section.querySelectorAll(".enterprise-outcomes__item"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let frameId = null;

    if (reducedMotion.matches) {
      items.forEach((item) =>
        item.style.setProperty("--enterprise-number-shift", "0%"),
      );
      return undefined;
    }

    function updateNumbers() {
      frameId = null;
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const revealStart = viewportHeight * 0.92;
      const revealEnd = viewportHeight * 0.52;
      const revealDistance = revealStart - revealEnd;

      items.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;
        const progress = clamp(
          (revealStart - itemTop) / revealDistance,
          0,
          1,
        );
        const shift = -112 * (1 - progress);
        item.style.setProperty("--enterprise-number-shift", `${shift}%`);
      });
    }

    function scheduleUpdate() {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateNumbers);
    }

    updateNumbers();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      items.forEach((item) =>
        item.style.removeProperty("--enterprise-number-shift"),
      );
    };
  }, []);

  useEffect(() => {
    const section = casesRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const viewport = track.parentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const SPEED = 1.5;
    let frameId = null;
    let travel = 0;

    function getPinHeight() {
      const pin = section.querySelector(".enterprise-cases__pin");
      return pin ? pin.offsetHeight : 0;
    }

    function update() {
      frameId = null;
      if (travel <= 0) {
        track.style.transform = "";
        return;
      }
      const topbar =
        Number.parseFloat(
          window
            .getComputedStyle(document.documentElement)
            .getPropertyValue("--prometeo-topbar-height"),
        ) || 64;
      const distance = section.offsetHeight - getPinHeight();
      if (distance <= 0) return;
      const rectTop = section.getBoundingClientRect().top;
      const progress = clamp((topbar - rectTop) / distance, 0, 1);
      track.style.transform = `translate3d(${-progress * travel}px, 0, 0)`;
    }

    function layout() {
      if (reducedMotion.matches || mobile.matches) {
        section.style.height = "";
        track.style.transform = "";
        travel = 0;
        return;
      }
      travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
      if (travel <= 0) {
        section.style.height = "";
        track.style.transform = "";
        return;
      }
      section.style.height = `${getPinHeight() + travel * SPEED}px`;
      update();
    }

    function scheduleUpdate() {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(update);
    }

    layout();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", layout);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", layout);
      section.style.height = "";
      track.style.transform = "";
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
            <div className="enterprise-process__intro">
              <Label color={COLORS.accent}>El proceso</Label>
              <h2>
                Cada paso,{" "}
                <span className="enterprise-accent">un servicio.</span>
              </h2>
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

        {/* ── Transition ── */}
        <div className="enterprise-transition">
          <LandingTransitionSection light title="Los resultados" column={3} />
        </div>

        {/* ── Outcomes ── */}
        <section className="enterprise-outcomes" ref={outcomesRef}>
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
                <span className="enterprise-outcomes__number-mask">
                  <span
                    className="enterprise-outcomes__item-number"
                    aria-hidden="true"
                  >
                    {outcome.number}
                  </span>
                </span>
                <p className="enterprise-outcomes__item-copy">
                  <strong>{outcome.title}.</strong> {outcome.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Transition ── */}
        <div className="enterprise-transition">
          <LandingTransitionSection light title="La experiencia" column={1} />
        </div>

        {/* ── Case studies / Experiencia (carrusel por scroll) ── */}
        <section className="enterprise-cases" ref={casesRef}>
          <div className="enterprise-cases__pin">
            <div className="enterprise-cases__header">
              <Label color={COLORS.accent}>Experiencia</Label>
              <h2>
                No lo decimos.{" "}
                <span className="enterprise-accent">Lo demostramos.</span>
              </h2>
              <p>
                Primero explicamos lo que hacemos. Después lo enseñamos con
                casos reales. Estos son algunos de los proyectos donde la
                privacidad se volvió una ventaja.
              </p>
            </div>
            <div className="enterprise-cases__viewport">
              <ul className="enterprise-cases__track" ref={trackRef}>
                {CASES.map((study) => (
                  <li key={study.person} className="enterprise-cases__item">
                    <span className="enterprise-cases__sector">
                      {study.sector}
                    </span>
                    <blockquote className="enterprise-cases__quote">
                      {study.quote}
                    </blockquote>
                    <div className="enterprise-cases__footer">
                      <div className="enterprise-cases__person">
                        <span
                          className="enterprise-cases__avatar"
                          aria-hidden="true"
                        >
                          {study.initials}
                        </span>
                        <span className="enterprise-cases__person-meta">
                          <span className="enterprise-cases__person-name">
                            {study.person}
                          </span>
                          <span className="enterprise-cases__person-role">
                            {study.role}
                          </span>
                        </span>
                      </div>
                      <div className="enterprise-cases__metric">
                        <span className="enterprise-cases__metric-value">
                          {study.metric}
                        </span>
                        <span className="enterprise-cases__metric-label">
                          {study.metricLabel}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Transition ── */}
        <div className="enterprise-transition">
          <LandingTransitionSection
            light
            title="El siguiente paso"
            column={2}
          />
        </div>

        {/* ── CTA final (estilo hero, invertido) ── */}
        <section className="enterprise-final">
          <Grid
            columns="site"
            className="enterprise-final__content"
            style={{ gridTemplateRows: "auto auto" }}
          >
            {/* arriba-izquierda: texto normal */}
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="enterprise-final__intro"
            >
              <Label color={COLORS.accent} className="enterprise-final__kicker">
                Siguiente paso
              </Label>
              <p>
                La certificación Prometeo es el primer paso para convertir la
                privacidad en una ventaja competitiva.
              </p>
            </GridCell>
            <GridCell
              span={2}
              className="enterprise-final__intro-aside"
              aria-hidden="true"
            />
            {/* abajo-derecha: titular en bold + CTA */}
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="enterprise-final__cta-spacer"
              aria-hidden="true"
            />
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="enterprise-final__cta"
            >
              <div className="enterprise-final__cta-inner">
                <h2
                  className="enterprise-final__title"
                  style={{ fontFamily: FONTS.display, color: UI.text, margin: 0 }}
                >
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
            </GridCell>
          </Grid>
        </section>
      </div>
    </Page>
  );
}
