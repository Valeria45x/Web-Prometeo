import { useEffect, useRef, useState } from "react";
import { TH } from "../../../constants";
import { COLORS } from "../../../design/tokens";
import { HERO_LAYOUT } from "./hero.content";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(value) {
  const normalizedValue = clamp(value, 0, 1);
  return normalizedValue * normalizedValue * (3 - 2 * normalizedValue);
}

export function useHeroSubtitleFill(isMobileLayout) {
  const wrapperRef = useRef(null);
  const frameRef = useRef(0);
  const [subtitleFillProgress, setSubtitleFillProgress] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;

    const update = () => {
      frameRef.current = 0;
      const rect = wrapper.getBoundingClientRect();
      const stickyHeight = window.innerHeight - TH;
      const scrollRange = Math.max(1, rect.height - stickyHeight);
      const rawProgress = clamp((TH - rect.top) / scrollRange, 0, 1);
      setSubtitleFillProgress(smoothstep(rawProgress));
    };

    const requestUpdate = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const subtitleFillValue = Number((subtitleFillProgress * 100).toFixed(2));
  const subtitleAccentStop = `${Math.max(
    0,
    subtitleFillValue - HERO_LAYOUT.subtitleBlendWindow,
  ).toFixed(2)}%`;
  const subtitleBlendStop = `${subtitleFillValue.toFixed(2)}%`;
  const subtitleWhiteStop = `${Math.min(
    100,
    subtitleFillValue + HERO_LAYOUT.subtitleBlendWindow,
  ).toFixed(2)}%`;
  const subtitleFillStop = `${subtitleFillValue.toFixed(2)}%`;

  const subtitleBackgroundImage =
    subtitleFillValue > 0 && subtitleFillValue < 100
      ? `linear-gradient(90deg, ${COLORS.accent} 0%, ${COLORS.accent} ${subtitleAccentStop}, ${HERO_LAYOUT.subtitleBlendColor} ${subtitleBlendStop}, #fcfcfc ${subtitleWhiteStop}, #fcfcfc 100%)`
      : `linear-gradient(90deg, ${COLORS.accent} 0%, ${COLORS.accent} ${subtitleFillStop}, #fcfcfc ${subtitleFillStop}, #fcfcfc 100%)`;

  const heroWrapperHeight = isMobileLayout
    ? `calc(${HERO_LAYOUT.wrapperHeight.mobile}vh - ${TH}px)`
    : `calc(${HERO_LAYOUT.wrapperHeight.desktop}vh - ${TH}px)`;

  return {
    wrapperRef,
    heroWrapperHeight,
    subtitleBackgroundImage,
  };
}
