import { useRef, useEffect, useState } from "react";

export function useReveal(delay = 0, once = false) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (once) {
          if (e.isIntersecting) setVis(true);
        } else setVis(e.isIntersecting);
      },
      {
        threshold: 0.04,
        rootMargin: "0px 0px -8% 0px",
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return [
    ref,
    {
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(28px)",
      transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    },
  ];
}
