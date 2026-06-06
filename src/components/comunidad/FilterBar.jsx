import { useState } from "react";
import FilterModal from "./FilterModal";

function FilterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M7 12h10" />
      <path d="M10 17h4" />
    </svg>
  );
}

export default function FilterBar({ activeTags = [], onTagsChange, stickyTop }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={[
          "community-filters",
          activeTags.length > 1 && "community-filters--has-clear",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ "--community-filter-top": `${stickyTop}px` }}
      >
        <button
          type="button"
          className="community-filters__toggle"
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
        >
          <span>Filtrar por tema</span>
          <span className="community-filters__toggle-icon">
            <FilterIcon />
          </span>
        </button>

        <div className="community-filters__selection" aria-live="polite">
          {activeTags.length > 0 ? (
            activeTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="community-filters__tag"
                onClick={() =>
                  onTagsChange(
                    activeTags.filter((activeTag) => activeTag !== tag),
                  )
                }
                aria-label={`Quitar filtro ${tag}`}
              >
                <span>{tag}</span>
                <span aria-hidden="true">×</span>
              </button>
            ))
          ) : (
            <span className="community-filters__all">Todos los temas</span>
          )}
        </div>

        {activeTags.length > 1 ? (
          <button
            type="button"
            className="community-filters__clear"
            onClick={() => onTagsChange([])}
          >
            Limpiar filtros
          </button>
        ) : null}
      </div>

      {open ? (
        <FilterModal
          activeTags={activeTags}
          onTagsChange={onTagsChange}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
