import { useEffect, useRef } from "react";
import { clamp } from "@/lib/math";

export function useAccessHorizontalText() {
  const quoteScrollRef = useRef(null);
  const quoteTrackRefs = useRef([]);

  useEffect(() => {
    const section = quoteScrollRef.current;
    if (!section) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = null;

    function reset() {
      quoteTrackRefs.current.forEach((track) => {
        if (!track) return;
        track.style.transform = "";
      });
    }

    function getTargetX(track) {
      const sectionCenter = section.clientWidth / 2;
      const trackCenter = track.offsetLeft + track.offsetWidth / 2;
      return sectionCenter - trackCenter;
    }

    function update() {
      frameId = null;

      if (reducedMotion.matches) {
        reset();
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight || 0;
      const sectionCenter = rect.top + rect.height / 2;
      const start = viewportHeight * 0.88;
      const end = viewportHeight * 0.5;
      const progress = clamp((start - sectionCenter) / (start - end), 0, 1);

      quoteTrackRefs.current.forEach((track) => {
        if (!track) return;
        track.style.transform = `translate3d(${getTargetX(track) * progress}px, 0, 0)`;
      });
    }

    function scheduleUpdate() {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);

    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleUpdate).catch(() => {});
    }

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
      reset();
    };
  }, []);

  return { quoteScrollRef, quoteTrackRefs };
}
