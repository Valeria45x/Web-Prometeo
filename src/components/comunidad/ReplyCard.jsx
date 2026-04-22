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

export default function ReplyCard({ reply, postId }) {
  const { currentUser, getUserById, upvoteReply, markSolution } =
    useComunidad();
  const author = getUserById(reply.authorId);
  const hasUpvoted = currentUser && reply.upvotedBy.includes(currentUser.id);
  const canMarkSolution =
    currentUser?.role === "prometeo_team" && !reply.isSolution;

  return (
    <div
      style={{
        borderBottom: B,
        borderLeft: reply.isSolution
          ? "2px solid #FF3C54"
          : "2px solid transparent",
        background: reply.isSolution ? "rgba(255,60,84,0.03)" : "#FFFFFF",
        padding: "24px 32px",
      }}
    >
      {/* Solution badge */}
      {reply.isSolution && (
        <div style={{ marginBottom: 12 }}>
          <span
            style={{
              ...MONO,
              fontSize: 9,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#FF3C54",
            }}
          >
            ✓ SOLUCIÓN VERIFICADA
          </span>
        </div>
      )}

      {/* Author + date */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            ...MONO,
            fontSize: 11,
            fontWeight: 700,
            color: TEXT,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          @{author?.handle || "usuario"}
        </span>
        {author && <RoleBadge role={author.role} />}
        <span style={{ ...MONO, fontSize: 9, color: TEXT, opacity: 0.25 }}>·</span>
        <span style={{ ...MONO, fontSize: 9, color: TEXT, opacity: 0.45 }}>
          {formatDate(reply.createdAt)}
        </span>
      </div>

      {/* Body */}
      <p
        style={{
          fontFamily: "'Funnel Sans', sans-serif",
          fontSize: 15,
          color: TEXT,
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {reply.body}
      </p>

      {/* Footer actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: 16,
        }}
      >
        <button
          onClick={() => upvoteReply(reply.id)}
          disabled={!currentUser}
          style={{
            ...MONO,
            fontSize: 9,
            background: "none",
            border: "none",
            color: hasUpvoted ? "#FF3C54" : TEXT,
            opacity: hasUpvoted ? 1 : 0.4,
            cursor: currentUser ? "pointer" : "not-allowed",
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: 4,
            borderBottom: hasUpvoted
              ? "1px solid #FF3C54"
              : "1px solid transparent",
            transition: "opacity 0.12s, color 0.12s",
          }}
        >
          ▲ {reply.upvotes}
        </button>

        {canMarkSolution && (
          <button
            onClick={() => markSolution(reply.id, postId)}
            style={{
              ...MONO,
              fontSize: 8,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              background: "none",
              border: "none",
              color: "#FF3C54",
              borderBottom: "1px solid #FF3C54",
              padding: "0 0 1px",
              cursor: "pointer",
            }}
          >
            Marcar solución
          </button>
        )}
      </div>
    </div>
  );
}
