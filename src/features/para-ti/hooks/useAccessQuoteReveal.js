import { useEffect, useRef } from "react";
import { clamp } from "@/lib/math";
import { ACCESS_QUOTE_LINES } from "@/features/para-ti/para-ti.content";

/**
 * Revela palabra a palabra la cita de "Los caminos" según entra en pantalla.
 * Devuelve la ref del titular y la ref-array de palabras (a poblar en el render).
 */
export function useAccessQuoteReveal() {
  const accessHeadingRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = null;

    function update() {
      frameId = null;
      const heading = accessHeadingRef.current;
      if (!heading) return;

      if (reducedMotion.matches) {
        wordsRef.current.forEach((word) => {
          word?.style.setProperty("--para-ti-quote-word-progress", "100%");
        });
        return;
      }

      const lines = heading.querySelectorAll(".para-ti-access__quote-line");
      const start = window.innerHeight * 0.9;
      const end = window.innerHeight * 0.1;

      lines.forEach((line, lineIndex) => {
        const rect = line.getBoundingClientRect();
        const lineProgress = clamp((start - rect.top) / (start - end), 0, 1);
        const words = ACCESS_QUOTE_LINES[lineIndex];
        const lineOffset = ACCESS_QUOTE_LINES.slice(0, lineIndex).reduce(
          (total, lineWords) => total + lineWords.length,
          0,
        );

        words.forEach((_, wordIndex) => {
          const word = wordsRef.current[lineOffset + wordIndex];
          const wordProgress = clamp(lineProgress * words.length - wordIndex, 0, 1);
          word?.style.setProperty(
            "--para-ti-quote-word-progress",
            `${wordProgress >= 0.999 ? 100 : wordProgress * 100}%`,
          );
        });
      });
    }

    function scheduleUpdate() {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return { accessHeadingRef, wordsRef };
}
