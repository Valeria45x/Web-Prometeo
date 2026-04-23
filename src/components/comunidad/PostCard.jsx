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

export default function PostCard({ post, query = "", featured = false }) {
  const { getUserById, getRepliesForPost } = useComunidad();
  const navigate = useNavigate();
  const author = getUserById(post.authorId);
  const replyCount = getRepliesForPost(post.id).length;
  const unanswered = replyCount === 0;

  const leftBorderColor = post.isSolved ? "#FF3C54" : "transparent";
  const cardBg = "#FFFFFF";

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
        borderLeft: `3px solid ${leftBorderColor}`,
        display: featured ? "grid" : "flex",
        gridTemplateColumns: featured ? "auto 1fr auto" : undefined,
        cursor: "pointer",
        background: cardBg,
        transition: "background 0.12s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#F9F9F9")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
    >
      {/* ── Left: vote column ───────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: featured ? "32px 28px 32px 32px" : "24px 20px 24px 24px",
          gap: 4,
          flexShrink: 0,
          minWidth: featured ? 80 : 64,
          borderRight: featured ? B : "none",
        }}
      >
        <span
          style={{ ...MONO, fontSize: featured ? 13 : 11, color: "#C8C8C8" }}
        >
          ▲
        </span>
        <span
          style={{
            fontFamily: "'Funnel Display', sans-serif",
            fontSize: featured ? 28 : 20,
            fontWeight: 700,
            color: post.upvotes > 0 ? TEXT : "#C8C8C8",
            lineHeight: 1,
          }}
        >
          {post.upvotes}
        </span>
        <span
          style={{
            ...MONO,
            fontSize: 8,
            color: "#C8C8C8",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          votos
        </span>
      </div>

      {/* ── Right: content ──────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          padding: featured ? "32px 48px 28px 32px" : "24px 32px 20px 0",
          display: "flex",
          flexDirection: "column",
          gap: featured ? 14 : 10,
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
            fontSize: featured ? 28 : 20,
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
            fontSize: featured ? 15 : 14,
            color: TEXT,
            opacity: 0.5,
            lineHeight: 1.55,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: featured ? 3 : 2,
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
