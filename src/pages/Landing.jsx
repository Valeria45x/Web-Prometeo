import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TH } from "../constants";
import { L } from "../components/Primitives";
import Topbar from "../components/Topbar";

const EASE = "0.9s cubic-bezier(0.16,1,0.3,1)";
const DARK_GRID = "1px solid #f2f2f2";
const LIGHT_GRID = "1px solid #111";

function isReloadNavigation() {
  if (typeof window === "undefined" || typeof performance === "undefined") {
    return false;
  }

  const navigationEntries = performance.getEntriesByType("navigation");
  return navigationEntries[0]?.type === "reload";
}

function ActionButton({ to, href, children, color, fullWidth = false }) {
  const style = {
    width: fullWidth ? "100%" : "auto",
    minHeight: 46,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    padding: "12px 16px",
    border: `1px solid ${color}`,
    color,
    textDecoration: "none",
    fontFamily: '"Funnel Sans", sans-serif',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    transition: `color ${EASE}, border-color ${EASE}, background ${EASE}`,
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" style={style}>
        <span>{children}</span>
        <span>↗</span>
      </a>
    );
  }

  return (
    <Link to={to} style={style}>
      <span>{children}</span>
      <span>→</span>
    </Link>
  );
}

/* Scramble text: randomises characters then reveals left-to-right */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function useScramble(finalText, { speed = 42, delayMs = 0 } = {}) {
  const [text, setText] = useState(finalText);
  useEffect(() => {
    if (isReloadNavigation()) {
      setText(finalText);
      return undefined;
    }

    let timeout, interval;
    const start = () => {
      let frame = 0;
      const chars = finalText.split("");
      const steps = chars.length * 2 + 10;
      interval = setInterval(() => {
        setText(
          chars
            .map((ch, i) => {
              if (ch === " " || ch === ".") return ch;
              const revealAt = Math.floor((i / chars.length) * steps * 0.6);
              if (frame >= revealAt + 5) return ch;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join(""),
        );
        frame++;
        if (frame >= steps) {
          setText(finalText);
          clearInterval(interval);
        }
      }, speed);
    };
    if (delayMs > 0) timeout = setTimeout(start, delayMs);
    else start();
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [finalText, speed, delayMs]);
  return text;
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
    const background = light ? "#f8f8f8" : "#0a0a0a";
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
        background: light ? "#f8f8f8" : "#0a0a0a",
        transition: `background ${EASE}, border-color ${EASE}`,
      }}
    >
      <Topbar light={light} showWordmark={showWordmark} />
      <S1_Hero />
      <S2_Mision />
      <S3_Nexo light={light} setLight={setLight} />
      <S3b_Frentes light={light} />
      <S4_Respuesta light={light} />
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

/* S1 — HERO: sticky con fill de texto activado por scroll */
const HERO_FILL_PX = 500;

function S1_Hero() {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const bd = DARK_GRID;
  const line1 = useScramble("PROYECTO", { speed: 38 });
  const line2 = useScramble("PROMETEO.", { speed: 38, delayMs: 220 });

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
            style={{ color: "#e4e4e4", textAlign: "center", lineHeight: 1.05 }}
          >
            {line1}
            <br />
            {line2}
          </h2>

          {/* Slogan con fill: capa gris base + capa blanca con clipPath */}
          <div style={{ position: "relative", textAlign: "center" }}>
            <h1
              className="sub-title"
              style={{ color: "#2e2e2e", whiteSpace: "nowrap" }}
            >
              Privacidad digital que se entiende.
            </h1>
            <h1
              aria-hidden="true"
              className="sub-title"
              style={{
                position: "absolute",
                inset: 0,
                color: "#eeeeee",
                whiteSpace: "nowrap",
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
        gridTemplateColumns: "1.2fr 0.7fr 0.7fr",
        gridTemplateRows: "1fr 1fr",
        background: "#0c0c0c",
      }}
    >
      <div
        style={{
          borderRight: bd,
          borderBottom: bd,
          padding: `${TH}px 48px 52px`,
          display: "flex",
          alignItems: "flex-end",
          gridRow: "1 / span 2",
        }}
      >
        <div ref={rA} style={sA}>
          <h2
            className="section-title"
            style={{ color: "#e4e4e4", lineHeight: 1.05, maxWidth: "16ch" }}
          >
            Cuando la privacidad se explica mal,
            <br />
            acaba pareciendo ajena.
          </h2>
        </div>
      </div>

      <div
        style={{
          borderRight: bd,
          borderBottom: bd,
          padding: `${TH}px 34px 38px`,
          display: "flex",
          alignItems: "flex-end",
        }}
      />

      <div
        style={{
          borderBottom: bd,
          padding: `${TH}px 34px 38px`,
          display: "flex",
          alignItems: "flex-end",
        }}
      />

      <div
        style={{
          borderRight: bd,
          padding: "28px 34px 32px",
          display: "flex",
          alignItems: "flex-end",
        }}
      />

      <div
        style={{
          padding: "28px 34px 32px",
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
              maxWidth: "9ch",
              margin: 0,
            }}
          >
            Pero no debería sentirse así.
          </h3>
        </div>
      </div>
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
          background: light ? "#f8f8f8" : "#0a0a0a",
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
            alignItems: "flex-start",
            padding: "56px 48px 44px",
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
            alignItems: "flex-end",
            justifyContent: "flex-end",
            padding: "44px 48px 52px",
            transition: `opacity ${EASE}, transform ${EASE}`,
          }}
        >
          <h2
            className="section-title"
            style={{
              color: titleColor,
              lineHeight: 1.05,
              textAlign: "right",
              transition: `color ${EASE}`,
            }}
          >
            Por eso decidimos
            <br />
            traducirlo mejor.
          </h2>
        </div>
      </section>
    </div>
  );
}

/* S3b — FRENTES: puente entre el porqué y el qué */
function S3b_Frentes({ light }) {
  const [rTitle, sTitle] = useReveal(0);

  const bg = light ? "#efefef" : "#0a0a0a";
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? "#0a0a0a" : "#e4e4e4";
  const subColor = light ? "#999" : "#555";
  const CT = `background ${EASE}, border-color ${EASE}`;

  return (
    <section
      style={{
        minHeight: "65vh",
        borderTop: bd,
        borderLeft: bd,
        background: bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: `${TH}px 48px 52px`,
        transition: CT,
      }}
    >
      <div ref={rTitle} style={sTitle}>
        <h2
          className="section-title"
          style={{
            color: titleColor,
            lineHeight: 1.05,
            maxWidth: "15ch",
            transition: `color ${EASE}`,
          }}
        >
          Desde ahí construimos
          <br />
          una forma de actuar.
        </h2>
      </div>

      <p
        style={{
          fontFamily: '"Funnel Sans", sans-serif',
          fontSize: 16,
          color: subColor,
          lineHeight: 1.8,
          maxWidth: "42ch",
          transition: `color ${EASE}`,
        }}
      >
        No se trata solo de explicar un problema. Se trata de convertir esa
        comprensión en señales, herramientas y gestos que puedas reconocer en tu
        día a día.
      </p>
    </section>
  );
}

/* S4 — STACKING CARDS */
function S4_Respuesta({ light }) {
  return (
    <div id="respuesta">
      <StackCard
        zIndex={1}
        light={light}
        title="Educación"
        sub="Contenido claro, visual y directo para entender qué ocurre con tus datos sin tener que aprender un nuevo idioma técnico."
        tag="TikTok · Instagram · Web"
        label="004 — Lo que creamos"
        ctaLead="Explora artículos y piezas que traducen la privacidad a un lenguaje cotidiano y útil."
        ctas={[{ label: "Ir a artículos", to: "/articulos" }]}
      />
      <StackCard
        zIndex={2}
        light={light}
        title="Certificación"
        sub="Un sistema legible para identificar qué apps y servicios se toman en serio la privacidad antes de que tengas que leer la letra pequeña."
        tag="Sello B2B2C · Bronce / Plata / Oro"
        label="005 — Cómo se verifica"
        ctaLead="Descubre cómo funciona el sello Prometeo tanto para quien usa un servicio como para quien lo ofrece."
        ctas={[{ label: "Ir a certificación", to: "/certificacion" }]}
      />
      <StackCard
        zIndex={3}
        light={light}
        title="Comunidad"
        sub="Objetos, campañas y cultura visual que sacan la privacidad del plano abstracto y la convierten en algo presente, compartible y cotidiano."
        tag="Merch · Campañas · Identidad"
        label="006 — Cómo se comparte"
        variant="community"
        ctas={[
          { label: "Ir a tienda", to: "/tienda" },
          { label: "Ver canales", to: "/contacto" },
        ]}
      />
    </div>
  );
}

const DARK_BG = ["", "#0d0d0d", "#0f0f0f", "#121212"];
const LIGHT_BG = ["", "#ffffff", "#f7f7f7", "#f0f0f0"];

function StackCard({
  zIndex,
  light,
  title,
  sub,
  tag,
  label,
  ctaLead,
  ctas = [],
  variant = "default",
}) {
  const [rTitle, sTitle] = useReveal(0, true);
  const [rSub, sSub] = useReveal(120, true);

  const bg = light ? LIGHT_BG[zIndex] : DARK_BG[zIndex];
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? "#0a0a0a" : "#e4e4e4";
  const subColor = light ? "#999" : "#555";
  const dimColor = light ? "#ccc" : "#2a2a2a";
  const metaColor = light ? "#666" : "#7a7a7a";
  const CT = `background ${EASE}, border-color ${EASE}`;
  const actionColor = light ? "#0a0a0a" : "#ededed";

  return (
    <div
      className="stack-card"
      style={{
        position: "sticky",
        top: TH,
        zIndex,
        minHeight: `calc(100vh - ${TH}px)`,
        background: bg,
        borderLeft: bd,
        borderRight: bd,
        borderBottom: bd,
        borderTop: zIndex === 1 ? bd : "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 48,
        padding: "44px 48px 40px",
        transition: CT,
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 24 }}
      >
        <L style={{ color: metaColor, transition: `color ${EASE}` }}>{label}</L>
        <L style={{ color: dimColor, transition: `color ${EASE}` }}>{tag}</L>
      </div>

      <div
        style={{ display: "flex", flexDirection: "column", gap: 28, flex: 1 }}
      >
        <div ref={rTitle} style={sTitle}>
          <h2
            className="section-title"
            style={{
              color: titleColor,
              marginBottom: 20,
              transition: `color ${EASE}`,
            }}
          >
            {title}.
          </h2>
        </div>
        <div ref={rSub} style={sSub}>
          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 14,
              color: subColor,
              lineHeight: 1.75,
              maxWidth: "38ch",
              transition: `color ${EASE}`,
            }}
          >
            {sub}
          </p>
        </div>

        {variant === "community" ? (
          <div
            className="stack-card-community"
            style={{
              marginTop: "auto",
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              borderTop: bd,
              borderLeft: bd,
              minHeight: 240,
            }}
          >
            <div
              className="community-intro"
              style={{
                gridRow: "1 / span 2",
                borderRight: bd,
                borderBottom: bd,
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <L style={{ color: metaColor, transition: `color ${EASE}` }}>
                  Comunidad activa
                </L>
                <p
                  style={{
                    fontFamily: '"Funnel Sans", sans-serif',
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: subColor,
                    margin: "18px 0 0",
                    maxWidth: "22ch",
                    transition: `color ${EASE}`,
                  }}
                >
                  La privacidad también necesita objetos, referencias y lugares
                  desde los que hablarse sin solemnidad.
                </p>
              </div>
              <ActionButton to={ctas[0]?.to} color={actionColor}>
                {ctas[0]?.label}
              </ActionButton>
            </div>

            <div
              style={{
                borderRight: bd,
                borderBottom: bd,
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <L style={{ color: metaColor, transition: `color ${EASE}` }}>
                Redes
              </L>
              <p
                style={{
                  fontFamily: '"Funnel Sans", sans-serif',
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: subColor,
                  margin: "14px 0 0",
                  transition: `color ${EASE}`,
                }}
              >
                Clips, carruseles y presencia viva para que el proyecto se pueda
                seguir de cerca.
              </p>
            </div>

            <div
              style={{
                borderBottom: bd,
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <L style={{ color: metaColor, transition: `color ${EASE}` }}>
                Tienda
              </L>
              <p
                style={{
                  fontFamily: '"Funnel Sans", sans-serif',
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: subColor,
                  margin: "14px 0 0",
                  transition: `color ${EASE}`,
                }}
              >
                Piezas físicas y señales que llevan la conversación fuera de la
                pantalla.
              </p>
            </div>

            <div
              style={{
                borderRight: bd,
                borderBottom: bd,
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <L style={{ color: metaColor, transition: `color ${EASE}` }}>
                Campañas
              </L>
              <p
                style={{
                  fontFamily: '"Funnel Sans", sans-serif',
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: subColor,
                  margin: "14px 0 0",
                  transition: `color ${EASE}`,
                }}
              >
                Lenguaje visual, colaboraciones y activaciones pensadas para ser
                compartidas.
              </p>
            </div>

            <div
              style={{
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <L style={{ color: metaColor, transition: `color ${EASE}` }}>
                Siguiente paso
              </L>
              <ActionButton to={ctas[1]?.to} color={actionColor} fullWidth>
                {ctas[1]?.label}
              </ActionButton>
            </div>
          </div>
        ) : (
          <div
            className="stack-card-panel"
            style={{
              marginTop: "auto",
              display: "grid",
              gridTemplateColumns: "1.35fr 0.9fr",
              borderTop: bd,
              borderLeft: bd,
              minHeight: 164,
            }}
          >
            <div
              style={{
                borderRight: bd,
                borderBottom: bd,
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <L style={{ color: metaColor, transition: `color ${EASE}` }}>
                Call to action
              </L>
              <p
                style={{
                  fontFamily: '"Funnel Sans", sans-serif',
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: subColor,
                  margin: "14px 0 0",
                  maxWidth: "26ch",
                  transition: `color ${EASE}`,
                }}
              >
                {ctaLead}
              </p>
            </div>
            <div
              style={{
                borderBottom: bd,
                padding: "20px 22px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-start",
              }}
            >
              <ActionButton to={ctas[0]?.to} color={actionColor}>
                {ctas[0]?.label}
              </ActionButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* S8 — CONTACTO: absolute z-2 encima del footer, se desliza hacia arriba */
function S8_Contact({ light }) {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const bg = light ? "#f0f0f0" : "#0d0d0d";
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? "#0a0a0a" : "#e4e4e4";
  const subColor = light ? "#888" : "#555";
  const labelColor = light ? "#bbb" : "#444";
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
              fontSize: 14,
              color: subColor,
              lineHeight: 1.75,
              maxWidth: "30ch",
              transition: `color ${EASE}`,
            }}
          >
            Si tienes una duda, una idea,
            <br />o simplemente quieres saludar —<br />
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
                gridTemplateRows: "repeat(3, minmax(0, 1fr))",
                borderTop: bd,
                borderLeft: bd,
                minHeight: 0,
              }}
            >
              <div
                style={{
                  borderRight: bd,
                  borderBottom: bd,
                  padding: "18px 20px",
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
                  padding: "18px 20px",
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
                <textarea
                  name="mensaje"
                  value={form.mensaje}
                  onChange={onChange}
                  required
                  placeholder="Cuéntanos lo que quieras"
                  rows={3}
                  style={{
                    ...inputStyle,
                    resize: "none",
                    alignSelf: "stretch",
                  }}
                />
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
                style={{
                  marginLeft: "auto",
                  fontFamily: '"Funnel Sans", sans-serif',
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: titleColor,
                  background: "transparent",
                  border: bd,
                  cursor: status === "sending" ? "default" : "pointer",
                  padding: "12px 16px",
                  opacity: status === "sending" ? 0.4 : 1,
                  transition: `color ${EASE}, opacity 0.2s, border-color ${EASE}`,
                }}
              >
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
  const bg = "#ff3c54";
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const labelColor = "#22080d";
  const dimColor = "#4a1018";
  const bigColor = "#8f1325";
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
            proyectoprometeo.info ↗
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
