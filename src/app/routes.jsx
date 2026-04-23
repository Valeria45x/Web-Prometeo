import { Route, Routes } from "react-router-dom";
import { ComunidadProvider } from "../context/ComunidadContext";
import Landing from "../pages/Landing";
import Certificacion from "../pages/Certificacion";
import Tienda from "../pages/Tienda";
import Articulos from "../pages/Articulos";
import Contacto from "../pages/Contacto";
import Comunidad from "../pages/Comunidad";
import ComunidadDetalle from "../pages/ComunidadDetalle";
import Sigilo from "../pages/Sigilo";
import Perfil from "../pages/Perfil";

function withComunidadProvider(element) {
  return <ComunidadProvider>{element}</ComunidadProvider>;
}

const APP_ROUTES = [
  { path: "/", element: <Landing /> },
  { path: "/certificacion", element: <Certificacion /> },
  { path: "/tienda", element: <Tienda /> },
  { path: "/articulos", element: <Articulos /> },
  { path: "/contacto", element: <Contacto /> },
  { path: "/comunidad", element: withComunidadProvider(<Comunidad />) },
  {
    path: "/comunidad/:id",
    element: withComunidadProvider(<ComunidadDetalle />),
  },
  { path: "/sigilo", element: <Sigilo /> },
  { path: "/perfil", element: withComunidadProvider(<Perfil />) },
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
