import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenisInstance, scrollToTopImmediate } from "@/lib/lenis";

function scrollToHash(hash) {
  const target = document.getElementById(hash.slice(1));
  if (!target) return false;

  const topbar =
    Number.parseFloat(
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--prometeo-topbar-height"),
    ) || 64;
  const top = window.scrollY + target.getBoundingClientRect().top - topbar;
  const lenis = getLenisInstance();

  if (lenis) {
    lenis.scrollTo(top, { immediate: true, force: true });
  } else {
    window.scrollTo({ top, behavior: "auto" });
  }
  return true;
}

export default function RouteScrollManager() {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.state?.preserveScroll) return;

    if (location.hash) {
      // El destino puede montarse después de este efecto: reintenta en el
      // siguiente frame antes de rendirse y volver arriba.
      if (scrollToHash(location.hash)) return;
      const frame = window.requestAnimationFrame(() => {
        if (!scrollToHash(location.hash)) scrollToTopImmediate();
      });
      return () => window.cancelAnimationFrame(frame);
    }

    scrollToTopImmediate();
  }, [location.key, location.hash]);

  return null;
}
