import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TH } from "../constants";
import { Page } from "../components/Page";
import Footer from "../components/Footer";
import AuthModal from "../components/comunidad/AuthModal";
import CommunityFeed from "../components/comunidad/CommunityFeed";
import CommunityHero from "../components/comunidad/CommunityHero";
import FilterBar from "../components/comunidad/FilterBar";
import NewPostOverlay from "../components/comunidad/NewPostOverlay";
import {
  COMMUNITY_BORDERS,
  COMMUNITY_COLORS,
  COMMUNITY_FONTS,
} from "../components/comunidad/shared";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useComunidad } from "../context/ComunidadContext";
import { TAGS } from "../data/comunidad";

const POSTS_PER_PAGE = 6;

export default function Comunidad() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    currentUser,
    posts,
    replies,
    showAuthModal,
    setShowAuthModal,
    logout,
  } = useComunidad();

  const [activeTag, setActiveTag] = useState(() => searchParams.get("tag") || null);
  const [sort, setSort] = useState(() => searchParams.get("sort") || "reciente");
  const [query, setQuery] = useState(() => searchParams.get("q") || "");
  const [showNew, setShowNew] = useState(false);
  const [page, setPage] = useState(() => {
    const parsedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
    return Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  });
  const [contentHeight, setContentHeight] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const contentRef = useRef(null);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const contentElement = contentRef.current;

    if (!contentElement) return undefined;

    const updateContentHeight = () => {
      setContentHeight(contentElement.scrollHeight);
    };

    updateContentHeight();

    const observer = new ResizeObserver(() => {
      updateContentHeight();
    });
    observer.observe(contentElement);
    return () => observer.disconnect();
  }, [isMobileLayout]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const matchingPosts = posts.filter((post) => {
      const matchesTag = activeTag ? post.tags.includes(activeTag) : true;
      const matchesQuery = normalizedQuery
        ? post.title.toLowerCase().includes(normalizedQuery) ||
          post.body.toLowerCase().includes(normalizedQuery) ||
          post.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
        : true;

      return matchesTag && matchesQuery;
    });

    if (sort === "reciente") {
      return [...matchingPosts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    }

    return matchingPosts;
  }, [activeTag, posts, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pagedPostsRaw = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );
  const isFullPage = pagedPostsRaw.length === POSTS_PER_PAGE;
  const pagedPosts = isFullPage
    ? [...pagedPostsRaw, ...Array(POSTS_PER_PAGE - pagedPostsRaw.length).fill(null)]
    : pagedPostsRaw;

  const suggestedTags = useMemo(
    () => TAGS.filter((tag) => tag !== activeTag).slice(0, 5),
    [activeTag],
  );

  const userPostCount = currentUser
    ? posts.filter((post) => post.authorId === currentUser.id).length
    : 0;

  const userReplyCount = currentUser
    ? replies.filter((reply) => reply.authorId === currentUser.id).length
    : 0;

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  useEffect(() => {
    const nextParams = new URLSearchParams();

    if (activeTag) nextParams.set("tag", activeTag);
    if (query) nextParams.set("q", query);
    if (sort !== "reciente") nextParams.set("sort", sort);
    if (currentPage > 1) nextParams.set("page", String(currentPage));

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, {
        replace: true,
        state: { preserveScroll: true },
      });
    }
  }, [activeTag, currentPage, query, searchParams, setSearchParams, sort]);

  const updateTag = (nextTag) => {
    setActiveTag(nextTag);
    setPage(1);
  };

  const updateQuery = (nextQuery) => {
    setQuery(nextQuery);
    setPage(1);
  };

  const resetFilters = () => {
    setActiveTag(null);
    setQuery("");
    setPage(1);
  };

  const viewportHeight = typeof window === "undefined" ? 0 : window.innerHeight;
  const wrapperHeight =
    contentHeight > 0
      ? contentHeight + viewportHeight - TH
      : isMobileLayout
        ? `calc(200svh - ${TH}px)`
        : "auto";

  const communityContent = (
    <>
      <CommunityHero
        currentUser={currentUser}
        query={query}
        onQueryChange={updateQuery}
        onClearQuery={() => updateQuery("")}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenNewThread={() => setShowNew(true)}
        onLogout={logout}
        userPostCount={userPostCount}
        userReplyCount={userReplyCount}
      />

      <div
        aria-hidden="true"
        className="community-divider"
        style={{
          height: TH,
          borderTop: COMMUNITY_BORDERS.soft,
          display: "grid",
          gridTemplateColumns: "7fr 1fr",
        }}
      >
        <div style={{ borderRight: COMMUNITY_BORDERS.soft }} />
        <div />
      </div>

      <FilterBar
        activeTag={activeTag}
        onTagChange={updateTag}
        stickyTop={TH}
      />
      <CommunityFeed
        posts={pagedPosts}
        query={query}
        activeTag={activeTag}
        onResetFilters={resetFilters}
        suggestedTags={suggestedTags}
        onSelectTag={(tag) => {
          updateTag(tag);
          updateQuery("");
        }}
      />

      <div
        className="community-pagination"
        style={{
          height: TH,
          borderTop: COMMUNITY_BORDERS.soft,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="community-pagination__inner"
          style={{ display: "flex", alignItems: "center", height: "100%" }}
        >
          <button
            className="community-pagination__button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            onMouseEnter={() => setHoverPrev(true)}
            onMouseLeave={() => setHoverPrev(false)}
            style={{
              height: "100%",
              padding: "0 20px",
              background: currentPage !== 1 && hoverPrev ? COMMUNITY_COLORS.accent : "none",
              border: "none",
              borderLeft: COMMUNITY_BORDERS.soft,
              borderRight: COMMUNITY_BORDERS.soft,
              cursor: currentPage === 1 ? "default" : "pointer",
              ...COMMUNITY_FONTS.mono,
              fontSize: 10,
              color: currentPage !== 1 && hoverPrev ? COMMUNITY_COLORS.lightBackground : COMMUNITY_COLORS.text,
              opacity: currentPage === 1 ? 0.2 : 1,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "color 0.15s ease, background 0.15s ease",
            }}
          >
            Anterior
          </button>
          <span
            className="community-pagination__status"
            style={{
              padding: "0 20px",
              ...COMMUNITY_FONTS.mono,
              fontSize: 10,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: COMMUNITY_COLORS.accent }}>{currentPage}</span>
            <span style={{ color: COMMUNITY_COLORS.text, opacity: 0.35 }}> / {totalPages}</span>
          </span>
          <button
            className="community-pagination__button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
            style={{
              height: "100%",
              padding: "0 20px",
              background: currentPage !== totalPages && hoverNext ? COMMUNITY_COLORS.accent : "none",
              border: "none",
              borderLeft: COMMUNITY_BORDERS.soft,
              borderRight: COMMUNITY_BORDERS.soft,
              cursor: currentPage === totalPages ? "default" : "pointer",
              ...COMMUNITY_FONTS.mono,
              fontSize: 10,
              color: currentPage !== totalPages && hoverNext ? COMMUNITY_COLORS.lightBackground : COMMUNITY_COLORS.text,
              opacity: currentPage === totalPages ? 0.2 : 1,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "color 0.15s ease, background 0.15s ease",
            }}
          >
            Siguiente
          </button>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="community-divider"
        style={{
          height: TH,
          borderTop: COMMUNITY_BORDERS.soft,
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
        }}
      >
        <div style={{ borderRight: COMMUNITY_BORDERS.soft }} />
        <div />
      </div>
    </>
  );

  return (
    <Page light footerVariant="none">
      <div style={{ position: "relative", height: wrapperHeight }}>
        <Footer variant="landing" mobileReveal={isMobileLayout} />

        <div
          ref={contentRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            background: COMMUNITY_COLORS.lightBackground,
          }}
        >
          {communityContent}
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showNew && (
        <NewPostOverlay
          onClose={() => setShowNew(false)}
          onCreated={() => {
            setSort("reciente");
            setPage(1);
          }}
        />
      )}
    </Page>
  );
}
