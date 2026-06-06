import { Link } from "react-router-dom";
import { ACCOUNT_JOURNEY } from "../account/accountJourney";
import { getRoleLabel } from "./shared";

function ArrowIcon() {
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
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default function CommunityParticipation({
  currentUser,
  userPostCount,
  userReplyCount,
  onOpenAuth,
  onOpenNewThread,
}) {
  const savedCount = currentUser?.savedPosts?.length ?? 0;

  if (currentUser) {
    return (
      <div className="community-participation">
        <div className="community-participation__avatar">
          <span aria-hidden="true">
            {currentUser.displayName?.[0]?.toUpperCase() ?? "P"}
          </span>
        </div>

        <div className="community-participation__identity">
          <strong className="community-participation__name">
            {currentUser.displayName}
          </strong>
          <span className="community-participation__handle">
            @{currentUser.handle}
            {" · "}
            <span>{getRoleLabel(currentUser.role)}</span>
          </span>
        </div>

        <div className="community-participation__stats">
          {[
            { label: "Hilos", value: userPostCount },
            { label: "Respuestas", value: userReplyCount },
            { label: "Guardados", value: savedCount },
          ].map((item) => (
            <div key={item.label} className="community-participation__stat">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="community-participation__new-post"
          onClick={onOpenNewThread}
        >
          <PlusIcon />
          <span>{ACCOUNT_JOURNEY.contexts.community.primaryCta}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="community-participation community-participation--guest">
      <p className="community-participation__guest-label">
        Únete a la conversación
      </p>
      <p className="community-participation__guest-desc">
        La Cuenta Prometeo conecta tu nombre, tus preguntas y tus respuestas en un solo perfil.
      </p>
      <button
        type="button"
        className="community-participation__action"
        onClick={onOpenAuth}
      >
        <span>{ACCOUNT_JOURNEY.contexts.community.guestCta}</span>
        <span className="community-participation__action-icon">
          <ArrowIcon />
        </span>
      </button>
      <Link
        className="community-participation__action community-participation__action--secondary"
        to="/perfil"
      >
        <span>Conocer mi Cuenta Prometeo</span>
        <span className="community-participation__action-icon">
          <ArrowIcon />
        </span>
      </Link>
      <p className="community-participation__notice">
        Esta comunidad es una demostración local. Los datos se guardan únicamente en este navegador.
      </p>
    </div>
  );
}
