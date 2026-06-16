import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "@/app/routes";
import "@/shared/components/page-transition.css";

// Coordina la transición entre páginas para que el orden sea correcto:
// cubrir (con la página vieja todavía visible) → intercambiar la ruta mientras
// está cubierto → revelar la página nueva. Render con una `location` retrasada.
const COVER_MS = 660;
const REVEAL_MS = 660;

export default function RouteTransition() {
  const location = useLocation();
  const [displayed, setDisplayed] = useState(location);
  const [phase, setPhase] = useState("idle"); // idle | cover | reveal
  const isFirst = useRef(true);

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
      <AppRoutes location={displayed} />
      {phase !== "idle" ? (
        <div
          className={`page-transition page-transition--${phase}`}
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}
