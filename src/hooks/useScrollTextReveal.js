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
  ".grid-line-reveal__content",
  ".prometeo-scroll__meta-title",
  ".landing-footer__wordmark",
  ".pmt-move-index",
].join(",");

const SKIP_SELECTOR = [
  ".text-reveal",
  ".pmt-rotate-text",
  ".prometeo-scroll__headline",
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

export function useScrollTextReveal(rootRef) {
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
        element.style.setProperty("--scroll-text-delay", `${Math.min(index % 6, 5) * 45}ms`);
        observed.add(element);

        if (observer) observer.observe(element);
        else reveal(element);
      });
    };

    prepare();

    const mutationObserver = new MutationObserver(() => {
      window.requestAnimationFrame(prepare);
    });

    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
      observed.forEach((element) => {
        element.classList.remove("scroll-text-reveal", "scroll-text-reveal--visible");
        element.removeAttribute("data-scroll-text-reveal");
        element.style.removeProperty("--scroll-text-delay");
      });
      observed.clear();
    };
  }, [rootRef]);
}
