import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { TH } from "../constants";
import { Page } from "../components/Page";
import Footer from "../components/Footer";
import HeroTransitionGrid from "../components/HeroTransitionGrid";
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

function parseTagsParam(value) {
  if (!value) return [];
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => TAGS.includes(tag));
}

export default function Comunidad() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const {
    currentUser,
    posts,
    replies,
    showAuthModal,
    setShowAuthModal,
    logout,
  } = useComunidad();

  const [activeTags, setActiveTags] = useState(() =>
    parseTagsParam(searchParams.get("tags") || searchParams.get("tag")),
  );
  const [sort, setSort] = useState(
    () => searchParams.get("sort") || "reciente",
  );
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
      const matchesTag =
        activeTags.length > 0
          ? activeTags.every((tag) => post.tags.includes(tag))
          : true;
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
  }, [activeTags, posts, query, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);
  const pagedPostsRaw = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );
  const isFullPage = pagedPostsRaw.length === POSTS_PER_PAGE;
  const pagedPosts = isFullPage
    ? [
        ...pagedPostsRaw,
        ...Array(POSTS_PER_PAGE - pagedPostsRaw.length).fill(null),
      ]
    : pagedPostsRaw;

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

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
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

    if (typeof restoreScrollY !== "number" || contentHeight <= 0)
      return undefined;

    const frameId = window.requestAnimationFrame(() => {
      window.scrollTo({ top: restoreScrollY, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [contentHeight, location.key, location.state]);

  const updateTags = (nextTags) => {
    setActiveTags(nextTags);
    setPage(1);
  };

  const updateQuery = (nextQuery) => {
    setQuery(nextQuery);
    setPage(1);
  };

  const resetFilters = () => {
    setActiveTags([]);
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

      <HeroTransitionGrid
        border={COMMUNITY_BORDERS.soft}
        background={COMMUNITY_COLORS.mutedBackground}
      />

      <FilterBar
        activeTags={activeTags}
        onTagsChange={updateTags}
        stickyTop={TH}
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
              background:
                currentPage !== 1 && hoverPrev
                  ? COMMUNITY_COLORS.accent
                  : "none",
              border: "none",
              borderLeft: COMMUNITY_BORDERS.soft,
              borderRight: COMMUNITY_BORDERS.soft,
              cursor: currentPage === 1 ? "default" : "pointer",
              ...COMMUNITY_FONTS.mono,
              fontSize: 10,
              color:
                currentPage !== 1 && hoverPrev
                  ? COMMUNITY_COLORS.lightBackground
                  : COMMUNITY_COLORS.text,
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
            <span style={{ color: COMMUNITY_COLORS.accent }}>
              {currentPage}
            </span>
            <span style={{ color: COMMUNITY_COLORS.text, opacity: 0.35 }}>
              {" "}
              / {totalPages}
            </span>
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
              background:
                currentPage !== totalPages && hoverNext
                  ? COMMUNITY_COLORS.accent
                  : "none",
              border: "none",
              borderLeft: COMMUNITY_BORDERS.soft,
              borderRight: COMMUNITY_BORDERS.soft,
              cursor: currentPage === totalPages ? "default" : "pointer",
              ...COMMUNITY_FONTS.mono,
              fontSize: 10,
              color:
                currentPage !== totalPages && hoverNext
                  ? COMMUNITY_COLORS.lightBackground
                  : COMMUNITY_COLORS.text,
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

      {currentUser && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderTop: COMMUNITY_BORDERS.soft,
            }}
          >
            <div style={{ borderRight: COMMUNITY_BORDERS.soft }}>
              <div
                style={{
                  borderBottom: COMMUNITY_BORDERS.soft,
                  padding: "14px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    ...COMMUNITY_FONTS.mono,
                    fontSize: 8,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: COMMUNITY_COLORS.muted,
                  }}
                >
                  Mis hilos
                </span>
                <span
                  style={{
                    ...COMMUNITY_FONTS.mono,
                    fontSize: 8,
                    letterSpacing: "0.08em",
                    color: COMMUNITY_COLORS.accent,
                  }}
                >
                  {posts.filter((p) => p.authorId === currentUser.id).length}
                </span>
              </div>
              {posts.filter((p) => p.authorId === currentUser.id).length ===
              0 ? (
                <div
                  style={{
                    padding: "18px 24px",
                    ...COMMUNITY_FONTS.mono,
                    fontSize: 9,
                    color: COMMUNITY_COLORS.muted,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Todavía no has publicado ningún hilo.
                </div>
              ) : (
                posts
                  .filter((p) => p.authorId === currentUser.id)
                  .slice(0, 5)
                  .map((post) => (
                    <div
                      key={post.id}
                      style={{
                        borderBottom: COMMUNITY_BORDERS.soft,
                        padding: "16px 24px",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: COMMUNITY_FONTS.sans.fontFamily,
                          fontSize: 14,
                          color: COMMUNITY_COLORS.text,
                          lineHeight: 1.35,
                        }}
                      >
                        {post.title}
                      </span>
                      <span
                        style={{
                          ...COMMUNITY_FONTS.mono,
                          fontSize: 8,
                          color: post.isSolved
                            ? COMMUNITY_COLORS.accent
                            : COMMUNITY_COLORS.muted,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {post.isSolved ? "resuelto" : "abierto"}
                      </span>
                    </div>
                  ))
              )}
            </div>
            <div>
              <div
                style={{
                  borderBottom: COMMUNITY_BORDERS.soft,
                  padding: "14px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    ...COMMUNITY_FONTS.mono,
                    fontSize: 8,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: COMMUNITY_COLORS.muted,
                  }}
                >
                  Hilos que sigues
                </span>
                <span
                  style={{
                    ...COMMUNITY_FONTS.mono,
                    fontSize: 8,
                    letterSpacing: "0.08em",
                    color: COMMUNITY_COLORS.accent,
                  }}
                >
                  {
                    posts.filter((p) => p.followerIds?.includes(currentUser.id))
                      .length
                  }
                </span>
              </div>
              {posts.filter((p) => p.followerIds?.includes(currentUser.id))
                .length === 0 ? (
                <div
                  style={{
                    padding: "18px 24px",
                    ...COMMUNITY_FONTS.mono,
                    fontSize: 9,
                    color: COMMUNITY_COLORS.muted,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  No sigues ningún hilo todavía.
                </div>
              ) : (
                posts
                  .filter((p) => p.followerIds?.includes(currentUser.id))
                  .slice(0, 5)
                  .map((post) => {
                    const latestReply = replies
                      .filter((r) => r.postId === post.id)
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                      )[0];
                    const hasUpdate =
                      latestReply && latestReply.authorId !== currentUser.id;
                    return (
                      <div
                        key={post.id}
                        style={{
                          borderBottom: COMMUNITY_BORDERS.soft,
                          padding: "16px 24px",
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 12,
                          background: hasUpdate
                            ? "rgba(255,60,84,0.05)"
                            : "transparent",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: COMMUNITY_FONTS.sans.fontFamily,
                            fontSize: 14,
                            color: COMMUNITY_COLORS.text,
                            lineHeight: 1.35,
                          }}
                        >
                          {post.title}
                        </span>
                        <span
                          style={{
                            ...COMMUNITY_FONTS.mono,
                            fontSize: 8,
                            color: hasUpdate
                              ? COMMUNITY_COLORS.accent
                              : COMMUNITY_COLORS.muted,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {hasUpdate ? "nuevo" : "sin cambios"}
                        </span>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </>
      )}
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
