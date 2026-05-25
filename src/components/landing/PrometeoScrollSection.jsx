import { useEffect, useRef, useState } from "react";
import { COLORS, FONTS } from "../../design/tokens";
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

function getTopbarHeight() {
  return document.querySelector(".topbar")?.getBoundingClientRect().height || 64;
}

const PROMETEO_MOVES = [
  {
    index: "01",
    title: "Educación",
    visual: "articles",
    body: "Creamos una conversación común, cercana y útil en torno a la privacidad.",
  },
  {
    index: "02",
    title: "Comunidad",
    visual: "community",
    body: "Creamos un espacio para preguntar, contrastar y entender la privacidad desde experiencias reales.",
  },
  {
    index: "03",
    title: "Práctica",
    visual: "shop",
    body: "Llevamos la privacidad al gesto cotidiano con recursos que ayudan a actuar con más intención en lo digital.",
  },
  {
    index: "04",
    title: "Confianza",
    visual: "certification",
    body: "Damos forma visible al compromiso con la privacidad mediante señales claras y verificables.",
  },
];

const MOVE_IMAGE_BG = COLORS.canvasDark;
const MOVE_SWAP_MS = 140;
const MOVE_WORD_STEP_MS = 24;

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

function MoveTitleReveal({ activeIndex, maskColor, title, titleColor }) {
  return (
    <h3
      key={`title-${activeIndex}`}
      className="text-reveal is-visible pmt-move-title"
      style={{
        "--text-reveal-delay": "0ms",
        "--text-reveal-duration": "0.82s",
        "--text-reveal-mask": maskColor,
        color: titleColor,
        fontFamily: FONTS.display,
        margin: 0,
      }}
    >
      <span className="text-reveal__line">
        <span className="text-reveal__content">{title}</span>
      </span>
    </h3>
  );
}

function MoveText({
  move,
  activeIndex,
  moveVisible,
  titleColor,
  mutedColor,
  accentTextColor,
  maskColor,
  bd,
}) {
  return (
    <div className="pmt-move-text" style={{ borderTop: bd }}>
      <div
        className="pmt-move-content"
        style={{
          opacity: moveVisible ? 1 : 0,
          transition: "opacity 0.14s ease",
        }}
      >
        <span
          className="pmt-move-index"
          style={{
            color: COLORS.accent,
            fontFamily: FONTS.sans,
          }}
        >
          Pilar {move.index}
        </span>
        <div className="pmt-move-copy">
          <MoveTitleReveal
            activeIndex={activeIndex}
            maskColor={maskColor}
            title={move.title}
            titleColor={titleColor}
          />
          <AnimatedRotateText
            as="p"
            key={`body-${activeIndex}`}
            text={move.body}
            className="pmt-move-body"
            mode="words"
            step={MOVE_WORD_STEP_MS}
            style={{ color: mutedColor, "--pmt-rotate-duration": "0.46s" }}
          />
        </div>
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
  const accentTextColor = light ? COLORS.textOnLight : COLORS.accent;
  const maskColor = light ? PAGE_LIGHT_BG : COLORS.canvasDark;

  useEffect(() => {
    const section = scrollRef.current;
    const stage = stageRef.current;
    const explain = explainRef.current;
    if (!section || !stage) return undefined;

    let requestUpdate = () => {};

    const update = () => {
      frameRef.current = 0;

      const sectionRect = section.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const scrollRange = Math.max(1, sectionRect.height - window.innerHeight);
      const rawProgress = clamp(-sectionRect.top / scrollRange, 0, 1);

      let explainProgress = 0;
      if (explain) {
        const er = explain.getBoundingClientRect();
        const range = Math.max(1, er.height - window.innerHeight);
        explainProgress = clamp(-er.top / range, 0, 1);
      }

      setState({
        progress: rawProgress,
        explainProgress,
        stageWidth: stageRect.width,
        stageHeight: stageRect.height,
      });
    };

    requestUpdate = () => {
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
    }, MOVE_SWAP_MS);

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
  const headlineColorT = smoothstep(clamp((progress - 0.15) / 0.25, 0, 1));
  const headlineChannel = Math.round(26 + (252 - 26) * headlineColorT);
  const headlineColor = `rgb(${headlineChannel}, ${headlineChannel}, ${headlineChannel})`;

  const move = PROMETEO_MOVES[activeIndex];

  return (
    <section
      className="prometeo-scroll"
      style={{
        "--prometeo-scroll-bg": bg,
        "--prometeo-scroll-border": bd,
        "--prometeo-scroll-title": titleColor,
        "--prometeo-scroll-muted": mutedColor,
        "--prometeo-scroll-accent-text": accentTextColor,
        "--prometeo-structure": light ? COLORS.gridLight : COLORS.grid,
        "--prometeo-scroll-line": light ? COLORS.gridLight : COLORS.grid,
        "--prometeo-scroll-progress": progress,
        "--prometeo-scroll-text-opacity": textOpacity,
        "--prometeo-scroll-text-shift": `${textShift}vw`,
        "--prometeo-scroll-media-label": mediaLabelOp,
        "--prometeo-headline-color": headlineColor,
        "--prometeo-scroll-video-bg": COLORS.canvasDark,
        "--prometeo-scroll-video-border": light ? COLORS.gridLight : COLORS.grid,
        "--pmt-move-image-bg": MOVE_IMAGE_BG,
        background: bg,
        color: titleColor,
      }}
    >
      <div ref={scrollRef} className="prometeo-scroll__sticky-wrap">
        <div ref={stageRef} className="prometeo-scroll__stage">
          <div className="prometeo-scroll__meta">
            <div className="prometeo-scroll__meta-title">
              <span className="prometeo-scroll__meta-copy">Solución</span>
            </div>
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
            <h2 style={{ transform: `translateX(calc(var(--prometeo-scroll-text-shift) * -1))` }}>
              Conoce
            </h2>
            <h2 style={{ transform: "translateX(var(--prometeo-scroll-text-shift))" }}>
              Prometeo.
            </h2>
          </div>
        </div>
      </div>

      <LandingTransitionSection
        light={light}
        title="Método"
        column={3}
      />

      <div
        ref={explainRef}
        className="prometeo-scroll__explain-wrap"
        style={{ "--pmt-explain-steps": total }}
      >
        <div className="prometeo-scroll__explain-sticky">
          <div className="prometeo-scroll__explain-copy">
            <div className="prometeo-scroll__explain-heading">
              <span
                style={{
                  display: "block",
                  fontFamily: FONTS.sans,
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: 0,
                  color: accentTextColor,
                  marginBottom: 16,
                }}
              >
                Mediante 4 pilares
              </span>
              <h2
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 48,
                  fontWeight: 900,
                  lineHeight: "56px",
                  color: titleColor,
                  margin: 0,
                  textAlign: "left",
                  textWrap: "balance",
                }}
              >
                Transformamos la privacidad digital en{" "}
                <span style={{ color: COLORS.accent, fontFamily: FONTS.display }}>claridad accionable.</span>
              </h2>
            </div>
          </div>

          <div className="prometeo-scroll__moves-stage">
            <MovePlaceholder move={move} />
            <MoveText
              move={move}
              activeIndex={activeIndex}
              moveVisible={moveVisible}
              titleColor={titleColor}
              mutedColor={mutedColor}
              accentTextColor={accentTextColor}
              maskColor={maskColor}
              bd={bd}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
