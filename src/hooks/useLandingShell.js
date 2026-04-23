import { useEffect, useState } from "react";
import { COLORS } from "../design/tokens";
import { EASE, DARK_GRID, LIGHT_GRID, PAGE_LIGHT_BG } from "../components/landing/theme";

export function useLandingShell() {
  const [light, setLight] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);

  useEffect(() => {
    const heroTitle = document.getElementById("hero-title");
    if (!heroTitle) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowWordmark(
          !entry.isIntersecting && entry.boundingClientRect.top < 0,
        );
      },
      { threshold: 0 },
    );

    observer.observe(heroTitle);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
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

  useEffect(
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
