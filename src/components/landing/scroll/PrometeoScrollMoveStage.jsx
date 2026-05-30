import { useEffect, useRef, useState } from "react";
import { FONTS } from "../../../design/tokens";
import { typeStyle } from "../../../design/typography";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { PROMETEO_SCROLL_MOTION } from "./prometeoScroll.config";
import {
  getMoveContourSegments,
  getMoveImageLayout,
} from "./prometeoScroll.utils";

const MOVE_TRANSITION_MS = PROMETEO_SCROLL_MOTION.transitionMs;
const MOVE_EXIT_MS =
  PROMETEO_SCROLL_MOTION.exitMs ?? PROMETEO_SCROLL_MOTION.swapMs;
const MOVE_INDEX_DELAY_MS = PROMETEO_SCROLL_MOTION.indexDelayMs;
const MOVE_TITLE_DELAY_MS = PROMETEO_SCROLL_MOTION.titleDelayMs;
const MOVE_TITLE_REVEAL_MS = PROMETEO_SCROLL_MOTION.titleRevealMs;
const MOVE_BODY_DELAY_MS = PROMETEO_SCROLL_MOTION.bodyDelayMs;
const MOVE_IMAGE_BLEND_MS = PROMETEO_SCROLL_MOTION.imageBlendMs;
const MOVE_BASE_GRID_CELLS = Array.from({ length: 16 }, (_, index) => index);

function MoveBaseGridLayer({ fieldHeight, fieldWidth, imageLayout }) {
  if (!fieldWidth || !fieldHeight || !imageLayout) return null;

  const topHeight = Math.max(0, imageLayout.top + 1);
  const bottomStart = Math.max(0, imageLayout.bottom - 1);
  const middleTop = Math.max(0, imageLayout.top + 1);
  const middleBottom = Math.max(0, fieldHeight - imageLayout.bottom + 1);
  const middleHeight = Math.max(0, fieldHeight - middleTop - middleBottom);
  const leftWidth = Math.max(0, imageLayout.left + 1);
  const rightStart = Math.max(0, imageLayout.right - 1);
  const rightWidth = Math.max(0, fieldWidth - rightStart);

  const clips = [
    topHeight > 0
      ? {
          key: "top",
          top: 0,
          right: 0,
          bottom: fieldHeight - topHeight,
          left: 0,
        }
      : null,
    bottomStart < fieldHeight
      ? { key: "bottom", top: bottomStart, right: 0, bottom: 0, left: 0 }
      : null,
    leftWidth > 0 && middleHeight > 0
      ? {
          key: "left",
          top: middleTop,
          right: fieldWidth - leftWidth,
          bottom: middleBottom,
          left: 0,
        }
      : null,
    rightWidth > 0 && middleHeight > 0
      ? {
          key: "right",
          top: middleTop,
          right: 0,
          bottom: middleBottom,
          left: rightStart,
        }
      : null,
  ].filter(Boolean);

  if (!clips.length) return null;

  return clips.map((clip) => (
    <div
      key={clip.key}
      className="pmt-move-grid-base-layer"
      style={{
        clipPath: `inset(${clip.top}px ${clip.right}px ${clip.bottom}px ${clip.left}px)`,
      }}
      aria-hidden="true"
    >
      {MOVE_BASE_GRID_CELLS.map((cell) => (
        <span key={`${clip.key}-${cell}`} className="pmt-move-grid-base-cell" />
      ))}
    </div>
  ));
}

function MoveGridOverlay({ fieldHeight, fieldWidth, imageLayout }) {
  if (!fieldWidth || !fieldHeight || !imageLayout) return null;

  const contourSegments = getMoveContourSegments(
    fieldWidth,
    fieldHeight,
    imageLayout,
  );

  if (!contourSegments.length) return null;

  return (
    <svg
      className="pmt-move-grid-overlay"
      viewBox={`0 0 ${fieldWidth} ${fieldHeight}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
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
  });
  const [imageLayer, setImageLayer] = useState(() => ({
    current: move.image,
    previous: null,
    blending: false,
  }));

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return undefined;

    const updateFieldSize = (width, height) => {
      setFieldSize((current) => {
        if (current.width === width && current.height === height) {
          return current;
        }

        return { width, height };
      });
    };

    const readFieldSize = () => {
      const rect = field.getBoundingClientRect();
      const nextWidth = Number(rect.width.toFixed(3));
      const nextHeight = Number(rect.height.toFixed(3));

      updateFieldSize(nextWidth, nextHeight);
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
    onDividerChange(fieldRect.left - stickyRect.left + fieldRect.width / 2);

    return undefined;
  }, [fieldSize.width, isMobileLayout, onDividerChange]);

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
      <MoveBaseGridLayer
        fieldHeight={fieldSize.height}
        fieldWidth={fieldSize.width}
        imageLayout={imageLayout}
      />
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
  moveRevealKey,
  title,
  titleColor,
}) {
  return (
    <h3
      key={`title-${activeIndex}-${moveRevealKey}`}
      className={`text-reveal pmt-move-title${moveVisible ? " is-visible" : ""}`}
      style={{
        "--text-reveal-delay": `${MOVE_TITLE_DELAY_MS}ms`,
        "--text-reveal-duration": `${MOVE_TITLE_REVEAL_MS}ms`,
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
  moveRevealKey,
  moveTextRef,
  moveTitleColor,
  moveIndexColor,
  mutedColor,
  maskColor,
  borderTop,
}) {
  return (
    <div ref={moveTextRef} className="pmt-move-text" style={{ borderTop }}>
      <div
        className={`pmt-move-content${moveVisible ? " is-visible" : ""}`}
        style={{
          "--pmt-move-transition-ms": `${MOVE_TRANSITION_MS}ms`,
          "--pmt-move-exit-ms": `${MOVE_EXIT_MS}ms`,
          "--pmt-move-index-delay": `${MOVE_INDEX_DELAY_MS}ms`,
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
            moveRevealKey={moveRevealKey}
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

export default function PrometeoScrollMoveStage({
  move,
  activeIndex,
  moveVisible,
  moveRevealKey,
  moveTextRef,
  moveTitleColor,
  moveIndexColor,
  mutedColor,
  maskColor,
  borderTop,
  onDividerChange,
}) {
  return (
    <div className="prometeo-scroll__moves-stage">
      <MovePlaceholder move={move} onDividerChange={onDividerChange} />
      <MoveText
        move={move}
        activeIndex={activeIndex}
        moveVisible={moveVisible}
        moveRevealKey={moveRevealKey}
        moveTextRef={moveTextRef}
        moveTitleColor={moveTitleColor}
        moveIndexColor={moveIndexColor}
        mutedColor={mutedColor}
        maskColor={maskColor}
        borderTop={borderTop}
      />
    </div>
  );
}
