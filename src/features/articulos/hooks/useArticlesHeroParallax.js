import { useEffect, useRef } from "react";
import { clamp } from "@/lib/math";

/** Parallax del fondo del hero de Artículos. Devuelve la ref de la imagen. */
export function useArticlesHeroParallax() {
  const heroImageRef = useRef(null);

  useEffect(() => {
    const image = heroImageRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = null;

    if (!image || reducedMotion.matches) return undefined;

    function updateParallax() {
      frameId = null;
      const frame = image.parentElement;
      const bounds = frame?.getBoundingClientRect();
      if (!bounds) return;

      const offset = clamp(
        (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) * 0.08,
        -44,
        44,
      );
      image.style.setProperty("--articles-hero-parallax", `${offset}px`);
    }

    function scheduleUpdate() {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateParallax);
    }

    updateParallax();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return heroImageRef;
}
