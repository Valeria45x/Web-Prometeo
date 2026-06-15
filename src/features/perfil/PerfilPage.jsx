import { useState } from "react";
import AuthModal from "@/features/comunidad/AuthModal";
import { openCookieConsent } from "@/shared/cookies/CookieConsent";
import { Page } from "@/shared/layout/Page";
import Button from "@/shared/ui/Button";
import { useComunidad } from "@/context/ComunidadContext";
import { useTienda } from "@/context/TiendaContext";
import EditProfileForm from "@/features/perfil/components/EditProfileForm";
import PreferencePanel from "@/features/perfil/components/PreferencePanel";
import ProfileHero from "@/features/perfil/components/ProfileHero";
import ProfileGuest from "@/features/perfil/components/ProfileGuest";
import ProfilePending from "@/features/perfil/components/ProfilePending";
import {
  PREFERENCE_SECTIONS,
  DEFAULT_PREFERENCES,
} from "@/features/perfil/perfil.content";
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
  const [prefs, setPrefs] = useState(DEFAULT_PREFERENCES);
  const [openPanels, setOpenPanels] = useState({
    notifications: false,
    privacy: false,
    appearance: false,
  });

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

  const togglePanel = (id) => setOpenPanels((p) => ({ ...p, [id]: !p[id] }));
  const togglePreference = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

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
        <Button
          variant="outline"
          surface="light"
          size="sm"
          onClick={handleClearLocalDemoData}
        >
          Borrar datos locales
        </Button>
        <Button
          variant="ghost"
          surface="light"
          size="sm"
          onClick={openCookieConsent}
        >
          Ver ventana de cookies
        </Button>
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

      <div className="profile-preferences">
        {PREFERENCE_SECTIONS.map((section) => (
          <PreferencePanel
            key={section.id}
            section={section}
            open={openPanels[section.id]}
            onToggleOpen={() => togglePanel(section.id)}
            prefs={prefs}
            onTogglePreference={togglePreference}
          />
        ))}
      </div>
    </Page>
  );
}
