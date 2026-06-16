import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import AppProviders from "@/app/AppProviders";
import "@/assets/fonts/fonts.css";
import "@/index.css";
import "@/design/system.css";

// Desactiva la restauración de scroll del navegador: la gestionamos nosotros en
// RouteTransition (al volver con Atrás restauramos la posición ya cubierta por la
// cortina). Sin esto, el navegador salta el scroll de la página actual antes de
// que pase la transición.
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
