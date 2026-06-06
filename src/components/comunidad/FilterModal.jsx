import { useEffect, useState } from "react";
import { TAGS } from "../../data/comunidad";

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 5 19 19" />
      <path d="M19 5 5 19" />
    </svg>
  );
}

export default function FilterModal({ activeTags = [], onTagsChange, onClose }) {
  const [pending, setPending] = useState(activeTags);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function toggleTag(tag) {
    setPending((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag],
    );
  }

  function applyFilters() {
    onTagsChange(pending);
    onClose();
  }

  return (
    <div
      className="community-modal community-filter-modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="community-modal__panel community-filter-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="community-filter-title"
      >
        <header className="community-filter-modal__header">
          <div>
            <span className="community-filter-modal__eyebrow">
              Explorar conversaciones
            </span>
            <h2 id="community-filter-title">Elige uno o varios temas</h2>
          </div>

          <button
            type="button"
            className="community-filter-modal__close"
            onClick={onClose}
            aria-label="Cerrar filtros"
          >
            <CloseIcon />
          </button>
        </header>

        <div
          className="community-filter-modal__options"
          role="group"
          aria-label="Temas de la comunidad"
        >
          {TAGS.map((tag) => {
            const selected = pending.includes(tag);

            return (
              <button
                key={tag}
                type="button"
                className={[
                  "community-filter-modal__option",
                  selected && "community-filter-modal__option--selected",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-pressed={selected}
                onClick={() => toggleTag(tag)}
              >
                <span>{tag}</span>
                <span>{selected ? "Seleccionado" : "Añadir"}</span>
              </button>
            );
          })}
        </div>

        <footer className="community-filter-modal__footer">
          <button
            type="button"
            className="community-filter-modal__reset"
            onClick={() => setPending([])}
            disabled={pending.length === 0}
          >
            Quitar selección
          </button>
          <button
            type="button"
            className="community-filter-modal__apply"
            onClick={applyFilters}
          >
            Ver conversaciones
            {pending.length > 0 ? ` (${pending.length})` : ""}
          </button>
        </footer>
      </section>
    </div>
  );
}
