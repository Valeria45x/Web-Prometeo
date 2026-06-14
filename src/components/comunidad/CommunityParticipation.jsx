import { Link } from "react-router-dom";
import { COLORS } from "../../design/tokens";
import Button from "../system/Button";
import SplitCtaButton from "../system/SplitCtaButton";
import { ACCOUNT_JOURNEY } from "../account/accountJourney";
import { getRoleLabel } from "./shared";

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

        <SplitCtaButton
          label={ACCOUNT_JOURNEY.contexts.community.primaryCta}
          color={COLORS.textOnLight}
          iconBg={COLORS.pageLight}
          fullWidth
          onClick={onOpenNewThread}
        />
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
      <SplitCtaButton
        label={ACCOUNT_JOURNEY.contexts.community.guestCta}
        color={COLORS.textOnLight}
        iconBg={COLORS.pageLight}
        fullWidth
        onClick={onOpenAuth}
      />
      <Button
        as={Link}
        to="/perfil"
        variant="ghost"
        surface="light"
        size="md"
        align="start"
      >
        Conocer mi Cuenta Prometeo
      </Button>
      <p className="community-participation__notice">
        Esta comunidad es una demostración local. Los datos se guardan únicamente en este navegador.
      </p>
    </div>
  );
}
