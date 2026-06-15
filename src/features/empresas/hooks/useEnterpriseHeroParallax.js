import { useEffect, useRef } from "react";
import { clamp } from "@/lib/math";

/** Parallax del fondo del hero de Empresas. Devuelve la ref de la imagen. */
export function useEnterpriseHeroParallax() {
  const imgRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = null;

    const layers = [
      { image: imgRef.current, prop: "--enterprise-hero-parallax" },
    ].filter((layer) => layer.image);

    if (!layers.length || reducedMotion.matches) return undefined;

    function updateParallax() {
      frameId = null;
      layers.forEach(({ image, prop }) => {
        const bounds = image.parentElement?.getBoundingClientRect();
        if (!bounds) return;
        const offset = clamp(
          (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) * 0.08,
          -44,
          44,
        );
        image.style.setProperty(prop, `${offset}px`);
      });
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

  return imgRef;
}
