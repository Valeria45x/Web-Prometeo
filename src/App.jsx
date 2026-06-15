import AppRoutes from "@/app/routes";
import AccessibilityWidget from "@/shared/a11y/AccessibilityWidget";
import CookieConsent from "@/shared/cookies/CookieConsent";
import { useLenisSmoothScroll } from "@/hooks/useLenisSmoothScroll";

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
