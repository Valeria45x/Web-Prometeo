import { useEffect, useMemo, useRef, useState } from "react";
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
import { useComunidad } from "../context/ComunidadContext";
import { TAGS } from "../data/comunidad";

const POSTS_PER_PAGE = 6;

export default function Comunidad() {
  const {
    currentUser,
    posts,
    replies,
    showAuthModal,
    setShowAuthModal,
    logout,
  } = useComunidad();

  const [activeTag, setActiveTag] = useState(null);
  const [sort, setSort] = useState("reciente");
  const [query, setQuery] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [page, setPage] = useState(1);
  const [contentHeight, setContentHeight] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setPage(1);
  }, [activeTag, query, sort]);

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver(() => {
      setContentHeight(contentRef.current.scrollHeight);
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

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

  const resetFilters = () => {
    setActiveTag(null);
    setQuery("");
  };

  const wrapperHeight =
    contentHeight > 0 ? contentHeight + window.innerHeight - TH : "auto";

  return (
    <Page light footerVariant="none">
      <div style={{ position: "relative", height: wrapperHeight }}>
        <Footer variant="landing" />

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
          <CommunityHero
            currentUser={currentUser}
            query={query}
            onQueryChange={setQuery}
            onClearQuery={() => setQuery("")}
            onOpenAuth={() => setShowAuthModal(true)}
            onOpenNewThread={() => setShowNew(true)}
            onLogout={logout}
            userPostCount={userPostCount}
            userReplyCount={userReplyCount}
          />

          <div
            aria-hidden="true"
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
            onTagChange={setActiveTag}
            stickyTop={TH}
          />
          <CommunityFeed
            posts={pagedPosts}
            query={query}
            activeTag={activeTag}
            onResetFilters={resetFilters}
            suggestedTags={suggestedTags}
            onSelectTag={(tag) => {
              setActiveTag(tag);
              setQuery("");
            }}
          />

          {/* Grid separator with pagination inside */}
          <div
            style={{
              height: TH,
              borderTop: COMMUNITY_BORDERS.soft,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
              <button
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
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showNew && (
        <NewPostOverlay
          onClose={() => setShowNew(false)}
          onCreated={() => setSort("reciente")}
        />
      )}
    </Page>
  );
}
