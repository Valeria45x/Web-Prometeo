import { Routes, Route, Link, useLocation } from "react-router-dom";

const B  = "1px solid #1e1e1e";
const TH = 52;

const NAV = [
  { label: "Sobre Nosotros", to: "/sobre-nosotros" },
  { label: "Certificación",  to: "/certificacion" },
  { label: "Tienda",         to: "/tienda" },
  { label: "Artículos",      to: "/articulos" },
  { label: "Contacto",       to: "/contacto" },
];

/* ─── Primitives ──────────────────────────────────── */
function Sec({ children, id, rows = `${TH}px 1fr` }) {
  return (
    <section id={id} style={{
      height: `calc(100vh - ${TH}px)`,
      scrollSnapAlign: "start",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: rows,
      borderTop: B, borderLeft: B,
      overflow: "hidden",
    }}>
      {children}
    </section>
  );
}

function C({ children, span = 1, rowSpan = 1, bg, style = {} }) {
  return (
    <div style={{
      gridColumn: `span ${span}`,
      gridRow: rowSpan > 1 ? `span ${rowSpan}` : undefined,
      background: bg,
      borderRight: B, borderBottom: B,
      padding: 24, minHeight: 0, overflow: "hidden",
      ...style,
    }}>
      {children}
    </div>
  );
}

function L({ children, style = {} }) {
  return (
    <span className="small-label" style={{ color: "#333", ...style }}>
      {children}
    </span>
  );
}

/* ─── Topbar ──────────────────────────────────────── */
function Topbar() {
  const { pathname } = useLocation();
  const active = (to) => pathname === to;

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "#0a0a0a",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      borderTop: B, borderLeft: B,
      height: TH,
    }}>
      {/* Wordmark */}
      <div style={{ borderRight: B, borderBottom: B, display: "flex", alignItems: "center", padding: "0 24px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="small-label" style={{ color: "#bbb", letterSpacing: "0.22em" }}>
            Proyecto Prometeo
          </span>
        </Link>
      </div>

      {/* Sobre Nosotros */}
      <div style={{ borderRight: B, borderBottom: B, display: "flex", alignItems: "center", padding: "0 24px" }}>
        <Link to={NAV[0].to} className="nav-link" style={{ color: active(NAV[0].to) ? "#e0e0e0" : undefined }}>
          {NAV[0].label}
        </Link>
      </div>

      {/* Certificación + Tienda + Artículos */}
      <div style={{ borderRight: B, borderBottom: B, display: "flex", alignItems: "center", gap: 28, padding: "0 24px" }}>
        {NAV.slice(1, 4).map(n => (
          <Link key={n.to} to={n.to} className="nav-link" style={{ color: active(n.to) ? "#e0e0e0" : undefined }}>
            {n.label}
          </Link>
        ))}
      </div>

      {/* Contacto */}
      <div style={{ borderRight: B, borderBottom: B, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 24px" }}>
        <Link to={NAV[4].to} className="nav-link" style={{ color: active(NAV[4].to) ? "#e0e0e0" : undefined }}>
          {NAV[4].label}
        </Link>
      </div>
    </header>
  );
}

/* ─── Footer ──────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: B, borderLeft: B }}>
      <div style={{ gridColumn: "span 3", borderRight: B, borderBottom: B, display: "flex", alignItems: "center", padding: "18px 24px" }}>
        <L style={{ color: "#252525" }}>Proyecto Prometeo — Valeria Cabrera · UDIT 2025/26 · proyectoprometeo.info</L>
      </div>
      <div style={{ borderRight: B, borderBottom: B, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "18px 24px", background: "#0a0a0a" }}>
        <L style={{ color: "#252525" }}>v6</L>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   LANDING PAGE — 6 secciones
═══════════════════════════════════════════════════ */
function Landing() {
  return (
    <div style={{
      height: "100vh",
      overflowY: "scroll",
      scrollSnapType: "y proximity",
      scrollBehavior: "smooth",
      scrollPaddingTop: `${TH}px`,
    }}>
      <div style={{ maxWidth: 1600, margin: "0 auto", borderLeft: B, borderRight: B }}>
        <Topbar />
        <S1_Hero />
        <S2_Intro />
        <S3_Certificaciones />
        <S4_Articulos />
        <S5_Tienda />
        <S6_Contacto />
        <Footer />
      </div>
    </div>
  );
}

/* S1 — HERO */
function S1_Hero() {
  return (
    <Sec rows={`${TH}px 1fr 96px`}>
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>001 — Hero</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Lorem ipsum / 2026</L></C>

      <C span={3} style={{ display: "flex", alignItems: "flex-end", padding: "40px 36px" }}>
        <h1 className="mega-title">
          Lorem ipsum<br />
          dolor sit<br />
          amet.
        </h1>
      </C>
      <C span={1} bg="#0f0f0f" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "32px 24px" }}>
        <h2 className="sub-title" style={{ color: "#555" }}>
          Lorem ipsum<br />dolor sit.
        </h2>
      </C>

      <C span={2} style={{ display: "flex", alignItems: "center" }}>
        <L>→ Lorem ipsum dolor sit amet</L>
      </C>
      <C span={1} style={{ display: "flex", alignItems: "center" }}>
        <L>proyectoprometeo.info</L>
      </C>
      <C span={1} bg="#0a0a0a" />
    </Sec>
  );
}

/* S2 — INTRO */
function S2_Intro() {
  return (
    <Sec id="intro" rows={`${TH}px 1fr 88px`}>
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>002 — Intro</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Lorem ipsum</L></C>

      <C span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <h2 className="section-title">
          Lorem<br />ipsum<br />dolor.
        </h2>
      </C>
      <C span={2} bg="#111" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
        <L style={{ color: "#444" }}>Lorem ipsum</L>
        <p style={{ fontFamily: '"Funnel Display",serif', fontSize: "clamp(5rem,13vw,11rem)", lineHeight: 0.82, fontWeight: 800, color: "#ececec" }}>
          67%
        </p>
        <h3 className="sub-title" style={{ color: "#555" }}>Lorem ipsum dolor sit amet.</h3>
      </C>
      <C span={1} bg="#0a0a0a" />

      <C span={2} style={{ display: "flex", alignItems: "center" }}>
        <h3 className="sub-title" style={{ color: "#555", fontSize: "clamp(0.9rem,1.6vw,1.4rem)" }}>
          Lorem ipsum dolor sit amet consectetur.
        </h3>
      </C>
      <C span={2} bg="#0a0a0a" />
    </Sec>
  );
}

/* S3 — CERTIFICACIONES */
function S3_Certificaciones() {
  const niveles = [
    { n: "01", title: "Bronce" },
    { n: "02", title: "Plata"  },
    { n: "03", title: "Oro"    },
  ];
  return (
    <Sec id="certificaciones" rows={`${TH}px 1fr 1fr`}>
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>003 — Certificación</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Lorem ipsum</L></C>

      <C span={2} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <L>Lorem / ipsum</L>
        <h2 className="section-title">
          Lorem ipsum<br />
          <span style={{ color: "#555" }}>dolor sit.</span>
        </h2>
      </C>
      <C span={1} style={{ display: "flex", alignItems: "flex-end" }}>
        <h3 className="sub-title" style={{ color: "#555", fontSize: "clamp(0.9rem,1.6vw,1.4rem)" }}>
          Lorem ipsum<br />dolor sit amet.
        </h3>
      </C>
      <C span={1} bg="#0a0a0a" />

      {niveles.map((p, i) => (
        <C key={i} span={1} bg={i === 1 ? "#0f0f0f" : undefined}
          style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
          <L>{p.n}</L>
          <h3 className="sub-title">{p.title}.</h3>
          <L>→ Lorem ipsum</L>
        </C>
      ))}
      <C span={1} bg="#0a0a0a" />
    </Sec>
  );
}

/* S4 — ARTÍCULOS */
function S4_Articulos() {
  const arts = [
    { n: "01", title: "Lorem\nipsum." },
    { n: "02", title: "Dolor\nsit."   },
    { n: "03", title: "Amet\nlorem."  },
    { n: "04", title: "Ipsum\ndolor." },
  ];
  return (
    <Sec id="articulos" rows={`${TH}px 1fr`}>
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>004 — Artículos</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Lorem ipsum</L></C>

      {arts.map((a, i) => (
        <C key={i} span={1} bg={i % 2 === 1 ? "#0f0f0f" : undefined}
          style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
          <L>{a.n}</L>
          <h3 className="sub-title">
            {a.title.split("\n").map((line, j) => <span key={j}>{line}{j === 0 && <br />}</span>)}
          </h3>
          <L>→ Leer</L>
        </C>
      ))}
    </Sec>
  );
}

/* S5 — TIENDA */
function S5_Tienda() {
  return (
    <Sec id="tienda" rows={`${TH}px 1fr 1fr`}>
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>005 — Tienda</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Lorem ipsum</L></C>

      <C span={2} bg="#111" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <L style={{ color: "#444" }}>Lorem ipsum</L>
        <h2 className="section-title" style={{ color: "#e0e0e0" }}>
          Lorem ipsum<br />dolor sit amet.
        </h2>
        <L style={{ color: "#555" }}>→ Lorem ipsum</L>
      </C>
      <C span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <h3 className="sub-title" style={{ color: "#555" }}>Lorem ipsum dolor.</h3>
      </C>
      <C span={1} bg="#0a0a0a" />

      <C span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
        <L>01</L>
        <h3 className="sub-title">Lorem.</h3>
        <L>→ Lorem</L>
      </C>
      <C span={1} bg="#0f0f0f" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
        <L>02</L>
        <h3 className="sub-title">Ipsum.</h3>
        <L>→ Lorem</L>
      </C>
      <C span={2} style={{ display: "flex", alignItems: "center" }}>
        <h3 className="sub-title" style={{ color: "#555", fontSize: "clamp(0.9rem,1.6vw,1.4rem)" }}>
          Lorem ipsum dolor sit.
        </h3>
      </C>
    </Sec>
  );
}

/* S6 — CONTACTO */
function S6_Contacto() {
  return (
    <Sec id="contacto" rows={`${TH}px 1fr`}>
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>006 — Contacto</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Lorem ipsum</L></C>

      <C span={2} bg="#0f0f0f" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <L style={{ color: "#444" }}>Lorem / ipsum</L>
        <h2 className="section-title" style={{ color: "#e0e0e0" }}>
          Lorem ipsum<br />
          <span style={{ color: "#555" }}>dolor sit.</span>
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
        <h3 className="sub-title" style={{ color: "#555" }}>@lorem<br />ipsum</h3>
        <L>→</L>
      </C>
    </Sec>
  );
}

/* ═══════════════════════════════════════════════════
   SUBPAGES
═══════════════════════════════════════════════════ */
function SubPage({ index, heading, items = [] }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1600, margin: "0 auto", borderLeft: B, borderRight: B }}>
        <Topbar />

        {/* Header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: B, borderLeft: B,
          height: `calc(50vh - ${TH}px)`,
        }}>
          <div style={{ borderRight: B, borderBottom: B, display: "flex", alignItems: "center", padding: "0 24px" }}>
            <L>{index}</L>
          </div>
          <div style={{ gridColumn: "span 3", borderRight: B, borderBottom: B, display: "flex", alignItems: "flex-end", padding: "40px 36px" }}>
            <h1 className="section-title" style={{ color: "#e0e0e0" }}>{heading}</h1>
          </div>
        </div>

        {/* Content grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderLeft: B,
          minHeight: `calc(50vh - 56px)`,
        }}>
          {items.map((item, i) => (
            <div key={i} style={{
              gridColumn: item.span ? `span ${item.span}` : "span 1",
              borderRight: B, borderBottom: B,
              background: item.dark ? "#0f0f0f" : undefined,
              padding: 36,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              minHeight: 280,
            }}>
              <L>{String(i + 1).padStart(2, "0")}</L>
              <h3 className="sub-title" style={{ color: "#d0d0d0" }}>{item.title}.</h3>
              <L style={{ color: "#444" }}>→ Lorem ipsum</L>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   APP — Router
═══════════════════════════════════════════════════ */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/sobre-nosotros" element={
        <SubPage index="001" heading="Sobre Nosotros" items={[
          { title: "Lorem ipsum dolor" },
          { title: "Sit amet consectetur", dark: true },
          { title: "Adipiscing elit sed" },
          { title: "Do eiusmod tempor", dark: true },
        ]} />
      } />
      <Route path="/certificacion" element={
        <SubPage index="002" heading="Certificación" items={[
          { title: "Bronce" },
          { title: "Plata", dark: true },
          { title: "Oro" },
          { title: "Lorem ipsum", dark: true },
        ]} />
      } />
      <Route path="/tienda" element={
        <SubPage index="003" heading="Tienda" items={[
          { title: "Joyería" },
          { title: "Camisas", dark: true },
          { title: "Gorros" },
          { title: "Pegatinas", dark: true },
        ]} />
      } />
      <Route path="/articulos" element={
        <SubPage index="004" heading="Artículos" items={[
          { title: "Cookies" },
          { title: "Dark patterns", dark: true },
          { title: "Herramientas" },
          { title: "Guías", dark: true },
        ]} />
      } />
      <Route path="/contacto" element={
        <SubPage index="005" heading="Contacto" items={[
          { title: "Empresas", span: 2 },
          { title: "Prensa", span: 2, dark: true },
        ]} />
      } />
    </Routes>
  );
}
