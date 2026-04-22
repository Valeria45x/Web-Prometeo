import RoleBadge from "./RoleBadge";
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
        borderLeft: reply.isSolution ? "3px solid #FF3C54" : "none",
        background: reply.isSolution ? "rgba(255,60,84,0.04)" : "transparent",
        padding: "24px 24px 24px",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 16,
      }}
    >
      {/* Main content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Solution badge */}
        {reply.isSolution && (
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 6,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#FF3C54",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            ✓ SOLUCIÓN VERIFICADA
          </span>
        )}

        {/* Author row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "monospace",
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
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 7,
              color: "#C8C8C8",
              opacity: 0.35,
              marginLeft: 4,
            }}
          >
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

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 4,
          }}
        >
          {/* Upvote */}
          <button
            onClick={() => upvoteReply(reply.id)}
            disabled={!currentUser}
            style={{
              fontFamily: "monospace",
              fontSize: 7,
              background: "none",
              border: "none",
              color: hasUpvoted ? "#FF3C54" : "#C8C8C8",
              opacity: hasUpvoted ? 1 : 0.5,
              cursor: currentUser ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: 0,
            }}
          >
            ▲ {reply.upvotes}
          </button>

          {/* Mark solution (Prometeo Team only) */}
          {canMarkSolution && (
            <button
              onClick={() => markSolution(reply.id, postId)}
              style={{
                fontFamily: "monospace",
                fontSize: 6,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                background: "none",
                border: "1px solid #FF3C54",
                color: "#FF3C54",
                padding: "3px 8px",
                cursor: "pointer",
              }}
            >
              Marcar solución
            </button>
          )}
        </div>
      </div>

      {/* Side: vertical index */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          paddingTop: 4,
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: 6,
            color: "#C8C8C8",
            opacity: 0.2,
            letterSpacing: "0.1em",
          }}
        >
          {reply.upvotes.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
