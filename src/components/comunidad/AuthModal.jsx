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
          className="community-modal__header"
          style={{ borderBottom: COMMUNITY_BORDERS.soft, padding: "20px 24px 0" }}
        >
          <div className="community-modal__tabs" style={{ display: "flex", gap: 0, marginBottom: 0 }}>
            <Button
              variant="tab"
              surface="light"
              size="tab"
              font="mono"
              active={tab === "register"}
              fullWidth
              style={{ flex: 1 }}
              onClick={() => {
                setTab("register");
                setStep(1);
                setError("");
              }}
            >
              Registrarse
            </Button>
            <Button
              variant="tab"
              surface="light"
              size="tab"
              font="mono"
              active={tab === "access"}
              fullWidth
              style={{ flex: 1, borderLeft: COMMUNITY_BORDERS.soft }}
              onClick={() => {
                setTab("access");
                setError("");
              }}
            >
              Acceder (demo)
            </Button>
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
                <label style={LABEL_STYLE}>Nombre</label>
                <input
                  style={INPUT_STYLE}
                  placeholder="Tu nombre"
                  value={form.displayName}
                  onChange={(event) =>
                    setForm({ ...form, displayName: event.target.value })
                  }
                />
              </div>
              <div>
                <label style={LABEL_STYLE}>Handle</label>
                <input
                  style={INPUT_STYLE}
                  placeholder="@tu_handle"
                  value={form.handle}
                  onChange={(event) =>
                    setForm({ ...form, handle: event.target.value })
                  }
                />
              </div>
              <div>
                <label style={LABEL_STYLE}>Email</label>
                <input
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
                En un sistema real, recibirias un link en tu email. Para esta
                demo, confirma directamente:
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
                Modo demo: selecciona un perfil existente para explorar la
                comunidad con diferentes roles.
              </p>

              <div>
                <label style={LABEL_STYLE}>Usuario</label>
                <select
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
