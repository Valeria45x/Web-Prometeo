import { useEffect } from "react";
import { prefetchPrimaryRoutes } from "@/app/routes";
import RouteTransition from "@/app/RouteTransition";
import RouteTitle from "@/app/RouteTitle";
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
      <RouteTitle />
      <RouteTransition />
      <GridCursorTrail />
      <AccessibilityWidget />
      <CookieConsent />
    </>
  );
}
