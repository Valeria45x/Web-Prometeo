import { useEffect, useState } from "react";
import { useComunidad } from "../../context/ComunidadContext";
import ActionButton from "../system/ActionButton";
import RoleBadge from "./RoleBadge";
import { formatCommunityDate } from "./shared";

export default function ReplyCard({ reply, postId, index }) {
  const { currentUser, getUserById, markSolution, updateReply, deleteReply } =
    useComunidad();
  const author = getUserById(reply.authorId);
  const isTeam = currentUser?.role === "prometeo_team";
  const isAuthor = currentUser?.id === reply.authorId;
  const canMarkSolution = isTeam && !reply.isSolution;
  const canUnmarkSolution = isTeam && reply.isSolution;
  const [isEditing, setIsEditing] = useState(false);
  const [draftBody, setDraftBody] = useState(reply.body);
  const [localError, setLocalError] = useState("");
  const authorInitial = (author?.displayName?.[0] ?? "P").toUpperCase();

  useEffect(() => {
    setDraftBody(reply.body);
    setIsEditing(false);
    setLocalError("");
  }, [reply.body]);

  function handleSaveEdit() {
    if (!draftBody.trim()) {
      setLocalError("La respuesta no puede estar vacía.");
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

  return (
    <article
      className={[
        "community-reply-card",
        reply.isSolution && "community-reply-card--solution",
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
              @{author?.handle || "usuario"} ·{" "}
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
            Respuesta {String(index).padStart(2, "0")}
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
          {localError && (
            <span className="community-reply-card__error">{localError}</span>
          )}
        </div>
      ) : (
        <p className="community-reply-card__body">{reply.body}</p>
      )}

      {(isAuthor || isTeam) && (
        <footer className="community-reply-card__actions">
          {isAuthor && !isEditing && (
            <>
              <ActionButton label="Editar" onClick={() => setIsEditing(true)} />
              <ActionButton
                label="Eliminar"
                onClick={() => deleteReply(reply.id)}
              />
            </>
          )}
          {isAuthor && isEditing && (
            <>
              <ActionButton
                variant="primary"
                label="Guardar cambios"
                onClick={handleSaveEdit}
              />
              <ActionButton label="Cancelar" onClick={cancelEdit} />
            </>
          )}
          {canMarkSolution && (
            <ActionButton
              variant="primary"
              label="Marcar como verificada"
              onClick={() => markSolution(reply.id, postId)}
            />
          )}
          {canUnmarkSolution && (
            <ActionButton
              label="Quitar verificación"
              onClick={() => markSolution(reply.id, postId)}
            />
          )}
        </footer>
      )}
    </article>
  );
}
