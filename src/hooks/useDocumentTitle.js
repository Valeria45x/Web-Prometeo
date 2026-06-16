import { useEffect } from "react";

const BASE = "Prometeo";

// Fija el título de la pestaña para páginas con nombre dinámico (producto,
// artículo, hilo, página legal). Las rutas estáticas las cubre RouteTitle, así
// que sus datos no entran en el bundle principal.
export function useDocumentTitle(title) {
  useEffect(() => {
    if (!title) return;
    document.title = `${title} — ${BASE}`;
  }, [title]);
}
