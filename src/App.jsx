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
    <section id={id} style={{
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

/* ── Certificación: layout editorial completo ────── */
function CertificacionPage() {

  /* Niveles basados en los principios derivados de la investigación:
     modelo B2B2C (Fair Trade/B Corp), auditoría periódica, niveles
     escalonados con degradación visible, lenguaje B2C (Akerlof 1970,
     Fogg 2002, sección 4.1.8 de la investigación) */
  const levels = [
    {
      name: "Bronce",
      label: "Comprometida",
      bg: undefined,
      items: [
        "Sin dark patterns en avisos de cookies",
        "Política de privacidad con resumen ejecutivo legible",
        "Datos mínimos recogidos por defecto",
        "Auditoría inicial verificada por Prometeo",
      ],
      note: "Renovación anual",
    },
    {
      name: "Plata",
      label: "Avanzada",
      bg: "#0f0f0f",
      items: [
        "Todo lo de Bronce",
        "Privacy by default en todas las configuraciones",
        "Comunicación proactiva sobre uso de datos",
        "Sin terceros sin consentimiento explícito",
        "Auditoría anual con informe accesible",
      ],
      note: "Renovación anual",
    },
    {
      name: "Oro",
      label: "Referente",
      bg: "#141414",
      items: [
        "Todo lo de Plata",
        "Privacy by design en el producto",
        "Transparencia total sobre terceros y sub-encargados",
        "Herramientas de control activo para el usuario",
        "Informe público semestral de prácticas",
        "Auditoría semestral independiente",
      ],
      note: "Renovación semestral",
    },
  ];

  const proceso = [
    { n: "01", title: "Solicitar", desc: "La empresa envía su candidatura y documentación inicial sobre sus prácticas de privacidad." },
    { n: "02", title: "Auditar",   desc: "El equipo Prometeo evalúa interfaces, políticas y arquitectura de datos frente a los criterios del nivel solicitado." },
    { n: "03", title: "Certificar",desc: "Se emite el sello con su nivel correspondiente. La empresa puede usarlo en producto, web y comunicación." },
    { n: "04", title: "Renovar",   desc: "La certificación no es permanente. La renovación periódica garantiza que el sello refleja cumplimiento real, no solo inicial." },
  ];

  return (
    <Page>
      <PageHeader index="002" title="Certificación" />

      {/* ── Qué es ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        <div style={{ borderRight: B, borderBottom: B, padding: "36px 28px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <L style={{ color: "#444" }}>¿Qué es?</L>
        </div>
        <div style={{ gridColumn: "span 2", borderRight: B, borderBottom: B, background: "#0f0f0f", padding: "40px 36px" }}>
          <h2 className="sub-title" style={{ color: "#d0d0d0", lineHeight: 1.4, marginBottom: 28 }}>
            Un sello de confianza diseñado para ser legible por cualquier persona, sin conocimiento técnico previo.
          </h2>
          <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 13, color: "#666", lineHeight: 1.8, maxWidth: "52ch" }}>
            La mayoría de los sellos de privacidad existentes están orientados a reguladores y auditores. Prometeo opera desde el otro lado: verifica el compromiso real de una empresa y lo traduce en una señal comprensible para el usuario final joven.
          </p>
        </div>
        <div style={{ borderRight: B, borderBottom: B, background: "#0a0a0a", padding: "40px 28px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <L style={{ color: "#333" }}>Modelo B2B2C</L>
          <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 11, color: "#444", lineHeight: 1.7, marginTop: 12 }}>
            Como Fair Trade o B Corp: las empresas obtienen la certificación, los usuarios la reconocen.
          </p>
        </div>
      </div>

      {/* ── El problema que resuelve ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        <div style={{ gridColumn: "span 2", borderRight: B, borderBottom: B, padding: "40px 36px" }}>
          <L style={{ color: "#333", display: "block", marginBottom: 20 }}>El problema</L>
          <h3 className="sub-title" style={{ color: "#888", fontSize: "clamp(1rem,1.8vw,1.6rem)", lineHeight: 1.4 }}>
            El 67% de los usuarios no entiende qué hacen las empresas con sus datos. No por falta de interés, sino por falta de herramientas comprensibles.
          </h3>
        </div>
        <div style={{ gridColumn: "span 2", borderRight: B, borderBottom: B, background: "#111", padding: "40px 36px" }}>
          <L style={{ color: "#444", display: "block", marginBottom: 20 }}>La asimetría de información</L>
          <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 13, color: "#666", lineHeight: 1.8 }}>
            Las plataformas digitales saben todo sobre sus usuarios; los usuarios saben poco sobre las plataformas. Esta brecha no es accidental: se construye mediante decisiones de diseño deliberadas que oscurecen en lugar de clarificar.
          </p>
          <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 11, color: "#444", lineHeight: 1.7, marginTop: 16 }}>
            Fuente: Pew Research Center (2023), Akerlof (1970), sección 4.1.2 investigación Prometeo.
          </p>
        </div>
      </div>

      {/* ── A quién beneficia ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        <div style={{ borderRight: B, borderBottom: B, padding: "28px 24px", display: "flex", alignItems: "center" }}>
          <L>¿A quién beneficia?</L>
        </div>
        <div style={{ gridColumn: "span 3", borderRight: B, borderBottom: B, background: "#0a0a0a", padding: "24px 28px", display: "flex", alignItems: "center" }}>
          <L style={{ color: "#252525" }}>Dos actores. Un sistema.</L>
        </div>

        {/* Para empresas */}
        <div style={{ gridColumn: "span 2", borderRight: B, borderBottom: B, padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 280 }}>
          <div>
            <L style={{ color: "#444", display: "block", marginBottom: 16 }}>Para empresas — B2B</L>
            <h3 className="sub-title" style={{ color: "#d0d0d0", marginBottom: 24 }}>
              Traduce el cumplimiento normativo en compromiso visible.
            </h3>
            <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 13, color: "#666", lineHeight: 1.8 }}>
              Marcas digitales dirigidas a público joven que ya cumplen con el GDPR o la LOPD pero carecen de una herramienta visual que comunique ese esfuerzo al usuario final. El sello Prometeo es esa herramienta.
            </p>
          </div>
          <L style={{ color: "#555" }}>→ Aplicar como empresa</L>
        </div>

        {/* Para usuarios */}
        <div style={{ gridColumn: "span 2", borderRight: B, borderBottom: B, background: "#0f0f0f", padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 280 }}>
          <div>
            <L style={{ color: "#444", display: "block", marginBottom: 16 }}>Para usuarios — B2C</L>
            <h3 className="sub-title" style={{ color: "#d0d0d0", marginBottom: 24 }}>
              Una señal que no requiere leer 40 páginas de política de privacidad.
            </h3>
            <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 13, color: "#666", lineHeight: 1.8 }}>
              Jóvenes de 18–25 que identifican prácticas como el seguimiento publicitario pero no disponen de herramientas simples para evaluar la privacidad de los servicios que usan. El sello opera como heurística de confianza.
            </p>
          </div>
          <L style={{ color: "#555" }}>→ Ver qué significa el sello</L>
        </div>
      </div>

      {/* ── Los niveles ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        <div style={{ borderRight: B, borderBottom: B, padding: "28px 24px", display: "flex", alignItems: "center" }}>
          <L>Niveles</L>
        </div>
        <div style={{ gridColumn: "span 3", borderRight: B, borderBottom: B, background: "#0a0a0a", padding: "24px 28px", display: "flex", alignItems: "center" }}>
          <L style={{ color: "#252525" }}>Sistema escalonado con renovación periódica. La certificación no es permanente.</L>
        </div>

        {levels.map((l, i) => (
          <div key={i} style={{ borderRight: B, borderBottom: B, background: l.bg, padding: "40px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 380 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <L style={{ color: "#333" }}>{String(i + 1).padStart(2, "0")}</L>
                <L style={{ color: "#444", fontSize: 10 }}>{l.note}</L>
              </div>
              <h2 className="sub-title" style={{ color: "#e0e0e0", marginBottom: 6 }}>{l.name}.</h2>
              <L style={{ color: "#555", display: "block", marginBottom: 28 }}>{l.label}</L>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {l.items.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ width: 3, height: 3, background: "#444", flexShrink: 0, marginTop: 4 }} />
                    <span style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 11, color: "#555", lineHeight: 1.6, letterSpacing: "0.04em" }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <L style={{ color: "#444", marginTop: 32 }}>→ Aplicar</L>
          </div>
        ))}
        <div style={{ borderRight: B, borderBottom: B, background: "#0a0a0a", padding: "40px 28px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <L style={{ color: "#222" }}>Socios →</L>
        </div>
      </div>

      {/* ── El proceso ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        {proceso.map((p, i) => (
          <div key={i} style={{ borderRight: B, borderBottom: B, background: i === 3 ? "#0f0f0f" : undefined, padding: "40px 32px", minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <L style={{ color: "#333" }}>{p.n}</L>
            <div>
              <h3 className="sub-title" style={{ color: "#d0d0d0", marginBottom: 16 }}>{p.title}.</h3>
              <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 12, color: "#555", lineHeight: 1.7 }}>
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Nota de integridad ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        <div style={{ gridColumn: "span 3", borderRight: B, borderBottom: B, background: "#0f0f0f", padding: "32px 36px" }}>
          <L style={{ color: "#444", display: "block", marginBottom: 12 }}>Sobre la integridad del sistema</L>
          <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 12, color: "#555", lineHeight: 1.8 }}>
            El riesgo moral post-certificación existe: una empresa puede reducir su nivel de cumplimiento después de obtener el sello si no hay mecanismos de control continuo. Por eso la renovación es obligatoria y la pérdida del sello es pública. La credibilidad del sistema depende de que el sello refleje cumplimiento real, no únicamente cumplimiento inicial.
          </p>
        </div>
        <div style={{ borderRight: B, borderBottom: B, background: "#0a0a0a", padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <L style={{ color: "#252525" }}>Sección 4.1.8 investigación</L>
        </div>
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
