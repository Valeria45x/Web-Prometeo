import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComunidad } from "../../context/ComunidadContext";
import RoleBadge from "./RoleBadge";
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
    followPost,
    createReply,
    setShowAuthModal,
  } = useComunidad();

  const navigate = useNavigate();
  const author = getUserById(post.authorId);
  const replies = getRepliesForPost(post.id);
  const isFollowing = currentUser && post.followerIds.includes(currentUser.id);

  const [replyBody, setReplyBody] = useState("");
  const [replyError, setReplyError] = useState("");

  const sortedReplies = [...replies].sort((a, b) => {
    if (a.isSolution && !b.isSolution) return -1;
    if (!a.isSolution && b.isSolution) return 1;
    return new Date(a.createdAt) - new Date(b.createdAt);
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
      <div
        style={{
          borderBottom: B,
          padding: "0 32px",
          height: 56,
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => navigate("/comunidad")}
          style={{
            ...MONO,
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: TEXT,
            background: "none",
            border: "1px solid #0A0A0A",
            cursor: "pointer",
            padding: "10px 24px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FF3C54";
            e.currentTarget.style.borderColor = "#FF3C54";
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none";
            e.currentTarget.style.borderColor = "#0A0A0A";
            e.currentTarget.style.color = TEXT;
          }}
        >
          Volver a hilos
        </button>
      </div>

      {/* ── Post — 4-col grid ─────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderBottom: B,
        }}
      >
        {/* Left 3 cols: tags + title + body */}
        <div
          style={{
            gridColumn: "span 3",
            borderRight: B,
            padding: "28px 40px 40px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Tags */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  ...MONO,
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  padding: "5px 10px",
                  border: "1px solid #D0D0D0",
                  color: "#505050",
                  background: "#F4F4F4",
                  lineHeight: 1,
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
                  letterSpacing: "0.1em",
                  padding: "5px 10px",
                  background: "#FF3C54",
                  color: "#FFFFFF",
                  lineHeight: 1,
                }}
              >
                ✓ Resuelto
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Funnel Display', sans-serif",
              fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
              fontWeight: 900,
              color: TEXT,
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {post.title}
          </h1>

          {/* Body */}
          <p
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontSize: 16,
              color: TEXT,
              lineHeight: 1.75,
              margin: 0,
              opacity: 0.8,
            }}
          >
            {post.body}
          </p>
        </div>

        {/* Right 1 col: author info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "28px 28px",
            gap: 20,
          }}
        >
          {/* Author identity */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                ...MONO,
                fontSize: 9,
                color: TEXT,
                opacity: 0.35,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Publicado por
            </div>
            <div
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: TEXT,
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexWrap: "wrap",
              }}
            >
              @{author?.handle || "—"}
              {author && <RoleBadge role={author.role} />}
            </div>
          </div>

          {/* Date */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                ...MONO,
                fontSize: 9,
                color: TEXT,
                opacity: 0.35,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Fecha
            </div>
            <div
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontSize: 13,
                color: TEXT,
                opacity: 0.6,
              }}
            >
              {formatDate(post.createdAt)}
            </div>
          </div>

          {/* Follow action */}
          <div style={{ marginTop: "auto" }}>
            {actionBtn(
              isFollowing,
              () =>
                currentUser ? followPost(post.id) : setShowAuthModal(true),
              "✓ Siguiendo",
              "Seguir hilo",
            )}
          </div>
        </div>
      </div>

      {/* ── Replies separator ─────────────────────────────────────────── */}

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
        <span
          style={{ ...MONO, fontSize: 10, fontWeight: 700, color: "#FF3C54" }}
        >
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

      {/* ── Bottom back link ──────────────────────────────────────────── */}
      <div
        style={{
          borderTop: B,
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => navigate("/comunidad")}
          style={{
            ...MONO,
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: TEXT,
            background: "none",
            border: "1px solid #0A0A0A",
            cursor: "pointer",
            padding: "10px 24px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FF3C54";
            e.currentTarget.style.borderColor = "#FF3C54";
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none";
            e.currentTarget.style.borderColor = "#0A0A0A";
            e.currentTarget.style.color = TEXT;
          }}
        >
          Volver a hilos
        </button>
      </div>
    </div>
  );
}
