import { useEffect, useState } from "react";

function isElementOutsideViewport(element) {
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight || 0;
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth || 0;

  if (!viewportHeight || !viewportWidth) return false;
  if (rect.width === 0 && rect.height === 0) return false;

  return (
    rect.bottom <= 0 ||
    rect.right <= 0 ||
    rect.left >= viewportWidth ||
    rect.top >= viewportHeight
  );
}

export function useLandingTransitionScramble(sectionRef) {
  const [scrambleActive, setScrambleActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.85) {
          setScrambleActive(true);
        } else if (isElementOutsideViewport(section)) {
          setScrambleActive(false);
        }
      },
      { threshold: [0, 0.85, 1] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef]);

  return scrambleActive;
}
