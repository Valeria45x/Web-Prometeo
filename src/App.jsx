import { useEffect } from "react";
import {
  prefetchPrimaryRoutes,
  prefetchRouteByPath,
} from "@/app/routePrefetch";
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

  // Precarga el chunk de una ruta al pasar el ratón o enfocar su enlace, para
  // que el clic se sienta instantáneo. Un único listener delegado en el
  // documento, sin tocar cada enlace.
  useEffect(() => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");

    const handlePrefetch = (event) => {
      const anchor = event.target.closest?.("a[href]");
      if (!anchor) return;

      let url;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      let path = url.pathname;
      if (base && path.startsWith(base)) path = path.slice(base.length) || "/";
      prefetchRouteByPath(path);
    };

    document.addEventListener("pointerover", handlePrefetch);
    document.addEventListener("focusin", handlePrefetch);
    return () => {
      document.removeEventListener("pointerover", handlePrefetch);
      document.removeEventListener("focusin", handlePrefetch);
    };
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
