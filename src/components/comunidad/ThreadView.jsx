import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TH } from "../../constants";
import { useComunidad } from "../../context/ComunidadContext";
import Footer from "../Footer";
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
  const hasReplies = replies.length > 0;

  const [replyBody, setReplyBody] = useState("");
  const [replyError, setReplyError] = useState("");
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver(() => {
      setContentHeight(contentRef.current.scrollHeight);
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  const wrapperHeight =
    contentHeight > 0 ? contentHeight + window.innerHeight - TH : "auto";

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
    <div style={{ position: "relative", height: wrapperHeight }}>
      <Footer variant="landing" />

      <div
        ref={contentRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          borderLeft: COMMUNITY_BORDERS.light,
          background: COMMUNITY_COLORS.lightBackground,
        }}
      >
        {/* Post header */}
        <Grid
          columns="site"
          style={{ borderBottom: COMMUNITY_BORDERS.light }}
        >
          <GridCell
            span={3}
            style={{
              borderRight: COMMUNITY_BORDERS.light,
              padding: "48px 48px 48px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Tags + solved badge */}
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
              {post.isSolved && hasReplies && (
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

            {/* Title */}
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

            {/* Body */}
            <p
              style={{
                fontFamily: COMMUNITY_FONTS.sans,
                fontSize: 16,
                color: COMMUNITY_COLORS.text,
                lineHeight: 1.75,
                margin: 0,
                opacity: 0.75,
              }}
            >
              {post.body}
            </p>
          </GridCell>

          {/* Right meta panel */}
          <GridCell
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "48px 28px",
              gap: 32,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span
                style={{
                  ...COMMUNITY_FONTS.mono,
                  fontSize: 7,
                  color: COMMUNITY_COLORS.text,
                  opacity: 0.35,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Publicado por
              </span>
              <span
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
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span
                style={{
                  ...COMMUNITY_FONTS.mono,
                  fontSize: 7,
                  color: COMMUNITY_COLORS.text,
                  opacity: 0.35,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Fecha
              </span>
              <span
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
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span
                style={{
                  ...COMMUNITY_FONTS.mono,
                  fontSize: 7,
                  color: COMMUNITY_COLORS.text,
                  opacity: 0.35,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Respuestas
              </span>
              <span
                style={{
                  fontFamily: COMMUNITY_FONTS.display,
                  fontSize: 24,
                  fontWeight: 900,
                  color: hasReplies ? COMMUNITY_COLORS.accent : COMMUNITY_COLORS.text,
                  opacity: hasReplies ? 1 : 0.2,
                  lineHeight: 1,
                }}
              >
                {replies.length}
              </span>
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

        {/* Replies */}
        <div
          style={{
            padding: "12px 32px",
            borderBottom: COMMUNITY_BORDERS.light,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 9,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: COMMUNITY_COLORS.text,
              opacity: 0.35,
            }}
          >
            {replies.length === 0
              ? "Sin respuestas"
              : `${replies.length} ${replies.length === 1 ? "respuesta" : "respuestas"}`}
          </span>
        </div>

        {sortedReplies.length > 0 &&
          sortedReplies.map((reply) => (
            <ReplyCard key={reply.id} reply={reply} postId={post.id} />
          ))
        }

        {/* Reply form */}
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
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: COMMUNITY_COLORS.text,
                opacity: 0.35,
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
                variant="outline"
                surface="light"
                emphasis="neutral"
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
                margin: "32px 32px",
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
                  background: COMMUNITY_COLORS.lightPanel,
                  border: COMMUNITY_BORDERS.soft,
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
                variant="outline"
                surface="light"
                emphasis="neutral"
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

        {/* Grid transition */}
        <div
          aria-hidden="true"
          style={{
            height: TH,
            borderTop: COMMUNITY_BORDERS.light,
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
          }}
        >
          <div style={{ borderRight: COMMUNITY_BORDERS.light }} />
          <div />
        </div>

        {/* Bottom back button row */}
        <div
          style={{
            height: TH,
            borderTop: COMMUNITY_BORDERS.light,
            display: "flex",
            alignItems: "center",
            paddingLeft: 32,
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

        {/* Grid transition before footer */}
        <div
          aria-hidden="true"
          style={{
            height: TH,
            borderTop: COMMUNITY_BORDERS.light,
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
          }}
        >
          <div style={{ borderRight: COMMUNITY_BORDERS.light }} />
          <div />
        </div>
      </div>
    </div>
  );
}
