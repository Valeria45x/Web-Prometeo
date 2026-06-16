import { useEffect, useRef, useState } from "react";

function splitFallback(children) {
  if (Array.isArray(children)) return children;
  if (typeof children === "string") return [children];
  return [children];
}

function joinClassNames(...classNames) {
  return classNames.filter(Boolean).join(" ");
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
  ...props
}) {
  const ref = useRef(null);
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

    let frameId = 0;
    let done = false;

    const cleanup = () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frameId) window.cancelAnimationFrame(frameId);
    };

    // Revela una sola vez y deja de escuchar.
    const reveal = () => {
      if (done) return;
      done = true;
      setVisible(true);
      cleanup();
    };

    // Red de seguridad: revela en cuanto el elemento ha cruzado el umbral,
    // incluso si el scroll rápido lo pasó de largo (top por encima del
    // viewport). Así nunca se queda una sección sin revelar.
    const check = () => {
      frameId = 0;
      const vh =
        window.innerHeight || document.documentElement.clientHeight || 0;
      if (node.getBoundingClientRect().top <= vh * 0.9) reveal();
    };

    const schedule = () => {
      if (done || frameId) return;
      frameId = window.requestAnimationFrame(check);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
        else schedule();
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return cleanup;
  }, []);

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
