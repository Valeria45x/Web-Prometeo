import Button from "@/shared/ui/Button";
import { ACCOUNT_JOURNEY } from "@/shared/account/accountJourney";
import { getRoleLabel } from "@/features/comunidad/shared";

export default function ProfileHero({
  currentUser,
  avatarUrl,
  editing,
  onAvatarChange,
  onToggleEdit,
  onLogout,
  onConfirmEmail,
}) {
  return (
    <section className="profile-hero">
      <div
        className="profile-hero__avatar"
        onClick={() => document.getElementById("avatar-input").click()}
        title="Cambiar foto de perfil"
      >
        <input
          id="avatar-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onAvatarChange}
        />
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Foto de perfil"
            className="profile-hero__avatar-img"
            decoding="async"
          />
        ) : (
          <span className="profile-hero__avatar-letter">
            {currentUser.displayName?.[0]?.toUpperCase() ?? "?"}
          </span>
        )}
        <div className="profile-hero__avatar-overlay">
          <span className="profile-hero__avatar-overlay-label">
            Cambiar foto
          </span>
        </div>
      </div>

      <div className="profile-hero__identity">
        <span className="profile-hero__brand">{ACCOUNT_JOURNEY.brand}</span>
        <h1 className="profile-hero__name">{currentUser.displayName}</h1>
        <p className="profile-hero__handle">
          @{currentUser.handle} · {getRoleLabel(currentUser.role)} ·{" "}
          {currentUser.emailVerified ? "email verificado" : "email pendiente"}
        </p>
        <div className="profile-hero__actions">
          <Button
            variant="outline"
            surface="light"
            size="sm"
            onClick={onToggleEdit}
          >
            {editing ? "Cancelar edición" : "Editar información"}
          </Button>
          <Button variant="ghost" surface="light" size="sm" onClick={onLogout}>
            {ACCOUNT_JOURNEY.logoutCta}
          </Button>
          {!currentUser.emailVerified && (
            <Button
              variant="outline"
              surface="light"
              size="sm"
              onClick={onConfirmEmail}
            >
              Confirmar email
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
