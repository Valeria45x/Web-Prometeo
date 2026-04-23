import AppRoutes from "./app/routes";
import { useLenisSmoothScroll } from "./hooks/useLenisSmoothScroll";

export default function App() {
  useLenisSmoothScroll();

  return <AppRoutes />;
}
