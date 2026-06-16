import { useEffect, useMemo, useRef, useState } from "react";
import "@/shared/ui/scramble-text.css";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>[]";

function joinClassNames(...classNames) {
  return classNames.filter(Boolean).join(" ");
}

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

function scramble(text, resolvedCount = 0) {
  return Array.from(text)
    .map((char, index) => {
      if (/\s/.test(char) || index < resolvedCount) return char;
      return randomChar();
    })
    .join("");
}

function isElementOutsideViewport(element) {
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight || 0;
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth || 0;

  if (!viewportHeight || !viewportWidth) return false;
  if (rect.width === 0 && rect.height === 0) return false;

  return (
    rect.bottom <= 0 ||
    rect.right <= 0 ||
    rect.left >= viewportWidth ||
    rect.top >= viewportHeight
  );
}

export default function ScrambleText({
  as: Component = "span",
  text,
  play,
  className = "",
  style,
  duration = 760,
  frameMs = 34,
  idle = "normal",
  threshold = 0.85,
  rootMargin = "0px",
  cursor = false,
  ...props
}) {
  const ref = useRef(null);
  const widthRef = useRef(0);
  const hasAnimatedRef = useRef(false);
  const normalizedText = String(text ?? "");
  const characters = useMemo(
    () => Array.from(normalizedText),
    [normalizedText],
  );
  const getIdleText = () =>
    idle === "scrambled" ? scramble(normalizedText, 0) : normalizedText;
  const [displayText, setDisplayText] = useState(getIdleText);
  // Frente del scramble (0→1) y visibilidad del cuadrado guía.
  const [progress, setProgress] = useState(0);
  const [cursorOn, setCursorOn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || characters.length === 0) {
      setDisplayText(normalizedText);
      return undefined;
    }

    let intervalId;
    const stop = () => {
      if (!intervalId) return;
      window.clearInterval(intervalId);
      intervalId = undefined;
    };

    const start = () => {
      if (hasAnimatedRef.current) return;

      stop();
      hasAnimatedRef.current = true;

      if (cursor) {
        widthRef.current = node.offsetWidth ?? 0;
        setCursorOn(true);
        setProgress(0);
      }

      let frame = 0;
      const totalFrames = Math.max(1, Math.round(duration / frameMs));
      const resolveEvery = Math.max(
        3,
        Math.ceil(totalFrames / Math.max(characters.length, 1)),
      );

      setDisplayText(scramble(normalizedText, 0));
      intervalId = window.setInterval(() => {
        frame += 1;
        const resolvedCount = Math.min(
          characters.length,
          Math.floor(frame / resolveEvery),
        );

        setDisplayText(scramble(normalizedText, resolvedCount));
        if (cursor) {
          setProgress(
            characters.length ? resolvedCount / characters.length : 1,
          );
        }

        if (resolvedCount >= characters.length) {
          stop();
          setDisplayText(normalizedText);
          if (cursor) {
            setProgress(1);
            setCursorOn(false);
          }
        }
      }, frameMs);
    };

    const reset = () => {
      hasAnimatedRef.current = false;
      stop();
      setDisplayText(getIdleText());
      if (cursor) {
        setCursorOn(false);
        setProgress(0);
      }
    };

    if (typeof play === "boolean") {
      if (play) start();
      else reset();

      return stop;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          return;
        }

        if (isElementOutsideViewport(node)) {
          reset();
        }
      },
      { threshold, rootMargin },
    );

    setDisplayText(getIdleText());
    observer.observe(node);

    return () => {
      stop();
      observer.disconnect();
    };
  }, [
    characters.length,
    duration,
    frameMs,
    idle,
    normalizedText,
    play,
    rootMargin,
    threshold,
    cursor,
  ]);

  return (
    <Component
      ref={ref}
      className={joinClassNames(
        "scramble-text",
        cursor && "scramble-text--with-cursor",
        className,
      )}
      style={style}
      aria-label={normalizedText}
      {...props}
    >
      <span className="scramble-text__visual" aria-hidden="true">
        {displayText}
      </span>
      {cursor ? (
        <span
          className="scramble-text__cursor"
          aria-hidden="true"
          style={{
            opacity: cursorOn ? 1 : 0,
            transform: `translate(${(widthRef.current || 0) * progress}px, -50%)`,
          }}
        />
      ) : null}
    </Component>
  );
}
