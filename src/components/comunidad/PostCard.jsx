import { useNavigate } from "react-router-dom";
import RoleBadge from "./RoleBadge";
import TagChip from "./TagChip";
import { useComunidad } from "../../context/ComunidadContext";

const B = "1px solid #303030";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PostCard({ post, span = 2 }) {
  const { getUserById, getRepliesForPost } = useComunidad();
  const navigate = useNavigate();
  const author = getUserById(post.authorId);
  const replyCount = getRepliesForPost(post.id).length;

  return (
    <div
      onClick={() => navigate(`/comunidad/${post.id}`)}
      style={{
        gridColumn: `span ${span}`,
        borderRight: B,
        borderBottom: B,
        borderLeft: post.isSolved ? "3px solid #FF3C54" : "none",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        cursor: "pointer",
        background: "#0A0A0A",
        transition: "background 0.15s",
        minHeight: 180,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#111";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#0A0A0A";
      }}
    >
      {/* Top row — tags + date */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {post.tags.map((tag) => (
            <TagChip key={tag} tag={tag} small />
          ))}
          {post.isSolved && (
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 6,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "2px 6px",
                background: "#FF3C54",
                color: "#0A0A0A",
              }}
            >
              SOLUCIÓN
            </span>
          )}
        </div>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 7,
            color: "#C8C8C8",
            opacity: 0.4,
            whiteSpace: "nowrap",
          }}
        >
          {formatDate(post.createdAt)}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Funnel Display', sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: "#C8C8C8",
          lineHeight: 1.2,
          margin: 0,
          flex: 1,
        }}
      >
        {post.title}
      </h3>

      {/* Body preview */}
      <p
        style={{
          fontFamily: "'Funnel Sans', sans-serif",
          fontSize: 13,
          color: "#C8C8C8",
          opacity: 0.55,
          lineHeight: 1.5,
          margin: 0,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {post.body}
      </p>

      {/* Footer row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: "auto",
        }}
      >
        {/* Upvotes */}
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 7,
            color: "#C8C8C8",
            opacity: 0.5,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          ▲ {post.upvotes}
        </span>
        {/* Reply count */}
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 7,
            color: "#C8C8C8",
            opacity: 0.5,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          ↳ {replyCount} {replyCount === 1 ? "respuesta" : "respuestas"}
        </span>
        {/* Spacer */}
        <div style={{ flex: 1 }} />
        {/* Author */}
        {author && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 7,
                color: "#C8C8C8",
                opacity: 0.5,
              }}
            >
              @{author.handle}
            </span>
            <RoleBadge role={author.role} />
          </div>
        )}
      </div>
    </div>
  );
}
