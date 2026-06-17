import { useEffect, useId, useState } from "react";
import "@/shared/cookies/cookie-consent.css";

/**
 * Ventana de cookies de demostración para Prometeo.
 *
 * Cumple a propósito el propio Estándar Prometeo: aceptar y rechazar tienen el
 * mismo peso visual, el consentimiento es granular y rechazar cuesta lo mismo
 * que aceptar (sin dark patterns). Incluye el sello como señal de confianza
 * neutral (no como incentivo para aceptar) y enlazado a verificación pública.
 *
 * Los datos son ilustrativos para el TFG; la elección se guarda en localStorage
 * solo para que el banner no reaparezca durante la navegación.
 */

const STORAGE_KEY = "prometeo-cookie-consent";
const OPEN_EVENT = "prometeo:open-cookie-consent";

/**
 * Vuelve a mostrar la ventana de cookies. Útil en la demo (p. ej. desde el
 * perfil): borra la decisión guardada y avisa al banner para que reaparezca.
 */
export function openCookieConsent() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* almacenamiento no disponible */
  }
  window.dispatchEvent(new Event(OPEN_EVENT));
}

const CATEGORIES = [
  {
    key: "necesarias",
    title: "Necesarias",
    description: "Imprescindibles para que la web funcione. Siempre activas.",
    locked: true,
  },
  {
    key: "analiticas",
    title: "Analíticas",
    description: "Nos ayudan a entender el uso de la web de forma agregada.",
    locked: false,
  },
  {
    key: "personalizacion",
    title: "Personalización",
    description: "Recuerdan tus preferencias para adaptar la experiencia.",
    locked: false,
  },
];

function hasStoredDecision() {
  try {
    return Boolean(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
}

function storeDecision(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* almacenamiento no disponible: la decisión solo dura esta sesión */
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState({
    necesarias: true,
    analiticas: false,
    personalizacion: false,
  });
  const panelId = useId();

  useEffect(() => {
    if (!hasStoredDecision()) setVisible(true);
  }, []);

  useEffect(() => {
    function handleOpen() {
      setShowPreferences(false);
      setPrefs({ necesarias: true, analiticas: false, personalizacion: false });
      setVisible(true);
    }
    window.addEventListener(OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_EVENT, handleOpen);
  }, []);

  if (!visible) return null;

  function decide(value) {
    storeDecision({ ...value, fecha: new Date().toISOString() });
    setVisible(false);
  }

  const acceptAll = () =>
    decide({ necesarias: true, analiticas: true, personalizacion: true });
  const rejectAll = () =>
    decide({ necesarias: true, analiticas: false, personalizacion: false });
  const savePreferences = () => decide(prefs);

  function togglePref(key) {
    setPrefs((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <div className="cookie-consent__overlay">
      <div
        className="cookie-consent"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${panelId}-title`}
        aria-describedby={`${panelId}-desc`}
      >
        {/* Sello de confianza: señal neutral, no incentivo para aceptar. */}
        <div className="cookie-consent__seal">
          {/* PLACEHOLDER: sustituir por el SVG/PNG del sello Prometeo. */}
          <span className="cookie-consent__seal-mark" aria-hidden="true">
            Sello
          </span>
          <span className="cookie-consent__seal-copy">
            Esta web cumple el Estándar Prometeo.
          </span>
        </div>

        <div className="cookie-consent__body">
          <h2 id={`${panelId}-title`} className="cookie-consent__title">
            Tú decides sobre tus cookies
          </h2>
          <p id={`${panelId}-desc`} className="cookie-consent__text">
            Usamos cookies para que la web funcione y, si quieres, para
            entenderla mejor. Aceptar y rechazar cuestan lo mismo.
          </p>

          {showPreferences ? (
            <ul className="cookie-consent__categories">
              {CATEGORIES.map((category) => {
                const checked = prefs[category.key];
                return (
                  <li key={category.key} className="cookie-consent__category">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={checked}
                      disabled={category.locked}
                      className={`cookie-consent__switch${
                        checked ? " cookie-consent__switch--on" : ""
                      }`}
                      onClick={() => togglePref(category.key)}
                    >
                      <span className="cookie-consent__switch-text">
                        <span className="cookie-consent__switch-title">
                          {category.title}
                        </span>
                        <span className="cookie-consent__switch-desc">
                          {category.description}
                        </span>
                      </span>
                      <span
                        className="cookie-consent__switch-track"
                        aria-hidden="true"
                      >
                        <span className="cookie-consent__switch-thumb" />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div className="cookie-consent__actions">
          {showPreferences ? (
            <button
              type="button"
              className="cookie-consent__btn"
              onClick={savePreferences}
            >
              Guardar selección
            </button>
          ) : (
            <button
              type="button"
              className="cookie-consent__btn cookie-consent__btn--ghost"
              onClick={() => setShowPreferences(true)}
            >
              Preferencias
            </button>
          )}
          <div className="cookie-consent__decisions">
            <button
              type="button"
              className="cookie-consent__btn"
              onClick={rejectAll}
            >
              Rechazar
            </button>
            <button
              type="button"
              className="cookie-consent__btn"
              onClick={acceptAll}
            >
              Aceptar
            </button>
          </div>
        </div>

        <p className="cookie-consent__note">
          Demostración ilustrativa para el proyecto Prometeo.
        </p>
      </div>
    </div>
  );
}
