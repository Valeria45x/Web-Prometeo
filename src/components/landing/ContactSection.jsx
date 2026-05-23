import { useState } from "react";
import { TH } from "../../constants";
import { CONTACT_FORM_ENDPOINT } from "../../config/env";
import { FONTS } from "../../design/tokens";
import { EASE, DARK_GRID, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";
import { useReveal } from "../../hooks/useReveal";
import { L } from "../Primitives";
import Button from "../system/Button";

const PROTOTYPE_DELAY_MS = 450;

export default function ContactSection({ light, mobileFlow = false, flow = false }) {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [status, setStatus] = useState("idle");
  const [rIntro, sIntro] = useReveal(0, true);
  const [rForm, sForm] = useReveal(140, true);

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
    fontSize: 16,
    lineHeight: "32px",
    padding: "0",
    fontFamily: FONTS.sans,
    transition: `color ${EASE}`,
  };
  const shouldFlow = mobileFlow || flow;

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
      className={`contact-sec ${mobileFlow ? "contact-sec--flow" : "reveal-contact"}`}
      style={{
        position: shouldFlow ? "relative" : "absolute",
        top: shouldFlow ? "auto" : 0,
        left: shouldFlow ? "auto" : 0,
        right: shouldFlow ? "auto" : 0,
        zIndex: 2,
        height: mobileFlow ? "auto" : `calc(100vh - ${TH}px)`,
        background: bg,
        borderTop: bd,
        display: "grid",
        gridTemplateColumns: mobileFlow ? "1fr" : "repeat(4, minmax(0, 1fr))",
        gridTemplateRows: mobileFlow ? "auto" : `${TH}px 1fr`,
        transition,
      }}
    >
      {!mobileFlow ? (
        <>
          <div style={{ gridColumn: "span 2", borderRight: bd, borderBottom: bd, transition }} />
          <div style={{ gridColumn: "span 2", borderBottom: bd, transition }} />
        </>
      ) : null}

      <div
        ref={rIntro}
        className="contact-sec__intro"
        style={{
          ...sIntro,
          gridColumn: mobileFlow ? "auto" : "span 2",
          borderRight: mobileFlow ? "none" : bd,
          borderBottom: mobileFlow ? bd : "none",
          padding: mobileFlow ? "32px 16px" : "64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: mobileFlow ? "flex-start" : "space-between",
          gap: mobileFlow ? 32 : 0,
          transition: `${sIntro.transition}, ${transition}`,
        }}
      >
        <div style={{ display: "grid", gap: mobileFlow ? 16 : 0 }}>
          <h2
            className="section-title"
            style={{
              color: titleColor,
              lineHeight: mobileFlow ? "32px" : "64px",
              margin: mobileFlow ? 0 : "0 0 32px",
              transition: `color ${EASE}`,
            }}
          >
            ¿Hablamos?
          </h2>
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 16,
              color: subColor,
              lineHeight: "32px",
              maxWidth: "30ch",
              margin: 0,
              textWrap: "pretty",
              transition: `color ${EASE}`,
            }}
          >
            {mobileFlow ? (
              "Si tienes una duda, una idea, o simplemente quieres saludar, nos alegra escucharte."
            ) : (
              <>
                Si tienes una duda, una idea,
                <br />
                o simplemente quieres saludar,
                <br />
                nos alegra escucharte.
              </>
            )}
          </p>
        </div>
        <L style={{ color: labelColor, transition: `color ${EASE}` }}>
          hola@prometeo.info
        </L>
      </div>

      <div
        ref={rForm}
        className="contact-right"
        style={{
          ...sForm,
          gridColumn: mobileFlow ? "auto" : "span 2",
          padding: mobileFlow ? "32px 16px" : "64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: mobileFlow ? 32 : 0,
          transition: `${sForm.transition}, ${transition}`,
        }}
      >
        {status === "sent" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
              gap: 16,
            }}
          >
            <h3 className="sub-title" style={{ color: titleColor }}>
              Mensaje recibido.
            </h3>
            <p
              style={{
                fontFamily: FONTS.sans,
                fontSize: 16,
                color: subColor,
                lineHeight: "32px",
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
              height: mobileFlow ? "auto" : "100%",
              gap: 32,
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
                  padding: 16,
                  display: "grid",
                  alignContent: "space-between",
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
                  Nombre
                </L>
                <input
                  id="contact-name"
                  name="nombre"
                  autoComplete="name"
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
                  padding: 16,
                  display: "grid",
                  alignContent: "space-between",
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
                  Email
                </L>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
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
                  padding: 16,
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
                        fontSize: 16,
                        lineHeight: "32px",
                        color: "rgba(160, 160, 160, 0.82)",
                        pointerEvents: "none",
                      }}
                    >
                      Cuéntanos lo que quieras
                    </span>
                  )}
                  <textarea
                    id="contact-message"
                    name="mensaje"
                    autoComplete="off"
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
                      lineHeight: "32px",
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
              <Button
                type="submit"
                disabled={status === "sending"}
                variant="outline"
                surface={light ? "light" : "dark"}
                emphasis="neutral"
                font="sans"
                size="lg"
                align="start"
                style={{
                  marginLeft: mobileFlow ? 0 : "auto",
                  minWidth: mobileFlow ? "100%" : 256,
                }}
              >
                {status === "sending" ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
