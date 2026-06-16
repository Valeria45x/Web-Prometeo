import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "@/app/routes";
import ErrorBoundary from "@/app/ErrorBoundary";
import { getLenisInstance, scrollToTopImmediate } from "@/lib/lenis";
import "@/shared/components/page-transition.css";

// Coordina la transición entre páginas para que el orden sea correcto:
// cubrir (con la página vieja todavía visible) → intercambiar la ruta mientras
// está cubierto → revelar la página nueva. Render con una `location` retrasada.
const COVER_MS = 660;
const REVEAL_MS = 660;

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

function applyScroll(loc) {
  if (loc.state?.preserveScroll) return;

  if (loc.hash) {
    // El destino puede montarse después de este efecto: reintenta en el
    // siguiente frame antes de rendirse y volver arriba.
    if (scrollToHash(loc.hash)) return;
    window.requestAnimationFrame(() => {
      if (!scrollToHash(loc.hash)) scrollToTopImmediate();
    });
    return;
  }

  scrollToTopImmediate();
}

export default function RouteTransition() {
  const location = useLocation();
  const [displayed, setDisplayed] = useState(location);
  const [phase, setPhase] = useState("idle"); // idle | cover | reveal
  const isFirst = useRef(true);

  // El scroll se aplica cuando cambia la página MOSTRADA (ya cubierta por la
  // cortina), no cuando cambia la ruta real: así el usuario nunca ve saltar la
  // página anterior arriba antes de que pase la transición.
  useLayoutEffect(() => {
    applyScroll(displayed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayed.key]);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    // Cambio de query/hash en la misma página: actualiza sin transición.
    if (location.pathname === displayed.pathname) {
      setDisplayed(location);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(location);
      return;
    }
    setPhase("cover");
  }, [location, displayed.pathname]);

  // Cubierto: intercambia la página (oculta) y pasa a revelar.
  useEffect(() => {
    if (phase !== "cover") return undefined;
    const t = setTimeout(() => {
      setDisplayed(location);
      setPhase("reveal");
    }, COVER_MS);
    return () => clearTimeout(t);
  }, [phase, location]);

  useEffect(() => {
    if (phase !== "reveal") return undefined;
    const t = setTimeout(() => setPhase("idle"), REVEAL_MS);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <>
      <ErrorBoundary key={displayed.pathname}>
        <AppRoutes location={displayed} />
      </ErrorBoundary>
      {phase !== "idle" ? (
        <div
          className={`page-transition page-transition--${phase}`}
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}
