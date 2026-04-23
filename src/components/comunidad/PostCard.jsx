import { useNavigate } from "react-router-dom";
import RoleBadge from "./RoleBadge";
import { useComunidad } from "../../context/ComunidadContext";

const B = "1px solid #D8D8D8";
const MONO = { fontFamily: "monospace" };
const TEXT = "#0A0A0A";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PostCard({ post, query = "" }) {
  const { getUserById, getRepliesForPost } = useComunidad();
  const navigate = useNavigate();
  const author = getUserById(post.authorId);
  const replyCount = getRepliesForPost(post.id).length;
  const unanswered = replyCount === 0;

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

  return (
    <div
      onClick={() => navigate(`/comunidad/${post.id}`)}
      style={{
        borderBottom: B,
        display: "flex",
        cursor: "pointer",
        background: "#FFFFFF",
        transition: "background 0.12s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#F9F9F9")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
    >
      {/* ── Content ─────────────────────────────────────────────── */}
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
        {/* Tags + status badges */}
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
                ...MONO,
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: TEXT,
                opacity: 0.6,
                border: "1px solid #D0D0D0",
                padding: "3px 8px",
                background: "#F2F2F2",
              }}
            >
              {tag}
            </span>
          ))}

          {post.isSolved && (
            <span
              style={{
                ...MONO,
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#FFFFFF",
                background: "#FF3C54",
                padding: "3px 8px",
              }}
            >
              ✓ Resuelto
            </span>
          )}

          {unanswered && (
            <span
              style={{
                ...MONO,
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: TEXT,
                opacity: 0.4,
                border: "1px solid #D0D0D0",
                padding: "3px 8px",
              }}
            >
              Sin respuesta
            </span>
          )}
        </div>

        {/* Title */}
        <span
          style={{
            fontFamily: "'Funnel Display', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: TEXT,
            lineHeight: 1.25,
          }}
        >
          {renderTitle()}
        </span>

        {/* Snippet */}
        <p
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontSize: 14,
            color: TEXT,
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

        {/* Meta row */}
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
              ...MONO,
              fontSize: 10,
              color: TEXT,
              opacity: 0.5,
              fontWeight: 400,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            ↳ {replyCount} {replyCount === 1 ? "respuesta" : "respuestas"}
          </span>
          <span style={{ ...MONO, fontSize: 10, color: TEXT, opacity: 0.35 }}>
            ·
          </span>
          <span
            style={{
              ...MONO,
              fontSize: 10,
              color: TEXT,
              opacity: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            @{author?.handle || "—"}
            {author && <RoleBadge role={author.role} />}
          </span>
          <span style={{ ...MONO, fontSize: 10, color: TEXT, opacity: 0.35 }}>
            ·
          </span>
          <span style={{ ...MONO, fontSize: 10, color: TEXT, opacity: 0.35 }}>
            {formatDate(post.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
