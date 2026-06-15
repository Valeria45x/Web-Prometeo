import { useEffect, useRef, useState } from "react";
import { clamp } from "@/lib/math";

/**
 * Parallax suave del fondo del hero de Certificación, controlado por scroll.
 * Devuelve la ref del fondo y si la animación está activa (respeta
 * prefers-reduced-motion).
 */
export function useCertHeroParallax() {
  const heroBgRef = useRef(null);
  const [animReady, setAnimReady] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAnimReady(!reducedMotion.matches);
    if (reducedMotion.matches) return undefined;

    let frameId = null;

    function update() {
      frameId = null;
      const img = heroBgRef.current;
      if (img?.parentElement) {
        const bounds = img.parentElement.getBoundingClientRect();
        const offset = clamp(
          (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) * 0.06,
          -40,
          40,
        );
        img.style.setProperty("--cert-hero-parallax", `${offset}px`);
      }
    }

    function scheduleUpdate() {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return { heroBgRef, animReady };
}
