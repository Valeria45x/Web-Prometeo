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
    number: "01",
    title: "Artículos",
    eyebrow: "Para entender",
    description:
      "Explicaciones claras sobre lo que pasa cuando navegas, aceptas cookies o usas las apps de siempre.",
    cta: "Leer artículos",
    to: "/articulos",
    imagePosition: "38% center",
  },
  {
    number: "02",
    title: "Comunidad",
    eyebrow: "Para compartir",
    description:
      "Pregunta sin miedo a parecer ignorante. Aquí todos están aprendiendo.",
    cta: "Entrar en la comunidad",
    to: "/comunidad",
    imagePosition: "58% center",
  },
  {
    number: "03",
    title: "Tienda",
    eyebrow: "Para llevarlo contigo",
    description:
      "Objetos que recuerdan, en lo cotidiano, que la privacidad también es una postura.",
    cta: "Explorar la tienda",
    to: "/tienda",
    imagePosition: "76% center",
  },
];

const ACCESS_QUOTE_LINES = [
  "Tu vida digital también te pertenece.",
  "Entenderla es empezar a decidirla.",
].map((line) => line.split(" "));

const ACCESS_QUOTE_WORD_COUNT = ACCESS_QUOTE_LINES.reduce(
  (total, words) => total + words.length,
  0,
);

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

    function updateAccessQuote() {
      const heading = accessHeadingRef.current;
      if (!heading) return;

      if (reducedMotion.matches) {
        accessQuoteWordsRef.current.forEach((word) => {
          word?.style.setProperty("--para-ti-quote-word-progress", "100%");
        });
        return;
      }

      const rect = heading.getBoundingClientRect();
      const start = window.innerHeight * 0.88;
      const end = window.innerHeight * 0.2;
      const progress = clamp((start - rect.top) / (start - end), 0, 1);
      const wordStep = 1 / ACCESS_QUOTE_WORD_COUNT;
      const wordRevealRange = wordStep * 1.35;

      accessQuoteWordsRef.current.forEach((word, index) => {
        const wordProgress = clamp(
          (progress - index * wordStep) / wordRevealRange,
          0,
          1,
        );

        word?.style.setProperty(
          "--para-ti-quote-word-progress",
          `${wordProgress * 100}%`,
        );
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

        <section
          className="para-ti-access"
          aria-labelledby="para-ti-access-heading"
        >
          <div ref={accessHeadingRef} className="para-ti-access__heading">
            <h2
              id="para-ti-access-heading"
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
                );
              })}
            </h2>
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
