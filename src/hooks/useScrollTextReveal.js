import { useEffect } from "react";

const TEXT_SELECTOR = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  ".small-label",
  ".meta-label",
  "[data-animate-text]",
].join(",");

const SKIP_SELECTOR = [
  ".scramble-text",
  ".text-reveal",
  ".pmt-move-index",
  ".pmt-move-title",
  ".pmt-move-body",
  ".prometeo-scroll__headline",
  ".landing-hero",
  ".topbar",
  ".ds-button",
  "input",
  "textarea",
  "select",
].join(",");

function shouldRevealElement(element) {
  if (!(element instanceof HTMLElement)) return false;
  if (element.closest(SKIP_SELECTOR)) return false;
  if (element.dataset.scrollTextReveal === "true") return false;
  return element.textContent.trim().length > 0;
}

export function useScrollTextReveal(rootRef, resetKey) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observed = new Set();

    const reveal = (element) => {
      element.classList.add("scroll-text-reveal--visible");
    };

    const observer = reducedMotion.matches
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              reveal(entry.target);
              observer.unobserve(entry.target);
            });
          },
          { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
        );

    const prepare = () => {
      root.querySelectorAll(TEXT_SELECTOR).forEach((element, index) => {
        if (!shouldRevealElement(element)) return;

        element.dataset.scrollTextReveal = "true";
        element.classList.add("scroll-text-reveal");
        element.style.setProperty(
          "--scroll-text-delay",
          `${Math.min(index % 6, 5) * 45}ms`,
        );
        observed.add(element);

        if (observer) observer.observe(element);
        else reveal(element);
      });
    };

    prepare();

    // Red de seguridad para scroll rápido: el IntersectionObserver puede no
    // disparar si un elemento pasa de golpe de debajo a encima del viewport
    // (su intersección va de 0 a 0 sin cruzar el umbral). Esta comprobación por
    // scroll revela cualquier elemento que ya haya cruzado el umbral (incluido
    // el caso de haberlo pasado de largo), para que nunca se quede sin revelar.
    let safetyFrame = 0;
    const revealIfPassed = () => {
      safetyFrame = 0;
      if (!observer) return;
      const vh =
        window.innerHeight || document.documentElement.clientHeight || 0;
      observed.forEach((element) => {
        if (element.classList.contains("scroll-text-reveal--visible")) return;
        if (element.getBoundingClientRect().top <= vh * 0.9) {
          reveal(element);
          observer.unobserve(element);
        }
      });
    };
    const scheduleSafety = () => {
      if (safetyFrame) return;
      safetyFrame = window.requestAnimationFrame(revealIfPassed);
    };

    const mutationObserver = new MutationObserver(() => {
      window.requestAnimationFrame(prepare);
    });

    mutationObserver.observe(root, { childList: true, subtree: true });

    if (observer) {
      window.addEventListener("scroll", scheduleSafety, { passive: true });
      window.addEventListener("resize", scheduleSafety);
    }

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", scheduleSafety);
      window.removeEventListener("resize", scheduleSafety);
      if (safetyFrame) window.cancelAnimationFrame(safetyFrame);
      observed.forEach((element) => {
        element.classList.remove(
          "scroll-text-reveal",
          "scroll-text-reveal--visible",
        );
        element.removeAttribute("data-scroll-text-reveal");
        element.style.removeProperty("--scroll-text-delay");
      });
      observed.clear();
    };
  }, [rootRef, resetKey]);
}
