import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { COLORS, FONTS } from "@/design/tokens";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";
import { useReveal } from "@/hooks/useReveal";
import { scrollToTopImmediate } from "@/lib/lenis";
import { Page } from "@/shared/layout/Page";
import Label from "@/shared/ui/Label";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { Grid, GridCell } from "@/shared/ui/Grid";
import GridImageReveal from "@/shared/ui/GridImageReveal";
import { placeholderImage as heroImage } from "@/lib/media";
import "@/features/landing/shared/scrollTextReveal.css";
import "@/features/certificacion/certificacion.css";

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
      "Recorremos formularios y ajustes para verificar que cada permiso sea explícito, específico y reversible.",
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
      "los accesos a terceros que no estaban declarados y dónde lo que dices no coincide con lo que tu producto comparte de verdad.",
  },
];

const AUDIT_STORIES = [
  {
    title: "Antes del clic ya se ha decidido casi todo.",
    body:
      "Seguimos el recorrido real de una persona: qué encuentra, qué entiende y qué necesita para decidir. Comprobamos que la política y el consentimiento cuenten lo mismo, y que aceptar no resulte más fácil que rechazar.",
    outcome:
      "Detectamos dónde el usuario decide sin la información suficiente y lo dejamos por escrito, paso a paso, para que tu equipo lo corrija.",
    objectPosition: "24% center",
    reverse: false,
  },
  {
    title: "Después del clic, los datos siguen viajando.",
    body:
      "Luego miramos a dónde van los datos cuando el usuario ya no mira: qué proveedores los reciben y con qué base. Lo que el producto promete y lo que hace por detrás tienen que coincidir.",
    outcome:
      "Te entregamos un mapa de dónde acaba cada dato y una lista priorizada de lo que hay que arreglar para que la promesa se sostenga.",
    objectPosition: "76% center",
    reverse: true,
  },
];

const LEVELS = [
  { number: "1", name: "Transparente" },
  { number: "2", name: "Íntegro" },
  { number: "3", name: "Soberano" },
];

const FAQ = [
  {
    question: "¿Qué gana mi empresa al certificarse?",
    answer:
      "Una señal de confianza que el mercado puede comprobar, no solo creer. Te diferencia de quien dice cuidar la privacidad sin demostrarlo, reduce la fricción con usuarios y partners, y te deja un informe accionable para mejorar producto, diseño y legal.",
  },
  {
    question: "¿Y qué gana un usuario normal?",
    answer:
      "Poder distinguir, de un vistazo, a quién le respeta de quién no. El sello traduce prácticas invisibles en una prueba pública: cualquiera puede verificar qué se audita y qué cumple la empresa, sin leerse la letra pequeña.",
  },
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
                  Prometeo es una certificación independiente de privacidad.
                  Auditamos lo que tus usuarios ven y viven (políticas,
                  permisos, interfaz y terceros) y lo convertimos en una prueba
                  pública y verificable de que cumples lo que prometes.
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

        {/* ── Intro - banda rectangular con texto a todo lo ancho ── */}
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

        {/* ── Auditoría - alcance desplegable + narrativa visual ── */}
        <section className="cert-audit" id="alcance" data-ambient="light">
          <div className="cert-audit__scope">
            <header className="cert-audit__header">
              <Label color={COLORS.textOnLight}>La auditoría</Label>
              <h2>
                Lo que tu producto{" "}
                <span className="cert-accent">promete, comprobado.</span>
              </h2>
              <p>
                Auditamos solo lo que se puede comprobar desde fuera: lo que tu
                producto enseña, pide y comparte. Revisamos cuatro áreas
                conectadas y las convertimos en acciones concretas. No
                sustituimos a tu asesoría legal: somos la capa pública que
                demuestra, ante usuarios y mercado, que cumples lo que dices.
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
              Cualquier nivel significa que la empresa cumple el Estándar
              Prometeo, público y verificable. Los niveles no miden si se
              puede confiar, sino hasta dónde llega ese compromiso.
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
                </div>
                <SplitCtaButton
                  as={Link}
                  to="/contacto"
                  label="Solicitar auditoría"
                  color={COLORS.textOnLight}
                  iconBg={COLORS.pageLight}
                  className="cert-seal-level__cta"
                  style={{ "--ds-split-cta-width": "100%", maxWidth: "100%" }}
                  onClick={scrollToTopImmediate}
                />
              </article>
            ))}
          </div>

          <div className="cert-seal__note">
            <p>
              Cada sello emitido es público y verificable en el registro.
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

        {/* ── Parallax band - respiro visual tras el pivote a la luz ── */}
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
