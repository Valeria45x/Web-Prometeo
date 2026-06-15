import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "prometeo-a11y";

const DEFAULT_SETTINGS = {
  reduceMotion: false,
  largeText: false,
  highContrast: false,
  underlineLinks: false,
};

const AccessibilityContext = createContext(null);

function readStoredSettings() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getInitialSettings() {
  const stored = readStoredSettings();
  if (stored) return { ...DEFAULT_SETTINGS, ...stored };

  const prefersReduced =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return { ...DEFAULT_SETTINGS, reduceMotion: Boolean(prefersReduced) };
}

export function AccessibilityProvider({ children }) {
  const [settings, setSettings] = useState(getInitialSettings);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.a11yMotion = settings.reduceMotion ? "reduce" : "full";
    root.dataset.a11yText = settings.largeText ? "large" : "normal";
    root.dataset.a11yContrast = settings.highContrast ? "high" : "normal";
    root.dataset.a11yUnderline = settings.underlineLinks ? "on" : "off";

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Persistence is best-effort; the settings still apply this session.
    }
  }, [settings]);

  const value = useMemo(
    () => ({
      settings,
      toggle: (key) =>
        setSettings((current) => ({ ...current, [key]: !current[key] })),
      reset: () => setSettings(DEFAULT_SETTINGS),
    }),
    [settings],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility debe usarse dentro de AccessibilityProvider",
    );
  }
  return context;
}
