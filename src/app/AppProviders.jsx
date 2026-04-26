import { BrowserRouter } from "react-router-dom";
import { ComunidadProvider } from "../context/ComunidadContext";
import { TiendaProvider } from "../context/TiendaContext";
import RouteScrollManager from "./RouteScrollManager";

export default function AppProviders({ children }) {
  return (
    <ComunidadProvider>
      <TiendaProvider>
        <BrowserRouter>
          <RouteScrollManager />
          {children}
        </BrowserRouter>
      </TiendaProvider>
    </ComunidadProvider>
  );
}
