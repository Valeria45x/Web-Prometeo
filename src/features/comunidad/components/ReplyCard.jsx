import { useEffect, useState } from "react";
import { useComunidad } from "@/context/ComunidadContext";
import ActionButton from "@/shared/ui/ActionButton";
import RoleBadge from "@/features/comunidad/components/RoleBadge";
import { formatCommunityDate } from "@/features/comunidad/shared";

export default function ReplyCard({ reply, postId, index, nested = false }) {
  const {
    currentUser,
    getUserById,
    markSolution,
    updateReply,
    deleteReply,
    createReply,
    setShowAuthModal,
  } = useComunidad();
  const author = getUserById(reply.authorId);
  const isTeam = currentUser?.role === "prometeo_team";
  const isAuthor = currentUser?.id === reply.authorId;
  const canMarkSolution = isTeam && !reply.isSolution;
  const canUnmarkSolution = isTeam && reply.isSolution;
  const [isEditing, setIsEditing] = useState(false);
  const [draftBody, setDraftBody] = useState(reply.body);
  const [isReplying, setIsReplying] = useState(false);
  const [nestedBody, setNestedBody] = useState("");
  const [localError, setLocalError] = useState("");
  const authorInitial = (author?.displayName?.[0] ?? "P").toUpperCase();

  useEffect(() => {
    setDraftBody(reply.body);
    setIsEditing(false);
    setLocalError("");
  }, [reply.body]);

  function handleSaveEdit() {
    if (!draftBody.trim()) {
      setLocalError("La respuesta no puede estar vacia.");
      return;
    }

    updateReply(reply.id, draftBody.trim());
    setIsEditing(false);
    setLocalError("");
  }

  function cancelEdit() {
    setDraftBody(reply.body);
    setIsEditing(false);
    setLocalError("");
  }

  function openNestedReply() {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    setIsReplying((value) => !value);
    setLocalError("");
  }

  function handleNestedReply(event) {
    event.preventDefault();

    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    if (!currentUser.emailVerified) {
      setLocalError("Confirma tu email para responder.");
      return;
    }
    if (!nestedBody.trim()) {
      setLocalError("La respuesta no puede estar vacia.");
      return;
    }

    createReply(postId, nestedBody.trim(), reply.id);
    setNestedBody("");
    setIsReplying(false);
    setLocalError("");
  }

  return (
    <article
      className={[
        "community-reply-card",
        reply.isSolution && "community-reply-card--solution",
        nested && "community-reply-card--nested",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="community-reply-card__header">
        <div className="community-reply-card__identity">
          <span className="community-reply-card__avatar" aria-hidden="true">
            {authorInitial}
          </span>
          <div>
            <div className="community-reply-card__author">
              <strong>{author?.displayName ?? "Comunidad Prometeo"}</strong>
              {author && <RoleBadge role={author.role} />}
            </div>
            <span className="community-reply-card__meta">
              @{author?.handle || "usuario"} -{" "}
              {formatCommunityDate(reply.createdAt)}
            </span>
          </div>
        </div>

        {reply.isSolution ? (
          <span className="community-reply-card__solution-label">
            Respuesta verificada
          </span>
        ) : (
          <span className="community-reply-card__index">
            {nested
              ? `Respuesta a ${String(index)}`
              : `Respuesta ${String(index).padStart(2, "0")}`}
          </span>
        )}
      </header>

      {isEditing ? (
        <div className="community-reply-card__editor">
          <label htmlFor={`reply-${reply.id}`}>Editar respuesta</label>
          <textarea
            id={`reply-${reply.id}`}
            value={draftBody}
            onChange={(event) => setDraftBody(event.target.value)}
          />
          {localError ? (
            <span className="community-reply-card__error">{localError}</span>
          ) : null}
        </div>
      ) : (
        <p className="community-reply-card__body">{reply.body}</p>
      )}

      <footer className="community-reply-card__actions">
        {!isEditing ? (
          <ActionButton label="Responder" onClick={openNestedReply} />
        ) : null}

        {isAuthor && !isEditing ? (
          <>
            <ActionButton label="Editar" onClick={() => setIsEditing(true)} />
            <ActionButton
              label="Eliminar"
              onClick={() => deleteReply(reply.id)}
            />
          </>
        ) : null}

        {isAuthor && isEditing ? (
          <>
            <ActionButton
              variant="primary"
              label="Guardar cambios"
              onClick={handleSaveEdit}
            />
            <ActionButton label="Cancelar" onClick={cancelEdit} />
          </>
        ) : null}

        {canMarkSolution ? (
          <ActionButton
            variant="primary"
            label="Marcar como verificada"
            onClick={() => markSolution(reply.id, postId)}
          />
        ) : null}
        {canUnmarkSolution ? (
          <ActionButton
            label="Quitar verificacion"
            onClick={() => markSolution(reply.id, postId)}
          />
        ) : null}
      </footer>

      {isReplying ? (
        <form
          className="community-reply-card__nested-form"
          onSubmit={handleNestedReply}
        >
          <label htmlFor={`reply-to-${reply.id}`}>
            Responder a {author?.displayName ?? "esta respuesta"}
          </label>
          <textarea
            id={`reply-to-${reply.id}`}
            value={nestedBody}
            onChange={(event) => setNestedBody(event.target.value)}
            placeholder="Continua la conversacion..."
          />
          {localError ? (
            <span className="community-reply-card__error">{localError}</span>
          ) : null}
          <div className="community-reply-card__nested-actions">
            <ActionButton
              type="submit"
              variant="primary"
              label="Publicar respuesta"
            />
            <ActionButton
              label="Cancelar"
              onClick={() => setIsReplying(false)}
            />
          </div>
        </form>
      ) : null}
    </article>
  );
}
