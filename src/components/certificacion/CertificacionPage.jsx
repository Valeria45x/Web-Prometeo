import { useRef } from "react";
import { Link } from "react-router-dom";
import { useScrollTextReveal } from "../../hooks/useScrollTextReveal";
import { scrollToTopImmediate } from "../../lib/lenis";
import { Page } from "../Page";
import TextReveal from "../system/TextReveal";
import "../landing/shared/scrollTextReveal.css";
import "./certificacion.css";

const SCOPE = [
  {
    title: "Práctica",
    question: "¿Qué ocurre realmente?",
    body: "Revisamos cómo entra la privacidad en producto, operaciones y decisiones cotidianas.",
    evidence: "Procesos, responsables y decisiones",
  },
  {
    title: "Evidencia",
    question: "¿Qué puede comprobarse?",
    body: "Buscamos una relación clara entre cada compromiso y las pruebas que lo sostienen.",
    evidence: "Documentación, registros y controles",
  },
  {
    title: "Comunicación",
    question: "¿Qué puede entender el usuario?",
    body: "Evaluamos si el compromiso se traduce en información clara, accesible y reconocible.",
    evidence: "Mensajes, interfaces y señal pública",
  },
];

const AUDIT_TRAIL = [
  {
    title: "Apertura",
    body: "Definición del alcance, contexto y nivel al que aspira la organización.",
    output: "Alcance acordado",
  },
  {
    title: "Diagnóstico",
    body: "Lectura del sistema actual y detección de vacíos entre práctica y promesa.",
    output: "Mapa de situación",
  },
  {
    title: "Evidencias",
    body: "Recopilación y orden de las pruebas necesarias para cada criterio.",
    output: "Expediente verificable",
  },
  {
    title: "Contraste",
    body: "Revisión de coherencia entre lo que la empresa dice, hace y muestra.",
    output: "Resultado de revisión",
  },
  {
    title: "Publicación",
    body: "Activación de una señal con alcance, nivel y vigencia consultables.",
    output: "Registro público",
  },
];

const LEVELS = [
  {
    name: "Essential",
    subtitle: "Base ordenada",
    body: "Para organizaciones que necesitan convertir compromisos dispersos en un sistema básico y legible.",
    checks: ["Responsables definidos", "Prácticas esenciales", "Comunicación inicial"],
  },
  {
    name: "Verified",
    subtitle: "Evidencia contrastada",
    body: "Para equipos con procesos documentados y pruebas suficientes para sostener una revisión completa.",
    checks: ["Evidencias revisadas", "Coherencia demostrada", "Registro consultable"],
    featured: true,
  },
  {
    name: "Continuous",
    subtitle: "Sistema vivo",
    body: "Para organizaciones que integran la revisión continua en producto, cambios y gobernanza.",
    checks: ["Seguimiento periódico", "Gestión del cambio", "Renovación continua"],
  },
];

const PUBLIC_RECORD = [
  {
    title: "Alcance",
    body: "Qué producto, servicio o parte de la organización ha sido revisada.",
  },
  {
    title: "Nivel",
    body: "Qué grado de madurez y evidencia representa la señal obtenida.",
  },
  {
    title: "Vigencia",
    body: "Cuándo se emitió, cuándo debe revisarse y si sigue activa.",
  },
];

function ArrowIcon() {
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
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function CertificacionPage() {
  const pageRef = useRef(null);
  useScrollTextReveal(pageRef);

  return (
    <Page light>
      <div ref={pageRef} className="audit-page">
        <section className="audit-hero">
          <div className="audit-hero__copy">
            <div className="audit-hero__topline">
              <span className="audit-eyebrow">Certificación Prometeo</span>
              <span>Sistema de verificación PMT</span>
            </div>

            <TextReveal
              as="h1"
              once={false}
              lines={[
                "Una evidencia",
                "que se puede",
                <span className="audit-accent">abrir.</span>,
              ]}
              maskColor="#fcfcfc"
              className="audit-hero__title"
            />

            <div className="audit-hero__footer">
              <p>
                Una certificación que muestra qué se revisó, qué evidencia
                existe y durante cuánto tiempo sigue siendo válida.
              </p>
              <Link
                to="/contacto"
                className="audit-primary-cta"
                onClick={scrollToTopImmediate}
              >
                <span>Solicitar evaluación</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>

          <aside className="audit-hero__seal">
            <div className="audit-seal" aria-hidden="true">
              <span className="audit-seal__ring audit-seal__ring--outer" />
              <span className="audit-seal__ring audit-seal__ring--middle" />
              <span className="audit-seal__ring audit-seal__ring--inner" />
              <span className="audit-seal__cross audit-seal__cross--x" />
              <span className="audit-seal__cross audit-seal__cross--y" />
              <span className="audit-seal__scanner" />
              <div className="audit-seal__core">
                <strong>PMT</strong>
                <span>Verificable</span>
              </div>
            </div>
            <div className="audit-hero__seal-meta">
              <span>Estado</span>
              <strong>Listo para revisión</strong>
            </div>
          </aside>
        </section>

        <div className="audit-index">
          <span>Expediente de certificación</span>
          <span>01 Alcance</span>
          <span>02 Trazabilidad</span>
          <span>03 Niveles</span>
          <span>04 Registro</span>
        </div>

        <section className="audit-scope">
          <header className="audit-section-heading">
            <span className="audit-eyebrow">01 / Alcance</span>
            <TextReveal
              as="h2"
              once={false}
              lines={["No certificamos", "una promesa aislada."]}
              maskColor="#fcfcfc"
            />
            <p>
              La revisión conecta tres dimensiones. Si una falla, la señal no
              representa el sistema completo.
            </p>
          </header>

          <div className="audit-scope__list">
            {SCOPE.map((item, index) => (
              <article key={item.title}>
                <div className="audit-scope__status">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="audit-scope__check">
                    <CheckIcon />
                  </span>
                </div>
                <div className="audit-scope__title">
                  <span>{item.question}</span>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.body}</p>
                <div className="audit-scope__evidence">
                  <span>Objeto de revisión</span>
                  <strong>{item.evidence}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="audit-trail">
          <header className="audit-trail__header">
            <span className="audit-eyebrow">02 / Trazabilidad</span>
            <TextReveal
              as="h2"
              once={false}
              lines={["Cada paso deja", "una salida concreta."]}
              maskColor="#050505"
            />
            <p>
              La certificación no aparece al final de una conversación. Se
              construye como una cadena de revisión que puede recorrerse.
            </p>
          </header>

          <ol className="audit-trail__log">
            {AUDIT_TRAIL.map((item, index) => (
              <li key={item.title}>
                <span className="audit-trail__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="audit-trail__marker" aria-hidden="true">
                  <CheckIcon />
                </span>
                <div className="audit-trail__copy">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <div className="audit-trail__output">
                  <span>Salida</span>
                  <strong>{item.output}</strong>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="audit-levels">
          <header>
            <span className="audit-eyebrow">03 / Niveles</span>
            <h2>Una escala que describe madurez, no prestigio.</h2>
            <p>
              Cada nivel explica cuánto sistema existe detrás de la señal y qué
              puede esperar quien la consulta.
            </p>
          </header>

          <div className="audit-levels__grid">
            {LEVELS.map((level, index) => (
              <article
                key={level.name}
                className={[
                  "audit-certificate",
                  level.featured && "audit-certificate--featured",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="audit-certificate__header">
                  <span>Nivel {String(index + 1).padStart(2, "0")}</span>
                  <span>{level.subtitle}</span>
                </div>
                <div className="audit-certificate__body">
                  <h3>{level.name}</h3>
                  <p>{level.body}</p>
                </div>
                <ul>
                  {level.checks.map((check) => (
                    <li key={check}>
                      <CheckIcon />
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
                <div className="audit-certificate__stamp" aria-hidden="true">
                  PMT
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="audit-record">
          <div className="audit-record__intro">
            <span className="audit-eyebrow">04 / Registro público</span>
            <TextReveal
              as="h2"
              once={false}
              lines={["La señal también", "explica sus límites."]}
              maskColor="#fcfcfc"
            />
            <p>
              Verificar significa poder consultar el alcance real de una
              certificación, no solo reconocer un símbolo.
            </p>
          </div>

          <div className="audit-record__fields">
            {PUBLIC_RECORD.map((item) => (
              <article key={item.title}>
                <span className="audit-record__field-status">
                  <CheckIcon />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Link
          to="/contacto"
          className="audit-closing"
          onClick={scrollToTopImmediate}
        >
          <span>Empezar una evaluación</span>
          <strong>Abre el proceso de certificación.</strong>
          <span className="audit-closing__icon">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </Page>
  );
}
