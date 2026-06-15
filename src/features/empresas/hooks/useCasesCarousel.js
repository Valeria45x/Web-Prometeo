import { useEffect, useRef } from "react";
import { clamp } from "@/lib/math";

/**
 * Carrusel horizontal de "Experiencia" controlado por scroll (sección pineada).
 * Devuelve las refs de la sección y del track.
 */
export function useCasesCarousel() {
  const casesRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = casesRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const viewport = track.parentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const SPEED = 1.5;
    let frameId = null;
    let travel = 0;

    function getPinHeight() {
      const pin = section.querySelector(".enterprise-cases__pin");
      return pin ? pin.offsetHeight : 0;
    }

    function update() {
      frameId = null;
      if (travel <= 0) {
        track.style.transform = "";
        return;
      }
      const topbar =
        Number.parseFloat(
          window
            .getComputedStyle(document.documentElement)
            .getPropertyValue("--prometeo-topbar-height"),
        ) || 64;
      const distance = section.offsetHeight - getPinHeight();
      if (distance <= 0) return;
      const rectTop = section.getBoundingClientRect().top;
      const progress = clamp((topbar - rectTop) / distance, 0, 1);
      track.style.transform = `translate3d(${-progress * travel}px, 0, 0)`;
    }

    function layout() {
      if (reducedMotion.matches || mobile.matches) {
        section.style.height = "";
        track.style.transform = "";
        travel = 0;
        return;
      }
      travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
      if (travel <= 0) {
        section.style.height = "";
        track.style.transform = "";
        return;
      }
      section.style.height = `${getPinHeight() + travel * SPEED}px`;
      update();
    }

    function scheduleUpdate() {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(update);
    }

    layout();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", layout);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", layout);
      section.style.height = "";
      track.style.transform = "";
    };
  }, []);

  return { casesRef, trackRef };
}
