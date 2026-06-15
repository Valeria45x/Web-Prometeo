import AppRoutes from "./app/routes";
import AccessibilityWidget from "./components/a11y/AccessibilityWidget";
import CookieConsent from "./components/cookies/CookieConsent";
import { useLenisSmoothScroll } from "./hooks/useLenisSmoothScroll";

export default function App() {
  useLenisSmoothScroll();

  return (
    <>
      <AppRoutes />
      <AccessibilityWidget />
      <CookieConsent />
    </>
  );
}
