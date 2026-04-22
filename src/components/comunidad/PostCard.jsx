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

  const dim = { ...MONO, fontSize: 10, color: TEXT, opacity: 0.6 };

  return (
    <div
      onClick={() => navigate(`/comunidad/${post.id}`)}
      style={{
        borderBottom: B,
        borderLeft: `2px solid ${post.isSolved ? "#FF3C54" : "transparent"}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px 32px",
        gap: 0,
        cursor: "pointer",
        background: "#FFFFFF",
        transition: "background 0.12s",
        minHeight: 96,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#F7F7F7")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
    >
      {/* Row 1 — Title */}
      <span
        style={{
          fontFamily: "'Funnel Display', sans-serif",
          fontSize: 22,
          fontWeight: 600,
          color: TEXT,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          minWidth: 0,
          paddingBottom: 10,
        }}
      >
        {renderTitle()}
      </span>

      {/* Row 2 — Tags + Meta */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          minWidth: 0,
        }}
      >
        {/* Tags */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                ...MONO,
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: TEXT,
                opacity: 0.7,
                border: "1px solid #C8C8C8",
                padding: "4px 10px",
                background: "#F0F0F0",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta right */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
          <span style={dim}>▲ {post.upvotes}</span>
          <span style={dim}>↳ {replyCount}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4, ...dim }}>
            <span>@{author?.handle || "—"}</span>
            {author && <RoleBadge role={author.role} />}
          </span>
          <span style={{ ...dim, opacity: 0.35 }}>{formatDate(post.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
