import RoleBadge from "./RoleBadge";
import { useComunidad } from "../../context/ComunidadContext";

const B = "1px solid #303030";
const MONO = { fontFamily: "monospace" };

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
        background: reply.isSolution ? "rgba(255,60,84,0.03)" : "transparent",
        padding: "16px 20px",
      }}
    >
      {/* Solution badge */}
      {reply.isSolution && (
        <div style={{ marginBottom: 8 }}>
          <span
            style={{
              ...MONO,
              fontSize: 6,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#FF3C54",
            }}
          >
            âœ“ SOLUCIÃ“N VERIFICADA
          </span>
        </div>
      )}

      {/* Author + date â€” single line */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 10,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            ...MONO,
            fontSize: 8,
            fontWeight: 700,
            color: "#C8C8C8",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          @{author?.handle || "usuario"}
        </span>
        {author && <RoleBadge role={author.role} />}
        <span style={{ ...MONO, fontSize: 7, color: "#C8C8C8", opacity: 0.25 }}>
          Â·
        </span>
        <span style={{ ...MONO, fontSize: 7, color: "#C8C8C8", opacity: 0.3 }}>
          {formatDate(reply.createdAt)}
        </span>
      </div>

      {/* Body */}
      <p
        style={{
          fontFamily: "'Funnel Sans', sans-serif",
          fontSize: 14,
          color: "#C8C8C8",
          lineHeight: 1.65,
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
          gap: 12,
          marginTop: 12,
        }}
      >
        <button
          onClick={() => upvoteReply(reply.id)}
          disabled={!currentUser}
          style={{
            ...MONO,
            fontSize: 7,
            background: "none",
            border: "none",
            color: hasUpvoted ? "#FF3C54" : "#C8C8C8",
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
          â–² {reply.upvotes}
        </button>

        {canMarkSolution && (
          <button
            onClick={() => markSolution(reply.id, postId)}
            style={{
              ...MONO,
              fontSize: 6,
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
            Marcar soluciÃ³n
          </button>
        )}
      </div>
    </div>
  );
}
