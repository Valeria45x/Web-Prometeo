import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Cada ruta se carga bajo demanda (code-splitting): solo se descarga el
// chunk de la página que se visita, no toda la app de golpe.
const Landing = lazy(() => import("@/features/landing/Landing"));
const SobrePrometeo = lazy(() => import("@/features/sobre/SobrePrometeoPage"));
const ParaTi = lazy(() => import("@/features/para-ti/ParaTiPage"));
const Empresas = lazy(() => import("@/features/empresas/EmpresasPage"));
const Registro = lazy(() => import("@/features/empresas/RegistroPage"));
const Certificacion = lazy(
  () => import("@/features/certificacion/CertificacionPage"),
);
const Tienda = lazy(() => import("@/features/tienda/TiendaPage"));
const TiendaProducto = lazy(() => import("@/features/tienda/TiendaProducto"));
const Articulos = lazy(() => import("@/features/articulos/ArticulosPage"));
const Contacto = lazy(() => import("@/features/contacto/ContactoPage"));
const Comunidad = lazy(() => import("@/features/comunidad/Comunidad"));
const ComunidadDetalle = lazy(
  () => import("@/features/comunidad/ComunidadDetalle"),
);
const Perfil = lazy(() => import("@/features/perfil/PerfilPage"));
const Legal = lazy(() => import("@/features/legal/LegalPage"));

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
