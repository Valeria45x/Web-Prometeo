import { useRef } from "react";
import { getLenisInstance } from "@/lib/lenis";

/**
 * Maneja el stack de pasos del proceso: guarda anclas por paso y desplaza
 * la vista al paso pulsado, respetando la altura del topbar.
 */
export function useStepStack() {
  const stepAnchorsRef = useRef([]);

  function revealStep(index) {
    const anchor = stepAnchorsRef.current[index];
    if (!anchor) return;

    const rootStyles = window.getComputedStyle(document.documentElement);
    const topbarHeight =
      Number.parseFloat(
        rootStyles.getPropertyValue("--prometeo-topbar-height"),
      ) || 64;
    const stackTab =
      Number.parseFloat(rootStyles.getPropertyValue("--s64")) || 64;
    const cardOffset = topbarHeight + index * stackTab;
    const target =
      window.scrollY + anchor.getBoundingClientRect().top - cardOffset;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lenis = getLenisInstance();

    if (lenis) {
      lenis.scrollTo(target, {
        duration: reducedMotion ? 0 : 0.9,
        immediate: reducedMotion,
        force: true,
      });
      return;
    }

    window.scrollTo({
      top: target,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  return { stepAnchorsRef, revealStep };
}
