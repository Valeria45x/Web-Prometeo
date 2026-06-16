import { useEffect, useState } from "react";
import "@/features/landing/components/loading-screen.css";

const SEEN_KEY = "prometeo-landing-intro";
const COLS = 4;
const SIGNATURE_COL = 2; // columna donde aparece la celda roja de firma

export default function LoadingScreen() {
  // Solo se muestra la primera vez de la sesión y si no hay reduced-motion.
  const [phase, setPhase] = useState(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return "done";
    } catch {
      /* almacenamiento no disponible */
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return "done";
    }
    return "intro";
  });

  // intro -> exit
  useEffect(() => {
    if (phase !== "intro") return undefined;
    const t = setTimeout(() => setPhase("exit"), 1700);
    return () => clearTimeout(t);
  }, [phase]);

  // exit -> done
  useEffect(() => {
    if (phase !== "exit") return undefined;
    const t = setTimeout(() => setPhase("done"), 850);
    return () => clearTimeout(t);
  }, [phase]);

  // Bloquea el scroll mientras la pantalla está visible; marca como vista al salir.
  useEffect(() => {
    if (phase === "done") {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* almacenamiento no disponible */
      }
      return undefined;
    }
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`landing-loader${phase === "exit" ? " landing-loader--exit" : ""}`}
      role="status"
      aria-label="Cargando Prometeo"
    >
      <div className="landing-loader__cols" aria-hidden="true">
        {Array.from({ length: COLS }).map((_, i) => (
          <div
            key={i}
            className="landing-loader__col"
            style={{ "--col-index": i }}
          >
            <span className="landing-loader__line" />
            {i === SIGNATURE_COL ? (
              <span className="landing-loader__signature" />
            ) : null}
          </div>
        ))}
      </div>

      <div className="landing-loader__brand" aria-hidden="true">
        <span className="landing-loader__wordmark">Prometeo</span>
      </div>
    </div>
  );
}
