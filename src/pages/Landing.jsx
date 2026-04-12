import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TH } from "../constants";
import { L } from "../components/Primitives";
import Topbar from "../components/Topbar";

const EASE = "0.9s cubic-bezier(0.16,1,0.3,1)";
const DARK_GRID = "1px solid #f2f2f2";
const LIGHT_GRID = "1px solid #111";
const PAGE_WHITE = "#e4e4e4";
const PAGE_LIGHT_BG = "#efefef";

function isReloadNavigation() {
  if (typeof window === "undefined" || typeof performance === "undefined") {
    return false;
  }

  const navigationEntries = performance.getEntriesByType("navigation");
  return navigationEntries[0]?.type === "reload";
}

function useReveal(delay = 0, once = false) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (once) {
          if (e.isIntersecting) setVis(true);
        } else setVis(e.isIntersecting);
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  return [
    ref,
    {
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(28px)",
      transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    },
  ];
}

export default function Landing() {
  const [light, setLight] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);

  // Wordmark en navbar aparece justo cuando el h2 del hero sale por arriba
  useEffect(() => {
    const el = document.getElementById("hero-title");
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setShowWordmark(!e.isIntersecting && e.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // El fade to white lo controla S3_Nexo directamente via setLight

  // Sincroniza el fondo exterior con la sección visible del landing
  useEffect(() => {
    const background = light ? PAGE_LIGHT_BG : "#0a0a0a";
    const root = document.getElementById("root");

    document.documentElement.style.transition = `background ${EASE}`;
    document.documentElement.style.background = background;
    document.body.style.transition = `background ${EASE}`;
    document.body.style.background = background;

    if (root) {
      root.style.transition = `background ${EASE}`;
      root.style.background = background;
    }
  }, [light]);

  const frameBorder = light ? LIGHT_GRID : DARK_GRID;

  return (
    <div
      style={{
        maxWidth: 1600,
        margin: "0 auto",
        borderLeft: frameBorder,
        borderRight: frameBorder,
        background: light ? PAGE_LIGHT_BG : "#0a0a0a",
        transition: `background ${EASE}, border-color ${EASE}`,
      }}
    >
      <Topbar light={light} showWordmark={showWordmark} />
      <S1_Hero />
      <SectionTransition splitColumn={1} />
      <S2_Mision />
      <SectionTransition splitColumn={3} />
      <S3_Nexo light={light} setLight={setLight} />
      <SectionTransition light={light} splitColumn={2} />
      <S3b_Frentes light={light} />
      {/* Reveal footer: footer sticky z-1 como fondo fijo,
           contacto absolute z-2 se desliza hacia arriba para revelarlo */}
      <div
        className="reveal-wrapper"
        style={{ position: "relative", height: `calc(2 * (100vh - ${TH}px))` }}
      >
        <LandingFooter light={light} />
        <S8_Contact light={light} />
      </div>
    </div>
  );
}

function SectionTransition({ light = false, splitColumn = 2 }) {
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const bg = light ? PAGE_LIGHT_BG : "#0a0a0a";
  const CT = `background ${EASE}, border-color ${EASE}`;

  return (
    <section
      aria-hidden="true"
      style={{
        height: TH,
        background: bg,
        borderTop: bd,
        borderLeft: bd,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        transition: CT,
      }}
    >
      <div
        style={{
          gridColumn: `1 / span ${splitColumn}`,
          borderRight: bd,
          transition: CT,
        }}
      />
      <div style={{ gridColumn: `${splitColumn + 1} / -1` }} />
    </section>
  );
}

/* S1 — HERO: sticky con fill de texto activado por scroll */
const HERO_FILL_PX = 500;

function S1_Hero() {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const bd = DARK_GRID;
  const line1 = "PROYECTO";
  const line2 = "PROMETEO.";

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top;
      setProgress(Math.max(0, Math.min(1, scrolled / HERO_FILL_PX)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // clipPath revela de izquierda a derecha: inset(top right bottom left)
  const clipRight = `${((1 - progress) * 100).toFixed(1)}%`;

  return (
    <div
      ref={wrapperRef}
      style={{ height: `calc(100vh - ${TH}px + ${HERO_FILL_PX}px)` }}
    >
      <section
        style={{
          position: "sticky",
          top: TH,
          height: `calc(100vh - ${TH}px)`,
          borderLeft: bd,
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          padding: "48px 36px 44px",
        }}
      >
        {/* Título + slogan juntos, centrados verticalmente */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <h2
            id="hero-title"
            className="mega-title"
            style={{ color: PAGE_WHITE, textAlign: "center", lineHeight: 1.05 }}
          >
            {line1}
            <br />
            {line2}
          </h2>

          {/* Slogan con fill: capa gris base + capa Prometeo con clipPath */}
          <div
            style={{
              position: "relative",
              textAlign: "center",
              display: "inline-block",
              paddingBottom: "0.12em",
              overflow: "visible",
            }}
          >
            <h1
              className="sub-title"
              style={{
                color: "#8a8a8a",
                whiteSpace: "nowrap",
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Privacidad digital que se entiende.
            </h1>
            <h1
              aria-hidden="true"
              className="sub-title"
              style={{
                position: "absolute",
                inset: 0,
                color: "#ff3c54",
                whiteSpace: "nowrap",
                lineHeight: 1.05,
                clipPath: `inset(0 ${clipRight} 0 0)`,
                margin: 0,
              }}
            >
              Privacidad digital que se entiende.
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}

/* S2 — PROBLEMA: two-column editorial grid */
function S2_Mision() {
  const [rA, sA] = useReveal(0);
  const [rD, sD] = useReveal(420);
  const bd = DARK_GRID;

  return (
    <section
      id="sobre"
      className="s2-section"
      style={{
        minHeight: "85vh",
        borderTop: bd,
        borderLeft: bd,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "1fr 1fr",
        background: "#0c0c0c",
      }}
    >
      <div
        style={{
          gridColumn: "1 / span 2",
          borderRight: bd,
          display: "flex",
          gridRow: "1 / span 2",
        }}
      >
        <div
          ref={rA}
          style={{
            ...sA,
            width: "100%",
            display: "grid",
            gridTemplateRows: "auto auto 1fr",
            minHeight: "100%",
          }}
        >
          <div
            style={{
              padding: `${TH}px 48px 0`,
            }}
          >
            <h2
              className="section-title"
              style={{ color: PAGE_WHITE, lineHeight: 1.05, margin: 0 }}
            >
              La privacidad digital parece complicada.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderTop: bd,
              marginTop: 28,
              alignSelf: "start",
            }}
          >
            <div
              style={{
                gridColumn: "1 / span 2",
                padding: "28px 48px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <p
                style={{
                  fontFamily: '"Funnel Sans", sans-serif',
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: "#c8c8c8",
                  margin: 0,
                  maxWidth: "100%",
                }}
              >
                El internet está cambiando rápido, y eso no solo mueve a las
                grandes empresas. Cada vez es más difícil entender el panorama
                digital y qué está pasando en realidad. Esa falta de claridad
                termina creando un ecosistema desigual, donde no todo el mundo
                puede decidir desde el mismo lugar.
              </p>
            </div>

            <div
              style={{
                gridColumn: "1 / span 2",
                borderTop: bd,
                padding: "28px 48px 32px",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div ref={rD} style={sD}>
                <h3
                  className="section-title"
                  style={{
                    color: "#ff3c54",
                    lineHeight: 0.96,
                    maxWidth: "20ch",
                    margin: 0,
                  }}
                >
                  Pero no debería
                  <br />
                  ser así.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          gridColumn: "3 / span 2",
          gridRow: "1 / span 2",
          padding: `${TH}px 34px 32px`,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      />
    </section>
  );
}

/* S3 — NEXO: dos frases en paralelo; la derecha aparece con scroll y activa el fade to white */
const NEXO_SCROLL_PX = 420;

function S3_Nexo({ light, setLight }) {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [rA, sA] = useReveal(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / NEXO_SCROLL_PX));
      setProgress(p);
      setLight(p > 0.25);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [setLight]);

  const titleColor = light ? "#0a0a0a" : "#e4e4e4";
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const CT = `background ${EASE}, border-color ${EASE}`;

  // Frase derecha: aparece gradualmente al hacer scroll (0.05 → 1)
  const rp = Math.max(0, Math.min(1, (progress - 0.05) / 0.95));
  const rightStyle = {
    opacity: rp,
    transform: `translateY(${(1 - rp) * 24}px)`,
  };

  return (
    <div
      ref={wrapperRef}
      style={{ height: `calc(100vh - ${TH}px + ${NEXO_SCROLL_PX}px)` }}
    >
      <section
        id="nexo"
        style={{
          position: "sticky",
          top: TH,
          height: `calc(100vh - ${TH}px)`,
          background: light ? PAGE_LIGHT_BG : "#0a0a0a",
          borderTop: bd,
          borderLeft: bd,
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          alignItems: "stretch",
          transition: CT,
        }}
      >
        <div
          style={{
            borderBottom: bd,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "44px 48px",
            transition: CT,
          }}
        >
          <div ref={rA} style={sA}>
            <div style={{ opacity: 1 - rp * 0.65 }}>
              <h2
                className="section-title"
                style={{
                  color: titleColor,
                  lineHeight: 1.05,
                  textAlign: "center",
                  transition: `color ${EASE}`,
                }}
              >
                A nosotros también
                <br />
                nos incomodaba eso.
              </h2>
            </div>
          </div>
        </div>

        <div
          style={{
            ...rightStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "44px 48px",
            transition: `opacity ${EASE}, transform ${EASE}`,
          }}
        >
          <h2
            className="section-title"
            style={{
              color: titleColor,
              lineHeight: 1.05,
              textAlign: "center",
              transition: `color ${EASE}`,
            }}
          >
            Por eso decidimos
            <br />
            hacerla <span style={{ color: "#ff3c54" }}>más clara.</span>
          </h2>
        </div>
      </section>
    </div>
  );
}

/* S3b — FRENTES: puente entre el porqué y el qué */
const MISSION_PANELS = [
  {
    label: "Educación",
    title: "educación.",
    body: "Contenido claro, visual y directo para entender mejor la privacidad digital y cómo nos afecta.",
    to: "/articulos",
    cta: "Ir a artículos",
  },
  {
    label: "Certificación",
    title: "certificación.",
    body: "Una manera clara de demostrar que una empresa cumple y se toma la privacidad en serio, para que las personas puedan reconocerlo al instante.",
    to: "/certificacion",
    cta: "Ir a certificación",
  },
  {
    label: "Comunidad",
    title: "comunidad.",
    body: "Hacer de la privacidad un habito natural y compartido, integrandola en el dia a dia para que deje de ser un concepto tecnico y pase a ser un valor comun.",
    to: "/tienda",
    cta: "Ir a tienda",
  },
];

function S3b_Frentes({ light }) {
  const [rTitle, sTitle] = useReveal(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activePanel = MISSION_PANELS[activeIndex];

  const bg = light ? PAGE_LIGHT_BG : "#0a0a0a";
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? "#0a0a0a" : "#e4e4e4";
  const subColor = light ? "#6b6b6b" : "#8a8a8a";
  const accentColor = "#ff3c54";
  const accentTextOnFill = "#1a0509";
  const footerNumberColor = "#5c1220";
  const CT = `background ${EASE}, border-color ${EASE}`;

  return (
    <section
      className="mission-section"
      style={{
        minHeight: "65vh",
        borderTop: bd,
        borderLeft: bd,
        background: bg,
        display: "grid",
        gridTemplateColumns: "1.15fr 0.85fr",
        transition: CT,
      }}
    >
      <div
        style={{
          borderRight: bd,
          padding: `${TH}px 48px 52px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 32,
          transition: CT,
        }}
      >
        <div ref={rTitle} style={sTitle}>
          <L style={{ color: accentColor, transition: `color ${EASE}` }}>
            Prometeo promueve la privacidad digital mediante
          </L>
          <h2
            className="section-title"
            style={{
              color: titleColor,
              lineHeight: 1.02,
              maxWidth: "11ch",
              margin: "18px 0 0",
              transition: `color ${EASE}`,
            }}
          >
            {activePanel.title}
          </h2>

          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 18,
              color: subColor,
              lineHeight: 1.6,
              maxWidth: "35ch",
              margin: "18px 0 0",
              transition: `color ${EASE}`,
            }}
          >
            {activePanel.body}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Link
            to={activePanel.to}
            className="mission-cta"
            style={{
              width: "fit-content",
              minWidth: 240,
              minHeight: 60,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "16px 22px",
              border: `1px solid ${titleColor}`,
              color: titleColor,
              textDecoration: "none",
              textAlign: "left",
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              transition: `color ${EASE}, border-color ${EASE}, background ${EASE}, transform 0.2s ease`,
            }}
          >
            <span>{activePanel.cta}</span>
          </Link>
        </div>
      </div>

      <div
        className="mission-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {MISSION_PANELS.map((panel, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={panel.label}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="mission-panel"
              aria-pressed={isActive}
              aria-label={`Abrir ${panel.label}`}
              style={{
                border: "none",
                borderRight: index < MISSION_PANELS.length - 1 ? bd : undefined,
                background: isActive ? accentColor : "transparent",
                padding: "24px 26px",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 18,
                cursor: "pointer",
                transition: `background ${EASE}, border-color ${EASE}, transform 0.2s ease`,
              }}
            >
              <span
                className="mission-panel-status"
                style={{
                  fontFamily: '"Funnel Sans", sans-serif',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: isActive ? footerNumberColor : subColor,
                  transition: `color ${EASE}`,
                }}
              >
                {isActive ? "Seleccionada" : "Haz clic"}
              </span>

              <p
                className="mission-panel-number"
                style={{
                  fontFamily: '"Funnel Display", serif',
                  fontSize: "clamp(1.8rem, 4.5vw, 4.8rem)",
                  lineHeight: 0.92,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: isActive ? footerNumberColor : titleColor,
                  margin: 0,
                  transition: `color ${EASE}`,
                }}
              >
                0{index + 1}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* S8 — CONTACTO: absolute z-2 encima del footer, se desliza hacia arriba */
function S8_Contact({ light }) {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const bg = light ? PAGE_LIGHT_BG : "#0d0d0d";
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? "#0a0a0a" : "#e4e4e4";
  const subColor = light ? "#6b6b6b" : "#8a8a8a";
  const labelColor = light ? "#6b6b6b" : "#8a8a8a";
  const inputColor = light ? "#0a0a0a" : "#c0c0c0";
  const CT = `background ${EASE}, border-color ${EASE}`;

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    color: inputColor,
    fontSize: 14,
    padding: "0",
    fontFamily: '"Funnel Sans", sans-serif',
    transition: `color ${EASE}`,
  };

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Crea un formulario gratis en formspree.io y reemplaza YOUR_FORM_ID
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ nombre: "", email: "", mensaje: "" });
      } else setStatus("error");
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
        transition: CT,
      }}
    >
      {/* Label strip */}
      <div style={{ borderRight: bd, borderBottom: bd, transition: CT }} />
      <div style={{ borderBottom: bd, transition: CT }} />

      {/* Columna izquierda */}
      <div
        style={{
          borderRight: bd,
          padding: "56px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: CT,
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
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 18,
              color: subColor,
              lineHeight: 1.6,
              maxWidth: "30ch",
              transition: `color ${EASE}`,
            }}
          >
            Si tienes una duda, una idea,
            <br />o simplemente quieres saludar,
            <br />
            nos alegra escucharte.
          </p>
        </div>
        <L style={{ color: labelColor, transition: `color ${EASE}` }}>
          hola@proyectoprometeo.info
        </L>
      </div>

      {/* Columna derecha — formulario */}
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
                fontFamily: '"Funnel Sans", sans-serif',
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
                  style={{
                    position: "relative",
                    minHeight: 0,
                    height: "100%",
                  }}
                >
                  {!form.mensaje && (
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        fontFamily: '"Funnel Sans", sans-serif',
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
                  fontFamily: '"Funnel Sans", sans-serif',
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
                {status === "sending" ? "Enviando…" : "Enviar"}
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
  const bg = "#ff3c54";
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const labelColor = "#160509";
  const dimColor = "#22080d";
  const bigColor = "#5c1220";
  const CT = `background ${EASE}, border-color ${EASE}`;
  return (
    <footer
      className="reveal-footer"
      style={{
        position: "sticky",
        top: TH,
        zIndex: 1,
        height: `calc(100vh - ${TH}px)`,
        background: bg,
        borderTop: bd,
        borderLeft: bd,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "40px 48px 0",
        overflow: "hidden",
        transition: CT,
      }}
    >
      {/* Fila superior: links + crédito */}
      <div
        className="lf-bottom"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div className="lf-links" style={{ display: "flex", gap: 40 }}>
          <L style={{ color: labelColor, transition: `color ${EASE}` }}>
            Instagram ↗
          </L>
          <L style={{ color: labelColor, transition: `color ${EASE}` }}>
            TikTok ↗
          </L>
          <L style={{ color: labelColor, transition: `color ${EASE}` }}>
            hola@proyectoprometeo.info ↗
          </L>
        </div>
        <L style={{ color: dimColor, transition: `color ${EASE}` }}>
          Valeria Cabrera · UDIT 2025/26
        </L>
      </div>

      {/* Nombre grande anclado al fondo */}
      <h2
        style={{
          fontFamily: '"Funnel Display", serif',
          fontSize: "clamp(4.5rem, 13vw, 15rem)",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "-0.04em",
          lineHeight: 0.85,
          color: bigColor,
          margin: 0,
          paddingBottom: "0.05em",
          transition: `color ${EASE}`,
          userSelect: "none",
        }}
      >
        Proyecto
        <br />
        Prometeo.
      </h2>
    </footer>
  );
}
