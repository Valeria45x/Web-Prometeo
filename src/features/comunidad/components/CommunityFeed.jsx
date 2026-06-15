import Button from "@/shared/ui/Button";
import PostCard from "@/features/comunidad/components/PostCard";

export default function CommunityFeed({
  posts,
  query,
  activeTags = [],
  onResetFilters,
  suggestedTags,
  onSelectTag,
}) {
  if (posts.length === 0) {
    return (
      <section className="community-feed__empty">
        <h2>No encontramos conversaciones con esos criterios.</h2>
        <p>
          Prueba otra búsqueda, elimina algún filtro o vuelve a ver todos los
          temas.
        </p>

        {(query || activeTags.length > 0) && (
          <div className="community-feed__empty-actions">
            {suggestedTags.slice(0, 3).map((tag) => (
              <Button
                key={tag}
                variant="outline"
                surface="light"
                emphasis="neutral"
                size="sm"
                font="sans"
                onClick={() => onSelectTag(tag)}
                style={{
                  "--ds-button-hover-bg": "#050505",
                  "--ds-button-hover-border": "#050505",
                  "--ds-button-hover-color": "#fcfcfc",
                  "--ds-button-hover-translate": "0",
                }}
              >
                {tag}
              </Button>
            ))}
            <Button
              variant="outline"
              surface="light"
              emphasis="neutral"
              size="sm"
              font="sans"
              onClick={onResetFilters}
              style={{
                "--ds-button-hover-bg": "#050505",
                "--ds-button-hover-border": "#050505",
                "--ds-button-hover-color": "#fcfcfc",
                "--ds-button-hover-translate": "0",
              }}
            >
              Ver todos
            </Button>
          </div>
        )}
      </section>
    );
  }

  return (
    <div className="community-feed" id="community-results">
      {posts.map((post) => (
        <div key={post.id} className="community-feed__item">
          <PostCard post={post} query={query} showBottomBorder={false} />
        </div>
      ))}
    </div>
  );
}
