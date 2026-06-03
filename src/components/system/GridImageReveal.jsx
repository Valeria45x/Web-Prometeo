import { useEffect, useRef, useState } from "react";
import { COLORS } from "../../design/tokens";
import placeholderImage from "../../../Instagram Feed USB v1.png";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getProgress(rect, viewportHeight) {
  const start = viewportHeight * 0.88;
  const end = viewportHeight * 0.18;
  return clamp((start - rect.top) / (start - end), 0, 1);
}

function smoothstep(value) {
  const x = clamp(value, 0, 1);
  return x * x * (3 - 2 * x);
}

export default function GridImageReveal({
  src,
  alt = "",
  label = "PMT / visual",
  tone = "dark",
  minHeight = "512px",
  revealWidthRatio = 1,
  objectPosition = "center",
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  const [metrics, setMetrics] = useState({ progress: 0, width: 0, height: 0 });
  const frameRef = useRef(0);
  const isLight = tone === "light";
  const bg = isLight ? COLORS.pageLight : COLORS.canvasDark;
  const text = isLight ? COLORS.textOnLight : COLORS.textOnDark;
  const muted = isLight ? COLORS.textMutedLight : COLORS.textMutedDark;
  const line = isLight ? COLORS.gridLight : COLORS.grid;
  const mediaSrc = src ?? placeholderImage;

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      const rect = node.getBoundingClientRect();
      setMetrics({ progress: 1, width: rect.width, height: rect.height });
      return undefined;
    }

    const update = () => {
      frameRef.current = 0;
      const rect = node.getBoundingClientRect();
      setMetrics({
        progress: getProgress(rect, window.innerHeight),
        width: rect.width,
        height: rect.height,
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

  const { progress, width, height } = metrics;
  const easedProgress = smoothstep(progress);
  const maxSize = Math.max(width, height, 16);
  const safeRevealWidthRatio = clamp(revealWidthRatio, 0, 1);
  const maxRevealWidth = (width || 16) * safeRevealWidthRatio;
  const revealSize = 16 + (maxSize - 16) * easedProgress;
  const revealWidth = clamp(revealSize, 16, maxRevealWidth || 16);
  const revealHeight = clamp(revealSize, 16, height || 16);
  const clipTop = "0px";
  const clipLeft = "0px";
  const clipRight = `${Math.max(0, width - revealWidth)}px`;
  const clipBottom = `${Math.max(0, height - revealHeight)}px`;
  const edgeXOpacity = clamp((width - revealWidth) / 16, 0, 1);
  const edgeYOpacity = clamp((height - revealHeight) / 16, 0, 1);
  const scale = 1.42 - easedProgress * 0.32;

  return (
    <figure
      ref={ref}
      className={["grid-image-reveal", className].filter(Boolean).join(" ")}
      style={{
        "--grid-image-bg": bg,
        "--grid-image-text": text,
        "--grid-image-muted": muted,
        "--grid-image-line": line,
        "--grid-image-clip": `inset(${clipTop} ${clipRight} ${clipBottom} ${clipLeft})`,
        "--grid-image-edge-x": `${revealWidth}px`,
        "--grid-image-edge-y": `${revealHeight}px`,
        "--grid-image-edge-x-opacity": edgeXOpacity,
        "--grid-image-edge-y-opacity": edgeYOpacity,
        "--grid-image-scale": scale,
        minHeight,
        ...style,
      }}
    >
      <div
        aria-hidden="true"
        className="grid-image-reveal__edge grid-image-reveal__edge--x"
      />
      <div
        aria-hidden="true"
        className="grid-image-reveal__edge grid-image-reveal__edge--y"
      />
      <div className="grid-image-reveal__mask">
        <img
          className="grid-image-reveal__media"
          src={mediaSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition }}
        />
      </div>
    </figure>
  );
}
