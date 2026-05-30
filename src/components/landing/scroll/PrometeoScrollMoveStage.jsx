import { useEffect, useRef, useState } from "react";
import { FONTS } from "../../../design/tokens";
import { typeStyle } from "../../../design/typography";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { PROMETEO_SCROLL_MOTION } from "./prometeoScroll.config";
import {
  getNavbarDividerX,
  getMoveImageLayout,
  getSnappedGridLines,
} from "./prometeoScroll.utils";

const MOVE_TRANSITION_MS = PROMETEO_SCROLL_MOTION.transitionMs;
const MOVE_EXIT_MS =
  PROMETEO_SCROLL_MOTION.exitMs ?? PROMETEO_SCROLL_MOTION.swapMs;
const MOVE_INDEX_DELAY_MS = PROMETEO_SCROLL_MOTION.indexDelayMs;
const MOVE_TITLE_DELAY_MS = PROMETEO_SCROLL_MOTION.titleDelayMs;
const MOVE_TITLE_REVEAL_MS = PROMETEO_SCROLL_MOTION.titleRevealMs;
const MOVE_BODY_DELAY_MS = PROMETEO_SCROLL_MOTION.bodyDelayMs;
const MOVE_IMAGE_BLEND_MS = PROMETEO_SCROLL_MOTION.imageBlendMs;

function MoveBaseGridLayer({ centerLineX, fieldHeight, fieldWidth }) {
  if (!fieldWidth || !fieldHeight) return null;

  const xLines = getSnappedGridLines(fieldWidth, centerLineX);
  const yLines = getSnappedGridLines(fieldHeight);

  return (
    <div className="pmt-move-grid-base-layer" aria-hidden="true">
      {xLines.map((line, index) => (
        <span
          key={`x-${index}`}
          className="pmt-move-grid-line pmt-move-grid-line--vertical"
          style={{ left: `${Math.max(0, line - 1)}px` }}
        />
      ))}
      {yLines.map((line, index) => (
        <span
          key={`y-${index}`}
          className="pmt-move-grid-line pmt-move-grid-line--horizontal"
          style={{ top: `${Math.max(0, line - 1)}px` }}
        />
      ))}
    </div>
  );
}

function MoveImageContour({ fieldHeight, fieldWidth, imageLayout }) {
  if (!fieldWidth || !fieldHeight || !imageLayout) return null;

  return (
    <div
      className="pmt-move-image-contour"
      aria-hidden="true"
      style={{
        "--pmt-contour-top": "0px",
        "--pmt-contour-right":
          imageLayout.right < fieldWidth ? "1px" : "0px",
        "--pmt-contour-bottom":
          imageLayout.bottom < fieldHeight ? "1px" : "0px",
        "--pmt-contour-left": "0px",
      }}
    />
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
      const nextWidth = Number(rect.width.toFixed(3));
      const nextHeight = Number(rect.height.toFixed(3));
      const nextCenterLineX = isMobileLayout
        ? null
        : getNavbarDividerX(rect.left);

      updateFieldSize(nextWidth, nextHeight, nextCenterLineX);
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
  const imageFrame = imageLayout
    ? {
        left: imageLayout.left,
        top: imageLayout.top,
        right: Math.min(fieldSize.width, imageLayout.right),
        bottom: Math.min(fieldSize.height, imageLayout.bottom),
      }
    : null;

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
  }, [fieldSize.centerLineX, fieldSize.width, isMobileLayout, onDividerChange]);

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
      style={{
        "--pmt-move-layout-ms": `${MOVE_TRANSITION_MS}ms`,
      }}
    >
      <MoveBaseGridLayer
        centerLineX={fieldSize.centerLineX}
        fieldHeight={fieldSize.height}
        fieldWidth={fieldSize.width}
      />
      <div
        className={`pmt-move-image${imageLayer.blending ? " is-blending" : ""}`}
        style={{
          "--pmt-image-blend-ms": `${MOVE_IMAGE_BLEND_MS}ms`,
          left: imageFrame ? `${imageFrame.left}px` : undefined,
          top: imageFrame ? `${imageFrame.top}px` : undefined,
          width: imageFrame
            ? `${imageFrame.right - imageFrame.left}px`
            : undefined,
          height: imageFrame
            ? `${imageFrame.bottom - imageFrame.top}px`
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
        <MoveImageContour
          fieldHeight={fieldSize.height}
          fieldWidth={fieldSize.width}
          imageLayout={imageLayout}
        />
      </div>
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
