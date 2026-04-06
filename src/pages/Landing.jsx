import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { B, TH } from "../constants";
import { Sec, C, L } from "../components/Primitives";
import Topbar from "../components/Topbar";

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
  return (
    <div style={{ maxWidth: 1600, margin: "0 auto", borderLeft: B, borderRight: B }}>
      <Topbar />
      <S1_Hero />
      <S2_Mision />
      <S3_Problema />
      <S4_Respuesta />
      <S5_Cert />
      <S6_Arts />
      <S7_Tienda />
      {/* Reverse stacking: contacto sticky z-1, footer z-2 desliza encima */}
      <div style={{ position: "relative" }}>
        <S8_Contact />
        <LandingFooter />
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
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>001</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>proyectoprometeo.info</L></C>

      <C span={3} style={{ display: "flex", alignItems: "flex-end", padding: "40px 36px" }}>
        <div ref={rTitle} style={sTitle}>
          <h1 className="mega-title">Privacidad<br />que se<br />entiende.</h1>
        </div>
      </C>
      <C span={1} bg="#0f0f0f" />

      <C span={2} style={{ display: "flex", alignItems: "center" }}>
        <div ref={rSub} style={sSub}>
          <L>→ Empoderamiento. Educación. Comunidad.</L>
        </div>
      </C>
      <C span={1} style={{ display: "flex", alignItems: "center" }}><L>proyectoprometeo.info</L></C>
      <C span={1} bg="#0a0a0a" />
    </Sec>
  );
}

/* S2 — PROBLEMA: full-bleed, sin grid, rompe el patrón */
function S2_Mision() {
  const [rA, sA] = useReveal(0);
  const [rB, sB] = useReveal(180);
  return (
    <section id="sobre" style={{
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
            Y la sensación<br />de que no podemos<br />hacer nada.
          </h3>
        </div>
      </div>
    </section>
  );
}

/* S3 — DATO: grid (estructura aporta peso visual al número) */
function S3_Problema() {
  const [rStat, sStat] = useReveal(0);
  const [rTurn, sTurn] = useReveal(200);
  return (
    <section id="problema" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: B, borderLeft: B }}>
      <div style={{ height: TH, borderRight: B, borderBottom: B, display: "flex", alignItems: "center", padding: "0 24px" }}>
        <L>003 — El dato</L>
      </div>
      <div style={{ gridColumn: "span 3", height: TH, borderRight: B, borderBottom: B, display: "flex", alignItems: "center", padding: "0 24px" }}>
        <L style={{ color: "#2a2a2a" }}>Pew Research Center, 2023</L>
      </div>

      <div style={{ gridColumn: "span 2", borderRight: B, background: "#111", padding: "44px 40px 40px", minHeight: 300, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div ref={rStat} style={sStat}>
          <p style={{ fontFamily: '"Funnel Display", serif', fontSize: "clamp(6rem,16vw,14rem)", lineHeight: 0.82, fontWeight: 800, color: "#ececec" }}>
            67%
          </p>
          <h3 className="sub-title" style={{ color: "#555", marginTop: 24 }}>
            no sabe qué hacen<br />las apps con sus datos.
          </h3>
        </div>
      </div>
      <div style={{ borderLeft: B, padding: "44px 36px", display: "flex", alignItems: "flex-end" }}>
        <div ref={rTurn} style={sTurn}>
          <h3 className="sub-title" style={{ color: "#888", lineHeight: 1.35 }}>
            Sin miedo.<br />Con herramientas.
          </h3>
        </div>
      </div>
    </section>
  );
}

/* S4 — STACKING CARDS: cada pilar como tarjeta que apila sobre la anterior */
function S4_Respuesta() {
  return (
    <div id="respuesta">
      <StackCard
        zIndex={1} bg="#0d0d0d"
        n="01" title="Educación"
        sub="Contenido que explica la privacidad sin tecnicismos."
        tag="TikTok · Instagram · Web"
        label="004 — La respuesta"
      />
      <StackCard
        zIndex={2} bg="#0f0f0f"
        n="02" title="Certificación"
        sub="Un sello que las empresas ganan y tú reconoces."
        tag="Sello B2B2C · Bronce / Plata / Oro"
      />
      <StackCard
        zIndex={3} bg="#121212"
        n="03" title="Comunidad"
        sub="Merch, campañas y presencia cultural que normalizan hablar de privacidad."
        tag="Merch · Campañas · Identidad"
      />
    </div>
  );
}

function StackCard({ zIndex, bg, n, title, sub, tag, label }) {
  const [rTitle, sTitle] = useReveal(0,   true);
  const [rSub,   sSub  ] = useReveal(120, true);
  return (
    <div style={{
      position: "sticky",
      top: TH,
      zIndex,
      minHeight: `calc(100vh - ${TH}px)`,
      background: bg,
      borderTop: B, borderLeft: B,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "44px 48px 40px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <L style={{ color: "#2a2a2a" }}>{label || `0${zIndex} — Prometeo`}</L>
        <L style={{ color: "#2a2a2a" }}>{n}</L>
      </div>

      <div>
        <div ref={rTitle} style={sTitle}>
          <h2 className="section-title" style={{ color: "#e4e4e4", marginBottom: 20 }}>{title}.</h2>
        </div>
        <div ref={rSub} style={sSub}>
          <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 14, color: "#555", lineHeight: 1.75, maxWidth: "38ch" }}>
            {sub}
          </p>
        </div>
      </div>

      <L style={{ color: "#333" }}>{tag}</L>
    </div>
  );
}

/* S5 — CERTIFICACIONES teaser */
function S5_Cert() {
  const levels = ["Bronce", "Plata", "Oro"];
  const bgs    = [undefined, "#0f0f0f", "#141414"];
  return (
    <Sec id="certificaciones" rows={`${TH}px 1fr`}>
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>005 — Certificación</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 24px" }}>
        <Link to="/certificacion" className="nav-link">Ver todo →</Link>
      </C>

      {levels.map((l, i) => (
        <C key={i} span={1} bg={bgs[i]} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
          <L>{l}</L>
          <h3 className="sub-title">Lorem<br />ipsum.</h3>
          <L style={{ color: "#444" }}>→</L>
        </C>
      ))}
      <C span={1} bg="#0a0a0a" style={{ display: "flex", alignItems: "flex-end" }}>
        <L style={{ color: "#222" }}>Aplicar →</L>
      </C>
    </Sec>
  );
}

/* S6 — ARTÍCULOS teaser */
function S6_Arts() {
  return (
    <Sec id="articulos" rows={`${TH}px 1fr`}>
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>006 — Artículos</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 24px" }}>
        <Link to="/articulos" className="nav-link">Ver todo →</Link>
      </C>

      <C span={2} bg="#0f0f0f" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
        <L style={{ color: "#444" }}>Destacado</L>
        <h2 className="section-title" style={{ color: "#d0d0d0" }}>Lorem ipsum<br />dolor sit.</h2>
        <L style={{ color: "#555" }}>→ Leer</L>
      </C>
      <C span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
        <L>02</L>
        <h3 className="sub-title" style={{ color: "#777" }}>Lorem<br />ipsum.</h3>
        <L>→</L>
      </C>
      <C span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
        <L>03</L>
        <h3 className="sub-title" style={{ color: "#777" }}>Dolor<br />sit.</h3>
        <L>→</L>
      </C>
    </Sec>
  );
}

/* S7 — TIENDA teaser */
function S7_Tienda() {
  return (
    <Sec id="tienda" rows={`${TH}px 1fr`}>
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>007 — Tienda</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 24px" }}>
        <Link to="/tienda" className="nav-link">Ver todo →</Link>
      </C>

      <C span={2} bg="#111" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "40px 36px" }}>
        <L style={{ color: "#444" }}>Lorem ipsum</L>
        <h2 className="section-title" style={{ color: "#e0e0e0" }}>Lorem ipsum<br />dolor sit amet.</h2>
        <L style={{ color: "#555" }}>→ Ver producto</L>
      </C>
      <C span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <L>Joyería</L>
        <h3 className="sub-title" style={{ color: "#666" }}>Lorem.</h3>
        <L style={{ color: "#333" }}>→</L>
      </C>
      <C span={1} bg="#0f0f0f" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <L>USB</L>
        <h3 className="sub-title" style={{ color: "#666" }}>Ipsum.</h3>
        <L style={{ color: "#333" }}>→</L>
      </C>
    </Sec>
  );
}

/* S8 — CONTACTO: 2 columnas, sticky z-index 1 (el footer se deslizará encima) */
function S8_Contact() {
  const [rL, sL] = useReveal(0);
  const [rR, sR] = useReveal(160);
  return (
    <section
      id="contacto"
      style={{
        position: "sticky",
        top: TH,
        zIndex: 1,
        minHeight: `calc(100vh - ${TH}px)`,
        background: "#0d0d0d",
        borderTop: B, borderLeft: B,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: `${TH}px 1fr`,
      }}
    >
      {/* Label strip */}
      <div style={{ borderRight: B, borderBottom: B, display: "flex", alignItems: "center", padding: "0 48px" }}>
        <L>008 — Contacto</L>
      </div>
      <div style={{ borderBottom: B, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 48px" }}>
        <L style={{ color: "#252525" }}>proyectoprometeo.info</L>
      </div>

      {/* Columna izquierda */}
      <div style={{ borderRight: B, padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div ref={rL} style={sL}>
          <h2 className="section-title" style={{ color: "#e4e4e4", lineHeight: 1.05 }}>
            ¿Alguna<br />pregunta?
          </h2>
        </div>
        <L style={{ color: "#444" }}>hola@proyectoprometeo.info</L>
      </div>

      {/* Columna derecha */}
      <div style={{ padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div ref={rR} style={sR}>
          <h3 className="sub-title" style={{ color: "#555", lineHeight: 1.4 }}>
            Escríbenos.<br />Estamos para<br />responder.
          </h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <L style={{ color: "#444" }}>Instagram ↗</L>
          <L style={{ color: "#444" }}>TikTok ↗</L>
        </div>
      </div>
    </section>
  );
}

/* FOOTER DE LANDING: z-index 2, desliza SOBRE el contacto desde abajo */
function LandingFooter() {
  return (
    <footer style={{
      position: "relative",
      zIndex: 2,
      minHeight: "40vh",
      background: "#080808",
      borderTop: B, borderLeft: B,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "40px 48px 36px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span className="small-label" style={{ color: "#333", letterSpacing: "0.22em" }}>
          Proyecto Prometeo
        </span>
        <L style={{ color: "#252525" }}>v6</L>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ display: "flex", gap: 40 }}>
          <L style={{ color: "#444" }}>Instagram ↗</L>
          <L style={{ color: "#444" }}>TikTok ↗</L>
          <L style={{ color: "#444" }}>proyectoprometeo.info ↗</L>
        </div>
        <L style={{ color: "#252525" }}>Valeria Cabrera · UDIT 2025/26</L>
      </div>
    </footer>
  );
}
