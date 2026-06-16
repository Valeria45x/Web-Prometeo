import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Importadores por ruta: cada chunk se descarga bajo demanda (code-splitting).
const importers = {
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
};

const Landing = lazy(importers.landing);
const SobrePrometeo = lazy(importers.sobre);
const ParaTi = lazy(importers.paraTi);
const Empresas = lazy(importers.empresas);
const Registro = lazy(importers.registro);
const Certificacion = lazy(importers.certificacion);
const Tienda = lazy(importers.tienda);
const TiendaProducto = lazy(importers.tiendaProducto);
const Articulos = lazy(importers.articulos);
const Contacto = lazy(importers.contacto);
const Comunidad = lazy(importers.comunidad);
const ComunidadDetalle = lazy(importers.comunidadDetalle);
const Perfil = lazy(importers.perfil);
const Legal = lazy(importers.legal);

// Precarga en segundo plano (idle) las rutas más probables, para que la primera
// navegación se sienta instantánea sin penalizar la carga inicial.
export function prefetchPrimaryRoutes() {
  importers.paraTi();
  importers.empresas();
  importers.certificacion();
}

const APP_ROUTES = [
  { path: "/", element: <Landing /> },
  { path: "/sobre-prometeo", element: <SobrePrometeo /> },
  { path: "/para-ti", element: <ParaTi /> },
  { path: "/empresas", element: <Empresas /> },
  { path: "/empresas/registro", element: <Registro /> },
  { path: "/certificacion", element: <Certificacion /> },
  { path: "/tienda", element: <Tienda /> },
  { path: "/tienda/:id", element: <TiendaProducto /> },
  { path: "/articulos", element: <Articulos /> },
  { path: "/contacto", element: <Contacto /> },
  { path: "/comunidad", element: <Comunidad /> },
  { path: "/comunidad/:id", element: <ComunidadDetalle /> },
  { path: "/perfil", element: <Perfil /> },
  { path: "/legal/:slug", element: <Legal /> },
];

export default function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {APP_ROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
}
