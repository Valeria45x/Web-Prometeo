import { Link } from "react-router-dom";
import { COLORS } from "../../design/tokens";
import { ACCOUNT_JOURNEY } from "../account/accountJourney";
import Label from "../system/Label";
import { Grid, GridCell } from "../system/Grid";
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

function ParticipationAction({ as: Component = "button", children, ...props }) {
  const componentProps =
    Component === "button" ? { type: "button", ...props } : props;

  return (
    <Component className="community-participation__action" {...componentProps}>
      <span>{children}</span>
      <span className="community-participation__action-icon">
        <ArrowIcon />
      </span>
    </Component>
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

  return (
    <section
      className="community-participation"
      aria-labelledby="community-participation-title"
    >
      <Grid columns="site" className="community-participation__grid">
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="community-participation__intro"
        >
          <Label color={COLORS.accent}>
            {currentUser ? "Tu identidad" : "Participar"}
          </Label>

          <h2 id="community-participation-title">
            {currentUser
              ? currentUser.displayName
              : "Una identidad para dar continuidad a lo que compartes."}
          </h2>

          <p>
            {currentUser
              ? "Tu perfil da contexto a tus aportaciones y reúne tus hilos, respuestas y conversaciones guardadas."
              : "La Cuenta Prometeo conecta tu nombre, tus preguntas y tus respuestas sin crear un perfil diferente para cada espacio."}
          </p>

          {currentUser ? (
            <div
              className="community-participation__handle"
              data-animate-text
            >
              <span>@{currentUser.handle}</span>
              <span aria-hidden="true">/</span>
              <span>{getRoleLabel(currentUser.role)}</span>
            </div>
          ) : (
            <p className="community-participation__notice">
              Esta comunidad es una demostración local. Los datos se guardan
              únicamente en este navegador.
            </p>
          )}
        </GridCell>

        {currentUser ? (
          <>
            <GridCell className="community-participation__stats">
              {[
                { label: "Hilos", value: userPostCount },
                { label: "Respuestas", value: userReplyCount },
                { label: "Guardados", value: savedCount },
              ].map((item) => (
                <div key={item.label} className="community-participation__stat">
                  <strong data-animate-text>{item.value}</strong>
                  <span data-animate-text>{item.label}</span>
                </div>
              ))}
            </GridCell>

            <GridCell className="community-participation__avatar">
              <span aria-hidden="true">
                {currentUser.displayName?.[0]?.toUpperCase() ?? "P"}
              </span>
            </GridCell>
          </>
        ) : (
          <GridCell
            span={2}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="community-participation__guest-mark"
            aria-hidden="true"
          >
            <span data-animate-text>Comunidad</span>
          </GridCell>
        )}
      </Grid>

      <div className="community-participation__actions">
        {currentUser ? (
          <>
            <ParticipationAction onClick={onOpenNewThread}>
              {ACCOUNT_JOURNEY.contexts.community.primaryCta}
            </ParticipationAction>
            <ParticipationAction as={Link} to="/perfil">
              Ver y gestionar mi perfil
            </ParticipationAction>
          </>
        ) : (
          <>
            <ParticipationAction onClick={onOpenAuth}>
              {ACCOUNT_JOURNEY.contexts.community.guestCta}
            </ParticipationAction>
            <ParticipationAction as={Link} to="/perfil">
              Conocer mi Cuenta Prometeo
            </ParticipationAction>
          </>
        )}
      </div>
    </section>
  );
}
