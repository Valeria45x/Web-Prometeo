// Importadores por ruta: cada chunk se descarga bajo demanda (code-splitting).
// Vive aparte del componente de rutas para no mezclar exports de componente y
// de funciones (fast-refresh) y para poder precargar sin cargar el árbol.
export const importers = {
  landing: () => import("@/features/landing/Landing"),
  sobre: () => import("@/features/sobre/SobrePrometeoPage"),
  paraTi: () => import("@/features/para-ti/ParaTiPage"),
  empresas: () => import("@/features/empresas/EmpresasPage"),
  registro: () => import("@/features/empresas/RegistroPage"),
  certificacion: () => import("@/features/certificacion/CertificacionPage"),
  tienda: () => import("@/features/tienda/TiendaPage"),
  tiendaProducto: () => import("@/features/tienda/TiendaProducto"),
  articulos: () => import("@/features/articulos/ArticulosPage"),
  contacto: () => import("@/features/contacto/ContactoPage"),
  comunidad: () => import("@/features/comunidad/Comunidad"),
  comunidadDetalle: () => import("@/features/comunidad/ComunidadDetalle"),
  perfil: () => import("@/features/perfil/PerfilPage"),
  legal: () => import("@/features/legal/LegalPage"),
  notFound: () => import("@/features/not-found/NotFoundPage"),
};

// Precarga en segundo plano (idle) las rutas más probables, para que la primera
// navegación se sienta instantánea sin penalizar la carga inicial.
export function prefetchPrimaryRoutes() {
  importers.paraTi();
  importers.empresas();
  importers.certificacion();
}

// Devuelve el importador de chunk que corresponde a una ruta (incluye las
// dinámicas por prefijo). Las más específicas van antes que las generales.
function importerForPath(pathname) {
  if (pathname === "/") return importers.landing;
  if (pathname === "/sobre-prometeo") return importers.sobre;
  if (pathname === "/para-ti") return importers.paraTi;
  if (pathname === "/empresas/registro") return importers.registro;
  if (pathname === "/empresas") return importers.empresas;
  if (pathname === "/certificacion") return importers.certificacion;
  if (pathname.startsWith("/tienda/")) return importers.tiendaProducto;
  if (pathname === "/tienda") return importers.tienda;
  if (pathname.startsWith("/articulos")) return importers.articulos;
  if (pathname === "/contacto") return importers.contacto;
  if (pathname.startsWith("/comunidad/")) return importers.comunidadDetalle;
  if (pathname === "/comunidad") return importers.comunidad;
  if (pathname.startsWith("/legal/")) return importers.legal;
  if (pathname === "/perfil") return importers.perfil;
  return null;
}

const prefetchedPaths = new Set();

// Precarga el chunk de una ruta concreta (al pasar el ratón o enfocar un
// enlace). Solo una vez por ruta; el navegador ya cachea el import.
export function prefetchRouteByPath(pathname) {
  if (prefetchedPaths.has(pathname)) return;
  const importer = importerForPath(pathname);
  if (!importer) return;
  prefetchedPaths.add(pathname);
  importer();
}
