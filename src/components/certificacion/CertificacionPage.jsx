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
    title: "Políticas",
    body:
      "Comprobamos que cualquier persona pueda entender qué datos se recogen, para qué se usan, cuánto tiempo se conservan y con quién se comparten. Contrastamos esa explicación con el funcionamiento real del producto.",
    outcome:
      "una política clara, verificable y legible en menos de cinco minutos.",
  },
  {
    title: "Consentimiento",
    body:
      "Recorremos banners, formularios y ajustes para verificar que cada permiso sea explícito, específico y reversible. Aceptar y rechazar deben exigir el mismo esfuerzo y mostrar la información necesaria antes de decidir.",
    outcome:
      "un flujo equilibrado que permite decidir y cambiar de opinión sin obstáculos.",
  },
  {
    title: "Interfaz",
    body:
      "Analizamos jerarquía visual, tono, opciones preseleccionadas y número de pasos. Buscamos cualquier patrón que presione, confunda u oculte alternativas para orientar una decisión.",
    outcome:
      "un inventario priorizado de problemas y propuestas de rediseño accionables.",
  },
  {
    title: "Terceros",
    body:
      "Mapeamos qué proveedores y herramientas externas reciben información, para qué la necesitan y con qué base se comparte. Contrastamos documentación e integraciones para descubrir accesos que no están explicados.",
    outcome:
      "un mapa de trazabilidad para saber dónde viaja cada dato y quién responde.",
  },
];

const AUDIT_STORIES = [
  {
    title: "La confianza empieza antes de aceptar.",
    body:
      "Primero seguimos el recorrido de una persona: qué información encuentra, qué entiende y qué necesita para decidir. Política y consentimiento deben contar la misma historia, sin saltos entre lo que se explica y lo que hace el producto.",
    outcome:
      "El resultado es una experiencia en la que comprender, aceptar y cambiar de opinión forman parte del mismo flujo.",
    objectPosition: "24% center",
    reverse: false,
  },
  {
    title: "La privacidad continúa después del clic.",
    body:
      "Después observamos cómo la interfaz orienta cada elección y qué ocurre con los datos fuera de ella. El diseño, las integraciones y los proveedores deben sostener la misma promesa que recibe el usuario.",
    outcome:
      "Así convertimos decisiones dispersas en un sistema trazable que producto, diseño y legal pueden mejorar juntos.",
    objectPosition: "76% center",
    reverse: true,
  },
];

const LEVELS = [
  {
    number: "1",
    name: "Transparente",
    body: "Políticas de privacidad legibles y un consentimiento honesto. Lo mínimo para merecer confianza.",
    covers: ["Políticas claras", "Consentimiento explícito"],
  },
  {
    number: "2",
    name: "Íntegro",
    body: "Todo lo anterior y, además, ninguna interfaz que presione u oculte. Sin dark patterns.",
    covers: ["+ Sin dark patterns"],
  },
  {
    number: "3",
    name: "Soberano",
    body: "Todo lo anterior y, además, trazabilidad completa de terceros. El usuario manda de extremo a extremo.",
    covers: ["+ Trazabilidad de terceros"],
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

function AuditScopeItem({ item, index, open, onOpen }) {
  const panelId = `cert-audit-scope-panel-${index}`;

  return (
    <article
      className={[
        "cert-audit-scope__item",
        open && "cert-audit-scope__item--open",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        className="cert-audit-scope__question"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onOpen}
      >
        <strong className="cert-audit-scope__title">{item.title}</strong>
        <span className="cert-audit-scope__symbol" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>

      <div
        id={panelId}
        className={[
          "cert-audit-scope__panel",
          open && "cert-audit-scope__panel--open",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden={!open}
      >
        <div className="cert-audit-scope__panel-inner">
          <p>{item.body}</p>
          <p className="cert-audit-scope__outcome">
            <strong>Qué obtiene tu equipo:</strong> {item.outcome}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ── Page ── */

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function CertificacionPage() {
  const pageRef = useRef(null);
  const heroBgRef = useRef(null);
  const [animReady, setAnimReady] = useState(false);
  const [activeAuditScope, setActiveAuditScope] = useState(0);
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
                <Label color={COLORS.textOnLight}>Certificación Prometeo</Label>
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
                  className="cert-hero__cta"
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
          <Label color={COLORS.textOnLight}>El problema</Label>
          <p className="cert-intro__text">
            Una buena práctica de privacidad es invisible. El usuario no puede
            distinguir a quien le respeta de quien no.{" "}
            <span className="cert-accent">
              Lo que no se puede demostrar, no genera confianza.
            </span>
          </p>
        </section>

        {/* ── Auditoría — alcance desplegable + narrativa visual ── */}
        <section className="cert-audit" id="alcance" data-ambient="light">
          <div className="cert-audit__scope">
            <header className="cert-audit__header">
              <Label color={COLORS.textOnLight}>La auditoría</Label>
              <h2>
                Lo que no se ve, también se{" "}
                <span className="cert-accent">diseña.</span>
              </h2>
              <p>
                Los problemas de privacidad viven en los flujos, en los
                permisos y en lo que la interfaz decide no contarte. Prometeo
                revisa cuatro áreas conectadas para entender la experiencia
                completa y convertirla en acciones concretas.
              </p>
            </header>

            <div
              className="cert-audit__accordions"
              aria-label="Áreas que revisa Prometeo"
            >
              {SCOPE.map((item, index) => (
                <AuditScopeItem
                  key={item.title}
                  item={item}
                  index={index}
                  open={activeAuditScope === index}
                  onOpen={() => setActiveAuditScope(index)}
                />
              ))}
            </div>
          </div>

          <div
            className="cert-audit__stories"
            aria-label="Cómo se desarrolla la auditoría"
          >
            {AUDIT_STORIES.map((story) => (
              <article
                key={story.title}
                className={[
                  "cert-audit-story",
                  story.reverse && "cert-audit-story--reverse",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="cert-audit-story__visual" aria-hidden="true">
                  <GridImageReveal
                    src={heroImage}
                    alt=""
                    label=""
                    tone="light"
                    minHeight="100%"
                    revealWidthRatio={1}
                    objectPosition={story.objectPosition}
                    className="cert-audit-story__image"
                    style={{ height: "100%" }}
                  />
                </div>

                <div className="cert-audit-story__copy">
                  <div className="cert-audit-story__copy-inner">
                    <h3>{story.title}</h3>
                    <p>{story.body}</p>
                    <p className="cert-audit-story__outcome">{story.outcome}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cert-seal" id="sello" data-ambient="light">
          <div className="cert-seal__header">
            <div className="cert-seal__heading">
              <Label color={COLORS.textOnLight}>El sello</Label>
              <h2>
                Una señal. <span className="cert-accent">Tres niveles.</span>
              </h2>
            </div>
            <p>
              Cualquier nivel significa que la empresa cumple el estándar
              Prometeo. Los niveles no miden si se puede confiar, sino hasta
              dónde llega ese compromiso.
            </p>
          </div>

          <div className="cert-seal__levels">
            {LEVELS.map((level) => (
              <article key={level.number} className="cert-seal-level">
                <div className="cert-seal-level__badge" aria-hidden="true">
                  <span className="cert-seal-level__badge-mark">PRO ®</span>
                  <span className="cert-seal-level__badge-level">
                    N{level.number}
                  </span>
                  <span className="cert-seal-level__badge-note">
                    Sello · placeholder
                  </span>
                </div>
                <div className="cert-seal-level__copy">
                  <span className="cert-seal-level__index">
                    Nivel {level.number}
                  </span>
                  <h3>{level.name}</h3>
                  <p>{level.body}</p>
                  <ul className="cert-seal-level__covers">
                    {level.covers.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="cert-seal__note">
            <p>
              El nivel no es solo una etiqueta: es un objetivo. Cada sello
              emitido es público y verificable en el registro.
            </p>
            <SplitCtaButton
              as={Link}
              to="/empresas/registro"
              label="Ver el registro público"
              color={COLORS.textOnLight}
              iconBg={COLORS.pageLight}
              style={{ "--ds-split-cta-width": "320px", maxWidth: "100%" }}
              onClick={scrollToTopImmediate}
            />
          </div>
        </section>

        <section className="cert-proof" id="verificacion" data-ambient="light">
          <Label color={COLORS.textOnLight}>Verificación</Label>
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
            <Label color={COLORS.textOnLight}>Antes de decidir</Label>
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
              <Label color={COLORS.textOnLight}>Siguiente paso</Label>
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
