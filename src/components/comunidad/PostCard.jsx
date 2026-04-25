import { useLocation, useNavigate } from "react-router-dom";
import { useComunidad } from "../../context/ComunidadContext";
import {
  COMMUNITY_BORDERS,
  COMMUNITY_COLORS,
  COMMUNITY_FONTS,
  formatCommunityDate,
} from "./shared";

export default function PostCard({
  post,
  query = "",
  showBottomBorder = true,
}) {
  const { getRepliesForPost } = useComunidad();
  const navigate = useNavigate();
  const location = useLocation();
  const replyCount = getRepliesForPost(post.id).length;
  const unanswered = replyCount === 0;

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

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPost();
    }
  }

  function renderTitle() {
    if (!query) return post.title;

    const index = post.title.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return post.title;

    return (
      <>
        {post.title.slice(0, index)}
        <mark
          style={{
            background: "rgba(255,60,84,0.15)",
            color: COMMUNITY_COLORS.accent,
            padding: 0,
          }}
        >
          {post.title.slice(index, index + query.length)}
        </mark>
        {post.title.slice(index + query.length)}
      </>
    );
  }

  return (
    <div
      className="community-post-card"
      role="button"
      tabIndex={0}
      onClick={openPost}
      onKeyDown={handleKeyDown}
      style={{
        borderBottom: showBottomBorder ? COMMUNITY_BORDERS.light : undefined,
        display: "flex",
        height: "100%",
        cursor: "pointer",
        background: COMMUNITY_COLORS.lightBackground,
        transition: "background 0.12s",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.background = COMMUNITY_COLORS.cardHover;
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.background = COMMUNITY_COLORS.lightBackground;
      }}
    >
      <div
        className="community-post-card__content"
        style={{
          flex: 1,
          padding: "32px 48px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          minWidth: 0,
        }}
      >
        <span
          className="community-post-card__title"
          style={{
            fontFamily: COMMUNITY_FONTS.display,
            fontSize: 18,
            fontWeight: 700,
            color: COMMUNITY_COLORS.text,
            lineHeight: 1.3,
          }}
        >
          {renderTitle()}
        </span>

        <div
          className="community-post-card__meta"
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          {post.isSolved && !unanswered && (
            <span
              style={{
                ...COMMUNITY_FONTS.mono,
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: COMMUNITY_COLORS.lightBackground,
                background: COMMUNITY_COLORS.accent,
                padding: "6px 10px",
              }}
            >
              Resuelto
            </span>
          )}

          <span
            style={{
              fontFamily: COMMUNITY_FONTS.sans,
              fontSize: 13,
              color: COMMUNITY_COLORS.text,
              opacity: unanswered ? 0.3 : 0.55,
            }}
          >
            {unanswered
              ? "Sin respuestas"
              : `${replyCount} ${replyCount === 1 ? "respuesta" : "respuestas"}`}
          </span>

          <span
            className="community-post-card__dot"
            style={{
              fontFamily: COMMUNITY_FONTS.sans,
              fontSize: 13,
              color: COMMUNITY_COLORS.text,
              opacity: 0.2,
            }}
          >
            &middot;
          </span>

          <span
            style={{
              fontFamily: COMMUNITY_FONTS.sans,
              fontSize: 13,
              color: COMMUNITY_COLORS.text,
              opacity: 0.3,
            }}
          >
            {formatCommunityDate(post.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
