import PostCard from "./PostCard";
import { Grid } from "../system/Grid";
import { COMMUNITY_BORDERS, COMMUNITY_COLORS, COMMUNITY_FONTS } from "./shared";

export default function CommunityFeed({
  posts,
  query,
  activeTag,
  onResetFilters,
  suggestedTags,
  onSelectTag,
}) {
  if (posts.every((p) => p === null)) {
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
        {posts.map((post, index) =>
          post ? (
            <div
              key={post.id}
              style={{
                borderRight: index % 2 === 0 ? COMMUNITY_BORDERS.soft : "none",
                borderBottom: COMMUNITY_BORDERS.light,
                minHeight: 150,
              }}
            >
              <PostCard post={post} query={query} showBottomBorder={false} />
            </div>
          ) : (
            <div
              key={`empty-${index}`}
              style={{
                borderRight: index % 2 === 0 ? COMMUNITY_BORDERS.soft : "none",
                borderBottom: COMMUNITY_BORDERS.light,
                minHeight: 150,
              }}
            />
          )
        )}
      </Grid>
    </>
  );
}
