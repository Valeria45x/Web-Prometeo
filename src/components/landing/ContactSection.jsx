import { useState } from "react";
import { TH } from "../../constants";
import { CONTACT_FORM_ENDPOINT } from "../../config/env";
import { FONTS } from "../../design/tokens";
import { EASE, DARK_GRID, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";
import { L } from "../Primitives";

const PROTOTYPE_DELAY_MS = 450;

export default function ContactSection({ light }) {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [status, setStatus] = useState("idle");

  const bg = light ? PAGE_LIGHT_BG : "#0d0d0d";
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? "#0a0a0a" : "#e4e4e4";
  const subColor = light ? "#6b6b6b" : "#8a8a8a";
  const labelColor = light ? "#6b6b6b" : "#8a8a8a";
  const inputColor = light ? "#0a0a0a" : "#c0c0c0";
  const transition = `background ${EASE}, border-color ${EASE}`;

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    color: inputColor,
    fontSize: 14,
    padding: "0",
    fontFamily: FONTS.sans,
    transition: `color ${EASE}`,
  };

  const onChange = (event) =>
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));

  const resetForm = () => setForm({ nombre: "", email: "", mensaje: "" });

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");

    try {
      if (!CONTACT_FORM_ENDPOINT) {
        await new Promise((resolve) =>
          window.setTimeout(resolve, PROTOTYPE_DELAY_MS),
        );
        setStatus("sent");
        resetForm();
        return;
      }

      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("sent");
      resetForm();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contacto"
      className="contact-sec reveal-contact"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        height: `calc(100vh - ${TH}px)`,
        background: bg,
        borderTop: bd,
        borderLeft: bd,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: `${TH}px 1fr`,
        transition,
      }}
    >
      <div style={{ borderRight: bd, borderBottom: bd, transition }} />
      <div style={{ borderBottom: bd, transition }} />

      <div
        style={{
          borderRight: bd,
          padding: "56px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition,
        }}
      >
        <div>
          <h2
            className="section-title"
            style={{
              color: titleColor,
              lineHeight: 1.05,
              marginBottom: 20,
              transition: `color ${EASE}`,
            }}
          >
            ¿Hablamos?
          </h2>
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 18,
              color: subColor,
              lineHeight: 1.6,
              maxWidth: "30ch",
              transition: `color ${EASE}`,
            }}
          >
            Si tienes una duda, una idea,
            <br />
            o simplemente quieres saludar,
            <br />
            nos alegra escucharte.
          </p>
        </div>
        <L style={{ color: labelColor, transition: `color ${EASE}` }}>
          hola@proyectoprometeo.info
        </L>
      </div>

      <div
        className="contact-right"
        style={{
          padding: "56px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {status === "sent" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
              gap: 12,
            }}
          >
            <h3 className="sub-title" style={{ color: titleColor }}>
              Mensaje recibido.
            </h3>
            <p
              style={{
                fontFamily: FONTS.sans,
                fontSize: 14,
                color: subColor,
                lineHeight: 1.75,
              }}
            >
              Te contestamos pronto :)
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            style={{
              display: "grid",
              gridTemplateRows: "1fr auto",
              height: "100%",
              gap: 28,
            }}
          >
            <div
              className="contact-form-grid"
              style={{
                display: "grid",
                gridTemplateRows:
                  "minmax(0, 0.6fr) minmax(0, 0.6fr) minmax(0, 1.8fr)",
                borderTop: bd,
                borderLeft: bd,
                minHeight: 0,
              }}
            >
              <div
                style={{
                  borderRight: bd,
                  borderBottom: bd,
                  padding: "14px 20px",
                  display: "grid",
                  alignContent: "space-between",
                  gap: 10,
                }}
              >
                <L
                  style={{
                    color: labelColor,
                    display: "block",
                    transition: `color ${EASE}`,
                  }}
                >
                  Nombre
                </L>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={onChange}
                  required
                  placeholder="¿Cómo te llamas?"
                  style={inputStyle}
                />
              </div>
              <div
                style={{
                  borderRight: bd,
                  borderBottom: bd,
                  padding: "14px 20px",
                  display: "grid",
                  alignContent: "space-between",
                  gap: 10,
                }}
              >
                <L
                  style={{
                    color: labelColor,
                    display: "block",
                    transition: `color ${EASE}`,
                  }}
                >
                  Email
                </L>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  placeholder="Para poder responderte"
                  style={inputStyle}
                />
              </div>
              <div
                style={{
                  borderRight: bd,
                  borderBottom: bd,
                  padding: "18px 20px",
                  display: "grid",
                  gridTemplateRows: "auto 1fr",
                  gap: 16,
                }}
              >
                <L
                  style={{
                    color: labelColor,
                    display: "block",
                    transition: `color ${EASE}`,
                  }}
                >
                  Mensaje
                </L>
                <div
                  style={{ position: "relative", minHeight: 0, height: "100%" }}
                >
                  {!form.mensaje && (
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        fontFamily: FONTS.sans,
                        fontSize: 14,
                        lineHeight: 1.45,
                        color: "rgba(160, 160, 160, 0.82)",
                        pointerEvents: "none",
                      }}
                    >
                      Cuéntanos lo que quieras
                    </span>
                  )}
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={onChange}
                    required
                    placeholder=""
                    rows={3}
                    style={{
                      ...inputStyle,
                      resize: "none",
                      alignSelf: "stretch",
                      height: "100%",
                      paddingBottom: "0",
                      lineHeight: 1.45,
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className="contact-form-actions"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
              }}
            >
              {status === "error" && (
                <L style={{ color: "#e55" }}>
                  Algo fue mal. Inténtalo de nuevo.
                </L>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="contact-submit"
                style={{
                  marginLeft: "auto",
                  width: "fit-content",
                  minWidth: 240,
                  minHeight: 60,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  fontFamily: FONTS.sans,
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: titleColor,
                  background: "transparent",
                  border: bd,
                  cursor: status === "sending" ? "default" : "pointer",
                  padding: "16px 22px",
                  textAlign: "left",
                  opacity: status === "sending" ? 0.4 : 1,
                  transition: `color ${EASE}, opacity 0.2s, border-color ${EASE}, background ${EASE}, transform 0.2s ease`,
                }}
              >
                {status === "sending" ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
