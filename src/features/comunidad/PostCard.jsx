import { useLocation, useNavigate } from "react-router-dom";
import { useComunidad } from "@/context/ComunidadContext";
import { formatCommunityDate } from "@/features/comunidad/shared";

function truncateExcerpt(text, maxLength = 140) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, "").trim()}...`;
}

export default function PostCard({ post, query = "" }) {
  const { getRepliesForPost, getUserById } = useComunidad();
  const navigate = useNavigate();
  const location = useLocation();
  const replies = getRepliesForPost(post.id);
  const author = getUserById(post.authorId);
  const excerpt = truncateExcerpt(post.body);

  function openPost() {
    navigate(`/comunidad/${post.id}`, {
      state: {
        from: {
          pathname: location.pathname,
          search: location.search,
          scrollY: typeof window === "undefined" ? 0 : window.scrollY,
        },
      },
    });
  }

  function renderTitle() {
    if (!query) return post.title;
    const index = post.title.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return post.title;
    return (
      <>
        {post.title.slice(0, index)}
        <mark>{post.title.slice(index, index + query.length)}</mark>
        {post.title.slice(index + query.length)}
      </>
    );
  }

  const authorInitial = (author?.displayName?.[0] ?? "P").toUpperCase();

  return (
    <button
      type="button"
      className="community-post-card"
      onClick={openPost}
    >
      <span className="community-post-card__avatar" aria-hidden="true">
        {authorInitial}
      </span>

      <span className="community-post-card__content">
        <span className="community-post-card__byline">
          <span className="community-post-card__author">
            {author?.displayName ?? "Comunidad Prometeo"}
          </span>
          <span className="community-post-card__sep" aria-hidden="true">·</span>
          <span className="community-post-card__date">
            {formatCommunityDate(post.createdAt)}
          </span>
          {post.isSolved && (
            <>
              <span className="community-post-card__sep" aria-hidden="true">·</span>
              <span className="community-post-card__solved">Resuelto</span>
            </>
          )}
        </span>

        <span className="community-post-card__title">
          {renderTitle()}
        </span>

        <span className="community-post-card__excerpt">
          {excerpt}
        </span>

        <span className="community-post-card__footer">
          <span className="community-post-card__tags">
            {post.tags.map((tag) => (
              <span key={tag} className="community-post-card__tag">{tag}</span>
            ))}
          </span>
          <span className="community-post-card__stats">
            <span>
              {replies.length}{" "}
              {replies.length === 1 ? "respuesta" : "respuestas"}
            </span>
            <span>{post.upvotes} apoyos</span>
          </span>
        </span>
      </span>
    </button>
  );
}
