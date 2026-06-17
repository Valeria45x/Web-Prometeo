import { useState } from "react";
import { ARTICLE_TOPICS } from "@/data/articulos";
import FilterOption from "@/shared/ui/FilterOption";
import { ChevronIcon } from "@/features/articulos/components/icons";

const TOPICS = ARTICLE_TOPICS.filter((topic) => topic !== "Todos");

const SORT_OPTIONS = [
  { id: "newest", label: "Más recientes" },
  { id: "oldest", label: "Más antiguos" },
];

export default function ArticlesFilterBar({
  selectedTopics,
  onToggleTopic,
  onClearFilters,
  topicCounts,
  sortOrder,
  onSortChange,
  query,
  onQueryChange,
}) {
  const [open, setOpen] = useState(false);
  const hasActiveTopics = selectedTopics.length > 0;

  return (
    <div className="articles-filters">
      {/* Búsqueda + botón de filtrar al mismo nivel. */}
      <div className="articles-filters__controls">
        <label className="articles-search" htmlFor="articles-search">
          <span className="articles-search__label">Buscar artículos</span>
          <span className="articles-search__field">
            <input
              id="articles-search"
              name="articles-search"
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Buscar por título, tema o contenido"
              autoComplete="off"
              aria-controls="articles-results"
            />
            {query ? (
              <button
                type="button"
                onClick={() => onQueryChange("")}
                aria-label="Limpiar búsqueda"
              >
                Limpiar
              </button>
            ) : null}
          </span>
        </label>

        <button
          type="button"
          className="articles-filters__toggle"
          aria-expanded={open}
          aria-controls="articles-filters-body"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="articles-filters__toggle-label">
            Filtrar y ordenar
          </span>
          {!open && hasActiveTopics && (
            <span className="articles-filters__toggle-active">
              {selectedTopics.length}
            </span>
          )}
          <span
            className={[
              "articles-filters__toggle-icon",
              open && "articles-filters__toggle-icon--open",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <ChevronIcon />
          </span>
        </button>
      </div>

      <div
        id="articles-filters-body"
        className={[
          "articles-filters__body",
          !open && "articles-filters__body--collapsed",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="articles-filters__panel">
          <div className="articles-filters__panel-head">
            <div className="articles-filters__panel-heading">
              <p
                id="articles-filter-heading"
                className="articles-filters__panel-title"
              >
                Filtrar y ordenar
              </p>
              <p className="articles-filters__guide">
                Combina temas y elige el orden. Puedes seleccionar varios temas
                a la vez.
              </p>
            </div>

            {hasActiveTopics ? (
              <button
                type="button"
                className="articles-filters__clear"
                onClick={onClearFilters}
              >
                Limpiar filtros
              </button>
            ) : null}
          </div>

          <div className="articles-filters__groups">
            {/* Grupo: temas (multi-selección) */}
            <div className="articles-filters__group articles-filters__group--topics">
              <p
                className="articles-filters__group-title"
                id="articles-filter-topics"
              >
                Tema
              </p>
              <div
                className="articles-filters__options"
                role="group"
                aria-labelledby="articles-filter-topics"
              >
                {TOPICS.map((topic) => (
                  <FilterOption
                    key={topic}
                    name={topic}
                    count={topicCounts[topic] ?? 0}
                    active={selectedTopics.includes(topic)}
                    aria-controls="articles-results"
                    onClick={() => onToggleTopic(topic)}
                  />
                ))}
              </div>
            </div>

            {/* Grupo: orden por fecha */}
            <div className="articles-filters__group articles-filters__group--sort">
              <p
                className="articles-filters__group-title"
                id="articles-filter-sort"
              >
                Orden
              </p>
              <div
                className="articles-filters__options"
                role="group"
                aria-labelledby="articles-filter-sort"
              >
                {SORT_OPTIONS.map((option) => (
                  <FilterOption
                    key={option.id}
                    name={option.label}
                    active={sortOrder === option.id}
                    aria-controls="articles-results"
                    onClick={() => onSortChange(option.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
