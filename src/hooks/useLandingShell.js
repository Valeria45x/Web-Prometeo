import { useEffect, useLayoutEffect, useState } from "react";
import { COLORS } from "../design/tokens";
import {
  EASE,
  DARK_GRID,
  LIGHT_GRID,
  PAGE_LIGHT_BG,
} from "../components/landing/theme";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function useLandingShell() {
  const [light, setLight] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".landing-hero");
    if (!hero) return undefined;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const topbarHeight =
        document.querySelector(".topbar")?.getBoundingClientRect().height || 64;
      const stickyHeight = window.innerHeight - topbarHeight;
      const scrollRange = Math.max(1, rect.height - stickyHeight);
      const heroProgress = clamp((topbarHeight - rect.top) / scrollRange, 0, 1);
      setShowWordmark(heroProgress >= 0.995);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useLayoutEffect(() => {
    const background = light ? PAGE_LIGHT_BG : COLORS.canvasDark;
    const root = document.getElementById("root");

    document.documentElement.style.transition = `background ${EASE}`;
    document.documentElement.style.background = background;
    document.body.style.transition = `background ${EASE}`;
    document.body.style.background = background;

    if (root) {
      root.style.transition = `background ${EASE}`;
      root.style.background = background;
    }
  }, [light]);

  useLayoutEffect(
    () => () => {
      const root = document.getElementById("root");

      document.documentElement.style.background = COLORS.canvasDark;
      document.body.style.background = COLORS.canvasDark;

      if (root) {
        root.style.background = COLORS.canvasDark;
      }
    },
    [],
  );

  return {
    light,
    setLight,
    showWordmark,
    frameBorder: light ? LIGHT_GRID : DARK_GRID,
  };
}
