import { useNavigate } from "react-router-dom";
import RoleBadge from "./RoleBadge";
import { useComunidad } from "../../context/ComunidadContext";

const B = "1px solid #303030";

const MONO = { fontFamily: "monospace" };

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
}

export default function PostCard({ post, query = "" }) {
  const { getUserById, getRepliesForPost } = useComunidad();
  const navigate = useNavigate();
  const author = getUserById(post.authorId);
  const replyCount = getRepliesForPost(post.id).length;

  // Highlight matching query in title
  function renderTitle() {
    if (!query) return post.title;
    const idx = post.title.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return post.title;
    return (
      <>
        {post.title.slice(0, idx)}
        <mark
          style={{
            background: "rgba(255,60,84,0.18)",
            color: "#FF3C54",
            padding: 0,
          }}
        >
          {post.title.slice(idx, idx + query.length)}
        </mark>
        {post.title.slice(idx + query.length)}
      </>
    );
  }

  const dim = { ...MONO, fontSize: 7, color: "#C8C8C8", opacity: 0.35 };

  return (
    <div
      onClick={() => navigate(`/comunidad/${post.id}`)}
      style={{
        borderBottom: B,
        borderLeft: `2px solid ${post.isSolved ? "#FF3C54" : "transparent"}`,
        display: "flex",
        alignItems: "center",
        height: 64,
        padding: "0 20px",
        gap: 16,
        cursor: "pointer",
        background: "#0A0A0A",
        transition: "background 0.12s",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#0D0D0D")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#0A0A0A")}
    >
      {/* Title */}
      <span
        style={{
          fontFamily: "'Funnel Display', sans-serif",
          fontSize: 15,
          fontWeight: 600,
          color: "#C8C8C8",
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          minWidth: 0,
        }}
      >
        {renderTitle()}
      </span>

      {/* Tags — first two only */}
      <div
        style={{
          display: "flex",
          gap: 4,
          flexShrink: 0,
          alignItems: "center",
        }}
      >
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            style={{
              ...MONO,
              fontSize: 6,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#C8C8C8",
              opacity: 0.3,
              border: "1px solid #252525",
              padding: "2px 5px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Meta right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexShrink: 0,
        }}
      >
        <span style={dim}>▲ {post.upvotes}</span>
        <span style={dim}>↳ {replyCount}</span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            ...dim,
            opacity: 0.3,
          }}
        >
          <span>@{author?.handle || "—"}</span>
          {author && <RoleBadge role={author.role} />}
        </span>
        <span style={{ ...dim, opacity: 0.2 }}>
          {formatDate(post.createdAt)}
        </span>
      </div>
    </div>
  );
}
