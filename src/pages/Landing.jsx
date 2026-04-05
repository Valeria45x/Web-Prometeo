import { Link } from "react-router-dom";
import { B, TH } from "../constants";
import { Sec, C, L } from "../components/Primitives";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

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
      <S8_Contacto />
      <Footer />
    </div>
  );
}

/* S1 — HERO */
function S1_Hero() {
  return (
    <Sec rows={`${TH}px 1fr 96px`}>
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>001</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Lorem ipsum / 2026</L></C>

      <C span={3} style={{ display: "flex", alignItems: "flex-end", padding: "40px 36px" }}>
        <h1 className="mega-title">Lorem ipsum<br />dolor sit<br />amet.</h1>
      </C>
      <C span={1} bg="#0f0f0f" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "32px 24px" }}>
        <h2 className="sub-title" style={{ color: "#555" }}>Lorem ipsum<br />dolor sit.</h2>
      </C>

      <C span={2} style={{ display: "flex", alignItems: "center" }}><L>→ Lorem ipsum dolor sit amet</L></C>
      <C span={1} style={{ display: "flex", alignItems: "center" }}><L>proyectoprometeo.info</L></C>
      <C span={1} bg="#0a0a0a" />
    </Sec>
  );
}

/* S2 — MISIÓN (Sobre Nosotros) */
function S2_Mision() {
  return (
    <Sec id="sobre" rows={`${TH}px 1fr 72px`}>
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>002 — Sobre</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Lorem ipsum</L></C>

      <C span={2} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "40px 36px" }}>
        <L>Lorem / ipsum</L>
        <h2 className="section-title">Lorem ipsum<br />dolor sit amet.</h2>
      </C>
      <C span={1} bg="#111" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 24, padding: "40px 28px" }}>
        <L style={{ color: "#444" }}>Lorem</L>
        <h3 className="sub-title" style={{ color: "#777" }}>Lorem ipsum dolor sit amet consectetur.</h3>
      </C>
      <C span={1} bg="#0a0a0a" />

      {["Lorem ipsum", "Dolor sit", "Amet lorem"].map((v, i) => (
        <C key={i} span={1} bg={i === 1 ? "#0f0f0f" : undefined} style={{ display: "flex", alignItems: "center" }}>
          <L style={{ color: "#444" }}>— {v}</L>
        </C>
      ))}
      <C span={1} bg="#0a0a0a" />
    </Sec>
  );
}

/* S3 — EL PROBLEMA */
function S3_Problema() {
  return (
    <Sec id="problema" rows={`${TH}px 1fr`}>
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>003 — Problema</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Lorem ipsum</L></C>

      <C span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "36px" }}>
        <h2 className="section-title">Lorem<br />ipsum<br />dolor.</h2>
      </C>
      <C span={2} bg="#111" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 20, padding: "48px 40px" }}>
        <L style={{ color: "#444" }}>Lorem ipsum</L>
        <p style={{ fontFamily: '"Funnel Display",serif', fontSize: "clamp(5rem,13vw,11rem)", lineHeight: 0.82, fontWeight: 800, color: "#ececec" }}>
          67%
        </p>
        <h3 className="sub-title" style={{ color: "#555" }}>Lorem ipsum dolor sit amet.</h3>
      </C>
      <C span={1} bg="#0a0a0a" />
    </Sec>
  );
}

/* S4 — LA RESPUESTA */
function S4_Respuesta() {
  const pillars = ["Lorem.", "Ipsum.", "Dolor.", "Amet."];
  return (
    <Sec id="respuesta" rows={`${TH}px 1fr 1fr`}>
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>004 — Respuesta</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Lorem ipsum</L></C>

      <C span={2} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "36px" }}>
        <h2 className="section-title">Lorem ipsum<br /><span style={{ color: "#555" }}>dolor sit.</span></h2>
      </C>
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "36px 28px" }}>
        <h3 className="sub-title" style={{ color: "#555", fontSize: "clamp(0.9rem,1.5vw,1.3rem)" }}>
          Lorem ipsum dolor sit amet consectetur adipiscing.
        </h3>
      </C>
      <C span={1} bg="#0a0a0a" />

      {pillars.map((p, i) => (
        <C key={i} span={1} bg={i % 2 === 1 ? "#0f0f0f" : undefined}
          style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
          <L>{String(i + 1).padStart(2, "0")}</L>
          <h3 className="sub-title">{p}</h3>
          <L>→ Lorem</L>
        </C>
      ))}
    </Sec>
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

/* S8 — CONTACTO teaser */
function S8_Contacto() {
  return (
    <Sec id="contacto" rows={`${TH}px 1fr`}>
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>008 — Contacto</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 24px" }}>
        <Link to="/contacto" className="nav-link">Contactar →</Link>
      </C>

      <C span={2} bg="#0f0f0f" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "40px 36px" }}>
        <L style={{ color: "#444" }}>Lorem / ipsum</L>
        <h2 className="section-title" style={{ color: "#e0e0e0" }}>
          Lorem ipsum<br /><span style={{ color: "#555" }}>dolor sit.</span>
        </h2>
        <L style={{ color: "#555" }}>proyectoprometeo.info</L>
      </C>
      <C span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
        <L>Instagram</L>
        <h3 className="sub-title" style={{ color: "#555" }}>@lorem<br />ipsum</h3>
        <L>→</L>
      </C>
      <C span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
        <L>TikTok</L>
        <h3 className="sub-title" style={{ color: "#555" }}>@dolor<br />sit</h3>
        <L>→</L>
      </C>
    </Sec>
  );
}
