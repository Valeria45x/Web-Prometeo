import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComunidad } from "../../context/ComunidadContext";
import StripeDecor from "../StripeDecor";
import RoleBadge from "./RoleBadge";
import TagChip from "./TagChip";
import ReplyCard from "./ReplyCard";

const B = "1px solid #303030";
const MONO = { fontFamily: "monospace" };

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function ThreadView({ post }) {
  const {
    currentUser,
    getUserById,
    getRepliesForPost,
    upvotePost,
    followPost,
    createReply,
    setShowAuthModal,
  } = useComunidad();

  const navigate = useNavigate();
  const author = getUserById(post.authorId);
  const replies = getRepliesForPost(post.id);
  const hasUpvoted = currentUser && post.upvotedBy.includes(currentUser.id);
  const isFollowing = currentUser && post.followerIds.includes(currentUser.id);

  const [replyBody, setReplyBody] = useState("");
  const [replyError, setReplyError] = useState("");

  // Sort: solution first, then by upvotes
  const sortedReplies = [...replies].sort((a, b) => {
    if (a.isSolution && !b.isSolution) return -1;
    if (!a.isSolution && b.isSolution) return 1;
    return b.upvotes - a.upvotes;
  });

  function handleReply(e) {
    e.preventDefault();
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    if (!currentUser.emailVerified) {
      setReplyError("Confirma tu email para responder.");
      return;
    }
    if (!replyBody.trim()) {
      setReplyError("La respuesta no puede estar vacÃ­a.");
      return;
    }
    createReply(post.id, replyBody.trim());
    setReplyBody("");
    setReplyError("");
  }

  const actionBtn = (active, onClick, activeLabel, inactiveLabel) => (
    <button
      onClick={onClick}
      style={{
        ...MONO,
        fontSize: 7,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        background: "none",
        border: "none",
        color: active ? "#FF3C54" : "#C8C8C8",
        opacity: active ? 1 : 0.4,
        cursor: "pointer",
        padding: 0,
        borderBottom: active ? "1px solid #FF3C54" : "1px solid transparent",
        transition: "opacity 0.12s, color 0.12s",
      }}
    >
      {active ? activeLabel : inactiveLabel}
    </button>
  );

  return (
    <div style={{ borderLeft: B }}>
      {/* â”€â”€ Back link â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div style={{ padding: "16px 20px 0", borderBottom: "none" }}>
        <button
          onClick={() => navigate("/comunidad")}
          style={{
            ...MONO,
            fontSize: 7,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#C8C8C8",
            opacity: 0.3,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            transition: "opacity 0.12s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
        >
          â† Comunidad
        </button>
      </div>

      {/* â”€â”€ Tags â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        style={{
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          padding: "12px 20px 0",
        }}
      >
        {post.tags.map((tag) => (
          <TagChip key={tag} tag={tag} small />
        ))}
        {post.isSolved && (
          <span
            style={{
              ...MONO,
              fontSize: 6,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "2px 6px",
              background: "#FF3C54",
              color: "#0A0A0A",
            }}
          >
            SOLUCIÃ“N
          </span>
        )}
      </div>

      {/* â”€â”€ Title â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div style={{ padding: "16px 20px 24px" }}>
        <h1
          style={{
            fontFamily: "'Funnel Display', sans-serif",
            fontSize: "clamp(1.6rem, 3vw, 2.8rem)",
            fontWeight: 900,
            color: "#C8C8C8",
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          {post.title}
        </h1>
      </div>

      {/* â”€â”€ Meta bar: author Â· date Â· upvotes Â· follow â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        style={{
          borderTop: B,
          borderBottom: B,
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        {/* Author */}
        <span
          style={{
            ...MONO,
            fontSize: 8,
            fontWeight: 700,
            color: "#C8C8C8",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          @{author?.handle || "â€”"}
          {author && <RoleBadge role={author.role} />}
        </span>

        <span style={{ ...MONO, fontSize: 7, color: "#C8C8C8", opacity: 0.3 }}>
          Â·
        </span>

        {/* Date */}
        <span style={{ ...MONO, fontSize: 7, color: "#C8C8C8", opacity: 0.35 }}>
          {formatDate(post.createdAt)}
        </span>

        <span style={{ ...MONO, fontSize: 7, color: "#C8C8C8", opacity: 0.3 }}>
          Â·
        </span>

        {/* Upvote */}
        {actionBtn(
          hasUpvoted,
          () => (currentUser ? upvotePost(post.id) : setShowAuthModal(true)),
          `â–² ${post.upvotes} votos`,
          `â–² ${post.upvotes} votos`,
        )}

        <span style={{ ...MONO, fontSize: 7, color: "#C8C8C8", opacity: 0.3 }}>
          Â·
        </span>

        {/* Follow */}
        {actionBtn(
          isFollowing,
          () => (currentUser ? followPost(post.id) : setShowAuthModal(true)),
          "âœ“ Siguiendo",
          "Seguir hilo",
        )}
      </div>

      {/* â”€â”€ Post body â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        style={{
          padding: "24px 20px 32px",
          borderBottom: B,
        }}
      >
        <p
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontSize: 15,
            color: "#C8C8C8",
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {post.body}
        </p>
      </div>

      {/* â”€â”€ Replies separator â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <StripeDecor />

      {/* â”€â”€ Replies header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        style={{
          padding: "12px 20px",
          borderBottom: B,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            ...MONO,
            fontSize: 7,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#C8C8C8",
            opacity: 0.5,
          }}
        >
          Respuestas
        </span>
        <span
          style={{
            ...MONO,
            fontSize: 7,
            fontWeight: 700,
            color: "#FF3C54",
          }}
        >
          {replies.length}
        </span>
      </div>

      {/* â”€â”€ Replies list â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {sortedReplies.length === 0 ? (
        <div style={{ padding: "32px 20px", borderBottom: B }}>
          <span
            style={{
              ...MONO,
              fontSize: 7,
              color: "#C8C8C8",
              opacity: 0.2,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Sin respuestas todavÃ­a. SÃ© el primero.
          </span>
        </div>
      ) : (
        sortedReplies.map((reply) => (
          <ReplyCard key={reply.id} reply={reply} postId={post.id} />
        ))
      )}

      {/* â”€â”€ Reply form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div style={{ borderTop: B }}>
        <div style={{ padding: "16px 20px", borderBottom: B }}>
          <span
            style={{
              ...MONO,
              fontSize: 7,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#C8C8C8",
              opacity: 0.5,
            }}
          >
            Tu respuesta
          </span>
        </div>

        {!currentUser ? (
          <div
            style={{
              padding: "24px 20px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontSize: 13,
                color: "#C8C8C8",
                opacity: 0.4,
              }}
            >
              Inicia sesiÃ³n o regÃ­strate para responder.
            </span>
            <button
              onClick={() => setShowAuthModal(true)}
              style={{
                ...MONO,
                fontSize: 7,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                background: "#FF3C54",
                color: "#0A0A0A",
                border: "none",
                padding: "8px 20px",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              Acceder
            </button>
          </div>
        ) : !currentUser.emailVerified ? (
          <div
            style={{
              padding: "20px",
              borderLeft: "2px solid #FF3C54",
              margin: "0 20px 20px",
            }}
          >
            <span
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontSize: 13,
                color: "#FF3C54",
              }}
            >
              Confirma tu email para responder.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleReply}
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <textarea
              style={{
                width: "100%",
                background: "#111",
                border: B,
                color: "#C8C8C8",
                fontFamily: "'Funnel Sans', sans-serif",
                fontSize: 14,
                padding: "12px",
                outline: "none",
                resize: "vertical",
                minHeight: 100,
                boxSizing: "border-box",
                lineHeight: 1.6,
                caretColor: "#FF3C54",
              }}
              placeholder="Escribe tu respuesta..."
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
            />
            {replyError && (
              <span style={{ ...MONO, fontSize: 7, color: "#FF3C54" }}>
                {replyError}
              </span>
            )}
            <button
              type="submit"
              style={{
                alignSelf: "flex-start",
                background: "#FF3C54",
                color: "#0A0A0A",
                border: "none",
                padding: "10px 24px",
                ...MONO,
                fontSize: 8,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                cursor: "pointer",
              }}
            >
              Publicar respuesta
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
