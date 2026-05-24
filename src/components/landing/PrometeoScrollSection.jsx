import { useEffect, useRef, useState } from "react";
import { COLORS, FONTS } from "../../design/tokens";
import TextReveal from "../system/TextReveal";
import LandingTransitionSection from "./LandingTransitionSection";
import { DARK_GRID, EASE, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";
import "./prometeoScroll.css";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(value) {
  const x = clamp(value, 0, 1);
  return x * x * (3 - 2 * x);
}

const PROMETEO_MOVES = [
  {
    index: "01",
    title: "Artículos",
    visual: "articles",
    body: "Lecturas claras para entender cookies, permisos, datos y plataformas sin convertirlo en una clase técnica.",
  },
  {
    index: "02",
    title: "Comunidad",
    visual: "community",
    body: "Un espacio para preguntar, compartir casos reales y hablar de privacidad con normalidad.",
  },
  {
    index: "03",
    title: "Tienda",
    visual: "shop",
    body: "Objetos y materiales que sacan la privacidad del aviso legal y la vuelven visible en la vida diaria.",
  },
  {
    index: "04",
    title: "Certificación",
    visual: "certification",
    body: "Una señal verificable para empresas que quieren demostrar compromiso y generar confianza reconocible.",
  },
];

const MOVE_IMAGE_BG = COLORS.canvasDark;

function splitIntoCharacters(text) {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("es", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }

  return Array.from(text);
}

function AnimatedRotateText({
  as: Component = "span",
  text,
  className,
  mode = "characters",
  step = 28,
  style,
}) {
  const words = text.split(" ");

  return (
    <Component
      className={`pmt-rotate-text${className ? ` ${className}` : ""}`}
      aria-label={text}
      style={style}
    >
      <span className="pmt-rotate-text__visual" aria-hidden="true">
        {words.map((word, wordIndex) => {
          const previousCount = words
            .slice(0, wordIndex)
            .reduce((sum, item) => sum + item.length, 0);
          const units =
            mode === "words" ? [word] : splitIntoCharacters(word);

          return (
            <span key={`${word}-${wordIndex}`} className="pmt-rotate-word">
              {units.map((unit, unitIndex) => (
                <span
                  key={`${unit}-${unitIndex}`}
                  className="pmt-rotate-unit"
                  style={{
                    animationDelay: `${
                      (mode === "words" ? wordIndex : previousCount + unitIndex) *
                      step
                    }ms`,
                  }}
                >
                  {unit}
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </Component>
  );
}

function MovePlaceholder({ move }) {
  return (
    <div
      className={`pmt-move-image-field pmt-move-image-field--${move.visual}`}
      aria-hidden="true"
    >
      <div className="pmt-move-image" />
    </div>
  );
}

function StepDots({ activeIndex, bd, total }) {
  return (
    <div className="pmt-step-dots">
      {PROMETEO_MOVES.map((_, i) => (
        <span
          key={i}
          className={`pmt-step-dot${i === activeIndex ? " active" : ""}`}
          style={{
            background: i === activeIndex ? COLORS.accent : "transparent",
            borderColor:
              i === activeIndex ? COLORS.accent : bd.replace("1px solid ", ""),
          }}
          aria-hidden="true"
        />
      ))}
      <span
        className="pmt-step-total"
        style={{
          color: "var(--prometeo-scroll-muted)",
          fontFamily: FONTS.mono,
        }}
      >
        / 0{total}
      </span>
    </div>
  );
}

function MoveText({
  move,
  activeIndex,
  moveVisible,
  titleColor,
  mutedColor,
  maskColor,
  bd,
}) {
  return (
    <div className="pmt-move-text" style={{ borderTop: bd }}>
      <span
        className="pmt-move-index"
        style={{ color: COLORS.accent, fontFamily: FONTS.mono }}
      >
        {move.index}
      </span>
      <div
        className="pmt-move-content"
        style={{
          opacity: moveVisible ? 1 : 0,
          transform: moveVisible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
        }}
      >
        <TextReveal
          key={`title-${activeIndex}`}
          as="h3"
          lines={[move.title]}
          className="pmt-move-title"
          maskColor={maskColor}
          delayStep={0}
          style={{
            fontFamily: FONTS.display,
            color: titleColor,
            margin: 0,
          }}
        />
        <AnimatedRotateText
          as="p"
          key={`body-${activeIndex}`}
          text={move.body}
          className="pmt-move-body"
          mode="words"
          step={42}
          style={{ color: mutedColor }}
        />
      </div>
    </div>
  );
}

export default function PrometeoScrollSection({ light = false }) {
  const scrollRef = useRef(null);
  const stageRef = useRef(null);
  const explainRef = useRef(null);
  const frameRef = useRef(0);
  const timerRef = useRef(null);

  const [state, setState] = useState({
    progress: 0,
    explainProgress: 0,
    stageWidth: 0,
    stageHeight: 0,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [moveVisible, setMoveVisible] = useState(true);

  const bg = light ? PAGE_LIGHT_BG : COLORS.canvasDark;
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? COLORS.textOnLight : COLORS.textOnDark;
  const mutedColor = light ? COLORS.textMutedLight : COLORS.textMutedDark;
  const maskColor = light ? PAGE_LIGHT_BG : COLORS.canvasDark;

  useEffect(() => {
    const section = scrollRef.current;
    const stage = stageRef.current;
    const explain = explainRef.current;
    if (!section || !stage) return undefined;

    const update = () => {
      frameRef.current = 0;

      const sectionRect = section.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const scrollRange = Math.max(1, sectionRect.height - window.innerHeight);
      const progress = clamp(-sectionRect.top / scrollRange, 0, 1);

      let explainProgress = 0;
      if (explain) {
        const er = explain.getBoundingClientRect();
        const range = Math.max(1, er.height - window.innerHeight);
        explainProgress = clamp(-er.top / range, 0, 1);
      }

      setState({
        progress,
        explainProgress,
        stageWidth: stageRect.width,
        stageHeight: stageRect.height,
      });
    };

    const requestUpdate = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const total = PROMETEO_MOVES.length;
  const targetIndex = Math.min(
    Math.floor(state.explainProgress * total),
    total - 1,
  );

  useEffect(() => {
    if (targetIndex === activeIndex) return undefined;

    if (timerRef.current) clearTimeout(timerRef.current);

    setMoveVisible(false);
    timerRef.current = setTimeout(() => {
      setActiveIndex(targetIndex);
      setMoveVisible(true);
    }, 220);

    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetIndex]);

  const progress = smoothstep(state.progress);
  const stageWidth = state.stageWidth || 1024;
  const stageHeight = state.stageHeight || 640;
  const metaHeight = 64;
  const mediaHeight = Math.max(0, stageHeight - metaHeight);
  const revealWidth = stageWidth * progress;
  const revealHeight = mediaHeight * progress;
  const clipLeft = Math.max(0, (stageWidth - revealWidth) / 2);
  const clipTop = Math.max(0, (mediaHeight - revealHeight) / 2);
  const textShift = progress * (stageWidth < 768 ? 18 : 24);
  const textOpacity = 1 - clamp((progress - 0.62) / 0.28, 0, 1);
  const mediaLabelOp = clamp((progress - 0.46) / 0.32, 0, 1);

  const move = PROMETEO_MOVES[activeIndex];

  return (
    <section
      className="prometeo-scroll"
      style={{
        "--prometeo-scroll-bg": bg,
        "--prometeo-scroll-border": bd,
        "--prometeo-scroll-title": titleColor,
        "--prometeo-scroll-muted": mutedColor,
        "--prometeo-scroll-line": COLORS.grid,
        "--prometeo-scroll-progress": progress,
        "--prometeo-scroll-text-opacity": textOpacity,
        "--prometeo-scroll-text-shift": `${textShift}vw`,
        "--prometeo-scroll-media-label": mediaLabelOp,
        "--pmt-move-image-bg": MOVE_IMAGE_BG,
        background: bg,
        color: titleColor,
      }}
    >
      <div ref={scrollRef} className="prometeo-scroll__sticky-wrap">
        <div ref={stageRef} className="prometeo-scroll__stage">
          <div className="prometeo-scroll__meta">
            {["Solución", "", "", ""].map((item, index) => (
              <span key={index} aria-hidden={item ? undefined : "true"}>
                {item}
              </span>
            ))}
          </div>

          <div
            className="prometeo-scroll__media"
            style={{
              "--prometeo-scroll-media-clip": `inset(${clipTop}px ${clipLeft}px ${clipTop}px ${clipLeft}px)`,
            }}
          >
            <div className="prometeo-scroll__media-fill" />
          </div>

          <div className="prometeo-scroll__headline" aria-hidden="true">
            <h2
              style={{
                transform: `translateX(calc(var(--prometeo-scroll-text-shift) * -1))`,
              }}
            >
              Esto es
            </h2>
            <h2
              style={{
                transform: "translateX(var(--prometeo-scroll-text-shift))",
              }}
            >
              Prometeo.
            </h2>
          </div>
        </div>
      </div>

      <LandingTransitionSection
        light={light}
        title="Método"
        position="right"
      />

      <div
        ref={explainRef}
        className="prometeo-scroll__explain-wrap"
        style={{ "--pmt-explain-steps": total }}
      >
        <div className="prometeo-scroll__explain-sticky">
          <div className="prometeo-scroll__explain-copy">
            <div className="prometeo-scroll__explain-heading">
              <TextReveal
                as="h2"
                className="prometeo-scroll__promise"
                lines={[
                  "Prometeo convierte",
                  "privacidad digital",
                  "en claridad accionable",
                ]}
                maskColor={maskColor}
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 64,
                  fontWeight: 900,
                  lineHeight: "64px",
                  color: titleColor,
                  margin: 0,
                  textTransform: "uppercase",
                }}
              />
              <TextReveal
                as="p"
                className="prometeo-scroll__method"
                lines={["mediante cuatro pilares."]}
                maskColor={maskColor}
                delayStep={0}
                style={{
                  fontFamily: FONTS.sans,
                  color: COLORS.accent,
                  margin: 0,
                }}
              />
            </div>
          </div>

          <div className="prometeo-scroll__moves-stage">
            <div className="pmt-step-indicator" style={{ borderBottom: bd }}>
              <span
                className="pmt-step-counter"
                style={{ color: COLORS.accent, fontFamily: FONTS.mono }}
              >
                {move.index}
              </span>
              <StepDots activeIndex={activeIndex} bd={bd} total={total} />
            </div>

            <MovePlaceholder move={move} />
            <MoveText
              move={move}
              activeIndex={activeIndex}
              moveVisible={moveVisible}
              titleColor={titleColor}
              mutedColor={mutedColor}
              maskColor={maskColor}
              bd={bd}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
