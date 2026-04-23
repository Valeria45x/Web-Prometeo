import PostCard from "./PostCard";
import Button from "../system/Button";
import { Grid } from "../system/Grid";
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
          Sin hilos{query ? ` para "${query}"` : " en esta categoria"}.
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
                <Button
                  key={tag}
                  variant="outline"
                  surface="light"
                  emphasis="neutral"
                  size="xs"
                  font="mono"
                  onClick={() => onSelectTag(tag)}
                >
                  {tag}
                </Button>
              ))}
              <Button
                variant="primary"
                surface="light"
                emphasis="neutral"
                size="xs"
                font="mono"
                onClick={onResetFilters}
              >
                Ver todos
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <Grid columns="halves">
        {posts.slice(0, visibleCount).map((post, index) => (
          <div
            key={post.id}
            style={{
              borderRight: index % 2 === 0 ? COMMUNITY_BORDERS.soft : "none",
              borderBottom: COMMUNITY_BORDERS.light,
            }}
          >
            <PostCard post={post} query={query} showBottomBorder={false} />
          </div>
        ))}
        {posts.slice(0, visibleCount).length % 2 !== 0 && (
          <div style={{ borderBottom: COMMUNITY_BORDERS.light }} />
        )}
      </Grid>

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
          <Button
            variant="outline"
            surface="light"
            emphasis="neutral"
            size="sm"
            font="mono"
            onClick={onLoadMore}
          >
            Cargar mas
          </Button>
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
