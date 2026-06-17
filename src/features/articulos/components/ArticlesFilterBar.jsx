import { useState } from "react";
import { ARTICLE_TOPICS } from "@/data/articulos";
import FilterOption from "@/shared/ui/FilterOption";
import { ChevronIcon } from "@/features/articulos/components/icons";

export default function ArticlesFilterBar({
  activeTopic,
  onTopicChange,
  topicCounts,
  query,
  onQueryChange,
}) {
  const [open, setOpen] = useState(false);

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
            Filtrar por tema
          </span>
          {!open && activeTopic !== "Todos" && (
            <span className="articles-filters__toggle-active">
              {activeTopic}
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
        <div
          className="articles-filters__options"
          role="group"
          aria-label="Filtrar artículos por tema"
        >
          {ARTICLE_TOPICS.map((topic) => (
            <FilterOption
              key={topic}
              name={topic}
              count={topicCounts[topic] ?? 0}
              active={activeTopic === topic}
              aria-controls="articles-results"
              onClick={() => onTopicChange(topic)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
