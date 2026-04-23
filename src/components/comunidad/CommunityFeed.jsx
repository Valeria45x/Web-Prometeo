import PostCard from "./PostCard";
import { COMMUNITY_BORDERS, COMMUNITY_COLORS, COMMUNITY_FONTS } from "./shared";

export default function CommunityFeed({
  posts,
  query,
  activeTag,
  visibleCount,
  onLoadMore,
  onResetFilters,
  suggestedTags,
  onSelectTag,
}) {
  if (posts.length === 0) {
    return (
      <div
        style={{
          padding: "64px 48px 72px",
          borderBottom: COMMUNITY_BORDERS.soft,
        }}
      >
        <p
          style={{
            ...COMMUNITY_FONTS.mono,
            fontSize: 11,
            color: COMMUNITY_COLORS.text,
            opacity: 0.3,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            margin: "0 0 24px",
          }}
        >
          Sin hilos{query ? ` para "${query}"` : " en esta categoría"}.
        </p>

        {(query || activeTag) && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span
              style={{
                ...COMMUNITY_FONTS.mono,
                fontSize: 9,
                color: COMMUNITY_COLORS.text,
                opacity: 0.3,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Prueba con:
            </span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {suggestedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onSelectTag(tag)}
                  style={{
                    ...COMMUNITY_FONTS.mono,
                    fontSize: 9,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    background: "none",
                    border: "1px solid #d0d0d0",
                    color: COMMUNITY_COLORS.text,
                    cursor: "pointer",
                    padding: "6px 14px",
                  }}
                >
                  {tag}
                </button>
              ))}
              <button
                type="button"
                onClick={onResetFilters}
                style={{
                  ...COMMUNITY_FONTS.mono,
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  background: COMMUNITY_COLORS.text,
                  border: `1px solid ${COMMUNITY_COLORS.text}`,
                  color: COMMUNITY_COLORS.lightBackground,
                  cursor: "pointer",
                  padding: "6px 14px",
                }}
              >
                Ver todos
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {posts.slice(0, visibleCount).map((post, index) => (
          <div
            key={post.id}
            style={{
              borderRight: index % 2 === 0 ? COMMUNITY_BORDERS.soft : "none",
            }}
          >
            <PostCard post={post} query={query} />
          </div>
        ))}
      </div>

      {visibleCount < posts.length && (
        <div
          style={{
            borderTop: COMMUNITY_BORDERS.soft,
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <button
            type="button"
            onClick={onLoadMore}
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              background: "none",
              border: "1px solid #d0d0d0",
              color: COMMUNITY_COLORS.text,
              cursor: "pointer",
              padding: "10px 24px",
            }}
          >
            Cargar más
          </button>
          <span
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 9,
              color: COMMUNITY_COLORS.text,
              opacity: 0.3,
            }}
          >
            {visibleCount} de {posts.length}
          </span>
        </div>
      )}
    </>
  );
}
