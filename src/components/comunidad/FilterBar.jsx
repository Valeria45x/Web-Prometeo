import { useState } from "react";
import { TAGS } from "../../data/comunidad";

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function FilterBar({ activeTags = [], onTagsChange, stickyTop }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="community-filters"
      style={{ "--community-filter-top": `${stickyTop}px` }}
    >
      <button
        type="button"
        className="community-filters__toggle"
        aria-expanded={open}
        aria-controls="community-filters-body"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="community-filters__toggle-label">
          Filtrar por tema
        </span>
        {!open && activeTags.length > 0 && (
          <span className="community-filters__toggle-active">
            {activeTags.length === 1 ? activeTags[0] : `${activeTags.length} temas`}
          </span>
        )}
        <span
          className={[
            "community-filters__toggle-icon",
            open && "community-filters__toggle-icon--open",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <ChevronIcon />
        </span>
      </button>

      <div
        id="community-filters-body"
        className={[
          "community-filters__body",
          !open && "community-filters__body--collapsed",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          className="community-filters__options"
          role="group"
          aria-label="Filtrar por tema"
        >
          <button
            type="button"
            className={[
              "community-filter",
              activeTags.length === 0 && "community-filter--active",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-pressed={activeTags.length === 0}
            onClick={() => onTagsChange([])}
          >
            <span className="community-filter__name">Ver todos</span>
          </button>

          {TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className={[
                "community-filter",
                activeTags.includes(tag) && "community-filter--active",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={activeTags.includes(tag)}
              onClick={() =>
                onTagsChange(
                  activeTags.includes(tag)
                    ? activeTags.filter((t) => t !== tag)
                    : [...activeTags, tag],
                )
              }
            >
              <span className="community-filter__name">{tag}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
