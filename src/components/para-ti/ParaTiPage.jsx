import { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { COLORS, FONTS } from "../../design/tokens";
import { useScrollTextReveal } from "../../hooks/useScrollTextReveal";
import {
  getLenisInstance,
  scrollToTopImmediate,
} from "../../lib/lenis";
import { Page } from "../Page";
import LandingTransitionSection from "../landing/transition/LandingTransitionSection";
import Label from "../system/Label";
import SplitCtaButton from "../system/SplitCtaButton";
import { Grid, GridCell } from "../system/Grid";
import GridImageReveal from "../system/GridImageReveal";
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
    number: "01",
    title: "Observa",
    body: "Una app te pide acceso a tus contactos. Un precio cambia porque buscaste dos veces. Un anuncio aparece justo después de una conversación. No es casualidad. Empieza por notarlo.",
  },
  {
    number: "02",
    title: "Nombra",
    body: "No todo lo que incomoda es igual de importante. Pon nombre a lo que te preocupa. Cuando el problema tiene límites, deja de parecer inmanejable.",
  },
  {
    number: "03",
    title: "Pregunta",
    body: "¿Quién tiene esos datos? ¿Qué hacen con ellos? ¿Qué pasa si dices que no? Una buena pregunta no necesita respuesta inmediata. Necesita dirección.",
  },
  {
    number: "04",
    title: "Contrasta",
    body: "Busca más de una fuente. Habla con alguien que ya pasó por eso. Lo que parece normal a veces solo es lo que nadie ha cuestionado.",
  },
  {
    number: "05",
    title: "Decide",
    body: "Cambia un ajuste. Rechaza unas cookies. Prueba otra herramienta. O decide que por ahora está bien así. Decidir es elegir\u00a0— incluso cuando eliges no cambiar nada.",
  },
  {
    number: "06",
    title: "Comparte",
    body: "Lo que aprendiste puede ahorrarle a alguien el camino que tú ya hiciste. Una experiencia compartida vale más que cualquier artículo.",
  },
];

const ACCESS_POINTS = [
  {
    number: "01",
    title: "Artículos",
    eyebrow: "Para entender",
    description:
      "Conversaciones útiles para entender la privacidad digital, sus implicaciones y todo lo que abarca en la vida cotidiana.",
    cta: "Leer artículos",
    to: "/articulos",
    imagePosition: "38% center",
  },
  {
    number: "02",
    title: "Comunidad",
    eyebrow: "Para compartir",
    description:
      "Un espacio para convertir dudas sobre privacidad digital en conversaciones útiles, contrastar experiencias y avanzar con más\u00a0contexto.",
    cta: "Entrar en la comunidad",
    to: "/comunidad",
    imagePosition: "58% center",
  },
  {
    number: "03",
    title: "Tienda",
    eyebrow: "Para llevarlo contigo",
    description:
      "Objetos que trasladan la conversación sobre privacidad digital al espacio cotidiano.",
    cta: "Explorar la tienda",
    to: "/tienda",
    imagePosition: "76% center",
  },
];

const ACCESS_QUOTE_LINES = [
  "Tu vida digital también te pertenece.",
  "Que nadie decida por\u00a0ti.",
].map((line) => line.split(" "));

function PrincipleRow({ item }) {
  return (
    <li className="para-ti-path__step">
      <span className="para-ti-path__step-number" aria-hidden="true">
        {item.number}
      </span>
      <div className="para-ti-path__step-copy">
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
    </li>
  );
}

function AccessCard({ item, index, onSelect }) {
  return (
    <article
      id={`para-ti-access-card-${index + 1}`}
      className="para-ti-access-card"
      style={{ "--para-ti-card-index": index }}
      aria-labelledby={`para-ti-access-title-${index + 1}`}
    >
      <div className="para-ti-access-card__number" aria-hidden="true">
        {item.number}
      </div>

      <div className="para-ti-access-card__image-wrap" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          className="para-ti-access-card__image"
          style={{ objectPosition: item.imagePosition }}
          loading="lazy"
          decoding="async"
        />
      </div>

      <button
        type="button"
        id={`para-ti-access-title-${index + 1}`}
        className="para-ti-access-card__title"
        onClick={() => onSelect(index)}
        aria-label={`Mostrar la tarjeta de ${item.title}`}
      >
        <span>{item.title}</span>
        <span className="para-ti-access-card__title-action" aria-hidden="true">
          Ver
        </span>
      </button>

      <div className="para-ti-access-card__detail">
        <div className="para-ti-access-card__copy">
          <Label
            color={COLORS.accent}
            className="para-ti-access-card__eyebrow"
          >
            {item.eyebrow}
          </Label>
          <p>{item.description}</p>
        </div>
        <SplitCtaButton
          as={Link}
          to={item.to}
          label={item.cta}
          color={COLORS.textOnLight}
          iconBg={COLORS.pageLight}
          className="para-ti-access-card__cta"
          style={{
            "--ds-split-cta-width": "320px",
            maxWidth: "100%",
          }}
          onClick={scrollToTopImmediate}
        />
      </div>
    </article>
  );
}

export default function ParaTiPage() {
  const pageRef = useRef(null);
  const imgRef = useRef(null);
  const accessHeadingRef = useRef(null);
  const accessQuoteWordsRef = useRef([]);
  const accessCardAnchorsRef = useRef([]);
  useScrollTextReveal(pageRef);

  useEffect(() => {
    let frameId = null;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updateHeroImage() {
      if (!imgRef.current) return;

      const hero = imgRef.current.closest(".para-ti-hero");
      const frame = imgRef.current.parentElement;
      const rect = frame?.getBoundingClientRect();
      const heroRect = hero?.getBoundingClientRect();

      if (!rect || !hero || !heroRect) return;

      const offset = clamp(
        (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.1,
        -48,
        48,
      );
      const topbarHeight =
        Number.parseFloat(
          window
            .getComputedStyle(document.documentElement)
            .getPropertyValue("--prometeo-topbar-height"),
        ) || 64;
      const fadeStart = heroRect.height * 0.36;
      const fadeDistance = Math.max(heroRect.height * 0.58, 1);
      const exitProgress = clamp(
        (topbarHeight - heroRect.top - fadeStart) / fadeDistance,
        0,
        1,
      );

      imgRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.12)`;
      hero.style.setProperty(
        "--para-ti-hero-blackout",
        (exitProgress * 0.24).toString(),
      );
      hero.style.setProperty(
        "--para-ti-hero-copy-opacity",
        (1 - exitProgress * 0.12).toString(),
      );
    }

    function updateAccessQuote() {
      const heading = accessHeadingRef.current;
      if (!heading) return;

      if (reducedMotion.matches) {
        accessQuoteWordsRef.current.forEach((word) => {
          word?.style.setProperty("--para-ti-quote-word-progress", "100%");
        });
        return;
      }

      const lines = heading.querySelectorAll(".para-ti-access__quote-line");
      const start = window.innerHeight * 0.9;
      const end = window.innerHeight * 0.1;

      lines.forEach((line, lineIndex) => {
        const rect = line.getBoundingClientRect();
        const lineProgress = clamp((start - rect.top) / (start - end), 0, 1);
        const words = ACCESS_QUOTE_LINES[lineIndex];
        const lineOffset = ACCESS_QUOTE_LINES.slice(0, lineIndex).reduce(
          (total, lineWords) => total + lineWords.length,
          0,
        );

        words.forEach((_, wordIndex) => {
          const word = accessQuoteWordsRef.current[lineOffset + wordIndex];
          const wordProgress = clamp(
            lineProgress * words.length - wordIndex,
            0,
            1,
          );

          word?.style.setProperty(
            "--para-ti-quote-word-progress",
            `${wordProgress >= 0.999 ? 100 : wordProgress * 100}%`,
          );
        });
      });
    }

    function updateMotion() {
      updateHeroImage();
      updateAccessQuote();
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

  function revealAccessCard(index) {
    const anchor = accessCardAnchorsRef.current[index];
    if (!anchor) return;

    const rootStyles = window.getComputedStyle(document.documentElement);
    const topbarHeight =
      Number.parseFloat(
        rootStyles.getPropertyValue("--prometeo-topbar-height"),
      ) || 64;
    const stackTab =
      Number.parseFloat(rootStyles.getPropertyValue("--s64")) || 64;
    const cardOffset = topbarHeight + index * stackTab;
    const target =
      window.scrollY + anchor.getBoundingClientRect().top - cardOffset;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lenis = getLenisInstance();

    if (lenis) {
      lenis.scrollTo(target, {
        duration: reducedMotion ? 0 : 0.9,
        immediate: reducedMotion,
        force: true,
      });
      return;
    }

    window.scrollTo({
      top: target,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

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
            <div className="para-ti-hero__blackout" />
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
                Explicaciones claras, experiencias compartidas y herramientas
                para reconocer qué está pasando, comparar opciones y avanzar
                con criterio.
              </p>
            </GridCell>
          </Grid>
        </section>

        <div className="para-ti-transition">
          <LandingTransitionSection light title="Cómo funciona" column={1} />
        </div>

        <Grid as="section" columns="site" className="para-ti-path">
          <GridCell className="para-ti-path__intro">
            <div className="para-ti-path__intro-inner">
              <h2 className="para-ti-path__heading">Un recorrido posible</h2>
              <p className="para-ti-path__statement">
                No necesitas saber de tecnología. Solo necesitas prestar
                atención.
              </p>
              <p>
                Cada paso parte de algo que ya reconoces. Y termina en algo que
                puedes hacer.
              </p>
            </div>
          </GridCell>

          <GridCell
            span={3}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="para-ti-path__steps-cell"
          >
            <div className="para-ti-path__narrative">
              <p>
                Aceptas cookies sin leer. Das permisos que no entiendes. Usas
                apps que saben más de ti que la mayoría de tu entorno.
              </p>
              <p className="para-ti-path__narrative-accent">
                No porque no te importe&nbsp;— sino porque nadie te mostró que
                había otra forma de hacerlo.
              </p>
              <p className="para-ti-path__narrative-resolve">
                Este recorrido cambia eso.
              </p>
            </div>
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

        <section
          className="para-ti-access"
          aria-labelledby="para-ti-access-heading"
        >
          <div ref={accessHeadingRef} className="para-ti-access__visuals">
            <div className="para-ti-access__visual para-ti-access__visual--first">
              <GridImageReveal
                src={heroImage}
                alt=""
                label=""
                tone="light"
                minHeight="100%"
                revealWidthRatio={1}
                objectPosition="right center"
                className="para-ti-access__visual-reveal"
                style={{
                  height: "100%",
                  "--grid-image-bg": UI.bg,
                  "--grid-image-overlay": "transparent",
                }}
              />
            </div>

            <h2
              id="para-ti-access-heading"
              className="para-ti-access__quote"
              data-scroll-text-reveal="true"
              aria-label={ACCESS_QUOTE_LINES.map((words) =>
                words.join(" "),
              ).join(" ")}
            >
              {ACCESS_QUOTE_LINES.map((words, lineIndex) => {
                const lineOffset = ACCESS_QUOTE_LINES.slice(
                  0,
                  lineIndex,
                ).reduce((total, lineWords) => total + lineWords.length, 0);

                return (
                  <span
                    key={words.join("-")}
                    className={`para-ti-access__quote-line para-ti-access__quote-line--${lineIndex + 1}`}
                    aria-hidden="true"
                  >
                    <span className="para-ti-access__quote-line-copy">
                      {words.map((word, wordIndex) => {
                        const globalIndex = lineOffset + wordIndex;

                        return (
                          <Fragment key={`${word}-${globalIndex}`}>
                            <span
                              ref={(node) => {
                                accessQuoteWordsRef.current[globalIndex] = node;
                              }}
                              className="para-ti-access__quote-word"
                            >
                              {word}
                            </span>
                            {wordIndex < words.length - 1 ? " " : null}
                          </Fragment>
                        );
                      })}
                    </span>
                  </span>
                );
              })}
            </h2>

            <div className="para-ti-access__visual para-ti-access__visual--second">
              <GridImageReveal
                src={heroImage}
                alt=""
                label=""
                tone="light"
                minHeight="100%"
                revealWidthRatio={1}
                objectPosition="left center"
                className="para-ti-access__visual-reveal"
                style={{
                  height: "100%",
                  "--grid-image-bg": UI.bg,
                  "--grid-image-overlay": "transparent",
                }}
              />
            </div>
          </div>

          <div className="para-ti-transition para-ti-access__transition">
            <LandingTransitionSection
              light
              title="Elige tu camino"
              column={3}
            />
          </div>

          <div className="para-ti-access__stack">
            {ACCESS_POINTS.map((item, index) => (
              <Fragment key={item.to}>
                <div
                  ref={(node) => {
                    accessCardAnchorsRef.current[index] = node;
                  }}
                  className="para-ti-access-card__anchor"
                  aria-hidden="true"
                />
                <AccessCard
                  item={item}
                  index={index}
                  onSelect={revealAccessCard}
                />
              </Fragment>
            ))}
          </div>
        </section>
      </div>
    </Page>
  );
}
