import { useEffect, useRef, useState } from "react";

function splitFallback(children) {
  if (Array.isArray(children)) return children;
  if (typeof children === "string") return [children];
  return [children];
}

function joinClassNames(...classNames) {
  return classNames.filter(Boolean).join(" ");
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

export default function TextReveal({
  as: Component = "div",
  lines,
  children,
  className = "",
  lineClassName = "",
  style = {},
  maskColor,
  baseDelay = 0,
  delayStep = 90,
  once = true,
  ...props
}) {
  const ref = useRef(null);
  const frameRef = useRef(0);
  const [visible, setVisible] = useState(false);
  const contentLines = lines ?? splitFallback(children);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setVisible(true);
      return undefined;
    }

    const resetAfterExit = () => {
      frameRef.current = 0;
      if (!once && isElementOutsideViewport(node)) {
        setVisible(false);
      }
    };

    const requestResetCheck = () => {
      if (once || frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(resetAfterExit);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once && isElementOutsideViewport(node)) {
          setVisible(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    if (!once) {
      window.addEventListener("scroll", requestResetCheck, { passive: true });
      window.addEventListener("resize", requestResetCheck);
    }

    return () => {
      observer.disconnect();
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("scroll", requestResetCheck);
      window.removeEventListener("resize", requestResetCheck);
    };
  }, [once]);

  return (
    <Component
      ref={ref}
      className={joinClassNames(
        "text-reveal",
        visible && "is-visible",
        className,
      )}
      style={{
        ...(maskColor ? { "--text-reveal-mask": maskColor } : {}),
        ...style,
      }}
      {...props}
    >
      {contentLines.map((line, index) => (
        <span
          key={index}
          className={joinClassNames("text-reveal__line", lineClassName)}
          style={{
            "--text-reveal-delay": `${baseDelay + index * delayStep}ms`,
          }}
        >
          <span className="text-reveal__content">{line}</span>
        </span>
      ))}
    </Component>
  );
}
