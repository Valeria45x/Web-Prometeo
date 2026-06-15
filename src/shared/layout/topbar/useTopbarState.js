import { useEffect, useRef, useState } from "react";

/**
 * Estado y efectos del topbar: dropdown de escritorio, menú móvil y submenú
 * expandido. Cierra al clicar fuera, con Escape, al cambiar de ruta o al salir
 * del modo compacto, y bloquea el scroll del fondo con el menú móvil abierto.
 */
export function useTopbarState({ pathname, isCompactNav }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const navRef = useRef(null);

  const toggleDropdown = (label) =>
    setOpenDropdown((current) => (current === label ? null : label));

  // Cerrar el dropdown al clicar fuera.
  useEffect(() => {
    if (!openDropdown) return undefined;
    const handler = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openDropdown]);

  // Cerrar el dropdown con Escape.
  useEffect(() => {
    if (!openDropdown) return undefined;
    const handler = (event) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [openDropdown]);

  // Resetear todo al cambiar de ruta.
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  // Cerrar el menú móvil al pasar a escritorio.
  useEffect(() => {
    if (!isCompactNav) setMenuOpen(false);
  }, [isCompactNav]);

  // Bloquear el scroll del fondo con el menú móvil abierto.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const prev = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [menuOpen]);

  return {
    menuOpen,
    setMenuOpen,
    openDropdown,
    setOpenDropdown,
    mobileExpanded,
    setMobileExpanded,
    navRef,
    toggleDropdown,
  };
}
