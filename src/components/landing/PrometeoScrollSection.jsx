import { useEffect, useId, useRef, useState } from "react";
import { COLORS, FONTS } from "../../design/tokens";
import { typeStyle } from "../../design/typography";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReveal } from "../../hooks/useReveal";
import TextReveal from "../system/TextReveal";
import LandingTransitionSection from "./LandingTransitionSection";
import ScrambleText from "./ScrambleText";
import { DARK_GRID, EASE, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";
import heroPlaceholderVideo from "../../../Video placeholder.mp4";
import pilarEducationImage from "../../../Instagram Feed USB v1.png";
import pilarCommunityImage from "../../../Instagram Story USB v1.png";
import pilarPracticeImage from "../../../d22303b9558d59ad08ecfa1972735492.webp";
import pilarTrustImage from "../../../dcf942b6cdba6f478eb1ab557e41dbda.webp";
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
    image: pilarEducationImage,
    body: "Creamos una conversación común, cercana y útil en torno a la privacidad.",
  },
  {
    index: "02",
    title: "Comunidad",
    visual: "community",
    image: pilarCommunityImage,
    body: "Creamos un espacio para preguntar, contrastar y entender la privacidad desde experiencias reales.",
  },
  {
    index: "03",
    title: "Práctica",
    visual: "shop",
    image: pilarPracticeImage,
    body: "Llevamos la privacidad al gesto cotidiano con recursos que ayudan a actuar con más intención en lo digital.",
  },
  {
    index: "04",
    title: "Confianza",
    visual: "certification",
    image: pilarTrustImage,
    body: "Damos forma visible al compromiso con la privacidad mediante señales claras y verificables.",
  },
];

const MOVE_IMAGE_BG = COLORS.canvasDark;
const MOVE_SWAP_MS = 680;
const MOVE_ENTER_DELAY_MS = 50;
const MOVE_TRANSITION_MS = 820;
const MOVE_TITLE_DELAY_MS = 180;
const MOVE_BODY_DELAY_MS = 980;
const MOVE_IMAGE_BLEND_MS = 860;
const MOVE_CENTER_LINE_NUDGE = 0;
const STAGE_DIVIDER_NUDGE = 1;
const MOVE_GRID_LINES = [25, 50, 75];
const MOVE_IMAGE_RECTS = {
  articles: { left: 0, top: 0, width: 50, height: 50 },
  community: { left: 0, top: 25, width: 75, height: 50 },
  shop: { left: 25, top: 25, width: 50, height: 50 },
  certification: { left: 50, top: 25, width: 50, height: 75 },
};

function getNavbarDividerX(containerLeft) {
  const empresasButton = Array.from(
    document.querySelectorAll(".topbar__nav-item"),
  ).find((element) => element.textContent?.includes("Para empresas"));

  if (empresasButton) {
    return (
      empresasButton.getBoundingClientRect().right -
      containerLeft -
      1 +
      MOVE_CENTER_LINE_NUDGE
    );
  }

  const profileCell = document.querySelector(".topbar__profile-cell");

  if (profileCell) {
    return (
      profileCell.getBoundingClientRect().left -
      containerLeft -
      1 +
      MOVE_CENTER_LINE_NUDGE
    );
  }

  return null;
}

function getSnappedGridLines(size, middleOverride = null) {
  const lines = MOVE_GRID_LINES.map((line) => Math.round((size * line) / 100));

  if (typeof middleOverride === "number") {
    lines[1] = middleOverride;
  }

  return lines;
}

function getAxisEdge(percent, size, snappedLines) {
  if (percent === 0) return 0;
  if (percent === 25) return snappedLines[0];
  if (percent === 50) return snappedLines[1];
  if (percent === 75) return snappedLines[2];
  if (percent === 100) return size;

  return Math.round((size * percent) / 100);
}

function getMoveImageLayout(
  visual,
  fieldWidth,
  fieldHeight,
  isMobileLayout,
  centerLineX,
) {
  if (!fieldWidth || !fieldHeight) return null;

  if (isMobileLayout) {
    const inset = 16;
    return {
      left: inset,
      top: inset,
      right: Math.max(inset, fieldWidth - inset),
      bottom: Math.max(inset, fieldHeight - inset),
    };
  }

  const rect = MOVE_IMAGE_RECTS[visual] ?? MOVE_IMAGE_RECTS.articles;
  const xLines = getSnappedGridLines(fieldWidth, centerLineX);
  const yLines = getSnappedGridLines(fieldHeight);
  const rightPercent = rect.left + rect.width;
  const bottomPercent = rect.top + rect.height;

  return {
    left: getAxisEdge(rect.left, fieldWidth, xLines),
    top: getAxisEdge(rect.top, fieldHeight, yLines),
    right: getAxisEdge(rightPercent, fieldWidth, xLines),
    bottom: getAxisEdge(bottomPercent, fieldHeight, yLines),
  };
}

function addMoveSegment(segments, seen, segment) {
  const key = [
    segment.orientation,
    segment.coord,
    segment.start,
    segment.end,
  ].join(":");

  if (seen.has(key) || segment.end <= segment.start) return;

  seen.add(key);
  segments.push({ key, ...segment });
}

function getMoveContourSegments(
  fieldWidth,
  fieldHeight,
  imageLayout,
  centerLineX,
) {
  if (!imageLayout) return [];

  const xLines = getSnappedGridLines(fieldWidth, centerLineX);
  const yLines = getSnappedGridLines(fieldHeight);
  const { left, top, right, bottom } = imageLayout;
  const seen = new Set();
  const segments = [];

  if (top !== 0 && !yLines.includes(top)) {
    addMoveSegment(segments, seen, {
      orientation: "horizontal",
      coord: top,
      start: left,
      end: right,
    });
  }

  if (right !== fieldWidth && !xLines.includes(right)) {
    addMoveSegment(segments, seen, {
      orientation: "vertical",
      coord: right,
      start: top,
      end: bottom,
    });
  }

  if (bottom !== fieldHeight && !yLines.includes(bottom)) {
    addMoveSegment(segments, seen, {
      orientation: "horizontal",
      coord: bottom,
      start: left,
      end: right,
    });
  }

  if (left !== 0 && !xLines.includes(left)) {
    addMoveSegment(segments, seen, {
      orientation: "vertical",
      coord: left,
      start: top,
      end: bottom,
    });
  }

  return segments;
}

function getMoveInteriorMask(imageLayout) {
  if (!imageLayout) return null;

  const width = Math.max(0, imageLayout.right - imageLayout.left - 1);
  const height = Math.max(0, imageLayout.bottom - imageLayout.top - 1);

  if (!width || !height) return null;

  return {
    x: imageLayout.left + 1,
    y: imageLayout.top + 1,
    width,
    height,
  };
}

function MoveGridOverlay({
  centerLineX,
  fieldHeight,
  fieldWidth,
  imageLayout,
}) {
  if (!fieldWidth || !fieldHeight || !imageLayout) return null;

  const maskId = useId().replace(/:/g, "");
  const xLines = getSnappedGridLines(fieldWidth, centerLineX);
  const yLines = getSnappedGridLines(fieldHeight);
  const contourSegments = getMoveContourSegments(
    fieldWidth,
    fieldHeight,
    imageLayout,
    centerLineX,
  );
  const maskRect = getMoveInteriorMask(imageLayout);

  return (
    <svg
      className="pmt-move-grid-overlay"
      viewBox={`0 0 ${fieldWidth} ${fieldHeight}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <mask id={maskId}>
          <rect width={fieldWidth} height={fieldHeight} fill="white" />
          {maskRect ? (
            <rect
              x={maskRect.x}
              y={maskRect.y}
              width={maskRect.width}
              height={maskRect.height}
              fill="black"
            />
          ) : null}
        </mask>
      </defs>

      {xLines.map((x) => (
        <rect
          key={`grid-v-${x}`}
          className="pmt-move-grid-segment"
          x={x}
          y={0}
          width={1}
          height={fieldHeight}
          mask={`url(#${maskId})`}
        />
      ))}

      {yLines.map((y) => (
        <rect
          key={`grid-h-${y}`}
          className="pmt-move-grid-segment"
          x={0}
          y={y}
          width={fieldWidth}
          height={1}
          mask={`url(#${maskId})`}
        />
      ))}

      {contourSegments.map((segment) => {
        const isVertical = segment.orientation === "vertical";

        return (
          <rect
            key={segment.key}
            className="pmt-move-grid-segment"
            x={isVertical ? segment.coord : segment.start}
            y={isVertical ? segment.start : segment.coord}
            width={isVertical ? 1 : segment.end - segment.start}
            height={isVertical ? segment.end - segment.start : 1}
          />
        );
      })}
    </svg>
  );
}

function MovePlaceholder({ move, onDividerChange }) {
  const currentImageRef = useRef(move.image);
  const fieldRef = useRef(null);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const [fieldSize, setFieldSize] = useState({
    width: 0,
    height: 0,
    centerLineX: null,
  });
  const [imageLayer, setImageLayer] = useState(() => ({
    current: move.image,
    previous: null,
    blending: false,
  }));

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return undefined;

    const updateFieldSize = (width, height, centerLineX) => {
      setFieldSize((current) => {
        if (current.width === width && current.height === height)
          if (current.centerLineX === centerLineX) return current;

        return { width, height, centerLineX };
      });
    };

    const readFieldSize = () => {
      const rect = field.getBoundingClientRect();
      const nextCenterLineX = !isMobileLayout
        ? getNavbarDividerX(rect.left)
        : null;

      updateFieldSize(
        Math.round(rect.width),
        Math.round(rect.height),
        nextCenterLineX,
      );
    };

    readFieldSize();

    window.addEventListener("resize", readFieldSize);

    if (typeof ResizeObserver !== "function") {
      return () => window.removeEventListener("resize", readFieldSize);
    }

    const observer = new ResizeObserver(() => {
      readFieldSize();
    });

    observer.observe(field);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", readFieldSize);
    };
  }, [isMobileLayout]);

  const imageLayout = getMoveImageLayout(
    move.visual,
    fieldSize.width,
    fieldSize.height,
    isMobileLayout,
    fieldSize.centerLineX,
  );

  useEffect(() => {
    if (!onDividerChange) return undefined;

    if (isMobileLayout || fieldSize.centerLineX == null) {
      onDividerChange(null);
      return undefined;
    }

    const field = fieldRef.current;
    const sticky = field?.closest(".prometeo-scroll__explain-sticky");
    if (!field || !sticky) return undefined;

    const fieldRect = field.getBoundingClientRect();
    const stickyRect = sticky.getBoundingClientRect();
    onDividerChange(fieldRect.left - stickyRect.left + fieldSize.centerLineX);

    return undefined;
  }, [fieldSize.centerLineX, isMobileLayout, onDividerChange]);

  useEffect(() => {
    if (currentImageRef.current === move.image) return undefined;

    const previous = currentImageRef.current;
    currentImageRef.current = move.image;
    setImageLayer({
      current: move.image,
      previous,
      blending: true,
    });

    const timer = window.setTimeout(() => {
      setImageLayer({
        current: currentImageRef.current,
        previous: null,
        blending: false,
      });
    }, MOVE_IMAGE_BLEND_MS);

    return () => window.clearTimeout(timer);
  }, [move.image]);

  return (
    <div
      ref={fieldRef}
      className={`pmt-move-image-field pmt-move-image-field--${move.visual}`}
      aria-hidden="true"
    >
      <div
        className={`pmt-move-image${imageLayer.blending ? " is-blending" : ""}`}
        style={{
          "--pmt-image-blend-ms": `${MOVE_IMAGE_BLEND_MS}ms`,
          left: imageLayout ? `${imageLayout.left}px` : undefined,
          top: imageLayout ? `${imageLayout.top}px` : undefined,
          width: imageLayout
            ? `${imageLayout.right - imageLayout.left + 1}px`
            : undefined,
          height: imageLayout
            ? `${imageLayout.bottom - imageLayout.top}px`
            : undefined,
        }}
      >
        {imageLayer.previous ? (
          <img
            className="pmt-move-image__asset pmt-move-image__asset--previous"
            src={imageLayer.previous}
            alt=""
            aria-hidden="true"
            decoding="async"
          />
        ) : null}
        <img
          key={imageLayer.current}
          className="pmt-move-image__asset pmt-move-image__asset--current"
          src={imageLayer.current}
          alt=""
          aria-hidden="true"
          decoding="async"
        />
      </div>
      <MoveGridOverlay
        centerLineX={fieldSize.centerLineX}
        fieldHeight={fieldSize.height}
        fieldWidth={fieldSize.width}
        imageLayout={imageLayout}
      />
    </div>
  );
}

function MoveTitleReveal({
  activeIndex,
  maskColor,
  moveVisible,
  title,
  titleColor,
}) {
  return (
    <h3
      key={`title-${activeIndex}`}
      className={`text-reveal pmt-move-title${moveVisible ? " is-visible" : ""}`}
      style={{
        "--text-reveal-delay": `${MOVE_TITLE_DELAY_MS}ms`,
        "--text-reveal-duration": "0.82s",
        "--text-reveal-mask": maskColor,
        ...typeStyle("displayMd", { fontFamily: FONTS.display }),
        color: titleColor,
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
          "--pmt-move-body-delay": `${MOVE_BODY_DELAY_MS}ms`,
        }}
      >
        <span
          className="pmt-move-index"
          style={{
            color: moveIndexColor,
            ...typeStyle("bodyStrong"),
          }}
        >
          Pilar {move.index}
        </span>
        <div className="pmt-move-copy">
          <MoveTitleReveal
            activeIndex={activeIndex}
            maskColor={maskColor}
            moveVisible={moveVisible}
            title={move.title}
            titleColor={moveTitleColor}
          />
          <p
            className="pmt-move-body"
            style={{ color: mutedColor, ...typeStyle("body") }}
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
    stageDividerX: null,
    stageWidth: 0,
    stageHeight: 0,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [moveVisible, setMoveVisible] = useState(true);
  const [solutionScrambleActive, setSolutionScrambleActive] = useState(false);
  const [moveStageDividerX, setMoveStageDividerX] = useState(null);
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
      const stageDividerX = getNavbarDividerX(stageRect.left);

      let explainProgress = 0;
      if (explain) {
        const er = explain.getBoundingClientRect();
        const range = Math.max(1, er.height - window.innerHeight);
        explainProgress = clamp(-er.top / range, 0, 1);
      }

      setState({
        progress: rawProgress,
        explainProgress,
        stageDividerX,
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
    if (PROMETEO_MOVES[targetIndex]?.image) {
      const image = new Image();
      image.src = PROMETEO_MOVES[targetIndex].image;
      image.decode?.().catch(() => {});
    }

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
        "--prometeo-stage-divider-x":
          moveStageDividerX != null
            ? `${moveStageDividerX + STAGE_DIVIDER_NUDGE}px`
            : state.stageDividerX != null
              ? `${state.stageDividerX + STAGE_DIVIDER_NUDGE}px`
              : "75%",
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
                text="La respuesta"
                play={solutionScrambleActive}
                idle="scrambled"
                duration={1120}
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
                  color: COLORS.accent,
                }}
              >
                Prometeo
              </h2>
            </div>
          </div>
        </div>
      </div>

      <LandingTransitionSection
        light={light}
        title="Cómo lo hacemos"
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
              <div
                ref={methodKickerRef}
                className="pmt-method-kicker-wrap"
                style={methodKickerStyle}
              >
                <span
                  className="pmt-method-kicker"
                  style={{
                    color: accentTextColor,
                    ...typeStyle("bodyStrong"),
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
                  color: titleColor,
                  margin: 0,
                  textAlign: "left",
                  ...typeStyle("displayMd"),
                  "--text-reveal-block": COLORS.accent,
                }}
              />
            </div>
          </div>

          <div className="prometeo-scroll__moves-stage">
            <MovePlaceholder
              move={move}
              onDividerChange={setMoveStageDividerX}
            />
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
