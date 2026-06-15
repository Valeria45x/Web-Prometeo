import { useEffect, useId, useRef, useState } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import "@/shared/a11y/accessibility.css";

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
      width="24"
      height="24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm9 5v2h-6v13h-2v-6h-2v6H9V9H3V7h18Z" />
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
