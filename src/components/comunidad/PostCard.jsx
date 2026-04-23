import { useNavigate } from "react-router-dom";
import { useComunidad } from "../../context/ComunidadContext";
import RoleBadge from "./RoleBadge";
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
  const { getUserById, getRepliesForPost } = useComunidad();
  const navigate = useNavigate();
  const author = getUserById(post.authorId);
  const replyCount = getRepliesForPost(post.id).length;
  const unanswered = replyCount === 0;

  function openPost() {
    navigate(`/comunidad/${post.id}`);
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
      role="button"
      tabIndex={0}
      onClick={openPost}
      onKeyDown={handleKeyDown}
      style={{
        borderBottom: showBottomBorder ? COMMUNITY_BORDERS.light : undefined,
        display: "flex",
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
        style={{
          flex: 1,
          padding: "24px 48px 20px 48px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                ...COMMUNITY_FONTS.mono,
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: COMMUNITY_COLORS.text,
                opacity: 0.6,
                border: "1px solid #d0d0d0",
                padding: "5px 10px",
                background: "#f2f2f2",
              }}
            >
              {tag}
            </span>
          ))}

          {post.isSolved && (
            <span
              style={{
                ...COMMUNITY_FONTS.mono,
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: COMMUNITY_COLORS.lightBackground,
                background: COMMUNITY_COLORS.accent,
                padding: "5px 10px",
              }}
            >
              ✓ Resuelto
            </span>
          )}

          {unanswered && (
            <span
              style={{
                ...COMMUNITY_FONTS.mono,
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: COMMUNITY_COLORS.text,
                opacity: 0.4,
                border: "1px solid #d0d0d0",
                padding: "5px 10px",
              }}
            >
              Sin respuesta
            </span>
          )}
        </div>

        <span
          style={{
            fontFamily: COMMUNITY_FONTS.display,
            fontSize: 20,
            fontWeight: 700,
            color: COMMUNITY_COLORS.text,
            lineHeight: 1.25,
          }}
        >
          {renderTitle()}
        </span>

        <p
          style={{
            fontFamily: COMMUNITY_FONTS.sans,
            fontSize: 14,
            color: COMMUNITY_COLORS.text,
            opacity: 0.5,
            lineHeight: 1.55,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.body}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 10,
              color: COMMUNITY_COLORS.text,
              opacity: 0.5,
              fontWeight: 400,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            ↳ {replyCount} {replyCount === 1 ? "respuesta" : "respuestas"}
          </span>
          <span
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 10,
              color: COMMUNITY_COLORS.text,
              opacity: 0.35,
            }}
          >
            ·
          </span>
          <span
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 10,
              color: COMMUNITY_COLORS.text,
              opacity: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            @{author?.handle || "—"}
            {author && <RoleBadge role={author.role} />}
          </span>
          <span
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 10,
              color: COMMUNITY_COLORS.text,
              opacity: 0.35,
            }}
          >
            ·
          </span>
          <span
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 10,
              color: COMMUNITY_COLORS.text,
              opacity: 0.35,
            }}
          >
            {formatCommunityDate(post.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
