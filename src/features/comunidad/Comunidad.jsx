import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";
import { Page } from "@/shared/layout/Page";
import AuthModal from "@/features/comunidad/components/AuthModal";
import CommunityFeed from "@/features/comunidad/components/CommunityFeed";
import CommunityHero from "@/features/comunidad/components/CommunityHero";
import CommunityParticipation from "@/features/comunidad/components/CommunityParticipation";
import NewPostOverlay from "@/features/comunidad/components/NewPostOverlay";
import TransitionSection from "@/shared/transition/TransitionSection";
import FilterOption from "@/shared/ui/FilterOption";
import Pagination from "@/shared/ui/Pagination";
import { useComunidad } from "@/context/ComunidadContext";
import { TAGS } from "@/data/comunidad";
import "@/shared/styles/scrollTextReveal.css";

const POSTS_PER_PAGE = 10;
const SORT_OPTIONS = [
  { id: "reciente", label: "Mas recientes" },
  { id: "actividad", label: "Mas actividad" },
];

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

function parseTagsParam(value) {
  if (!value) return [];
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => TAGS.includes(tag));
}

function CommunityToolbar({
  query,
  onQueryChange,
  onClearQuery,
  sort,
  onSortChange,
  resultCount,
}) {
  return (
    <div className="community-toolbar">
      <div className="community-toolbar__heading">
        <div>
          <h2>Buscar conversaciones</h2>
        </div>
        <span className="community-toolbar__count">
          <strong>{resultCount}</strong>{" "}
          {resultCount === 1 ? "conversación" : "conversaciones"}
        </span>
      </div>

      <div className="community-toolbar__tools">
        <label className="community-search" htmlFor="community-search">
          <span className="community-search__label">Buscar</span>
          <span className="community-search__field">
            <input
              id="community-search"
              name="community-search"
              type="search"
              autoComplete="off"
              placeholder="Cookies, VPN, redes sociales..."
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
            />
            {query ? (
              <button type="button" onClick={onClearQuery}>
                Limpiar
              </button>
            ) : null}
          </span>
        </label>

        <label className="community-toolbar__sort">
          <span>Ordenar</span>
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
          >
            <option value="reciente">Más recientes</option>
            <option value="actividad">Más actividad</option>
          </select>
        </label>
      </div>
    </div>
  );
}

function CommunitySearchToolbar({
  query,
  onQueryChange,
  onClearQuery,
  sort,
  onSortChange,
  activeTags,
  onToggleTag,
  onClearFilters,
  topicCounts,
  resultCount,
}) {
  const [open, setOpen] = useState(false);
  const hasActiveTags = activeTags.length > 0;
  const hasCustomSort = sort !== "reciente";
  const activeFilterCount = activeTags.length + (hasCustomSort ? 1 : 0);

  return (
    <div className="community-toolbar">
      <div className="community-toolbar__heading">
        <div>
          <h2>Buscar conversaciones</h2>
        </div>
        <span className="community-toolbar__count">
          <strong>{resultCount}</strong>{" "}
          {resultCount === 1 ? "conversacion" : "conversaciones"}
        </span>
      </div>

      <div className="community-toolbar__tools">
        <label className="community-search" htmlFor="community-search">
          <span className="community-search__label">Buscar</span>
          <span className="community-search__field">
            <input
              id="community-search"
              name="community-search"
              type="search"
              autoComplete="off"
              placeholder="Cookies, VPN, redes sociales..."
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
            />
            {query ? (
              <button type="button" onClick={onClearQuery}>
                Limpiar
              </button>
            ) : null}
          </span>
        </label>

        <button
          type="button"
          className="community-toolbar__filter-toggle"
          aria-expanded={open}
          aria-controls="community-toolbar-filters"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="community-toolbar__filter-label">
            Filtrar y ordenar
          </span>
          {!open && activeFilterCount > 0 ? (
            <span className="community-toolbar__filter-active">
              {activeFilterCount}
            </span>
          ) : null}
          <span
            className={[
              "community-toolbar__filter-icon",
              open && "community-toolbar__filter-icon--open",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <ChevronIcon />
          </span>
        </button>
      </div>

      <div
        id="community-toolbar-filters"
        className={[
          "community-toolbar__filters",
          !open && "community-toolbar__filters--collapsed",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="community-toolbar__filters-panel">
          <div className="community-toolbar__filters-head">
            <div className="community-toolbar__filters-heading">
              <p className="community-toolbar__filters-title">
                Filtrar y ordenar
              </p>
              <p className="community-toolbar__filters-guide">
                Combina temas de comunidad y elige como quieres ordenar los
                hilos.
              </p>
            </div>

            {hasActiveTags || hasCustomSort ? (
              <button
                type="button"
                className="community-toolbar__filters-clear"
                onClick={onClearFilters}
              >
                Limpiar filtros
              </button>
            ) : null}
          </div>

          <div className="community-toolbar__filter-groups">
            <div className="community-toolbar__filter-group">
              <p
                className="community-toolbar__filter-title"
                id="community-filter-topics"
              >
                Tema
              </p>
              <div
                className="community-toolbar__filter-options"
                role="group"
                aria-labelledby="community-filter-topics"
              >
                {TAGS.map((tag) => (
                  <FilterOption
                    key={tag}
                    name={tag}
                    count={topicCounts[tag] ?? 0}
                    active={activeTags.includes(tag)}
                    aria-controls="community-results"
                    onClick={() => onToggleTag(tag)}
                  />
                ))}
              </div>
            </div>

            <div className="community-toolbar__filter-group community-toolbar__filter-group--sort">
              <p
                className="community-toolbar__filter-title"
                id="community-filter-sort"
              >
                Orden
              </p>
              <div
                className="community-toolbar__filter-options"
                role="group"
                aria-labelledby="community-filter-sort"
              >
                {SORT_OPTIONS.map((option) => (
                  <FilterOption
                    key={option.id}
                    name={option.label}
                    active={sort === option.id}
                    aria-controls="community-results"
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

export default function Comunidad() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const pageRef = useRef(null);
  const resultsRef = useRef(null);
  const { currentUser, posts, replies, showAuthModal, setShowAuthModal } =
    useComunidad();

  const [activeTags, setActiveTags] = useState(() =>
    parseTagsParam(searchParams.get("tags") || searchParams.get("tag")),
  );
  const [sort, setSort] = useState(() =>
    searchParams.get("sort") === "actividad" ? "actividad" : "reciente",
  );
  const [query, setQuery] = useState(() => searchParams.get("q") || "");
  const [showNew, setShowNew] = useState(false);
  const [page, setPage] = useState(() => {
    const parsedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
    return Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  });

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const replyCounts = new Map();

    replies.forEach((reply) => {
      replyCounts.set(reply.postId, (replyCounts.get(reply.postId) ?? 0) + 1);
    });

    const matchingPosts = posts.filter((post) => {
      const matchesTag =
        activeTags.length === 0 ||
        activeTags.every((tag) => post.tags.includes(tag));
      const matchesQuery =
        !normalizedQuery ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.body.toLowerCase().includes(normalizedQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return matchesTag && matchesQuery;
    });

    if (sort === "actividad") {
      return [...matchingPosts].sort((a, b) => {
        const activityA =
          a.upvotes +
          (replyCounts.get(a.id) ?? 0) * 3 +
          (a.followerIds?.length ?? 0);
        const activityB =
          b.upvotes +
          (replyCounts.get(b.id) ?? 0) * 3 +
          (b.followerIds?.length ?? 0);
        return activityB - activityA;
      });
    }

    return [...matchingPosts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }, [activeTags, posts, query, replies, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);
  const pagedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );
  const suggestedTags = useMemo(
    () => TAGS.filter((tag) => !activeTags.includes(tag)).slice(0, 5),
    [activeTags],
  );
  const topicCounts = useMemo(() => {
    const counts = Object.fromEntries(TAGS.map((tag) => [tag, 0]));

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        if (tag in counts) counts[tag] += 1;
      });
    });

    return counts;
  }, [posts]);
  const userPostCount = currentUser
    ? posts.filter((post) => post.authorId === currentUser.id).length
    : 0;
  const userReplyCount = currentUser
    ? replies.filter((reply) => reply.authorId === currentUser.id).length
    : 0;

  useScrollTextReveal(pageRef);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  useEffect(() => {
    const nextParams = new URLSearchParams();

    if (activeTags.length > 0) nextParams.set("tags", activeTags.join(","));
    if (query) nextParams.set("q", query);
    if (sort !== "reciente") nextParams.set("sort", sort);
    if (currentPage > 1) nextParams.set("page", String(currentPage));

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, {
        replace: true,
        state: { preserveScroll: true },
      });
    }
  }, [activeTags, currentPage, query, searchParams, setSearchParams, sort]);

  useLayoutEffect(() => {
    const restoreScrollY = location.state?.restoreScrollY;
    if (typeof restoreScrollY !== "number") return undefined;

    let secondFrame = null;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        window.scrollTo({ top: restoreScrollY, left: 0, behavior: "auto" });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame !== null) window.cancelAnimationFrame(secondFrame);
    };
  }, [location.key, location.state]);

  function updateTags(nextTags) {
    setActiveTags(nextTags);
    setPage(1);
  }

  function toggleTag(tag) {
    updateTags(
      activeTags.includes(tag)
        ? activeTags.filter((activeTag) => activeTag !== tag)
        : [...activeTags, tag],
    );
  }

  function updateQuery(nextQuery) {
    setQuery(nextQuery);
    setPage(1);
  }

  function updateSort(nextSort) {
    setSort(nextSort);
    setPage(1);
  }

  function resetFilters() {
    setActiveTags([]);
    setQuery("");
    setSort("reciente");
    setPage(1);
  }

  function changePage(nextPage) {
    const boundedPage = Math.min(totalPages, Math.max(1, nextPage));
    if (boundedPage === currentPage) return;

    setPage(boundedPage);
    window.requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  return (
    <Page light>
      <div ref={pageRef} className="community-page">
        <CommunityHero />

        <div className="community-transition">
          <TransitionSection light title="La conversación" column={1} />
        </div>

        <div className="community-layout">
          <aside className="community-sidebar">
            <CommunityParticipation
              currentUser={currentUser}
              userPostCount={userPostCount}
              userReplyCount={userReplyCount}
              onOpenAuth={() => setShowAuthModal(true)}
              onOpenNewThread={() => setShowNew(true)}
            />
          </aside>

          <main
            className="community-main"
            ref={resultsRef}
            aria-label="Conversaciones de la comunidad"
          >
            <CommunitySearchToolbar
              query={query}
              onQueryChange={updateQuery}
              onClearQuery={() => updateQuery("")}
              sort={sort}
              onSortChange={updateSort}
              activeTags={activeTags}
              onToggleTag={toggleTag}
              onClearFilters={resetFilters}
              topicCounts={topicCounts}
              resultCount={filteredPosts.length}
            />

            <CommunityFeed
              posts={pagedPosts}
              query={query}
              activeTags={activeTags}
              onResetFilters={resetFilters}
              suggestedTags={suggestedTags}
              onSelectTag={(tag) => {
                updateTags([...new Set([...activeTags, tag])]);
                updateQuery("");
              }}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={changePage}
              label="Páginas de conversaciones"
            />
          </main>
        </div>
      </div>

      {showAuthModal ? (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      ) : null}
      {showNew ? (
        <NewPostOverlay
          onClose={() => setShowNew(false)}
          onCreated={() => {
            setSort("reciente");
            setPage(1);
          }}
        />
      ) : null}
    </Page>
  );
}
