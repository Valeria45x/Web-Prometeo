import { useEffect, useId, useRef, useState } from "react";
import { FONTS } from "../../../design/tokens";
import { typeStyle } from "../../../design/typography";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { PROMETEO_SCROLL_MOTION } from "./prometeoScroll.config";
import {
  getMoveContourSegments,
  getMoveImageLayout,
  getMoveInteriorMask,
  getNavbarDividerX,
  getSnappedGridLines,
} from "./prometeoScroll.utils";

const MOVE_TRANSITION_MS = PROMETEO_SCROLL_MOTION.transitionMs;
const MOVE_INDEX_DELAY_MS = PROMETEO_SCROLL_MOTION.indexDelayMs;
const MOVE_TITLE_DELAY_MS = PROMETEO_SCROLL_MOTION.titleDelayMs;
const MOVE_TITLE_REVEAL_MS = PROMETEO_SCROLL_MOTION.titleRevealMs;
const MOVE_BODY_DELAY_MS = PROMETEO_SCROLL_MOTION.bodyDelayMs;
const MOVE_IMAGE_BLEND_MS = PROMETEO_SCROLL_MOTION.imageBlendMs;

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
        if (
          current.width === width &&
          current.height === height &&
          current.centerLineX === centerLineX
        ) {
          return current;
        }

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
  moveTitleColor,
  moveIndexColor,
  mutedColor,
  maskColor,
  borderTop,
}) {
  return (
    <div className="pmt-move-text" style={{ borderTop }}>
      <div
        className={`pmt-move-content${moveVisible ? " is-visible" : ""}`}
        style={{
          "--pmt-move-transition-ms": `${MOVE_TRANSITION_MS}ms`,
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
        moveTitleColor={moveTitleColor}
        moveIndexColor={moveIndexColor}
        mutedColor={mutedColor}
        maskColor={maskColor}
        borderTop={borderTop}
      />
    </div>
  );
}
