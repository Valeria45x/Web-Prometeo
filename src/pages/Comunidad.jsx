import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { TH } from "../constants";
import { COLORS } from "../design/tokens";
import { useScrollTextReveal } from "../hooks/useScrollTextReveal";
import { Page } from "../components/Page";
import LandingTransitionSection from "../components/landing/transition/LandingTransitionSection";
import Label from "../components/system/Label";
import { Grid, GridCell } from "../components/system/Grid";
import AuthModal from "../components/comunidad/AuthModal";
import CommunityFeed from "../components/comunidad/CommunityFeed";
import CommunityHero from "../components/comunidad/CommunityHero";
import CommunityParticipation from "../components/comunidad/CommunityParticipation";
import FilterBar from "../components/comunidad/FilterBar";
import NewPostOverlay from "../components/comunidad/NewPostOverlay";
import { useComunidad } from "../context/ComunidadContext";
import { TAGS } from "../data/comunidad";
import "../components/landing/shared/scrollTextReveal.css";

const POSTS_PER_PAGE = 6;

function parseTagsParam(value) {
  if (!value) return [];
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => TAGS.includes(tag));
}

function CommunityExplore({
  query,
  onQueryChange,
  onClearQuery,
  sort,
  onSortChange,
  resultCount,
}) {
  return (
    <Grid
      as="section"
      columns="site"
      className="community-explore"
      aria-labelledby="community-explore-title"
    >
      <GridCell
        span={2}
        collapseSpanOnTablet
        collapseSpanOnMobile
        className="community-explore__intro"
      >
        <Label color={COLORS.accent}>Explorar la comunidad</Label>
        <h2 id="community-explore-title">
          Encuentra una conversación desde tu pregunta.
        </h2>
        <p>
          Busca una situación concreta o combina temas para acercarte a las
          experiencias que pueden ayudarte.
        </p>
      </GridCell>

      <GridCell
        span={2}
        collapseSpanOnTablet
        collapseSpanOnMobile
        className="community-explore__tools"
      >
        <label className="community-search" htmlFor="community-search">
          <span>Buscar conversaciones</span>
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

        <div className="community-explore__meta">
          <label>
            <span>Ordenar por</span>
            <select
              value={sort}
              onChange={(event) => onSortChange(event.target.value)}
            >
              <option value="reciente">Más recientes</option>
              <option value="actividad">Más actividad</option>
            </select>
          </label>
          <p>
            <strong>{resultCount}</strong>{" "}
            {resultCount === 1 ? "conversación" : "conversaciones"}
          </p>
        </div>
      </GridCell>
    </Grid>
  );
}

function CommunityPagination({ currentPage, totalPages, onPageChange }) {
  return (
    <nav className="community-pagination" aria-label="Páginas de conversaciones">
      <div className="community-pagination__inner">
        <button
          type="button"
          className="community-pagination__button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        <span className="community-pagination__status">
          <strong>{currentPage}</strong>
          <span>/ {totalPages}</span>
        </span>

        <button
          type="button"
          className="community-pagination__button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </nav>
  );
}

export default function Comunidad() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const pageRef = useRef(null);
  const resultsRef = useRef(null);
  const {
    currentUser,
    posts,
    replies,
    showAuthModal,
    setShowAuthModal,
  } = useComunidad();

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
          <LandingTransitionSection light title="La conversación" column={1} />
        </div>

        <CommunityParticipation
          currentUser={currentUser}
          userPostCount={userPostCount}
          userReplyCount={userReplyCount}
          onOpenAuth={() => setShowAuthModal(true)}
          onOpenNewThread={() => setShowNew(true)}
        />

        <section className="community-discovery">
          <CommunityExplore
            query={query}
            onQueryChange={updateQuery}
            onClearQuery={() => updateQuery("")}
            sort={sort}
            onSortChange={updateSort}
            resultCount={filteredPosts.length}
          />
          <FilterBar
            activeTags={activeTags}
            onTagsChange={updateTags}
            stickyTop={TH}
          />
        </section>

        <div className="community-transition">
          <LandingTransitionSection
            light
            title="Conversaciones abiertas"
            column={3}
          />
        </div>

        <section
          ref={resultsRef}
          className="community-library"
          aria-label="Conversaciones de la comunidad"
        >
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

          <CommunityPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        </section>


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
