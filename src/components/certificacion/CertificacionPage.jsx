import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { COLORS, FONTS } from "../../design/tokens";
import { useScrollTextReveal } from "../../hooks/useScrollTextReveal";
import { useReveal } from "../../hooks/useReveal";
import { scrollToTopImmediate } from "../../lib/lenis";
import { Page } from "../Page";
import Label from "../system/Label";
import SplitCtaButton from "../system/SplitCtaButton";
import { Grid, GridCell } from "../system/Grid";
import GridImageReveal from "../system/GridImageReveal";
import heroImage from "../../../Instagram Feed USB v1.png";
import "../landing/shared/scrollTextReveal.css";
import "./certificacion.css";

/* ── Content ── */

const SCOPE = [
  {
    number: "01",
    signal: "Lenguaje",
    title: "Políticas de privacidad",
    body: "¿Es comprensible, accesible y veraz? Claridad real, no legalismo.",
    verdict: "Legible en menos de 5 minutos",
  },
  {
    number: "02",
    signal: "Decisión",
    title: "Flujos de consentimiento",
    body: "Cómo y cuándo pides permiso. Explícito, granular, revocable.",
    verdict: "Cada decisión puede deshacerse",
  },
  {
    number: "03",
    signal: "Interfaz",
    title: "Dark patterns",
    body: "Urgencia falsa, fricción asimétrica, opciones ocultas.",
    verdict: "Sin ventajas diseñadas para aceptar",
  },
  {
    number: "04",
    signal: "Ecosistema",
    title: "Datos de terceros",
    body: "Qué servicios acceden a datos de tus usuarios y con qué base legal.",
    verdict: "Trazabilidad de extremo a extremo",
  },
];

const FAQ = [
  {
    question: "¿Qué pasa si no cumplimos el estándar?",
    answer:
      "Nada público. El registro solo se publica al certificar. El informe es vuestro y podéis volver a presentaros sin empezar de cero.",
  },
  {
    question: "¿Cuánto dura la certificación?",
    answer:
      "Doce meses. La renovación revisa solo los cambios del año, no es una auditoría completa.",
  },
  {
    question: "¿Accedéis a datos de nuestros usuarios?",
    answer:
      "Nunca. Trabajamos sobre entornos de prueba, documentación e interfaz.",
  },
  {
    question: "¿Quién os da autoridad para certificar?",
    answer:
      "La verificabilidad, no un título. El estándar y todas las certificaciones emitidas son públicas: cualquiera puede auditarnos a nosotros.",
  },
];

/* ── Sub-components ── */

function ChevronIcon() {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function FaqItem({ item, index, delay }) {
  const [ref, style] = useReveal(delay, true);
  const [open, setOpen] = useState(false);
  const panelId = `cert-faq-panel-${index}`;

  return (
    <div
      ref={ref}
      className={`cert-faq__item ${open ? "cert-faq__item--open" : ""}`}
      style={style}
    >
      <button
        type="button"
        className="cert-faq__question"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="cert-faq__index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="cert-faq__question-text">{item.question}</span>
        <span
          className={["cert-faq__chevron", open && "cert-faq__chevron--open"]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
        >
          <ChevronIcon />
        </span>
      </button>
      <div
        id={panelId}
        className={`cert-faq__panel ${open ? "cert-faq__panel--open" : ""}`}
        aria-hidden={!open}
      >
        <div className="cert-faq__panel-inner">
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Page ── */

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function CertificacionPage() {
  const pageRef = useRef(null);
  const heroBgRef = useRef(null);
  const scopeItemRefs = useRef([]);
  const [activeScope, setActiveScope] = useState(0);
  const [animReady, setAnimReady] = useState(false);
  useScrollTextReveal(pageRef);

  // Enable scroll-driven motion (parallax hero).
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAnimReady(!reducedMotion.matches);
    if (reducedMotion.matches) return undefined;

    let frameId = null;

    function update() {
      frameId = null;

      const img = heroBgRef.current;
      if (img?.parentElement) {
        const bounds = img.parentElement.getBoundingClientRect();
        const offset = clamp(
          (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) * 0.06,
          -40,
          40,
        );
        img.style.setProperty("--cert-hero-parallax", `${offset}px`);
      }
    }

    function scheduleUpdate() {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  // Track which audit area crosses the viewport center to drive the
  // sticky counter and the active highlight.
  useEffect(() => {
    const items = scopeItemRefs.current.filter(Boolean);
    if (!("IntersectionObserver" in window) || !items.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = items.indexOf(entry.target);
          if (index !== -1) setActiveScope(index);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, []);

  return (
    <Page
      light
      ambientBackground={COLORS.pageLight}
      topbarLight
      topbarBackground={COLORS.pageLight}
      frameLight
    >
      <div
        ref={pageRef}
        className={`cert-page ${animReady ? "cert-page--anim" : ""}`}
      >
        <section className="cert-hero" data-ambient="light">
          <div className="cert-hero__bg" aria-hidden="true">
            <img
              ref={heroBgRef}
              src={heroImage}
              alt=""
              className="cert-hero__bg-img"
            />
            <div className="cert-hero__overlay" />
          </div>
          <Grid
            columns="site"
            className="cert-hero__content"
            style={{ gridTemplateRows: "auto auto" }}
          >
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="cert-hero__copy"
            >
              <div className="cert-hero__heading">
                <Label color={COLORS.accent}>Certificación Prometeo</Label>
                <h1
                  className="cert-hero__title"
                  style={{
                    fontFamily: FONTS.display,
                    color: COLORS.textOnLight,
                    margin: 0,
                  }}
                >
                  <span>Privacidad que se</span>
                  <span className="cert-accent">puede demostrar.</span>
                </h1>
              </div>
            </GridCell>
            <GridCell
              span={2}
              className="cert-hero__copy-aside"
              aria-hidden="true"
            />
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="cert-hero__desc-spacer"
              aria-hidden="true"
            />
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="cert-hero__desc"
            >
              <div className="cert-hero__desc-inner">
                <p>
                  Una auditoría independiente para convertir tus prácticas de
                  privacidad en evidencia pública, clara y verificable.
                </p>
                <SplitCtaButton
                  as={Link}
                  to="/contacto"
                  label="Solicitar certificación"
                  color={COLORS.textOnLight}
                  iconBg={COLORS.pageLight}
                  style={{
                    "--ds-split-cta-width": "320px",
                    maxWidth: "100%",
                  }}
                  onClick={scrollToTopImmediate}
                />
              </div>
            </GridCell>
          </Grid>
        </section>

        {/* ── Intro — banda rectangular con texto a todo lo ancho ── */}
        <section className="cert-intro" data-ambient="light">
          <Label color={COLORS.accent}>El problema</Label>
          <p className="cert-intro__text">
            Una buena práctica de privacidad es invisible. El usuario no puede
            distinguir a quien le respeta de quien no.{" "}
            <span className="cert-accent">
              Lo que no se puede demostrar, no genera confianza.
            </span>
          </p>
        </section>

        {/* ── Bento — foto grid | texto + foto grid ── */}
        <section className="cert-bento" data-ambient="light">
          <div className="cert-bento__visual">
            <GridImageReveal
              src={heroImage}
              alt=""
              label=""
              tone="light"
              minHeight="100%"
              revealWidthRatio={1}
              objectPosition="30% center"
              style={{ height: "100%" }}
            />
          </div>
          <div className="cert-bento__panel">
            <div className="cert-bento__copy">
              <Label color={COLORS.accent}>La auditoría</Label>
              <h2>
                Lo que no se ve, también se{" "}
                <span className="cert-accent">diseña.</span>
              </h2>
              <p>
                Los problemas de privacidad viven en los flujos, en los permisos
                y en lo que la interfaz decide no contarte. Auditamos
                exactamente eso.
              </p>
            </div>
            <div className="cert-bento__image">
              <GridImageReveal
                src={heroImage}
                alt=""
                label=""
                tone="light"
                minHeight="100%"
                objectPosition="center 60%"
                style={{ height: "100%" }}
              />
            </div>
          </div>
        </section>

        <section className="cert-scope" id="alcance" data-ambient="light">
          <div className="cert-scope__layout">
            <div className="cert-scope__sticky">
              <div className="cert-scope__sticky-inner">
                <Label color={COLORS.accent}>Qué auditamos</Label>
                <h2>
                  Donde una mala decisión se vuelve{" "}
                  <span className="cert-accent">visible.</span>
                </h2>
                <p>
                  Revisamos los puntos donde una interfaz puede informar,
                  presionar u ocultar.
                </p>
                <div className="cert-scope__counter" aria-hidden="true">
                  <span>{String(activeScope + 1).padStart(2, "0")}</span>
                  {" / "}
                  {String(SCOPE.length).padStart(2, "0")}
                </div>
              </div>
            </div>
            <div className="cert-scope__items">
              {SCOPE.map((item, index) => (
                <article
                  key={item.title}
                  ref={(node) => {
                    scopeItemRefs.current[index] = node;
                  }}
                  className={`cert-scope-item ${
                    activeScope === index ? "cert-scope-item--active" : ""
                  }`}
                >
                  <div className="cert-scope-item__head">
                    <span data-animate-text>{item.number}</span>
                    <small data-animate-text>{item.signal}</small>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <div className="cert-scope-item__criterion">
                    <span data-animate-text>Criterio</span>
                    <strong data-animate-text>{item.verdict}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cert-proof" id="verificacion" data-ambient="light">
          <Label color={COLORS.accent}>Verificación</Label>
          <p className="cert-proof__text">
            Una certificación no debería pedir que confíes. Debería permitirte{" "}
            <span className="cert-accent">comprobar.</span>
          </p>
        </section>

        {/* ── Parallax band — respiro visual tras el pivote a la luz ── */}
        <section className="cert-parallax-band" data-ambient="light">
          <GridImageReveal
            src={heroImage}
            alt=""
            label=""
            tone="light"
            parallaxOnly
            minHeight="clamp(360px, 48vh, 520px)"
            objectPosition="center 45%"
          />
        </section>

        <section className="cert-faq" id="preguntas" data-ambient="light">
          <div className="cert-faq__header">
            <Label color={COLORS.accent}>Antes de decidir</Label>
            <h2>
              Lo que todos <span className="cert-accent">preguntan.</span>
            </h2>
          </div>
          <div className="cert-faq__list">
            {FAQ.map((item, i) => (
              <FaqItem
                key={item.question}
                item={item}
                index={i}
                delay={i * 80}
              />
            ))}
          </div>
        </section>

        <section className="cert-final" data-ambient="light">
          <Grid
            columns="site"
            className="cert-final__content"
            style={{ gridTemplateRows: "auto auto" }}
          >
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="cert-final__intro"
            >
              <Label color={COLORS.accent}>Siguiente paso</Label>
              <p>
                Cuéntanos qué hace tu producto. Respondemos con alcance, plazos
                y coste en menos de una semana.
              </p>
            </GridCell>
            <GridCell
              span={2}
              className="cert-final__intro-aside"
              aria-hidden="true"
            />
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="cert-final__cta-spacer"
              aria-hidden="true"
            />
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="cert-final__cta"
            >
              <div className="cert-final__cta-inner">
                <h2 className="cert-final__title">
                  Convierte la privacidad en algo que se{" "}
                  <span className="cert-accent">puede demostrar.</span>
                </h2>
                <SplitCtaButton
                  as={Link}
                  to="/contacto"
                  label="Empezar la solicitud"
                  color={COLORS.textOnLight}
                  iconBg={COLORS.pageLight}
                  style={{
                    "--ds-split-cta-width": "320px",
                    maxWidth: "100%",
                  }}
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
