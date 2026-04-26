import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Certificacion from "../pages/Certificacion";
import Tienda from "../pages/Tienda";
import TiendaProducto from "../pages/TiendaProducto";
import Articulos from "../pages/Articulos";
import Contacto from "../pages/Contacto";
import Comunidad from "../pages/Comunidad";
import ComunidadDetalle from "../pages/ComunidadDetalle";
import Sigilo from "../pages/Sigilo";
import Perfil from "../pages/Perfil";

const APP_ROUTES = [
  { path: "/", element: <Landing /> },
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
  { path: "/sigilo", element: <Sigilo /> },
  { path: "/perfil", element: <Perfil /> },
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
