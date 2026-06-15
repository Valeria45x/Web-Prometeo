import { useEffect, useRef } from "react";
import { clamp } from "@/lib/math";

/**
 * Parallax + oscurecimiento del hero de Para Ti según el scroll de salida.
 * Devuelve la ref de la imagen del hero.
 */
export function useParaTiHeroParallax() {
  const imgRef = useRef(null);

  useEffect(() => {
    let frameId = null;

    function update() {
      frameId = null;
      if (!imgRef.current) return;

      const hero = imgRef.current.closest(".para-ti-hero");
      const frame = imgRef.current.parentElement;
      const rect = frame?.getBoundingClientRect();
      const heroRect = hero?.getBoundingClientRect();
      if (!rect || !hero || !heroRect) return;

      const offset = clamp(
        (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.1,
        -48,
        48,
      );
      const topbarHeight =
        Number.parseFloat(
          window
            .getComputedStyle(document.documentElement)
            .getPropertyValue("--prometeo-topbar-height"),
        ) || 64;
      const fadeStart = heroRect.height * 0.36;
      const fadeDistance = Math.max(heroRect.height * 0.58, 1);
      const exitProgress = clamp(
        (topbarHeight - heroRect.top - fadeStart) / fadeDistance,
        0,
        1,
      );

      imgRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.12)`;
      hero.style.setProperty(
        "--para-ti-hero-blackout",
        (exitProgress * 0.24).toString(),
      );
      hero.style.setProperty(
        "--para-ti-hero-copy-opacity",
        (1 - exitProgress * 0.12).toString(),
      );
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

  return imgRef;
}
