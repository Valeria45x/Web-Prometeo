import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { COLORS, FONTS } from "../../design/tokens";
import { useScrollTextReveal } from "../../hooks/useScrollTextReveal";
import { scrollToTopImmediate } from "../../lib/lenis";
import { Page } from "../Page";
import LandingTransitionSection from "../landing/transition/LandingTransitionSection";
import Label from "../system/Label";
import { Grid, GridCell } from "../system/Grid";
import "../landing/shared/scrollTextReveal.css";
import "./para-ti.css";
import heroImage from "../../../Instagram Feed USB v1.png";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

const UI = {
  bg: COLORS.pageLight,
  text: COLORS.textOnLight,
};

const PRINCIPLES = [
  {
    title: "Entiende",
    body: "Antes de cambiar ajustes o instalar nada, pon nombre a lo que pasa. El primer paso siempre es entender el problema.",
  },
  {
    title: "Decide",
    body: "No existe la configuración perfecta para todo el mundo. Elige lo que encaja con tu vida, no con la de un experto.",
  },
  {
    title: "Comparte",
    body: "Tu duda probablemente la tiene mucha más gente. Compartirla la convierte en respuesta para todos.",
  },
];

const ACCESS_POINTS = [
  {
    title: "Artículos",
    description:
      "Explicaciones claras sobre lo que pasa cuando navegas, aceptas cookies o usas las apps de siempre.",
    to: "/articulos",
  },
  {
    title: "Comunidad",
    description:
      "Pregunta sin miedo a parecer ignorante. Aquí todos están aprendiendo.",
    to: "/comunidad",
  },
  {
    title: "Tienda",
    description:
      "Objetos que recuerdan, en lo cotidiano, que la privacidad también es una postura.",
    to: "/tienda",
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

function PrincipleRow({ item }) {
  return (
    <li className="para-ti-path__step">
      <div className="para-ti-path__step-copy">
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
    </li>
  );
}

function AccessLink({ item }) {
  return (
    <Link
      to={item.to}
      className="para-ti-access-link"
      onClick={scrollToTopImmediate}
    >
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <span className="para-ti-access-link__action">
        <ArrowIcon />
      </span>
    </Link>
  );
}

export default function ParaTiPage() {
  const pageRef = useRef(null);
  const imgRef = useRef(null);
  const accessImageFrameRef = useRef(null);
  const accessImageRef = useRef(null);
  useScrollTextReveal(pageRef);

  useEffect(() => {
    const accessImageFrame = accessImageFrameRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = null;

    function updateHeroImage() {
      if (!imgRef.current) return;

      const frame = imgRef.current.parentElement;
      const rect = frame?.getBoundingClientRect();

      if (!rect) return;

      const offset = clamp(
        (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.1,
        -48,
        48,
      );

      imgRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.12)`;
    }

    function updateAccessImage() {
      if (!accessImageFrame || !accessImageRef.current) return;

      if (reducedMotion.matches) {
        accessImageFrame.style.setProperty("--para-ti-access-clip-right", "0%");
        accessImageFrame.style.setProperty("--para-ti-access-shift", "0%");
        accessImageRef.current.style.transform =
          "translate3d(0, 0, 0) scale(1.14)";
        return;
      }

      const rect = accessImageFrame.getBoundingClientRect();
      const revealStart = window.innerHeight * 0.96;
      const revealEnd = window.innerHeight * 0.42;
      const revealRange = Math.max(revealStart - revealEnd, 1);
      const revealProgress = clamp(
        (revealStart - rect.top) / revealRange,
        0,
        1,
      );
      const offset = clamp(
        (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.12,
        -48,
        48,
      );

      accessImageFrame.style.setProperty(
        "--para-ti-access-clip-right",
        `${(1 - revealProgress) * 100}%`,
      );
      accessImageFrame.style.setProperty(
        "--para-ti-access-shift",
        `${(1 - revealProgress) * 6}%`,
      );
      accessImageRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.14)`;
    }

    function updateMotion() {
      updateHeroImage();
      updateAccessImage();
    }

    function scheduleUpdate() {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateMotion();
      });
    }

    updateMotion();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <Page light>
      <div ref={pageRef} className="para-ti-page">
        <section className="para-ti-hero">
          <div className="para-ti-hero__bg" aria-hidden="true">
            <img
              ref={imgRef}
              src={heroImage}
              alt=""
              className="para-ti-hero__bg-img"
            />
            <div className="para-ti-hero__overlay" />
          </div>
          <Grid
            columns="site"
            className="para-ti-hero__content"
            style={{ gridTemplateRows: "auto auto" }}
          >
            {/* Fila 1: label + título */}
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="para-ti-hero__copy"
            >
              <div className="para-ti-hero__heading">
                <Label color={COLORS.accent} className="para-ti-hero__kicker">
                  Para ti
                </Label>
                <h1
                  className="para-ti-hero__title"
                  style={{
                    fontFamily: FONTS.display,
                    color: UI.text,
                    margin: 0,
                  }}
                >
                  <span>Entender primero.</span>
                  <span className="para-ti-accent">Elegir después.</span>
                </h1>
              </div>
            </GridCell>
            <GridCell
              span={2}
              className="para-ti-hero__copy-aside"
              aria-hidden="true"
            />
            {/* Fila 2: descripción */}
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="para-ti-hero__desc-spacer"
              aria-hidden="true"
            />
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="para-ti-hero__desc"
            >
              <p>
                Porque a nadie le enseñaron esto. Explicaciones claras, una
                comunidad honesta y herramientas para que lo que haces en
                internet sea cada vez más una elección y menos un hábito que
                alguien diseñó por ti.
              </p>
            </GridCell>
          </Grid>
        </section>

        <div className="para-ti-transition">
          <LandingTransitionSection light title="El recorrido" column={1} />
        </div>

        <Grid as="section" columns="site" className="para-ti-path">
          <GridCell className="para-ti-path__intro">
            <div className="para-ti-path__intro-inner">
              <h2 className="para-ti-path__heading">Un recorrido posible</h2>
              <p className="para-ti-path__statement">
                Elige una situación concreta. Avanza desde ahí.
              </p>
              <p>
                No hace falta entender internet entero. El objetivo es que, poco
                a poco, lo que haces online sea una elección consciente y no un
                hábito que alguien diseñó por ti.
              </p>
            </div>
          </GridCell>

          <GridCell
            span={3}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="para-ti-path__steps-cell"
          >
            <ol className="para-ti-path__steps">
              {PRINCIPLES.map((item) => (
                <PrincipleRow key={item.title} item={item} />
              ))}
            </ol>
          </GridCell>
        </Grid>

        <div className="para-ti-transition">
          <LandingTransitionSection light title="Los caminos" column={2} />
        </div>

        <section className="para-ti-access">
          <Grid columns="site" className="para-ti-access__header">
            <GridCell
              span={3}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="para-ti-access__image-cell"
            >
              <div
                ref={accessImageFrameRef}
                className="para-ti-access__image-reveal"
              >
                <img
                  ref={accessImageRef}
                  src={heroImage}
                  alt=""
                  className="para-ti-access__image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </GridCell>
            <GridCell className="para-ti-access__label">
              <Label color={COLORS.accent}>¿Por dónde quieres empezar?</Label>
            </GridCell>
          </Grid>

          <div className="para-ti-transition">
            <LandingTransitionSection light title="Los recursos" column={3} />
          </div>

          <nav className="para-ti-access__links" aria-label="Recursos para ti">
            {ACCESS_POINTS.map((item) => (
              <AccessLink key={item.to} item={item} />
            ))}
          </nav>

          <div className="para-ti-transition">
            <LandingTransitionSection
              light
              title="Sigue explorando"
              column={4}
            />
          </div>
        </section>
      </div>
    </Page>
  );
}
