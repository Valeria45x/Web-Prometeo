import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComunidad } from "../../context/ComunidadContext";
import Button from "../system/Button";
import { Grid, GridCell } from "../system/Grid";
import RoleBadge from "./RoleBadge";
import ReplyCard from "./ReplyCard";
import {
  COMMUNITY_BORDERS,
  COMMUNITY_COLORS,
  COMMUNITY_FONTS,
  formatCommunityDate,
} from "./shared";

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

  function handleReply(event) {
    event.preventDefault();
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    if (!currentUser.emailVerified) {
      setReplyError("Confirma tu email para responder.");
      return;
    }
    if (!replyBody.trim()) {
      setReplyError("La respuesta no puede estar vacia.");
      return;
    }
    createReply(post.id, replyBody.trim());
    setReplyBody("");
    setReplyError("");
  }

  return (
    <div
      style={{
        borderLeft: COMMUNITY_BORDERS.light,
        background: COMMUNITY_COLORS.lightBackground,
      }}
    >
      <div
        style={{
          borderBottom: COMMUNITY_BORDERS.light,
          padding: "0 32px",
          height: 56,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          variant="outline"
          surface="light"
          emphasis="neutral"
          size="md"
          font="mono"
          onClick={() => navigate("/comunidad")}
        >
          Volver a hilos
        </Button>
      </div>

      <Grid
        columns="site"
        style={{
          borderBottom: COMMUNITY_BORDERS.light,
        }}
      >
        <GridCell
          span={3}
          style={{
            borderRight: COMMUNITY_BORDERS.light,
            padding: "28px 40px 40px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  ...COMMUNITY_FONTS.mono,
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  padding: "5px 10px",
                  border: "1px solid #d0d0d0",
                  color: COMMUNITY_COLORS.mutedText,
                  background: COMMUNITY_COLORS.mutedBackground,
                  lineHeight: 1,
                }}
              >
                {tag}
              </span>
            ))}
            {post.isSolved && (
              <span
                style={{
                  ...COMMUNITY_FONTS.mono,
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  padding: "5px 10px",
                  background: COMMUNITY_COLORS.accent,
                  color: COMMUNITY_COLORS.lightBackground,
                  lineHeight: 1,
                }}
              >
                Resuelto
              </span>
            )}
          </div>

          <h1
            style={{
              fontFamily: COMMUNITY_FONTS.display,
              fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
              fontWeight: 900,
              color: COMMUNITY_COLORS.text,
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {post.title}
          </h1>

          <p
            style={{
              fontFamily: COMMUNITY_FONTS.sans,
              fontSize: 16,
              color: COMMUNITY_COLORS.text,
              lineHeight: 1.75,
              margin: 0,
              opacity: 0.8,
            }}
          >
            {post.body}
          </p>
        </GridCell>

        <GridCell
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "28px 28px",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                ...COMMUNITY_FONTS.mono,
                fontSize: 9,
                color: COMMUNITY_COLORS.text,
                opacity: 0.35,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Publicado por
            </div>
            <div
              style={{
                fontFamily: COMMUNITY_FONTS.sans,
                fontSize: 14,
                fontWeight: 700,
                color: COMMUNITY_COLORS.text,
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexWrap: "wrap",
              }}
            >
              @{author?.handle || "-"}
              {author && <RoleBadge role={author.role} />}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                ...COMMUNITY_FONTS.mono,
                fontSize: 9,
                color: COMMUNITY_COLORS.text,
                opacity: 0.35,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Fecha
            </div>
            <div
              style={{
                fontFamily: COMMUNITY_FONTS.sans,
                fontSize: 13,
                color: COMMUNITY_COLORS.text,
                opacity: 0.6,
              }}
            >
              {formatCommunityDate(post.createdAt, {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>

          <div style={{ marginTop: "auto" }}>
            <Button
              variant="inline"
              surface="light"
              size="xs"
              font="mono"
              active={Boolean(isFollowing)}
              underline="active"
              onClick={() =>
                currentUser ? followPost(post.id) : setShowAuthModal(true)
              }
            >
              {isFollowing ? "Siguiendo" : "Seguir hilo"}
            </Button>
          </div>
        </GridCell>
      </Grid>

      <div
        style={{
          padding: "16px 32px",
          borderBottom: COMMUNITY_BORDERS.light,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            ...COMMUNITY_FONTS.mono,
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: COMMUNITY_COLORS.text,
            opacity: 0.5,
          }}
        >
          Respuestas
        </span>
        <span
          style={{
            ...COMMUNITY_FONTS.mono,
            fontSize: 10,
            fontWeight: 700,
            color: COMMUNITY_COLORS.accent,
          }}
        >
          {replies.length}
        </span>
      </div>

      {sortedReplies.length === 0 ? (
        <div style={{ padding: "32px", borderBottom: COMMUNITY_BORDERS.light }}>
          <span
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 9,
              color: COMMUNITY_COLORS.text,
              opacity: 0.25,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Sin respuestas todavia. Se la primera.
          </span>
        </div>
      ) : (
        sortedReplies.map((reply) => (
          <ReplyCard key={reply.id} reply={reply} postId={post.id} />
        ))
      )}

      <div style={{ borderTop: COMMUNITY_BORDERS.light }}>
        <div
          style={{
            padding: "16px 32px",
            borderBottom: COMMUNITY_BORDERS.light,
          }}
        >
          <span
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: COMMUNITY_COLORS.text,
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
                fontFamily: COMMUNITY_FONTS.sans,
                fontSize: 14,
                color: COMMUNITY_COLORS.text,
                opacity: 0.45,
              }}
            >
              Inicia sesion o registrate para responder.
            </span>
            <Button
              variant="primary"
              surface="light"
              emphasis="accent"
              size="md"
              font="mono"
              onClick={() => setShowAuthModal(true)}
            >
              Acceder
            </Button>
          </div>
        ) : !currentUser.emailVerified ? (
          <div
            style={{
              padding: "20px",
              borderLeft: `2px solid ${COMMUNITY_COLORS.accent}`,
              margin: "0 32px 32px",
            }}
          >
            <span
              style={{
                fontFamily: COMMUNITY_FONTS.sans,
                fontSize: 14,
                color: COMMUNITY_COLORS.accent,
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
                background: "#f7f7f7",
                border: COMMUNITY_BORDERS.light,
                color: COMMUNITY_COLORS.text,
                fontFamily: COMMUNITY_FONTS.sans,
                fontSize: 15,
                padding: "16px",
                outline: "none",
                resize: "vertical",
                minHeight: 128,
                boxSizing: "border-box",
                lineHeight: 1.6,
                caretColor: COMMUNITY_COLORS.accent,
              }}
              placeholder="Escribe tu respuesta..."
              value={replyBody}
              onChange={(event) => setReplyBody(event.target.value)}
            />
            {replyError && (
              <span
                style={{
                  ...COMMUNITY_FONTS.mono,
                  fontSize: 9,
                  color: COMMUNITY_COLORS.accent,
                }}
              >
                {replyError}
              </span>
            )}
            <Button
              type="submit"
              variant="primary"
              surface="light"
              emphasis="accent"
              size="md"
              font="mono"
              align="start"
              style={{ alignSelf: "flex-start" }}
            >
              Publicar respuesta
            </Button>
          </form>
        )}
      </div>

      <div
        style={{
          borderTop: COMMUNITY_BORDERS.light,
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          variant="outline"
          surface="light"
          emphasis="neutral"
          size="md"
          font="mono"
          onClick={() => navigate("/comunidad")}
        >
          Volver a hilos
        </Button>
      </div>
    </div>
  );
}
