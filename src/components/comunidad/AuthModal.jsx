import { useState } from "react";
import { MOCK_USERS } from "../../data/comunidad";
import { useComunidad } from "../../context/ComunidadContext";

const B = "1px solid #303030";

const OVERLAY = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.85)",
  zIndex: 200,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
};

const PANEL = {
  background: "#0A0A0A",
  border: B,
  width: "100%",
  maxWidth: 480,
  maxHeight: "90vh",
  overflowY: "auto",
};

const INPUT_STYLE = {
  width: "100%",
  background: "#111",
  border: B,
  color: "#C8C8C8",
  fontFamily: "'Funnel Sans', sans-serif",
  fontSize: 14,
  padding: "10px 12px",
  outline: "none",
  boxSizing: "border-box",
};

const LABEL_STYLE = {
  fontFamily: "monospace",
  fontSize: 7,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#C8C8C8",
  opacity: 0.5,
  display: "block",
  marginBottom: 6,
};

export default function AuthModal({ onClose }) {
  const { register, confirmEmail, login, pendingUser } = useComunidad();
  const [tab, setTab] = useState("register"); // "register" | "access"
  const [step, setStep] = useState(1); // 1 = form, 2 = confirm email
  const [form, setForm] = useState({ displayName: "", handle: "", email: "" });
  const [selectedHandle, setSelectedHandle] = useState(MOCK_USERS[0].handle);
  const [error, setError] = useState("");

  function handleRegister(e) {
    e.preventDefault();
    if (!form.displayName.trim() || !form.handle.trim() || !form.email.trim()) {
      setError("Completa todos los campos.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Email no válido.");
      return;
    }
    setError("");
    register(form.displayName.trim(), form.handle.trim(), form.email.trim());
    setStep(2);
  }

  function handleConfirm() {
    confirmEmail();
    onClose();
  }

  function handleAccess(e) {
    e.preventDefault();
    login(selectedHandle);
    onClose();
  }

  const TAB_STYLE = (active) => ({
    flex: 1,
    fontFamily: "monospace",
    fontSize: 7,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    padding: "12px 16px",
    border: "none",
    borderBottom: active ? "1px solid #FF3C54" : B,
    background: active ? "#111" : "#0A0A0A",
    color: active ? "#FF3C54" : "#C8C8C8",
    cursor: "pointer",
  });

  return (
    <div
      style={OVERLAY}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={PANEL}>
        {/* Header */}
        <div style={{ borderBottom: B, padding: "20px 24px 0" }}>
          <div style={{ display: "flex", gap: 0, marginBottom: 0 }}>
            <button
              style={TAB_STYLE(tab === "register")}
              onClick={() => {
                setTab("register");
                setStep(1);
                setError("");
              }}
            >
              Registrarse
            </button>
            <button
              style={{ ...TAB_STYLE(tab === "access"), borderLeft: B }}
              onClick={() => {
                setTab("access");
                setError("");
              }}
            >
              Acceder (demo)
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: 24 }}>
          {tab === "register" && step === 1 && (
            <form
              onSubmit={handleRegister}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontSize: 13,
                  color: "#C8C8C8",
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
                  onChange={(e) =>
                    setForm({ ...form, displayName: e.target.value })
                  }
                />
              </div>
              <div>
                <label style={LABEL_STYLE}>Handle</label>
                <input
                  style={INPUT_STYLE}
                  placeholder="@tu_handle"
                  value={form.handle}
                  onChange={(e) => setForm({ ...form, handle: e.target.value })}
                />
              </div>
              <div>
                <label style={LABEL_STYLE}>Email</label>
                <input
                  style={INPUT_STYLE}
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {error && (
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: 7,
                    color: "#FF3C54",
                    margin: 0,
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                style={{
                  background: "#FF3C54",
                  color: "#0A0A0A",
                  border: "none",
                  padding: "12px 24px",
                  fontFamily: "monospace",
                  fontSize: 8,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  marginTop: 8,
                }}
              >
                Crear cuenta
              </button>
            </form>
          )}

          {tab === "register" && step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ borderLeft: "3px solid #FF3C54", paddingLeft: 16 }}>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontSize: 14,
                    color: "#C8C8C8",
                    margin: "0 0 8px",
                  }}
                >
                  Email de confirmación enviado a:
                </p>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    color: "#FF3C54",
                    margin: 0,
                  }}
                >
                  {pendingUser?.email}
                </p>
              </div>
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontSize: 13,
                  color: "#C8C8C8",
                  opacity: 0.6,
                  margin: 0,
                }}
              >
                En un sistema real, recibirías un link en tu email. Para esta
                demo, confirma directamente:
              </p>
              <button
                onClick={handleConfirm}
                style={{
                  background: "#FF3C54",
                  color: "#0A0A0A",
                  border: "none",
                  padding: "12px 24px",
                  fontFamily: "monospace",
                  fontSize: 8,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                }}
              >
                Confirmar email
              </button>
            </div>
          )}

          {tab === "access" && (
            <form
              onSubmit={handleAccess}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontSize: 13,
                  color: "#C8C8C8",
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
                  onChange={(e) => setSelectedHandle(e.target.value)}
                >
                  {MOCK_USERS.filter((u) => u.emailVerified).map((u) => (
                    <option
                      key={u.id}
                      value={u.handle}
                      style={{ background: "#111" }}
                    >
                      @{u.handle} —{" "}
                      {u.role === "prometeo_team"
                        ? "Prometeo Team"
                        : u.role === "experto"
                          ? "Experto"
                          : u.role === "certificado"
                            ? "Certificado"
                            : "Miembro"}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                style={{
                  background: "#FF3C54",
                  color: "#0A0A0A",
                  border: "none",
                  padding: "12px 24px",
                  fontFamily: "monospace",
                  fontSize: 8,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  marginTop: 8,
                }}
              >
                Acceder
              </button>
            </form>
          )}
        </div>

        {/* Footer close */}
        <div style={{ borderTop: B, padding: "12px 24px" }}>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontFamily: "monospace",
              fontSize: 7,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#C8C8C8",
              opacity: 0.4,
              cursor: "pointer",
              padding: 0,
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
