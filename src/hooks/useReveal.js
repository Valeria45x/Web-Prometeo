import { useRef, useEffect, useState } from "react";

function isElementInRevealRange(element) {
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight || 0;

  if (!viewportHeight) return false;
  if (rect.width === 0 && rect.height === 0) return false;

  // Visible en cuanto el elemento cruza el umbral de entrada. Sin tope inferior
  // a propósito: si el scroll rápido lo pasa de largo (top por encima del
  // viewport), también cuenta como revelado, para que nunca se quede oculto.
  return rect.top <= viewportHeight * 0.92;
}

export function useReveal(delay = 0) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let frameId;
    let isActive = true;

    // Reveal once: en cuanto el elemento entra una vez, se queda visible y no se
    // vuelve a animar al salir y volver a entrar (estándar "revelar una vez").
    const markVisible = () => {
      if (isActive) setVis(true);
    };

    const checkVisibility = () => {
      frameId = undefined;
      if (isElementInRevealRange(el)) markVisible();
    };

    const scheduleCheck = () => {
      if (!isActive) return;
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(checkVisibility);
    };

    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting || isElementInRevealRange(el)) {
                markVisible();
              }
            },
            {
              threshold: 0.04,
              rootMargin: "0px 0px -8% 0px",
            },
          )
        : null;

    io?.observe(el);
    scheduleCheck();
    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck);
    window.addEventListener("pageshow", scheduleCheck);
    document.addEventListener("visibilitychange", scheduleCheck);

    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleCheck).catch(() => {});
    }

    return () => {
      isActive = false;
      if (frameId) cancelAnimationFrame(frameId);
      io?.disconnect();
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
      window.removeEventListener("pageshow", scheduleCheck);
      document.removeEventListener("visibilitychange", scheduleCheck);
    };
  }, []);

  const transitionDelay = vis ? delay : 0;

  return [
    ref,
    {
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(30px)",
      transition: `opacity 1.18s cubic-bezier(0.16,1,0.3,1) ${transitionDelay}ms, transform 1.18s cubic-bezier(0.16,1,0.3,1) ${transitionDelay}ms`,
    },
  ];
}
