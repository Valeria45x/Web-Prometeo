import { useEffect, useMemo, useState } from "react";
import { useComunidad } from "../../context/ComunidadContext";
import Button from "../system/Button";
import {
  COMMUNITY_BORDERS,
  COMMUNITY_COLORS,
  COMMUNITY_FONTS,
  getRoleLabel,
} from "./shared";

const OVERLAY = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
};

const PANEL = {
  background: COMMUNITY_COLORS.lightBackground,
  border: COMMUNITY_BORDERS.soft,
  width: "100%",
  maxWidth: 480,
  maxHeight: "90vh",
  overflowY: "auto",
};

const INPUT_STYLE = {
  width: "100%",
  background: "transparent",
  border: COMMUNITY_BORDERS.soft,
  color: COMMUNITY_COLORS.text,
  fontFamily: COMMUNITY_FONTS.sans,
  fontSize: 14,
  padding: "10px 12px",
  outline: "none",
  boxSizing: "border-box",
};

const LABEL_STYLE = {
  fontFamily: COMMUNITY_FONTS.mono.fontFamily,
  fontSize: 7,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: COMMUNITY_COLORS.text,
  opacity: 0.5,
  display: "block",
  marginBottom: 6,
};

export default function AuthModal({ onClose }) {
  const { users, register, confirmEmail, login, pendingUser } = useComunidad();
  const [tab, setTab] = useState("register");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ displayName: "", handle: "", email: "" });
  const [selectedHandle, setSelectedHandle] = useState("");
  const [error, setError] = useState("");

  const accessUsers = useMemo(
    () => users.filter((user) => user.emailVerified),
    [users],
  );

  useEffect(() => {
    if (accessUsers.length === 0) {
      setSelectedHandle("");
      return;
    }

    if (!accessUsers.some((user) => user.handle === selectedHandle)) {
      setSelectedHandle(accessUsers[0].handle);
    }
  }, [accessUsers, selectedHandle]);

  function handleRegister(event) {
    event.preventDefault();

    if (!form.displayName.trim() || !form.handle.trim() || !form.email.trim()) {
      setError("Completa todos los campos.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Email no valido.");
      return;
    }

    const result = register(
      form.displayName.trim(),
      form.handle.trim(),
      form.email.trim(),
    );

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError("");
    setStep(2);
  }

  function handleConfirm() {
    confirmEmail();
    onClose();
  }

  function handleAccess(event) {
    event.preventDefault();
    if (!selectedHandle) return;

    login(selectedHandle);
    onClose();
  }

  function renderTabButton(tabKey, label, isLast = false) {
    const isActiveTab = tab === tabKey;

    return (
      <Button
        variant={isActiveTab ? "primary" : "outline"}
        surface="light"
        emphasis={isActiveTab ? "accent" : "neutral"}
        size="md"
        font="sans"
        fullWidth
        align="start"
        style={{
          minHeight: 56,
          borderTop: "none",
          borderBottom: "none",
          borderLeft: tabKey === "register" ? "none" : COMMUNITY_BORDERS.soft,
          borderRight: isLast ? "none" : "none",
          "--ds-button-hover-bg": isActiveTab
            ? COMMUNITY_COLORS.accent
            : COMMUNITY_COLORS.accent,
          "--ds-button-hover-border": isActiveTab
            ? COMMUNITY_COLORS.accentDeep
            : COMMUNITY_COLORS.accentDeep,
          "--ds-button-hover-color": isActiveTab
            ? COMMUNITY_COLORS.lightBackground
            : COMMUNITY_COLORS.lightBackground,
        }}
        onClick={() => {
          setTab(tabKey);
          if (tabKey === "register") {
            setStep(1);
          }
          setError("");
        }}
      >
        {label}
      </Button>
    );
  }

  return (
    <div
      className="community-modal"
      style={OVERLAY}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="community-modal__panel" style={PANEL}>
        <div
          className="community-modal__header community-modal__header--tabs"
          style={{ borderBottom: COMMUNITY_BORDERS.soft, padding: 0 }}
        >
          <div
            className="community-modal__tabs community-modal__auth-tabs"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              width: "100%",
            }}
          >
            {renderTabButton("register", "Registrarse")}
            {renderTabButton("access", "Acceder", true)}
          </div>
        </div>

        <div className="community-modal__body" style={{ padding: 24 }}>
          {tab === "register" && step === 1 && (
            <form
              onSubmit={handleRegister}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <p
                style={{
                  fontFamily: COMMUNITY_FONTS.sans,
                  fontSize: 13,
                  color: COMMUNITY_COLORS.text,
                  opacity: 0.6,
                  margin: 0,
                }}
              >
                Crea tu cuenta para participar en la comunidad.
              </p>

              <div>
                <label
                  htmlFor="community-register-display-name"
                  style={LABEL_STYLE}
                >
                  Nombre
                </label>
                <input
                  id="community-register-display-name"
                  name="displayName"
                  autoComplete="name"
                  style={INPUT_STYLE}
                  placeholder="Tu nombre"
                  value={form.displayName}
                  onChange={(event) =>
                    setForm({ ...form, displayName: event.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="community-register-handle" style={LABEL_STYLE}>
                  Handle
                </label>
                <input
                  id="community-register-handle"
                  name="username"
                  autoComplete="username"
                  style={INPUT_STYLE}
                  placeholder="@tu_handle"
                  value={form.handle}
                  onChange={(event) =>
                    setForm({ ...form, handle: event.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="community-register-email" style={LABEL_STYLE}>
                  Email
                </label>
                <input
                  id="community-register-email"
                  name="email"
                  autoComplete="email"
                  style={INPUT_STYLE}
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                />
              </div>

              {error && (
                <p
                  style={{
                    fontFamily: COMMUNITY_FONTS.mono.fontFamily,
                    fontSize: 7,
                    color: COMMUNITY_COLORS.accent,
                    margin: 0,
                  }}
                >
                  {error}
                </p>
              )}

              <Button
                type="submit"
                variant="outline"
                surface="light"
                emphasis="neutral"
                size="md"
                font="mono"
                fullWidth
              >
                Crear cuenta
              </Button>
            </form>
          )}

          {tab === "register" && step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  borderLeft: `3px solid ${COMMUNITY_COLORS.accent}`,
                  paddingLeft: 16,
                }}
              >
                <p
                  style={{
                    fontFamily: COMMUNITY_FONTS.sans,
                    fontSize: 14,
                    color: COMMUNITY_COLORS.text,
                    margin: "0 0 8px",
                  }}
                >
                  Email de confirmacion enviado a:
                </p>
                <p
                  style={{
                    fontFamily: COMMUNITY_FONTS.mono.fontFamily,
                    fontSize: 10,
                    color: COMMUNITY_COLORS.accent,
                    margin: 0,
                  }}
                >
                  {pendingUser?.email}
                </p>
              </div>
              <p
                style={{
                  fontFamily: COMMUNITY_FONTS.sans,
                  fontSize: 13,
                  color: COMMUNITY_COLORS.text,
                  opacity: 0.6,
                  margin: 0,
                }}
              >
                En un sistema real, recibirias un link en tu email. Aqui puedes
                confirmar directamente:
              </p>
              <Button
                variant="outline"
                surface="light"
                emphasis="neutral"
                size="md"
                font="mono"
                fullWidth
                onClick={handleConfirm}
              >
                Confirmar email
              </Button>
            </div>
          )}

          {tab === "access" && (
            <form
              onSubmit={handleAccess}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <p
                style={{
                  fontFamily: COMMUNITY_FONTS.sans,
                  fontSize: 13,
                  color: COMMUNITY_COLORS.text,
                  opacity: 0.6,
                  margin: 0,
                }}
              >
                Selecciona un perfil existente para acceder y explorar la
                comunidad.
              </p>

              <div>
                <label htmlFor="community-access-user" style={LABEL_STYLE}>
                  Usuario
                </label>
                <select
                  id="community-access-user"
                  name="community-access-user"
                  autoComplete="off"
                  style={{ ...INPUT_STYLE, cursor: "pointer" }}
                  value={selectedHandle}
                  onChange={(event) => setSelectedHandle(event.target.value)}
                  disabled={accessUsers.length === 0}
                >
                  {accessUsers.length === 0 ? (
                    <option value="">Sin usuarios disponibles</option>
                  ) : (
                    accessUsers.map((user) => (
                      <option
                        key={user.id}
                        value={user.handle}
                        style={{ background: COMMUNITY_COLORS.lightBackground }}
                      >
                        @{user.handle} - {getRoleLabel(user.role)}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <Button
                type="submit"
                disabled={!selectedHandle}
                variant="outline"
                surface="light"
                emphasis="neutral"
                size="md"
                font="mono"
                fullWidth
              >
                Acceder
              </Button>
            </form>
          )}
        </div>

        <div
          className="community-modal__footer"
          style={{ borderTop: COMMUNITY_BORDERS.soft, padding: "16px 24px" }}
        >
          <Button
            variant="outline"
            surface="light"
            emphasis="neutral"
            size="md"
            font="mono"
            fullWidth
            onClick={onClose}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
