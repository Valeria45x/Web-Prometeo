import { useState } from "react";
import { Page } from "../Page";
import "./contacto.css";
import { CONTACT_FORM_ENDPOINT } from "../../config/env";

const MOTIVOS = [
  { id: "certificacion", label: "Certificación" },
  { id: "comunidad", label: "Comunidad" },
  { id: "prensa", label: "Prensa" },
  { id: "otro", label: "Otro" },
];

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
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero__main">
          <span className="contact-hero__eyebrow">Contacto</span>
          <h1 className="contact-hero__heading">¿Hablamos?</h1>
          <p className="contact-hero__desc">
            Si tienes una duda, una idea o quieres saber más sobre la
            certificación o la comunidad, nos alegra escucharte.
          </p>
        </div>
        <div className="contact-hero__meta">
          <div className="contact-hero__meta-item">
            <span className="contact-hero__meta-label">Email</span>
            <a
              href="mailto:hola@prometeo.info"
              className="contact-hero__meta-value"
            >
              hola@prometeo.info
            </a>
          </div>
          <div className="contact-hero__meta-item">
            <span className="contact-hero__meta-label">Respuesta</span>
            <span className="contact-hero__meta-value">
              Menos de 48 h laborables
            </span>
          </div>
        </div>
      </section>

      {/* Motivo */}
      <div className="contact-motivo-bar">
        <span className="contact-motivo-bar__label">Motivo</span>
        <div className="contact-motivo-bar__options">
          {MOTIVOS.map((m) => {
            const active = motivo === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMotivo(active ? null : m.id)}
                className={[
                  "contact-motivo-bar__btn",
                  active && "contact-motivo-bar__btn--active",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {m.label}
              </button>
            );
          })}
        </div>
        {motivo && (
          <button
            type="button"
            className="contact-motivo-bar__clear"
            onClick={() => setMotivo(null)}
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Form / Success */}
      {status === "sent" ? (
        <div className="contact-success">
          <h2 className="contact-success__heading">Recibido.</h2>
          <p className="contact-success__desc">
            Gracias por escribirnos. Te contestamos pronto.
          </p>
          <button
            type="button"
            className="contact-success__btn"
            onClick={() => setStatus("idle")}
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="contact-form__row">
            <div className="contact-form__field">
              <label className="contact-form__label" htmlFor="contact-nombre">
                Nombre
              </label>
              <input
                id="contact-nombre"
                className="contact-form__input"
                name="nombre"
                autoComplete="name"
                required
                placeholder="¿Cómo te llamas?"
                value={form.nombre}
                onChange={onChange}
              />
            </div>
            <div className="contact-form__field">
              <label className="contact-form__label" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                className="contact-form__input"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Para poder responderte"
                value={form.email}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="contact-form__field--full">
            <label className="contact-form__label" htmlFor="contact-mensaje">
              Mensaje
            </label>
            <textarea
              id="contact-mensaje"
              className="contact-form__textarea"
              name="mensaje"
              autoComplete="off"
              required
              placeholder="Cuéntanos lo que quieras"
              value={form.mensaje}
              onChange={onChange}
            />
          </div>

          <div className="contact-form__footer">
            {status === "error" ? (
              <span role="alert" className="contact-form__hint contact-form__hint--error">
                Algo fue mal. Inténtalo de nuevo.
              </span>
            ) : (
              <span className="contact-form__hint">
                {motivo
                  ? `Motivo: ${MOTIVOS.find((m) => m.id === motivo)?.label}`
                  : "Sin motivo seleccionado"}
              </span>
            )}
            <button
              type="submit"
              className="contact-form__submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Enviando..." : "Enviar mensaje →"}
            </button>
          </div>
        </form>
      )}
    </Page>
  );
}
