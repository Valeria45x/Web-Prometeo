import { useLocation, useNavigate } from "react-router-dom";
import { useComunidad } from "../../context/ComunidadContext";
import { formatCommunityDate } from "./shared";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function truncateExcerpt(text, maxLength = 190) {
  if (text.length <= maxLength) return text;

  const shortened = text
    .slice(0, maxLength)
    .replace(/\s+\S*$/, "")
    .trim();

  return `${shortened}...`;
}

export default function PostCard({
  post,
  query = "",
  showBottomBorder = true,
}) {
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

  return (
    <button
      type="button"
      className="community-post-card"
      onClick={openPost}
      style={{
        borderBottom: showBottomBorder ? "var(--community-border)" : undefined,
      }}
    >
      <span className="community-post-card__topline">
        <span className="community-post-card__tags" data-animate-text>
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
        {post.isSolved ? (
          <span className="community-post-card__status" data-animate-text>
            Resuelto
          </span>
        ) : null}
      </span>

      <span className="community-post-card__body">
        <span className="community-post-card__title" data-animate-text>
          {renderTitle()}
        </span>
        <span className="community-post-card__excerpt" data-animate-text>
          {excerpt}
        </span>
      </span>

      <span className="community-post-card__footer">
        <span className="community-post-card__meta" data-animate-text>
          <span>{author?.displayName ?? "Comunidad Prometeo"}</span>
          <span>{formatCommunityDate(post.createdAt)}</span>
          <span>
            {replies.length} {replies.length === 1 ? "respuesta" : "respuestas"}
          </span>
          <span>{post.upvotes} apoyos</span>
        </span>

        <span
          className="community-post-card__action"
          aria-hidden="true"
          data-animate-text
        >
          Abrir conversación
          <ArrowIcon />
        </span>
      </span>
    </button>
  );
}
