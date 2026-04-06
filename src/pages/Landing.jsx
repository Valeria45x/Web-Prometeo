import { useRef, useEffect, useState } from "react";
import { B, TH } from "../constants";
import { Sec, C, L } from "../components/Primitives";
import Topbar from "../components/Topbar";

const EASE = "0.9s cubic-bezier(0.16,1,0.3,1)";

/* Anima al entrar Y al re-entrar en viewport.
   once=true: solo la primera vez (útil en stacking cards) */
function useReveal(delay = 0, once = false) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (once) { if (e.isIntersecting) setVis(true); }
        else setVis(e.isIntersecting);
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  return [ref, {
    opacity: vis ? 1 : 0,
    transform: vis ? "none" : "translateY(28px)",
    transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  }];
}

export default function Landing() {
  const [light, setLight] = useState(false);

  // Tema blanco: se activa cuando S3 sale por arriba y ya no vuelve a oscuro
  useEffect(() => {
    const el = document.getElementById("nexo");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting && e.boundingClientRect.top < 0) setLight(true);
      else setLight(false);
    }, { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Sincroniza el fondo del body (los lados fuera del max-width)
  useEffect(() => {
    document.body.style.transition = `background ${EASE}`;
    document.body.style.background = light ? "#f8f8f8" : "#0a0a0a";
  }, [light]);

  return (
    <div style={{
      maxWidth: 1600, margin: "0 auto",
      borderLeft: B, borderRight: B,
      background: light ? "#f8f8f8" : "#0a0a0a",
      transition: `background ${EASE}`,
    }}>
      <Topbar light={light} />
      <S1_Hero />
      <S2_Mision />
      <S3_Nexo />
      <S4_Respuesta light={light} />
      {/* Reveal footer: footer sticky z-1 como fondo fijo,
           contacto absolute z-2 se desliza hacia arriba para revelarlo */}
      <div className="reveal-wrapper" style={{ position: "relative", height: `calc(2 * (100vh - ${TH}px))` }}>
        <LandingFooter light={light} />
        <S8_Contact light={light} />
      </div>
    </div>
  );
}

/* S1 — HERO */
function S1_Hero() {
  const [rTitle, sTitle] = useReveal(80);
  const [rSub,   sSub  ] = useReveal(200);
  return (
    <Sec rows={`${TH}px 1fr 80px`}>
      <C span={1} className="mob-hide" />
      <C span={3} className="c-full mob-hide" />

      <C span={3} className="c-full" style={{ display: "flex", alignItems: "flex-end", padding: "40px 36px" }}>
        <div ref={rTitle} style={sTitle}>
          <h1 className="mega-title">Privacidad<br />que se<br />entiende.</h1>
        </div>
      </C>
      <C span={1} className="mob-hide" bg="#0f0f0f" />

      <C span={2} />
      <C span={1} className="mob-hide" />
      <C span={1} className="mob-hide" bg="#0a0a0a" />
    </Sec>
  );
}

/* S2 — PROBLEMA: full-bleed, sin grid, rompe el patrón */
function S2_Mision() {
  const [rA, sA] = useReveal(0);
  const [rB, sB] = useReveal(180);
  return (
    <section id="sobre" className="s2-section" style={{
      minHeight: "65vh",
      borderTop: B, borderLeft: B,
      padding: `${TH}px 48px 52px`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: "#0c0c0c",
    }}>
      <L>002 — El problema</L>

      <div ref={rA} style={sA}>
        <h2 className="section-title" style={{ color: "#e4e4e4", lineHeight: 1.05, maxWidth: "14ch" }}>
          Entender la privacidad digital parece imposible.
        </h2>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div ref={rB} style={sB}>
          <h3 className="sub-title" style={{ color: "#444", textAlign: "right", lineHeight: 1.4 }}>
            Y con eso viene<br />la sensación de que<br />no podemos hacer nada.
          </h3>
        </div>
      </div>
    </section>
  );
}

/* S3 — NEXO: puente emocional entre el problema y la solución */
function S3_Nexo() {
  const [rA, sA] = useReveal(0);
  const [rC, sC] = useReveal(180);
  return (
    <section id="nexo" className="s2-section" style={{
      minHeight: `calc(100vh - ${TH}px)`,
      borderTop: B, borderLeft: B,
      padding: `56px 48px 52px`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: "#0a0a0a",
    }}>
      <L style={{ color: "#2a2a2a" }}>003 — Nosotros</L>

      <div ref={rA} style={sA}>
        <h2 className="section-title" style={{ color: "#e4e4e4", lineHeight: 1.05, maxWidth: "16ch" }}>
          Nos pasaba<br />lo mismo.
        </h2>
      </div>

      <div>
        <div ref={rC} style={sC}>
          <h3 className="sub-title" style={{ color: "#c0c0c0" }}>
            Así que decidimos<br />hacer algo al respecto.
          </h3>
        </div>
      </div>
    </section>
  );
}

/* S4 — STACKING CARDS */
function S4_Respuesta({ light }) {
  return (
    <div id="respuesta">
      <StackCard
        zIndex={1} light={light}
        n="01" title="Educación"
        sub="Contenido que explica la privacidad sin tecnicismos. Para que entiendas qué pasa con tus datos y qué puedes hacer."
        tag="TikTok · Instagram · Web"
        label="004 — Lo que creamos"
      />
      <StackCard
        zIndex={2} light={light}
        n="02" title="Certificación"
        sub="Un sello para que sepas qué apps y servicios respetan tus datos de verdad. Sin tener que leer la letra pequeña."
        tag="Sello B2B2C · Bronce / Plata / Oro"
      />
      <StackCard
        zIndex={3} light={light}
        n="03" title="Comunidad"
        sub="Merch, campañas y cultura que normalizan la conversación. Porque hablar de privacidad no tiene que ser aburrido."
        tag="Merch · Campañas · Identidad"
      />
    </div>
  );
}

const DARK_BG  = ["", "#0d0d0d", "#0f0f0f", "#121212"];
const LIGHT_BG = ["", "#ffffff", "#f7f7f7", "#f0f0f0"];

function StackCard({ zIndex, light, n, title, sub, tag, label }) {
  const [rTitle, sTitle] = useReveal(0,   true);
  const [rSub,   sSub  ] = useReveal(120, true);

  const bg         = light ? LIGHT_BG[zIndex] : DARK_BG[zIndex];
  const bd         = light ? "1px solid #e0e0e0" : B;
  const titleColor = light ? "#0a0a0a" : "#e4e4e4";
  const subColor   = light ? "#999"    : "#555";
  const dimColor   = light ? "#ccc"    : "#2a2a2a";
  const CT         = `background ${EASE}, border-color ${EASE}`;

  return (
    <div className="stack-card" style={{
      position: "sticky",
      top: TH,
      zIndex,
      minHeight: `calc(100vh - ${TH}px)`,
      background: bg,
      borderTop: bd,
      borderLeft: bd,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "44px 48px 40px",
      transition: CT,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <L style={{ color: dimColor, transition: `color ${EASE}` }}>{label || `0${zIndex} — Prometeo`}</L>
        <L style={{ color: dimColor, transition: `color ${EASE}` }}>{n}</L>
      </div>

      <div>
        <div ref={rTitle} style={sTitle}>
          <h2 className="section-title" style={{ color: titleColor, marginBottom: 20, transition: `color ${EASE}` }}>{title}.</h2>
        </div>
        <div ref={rSub} style={sSub}>
          <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 14, color: subColor, lineHeight: 1.75, maxWidth: "38ch", transition: `color ${EASE}` }}>
            {sub}
          </p>
        </div>
      </div>

      <L style={{ color: dimColor, transition: `color ${EASE}` }}>{tag}</L>
    </div>
  );
}

/* S8 — CONTACTO: absolute z-2 encima del footer, se desliza hacia arriba */
function S8_Contact({ light }) {
  const [form, setForm]     = useState({ nombre: "", email: "", mensaje: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const bg         = light ? "#f0f0f0" : "#0d0d0d";
  const bd         = light ? "1px solid #e0e0e0" : B;
  const titleColor = light ? "#0a0a0a" : "#e4e4e4";
  const subColor   = light ? "#888"    : "#555";
  const labelColor = light ? "#bbb"    : "#444";
  const inputBd    = light ? "1px solid #ccc" : "1px solid #2a2a2a";
  const inputColor = light ? "#0a0a0a" : "#c0c0c0";
  const CT         = `background ${EASE}, border-color ${EASE}`;

  const inputStyle = {
    width: "100%", background: "transparent",
    border: "none", borderBottom: inputBd,
    color: inputColor, fontSize: 14, padding: "8px 0",
    fontFamily: '"Funnel Sans", sans-serif',
    transition: `border-color ${EASE}, color ${EASE}`,
  };

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Crea un formulario gratis en formspree.io y reemplaza YOUR_FORM_ID
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("sent"); setForm({ nombre: "", email: "", mensaje: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <section
      id="contacto"
      className="contact-sec reveal-contact"
      style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 2,
        height: `calc(100vh - ${TH}px)`,
        background: bg, borderTop: bd, borderLeft: bd,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: `${TH}px 1fr`,
        transition: CT,
      }}
    >
      {/* Label strip */}
      <div style={{ borderRight: bd, borderBottom: bd, transition: CT }} />
      <div style={{ borderBottom: bd, transition: CT }} />

      {/* Columna izquierda */}
      <div style={{ borderRight: bd, padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between", transition: CT }}>
        <L style={{ color: labelColor, transition: `color ${EASE}` }}>005 — Contacto</L>
        <div>
          <h2 className="section-title" style={{ color: titleColor, lineHeight: 1.05, marginBottom: 20, transition: `color ${EASE}` }}>
            ¿Hablamos?
          </h2>
          <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 14, color: subColor, lineHeight: 1.75, maxWidth: "30ch", transition: `color ${EASE}` }}>
            Si tienes una duda, una idea,<br />o simplemente quieres saludar —<br />nos alegra escucharte.
          </p>
        </div>
        <L style={{ color: labelColor, transition: `color ${EASE}` }}>hola@proyectoprometeo.info</L>
      </div>

      {/* Columna derecha — formulario */}
      <div className="contact-right" style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {status === "sent" ? (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", gap: 12 }}>
            <h3 className="sub-title" style={{ color: titleColor }}>Mensaje recibido.</h3>
            <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 14, color: subColor, lineHeight: 1.75 }}>
              Te contestamos pronto :)
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div>
                <L style={{ color: labelColor, display: "block", marginBottom: 8, transition: `color ${EASE}` }}>Nombre</L>
                <input name="nombre" value={form.nombre} onChange={onChange} required
                  placeholder="¿Cómo te llamas?" style={inputStyle} />
              </div>
              <div>
                <L style={{ color: labelColor, display: "block", marginBottom: 8, transition: `color ${EASE}` }}>Email</L>
                <input type="email" name="email" value={form.email} onChange={onChange} required
                  placeholder="Para poder responderte" style={inputStyle} />
              </div>
              <div>
                <L style={{ color: labelColor, display: "block", marginBottom: 8, transition: `color ${EASE}` }}>Mensaje</L>
                <textarea name="mensaje" value={form.mensaje} onChange={onChange} required
                  placeholder="Cuéntanos lo que quieras" rows={3}
                  style={{ ...inputStyle, resize: "none" }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {status === "error" && (
                <L style={{ color: "#e55" }}>Algo fue mal. Inténtalo de nuevo.</L>
              )}
              <button type="submit" disabled={status === "sending"} style={{
                marginLeft: "auto",
                fontFamily: '"Funnel Sans", sans-serif', fontSize: 11,
                letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700,
                color: titleColor, background: "transparent", border: "none",
                cursor: status === "sending" ? "default" : "pointer",
                padding: 0, opacity: status === "sending" ? 0.4 : 1,
                transition: `color ${EASE}, opacity 0.2s`,
              }}>
                {status === "sending" ? "Enviando…" : "Enviar →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

/* FOOTER DE LANDING: sticky z-1, fijo en el fondo — el contacto se revela al scrollear */
function LandingFooter({ light }) {
  const bg        = light ? "#f8f8f8" : "#080808";
  const bd        = light ? "1px solid #e0e0e0" : B;
  const labelColor = light ? "#bbb"   : "#444";
  const dimColor  = light ? "#ddd"    : "#252525";
  const CT        = `background ${EASE}, border-color ${EASE}`;
  return (
    <footer className="reveal-footer" style={{
      position: "sticky",
      top: TH,
      zIndex: 1,
      height: `calc(100vh - ${TH}px)`,
      background: bg,
      borderTop: bd, borderLeft: bd,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "40px 48px 36px",
      transition: CT,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span className="small-label" style={{ color: light ? "#aaa" : "#333", letterSpacing: "0.22em", transition: `color ${EASE}` }}>
          Proyecto Prometeo
        </span>
        <L style={{ color: dimColor, transition: `color ${EASE}` }}>v6</L>
      </div>

      <div className="lf-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div className="lf-links" style={{ display: "flex", gap: 40 }}>
          <L style={{ color: labelColor, transition: `color ${EASE}` }}>Instagram ↗</L>
          <L style={{ color: labelColor, transition: `color ${EASE}` }}>TikTok ↗</L>
          <L style={{ color: labelColor, transition: `color ${EASE}` }}>proyectoprometeo.info ↗</L>
        </div>
        <L style={{ color: dimColor, transition: `color ${EASE}` }}>Valeria Cabrera · UDIT 2025/26</L>
      </div>
    </footer>
  );
}
