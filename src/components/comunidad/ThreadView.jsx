import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComunidad } from "../../context/ComunidadContext";
import StripeDecor from "../StripeDecor";
import RoleBadge from "./RoleBadge";
import TagChip from "./TagChip";
import ReplyCard from "./ReplyCard";

const B = "1px solid #D8D8D8";
const MONO = { fontFamily: "monospace" };
const TEXT = "#0A0A0A";
const BG = "#FFFFFF";

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
      setReplyError("La respuesta no puede estar vacía.");
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
        fontSize: 9,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        background: "none",
        border: "none",
        color: active ? "#FF3C54" : TEXT,
        opacity: active ? 1 : 0.45,
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
    <div style={{ borderLeft: B, background: BG }}>
      {/* ── Back link ─────────────────────────────────────────────────── */}
      <div style={{ padding: "16px 32px 0" }}>
        <button
          onClick={() => navigate("/comunidad")}
          style={{
            ...MONO,
            fontSize: 9,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: TEXT,
            opacity: 0.35,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            transition: "opacity 0.12s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
        >
          ← Comunidad
        </button>
      </div>

      {/* ── Tags ──────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          padding: "16px 32px 0",
        }}
      >
        {post.tags.map((tag) => (
          <TagChip key={tag} tag={tag} small />
        ))}
        {post.isSolved && (
          <span
            style={{
              ...MONO,
              fontSize: 8,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "3px 8px",
              background: "#FF3C54",
              color: "#FFFFFF",
            }}
          >
            SOLUCIÓN
          </span>
        )}
      </div>

      {/* ── Title ─────────────────────────────────────────────────────── */}
      <div style={{ padding: "24px 32px 32px" }}>
        <h1
          style={{
            fontFamily: "'Funnel Display', sans-serif",
            fontSize: "clamp(1.6rem, 3vw, 2.8rem)",
            fontWeight: 900,
            color: TEXT,
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          {post.title}
        </h1>
      </div>

      {/* ── Meta bar ──────────────────────────────────────────────────── */}
      <div
        style={{
          borderTop: B,
          borderBottom: B,
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          gap: 20,
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
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          @{author?.handle || "—"}
          {author && <RoleBadge role={author.role} />}
        </span>

        <span style={{ ...MONO, fontSize: 9, color: TEXT, opacity: 0.3 }}>·</span>

        <span style={{ ...MONO, fontSize: 9, color: TEXT, opacity: 0.45 }}>
          {formatDate(post.createdAt)}
        </span>

        <span style={{ ...MONO, fontSize: 9, color: TEXT, opacity: 0.3 }}>·</span>

        {actionBtn(
          hasUpvoted,
          () => (currentUser ? upvotePost(post.id) : setShowAuthModal(true)),
          `▲ ${post.upvotes} votos`,
          `▲ ${post.upvotes} votos`,
        )}

        <span style={{ ...MONO, fontSize: 9, color: TEXT, opacity: 0.3 }}>·</span>

        {actionBtn(
          isFollowing,
          () => (currentUser ? followPost(post.id) : setShowAuthModal(true)),
          "✓ Siguiendo",
          "Seguir hilo",
        )}
      </div>

      {/* ── Post body ─────────────────────────────────────────────────── */}
      <div style={{ padding: "32px", borderBottom: B }}>
        <p
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontSize: 16,
            color: TEXT,
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {post.body}
        </p>
      </div>

      {/* ── Replies separator ─────────────────────────────────────────── */}
      <StripeDecor />

      {/* ── Replies header ────────────────────────────────────────────── */}
      <div
        style={{
          padding: "16px 32px",
          borderBottom: B,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            ...MONO,
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: TEXT,
            opacity: 0.5,
          }}
        >
          Respuestas
        </span>
        <span style={{ ...MONO, fontSize: 10, fontWeight: 700, color: "#FF3C54" }}>
          {replies.length}
        </span>
      </div>

      {/* ── Replies list ──────────────────────────────────────────────── */}
      {sortedReplies.length === 0 ? (
        <div style={{ padding: "32px", borderBottom: B }}>
          <span
            style={{
              ...MONO,
              fontSize: 9,
              color: TEXT,
              opacity: 0.25,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Sin respuestas todavía. Sé el primero.
          </span>
        </div>
      ) : (
        sortedReplies.map((reply) => (
          <ReplyCard key={reply.id} reply={reply} postId={post.id} />
        ))
      )}

      {/* ── Reply form ────────────────────────────────────────────────── */}
      <div style={{ borderTop: B }}>
        <div style={{ padding: "16px 32px", borderBottom: B }}>
          <span
            style={{
              ...MONO,
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: TEXT,
              opacity: 0.5,
            }}
          >
            Tu respuesta
          </span>
        </div>

        {!currentUser ? (
          <div
            style={{
              padding: "32px",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontSize: 14,
                color: TEXT,
                opacity: 0.45,
              }}
            >
              Inicia sesión o regístrate para responder.
            </span>
            <button
              onClick={() => setShowAuthModal(true)}
              style={{
                ...MONO,
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                background: "#FF3C54",
                color: "#FFFFFF",
                border: "none",
                padding: "10px 24px",
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
              margin: "0 32px 32px",
            }}
          >
            <span
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontSize: 14,
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
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <textarea
              style={{
                width: "100%",
                background: "#F7F7F7",
                border: B,
                color: TEXT,
                fontFamily: "'Funnel Sans', sans-serif",
                fontSize: 15,
                padding: "16px",
                outline: "none",
                resize: "vertical",
                minHeight: 128,
                boxSizing: "border-box",
                lineHeight: 1.6,
                caretColor: "#FF3C54",
              }}
              placeholder="Escribe tu respuesta..."
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
            />
            {replyError && (
              <span style={{ ...MONO, fontSize: 9, color: "#FF3C54" }}>
                {replyError}
              </span>
            )}
            <button
              type="submit"
              style={{
                alignSelf: "flex-start",
                background: "#FF3C54",
                color: "#FFFFFF",
                border: "none",
                padding: "12px 32px",
                ...MONO,
                fontSize: 10,
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
