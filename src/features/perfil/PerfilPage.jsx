import { useState } from "react";
import AuthModal from "@/features/comunidad/components/AuthModal";
import { openCookieConsent } from "@/shared/cookies/CookieConsent";
import { Page } from "@/shared/layout/Page";
import { COLORS } from "@/design/tokens";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { useComunidad } from "@/context/ComunidadContext";
import { useTienda } from "@/context/TiendaContext";
import EditProfileForm from "@/features/perfil/components/EditProfileForm";
import ProfileHero from "@/features/perfil/components/ProfileHero";
import ProfileGuest from "@/features/perfil/components/ProfileGuest";
import ProfilePending from "@/features/perfil/components/ProfilePending";
import "@/features/perfil/perfil.css";

export default function PerfilPage() {
  const {
    currentUser,
    showAuthModal,
    setShowAuthModal,
    confirmEmail,
    logout,
    pendingUser,
    updateCurrentUser,
    resetDemoData: resetCommunityDemoData,
  } = useComunidad();
  const { resetDemoData: resetTiendaDemoData } = useTienda();
  const [editing, setEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  function handleAvatarChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarUrl(URL.createObjectURL(file));
  }

  function handleClearLocalDemoData() {
    const confirmed = window.confirm(
      "¿Borrar los datos locales de esta demo? Se reiniciarán comunidad, perfil, carrito y pedidos guardados en este navegador.",
    );
    if (!confirmed) return;
    resetTiendaDemoData();
    resetCommunityDemoData();
    setAvatarUrl(null);
    setEditing(false);
  }

  /* Guest state */
  if (!currentUser && !pendingUser) {
    return (
      <Page light>
        <ProfileGuest onActivate={() => setShowAuthModal(true)} />
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </Page>
    );
  }

  /* Pending email state */
  if (pendingUser && !currentUser) {
    return (
      <Page light>
        <ProfilePending email={pendingUser.email} onConfirm={confirmEmail} />
      </Page>
    );
  }

  return (
    <Page light>
      <ProfileHero
        currentUser={currentUser}
        avatarUrl={avatarUrl}
        editing={editing}
        onAvatarChange={handleAvatarChange}
        onToggleEdit={() => setEditing((e) => !e)}
        onLogout={logout}
        onConfirmEmail={confirmEmail}
      />

      <div className="profile-demo-notice">
        <span className="profile-demo-notice__text">
          Los datos de cuenta, hilos, respuestas, carrito y pedidos se guardan
          solo en este navegador. No hay backend real conectado.
        </span>
        <SplitCtaButton
          label="Borrar datos locales"
          color={COLORS.textOnLight}
          iconBg={COLORS.pageLight}
          onClick={handleClearLocalDemoData}
          className="profile-demo-notice__cta"
        />
        <SplitCtaButton
          label="Ver ventana de cookies"
          color={COLORS.textOnLight}
          iconBg={COLORS.pageLight}
          onClick={openCookieConsent}
          className="profile-demo-notice__cta"
        />
      </div>

      {editing && (
        <EditProfileForm
          currentUser={currentUser}
          onCancel={() => setEditing(false)}
          onSave={(form) => {
            const result = updateCurrentUser(form);
            if (result.ok) setEditing(false);
            return result;
          }}
        />
      )}
    </Page>
  );
}
