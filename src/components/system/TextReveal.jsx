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
  delayStep = 90,
  once = true,
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.24, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Component
      ref={ref}
      className={joinClassNames("text-reveal", visible && "is-visible", className)}
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
          style={{ "--text-reveal-delay": `${index * delayStep}ms` }}
        >
          <span className="text-reveal__content">{line}</span>
        </span>
      ))}
    </Component>
  );
}
