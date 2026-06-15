import { useRef, useState } from "react";
import { COLORS } from "@/design/tokens";
import { Page } from "@/shared/layout/Page";
import LandingTransitionSection from "@/features/landing/transition/LandingTransitionSection";
import Button from "@/shared/ui/Button";
import Chip from "@/shared/ui/Chip";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { CONTACT_FORM_ENDPOINT } from "@/config/env";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";
import "@/features/landing/shared/scrollTextReveal.css";
import "@/features/contacto/contacto.css";

const MOTIVOS = [
  { id: "certificacion", label: "Certificación" },
  { id: "comunidad", label: "Comunidad" },
  { id: "prensa", label: "Prensa" },
  { id: "otro", label: "Otro" },
];

export default function ContactoPage() {
  const pageRef = useRef(null);
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [motivo, setMotivo] = useState(null);
  const [status, setStatus] = useState("idle");

  useScrollTextReveal(pageRef);

  const onChange = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");

    try {
      if (!CONTACT_FORM_ENDPOINT) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setStatus("sent");
        setForm({ nombre: "", email: "", mensaje: "" });
        setMotivo(null);
        return;
      }

      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...form, motivo }),
      });

      if (!response.ok) {
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
      <div ref={pageRef} className="contact-page">
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

        <div className="contact-transition">
          <LandingTransitionSection light title="Tu mensaje" column={2} />
        </div>

        <section className="contact-compose">
          <div className="contact-compose__form">
            <div className="contact-motivo-bar">
              <span className="contact-motivo-bar__label">Sobre qué</span>
              <div className="contact-motivo-bar__options">
                {MOTIVOS.map((item) => {
                  const active = motivo === item.id;
                  return (
                    <Chip
                      key={item.id}
                      label={item.label}
                      active={active}
                      onClick={() => setMotivo(active ? null : item.id)}
                    />
                  );
                })}
              </div>
              {motivo && (
                <Button
                  variant="ghost"
                  surface="light"
                  size="sm"
                  onClick={() => setMotivo(null)}
                >
                  Limpiar
                </Button>
              )}
            </div>

            {status === "sent" ? (
              <div className="contact-success">
                <h2 className="contact-success__heading">Recibido.</h2>
                <p className="contact-success__desc">
                  Gracias por escribirnos. Te contestamos pronto.
                </p>
                <SplitCtaButton
                  label="Enviar otro mensaje"
                  color={COLORS.textOnLight}
                  iconBg={COLORS.pageLight}
                  onClick={() => setStatus("idle")}
                />
              </div>
            ) : (
              <form className="contact-form" onSubmit={onSubmit}>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label
                      className="contact-form__label"
                      htmlFor="contact-nombre"
                    >
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
                    <label
                      className="contact-form__label"
                      htmlFor="contact-email"
                    >
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

                <div className="contact-form__field contact-form__field--message">
                  <label
                    className="contact-form__label"
                    htmlFor="contact-mensaje"
                  >
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
                    <span
                      role="alert"
                      className="contact-form__hint contact-form__hint--error"
                    >
                      Algo fue mal. Inténtalo de nuevo.
                    </span>
                  ) : (
                    <span className="contact-form__hint">
                      {motivo
                        ? `Motivo: ${
                            MOTIVOS.find((item) => item.id === motivo)?.label
                          }`
                        : "Puedes enviar el mensaje sin elegir un motivo."}
                    </span>
                  )}
                  <SplitCtaButton
                    type="submit"
                    label={status === "sending" ? "Enviando…" : "Enviar mensaje"}
                    color={COLORS.textOnLight}
                    iconBg={COLORS.pageLight}
                    disabled={status === "sending"}
                  />
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </Page>
  );
}
