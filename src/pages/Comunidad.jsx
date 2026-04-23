import { useEffect, useMemo, useState } from "react";
import { TH } from "../constants";
import { Page } from "../components/Page";
import AuthModal from "../components/comunidad/AuthModal";
import CommunityFeed from "../components/comunidad/CommunityFeed";
import CommunityHero from "../components/comunidad/CommunityHero";
import FilterBar from "../components/comunidad/FilterBar";
import NewPostOverlay from "../components/comunidad/NewPostOverlay";
import { COMMUNITY_BORDERS, COMMUNITY_COLORS } from "../components/comunidad/shared";
import { useComunidad } from "../context/ComunidadContext";
import { TAGS } from "../data/comunidad";

const INITIAL_VISIBLE_POSTS = 8;
const POSTS_PER_PAGE = 8;

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
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_POSTS);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_POSTS);
  }, [activeTag, query, sort]);

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
        (firstPost, secondPost) =>
          new Date(secondPost.createdAt) - new Date(firstPost.createdAt),
      );
    }

    return matchingPosts;
  }, [activeTag, posts, query, sort]);

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

  return (
    <Page light footerVariant="landing">
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

      <div style={{ background: COMMUNITY_COLORS.lightBackground }}>
        <FilterBar
          activeTag={activeTag}
          onTagChange={setActiveTag}
          sort={sort}
          onSortChange={setSort}
          stickyTop={TH}
        />
        <CommunityFeed
          posts={filteredPosts}
          query={query}
          activeTag={activeTag}
          visibleCount={visibleCount}
          onLoadMore={() =>
            setVisibleCount((currentCount) => currentCount + POSTS_PER_PAGE)
          }
          onResetFilters={resetFilters}
          suggestedTags={suggestedTags}
          onSelectTag={(tag) => {
            setActiveTag(tag);
            setQuery("");
          }}
        />
        <div
          aria-hidden="true"
          style={{
            height: TH,
            borderTop: COMMUNITY_BORDERS.soft,
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
          }}
        >
          <div style={{ borderRight: COMMUNITY_BORDERS.soft }} />
          <div />
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
