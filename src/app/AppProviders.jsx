import { BrowserRouter } from "react-router-dom";
import RouteScrollManager from "./RouteScrollManager";

export default function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <RouteScrollManager />
      {children}
    </BrowserRouter>
  );
}
