import { useEffect, useRef, useState } from "react";
import { COLORS } from "../../design/tokens";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getProgress(rect, viewportHeight) {
  const start = viewportHeight * 0.88;
  const end = viewportHeight * 0.18;
  return clamp((start - rect.top) / (start - end), 0, 1);
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

export default function GridImageReveal({
  src,
  alt = "",
  label = "PMT / visual",
  tone = "dark",
  minHeight = "512px",
  objectPosition = "center",
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const isLight = tone === "light";
  const bg = isLight ? COLORS.pageLight : COLORS.canvasDark;
  const text = isLight ? COLORS.textOnLight : COLORS.textOnDark;
  const muted = isLight ? COLORS.textMutedLight : COLORS.textMutedDark;

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setProgress(1);
      return undefined;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      setProgress(getProgress(node.getBoundingClientRect(), window.innerHeight));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const easedProgress = easeOutCubic(progress);
  const clipTop = "0px";
  const clipLeft = "0px";
  const clipRight = `calc((100% - var(--s16)) * ${1 - easedProgress})`;
  const clipBottom = `calc((100% - var(--s16)) * ${1 - easedProgress})`;
  const scale = 1.42 - easedProgress * 0.32;

  return (
    <figure
      ref={ref}
      className={["grid-image-reveal", className].filter(Boolean).join(" ")}
      style={{
        "--grid-image-bg": bg,
        "--grid-image-text": text,
        "--grid-image-muted": muted,
        "--grid-image-clip": `inset(${clipTop} ${clipRight} ${clipBottom} ${clipLeft})`,
        "--grid-image-scale": scale,
        minHeight,
        ...style,
      }}
    >
      <div className="grid-image-reveal__mask">
        {src ? (
          <img
            className="grid-image-reveal__media"
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition }}
          />
        ) : (
          <div className="grid-image-reveal__placeholder" aria-hidden="true">
            <div className="grid-image-reveal__placeholder-grid" />
            <span>{label}</span>
          </div>
        )}
      </div>
    </figure>
  );
}
