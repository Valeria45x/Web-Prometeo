import { useEffect, useRef, useState } from "react";
import { COLORS, FONTS } from "../../design/tokens";
import TextReveal from "../system/TextReveal";
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
    title: "Entender",
    body: "Traducir permisos, cookies y políticas a un lenguaje que permita decidir.",
  },
  {
    index: "02",
    title: "Conversar",
    body: "Abrir una conversación colectiva sobre algo que casi siempre se vive en silencio.",
  },
  {
    index: "03",
    title: "Hacer visible",
    body: "Convertir la privacidad en señales, objetos y experiencias reconocibles.",
  },
  {
    index: "04",
    title: "Demostrar",
    body: "Ayudar a empresas a sostener la confianza con evidencias verificables.",
  },
];

/* ── Animated words — TextRotate style, no Framer Motion ─────────────── */
function AnimatedWords({ text, className, style }) {
  const words = text.split(" ");
  return (
    <span
      className={`pmt-anim-words${className ? ` ${className}` : ""}`}
      aria-label={text}
      style={style}
    >
      {words.map((word, i) => (
        <span key={i} className="pmt-anim-word-wrap">
          <span
            className="pmt-anim-word"
            style={{ animationDelay: `${i * 55}ms` }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
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

  /* ── Active step state ── */
  const [activeIndex, setActiveIndex] = useState(0);
  const [moveVisible, setMoveVisible] = useState(true);

  const bg = light ? PAGE_LIGHT_BG : COLORS.canvasDark;
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? COLORS.textOnLight : COLORS.textOnDark;
  const mutedColor = light ? COLORS.textMutedLight : COLORS.textMutedDark;
  const maskColor = light ? PAGE_LIGHT_BG : COLORS.canvasDark;

  /* ── Scroll listener: sticky-wrap + explain section ── */
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

  /* ── Derive target step from explain progress ── */
  const total = PROMETEO_MOVES.length;
  const targetIndex = Math.min(
    Math.floor(state.explainProgress * total),
    total - 1,
  );

  /* ── Transition: fade out → swap content → fade in ── */
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

  /* ── Sticky-wrap animation values (unchanged) ── */
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
        "--prometeo-scroll-progress": progress,
        "--prometeo-scroll-text-opacity": textOpacity,
        "--prometeo-scroll-text-shift": `${textShift}vw`,
        "--prometeo-scroll-media-label": mediaLabelOp,
        background: bg,
        color: titleColor,
      }}
    >
      {/* ── Sticky reveal section (unchanged) ── */}
      <div ref={scrollRef} className="prometeo-scroll__sticky-wrap">
        <div ref={stageRef} className="prometeo-scroll__stage">
          <div className="prometeo-scroll__meta">
            <span>Sobre Prometeo</span>
            <span>Scroll para entrar</span>
          </div>

          <div
            className="prometeo-scroll__media"
            style={{
              "--prometeo-scroll-media-clip": `inset(${clipTop}px ${clipLeft}px ${clipTop}px ${clipLeft}px)`,
            }}
          >
            <div className="prometeo-scroll__media-fill">
              <span>Prometeo</span>
            </div>
          </div>

          <div className="prometeo-scroll__headline" aria-hidden="true">
            <h2
              style={{
                transform: `translateX(calc(var(--prometeo-scroll-text-shift) * -1))`,
              }}
            >
              Prometeo no es solo
            </h2>
            <h2
              style={{
                transform: "translateX(var(--prometeo-scroll-text-shift))",
              }}
            >
              información.
            </h2>
          </div>
        </div>
      </div>

      {/* ── Scroll-driven moves section ── */}
      {/* Height = (N+1) × 100svh → 1 full viewport scroll per step */}
      <div
        ref={explainRef}
        className="prometeo-scroll__explain-wrap"
        style={{ "--pmt-explain-steps": total }}
      >
        <div className="prometeo-scroll__explain-sticky">
          {/* Left: static copy */}
          <div className="prometeo-scroll__explain-copy">
            <span className="meta-label" style={{ color: mutedColor }}>
              Qué hace
            </span>
            <TextReveal
              as="h2"
              lines={[
                "Convierte la privacidad digital",
                "en claridad accionable.",
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
          </div>

          {/* Right: animated step */}
          <div className="prometeo-scroll__moves-stage">
            {/* Step indicator */}
            <div className="pmt-step-indicator" style={{ borderBottom: bd }}>
              <span
                className="pmt-step-counter"
                style={{ color: COLORS.accent, fontFamily: FONTS.mono }}
              >
                {move.index}
              </span>
              <div className="pmt-step-dots">
                {PROMETEO_MOVES.map((_, i) => (
                  <span
                    key={i}
                    className={`pmt-step-dot${i === activeIndex ? " active" : ""}`}
                    style={{
                      background:
                        i === activeIndex ? COLORS.accent : "transparent",
                      borderColor:
                        i === activeIndex
                          ? COLORS.accent
                          : bd.replace("1px solid ", ""),
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  color: mutedColor,
                  fontFamily: FONTS.mono,
                  fontSize: 8,
                  letterSpacing: "0.1em",
                }}
              >
                / 0{total}
              </span>
            </div>

            {/* Image placeholder — light Prometeo red */}
            <div className="pmt-move-image">
              {/* AES grid overlay */}
              <svg
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <defs>
                  <pattern
                    id="pmt-move-grid"
                    width="32"
                    height="32"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 32 0 L 0 0 0 32"
                      fill="none"
                      stroke="#0a0a0a"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill="url(#pmt-move-grid)"
                  opacity="0.12"
                />
              </svg>
              {/* Label that fades with the move */}
              <span
                className="pmt-move-image-label"
                style={{
                  opacity: moveVisible ? 1 : 0,
                  transition: `opacity 0.22s ease`,
                  fontFamily: FONTS.display,
                  color: COLORS.footerText,
                }}
              >
                {move.title.toUpperCase()}
              </span>
            </div>

            {/* Animated text */}
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
                {/* Title with word-by-word animation — key forces remount on step change */}
                <AnimatedWords
                  key={`title-${activeIndex}`}
                  text={move.title}
                  className="pmt-move-title"
                  style={{ color: titleColor }}
                />
                <p
                  key={`body-${activeIndex}`}
                  className="pmt-move-body"
                  style={{ color: mutedColor }}
                >
                  {move.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
