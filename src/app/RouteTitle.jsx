import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE = "Prometeo";
const HOME_TITLE = `${BASE} — privacidad digital`;

// Rutas estáticas: nombre fijo de pestaña (null = título base de inicio). Las
// rutas dinámicas (producto, artículo, hilo, legal, 404) fijan su título desde
// la propia página con useDocumentTitle, para no traer sus datos al bundle
// principal solo por el título.
const STATIC_TITLES = {
  "/": null,
  "/sobre-prometeo": "Sobre Prometeo",
  "/para-ti": "Para ti",
  "/empresas": "Empresas",
  "/empresas/registro": "Registro de empresas",
  "/certificacion": "Certificación",
  "/tienda": "Tienda",
  "/contacto": "Contacto",
  "/comunidad": "Comunidad",
  "/perfil": "Tu cuenta",
};

// Actualiza el título de la pestaña al entrar en una ruta estática conocida. Sin
// esto, todas las páginas comparten el mismo título, lo que confunde al cambiar
// de pestaña o al compartir un enlace.
export default function RouteTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!(pathname in STATIC_TITLES)) return;
    const title = STATIC_TITLES[pathname];
    document.title = title ? `${title} — ${BASE}` : HOME_TITLE;
  }, [pathname]);

  return null;
}
