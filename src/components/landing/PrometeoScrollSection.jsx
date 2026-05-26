import { useEffect, useRef, useState } from "react";
import { COLORS, FONTS } from "../../design/tokens";
import { useReveal } from "../../hooks/useReveal";
import TextReveal from "../system/TextReveal";
import LandingTransitionSection from "./LandingTransitionSection";
import ScrambleText from "./ScrambleText";
import { DARK_GRID, EASE, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";
import heroPlaceholderVideo from "../../../Video placeholder.mp4";
import "./prometeoScroll.css";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(value) {
  const x = clamp(value, 0, 1);
  return x * x * (3 - 2 * x);
}

function getTopbarHeight() {
  return (
    document.querySelector(".topbar")?.getBoundingClientRect().height || 64
  );
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
const MOVE_SWAP_MS = 680;
const MOVE_ENTER_DELAY_MS = 50;
const MOVE_TRANSITION_MS = 820;

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
  moveTitleColor,
  moveIndexColor,
  mutedColor,
  maskColor,
  bd,
}) {
  return (
    <div className="pmt-move-text" style={{ borderTop: bd }}>
      <div
        className={`pmt-move-content${moveVisible ? " is-visible" : ""}`}
        style={{
          "--pmt-move-transition-ms": `${MOVE_TRANSITION_MS}ms`,
        }}
      >
        <span
          className="pmt-move-index"
          style={{
            color: moveIndexColor,
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
            titleColor={moveTitleColor}
          />
          <p
            className="pmt-move-body"
            style={{ color: mutedColor }}
          >
            {move.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PrometeoScrollSection({ light = false }) {
  const scrollRef = useRef(null);
  const stageRef = useRef(null);
  const explainRef = useRef(null);
  const solutionMetaRef = useRef(null);
  const frameRef = useRef(0);
  const timerRef = useRef(null);
  const enterTimerRef = useRef(null);
  const solutionTimerRef = useRef(null);

  const [state, setState] = useState({
    progress: 0,
    explainProgress: 0,
    stageWidth: 0,
    stageHeight: 0,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [moveVisible, setMoveVisible] = useState(true);
  const [solutionScrambleActive, setSolutionScrambleActive] = useState(false);
  const [headlineRef, headlineStyle] = useReveal(140, false);
  const [methodKickerRef, methodKickerStyle] = useReveal(280, false);

  const bg = light ? PAGE_LIGHT_BG : COLORS.canvasDark;
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? COLORS.textOnLight : COLORS.textOnDark;
  const mutedColor = light ? COLORS.textMutedLight : COLORS.textMutedDark;
  const accentTextColor = light ? COLORS.textOnLight : COLORS.accent;
  const moveIndexColor = COLORS.grayDark;
  const moveTitleColor = COLORS.accent;
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

  useEffect(() => {
    const meta = solutionMetaRef.current;
    if (!meta) return undefined;

    const reset = () => {
      if (solutionTimerRef.current) {
        clearTimeout(solutionTimerRef.current);
        solutionTimerRef.current = null;
      }
      setSolutionScrambleActive(false);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.8) {
          if (solutionTimerRef.current) return;
          setSolutionScrambleActive(false);
          solutionTimerRef.current = setTimeout(() => {
            setSolutionScrambleActive(true);
            solutionTimerRef.current = null;
          }, 360);
        } else if (!entry.isIntersecting) {
          reset();
        }
      },
      { threshold: [0, 0.8, 1] },
    );

    observer.observe(meta);

    return () => {
      observer.disconnect();
      reset();
    };
  }, []);

  const total = PROMETEO_MOVES.length;
  const targetIndex = Math.min(
    Math.floor(state.explainProgress * total),
    total - 1,
  );

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }

    if (targetIndex === activeIndex) {
      setMoveVisible(true);
      return undefined;
    }

    setMoveVisible(false);
    timerRef.current = setTimeout(() => {
      setActiveIndex(targetIndex);
      enterTimerRef.current = setTimeout(() => {
        setMoveVisible(true);
        enterTimerRef.current = null;
      }, MOVE_ENTER_DELAY_MS);
      timerRef.current = null;
    }, MOVE_SWAP_MS);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (enterTimerRef.current) {
        clearTimeout(enterTimerRef.current);
        enterTimerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetIndex]);

  const progress = smoothstep(state.progress);
  const stageWidth = state.stageWidth || 1024;
  const stageHeight = state.stageHeight || 640;
  const metaHeight = 64;
  const mediaHeight = Math.max(0, stageHeight - metaHeight);
  const headlineExitProgress = smoothstep(
    clamp((progress - 0.02) / 0.34, 0, 1),
  );
  const mediaProgress = smoothstep(clamp((progress - 0.36) / 0.64, 0, 1));
  const revealWidth = stageWidth * mediaProgress;
  const revealHeight = mediaHeight * mediaProgress;
  const clipLeft = Math.max(0, (stageWidth - revealWidth) / 2);
  const clipTop = Math.max(0, (mediaHeight - revealHeight) / 2);
  const textOpacity = 1 - headlineExitProgress;
  const rotatedVideoScale = (stageWidth / Math.max(mediaHeight, 1)) * 1.08;
  const mediaLabelOp = clamp((mediaProgress - 0.46) / 0.32, 0, 1);
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
        "--prometeo-scroll-video-rotate-scale": rotatedVideoScale,
        "--prometeo-scroll-media-label": mediaLabelOp,
        "--prometeo-headline-color": headlineColor,
        "--prometeo-scroll-video-bg": COLORS.canvasDark,
        "--prometeo-scroll-video-border": light
          ? COLORS.gridLight
          : COLORS.grid,
        "--pmt-move-image-bg": MOVE_IMAGE_BG,
        background: bg,
        color: titleColor,
      }}
    >
      <div ref={scrollRef} className="prometeo-scroll__sticky-wrap">
        <div ref={stageRef} className="prometeo-scroll__stage">
          <div className="prometeo-scroll__meta">
            <div ref={solutionMetaRef} className="prometeo-scroll__meta-title">
              <ScrambleText
                text="Solución"
                play={solutionScrambleActive}
                idle="scrambled"
                className="prometeo-scroll__meta-copy"
              />
            </div>
          </div>

          <div
            className="prometeo-scroll__media"
            style={{
              "--prometeo-scroll-media-clip": `inset(${clipTop}px ${clipLeft}px ${clipTop}px ${clipLeft}px)`,
            }}
          >
            <div className="prometeo-scroll__media-fill">
              <div className="prometeo-scroll__media-video-shell">
                <video
                  className="prometeo-scroll__media-video prometeo-scroll__media-video--turn-landscape"
                  src={heroPlaceholderVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div className="prometeo-scroll__headline" aria-hidden="true">
            <div
              ref={headlineRef}
              className="prometeo-scroll__headline-entry"
              style={headlineStyle}
            >
              <h2>Conoce a</h2>
              <h2
                style={{
                  fontFamily: FONTS.display,
                  color: COLORS.accent,
                }}
              >
                Prometeo
              </h2>
            </div>
          </div>
        </div>
      </div>

      <LandingTransitionSection light={light} title="Método" column={3} />

      <div
        ref={explainRef}
        className="prometeo-scroll__explain-wrap"
        style={{ "--pmt-explain-steps": total }}
      >
        <div className="prometeo-scroll__explain-sticky">
          <div className="prometeo-scroll__explain-copy">
            <div className="prometeo-scroll__explain-heading">
              <div
                ref={methodKickerRef}
                className="pmt-method-kicker-wrap"
                style={methodKickerStyle}
              >
                <span
                  className="pmt-method-kicker"
                  style={{
                    fontFamily: FONTS.sans,
                    color: accentTextColor,
                  }}
                >
                  Mediante 4 pilares
                </span>
              </div>
              <TextReveal
                as="h2"
                once={false}
                lines={[
                  "Transformamos la privacidad digital en",
                  <span
                    style={{ color: COLORS.accent, fontFamily: FONTS.display }}
                  >
                    claridad accionable.
                  </span>,
                ]}
                maskColor={maskColor}
                delayStep={140}
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 48,
                  fontWeight: 900,
                  lineHeight: "56px",
                  color: titleColor,
                  margin: 0,
                  textAlign: "left",
                  textWrap: "balance",
                  "--text-reveal-block": COLORS.accent,
                }}
              />
            </div>
          </div>

          <div className="prometeo-scroll__moves-stage">
            <MovePlaceholder move={move} />
            <MoveText
              move={move}
              activeIndex={activeIndex}
              moveVisible={moveVisible}
              moveTitleColor={moveTitleColor}
              moveIndexColor={moveIndexColor}
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
