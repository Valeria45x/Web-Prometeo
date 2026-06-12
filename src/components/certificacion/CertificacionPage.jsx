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

const PROCESS = [
  {
    number: "01",
    title: "Solicitud",
    meta: "3 días",
    body: "Nos cuentas tu producto. Te devolvemos alcance, plazos y coste cerrados.",
    deliverable: "Alcance y presupuesto",
  },
  {
    number: "02",
    title: "Análisis",
    meta: "2–4 semanas",
    body: "Flujos, documentos e interfaz en entornos de prueba. Nunca datos reales.",
    deliverable: "Matriz de hallazgos",
  },
  {
    number: "03",
    title: "Informe",
    meta: "1 semana",
    body: "Hallazgos priorizados y recomendaciones. Tuyo, certifiques o no.",
    deliverable: "Plan priorizado",
  },
  {
    number: "04",
    title: "Implementación",
    meta: "opcional",
    body: "Si decides corregir, te acompañamos en cada cambio.",
    deliverable: "Cambios acompañados",
  },
  {
    number: "05",
    title: "Certificación",
    meta: "12 meses",
    body: "Publicamos tu certificación y su registro verificable.",
    deliverable: "Certificación y registro",
  },
];

const LEVELS = [
  {
    tier: "Básico",
    title: "Fundamentos",
    audience: "Para productos que empiezan.",
    count: "4 requisitos",
    featured: false,
    base: null,
    requirements: [
      "Política de privacidad legible en menos de 5 minutos",
      "Consentimiento explícito, granular y revocable",
      "Inventario de terceros con acceso a datos",
      "Canal visible para ejercer derechos RGPD",
    ],
  },
  {
    tier: "Avanzado",
    title: "Transparencia",
    audience: "Para productos en crecimiento.",
    count: "9 requisitos",
    featured: true,
    base: "Todo lo del nivel Básico, y además:",
    requirements: [
      "Auditoría de dark patterns en flujos críticos",
      "Mapa de datos público",
      "Panel de privacidad para el usuario",
      "Copy de permisos probado con usuarios",
      "Revisión de cambios del producto",
    ],
  },
  {
    tier: "Integral",
    title: "Referencia",
    audience: "Para quienes quieren marcar el estándar.",
    count: "15 requisitos",
    featured: false,
    base: "Todo lo del nivel Avanzado, y además:",
    requirements: [
      "Privacy by design documentado",
      "Auditoría de código de componentes de datos",
      "Formación anual del equipo",
      "Respuesta a incidentes en menos de 72 h",
      "Métricas de privacidad publicadas",
      "Soporte continuo de Prometeo",
    ],
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
          className={[
            "cert-faq__chevron",
            open && "cert-faq__chevron--open",
          ]
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
  const scopeRef = useRef(null);
  const processRef = useRef(null);
  const processTrackRef = useRef(null);
  const scopeItemRefs = useRef([]);
  const [activeScope, setActiveScope] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [animReady, setAnimReady] = useState(false);
  const [ambientTone, setAmbientTone] = useState("dark");
  const activeLevel = LEVELS[selectedLevel];
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

  // Match the page gutters to the section crossing the viewport center.
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return undefined;

    const sections = Array.from(root.querySelectorAll("[data-ambient]"));
    let frameId = null;

    function update() {
      frameId = null;
      const center = window.innerHeight / 2;
      const activeSection = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= center && bounds.bottom >= center;
      });

      if (activeSection) {
        setAmbientTone(activeSection.dataset.ambient);
      } else if (root.getBoundingClientRect().bottom < center) {
        setAmbientTone("light");
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

  // Pinned horizontal scroll for the process steps (mirrors the
  // Empresas cases carousel mechanism).
  useEffect(() => {
    const section = processRef.current;
    const track = processTrackRef.current;
    if (!section || !track) return undefined;

    const viewport = track.parentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const SPEED = 1.4;
    let frameId = null;
    let travel = 0;

    function getPinHeight() {
      const pin = section.querySelector(".cert-process__pin");
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
      section.style.setProperty(
        "--cert-process-progress",
        progress.toFixed(4),
      );
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

  return (
    <Page
      light
      ambientBackground={
        ambientTone === "dark" ? COLORS.canvasDark : COLORS.pageLight
      }
    >
      <div
        ref={pageRef}
        className={`cert-page ${animReady ? "cert-page--anim" : ""}`}
      >
        <section className="cert-hero" data-ambient="dark">
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
                    color: COLORS.textOnDark,
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
                  color={COLORS.textOnDark}
                  iconBg={COLORS.canvasDark}
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
        <section className="cert-intro" data-ambient="dark">
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
        <section className="cert-bento" data-ambient="dark">
          <div className="cert-bento__visual">
            <GridImageReveal
              src={heroImage}
              alt=""
              label=""
              tone="dark"
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
                Los problemas de privacidad viven en los flujos, en los
                permisos y en lo que la interfaz decide no contarte.
                Auditamos exactamente eso.
              </p>
            </div>
            <div className="cert-bento__image">
              <GridImageReveal
                src={heroImage}
                alt=""
                label=""
                tone="dark"
                minHeight="100%"
                objectPosition="center 60%"
                style={{ height: "100%" }}
              />
            </div>
          </div>
        </section>

        <section
          ref={scopeRef}
          className="cert-scope"
          id="alcance"
          data-ambient="dark"
        >
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
          <div className="cert-scope__footnote">
            <span>Auditoría sobre entornos de prueba</span>
            <span>Nunca accedemos a datos reales</span>
          </div>
        </section>

        <section
          className="cert-proof"
          id="verificacion"
          data-ambient="light"
        >
          <Label color={COLORS.accent}>Verificación</Label>
          <p className="cert-proof__text">
            Una certificación no debería pedir que confíes. Debería permitirte{" "}
            <span className="cert-accent">comprobar.</span>
          </p>
        </section>

        {/* ── Parallax band — respiro visual tras el pivote a la luz ── */}
        <section className="cert-parallax-band" data-ambient="dark">
          <GridImageReveal
            src={heroImage}
            alt=""
            label=""
            tone="dark"
            parallaxOnly
            minHeight="clamp(360px, 48vh, 520px)"
            objectPosition="center 45%"
          />
        </section>

        <section
          className="cert-process"
          id="proceso"
          ref={processRef}
          data-ambient="light"
        >
          <div className="cert-process__pin">
            <div className="cert-process__header">
              <div>
                <Label color={COLORS.accent}>El proceso</Label>
                <h2>
                  Cinco pasos.{" "}
                  <span className="cert-accent">Nada oculto.</span>
                </h2>
              </div>
              <p>
                Cada fase tiene un plazo y un entregable. El trabajo sigue
                siendo tuyo aunque decidas no certificar.
              </p>
            </div>
            <div className="cert-process__viewport">
              <ul className="cert-process__track" ref={processTrackRef}>
                {PROCESS.map((step) => (
                  <li key={step.number} className="cert-process__panel">
                    <span
                      className="cert-process__panel-number"
                      data-animate-text
                    >
                      {step.number}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <div className="cert-process__panel-foot">
                      <span data-animate-text>{step.meta}</span>
                      <strong data-animate-text>{step.deliverable}</strong>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cert-process__progress" aria-hidden="true">
              <span className="cert-process__progress-fill" />
            </div>
          </div>
        </section>

        <section className="cert-levels" id="niveles" data-ambient="light">
          <div className="cert-levels__header">
            <div>
              <Label color={COLORS.accent}>Niveles</Label>
              <h2>
                Tres grados de{" "}
                <span className="cert-accent">exigencia.</span>
              </h2>
            </div>
            <p>
              Cada nivel incluye el anterior. Selecciona uno para consultar sus
              requisitos.
            </p>
          </div>

          <div
            className="cert-levels__tabs"
            role="tablist"
            aria-label="Niveles de certificación"
          >
            {LEVELS.map((level, index) => (
              <button
                key={level.tier}
                type="button"
                role="tab"
                id={`cert-level-tab-${index}`}
                aria-selected={selectedLevel === index}
                aria-controls="cert-level-panel"
                className={`cert-level-tab ${
                  selectedLevel === index ? "cert-level-tab--active" : ""
                }`}
                onClick={() => setSelectedLevel(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{level.tier}</strong>
                <small>{level.title}</small>
                <i>{level.count}</i>
              </button>
            ))}
          </div>

          <article
            id="cert-level-panel"
            role="tabpanel"
            aria-labelledby={`cert-level-tab-${selectedLevel}`}
            className="cert-levels__detail"
            key={activeLevel.tier}
          >
            <div className="cert-levels__detail-intro">
              <span>Nivel {String(selectedLevel + 1).padStart(2, "0")}</span>
              <h3>{activeLevel.title}</h3>
              <p>{activeLevel.audience}</p>
              {activeLevel.base && <small>{activeLevel.base}</small>}
            </div>
            <ul className="cert-levels__requirements">
              {activeLevel.requirements.map((requirement, index) => (
                <li key={requirement}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {requirement}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="cert-faq" id="preguntas" data-ambient="light">
          <div className="cert-faq__header">
            <Label color={COLORS.accent}>Antes de decidir</Label>
            <h2>
              Lo que todos{" "}
              <span className="cert-accent">preguntan.</span>
            </h2>
          </div>
          <div className="cert-faq__list">
            {FAQ.map((item, i) => (
              <FaqItem key={item.question} item={item} index={i} delay={i * 80} />
            ))}
          </div>
        </section>

        {/* ── 12. Closing CTA ── */}
        <section className="cert-cta" data-ambient="dark">
          <div className="cert-cta__content">
            <Label color={COLORS.accent}>Siguiente paso</Label>
            <h2 className="cert-cta__title">
              El primer paso es un{" "}
              <span className="cert-accent">formulario.</span>
            </h2>
            <SplitCtaButton
              as={Link}
              to="/contacto"
              label="Empezar la solicitud"
              color={COLORS.textOnDark}
              iconBg={COLORS.canvasDark}
              style={{ "--ds-split-cta-width": "280px", maxWidth: "100%" }}
              onClick={scrollToTopImmediate}
            />
          </div>
          <div className="cert-cta__body">
            <p>
              Cuéntanos qué hace tu producto. Respondemos con alcance, plazos
              y coste en menos de una semana. Sin compromiso.
            </p>
          </div>
        </section>
      </div>
    </Page>
  );
}
