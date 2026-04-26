import { useState } from "react";
import { Page } from "../Page";
import Button from "../system/Button";
import { Grid, GridCell } from "../system/Grid";
import { BORDERS, COLORS, FONTS } from "../../design/tokens";
import { CONTACT_FORM_ENDPOINT } from "../../config/env";

const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };
const UI = {
  bg: COLORS.canvasLight,
  panel: "#f7f7f7",
  text: COLORS.textOnLight,
  muted: COLORS.textMutedLight,
};

const MOTIVOS = [
  {
    id: "certificacion",
    label: "Certificación",
    desc: "Quiero saber cómo certificar mi empresa o producto con Prometeo.",
  },
  {
    id: "comunidad",
    label: "Comunidad",
    desc: "Tengo una pregunta sobre la comunidad, los roles o los hilos.",
  },
  {
    id: "prensa",
    label: "Prensa o colaboración",
    desc: "Soy periodista, investigador o quiero proponer una colaboración.",
  },
  {
    id: "otro",
    label: "Otro",
    desc: "Tengo una duda, idea o simplemente quiero saludar.",
  },
];

function Label({ children, accent = false }) {
  return (
    <span
      style={{
        ...mono,
        fontSize: 8,
        color: accent ? COLORS.accent : UI.muted,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function FieldCell({ label, children, style }) {
  return (
    <div
      style={{
        borderBottom: bd,
        padding: "20px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        ...style,
      }}
    >
      <Label>{label}</Label>
      {children}
    </div>
  );
}

const inputBase = {
  background: "transparent",
  border: "none",
  outline: "none",
  fontFamily: FONTS.sans,
  fontSize: 15,
  color: UI.text,
  caretColor: COLORS.accent,
  width: "100%",
  padding: 0,
};

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [motivo, setMotivo] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      if (!CONTACT_FORM_ENDPOINT) {
        await new Promise((r) => setTimeout(r, 500));
        setStatus("sent");
        setForm({ nombre: "", email: "", mensaje: "" });
        setMotivo(null);
        return;
      }

      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, motivo }),
      });

      if (!res.ok) { setStatus("error"); return; }
      setStatus("sent");
      setForm({ nombre: "", email: "", mensaje: "" });
      setMotivo(null);
    } catch {
      setStatus("error");
    }
  };

  return (
    <Page light>
      {/* Hero */}
      <Grid columns="site" className="contact-hero">
        {/* Left — intro */}
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            borderRight: bd,
            borderBottom: bd,
            padding: "72px 56px 64px",
            background: UI.bg,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 48,
            minHeight: "calc(100svh - 104px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Label>005 — Contacto</Label>
            <h1
              className="section-title"
              style={{ color: UI.text, margin: 0 }}
            >
              ¿Hablamos?
            </h1>
            <p
              style={{
                fontFamily: FONTS.sans,
                fontSize: 17,
                lineHeight: 1.7,
                color: UI.muted,
                margin: 0,
                maxWidth: 440,
              }}
            >
              Si tienes una duda, una idea, o quieres saber más sobre la
              certificación o la comunidad, nos alegra escucharte.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Label>Email directo</Label>
            <a
              href="mailto:hola@proyectoprometeo.info"
              style={{
                fontFamily: FONTS.display,
                fontSize: "clamp(1.4rem, 2.2vw, 2.2rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                color: UI.text,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = COLORS.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = UI.text; }}
            >
              hola@proyectoprometeo.info
            </a>
            <p
              style={{
                fontFamily: FONTS.sans,
                fontSize: 13,
                lineHeight: 1.6,
                color: UI.muted,
                margin: 0,
              }}
            >
              Respondemos en menos de 48 h en días laborables.
            </p>
          </div>
        </GridCell>

        {/* Right — form */}
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            borderBottom: bd,
            background: UI.bg,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {status === "sent" ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "64px 56px",
                gap: 16,
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.display,
                  fontSize: "clamp(3rem, 5vw, 5.6rem)",
                  fontWeight: 900,
                  lineHeight: 1,
                  color: COLORS.accent,
                }}
              >
                Recibido.
              </span>
              <p
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: UI.muted,
                  margin: 0,
                  maxWidth: 400,
                }}
              >
                Gracias por escribirnos. Te contestamos pronto.
              </p>
              <div style={{ paddingTop: 8 }}>
                <Button
                  variant="outline"
                  surface="light"
                  size="sm"
                  onClick={() => setStatus("idle")}
                >
                  Enviar otro mensaje
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              {/* Nombre */}
              <FieldCell label="Nombre">
                <input
                  id="contact-nombre"
                  name="nombre"
                  autoComplete="name"
                  required
                  placeholder="¿Cómo te llamas?"
                  value={form.nombre}
                  onChange={onChange}
                  style={inputBase}
                />
              </FieldCell>

              {/* Email */}
              <FieldCell label="Email">
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Para poder responderte"
                  value={form.email}
                  onChange={onChange}
                  style={inputBase}
                />
              </FieldCell>

              {/* Mensaje */}
              <FieldCell label="Mensaje" style={{ flex: 1 }}>
                <textarea
                  id="contact-mensaje"
                  name="mensaje"
                  autoComplete="off"
                  required
                  placeholder="Cuéntanos lo que quieras"
                  value={form.mensaje}
                  onChange={onChange}
                  style={{
                    ...inputBase,
                    resize: "none",
                    flex: 1,
                    minHeight: 160,
                    lineHeight: 1.55,
                  }}
                />
              </FieldCell>

              {/* Actions */}
              <div
                style={{
                  padding: "20px 28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                {status === "error" && (
                  <Label accent>Algo fue mal. Inténtalo de nuevo.</Label>
                )}
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  variant="primary"
                  surface="light"
                  size="md"
                  style={{ marginLeft: "auto" }}
                >
                  {status === "sending" ? "Enviando..." : "Enviar mensaje"}
                </Button>
              </div>
            </form>
          )}
        </GridCell>
      </Grid>

      {/* Motivos / razones */}
      <div
        style={{
          borderBottom: bd,
          padding: "28px 48px",
          background: UI.bg,
        }}
      >
        <Label>¿Por qué nos escribes?</Label>
      </div>

      <div
        className="contact-motivos"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          background: UI.bg,
        }}
      >
        {MOTIVOS.map((m, i) => {
          const active = motivo === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setMotivo(active ? null : m.id)}
              style={{
                appearance: "none",
                border: "none",
                borderRight: i < MOTIVOS.length - 1 ? bd : "none",
                borderBottom: bd,
                background: active ? UI.text : "transparent",
                color: active ? COLORS.canvasLight : UI.text,
                cursor: "pointer",
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                textAlign: "left",
                transition: "background 0.12s, color 0.12s",
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = UI.panel;
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              <span
                style={{
                  ...mono,
                  fontSize: 8,
                  color: active ? COLORS.accent : UI.muted,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontFamily: FONTS.display,
                  fontSize: "clamp(1.2rem, 1.8vw, 1.8rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                }}
              >
                {m.label}
              </span>
              <span
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: active ? "rgba(255,255,255,0.55)" : UI.muted,
                }}
              >
                {m.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer info strip */}
      <Grid columns="site" style={{ background: UI.panel }}>
        {[
          { label: "Respuesta", value: "< 48 h" },
          { label: "Email", value: "hola@proyectoprometeo.info" },
          { label: "Certificación", value: "/contacto → Solicitar evaluación" },
          { label: "Prometeo", value: "Proyecto independiente" },
        ].map(({ label, value }, i) => (
          <GridCell
            key={label}
            style={{
              borderRight: i < 3 ? bd : "none",
              borderBottom: bd,
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <Label>{label}</Label>
            <span
              style={{
                fontFamily: FONTS.sans,
                fontSize: 13,
                color: UI.text,
                lineHeight: 1.4,
              }}
            >
              {value}
            </span>
          </GridCell>
        ))}
      </Grid>
    </Page>
  );
}
