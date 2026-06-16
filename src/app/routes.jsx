import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { importers } from "@/app/routePrefetch";

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
const NotFound = lazy(importers.notFound);

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
  { path: "*", element: <NotFound /> },
];

export default function AppRoutes({ location }) {
  return (
    <Suspense fallback={null}>
      <Routes location={location}>
        {APP_ROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
}
