import { useEffect, useRef, useState } from "react";
import { FONTS } from "@/design/tokens";
import { typeStyle } from "@/design/typography";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  PROMETEO_MOVES,
  PROMETEO_SCROLL_MOTION,
} from "@/features/landing/sections/scroll/prometeoScroll.config";
import {
  getNavbarDividerX,
  getMoveImageLayout,
  getSnappedGridLines,
} from "@/features/landing/sections/scroll/prometeoScroll.utils";

const MOVE_TRANSITION_MS = PROMETEO_SCROLL_MOTION.transitionMs;
const MOVE_IMAGE_FADE_MS = 180;

function getMovePanel(move) {
  return {
    image: move.image,
    key: `${move.visual}:${move.image}`,
    visual: move.visual,
  };
}

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

function getImageFrame(panel, fieldSize, isMobileLayout) {
  const imageLayout = getMoveImageLayout(
    panel.visual,
    fieldSize.width,
    fieldSize.height,
    isMobileLayout,
    fieldSize.centerLineX,
  );

  if (!imageLayout) {
    return {
      imageLayout: null,
      imageFrame: null,
    };
  }

  return {
    imageLayout,
    imageFrame: {
      left: imageLayout.left,
      top: imageLayout.top,
      right: Math.min(fieldSize.width, imageLayout.right),
      bottom: Math.min(fieldSize.height, imageLayout.bottom),
    },
  };
}

function MoveImageContour({ fieldHeight, fieldWidth, imageLayout }) {
  if (!fieldWidth || !fieldHeight || !imageLayout) return null;

  return (
    <div
      className="pmt-move-image-contour"
      aria-hidden="true"
      style={{
        "--pmt-contour-top": "0px",
        "--pmt-contour-right": imageLayout.right < fieldWidth ? "1px" : "0px",
        "--pmt-contour-bottom":
          imageLayout.bottom < fieldHeight ? "1px" : "0px",
        "--pmt-contour-left": "0px",
      }}
    />
  );
}

function MoveImagePanel({
  activeIndex,
  fieldSize,
  imageVisible,
  index,
  isMobileLayout,
  move,
}) {
  const panel = getMovePanel(move);
  const { imageFrame, imageLayout } = getImageFrame(
    panel,
    fieldSize,
    isMobileLayout,
  );

  if (!imageFrame) return null;

  const isActive = index === activeIndex;
  const isVisible = isActive && imageVisible;

  return (
    <div
      className={[
        "pmt-move-image",
        "pmt-move-image--scroll-layer",
        `pmt-move-image--${panel.visual}`,
        isActive ? "is-active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        left: `${imageFrame.left}px`,
        top: `${imageFrame.top}px`,
        width: `${imageFrame.right - imageFrame.left}px`,
        height: `${imageFrame.bottom - imageFrame.top}px`,
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
        clipPath: "inset(0)",
        transform: "none",
        zIndex: isActive ? 4 : 1,
        transition: `opacity ${MOVE_IMAGE_FADE_MS}ms ease, visibility 0s linear ${
          isVisible ? 0 : MOVE_IMAGE_FADE_MS
        }ms`,
      }}
    >
      <img
        className="pmt-move-image__asset"
        loading="lazy"
        src={panel.image}
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
  );
}

function MovePlaceholder({ activeIndex, onDividerChange }) {
  const fieldRef = useRef(null);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const [fieldSize, setFieldSize] = useState({
    width: 0,
    height: 0,
    centerLineX: null,
  });
  const [displayIndex, setDisplayIndex] = useState(activeIndex);
  const [imageVisible, setImageVisible] = useState(true);

  useEffect(() => {
    if (activeIndex === displayIndex) return undefined;

    setImageVisible(false);
    const swapTimer = window.setTimeout(() => {
      setDisplayIndex(activeIndex);
      window.requestAnimationFrame(() => setImageVisible(true));
    }, MOVE_IMAGE_FADE_MS);

    return () => window.clearTimeout(swapTimer);
  }, [activeIndex, displayIndex]);

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

  return (
    <div
      ref={fieldRef}
      className="pmt-move-image-field pmt-move-image-field--scroll-driven"
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
      {PROMETEO_MOVES.map((move, index) => {
        return (
          <MoveImagePanel
            key={move.index}
            activeIndex={displayIndex}
            fieldSize={fieldSize}
            imageVisible={imageVisible}
            index={index}
            isMobileLayout={isMobileLayout}
            move={move}
          />
        );
      })}
    </div>
  );
}

function MoveText({
  activeIndex,
  borderTop,
  moveIndexColor,
  moveTextRef,
  moveTitleColor,
  moveVisible,
  mutedColor,
}) {
  return (
    <div ref={moveTextRef} className="pmt-move-text" style={{ borderTop }}>
      <div className="pmt-move-text-stack">
        {PROMETEO_MOVES.map((move, index) => {
          const isActive = moveVisible && index === activeIndex;

          return (
            <div
              key={move.index}
              className={`pmt-move-content${isActive ? " is-active" : ""}`}
              aria-hidden={!isActive}
              style={{
                opacity: isActive ? 1 : 0,
                visibility: isActive ? "visible" : "hidden",
                transform: `translate3d(0, ${isActive ? 0 : 8}px, 0)`,
                filter: `blur(${isActive ? 0 : 2}px)`,
                zIndex: isActive ? 2 : 1,
              }}
            >
              <span
                className="pmt-move-index"
                style={{
                  color: moveIndexColor,
                  ...typeStyle("eyebrow"),
                }}
              >
                Pilar {move.index}
              </span>
              <div className="pmt-move-copy">
                <h3
                  className="pmt-move-title"
                  style={{
                    ...typeStyle("displayMd", { fontFamily: FONTS.display }),
                    color: moveTitleColor,
                    margin: 0,
                  }}
                >
                  {move.title}
                </h3>
                <p
                  className="pmt-move-body"
                  style={{ color: mutedColor, ...typeStyle("body") }}
                >
                  {move.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PrometeoScrollMoveStage({
  activeIndex,
  moveVisible,
  moveTextRef,
  moveTitleColor,
  moveIndexColor,
  mutedColor,
  borderTop,
  onDividerChange,
}) {
  return (
    <div className="prometeo-scroll__moves-stage">
      <MovePlaceholder
        activeIndex={activeIndex}
        onDividerChange={onDividerChange}
      />
      <MoveText
        activeIndex={activeIndex}
        moveVisible={moveVisible}
        moveTextRef={moveTextRef}
        moveTitleColor={moveTitleColor}
        moveIndexColor={moveIndexColor}
        mutedColor={mutedColor}
        borderTop={borderTop}
      />
    </div>
  );
}
