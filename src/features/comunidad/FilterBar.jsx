import { useState } from "react";
import { TAGS } from "@/data/comunidad";
import FilterOption from "@/shared/ui/FilterOption";

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
          <FilterOption
            name="Ver todos"
            active={activeTags.length === 0}
            onClick={() => onTagsChange([])}
          />

          {TAGS.map((tag) => (
            <FilterOption
              key={tag}
              name={tag}
              active={activeTags.includes(tag)}
              onClick={() =>
                onTagsChange(
                  activeTags.includes(tag)
                    ? activeTags.filter((t) => t !== tag)
                    : [...activeTags, tag],
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
