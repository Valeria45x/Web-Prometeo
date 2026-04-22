import { useNavigate } from "react-router-dom";
import RoleBadge from "./RoleBadge";
import { useComunidad } from "../../context/ComunidadContext";

const B = "1px solid #D8D8D8";
const MONO = { fontFamily: "monospace" };
const TEXT = "#0A0A0A";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
}

export default function PostCard({ post, query = "" }) {
  const { getUserById, getRepliesForPost } = useComunidad();
  const navigate = useNavigate();
  const author = getUserById(post.authorId);
  const replyCount = getRepliesForPost(post.id).length;

  function renderTitle() {
    if (!query) return post.title;
    const idx = post.title.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return post.title;
    return (
      <>
        {post.title.slice(0, idx)}
        <mark
          style={{
            background: "rgba(255,60,84,0.15)",
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

  const dim = { ...MONO, fontSize: 10, color: TEXT, opacity: 0.4 };

  return (
    <div
      onClick={() => navigate(`/comunidad/${post.id}`)}
      style={{
        borderBottom: B,
        borderLeft: `2px solid ${post.isSolved ? "#FF3C54" : "transparent"}`,
        display: "flex",
        alignItems: "center",
        height: 104,
        padding: "0 32px",
        gap: 20,
        cursor: "pointer",
        background: "#FFFFFF",
        transition: "background 0.12s",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#F7F7F7")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
    >
      {/* Title */}
      <span
        style={{
          fontFamily: "'Funnel Display', sans-serif",
          fontSize: 22,
          fontWeight: 600,
          color: TEXT,
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
              fontSize: 8,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: TEXT,
              opacity: 0.4,
              border: "1px solid #D8D8D8",
              padding: "3px 8px",
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
          gap: 16,
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
          }}
        >
          <span>@{author?.handle || "—"}</span>
          {author && <RoleBadge role={author.role} />}
        </span>
        <span style={{ ...dim, opacity: 0.25 }}>
          {formatDate(post.createdAt)}
        </span>
      </div>
    </div>
  );
}
