import { useRef } from "react";
import { Link } from "react-router-dom";
import { useScrollTextReveal } from "../../hooks/useScrollTextReveal";
import { scrollToTopImmediate } from "../../lib/lenis";
import { Page } from "../Page";
import TextReveal from "../system/TextReveal";
import "../landing/shared/scrollTextReveal.css";
import "./empresas.css";

const TENSIONS = [
  {
    label: "Lo que prometes",
    title: "La intención",
    body: "Políticas, principios y compromisos que explican cómo quieres actuar.",
  },
  {
    label: "Lo que haces",
    title: "La operación",
    body: "Decisiones de producto, procesos internos y responsabilidades reales.",
  },
  {
    label: "Lo que demuestras",
    title: "La evidencia",
    body: "Pruebas legibles que permiten revisar el compromiso sin pedir un acto de fe.",
  },
];

const OPERATING_STEPS = [
  {
    title: "Diagnosticar",
    body: "Entender dónde se decide hoy la privacidad y dónde se pierde contexto.",
  },
  {
    title: "Alinear",
    body: "Conectar producto, legal, tecnología y comunicación bajo los mismos criterios.",
  },
  {
    title: "Demostrar",
    body: "Convertir decisiones y procesos en evidencias que puedan revisarse.",
  },
  {
    title: "Hacer visible",
    body: "Traducir el trabajo interno en una señal clara para quien debe confiar.",
  },
];

const OUTCOMES = [
  {
    title: "Producto más claro",
    body: "La privacidad entra en las decisiones antes de convertirse en texto legal.",
  },
  {
    title: "Equipos alineados",
    body: "Cada área entiende qué debe sostener y cómo se conecta con las demás.",
  },
  {
    title: "Riesgo menos difuso",
    body: "Las obligaciones se convierten en criterios concretos y responsabilidades visibles.",
  },
  {
    title: "Confianza reconocible",
    body: "El usuario puede distinguir el compromiso sin interpretar una política completa.",
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

export default function EmpresasPage() {
  const pageRef = useRef(null);
  useScrollTextReveal(pageRef);

  return (
    <Page light>
      <div ref={pageRef} className="enterprise-page">
        <section className="enterprise-hero">
          <div className="enterprise-hero__main">
            <span className="enterprise-eyebrow">Prometeo para empresas</span>
            <TextReveal
              as="h1"
              once={false}
              lines={[
                "La confianza",
                "no se declara.",
                <span className="enterprise-accent">Se opera.</span>,
              ]}
              maskColor="#050505"
              className="enterprise-hero__title"
            />
            <div className="enterprise-hero__footer">
              <p>
                Un sistema para convertir decisiones internas de privacidad en
                una confianza que producto, equipos y usuarios puedan
                reconocer.
              </p>
              <Link
                to="/contacto"
                className="enterprise-primary-cta"
                onClick={scrollToTopImmediate}
              >
                <span>Hablar con Prometeo</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>

          <aside className="enterprise-hero__console">
            <div className="enterprise-console__header">
              <span>Sistema de confianza</span>
              <span className="enterprise-console__live">Activo</span>
            </div>
            <div className="enterprise-console__display" aria-hidden="true">
              <span className="enterprise-console__axis enterprise-console__axis--x" />
              <span className="enterprise-console__axis enterprise-console__axis--y" />
              <span className="enterprise-console__scan" />
              <span className="enterprise-console__node enterprise-console__node--one" />
              <span className="enterprise-console__node enterprise-console__node--two" />
              <span className="enterprise-console__node enterprise-console__node--three" />
              <strong>PMT</strong>
            </div>
            <ul className="enterprise-console__signals">
              <li>
                <span>Producto</span>
                <strong>Decisión</strong>
              </li>
              <li>
                <span>Organización</span>
                <strong>Evidencia</strong>
              </li>
              <li>
                <span>Usuario</span>
                <strong>Señal</strong>
              </li>
            </ul>
          </aside>
        </section>

        <div className="enterprise-command-strip">
          <span>Una decisión</span>
          <span>Producto</span>
          <span>Legal</span>
          <span>Tecnología</span>
          <span>Comunicación</span>
        </div>

        <section className="enterprise-tension">
          <header className="enterprise-section-heading">
            <div>
              <span className="enterprise-eyebrow">El problema real</span>
              <TextReveal
                as="h2"
                once={false}
                lines={["La confianza se rompe", "entre departamentos."]}
                maskColor="#fcfcfc"
              />
            </div>
            <p>
              La privacidad suele vivir repartida entre políticas, tickets,
              decisiones técnicas y mensajes al usuario. El riesgo aparece en
              la distancia entre esas piezas.
            </p>
          </header>

          <div className="enterprise-tension__stage">
            {TENSIONS.map((item, index) => (
              <article
                key={item.title}
                className={`enterprise-tension__card enterprise-tension__card--${index + 1}`}
              >
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
            <div className="enterprise-tension__gap">
              <span>La distancia que Prometeo ayuda a cerrar</span>
            </div>
          </div>
        </section>

        <section className="enterprise-operating">
          <header className="enterprise-operating__header">
            <span className="enterprise-eyebrow">El sistema operativo</span>
            <TextReveal
              as="h2"
              once={false}
              lines={["De decisiones dispersas", "a una señal coherente."]}
              maskColor="#050505"
            />
            <p>
              Prometeo no añade otra capa de discurso. Ordena el trabajo que ya
              existe, detecta lo que falta y conecta cada práctica con una
              evidencia.
            </p>
          </header>

          <ol className="enterprise-operating__track">
            {OPERATING_STEPS.map((item, index) => (
              <li key={item.title}>
                <span className="enterprise-operating__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="enterprise-operating__marker" aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="enterprise-outcomes">
          <header>
            <span className="enterprise-eyebrow">Lo que cambia</span>
            <h2>Privacidad que funciona dentro y se entiende fuera.</h2>
          </header>
          <div className="enterprise-outcomes__grid">
            {OUTCOMES.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <Link
          to="/certificacion"
          className="enterprise-certification-cta"
          onClick={scrollToTopImmediate}
        >
          <div>
            <span>Certificación Prometeo</span>
            <strong>Cuando el sistema está preparado, puede verificarse.</strong>
          </div>
          <p>
            Conoce el alcance, la revisión y los niveles de una señal diseñada
            para ser consultada.
          </p>
          <span className="enterprise-certification-cta__icon">
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </Page>
  );
}
