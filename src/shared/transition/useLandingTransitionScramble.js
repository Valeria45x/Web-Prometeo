import { useEffect, useState } from "react";

export function useLandingTransitionScramble(sectionRef) {
  const [scrambleActive, setScrambleActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.85) {
          // Reveal once: se activa la primera vez que la sección está en pantalla
          // y deja de observar, para no repetir el scramble al volver a pasar.
          setScrambleActive(true);
          observer.disconnect();
        }
      },
      { threshold: [0, 0.85, 1] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef]);

  return scrambleActive;
}
