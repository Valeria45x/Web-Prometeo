import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import ParaTi from "../pages/ParaTi";
import Empresas from "../pages/Empresas";
import Certificacion from "../pages/Certificacion";
import Tienda from "../pages/Tienda";
import TiendaProducto from "../pages/TiendaProducto";
import Articulos from "../pages/Articulos";
import Contacto from "../pages/Contacto";
import Comunidad from "../pages/Comunidad";
import ComunidadDetalle from "../pages/ComunidadDetalle";
import Perfil from "../pages/Perfil";
import Legal from "../pages/Legal";
import SobrePrometeo from "../pages/SobrePrometeo";
import Registro from "../pages/Registro";

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
  {
    path: "/comunidad/:id",
    element: <ComunidadDetalle />,
  },
  { path: "/perfil", element: <Perfil /> },
  { path: "/legal/:slug", element: <Legal /> },
];

export default function AppRoutes() {
  return (
    <Routes>
      {APP_ROUTES.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
