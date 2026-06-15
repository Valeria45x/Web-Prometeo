import { useMemo, useState } from "react";
import { COLORS } from "@/design/tokens";
import AuthModal from "@/features/comunidad/AuthModal";
import { openCookieConsent } from "@/shared/cookies/CookieConsent";
import LocalDemoNotice from "@/shared/LocalDemoNotice";
import { Page } from "@/shared/layout/Page";
import Button from "@/shared/ui/Button";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import "@/features/perfil/perfil.css";
import { useComunidad } from "@/context/ComunidadContext";
import { useTienda } from "@/context/TiendaContext";
import { formatPrice } from "@/data/tienda";
import { ACCOUNT_JOURNEY } from "@/shared/account/accountJourney";
import { getRoleLabel } from "@/features/comunidad/shared";

function formatDate(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* -- Edit form --------------------------------------------------------- */

function EditProfileForm({ currentUser, onCancel, onSave }) {
  const [form, setForm] = useState({
    displayName: currentUser.displayName ?? "",
    handle: currentUser.handle ?? "",
    email: currentUser.email ?? "",
  });
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const result = onSave(form);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError("");
  }

  const fields = [
    { key: "displayName", label: "Nombre", autocomplete: "name" },
    { key: "handle", label: "Handle", autocomplete: "username" },
    { key: "email", label: "Email", autocomplete: "email", type: "email" },
  ];

  return (
    <form className="profile-edit-form" onSubmit={handleSubmit}>
      {fields.map(({ key, label, autocomplete, type = "text" }) => (
        <div key={key} className="profile-edit-form__field">
          <label className="profile-edit-form__label" htmlFor={`edit-${key}`}>
            {label}
          </label>
          <input
            id={`edit-${key}`}
            className="profile-edit-form__input"
            type={type}
            autoComplete={autocomplete}
            value={form[key]}
            onChange={(e) =>
              setForm((f) => ({ ...f, [key]: e.target.value }))
            }
          />
        </div>
      ))}
      <Button type="submit" variant="outline" surface="light" size="sm">
        Guardar
      </Button>
      <Button variant="ghost" surface="light" size="sm" onClick={onCancel}>
        Cancelar
      </Button>
      {error && (
        <p role="alert" className="profile-edit-form__error">
          {error}
        </p>
      )}
    </form>
  );
}

/* -- Preferences ------------------------------------------------------- */

const preferenceSections = [
  {
    id: "notifications",
    title: "Notificaciones",
    items: [
      { key: "notifyReplies", label: "Respuestas en mis hilos" },
      { key: "notifyFollowed", label: "Actualizaciones en hilos seguidos" },
      { key: "notifyMessages", label: "Mensajes directos" },
      { key: "notifyOrders", label: "Actualizaciones de pedidos" },
    ],
  },
  {
    id: "privacy",
    title: "Privacidad",
    items: [
      { key: "profilePublic", label: "Perfil público" },
      { key: "showActivity", label: "Mostrar actividad en comunidad" },
      { key: "allowMessages", label: "Permitir mensajes directos" },
    ],
  },
  {
    id: "appearance",
    title: "Apariencia",
    items: [{ key: "darkTheme", label: "Modo oscuro (beta)" }],
  },
];

function PreferenceToggle({ item, checked, onToggle }) {
  return (
    <div className="profile-toggle">
      <button
        type="button"
        aria-pressed={checked}
        aria-label={item.label}
        onClick={onToggle}
        className={[
          "profile-toggle__track",
          checked && "profile-toggle__track--on",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          className={[
            "profile-toggle__thumb",
            checked && "profile-toggle__thumb--on",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </button>
      <span className="profile-toggle__label">{item.label}</span>
    </div>
  );
}

function PreferencePanel({ section, open, onToggleOpen, prefs, onTogglePreference }) {
  return (
    <div className="profile-pref-panel">
      <button
        type="button"
        aria-expanded={open}
        className="profile-pref-panel__trigger"
        onClick={onToggleOpen}
      >
        <span className="profile-pref-panel__trigger-label">{section.title}</span>
        <span
          aria-hidden="true"
          className={[
            "profile-pref-panel__chevron",
            open && "profile-pref-panel__chevron--open",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </button>
      {open && (
        <div className="profile-pref-panel__body">
          {section.items.map((item) => (
            <PreferenceToggle
              key={item.key}
              item={item}
              checked={prefs[item.key]}
              onToggle={() => onTogglePreference(item.key)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* -- Page -------------------------------------------------------------- */

export default function PerfilPage() {
  const {
    currentUser,
    posts,
    replies,
    showAuthModal,
    setShowAuthModal,
    confirmEmail,
    logout,
    pendingUser,
    updateCurrentUser,
    resetDemoData: resetCommunityDemoData,
  } = useComunidad();
  const { orders, resetDemoData: resetTiendaDemoData } = useTienda();
  const [editing, setEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [prefs, setPrefs] = useState({
    notifyReplies: true,
    notifyFollowed: true,
    notifyMessages: false,
    notifyOrders: true,
    profilePublic: true,
    showActivity: true,
    allowMessages: true,
    darkTheme: false,
  });
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

  const togglePanel = (id) =>
    setOpenPanels((p) => ({ ...p, [id]: !p[id] }));

  const togglePreference = (key) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  // Unused but kept for future use
  const _profileData = useMemo(() => {
    if (!currentUser) return null;
    const myPosts = posts.filter((p) => p.authorId === currentUser.id);
    const myReplies = replies.filter((r) => r.authorId === currentUser.id);
    const followedPosts = posts.filter((p) =>
      p.followerIds?.includes(currentUser.id),
    );
    const savedPosts = posts.filter((p) =>
      currentUser.savedPosts?.includes(p.id),
    );
    const visibleOrders = orders.filter(
      (o) => !o.userId || o.userId === currentUser.id,
    );
    return { myPosts, myReplies, followedPosts, savedPosts, visibleOrders };
  }, [currentUser, orders, posts, replies]);

  /* Guest state */
  if (!currentUser && !pendingUser) {
    return (
      <Page light>
        <section className="profile-guest">
          <div className="profile-guest__main">
            <span className="profile-guest__eyebrow">{ACCOUNT_JOURNEY.brand}</span>
            <h1 className="profile-guest__heading">Tu centro de control.</h1>
            <p className="profile-guest__desc">
              {ACCOUNT_JOURNEY.contexts.profile.guest}
            </p>
            <LocalDemoNotice style={{ maxWidth: 520, marginBottom: 8 }}>
              Esta área es una simulación: los perfiles, hilos y pedidos se
              guardan solo en el navegador de la persona que visita la web.
            </LocalDemoNotice>
            <SplitCtaButton
              label={ACCOUNT_JOURNEY.guestCta}
              color={COLORS.textOnLight}
              iconBg={COLORS.pageLight}
              onClick={() => setShowAuthModal(true)}
            />
          </div>
          <div className="profile-guest__accent">
            <span className="profile-guest__accent-label">
              {ACCOUNT_JOURNEY.navLabel}
            </span>
          </div>
        </section>
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </Page>
    );
  }

  /* Pending email state */
  if (pendingUser && !currentUser) {
    return (
      <Page light>
        <div className="profile-pending">
          <span className="profile-pending__label">{ACCOUNT_JOURNEY.brand}</span>
          <p className="profile-pending__desc">
            Email enviado a {pendingUser.email}. En esta demo puedes confirmar
            directamente.
          </p>
          <LocalDemoNotice style={{ maxWidth: 520 }}>
            Esta verificación no envía un email real. Es parte del prototipo
            frontend para mostrar el flujo de cuenta.
          </LocalDemoNotice>
          <SplitCtaButton
            label="Confirmar email"
            color={COLORS.textOnLight}
            iconBg={COLORS.pageLight}
            onClick={confirmEmail}
          />
        </div>
      </Page>
    );
  }

  return (
    <Page light>
      {/* Hero */}
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
            onChange={handleAvatarChange}
          />
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Foto de perfil"
              className="profile-hero__avatar-img"
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
              onClick={() => setEditing((e) => !e)}
            >
              {editing ? "Cancelar edición" : "Editar información"}
            </Button>
            <Button
              variant="ghost"
              surface="light"
              size="sm"
              onClick={logout}
            >
              {ACCOUNT_JOURNEY.logoutCta}
            </Button>
            {!currentUser.emailVerified && (
              <Button
                variant="outline"
                surface="light"
                size="sm"
                onClick={confirmEmail}
              >
                Confirmar email
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Demo notice */}
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

      {/* Edit form */}
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

      {/* Preferences */}
      <div className="profile-preferences">
        {preferenceSections.map((section) => (
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
