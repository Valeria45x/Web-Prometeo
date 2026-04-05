import { Routes, Route } from "react-router-dom";
import Landing      from "./pages/Landing";
import Certificacion from "./pages/Certificacion";
import Tienda       from "./pages/Tienda";
import Articulos    from "./pages/Articulos";
import Contacto     from "./pages/Contacto";

export default function App() {
  return (
    <Routes>
      <Route path="/"              element={<Landing />} />
      <Route path="/certificacion" element={<Certificacion />} />
      <Route path="/tienda"        element={<Tienda />} />
      <Route path="/articulos"     element={<Articulos />} />
      <Route path="/contacto"      element={<Contacto />} />
    </Routes>
  );
}
