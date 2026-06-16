import { useEffect } from "react";
import AppRoutes, { prefetchPrimaryRoutes } from "@/app/routes";
import AccessibilityWidget from "@/shared/a11y/AccessibilityWidget";
import CookieConsent from "@/shared/cookies/CookieConsent";
import GridCursorTrail from "@/shared/components/GridCursorTrail";
import { useLenisSmoothScroll } from "@/hooks/useLenisSmoothScroll";

export default function App() {
  useLenisSmoothScroll();

  // Tras la carga inicial, precarga las rutas más probables cuando el navegador
  // está ocioso (con fallback a setTimeout donde no haya requestIdleCallback).
  useEffect(() => {
    const schedule =
      window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1500));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    const id = schedule(() => prefetchPrimaryRoutes());
    return () => cancel(id);
  }, []);

  return (
    <>
      <AppRoutes />
      <GridCursorTrail />
      <AccessibilityWidget />
      <CookieConsent />
    </>
  );
}
