import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import AppRoutes from "@/app/routes";
import ErrorBoundary from "@/app/ErrorBoundary";
import { getLenisInstance, scrollToTopImmediate } from "@/lib/lenis";
import "@/shared/components/page-transition.css";

// Coordina la transición entre páginas para que el orden sea correcto:
// cubrir (con la página vieja todavía visible) → intercambiar la ruta mientras
// está cubierto → revelar la página nueva. Render con una `location` retrasada.
const COVER_MS = 660;
const REVEAL_MS = 660;
const MAIN_ID = "contenido-principal";

// Posición de scroll por entrada del historial, para restaurarla con los
// botones Atrás/Adelante (en una SPA no se restaura sola).
const scrollPositions = new Map();

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

function scrollToY(y) {
  const lenis = getLenisInstance();
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
  window.scrollTo({ top: y, left: 0, behavior: "auto" });
}

export default function RouteTransition() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const [displayed, setDisplayed] = useState(location);
  const [phase, setPhase] = useState("idle"); // idle | cover | reveal
  const isFirst = useRef(true);
  const isFirstFocus = useRef(true);
  const prevPathname = useRef(displayed.pathname);
  const navTypeRef = useRef(navigationType);
  navTypeRef.current = navigationType;

  // Scroll cuando cambia la página MOSTRADA (ya cubierta por la cortina), no
  // cuando cambia la ruta real: así el usuario nunca ve saltar la página vieja.
  useLayoutEffect(() => {
    const samePage = prevPathname.current === displayed.pathname;
    prevPathname.current = displayed.pathname;

    if (displayed.state?.preserveScroll) return;

    if (displayed.hash) {
      if (scrollToHash(displayed.hash)) return;
      window.requestAnimationFrame(() => {
        if (!scrollToHash(displayed.hash)) scrollToTopImmediate();
      });
      return;
    }

    // Cambio solo de query en la misma página (p. ej. abrir/cerrar el modal de
    // artículo o filtrar): mantener la posición de scroll.
    if (samePage) return;

    // Atrás/Adelante: volver a donde estaba el usuario en esa página.
    if (navTypeRef.current === "POP" && scrollPositions.has(displayed.key)) {
      scrollToY(scrollPositions.get(displayed.key));
      return;
    }

    scrollToTopImmediate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayed.key]);

  // Foco al contenido al cambiar de página (accesibilidad): quien navega con
  // teclado o lector de pantalla se entera de que llegó contenido nuevo. No en
  // la primera carga, para no robar el foco de inicio.
  useEffect(() => {
    if (isFirstFocus.current) {
      isFirstFocus.current = false;
      return;
    }
    const main = document.getElementById(MAIN_ID);
    main?.focus({ preventScroll: true });
  }, [displayed.pathname]);

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
    // Guarda la posición de la página que dejamos, para Atrás/Adelante.
    scrollPositions.set(displayed.key, window.scrollY);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(location);
      return;
    }
    setPhase("cover");
  }, [location, displayed.pathname, displayed.key]);

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
