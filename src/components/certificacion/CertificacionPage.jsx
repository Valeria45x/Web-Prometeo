import { useRef } from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../../design/tokens";
import { useScrollTextReveal } from "../../hooks/useScrollTextReveal";
import { useReveal } from "../../hooks/useReveal";
import { scrollToTopImmediate } from "../../lib/lenis";
import { Page } from "../Page";
import LandingTransitionSection from "../landing/transition/LandingTransitionSection";
import Label from "../system/Label";
import SplitCtaButton from "../system/SplitCtaButton";
import TextReveal from "../system/TextReveal";
import ScrambleText from "../landing/shared/ScrambleText";
import "./certificacion.css";

/* ── Content ── */

const SCOPE = [
  {
    title: "Políticas de privacidad",
    body: "Analizamos si tu política es comprensible, accesible y veraz. No buscamos legalismo: buscamos claridad real.",
  },
  {
    title: "Flujos de consentimiento",
    body: "Revisamos cómo y cuándo pides permiso. Explícito, granular y revocable. Sin casillas premarcadas.",
  },
  {
    title: "Dark patterns",
    body: "Detectamos patrones que manipulan la decisión del usuario. Urgencia falsa, fricción asimétrica, opciones ocultas.",
  },
  {
    title: "Datos de terceros",
    body: "Mapeamos qué servicios acceden a datos de tus usuarios, con qué base legal y bajo qué condiciones.",
  },
];

const PROCESS = [
  {
    number: "01",
    title: "Solicitud",
    body: "Completas un formulario inicial. Describimos el alcance, los plazos y los costes antes de empezar.",
  },
  {
    number: "02",
    title: "Análisis",
    body: "Nuestro equipo revisa tus flujos, documentos y código. Sin acceso a datos de usuarios reales.",
  },
  {
    number: "03",
    title: "Informe",
    body: "Recibes un informe con hallazgos, riesgos y recomendaciones concretas. Es tuyo, con o sin certificación.",
  },
  {
    number: "04",
    title: "Implementación",
    body: "Si hay cambios necesarios, te acompañamos. Desde el copy de un banner hasta la arquitectura de permisos.",
  },
  {
    number: "05",
    title: "Certificación",
    body: "Si cumples el estándar, recibes el sello Prometeo. Visible para tus usuarios, verificable para cualquiera.",
  },
];

const LEVELS = [
  {
    tier: "Básico",
    title: "Fundamentos",
    body: "Cumplimiento esencial. Política clara, consentimiento explícito, RGPD básico.",
    count: "4 requisitos",
    featured: false,
  },
  {
    tier: "Avanzado",
    title: "Transparencia",
    body: "Privacidad como parte del producto. Auditoría de dark patterns, mapa de datos, panel de usuario.",
    count: "5 requisitos",
    featured: true,
  },
  {
    tier: "Integral",
    title: "Referencia",
    body: "El estándar más alto. Privacy by design, código auditado, formación, soporte continuo.",
    count: "6 requisitos",
    featured: false,
  },
];

/* ── Sub-components ── */

function ScopeCard({ item, delay }) {
  const [ref, style] = useReveal(delay, true);

  return (
    <article ref={ref} className="cert-scope__card" style={style}>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </article>
  );
}

function ProcessStep({ step, index }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`cert-process__step ${isEven ? "cert-process__step--left" : "cert-process__step--right"}`}>
      <ScrambleText
        as="span"
        text={step.number}
        className="cert-process__number"
        idle="scrambled"
        duration={600}
      />
      <TextReveal
        as="div"
        className="cert-process__step-content"
        lines={[
          <h3 key="t" className="cert-process__step-title">{step.title}</h3>,
          <p key="b">{step.body}</p>,
        ]}
        baseDelay={0}
        delayStep={120}
      />
    </div>
  );
}

function LevelRow({ level, delay }) {
  const [ref, style] = useReveal(delay, true);

  return (
    <div
      ref={ref}
      className={`cert-level ${level.featured ? "cert-level--featured" : ""}`}
      style={style}
    >
      <span className="cert-level__tier">{level.tier}</span>
      <h3 className="cert-level__title">{level.title}</h3>
      <p className="cert-level__body">{level.body}</p>
      <span className="cert-level__count">{level.count}</span>
    </div>
  );
}

/* ── Page ── */

export default function CertificacionPage() {
  const pageRef = useRef(null);
  useScrollTextReveal(pageRef);

  return (
    <Page light>
      <div ref={pageRef} className="cert-page">
        {/* ── 1. Hero ── */}
        <section className="cert-hero">
          <div className="cert-hero__content">
            <Label color={COLORS.accent}>Certificación Prometeo</Label>
            <h1 className="cert-hero__title">
              Privacidad que se{" "}
              <span className="cert-accent">certifica.</span>
            </h1>
            <p className="cert-hero__body">
              Una auditoría independiente que analiza cómo tu empresa trata
              los datos de sus usuarios. Sin jerga legal. Con criterio de
              diseño, tecnología y ética.
            </p>
            <SplitCtaButton
              as={Link}
              to="/contacto"
              label="Solicitar certificación"
              color={COLORS.textOnLight}
              iconBg={COLORS.pageLight}
              style={{ "--ds-split-cta-width": "320px", maxWidth: "100%" }}
              onClick={scrollToTopImmediate}
            />
          </div>
        </section>

        {/* ── 2. Transition ── */}
        <div className="cert-transition">
          <LandingTransitionSection light title="Qué auditamos" column={1} />
        </div>

        {/* ── 3. Scope — 2×2 cards ── */}
        <section className="cert-scope">
          <div className="cert-scope__header">
            <Label color={COLORS.accent}>Alcance</Label>
            <h2>
              Cuatro áreas{" "}
              <span className="cert-accent">críticas.</span>
            </h2>
          </div>
          <div className="cert-scope__grid">
            {SCOPE.map((item, i) => (
              <ScopeCard key={item.title} item={item} delay={i * 100} />
            ))}
          </div>
        </section>

        {/* ── 4. Transition ── */}
        <div className="cert-transition">
          <LandingTransitionSection light title="El proceso" column={2} />
        </div>

        {/* ── 5. Process — alternating blocks ── */}
        <section className="cert-process">
          <div className="cert-process__header">
            <h2>
              Cinco pasos.{" "}
              <span className="cert-accent">Sin sorpresas.</span>
            </h2>
            <p>
              Cada fase genera un entregable que es tuyo independientemente
              del resultado final.
            </p>
          </div>
          <div className="cert-process__list">
            {PROCESS.map((step, i) => (
              <ProcessStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </section>

        {/* ── 6. Transition ── */}
        <div className="cert-transition">
          <LandingTransitionSection light title="Niveles" column={3} />
        </div>

        {/* ── 6. Levels — stacked rows ── */}
        <section className="cert-levels">
          <div className="cert-levels__header">
            <Label color={COLORS.accent}>Certificación</Label>
            <h2>
              Tres niveles de{" "}
              <span className="cert-accent">exigencia.</span>
            </h2>
          </div>
          <div className="cert-levels__list">
            {LEVELS.map((level, i) => (
              <LevelRow key={level.tier} level={level} delay={i * 120} />
            ))}
          </div>
        </section>

        {/* ── 7. Closing CTA ── */}
        <section className="cert-cta">
          <div className="cert-cta__content">
            <Label color={COLORS.accent}>Siguiente paso</Label>
            <h2 className="cert-cta__title">
              Solicita tu{" "}
              <span className="cert-accent">certificación.</span>
            </h2>
            <SplitCtaButton
              as={Link}
              to="/contacto"
              label="Contactar"
              color={COLORS.textOnLight}
              iconBg={COLORS.pageLight}
              style={{ "--ds-split-cta-width": "280px", maxWidth: "100%" }}
              onClick={scrollToTopImmediate}
            />
          </div>
          <div className="cert-cta__body">
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
