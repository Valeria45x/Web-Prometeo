import { useRef, useState } from "react";
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
    body: "¿Es comprensible, accesible y veraz? Claridad real, no legalismo.",
  },
  {
    title: "Flujos de consentimiento",
    body: "Cómo y cuándo pides permiso. Explícito, granular, revocable.",
  },
  {
    title: "Dark patterns",
    body: "Urgencia falsa, fricción asimétrica, opciones ocultas.",
  },
  {
    title: "Datos de terceros",
    body: "Qué servicios acceden a datos de tus usuarios y con qué base legal.",
  },
];

const PROCESS = [
  {
    number: "01",
    title: "Solicitud",
    meta: "3 días",
    body: "Nos cuentas tu producto. Te devolvemos alcance, plazos y coste cerrados.",
  },
  {
    number: "02",
    title: "Análisis",
    meta: "2–4 semanas",
    body: "Flujos, documentos e interfaz en entornos de prueba. Nunca datos reales.",
  },
  {
    number: "03",
    title: "Informe",
    meta: "1 semana",
    body: "Hallazgos priorizados y recomendaciones. Tuyo, certifiques o no.",
  },
  {
    number: "04",
    title: "Implementación",
    meta: "opcional",
    body: "Si decides corregir, te acompañamos en cada cambio.",
  },
  {
    number: "05",
    title: "Certificación",
    meta: "12 meses",
    body: "Emitimos el sello y publicamos tu registro.",
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

const RECORD = [
  { key: "ID", value: "PRM-2026-0142" },
  { key: "Empresa", value: "Nodo Pay, S.L." },
  { key: "Nivel", value: "Avanzado — Transparencia" },
  { key: "Válido hasta", value: "Marzo 2027" },
  { key: "Estado", value: "Vigente", live: true },
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
      "La verificabilidad, no un título. El estándar y todos los sellos emitidos son públicos: cualquiera puede auditarnos a nosotros.",
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

function CertSeal() {
  return (
    <div className="cert-seal" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="cert-seal__base">
        <circle cx="100" cy="100" r="99" />
        <circle cx="100" cy="100" r="58" />
        <text x="100" y="104" className="cert-seal__mark">
          P
        </text>
      </svg>
      <svg viewBox="0 0 200 200" className="cert-seal__rotor">
        <defs>
          <path
            id="cert-seal-ring"
            d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
          />
        </defs>
        <text className="cert-seal__ring-text">
          <textPath href="#cert-seal-ring">
            CERTIFICACIÓN PROMETEO · PRIVACIDAD VERIFICABLE ·
          </textPath>
        </text>
      </svg>
    </div>
  );
}

function ScopeCard({ item, delay }) {
  const [ref, style] = useReveal(delay, true);

  return (
    <article ref={ref} className="cert-scope__card" style={style}>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </article>
  );
}

function ProcessStep({ step }) {
  return (
    <div className="cert-process__step">
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
      <span className="cert-process__meta">{step.meta}</span>
    </div>
  );
}

function LevelRow({ level, delay, open, onToggle }) {
  const [ref, style] = useReveal(delay, true);
  const panelId = `cert-level-panel-${level.tier}`;

  return (
    <div
      ref={ref}
      className={[
        "cert-level",
        level.featured && "cert-level--featured",
        open && "cert-level--open",
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      <button
        type="button"
        className="cert-level__head"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="cert-level__tier">
          {level.tier}
          {level.featured && (
            <span className="cert-level__flag">El más solicitado</span>
          )}
        </span>
        <h3 className="cert-level__title">{level.title}</h3>
        <p className="cert-level__audience">{level.audience}</p>
        <span className="cert-level__count">{level.count}</span>
        <span
          className={[
            "cert-level__chevron",
            open && "cert-level__chevron--open",
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
        className={[
          "cert-level__panel",
          open && "cert-level__panel--open",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden={!open}
      >
        <div className="cert-level__panel-inner">
          {level.base && <p className="cert-level__base">{level.base}</p>}
          <ul className="cert-level__reqs">
            {level.requirements.map((req, i) => (
              <li key={req}>
                <span className="cert-level__req-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {req}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
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

export default function CertificacionPage() {
  const pageRef = useRef(null);
  const [openLevel, setOpenLevel] = useState(null);
  useScrollTextReveal(pageRef);

  return (
    <Page light>
      <div ref={pageRef} className="cert-page">
        {/* ── 1. Hero — el sello como protagonista ── */}
        <section className="cert-hero">
          <CertSeal />
          <div className="cert-hero__content">
            <Label color={COLORS.accent}>Certificación Prometeo</Label>
            <h1 className="cert-hero__title">
              Privacidad que se{" "}
              <span className="cert-accent">certifica.</span>
            </h1>
            <p className="cert-hero__body">
              Una auditoría independiente. Un sello público. Cómo tratas los
              datos, a la vista de cualquiera.
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
          <LandingTransitionSection light title="El sello" column={1} />
        </div>

        {/* ── 3. Verificación — paga la promesa de Empresas ── */}
        <section className="cert-verify" id="verificacion">
          <div className="cert-verify__header">
            <Label color={COLORS.accent}>Verificación</Label>
            <h2>
              No es una imagen. Es un{" "}
              <span className="cert-accent">enlace público.</span>
            </h2>
            <p>
              Cada sello apunta a un registro abierto. Tu usuario puede
              comprobarlo en segundos.
            </p>
          </div>
          <div className="cert-verify__demo">
            <div className="cert-verify__site">
              <span className="cert-verify__caption">En tu producto</span>
              <span className="cert-badge">
                <span className="cert-badge__dot" />
                Privacidad verificada — Prometeo
              </span>
            </div>
            <div className="cert-verify__record">
              <span className="cert-verify__caption">
                En el registro público
              </span>
              <dl className="cert-record">
                {RECORD.map((row) => (
                  <div key={row.key} className="cert-record__row">
                    <dt>{row.key}</dt>
                    <dd
                      className={
                        row.live ? "cert-record__value--live" : undefined
                      }
                    >
                      {row.live && (
                        <span
                          className="cert-record__dot"
                          aria-hidden="true"
                        />
                      )}
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── 4. Transition ── */}
        <div className="cert-transition">
          <LandingTransitionSection light title="Qué auditamos" column={2} />
        </div>

        {/* ── 5. Scope — 2×2 cards ── */}
        <section className="cert-scope" id="alcance">
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

        {/* ── 6. Transition ── */}
        <div className="cert-transition">
          <LandingTransitionSection light title="El proceso" column={3} />
        </div>

        {/* ── 7. Process — compact ledger ── */}
        <section className="cert-process" id="proceso">
          <div className="cert-process__header">
            <h2>
              Cinco pasos.{" "}
              <span className="cert-accent">Sin sorpresas.</span>
            </h2>
            <p>Cada fase tiene plazo y entregable. Tuyo, llegues o no al sello.</p>
          </div>
          <div className="cert-process__list">
            {PROCESS.map((step) => (
              <ProcessStep key={step.number} step={step} />
            ))}
          </div>
        </section>

        {/* ── 8. Transition ── */}
        <div className="cert-transition">
          <LandingTransitionSection light title="Niveles" column={4} />
        </div>

        {/* ── 9. Levels — filas expandibles ── */}
        <section className="cert-levels" id="niveles">
          <div className="cert-levels__header">
            <Label color={COLORS.accent}>Certificación</Label>
            <h2>
              Tres niveles de{" "}
              <span className="cert-accent">exigencia.</span>
            </h2>
            <p>Cada nivel incluye el anterior. Despliega para ver qué se evalúa.</p>
          </div>
          <div className="cert-levels__list">
            {LEVELS.map((level, i) => (
              <LevelRow
                key={level.tier}
                level={level}
                delay={i * 120}
                open={openLevel === level.tier}
                onToggle={() =>
                  setOpenLevel((prev) =>
                    prev === level.tier ? null : level.tier,
                  )
                }
              />
            ))}
          </div>
        </section>

        {/* ── 10. Transition ── */}
        <div className="cert-transition">
          <LandingTransitionSection light title="Preguntas" column={1} />
        </div>

        {/* ── 11. FAQ — manejo de objeciones ── */}
        <section className="cert-faq" id="preguntas">
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
        <section className="cert-cta">
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
              color={COLORS.textOnLight}
              iconBg={COLORS.pageLight}
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
