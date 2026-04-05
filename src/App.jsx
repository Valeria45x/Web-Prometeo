import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

const B  = "1px solid #1e1e1e";
const TH = 52;

const NAV = [
  { label: "Sobre Nosotros", to: "/"             },
  { label: "Certificación",  to: "/certificacion" },
  { label: "Tienda",         to: "/tienda"        },
  { label: "Artículos",      to: "/articulos"     },
  { label: "Contacto",       to: "/contacto"      },
];

/* ─── Primitives ──────────────────────────────────── */
function Sec({ children, id, rows }) {
  return (
    <section id={id} className="snap-section" style={{
      height: `calc(100vh - ${TH}px)`,
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: rows || `${TH}px 1fr`,
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
  const active = (to) => pathname === to ? "#e0e0e0" : undefined;

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "#0a0a0a",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      borderTop: B, borderLeft: B,
      height: TH,
    }}>
      <div style={{ borderRight: B, borderBottom: B, display: "flex", alignItems: "center", padding: "0 24px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="small-label" style={{ color: "#bbb", letterSpacing: "0.22em" }}>
            Proyecto Prometeo
          </span>
        </Link>
      </div>
      <div style={{ borderRight: B, borderBottom: B, display: "flex", alignItems: "center", padding: "0 24px" }}>
        <Link to="/" className="nav-link" style={{ color: active("/") }}>Sobre Nosotros</Link>
      </div>
      <div style={{ borderRight: B, borderBottom: B, display: "flex", alignItems: "center", gap: 28, padding: "0 24px" }}>
        {NAV.slice(1, 4).map(n => (
          <Link key={n.to} to={n.to} className="nav-link" style={{ color: active(n.to) }}>
            {n.label}
          </Link>
        ))}
      </div>
      <div style={{ borderRight: B, borderBottom: B, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 24px" }}>
        <Link to="/contacto" className="nav-link" style={{ color: active("/contacto") }}>Contacto</Link>
      </div>
    </header>
  );
}

/* ─── Footer ──────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
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
   LANDING — 8 scroll-snap sections
═══════════════════════════════════════════════════ */
function Landing() {
  useEffect(() => {
    document.documentElement.classList.add("snap");
    return () => document.documentElement.classList.remove("snap");
  }, []);

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

/* ═══════════════════════════════════════════════════
   SUBPAGES — cada una con layout propio
═══════════════════════════════════════════════════ */

/* Wrapper compartido */
function Page({ children }) {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1600, margin: "0 auto", borderLeft: B, borderRight: B }}>
        <Topbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}

/* Header de página */
function PageHeader({ index, title }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B, height: "36vh" }}>
      <div style={{ borderRight: B, borderBottom: B, display: "flex", alignItems: "flex-end", padding: "28px 24px" }}>
        <L>{index}</L>
      </div>
      <div style={{ gridColumn: "span 3", borderRight: B, borderBottom: B, display: "flex", alignItems: "flex-end", padding: "44px 36px" }}>
        <h1 className="section-title" style={{ color: "#e0e0e0" }}>{title}</h1>
      </div>
    </div>
  );
}

/* ── Certificación: tabla de niveles ──────────────── */
function CertificacionPage() {
  const levels = [
    { name: "Bronce", items: ["Lorem ipsum", "Dolor sit", "Amet consectetur"],                       bg: undefined  },
    { name: "Plata",  items: ["Lorem ipsum", "Dolor sit", "Amet consectetur", "Adipiscing elit"],    bg: "#0f0f0f"  },
    { name: "Oro",    items: ["Lorem ipsum", "Dolor sit", "Amet consectetur", "Adipiscing elit", "Sed do eiusmod"], bg: "#141414" },
  ];
  return (
    <Page>
      <PageHeader index="002" title="Certificación" />

      {/* Comparativa de niveles — 3 cols + col vacía */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B, minHeight: "44vh" }}>
        {levels.map((l, i) => (
          <div key={i} style={{ borderRight: B, borderBottom: B, background: l.bg, padding: "36px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <L style={{ color: "#333", display: "block", marginBottom: 16 }}>{String(i + 1).padStart(2, "0")}</L>
              <h2 className="sub-title" style={{ marginBottom: 32 }}>{l.name}.</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {l.items.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ width: 3, height: 3, background: "#333", flexShrink: 0 }} />
                    <L style={{ color: "#555" }}>{f}</L>
                  </div>
                ))}
              </div>
            </div>
            <L style={{ color: "#444", marginTop: 24 }}>→ Aplicar</L>
          </div>
        ))}
        <div style={{ borderRight: B, borderBottom: B, background: "#0a0a0a", padding: "36px 32px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <L style={{ color: "#222" }}>Socios →</L>
        </div>
      </div>

      {/* Proceso: 3 pasos */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        <div style={{ borderRight: B, borderBottom: B, padding: "28px 24px", display: "flex", alignItems: "center" }}>
          <L style={{ color: "#333" }}>Proceso</L>
        </div>
        {["Solicitar", "Evaluar", "Certificar"].map((s, i) => (
          <div key={i} style={{ borderRight: B, borderBottom: B, background: i === 2 ? "#0f0f0f" : undefined, padding: "36px 32px", minHeight: 160, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <L style={{ color: "#333" }}>{String(i + 1).padStart(2, "0")}</L>
            <h3 className="sub-title" style={{ color: "#888" }}>{s}.</h3>
          </div>
        ))}
      </div>
    </Page>
  );
}

/* ── Tienda: catálogo con producto destacado ──────── */
function TiendaPage() {
  const products = ["Joyería", "Camisas", "Gorros", "Pegatinas"];
  return (
    <Page>
      <PageHeader index="003" title="Tienda" />

      {/* Producto destacado */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B, minHeight: "46vh" }}>
        <div style={{ gridColumn: "span 2", borderRight: B, borderBottom: B, background: "#111", padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <L style={{ color: "#444" }}>Destacado</L>
          <h2 className="section-title" style={{ color: "#e0e0e0" }}>Lorem ipsum<br />dolor sit.</h2>
          <L style={{ color: "#555" }}>→ Ver producto</L>
        </div>
        <div style={{ borderRight: B, borderBottom: B, background: "#0f0f0f", padding: "36px 28px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 12 }}>
          <L style={{ color: "#333" }}>Lorem ipsum</L>
          <h3 className="sub-title" style={{ color: "#777" }}>Lorem ipsum<br />dolor.</h3>
        </div>
        <div style={{ borderRight: B, borderBottom: B, background: "#141414", padding: "36px 28px", display: "flex", alignItems: "flex-end" }}>
          <h3 className="sub-title" style={{ color: "#555" }}>Lorem. →</h3>
        </div>
      </div>

      {/* Cuadrícula de productos */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        {products.map((p, i) => (
          <div key={i} style={{ borderRight: B, borderBottom: B, background: i % 2 === 1 ? "#0f0f0f" : undefined, padding: "36px 32px", minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
            <L>{String(i + 1).padStart(2, "0")}</L>
            <h3 className="sub-title" style={{ color: "#d0d0d0" }}>{p}.</h3>
            <L style={{ color: "#444" }}>→ Lorem ipsum</L>
          </div>
        ))}
      </div>
    </Page>
  );
}

/* ── Artículos: layout editorial tipo revista ─────── */
function ArticulosPage() {
  const arts = [
    { title: "Lorem ipsum\ndolor.",  tag: "Cookies"       },
    { title: "Dolor sit\namet.",     tag: "Dark patterns" },
    { title: "Amet lorem\nipsum.",   tag: "Herramientas"  },
    { title: "Ipsum dolor\nsit.",    tag: "Guías"         },
    { title: "Consectetur\namet.",   tag: "Cookies"       },
  ];
  const T = (s) => s.split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>);

  return (
    <Page>
      <PageHeader index="004" title="Artículos" />

      {/* Artículo destacado (2×2) + 2 artículos laterales */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "1fr 1fr", borderLeft: B, minHeight: "52vh" }}>
        <div style={{ gridColumn: "span 2", gridRow: "span 2", borderRight: B, borderBottom: B, background: "#0f0f0f", padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <L style={{ color: "#333" }}>01</L>
            <L style={{ color: "#333" }}>{arts[0].tag}</L>
          </div>
          <h2 className="section-title" style={{ color: "#d0d0d0" }}>{T(arts[0].title)}</h2>
          <L style={{ color: "#555" }}>→ Leer</L>
        </div>

        {arts.slice(1, 3).map((a, i) => (
          <div key={i} style={{ borderRight: B, borderBottom: B, background: i === 1 ? "#111" : undefined, padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <L style={{ color: "#333" }}>{String(i + 2).padStart(2, "0")}</L>
              <L style={{ color: "#333" }}>{a.tag}</L>
            </div>
            <h3 className="sub-title" style={{ color: "#888" }}>{T(a.title)}</h3>
            <L style={{ color: "#444" }}>→</L>
          </div>
        ))}
      </div>

      {/* Más artículos */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        {arts.slice(3).map((a, i) => (
          <div key={i} style={{ borderRight: B, borderBottom: B, background: i === 1 ? "#0f0f0f" : undefined, padding: "32px 28px", minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <L style={{ color: "#333" }}>{String(i + 4).padStart(2, "0")}</L>
              <L style={{ color: "#333" }}>{a.tag}</L>
            </div>
            <h3 className="sub-title" style={{ color: "#888" }}>{T(a.title)}</h3>
            <L style={{ color: "#444" }}>→</L>
          </div>
        ))}
        <div style={{ gridColumn: "span 2", borderRight: B, borderBottom: B, background: "#0a0a0a" }} />
      </div>
    </Page>
  );
}

/* ── Contacto: declaración + formulario + RRSS ────── */
function ContactoPage() {
  return (
    <Page>
      <PageHeader index="005" title="Contacto" />

      {/* Declaración izquierda + formulario derecha */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B, minHeight: "50vh" }}>
        <div style={{ gridColumn: "span 2", borderRight: B, borderBottom: B, background: "#0f0f0f", padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <L style={{ color: "#444" }}>Lorem ipsum</L>
          <h2 className="sub-title" style={{ color: "#c0c0c0", lineHeight: 1.4 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.
          </h2>
          <div style={{ display: "flex", gap: 28 }}>
            <L style={{ color: "#555" }}>Instagram →</L>
            <L style={{ color: "#555" }}>TikTok →</L>
          </div>
        </div>

        <div style={{ gridColumn: "span 2", borderRight: B, borderBottom: B, padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <L>Formulario</L>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>
            {[["Email", "lorem@ipsum.com"], ["Asunto", "Lorem ipsum"], ["Mensaje", "Lorem ipsum dolor sit..."]].map(([label, ph], i) => (
              <div key={i} style={{ borderTop: "1px solid #1e1e1e", padding: "18px 0" }}>
                <L style={{ color: "#252525", display: "block", marginBottom: 6 }}>{label}</L>
                <L style={{ color: "#333" }}>{ph}</L>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <L style={{ color: "#444" }}>→ Enviar</L>
          </div>
        </div>
      </div>

      {/* Canales sociales */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        {["Instagram", "TikTok", "Lorem", "Ipsum"].map((s, i) => (
          <div key={i} style={{ borderRight: B, borderBottom: B, background: i % 2 === 0 ? undefined : "#0a0a0a", padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <L style={{ color: "#444" }}>{s}</L>
            <L style={{ color: "#333" }}>→</L>
          </div>
        ))}
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════
   APP — Router
═══════════════════════════════════════════════════ */
export default function App() {
  return (
    <Routes>
      <Route path="/"              element={<Landing />} />
      <Route path="/certificacion" element={<CertificacionPage />} />
      <Route path="/tienda"        element={<TiendaPage />} />
      <Route path="/articulos"     element={<ArticulosPage />} />
      <Route path="/contacto"      element={<ContactoPage />} />
    </Routes>
  );
}
