import { useEffect, useRef } from "react";
import { clamp } from "@/lib/math";

const STATIC_LAYOUT_QUERY = "(max-width: 767px)";
const MIN_SCROLL_DISTANCE = 280;
const SCROLL_DISTANCE_RATIO = 0.62;
const MAX_TRACK_SHIFT = 88;

function getTopbarHeight() {
  return (
    Number.parseFloat(
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--prometeo-topbar-height"),
    ) || 64
  );
}

function getPinHeight(section) {
  return section.querySelector(".para-ti-access__quote-pin")?.offsetHeight || 0;
}

export function useAccessHorizontalText() {
  const quoteScrollRef = useRef(null);
  const quoteTrackRefs = useRef([]);

  useEffect(() => {
    const section = quoteScrollRef.current;
    if (!section) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const staticLayout = window.matchMedia(STATIC_LAYOUT_QUERY);
    let frameId = null;
    let trackShift = [];

    function reset() {
      section.style.height = "";
      section.style.removeProperty("--para-ti-quote-progress");
      quoteTrackRefs.current.forEach((track) => {
        if (!track) return;
        track.style.transform = "";
        track.style.opacity = "";
      });
    }

    function update() {
      frameId = null;

      if (reducedMotion.matches || staticLayout.matches) {
        reset();
        return;
      }

      const pinHeight = getPinHeight(section);
      const distance = section.offsetHeight - pinHeight;
      if (distance <= 0) return;

      const progress = clamp(
        (getTopbarHeight() - section.getBoundingClientRect().top) / distance,
        0,
        1,
      );

      section.style.setProperty(
        "--para-ti-quote-progress",
        progress.toFixed(4),
      );

      quoteTrackRefs.current.forEach((track, index) => {
        if (!track) return;
        const amount = trackShift[index] || 0;
        const startsOnRight = index % 2 === 1;
        const start = startsOnRight ? amount : -amount;
        const end = startsOnRight ? -amount : amount;
        const x = start + (end - start) * progress;

        track.style.transform = `translate3d(${x}px, 0, 0)`;
        track.style.opacity = `${0.62 + progress * 0.38}`;
      });
    }

    function scheduleUpdate() {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(update);
    }

    function layout() {
      if (reducedMotion.matches || staticLayout.matches) {
        reset();
        return;
      }

      const viewportWidth = section.clientWidth || window.innerWidth;
      trackShift = quoteTrackRefs.current.map((track) =>
        track ? Math.min(MAX_TRACK_SHIFT, viewportWidth * 0.06) : 0,
      );

      const pinHeight = getPinHeight(section);
      const scrollDistance = Math.max(
        MIN_SCROLL_DISTANCE,
        window.innerHeight * SCROLL_DISTANCE_RATIO,
      );

      section.style.height = `${pinHeight + scrollDistance}px`;
      update();
    }

    layout();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", layout);
    reducedMotion.addEventListener("change", layout);
    staticLayout.addEventListener("change", layout);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", layout);
      reducedMotion.removeEventListener("change", layout);
      staticLayout.removeEventListener("change", layout);
      reset();
    };
  }, []);

  return { quoteScrollRef, quoteTrackRefs };
}
