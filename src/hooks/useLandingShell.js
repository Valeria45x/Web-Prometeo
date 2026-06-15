import { useEffect, useLayoutEffect, useState } from "react";
import { COLORS } from "@/design/tokens";
import {
  EASE,
  DARK_GRID,
  LIGHT_GRID,
  PAGE_LIGHT_BG,
} from "@/features/landing/shared/theme";

export function useLandingShell() {
  const [light, setLight] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);

  useEffect(() => {
    const heroTitle = document.getElementById("hero-title");
    if (!heroTitle) return undefined;

    let frame = 0;

    const update = () => {
      frame = 0;
      const topbarHeight =
        document.querySelector(".topbar")?.getBoundingClientRect().height || 64;
      const rect = heroTitle.getBoundingClientRect();
      const titleVisible =
        rect.bottom > topbarHeight && rect.top < window.innerHeight;
      setShowWordmark(!titleVisible);
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
