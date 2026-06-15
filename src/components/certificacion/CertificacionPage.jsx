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
    body:
      "No basta con que el documento sea jurídicamente correcto. Comprobamos si una persona puede entender qué datos se recogen, para qué se utilizan, durante cuánto tiempo se conservan y con quién se comparten.",
    review:
      "Revisamos la jerarquía, la longitud, los ejemplos y la coherencia entre lo que promete la política y lo que realmente ocurre en el producto. Localizamos ambigüedades y decisiones importantes escondidas detrás de lenguaje técnico.",
    outcome:
      "una hoja de ruta para convertir la política en una explicación clara, verificable y legible en menos de cinco minutos.",
  },
  {
    number: "02",
    signal: "Decisión",
    title: "Flujos de consentimiento",
    body:
      "Analizamos el momento exacto en el que se pide permiso y la información disponible antes de decidir. El consentimiento debe ser explícito, específico para cada uso y tan fácil de retirar como de conceder.",
    review:
      "Recorremos banners, formularios, ajustes y mensajes de confirmación para comprobar que aceptar no sea el camino privilegiado. También verificamos que cambiar de opinión no implique buscar opciones ocultas o atravesar pasos innecesarios.",
    outcome:
      "un flujo de consentimiento equilibrado, documentado y reversible en cada punto de contacto.",
  },
  {
    number: "03",
    signal: "Interfaz",
    title: "Dark patterns",
    body:
      "Una interfaz también puede presionar sin decirlo. Observamos urgencia falsa, culpa, opciones preseleccionadas, jerarquías visuales engañosas y cualquier fricción que empuje al usuario hacia la decisión más beneficiosa para la empresa.",
    review:
      "Comparamos peso visual, número de pasos, tono y accesibilidad de las alternativas. La revisión no busca eliminar la persuasión, sino asegurar que ninguna decisión dependa de cansar, confundir u ocultar información.",
    outcome:
      "un inventario priorizado de patrones problemáticos y propuestas de rediseño que respetan la libertad de elección.",
  },
  {
    number: "04",
    signal: "Ecosistema",
    title: "Datos de terceros",
    body:
      "La experiencia no termina en la interfaz propia. Mapeamos qué proveedores, herramientas y servicios externos reciben información, qué función cumplen y con qué base se produce cada transferencia.",
    review:
      "Contrastamos documentación, integraciones y mensajes dirigidos al usuario para descubrir dependencias que no están explicadas. También revisamos si existe una forma realista de limitar, sustituir o eliminar cada acceso.",
    outcome:
      "un mapa de trazabilidad de extremo a extremo para saber dónde viaja cada dato y quién responde por él.",
  },
];

const AUDIT_VISUALS = [
  { objectPosition: "18% center", reverse: false },
  { objectPosition: "38% center", reverse: false },
  { objectPosition: "62% center", reverse: true },
  { objectPosition: "82% center", reverse: true },
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

/* ── Page ── */

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function CertificacionPage() {
  const pageRef = useRef(null);
  const heroBgRef = useRef(null);
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

        {/* ── Auditoría — imagen en recorrido + texto sticky ── */}
        <section className="cert-audit" id="alcance" data-ambient="light">
          <header className="cert-audit__header">
            <Label color={COLORS.textOnLight}>La auditoría</Label>
            <h2>
              Lo que no se ve, también se{" "}
              <span className="cert-accent">diseña.</span>
            </h2>
            <p>
              Los problemas de privacidad viven en los flujos, en los permisos
              y en lo que la interfaz decide no contarte. Auditamos exactamente
              eso. Cada bloque explica qué observamos, cómo lo comprobamos y qué
              resultado puede aplicar después tu equipo.
            </p>
          </header>

          {SCOPE.map((item, index) => {
            const visual = AUDIT_VISUALS[index];

            return (
              <article
                key={item.title}
                className={[
                  "cert-audit__block",
                  visual.reverse && "cert-audit__block--reverse",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="cert-audit__visual" aria-hidden="true">
                  <GridImageReveal
                    src={heroImage}
                    alt=""
                    label=""
                    tone="light"
                    minHeight="100%"
                    revealWidthRatio={1}
                    objectPosition={visual.objectPosition}
                    className="cert-audit__image"
                    style={{ height: "100%" }}
                  />
                </div>

                <div className="cert-audit__rail">
                  <div className="cert-audit__rail-inner">
                    <div className="cert-audit__item-head">
                      <span data-animate-text>{item.number}</span>
                      <small data-animate-text>{item.signal}</small>
                    </div>
                    <h3>{item.title}</h3>
                    <div className="cert-audit__copy">
                      <p>{item.body}</p>
                      <p>{item.review}</p>
                      <p className="cert-audit__outcome">
                        <strong>Qué obtiene tu equipo:</strong> {item.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="cert-seal" id="sello" data-ambient="light">
          <div className="cert-seal__header">
            <Label color={COLORS.textOnLight}>El sello</Label>
            <h2>
              Una señal. <span className="cert-accent">Tres niveles.</span>
            </h2>
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
