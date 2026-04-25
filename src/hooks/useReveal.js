import { useRef, useEffect, useState } from "react";

function isElementInRevealRange(element) {
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight || 0;
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth || 0;

  if (!viewportHeight || !viewportWidth) return false;
  if (rect.width === 0 && rect.height === 0) return false;

  return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.left <= viewportWidth &&
    rect.top <= viewportHeight * 0.92
  );
}

export function useReveal(delay = 0, once = false) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let frameId;
    let isActive = true;

    const updateVisibility = (visible) => {
      if (!isActive) return;

      setVis((current) => {
        if (once && current) return true;
        return once ? visible || current : visible;
      });
    };

    const checkVisibility = () => {
      frameId = undefined;
      updateVisibility(isElementInRevealRange(el));
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
              updateVisibility(
                entry.isIntersecting || isElementInRevealRange(el),
              );
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
  }, [once]);

  return [
    ref,
    {
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(28px)",
      transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    },
  ];
}
