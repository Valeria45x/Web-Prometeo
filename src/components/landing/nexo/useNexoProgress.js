import { useEffect, useRef, useState } from "react";
import { NEXO_COPY } from "./nexo.content";

export function useNexoProgress({ isPhoneLayout, isTabletLayout, setLight }) {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const scrollDistance = isPhoneLayout
    ? NEXO_COPY.scrollDistance.mobile
    : isTabletLayout
      ? NEXO_COPY.scrollDistance.tablet
      : NEXO_COPY.scrollDistance.desktop;

  useEffect(() => {
    let frame = 0;
    let restoreTimers = [];
    let lastProgress = -1;
    let lastLight = null;

    const syncShell = () => {
      frame = 0;
      const element = wrapperRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();

      let nextProgress;
      if (rect.top > window.innerHeight) {
        nextProgress = 0;
      } else if (rect.bottom <= 0) {
        nextProgress = 1;
      } else {
        const scrolled = Math.max(0, -rect.top);
        nextProgress = Math.max(0, Math.min(1, scrolled / scrollDistance));
      }

      const nextLight = nextProgress > 0.25;

      if (nextProgress !== lastProgress) {
        lastProgress = nextProgress;
        setProgress(nextProgress);
      }

      if (nextLight !== lastLight) {
        lastLight = nextLight;
        setLight(nextLight);
      }
    };

    const scheduleSync = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncShell);
    };

    syncShell();
    window.requestAnimationFrame(syncShell);
    restoreTimers = [0, 80, 180, 420, 800].map((delay) =>
      window.setTimeout(syncShell, delay),
    );

    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    window.addEventListener("pageshow", scheduleSync);
    window.addEventListener("load", scheduleSync);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      restoreTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("pageshow", scheduleSync);
      window.removeEventListener("load", scheduleSync);
    };
  }, [scrollDistance, setLight]);

  return {
    wrapperRef,
    progress,
    scrollDistance,
  };
}
