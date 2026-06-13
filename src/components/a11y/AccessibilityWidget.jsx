import { useEffect, useId, useRef, useState } from "react";
import { useAccessibility } from "../../context/AccessibilityContext";
import "./accessibility.css";

const OPTIONS = [
  {
    key: "reduceMotion",
    label: "Reducir movimiento",
    description: "Desactiva animaciones y efectos de scroll.",
  },
  {
    key: "largeText",
    label: "Texto más grande",
    description: "Aumenta el tamaño del texto de lectura.",
  },
  {
    key: "highContrast",
    label: "Más contraste",
    description: "Refuerza bordes, foco y elementos tenues.",
  },
  {
    key: "underlineLinks",
    label: "Subrayar enlaces",
    description: "Marca los enlaces sin depender del color.",
  },
];

function AccessibilityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="4" r="1.4" fill="currentColor" stroke="none" />
      <path d="M4 8h16" />
      <path d="M9 8l-.8 6" />
      <path d="M15 8l.8 6" />
      <path d="M12 8v4" />
      <path d="M12 12l-2.4 6" />
      <path d="M12 12l2.4 6" />
    </svg>
  );
}

export default function AccessibilityWidget() {
  const { settings, toggle, reset } = useAccessibility();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    function handlePointerDown(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [open]);

  const activeCount = Object.values(settings).filter(Boolean).length;

  return (
    <div className="a11y-widget" ref={containerRef}>
      {open ? (
        <div
          className="a11y-panel"
          role="dialog"
          aria-label="Opciones de accesibilidad"
          id={panelId}
        >
          <div className="a11y-panel__header">
            <span className="a11y-panel__title">Accesibilidad</span>
            <button
              type="button"
              className="a11y-panel__close"
              onClick={() => setOpen(false)}
              aria-label="Cerrar opciones de accesibilidad"
            >
              ×
            </button>
          </div>

          <ul className="a11y-panel__list">
            {OPTIONS.map((option) => {
              const checked = settings[option.key];
              return (
                <li key={option.key}>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    className={`a11y-option${checked ? " a11y-option--on" : ""}`}
                    onClick={() => toggle(option.key)}
                  >
                    <span className="a11y-option__text">
                      <span className="a11y-option__label">{option.label}</span>
                      <span className="a11y-option__desc">
                        {option.description}
                      </span>
                    </span>
                    <span className="a11y-option__track" aria-hidden="true">
                      <span className="a11y-option__thumb" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="a11y-panel__reset"
            onClick={reset}
            disabled={activeCount === 0}
          >
            Restablecer
          </button>
        </div>
      ) : null}

      <button
        type="button"
        className="a11y-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={
          activeCount > 0
            ? `Opciones de accesibilidad, ${activeCount} activas`
            : "Opciones de accesibilidad"
        }
        onClick={() => setOpen((value) => !value)}
      >
        <AccessibilityIcon />
        {activeCount > 0 ? (
          <span className="a11y-toggle__badge" aria-hidden="true">
            {activeCount}
          </span>
        ) : null}
      </button>
    </div>
  );
}
