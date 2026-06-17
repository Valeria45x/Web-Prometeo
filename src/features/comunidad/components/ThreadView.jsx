import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TH } from "@/constants";
import { useComunidad } from "@/context/ComunidadContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ActionButton from "@/shared/ui/ActionButton";
import Button from "@/shared/ui/Button";
import Footer from "@/shared/layout/Footer";
import RoleBadge from "@/features/comunidad/components/RoleBadge";
import ReplyCard from "@/features/comunidad/components/ReplyCard";
import { formatCommunityDate } from "@/features/comunidad/shared";

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 12H5" />
      <path d="m11 6-6 6 6 6" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 4v15" />
      <path d="m6 13 6 6 6-6" />
    </svg>
  );
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
    const observer = new ResizeObserver(updateContentHeight);
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
      ([entry]) => setShowStickyTitle(!entry.isIntersecting),
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
  const followerCount = post.followerIds.length;
  const threadStatusLabel =
    post.isSolved && hasReplies ? "Resuelto" : "Abierto";
  const replyCountLabel =
    replies.length === 0
      ? "Sin respuestas"
      : `${replies.length} ${replies.length === 1 ? "respuesta" : "respuestas"}`;
  const authorInitial = (author?.displayName?.[0] ?? "P").toUpperCase();

  const sortedReplies = [...replies].sort((first, second) => {
    if (first.isSolution && !second.isSolution) return -1;
    if (!first.isSolution && second.isSolution) return 1;
    return new Date(first.createdAt) - new Date(second.createdAt);
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

  function handleFollow() {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    followPost(post.id);
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
      setReplyError("La respuesta no puede estar vacía.");
      return;
    }

    createReply(post.id, replyBody.trim());
    setReplyBody("");
    setReplyError("");
  }

  const threadContent = (
    <article ref={contentRef} className="community-thread">
      <header className="community-thread__topbar">
        <button
          type="button"
          className="community-thread__back"
          onClick={handleBackToThreads}
        >
          <span className="community-thread__back-icon" aria-hidden="true">
            <ArrowLeftIcon />
          </span>
          <span className="community-thread__back-text">
            <span className="community-thread__desktop-label">
              Volver a comunidad
            </span>
            <span className="community-thread__mobile-label">Volver</span>
          </span>
        </button>

        <div className="community-thread__sticky-title" aria-live="polite">
          {showStickyTitle ? post.title : "Hilo de la comunidad"}
        </div>

        <button
          type="button"
          className={[
            "community-thread__topbar-action",
            isFollowing && "community-thread__topbar-action--active",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={handleFollow}
        >
          {isFollowing ? "Siguiendo" : "Seguir"}
        </button>
        <button
          type="button"
          className="community-thread__topbar-action community-thread__topbar-action--primary"
          onClick={scrollToReplySection}
        >
          Responder
        </button>
      </header>

      <section className="community-thread__hero">
        <div className="community-thread__hero-main">
          <div className="community-thread__eyebrow-row">
            <span>Pregunta de la comunidad</span>
            <span
              className={[
                "community-thread__status",
                post.isSolved &&
                  hasReplies &&
                  "community-thread__status--solved",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {threadStatusLabel}
            </span>
          </div>

          <h1 ref={titleRef}>{post.title}</h1>

          <div className="community-thread__author">
            <span
              className="community-thread__author-avatar"
              aria-hidden="true"
            >
              {authorInitial}
            </span>
            <div className="community-thread__author-copy">
              <div>
                <strong>{author?.displayName ?? "Comunidad Prometeo"}</strong>
                {author && <RoleBadge role={author.role} />}
              </div>
              <span>
                @{author?.handle || "prometeo"} ·{" "}
                {formatCommunityDate(post.createdAt, {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        <aside
          className="community-thread__context"
          aria-label="Contexto del hilo"
        >
          <div className="community-thread__context-block">
            <span className="community-thread__context-label">
              Sobre el tema
            </span>
            <div className="community-thread__tags">
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="community-thread__metrics">
            <div>
              <strong>{replies.length}</strong>
              <span>{replies.length === 1 ? "Respuesta" : "Respuestas"}</span>
            </div>
            <div>
              <strong>{followerCount}</strong>
              <span>Siguiendo</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="community-thread__question">
        <div className="community-thread__question-body">
          <p>{post.body}</p>
        </div>
      </section>

      <section
        className="community-thread__answers"
        aria-labelledby="thread-answers-title"
      >
        <header className="community-thread__answers-heading">
          <div>
            <span>Conversación</span>
            <h2 id="thread-answers-title">Respuestas</h2>
          </div>
          <span>{replyCountLabel}</span>
        </header>

        {sortedReplies.length > 0 ? (
          <div className="community-thread__answer-list">
            {sortedReplies.map((reply, index) => (
              <ReplyCard
                key={reply.id}
                reply={reply}
                postId={post.id}
                index={index + 1}
              />
            ))}
          </div>
        ) : (
          <div className="community-thread__empty-answers">
            <h3>Sé la primera persona en responder.</h3>
            <p>
              Comparte una explicación, una experiencia o una fuente que ayude a
              entender mejor la pregunta.
            </p>
          </div>
        )}
      </section>

      <section
        ref={replySectionRef}
        className="community-thread__reply-section"
        aria-labelledby="thread-reply-title"
      >
        <header className="community-thread__reply-heading">
          <div>
            <span>Participa</span>
            <h2 id="thread-reply-title">Tu respuesta</h2>
          </div>
        </header>

        <div className="community-thread__reply-panel">
          {!currentUser ? (
            <div className="community-thread__auth">
              <div>
                <strong>Accede para responder</strong>
                <span>
                  Tu Cuenta Prometeo conecta la respuesta con tu perfil.
                </span>
              </div>
              <Button
                variant="outline"
                surface="light"
                onClick={() => setShowAuthModal(true)}
              >
                Entrar o crear cuenta
              </Button>
            </div>
          ) : !currentUser.emailVerified ? (
            <div className="community-thread__notice">
              <strong>Confirma tu email</strong>
              <span>
                Necesitamos verificar tu cuenta antes de publicar respuestas.
              </span>
            </div>
          ) : (
            <form onSubmit={handleReply} className="community-thread__form">
              <label htmlFor="community-reply-body">Escribe tu respuesta</label>
              <textarea
                id="community-reply-body"
                name="replyBody"
                autoComplete="off"
                placeholder="Comparte lo que sabes…"
                value={replyBody}
                onChange={(event) => setReplyBody(event.target.value)}
              />
              <div className="community-thread__form-footer">
                {replyError ? (
                  <span className="community-thread__form-hint community-thread__form-hint--error">
                    {replyError}
                  </span>
                ) : null}
                <ActionButton
                  type="submit"
                  variant="primary"
                  label="Publicar respuesta"
                />
              </div>
            </form>
          )}
        </div>
      </section>

      <div aria-hidden="true" className="community-thread__end">
        <span>Fin del hilo</span>
        <ArrowDownIcon />
      </div>
    </article>
  );

  return (
    <div className="community-thread-wrapper" style={{ height: wrapperHeight }}>
      <Footer variant="landing" mobileReveal={isMobileLayout} />
      {threadContent}
    </div>
  );
}
