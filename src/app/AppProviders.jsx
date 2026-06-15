import { BrowserRouter } from "react-router-dom";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { ComunidadProvider } from "@/context/ComunidadContext";
import { TiendaProvider } from "@/context/TiendaContext";
import RouteScrollManager from "@/app/RouteScrollManager";

export default function AppProviders({ children }) {
  return (
    <AccessibilityProvider>
      <ComunidadProvider>
        <TiendaProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <RouteScrollManager />
            {children}
          </BrowserRouter>
        </TiendaProvider>
      </ComunidadProvider>
    </AccessibilityProvider>
  );
}
