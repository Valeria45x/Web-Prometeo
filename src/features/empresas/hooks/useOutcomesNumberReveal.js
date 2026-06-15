import { useEffect, useRef } from "react";
import { clamp } from "@/lib/math";

/** Desplaza los números de "Resultados" según entran en pantalla. */
export function useOutcomesNumberReveal() {
  const outcomesRef = useRef(null);

  useEffect(() => {
    const section = outcomesRef.current;
    if (!section) return undefined;

    const items = Array.from(
      section.querySelectorAll(".enterprise-outcomes__item"),
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = null;

    if (reducedMotion.matches) {
      items.forEach((item) =>
        item.style.setProperty("--enterprise-number-shift", "0%"),
      );
      return undefined;
    }

    function updateNumbers() {
      frameId = null;
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const revealStart = viewportHeight * 0.92;
      const revealEnd = viewportHeight * 0.52;
      const revealDistance = revealStart - revealEnd;

      items.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;
        const progress = clamp((revealStart - itemTop) / revealDistance, 0, 1);
        const shift = -112 * (1 - progress);
        item.style.setProperty("--enterprise-number-shift", `${shift}%`);
      });
    }

    function scheduleUpdate() {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateNumbers);
    }

    updateNumbers();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      items.forEach((item) =>
        item.style.removeProperty("--enterprise-number-shift"),
      );
    };
  }, []);

  return outcomesRef;
}
