import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TH } from "../../constants";
import { useComunidad } from "../../context/ComunidadContext";
import Footer from "../Footer";
import Button from "../system/Button";
import RoleBadge from "./RoleBadge";
import ReplyCard from "./ReplyCard";
import {
  COMMUNITY_BORDERS,
  COMMUNITY_COLORS,
  COMMUNITY_FONTS,
  formatCommunityDate,
} from "./shared";
import { useMediaQuery } from "../../hooks/useMediaQuery";

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
  const location = useLocation();
  const author = getUserById(post.authorId);
  const replies = getRepliesForPost(post.id);
  const isFollowing = currentUser && post.followerIds.includes(currentUser.id);
  const hasReplies = replies.length > 0;

  const [replyBody, setReplyBody] = useState("");
  const [replyError, setReplyError] = useState("");
  const [contentHeight, setContentHeight] = useState(0);
  const [showStickyTitle, setShowStickyTitle] = useState(false);
  const contentRef = useRef(null);
  const replySectionRef = useRef(null);
  const titleRef = useRef(null);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const contentElement = contentRef.current;

    if (!contentElement) return undefined;

    const updateContentHeight = () => {
      setContentHeight(contentElement.scrollHeight);
    };

    updateContentHeight();

    const observer = new ResizeObserver(() => {
      updateContentHeight();
    });
    observer.observe(contentElement);
    return () => observer.disconnect();
  }, [isMobileLayout]);

  useEffect(() => {
    const titleElement = titleRef.current;

    if (!titleElement || typeof IntersectionObserver === "undefined") {
      setShowStickyTitle(false);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyTitle(!entry.isIntersecting);
      },
      {
        threshold: 0.05,
        rootMargin: `-${TH * 2 + 12}px 0px 0px 0px`,
      },
    );

    observer.observe(titleElement);
    return () => observer.disconnect();
  }, [post.id]);

  const wrapperHeight =
    contentHeight > 0
      ? contentHeight +
        (typeof window === "undefined" ? 0 : window.innerHeight) -
        TH
      : isMobileLayout
        ? `calc(200svh - ${TH}px)`
        : "auto";
  const backTargetState = location.state?.from;
  const backTarget = backTargetState
    ? `${backTargetState.pathname}${backTargetState.search ?? ""}`
    : "/comunidad";
  const threadStatusLabel =
    post.isSolved && hasReplies ? "Resuelto" : "Abierto";
  const followerCount = post.followerIds.length;
  const replyCountLabel =
    replies.length === 0
      ? "Sin respuestas"
      : `${replies.length} ${replies.length === 1 ? "respuesta" : "respuestas"}`;
  const followerCountLabel = `${followerCount} ${
    followerCount === 1 ? "seguidor" : "seguidores"
  }`;
  const followButtonVariant = isFollowing ? "primary" : "outline";
  const followButtonEmphasis = isFollowing ? "accent" : "neutral";
  const followButtonLabel = isFollowing ? "Siguiendo" : "Seguir hilo";

  const sortedReplies = [...replies].sort((a, b) => {
    if (a.isSolution && !b.isSolution) return -1;
    if (!a.isSolution && b.isSolution) return 1;
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  function scrollToReplySection() {
    if (!replySectionRef.current) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    replySectionRef.current.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  function handleBackToThreads() {
    navigate(backTarget, {
      state:
        typeof backTargetState?.scrollY === "number"
          ? {
              preserveScroll: true,
              restoreScrollY: backTargetState.scrollY,
            }
          : undefined,
    });
  }

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

  const threadActionControls = (
    <div
      className="community-thread__quick-actions"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        width: isMobileLayout ? "100%" : "min(360px, 100%)",
        border: COMMUNITY_BORDERS.soft,
        background: COMMUNITY_COLORS.lightPanel,
        overflow: "hidden",
      }}
    >
      <div
        className="community-thread__action-cell"
        style={{
          display: "flex",
          minWidth: 0,
          minHeight: 48,
          borderRight: COMMUNITY_BORDERS.soft,
        }}
      >
        <Button
          className="community-thread__follow"
          variant={followButtonVariant}
          surface="light"
          emphasis={followButtonEmphasis}
          size="sm"
          font="mono"
          fullWidth
          align="start"
          style={{
            border: "none",
            minHeight: "100%",
            height: "100%",
            boxSizing: "border-box",
            "--ds-button-hover-translate": "0",
          }}
          onClick={() =>
            currentUser ? followPost(post.id) : setShowAuthModal(true)
          }
        >
          {followButtonLabel}
        </Button>
      </div>
      <div
        className="community-thread__action-cell"
        style={{ display: "flex", minWidth: 0, minHeight: 48 }}
      >
        <Button
          variant="outline"
          surface="light"
          emphasis="neutral"
          size="sm"
          font="mono"
          fullWidth
          align="start"
          style={{
            border: "none",
            minHeight: "100%",
            height: "100%",
            boxSizing: "border-box",
            "--ds-button-hover-translate": "0",
          }}
          onClick={scrollToReplySection}
        >
          Ir a responder
        </Button>
      </div>
    </div>
  );

  const threadContent = (
    <div
      ref={contentRef}
      className="community-thread"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        borderLeft: isMobileLayout ? "none" : COMMUNITY_BORDERS.light,
        background: COMMUNITY_COLORS.lightBackground,
      }}
    >
      <div
        className="community-thread__topbar"
        style={{
          position: "sticky",
          top: TH,
          zIndex: 6,
          borderBottom: COMMUNITY_BORDERS.light,
          background: "rgba(255,255,255,0.94)",
        }}
      >
        <div
          className="community-thread__topbar-inner"
          style={{
            minHeight: TH,
            padding: "8px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div
            className="community-thread__topbar-info"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outline"
              surface="light"
              emphasis="neutral"
              size="sm"
              font="mono"
              onClick={handleBackToThreads}
            >
              ← Volver a hilos
            </Button>

            {showStickyTitle && !isMobileLayout && (
              <div
                className="community-thread__topbar-copy"
                style={{
                  display: "flex",
                  alignItems: "center",
                  minHeight: 36,
                  padding: "0 4px 0 2px",
                  minWidth: 0,
                }}
              >
                <span
                  className="community-thread__topbar-title"
                  style={{
                    fontFamily: COMMUNITY_FONTS.sans,
                    fontSize: 13,
                    fontWeight: 700,
                    color: COMMUNITY_COLORS.text,
                    minWidth: 0,
                    maxWidth: 420,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {post.title}
                </span>
              </div>
            )}
          </div>

          {!isMobileLayout && threadActionControls}
        </div>
      </div>

      {isMobileLayout && (
        <div
          className="community-thread__mobile-actions"
          style={{
            padding: "0 20px 12px",
            borderBottom: COMMUNITY_BORDERS.light,
            background: COMMUNITY_COLORS.lightBackground,
          }}
        >
          {threadActionControls}
        </div>
      )}

      <div
        className="community-thread__header"
        style={{
          borderBottom: COMMUNITY_BORDERS.light,
          padding: "48px 32px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          className="community-thread__tags"
          style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
        >
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
          <span
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 9,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "5px 10px",
              border:
                post.isSolved && hasReplies ? "none" : "1px solid #d0d0d0",
              background:
                post.isSolved && hasReplies
                  ? COMMUNITY_COLORS.accent
                  : COMMUNITY_COLORS.mutedBackground,
              color:
                post.isSolved && hasReplies
                  ? COMMUNITY_COLORS.lightBackground
                  : COMMUNITY_COLORS.mutedText,
              lineHeight: 1,
            }}
          >
            {threadStatusLabel}
          </span>
        </div>

        <h1
          ref={titleRef}
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

        <div
          className="community-thread__meta"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: COMMUNITY_FONTS.sans,
              fontSize: 13,
              fontWeight: 700,
              color: COMMUNITY_COLORS.text,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            @{author?.handle || "-"}
            {author && <RoleBadge role={author.role} />}
          </span>
          <span
            className="community-thread__dot"
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 9,
              color: COMMUNITY_COLORS.text,
              opacity: 0.25,
            }}
          >
            &middot;
          </span>
          <span
            style={{
              fontFamily: COMMUNITY_FONTS.sans,
              fontSize: 13,
              color: COMMUNITY_COLORS.text,
              opacity: 0.5,
            }}
          >
            {formatCommunityDate(post.createdAt, {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span
            className="community-thread__dot"
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 9,
              color: COMMUNITY_COLORS.text,
              opacity: 0.25,
            }}
          >
            &middot;
          </span>
          <span
            style={{
              fontFamily: COMMUNITY_FONTS.sans,
              fontSize: 13,
              color: COMMUNITY_COLORS.text,
              opacity: hasReplies ? 0.7 : 0.4,
              fontWeight: hasReplies ? 700 : 400,
            }}
          >
            {replyCountLabel}
          </span>
          <span
            className="community-thread__dot"
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 9,
              color: COMMUNITY_COLORS.text,
              opacity: 0.25,
            }}
          >
            &middot;
          </span>
          <span
            style={{
              fontFamily: COMMUNITY_FONTS.sans,
              fontSize: 13,
              color: COMMUNITY_COLORS.text,
              opacity: 0.5,
            }}
          >
            {followerCountLabel}
          </span>
        </div>

        <div
          className="community-thread__body-shell"
          style={{
            width: `calc(100% + ${isMobileLayout ? 40 : 64}px)`,
            maxWidth: `calc(100% + ${isMobileLayout ? 40 : 64}px)`,
            marginLeft: isMobileLayout ? -20 : -32,
            marginRight: isMobileLayout ? -20 : -32,
            border: COMMUNITY_BORDERS.soft,
            background: COMMUNITY_COLORS.lightPanel,
            padding: "22px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxSizing: "border-box",
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
            Descripcion
          </span>
          <p
            className="community-thread__body"
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
        </div>
      </div>

      <div
        className="community-thread__summary"
        style={{
          padding: "12px 32px",
          borderBottom: COMMUNITY_BORDERS.light,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
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
          {hasReplies ? "Respuestas" : "Sin respuestas"}
        </span>
        {hasReplies && (
          <span
            style={{
              fontFamily: COMMUNITY_FONTS.sans,
              fontSize: 13,
              color: COMMUNITY_COLORS.text,
              opacity: 0.55,
            }}
          >
            {replyCountLabel}
          </span>
        )}
      </div>

      {sortedReplies.length > 0 &&
        sortedReplies.map((reply) => (
          <ReplyCard key={reply.id} reply={reply} postId={post.id} />
        ))}

      <div
        ref={replySectionRef}
        style={{
          borderTop: COMMUNITY_BORDERS.light,
          scrollMarginTop: TH * 2 + 24,
        }}
      >
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
            Responder
          </span>
        </div>

        {!currentUser ? (
          <div
            className="community-thread__auth"
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
            className="community-thread__notice"
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
            className="community-thread__form"
            style={{
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <textarea
              id="community-reply-body"
              name="replyBody"
              autoComplete="off"
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
              className="community-thread__submit"
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

      <div
        aria-hidden="true"
        className="community-divider"
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
  );

  return (
    <div style={{ position: "relative", height: wrapperHeight }}>
      <Footer variant="landing" mobileReveal={isMobileLayout} />
      {threadContent}
    </div>
  );
}
