import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import Landing      from "./pages/Landing";
import Certificacion from "./pages/Certificacion";
import Tienda       from "./pages/Tienda";
import Articulos    from "./pages/Articulos";
import Contacto     from "./pages/Contacto";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

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
