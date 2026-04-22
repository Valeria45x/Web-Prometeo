import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComunidad } from "../../context/ComunidadContext";
import GridMeta from "../GridMeta";
import RedCell from "../RedCell";
import StripeDecor from "../StripeDecor";
import RoleBadge from "./RoleBadge";
import TagChip from "./TagChip";
import ReplyCard from "./ReplyCard";

const B = "1px solid #303030";

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
      setReplyError("La respuesta no puede estar vacía.");
      return;
    }
    createReply(post.id, replyBody.trim());
    setReplyBody("");
    setReplyError("");
  }

  return (
    <div style={{ borderLeft: B }}>
      {/* GridMeta */}
      <GridMeta code="PRO-006" />

      {/* Header row: back + title + RedCell */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {/* Back + title — span 3 */}
        <div
          style={{
            gridColumn: "span 3",
            borderRight: B,
            borderBottom: B,
            padding: "32px 32px 28px",
          }}
        >
          <button
            onClick={() => navigate("/comunidad")}
            style={{
              background: "none",
              border: "none",
              fontFamily: "monospace",
              fontSize: 7,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#C8C8C8",
              opacity: 0.4,
              cursor: "pointer",
              padding: 0,
              marginBottom: 20,
              display: "block",
            }}
          >
            ← Comunidad
          </button>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              gap: 4,
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
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

          <h1
            style={{
              fontFamily: "'Funnel Display', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 900,
              color: "#C8C8C8",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {post.title}
          </h1>
        </div>

        {/* RedCell — span 1 */}
        <RedCell text="HILO" style={{ borderBottom: B, minHeight: 160 }} />
      </div>

      {/* Body row: content + metadata sidebar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {/* Post body — span 3 */}
        <div
          style={{
            gridColumn: "span 3",
            borderRight: B,
            borderBottom: B,
            padding: "28px 32px",
          }}
        >
          <p
            style={{
              fontFamily: "'Funnel Sans', sans-serif",
              fontSize: 15,
              color: "#C8C8C8",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {post.body}
          </p>
        </div>

        {/* Metadata sidebar — span 1 */}
        <div
          style={{
            borderBottom: B,
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Author */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 6,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#C8C8C8",
                opacity: 0.35,
              }}
            >
              Autor
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 9,
                fontWeight: 700,
                color: "#C8C8C8",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              @{author?.handle || "—"}
            </span>
            {author && <RoleBadge role={author.role} />}
          </div>

          {/* Date */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 6,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#C8C8C8",
                opacity: 0.35,
              }}
            >
              Publicado
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 8,
                color: "#C8C8C8",
                opacity: 0.6,
              }}
            >
              {formatDate(post.createdAt)}
            </span>
          </div>

          {/* Upvote */}
          <button
            onClick={() =>
              currentUser ? upvotePost(post.id) : setShowAuthModal(true)
            }
            style={{
              background: "none",
              border: hasUpvoted ? "1px solid #FF3C54" : B,
              color: hasUpvoted ? "#FF3C54" : "#C8C8C8",
              fontFamily: "monospace",
              fontSize: 7,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "8px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            ▲ {post.upvotes} votos
          </button>

          {/* Follow */}
          <button
            onClick={() =>
              currentUser ? followPost(post.id) : setShowAuthModal(true)
            }
            style={{
              background: isFollowing ? "#303030" : "none",
              border: B,
              color: "#C8C8C8",
              fontFamily: "monospace",
              fontSize: 7,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            {isFollowing ? "✓ Siguiendo" : "Seguir hilo"}
          </button>
        </div>
      </div>

      {/* Stripe separator */}
      <StripeDecor />

      {/* Replies header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderBottom: B,
        }}
      >
        <div
          style={{
            gridColumn: "span 4",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#C8C8C8",
            }}
          >
            Respuestas{" "}
            <span style={{ color: "#FF3C54" }}>{replies.length}</span>
          </span>
        </div>
      </div>

      {/* Replies list */}
      {sortedReplies.length === 0 && (
        <div style={{ padding: "32px 24px", borderBottom: B }}>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              color: "#C8C8C8",
              opacity: 0.3,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              margin: 0,
            }}
          >
            Sin respuestas todavía. Sé el primero.
          </p>
        </div>
      )}

      {sortedReplies.map((reply) => (
        <ReplyCard key={reply.id} reply={reply} postId={post.id} />
      ))}

      {/* Reply form */}
      <div style={{ borderBottom: B, borderTop: B }}>
        <div style={{ padding: "20px 24px", borderBottom: B }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#C8C8C8",
            }}
          >
            Tu respuesta
          </span>
        </div>

        {!currentUser ? (
          <div
            style={{
              padding: "24px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontSize: 13,
                color: "#C8C8C8",
                opacity: 0.5,
                margin: 0,
              }}
            >
              Inicia sesión o regístrate para responder.
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              style={{
                background: "#FF3C54",
                color: "#0A0A0A",
                border: "none",
                padding: "8px 20px",
                fontFamily: "monospace",
                fontSize: 7,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              Acceder
            </button>
          </div>
        ) : !currentUser.emailVerified ? (
          <div style={{ padding: "24px", borderLeft: "3px solid #FF3C54" }}>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontSize: 13,
                color: "#FF3C54",
                margin: 0,
              }}
            >
              Confirma tu email para responder.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleReply}
            style={{
              padding: 24,
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
              }}
              placeholder="Escribe tu respuesta..."
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
            />
            {replyError && (
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: 7,
                  color: "#FF3C54",
                  margin: 0,
                }}
              >
                {replyError}
              </p>
            )}
            <button
              type="submit"
              style={{
                alignSelf: "flex-start",
                background: "#FF3C54",
                color: "#0A0A0A",
                border: "none",
                padding: "10px 24px",
                fontFamily: "monospace",
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
