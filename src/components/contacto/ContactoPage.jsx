import { useState } from "react";
import { Page } from "../Page";
import HeroTransitionGrid from "../HeroTransitionGrid";
import Button from "../system/Button";
import { Grid, GridCell } from "../system/Grid";
import { BORDERS, COLORS, FONTS } from "../../design/tokens";
import { CONTACT_FORM_ENDPOINT } from "../../config/env";

const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };
const UI = {
  bg: COLORS.pageLight,
  text: COLORS.textOnLight,
  muted: COLORS.textMutedLight,
};

const MOTIVOS = [
  {
    id: "certificacion",
    label: "Certificación",
    desc: "Quiero certificar mi empresa o producto.",
  },
  {
    id: "comunidad",
    label: "Comunidad",
    desc: "Pregunta sobre la comunidad o los hilos.",
  },
  {
    id: "prensa",
    label: "Prensa",
    desc: "Periodista, investigador o colaboración.",
  },
  {
    id: "otro",
    label: "Otro",
    desc: "Duda, idea o simplemente saludar.",
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
  const [status, setStatus] = useState("idle");

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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...form, motivo }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("sent");
      setForm({ nombre: "", email: "", mensaje: "" });
      setMotivo(null);
    } catch {
      setStatus("error");
    }
  };

  return (
    <Page light>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <Grid columns="site">
        {/* Title column */}
        <GridCell
          span={3}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            borderRight: bd,
            padding: "72px 56px 64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 20,
            minHeight: "var(--prometeo-hero-height)",
          }}
        >
          <Label>005 — Contacto</Label>
          <h1 className="section-title" style={{ color: UI.text, margin: 0 }}>
            ¿Hablamos?
          </h1>
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 17,
              lineHeight: 1.7,
              color: UI.muted,
              margin: 0,
              maxWidth: 520,
            }}
          >
            Si tienes una duda, una idea o quieres saber más sobre la
            certificación o la comunidad, nos alegra escucharte.
          </p>
        </GridCell>

        {/* Contact info column */}
        <GridCell
          span={1}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            padding: "72px 40px 64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 32,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Label>Email</Label>
            <a
              href="mailto:hola@prometeo.info"
              style={{
                fontFamily: FONTS.sans,
                fontSize: 14,
                fontWeight: 600,
                color: UI.text,
                textDecoration: "none",
                transition: "color 0.12s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = COLORS.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = UI.text;
              }}
            >
              hola@prometeo.info
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Label>Respuesta</Label>
            <span
              style={{
                fontFamily: FONTS.sans,
                fontSize: 14,
                color: UI.muted,
              }}
            >
              Menos de 48 h en días laborables.
            </span>
          </div>
        </GridCell>
      </Grid>

      <HeroTransitionGrid background={UI.bg} border={bd} />

      {/* ── 01 — Motivo ──────────────────────────────────────────── */}
      <div
        style={{
          borderBottom: bd,
          padding: "20px 48px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Label>01 — ¿Por qué nos escribes?</Label>
        {motivo && (
          <button
            type="button"
            onClick={() => setMotivo(null)}
            style={{
              appearance: "none",
              background: "none",
              border: "none",
              ...mono,
              fontSize: 8,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: COLORS.accent,
              cursor: "pointer",
              padding: 0,
            }}
          >
            Limpiar
          </button>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          borderBottom: bd,
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
                background: active ? UI.text : "transparent",
                cursor: "pointer",
                padding: "32px 36px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                textAlign: "left",
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = "#dde0e4";
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
                  fontSize: "clamp(1.1rem, 1.5vw, 1.5rem)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  color: active ? COLORS.pageLight : UI.text,
                }}
              >
                {m.label}
              </span>
              <span
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: active ? "rgba(231,234,238,0.6)" : UI.muted,
                }}
              >
                {m.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── 02 — Formulario ──────────────────────────────────────── */}
      <div
        style={{
          borderBottom: bd,
          padding: "20px 48px",
        }}
      >
        <Label>02 — Tu mensaje</Label>
      </div>

      {status === "sent" ? (
        <div
          style={{
            padding: "80px 48px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            borderBottom: bd,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(2.8rem, 5vw, 5rem)",
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
        <form onSubmit={onSubmit}>
          {/* Name + Email row */}
          <Grid columns="site" style={{ borderBottom: bd }}>
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              style={{
                borderRight: bd,
                padding: "24px 48px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <Label>Nombre</Label>
              <input
                name="nombre"
                autoComplete="name"
                required
                placeholder="¿Cómo te llamas?"
                value={form.nombre}
                onChange={onChange}
                style={inputBase}
              />
            </GridCell>
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              style={{
                padding: "24px 48px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <Label>Email</Label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Para poder responderte"
                value={form.email}
                onChange={onChange}
                style={inputBase}
              />
            </GridCell>
          </Grid>

          {/* Message */}
          <div
            style={{
              borderBottom: bd,
              padding: "24px 48px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <Label>Mensaje</Label>
            <textarea
              name="mensaje"
              autoComplete="off"
              required
              placeholder="Cuéntanos lo que quieras"
              value={form.mensaje}
              onChange={onChange}
              style={{
                ...inputBase,
                resize: "none",
                minHeight: 160,
                lineHeight: 1.6,
              }}
            />
          </div>

          {/* Submit row */}
          <div
            style={{
              borderBottom: bd,
              padding: "20px 48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            {status === "error" ? (
              <Label accent>Algo fue mal. Inténtalo de nuevo.</Label>
            ) : (
              <span
                style={{
                  ...mono,
                  fontSize: 8,
                  color: UI.muted,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {motivo
                  ? `Motivo seleccionado: ${MOTIVOS.find((m) => m.id === motivo)?.label}`
                  : "Sin motivo seleccionado — puedes elegir uno arriba"}
              </span>
            )}
            <Button
              type="submit"
              disabled={status === "sending"}
              variant="primary"
              surface="light"
              size="md"
            >
              {status === "sending" ? "Enviando..." : "Enviar mensaje"}
            </Button>
          </div>
        </form>
      )}

      {/* ── Info strip ───────────────────────────────────────────── */}
      <Grid columns="site">
        {[
          { label: "Respuesta", value: "< 48 h laborables" },
          { label: "Email", value: "hola@prometeo.info" },
          { label: "Certificación", value: "Solicitar evaluación" },
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
