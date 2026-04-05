
const B  = "1px solid #1e1e1e";
const TH = 52;

/* ── Primitives ───────────────────────────────────── */

function Sec({ children, id, rows = `${TH}px 1fr` }) {
  return (
    <section
      id={id}
      style={{
        height: `calc(100vh - ${TH}px)`,
        scrollSnapAlign: "start",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: rows,
        borderTop: B,
        borderLeft: B,
        overflow: "hidden",
      }}
    >
      {children}
    </section>
  );
}

function C({ children, span = 1, rowSpan = 1, bg, style = {} }) {
  return (
    <div style={{
      gridColumn: `span ${span}`,
      gridRow:    rowSpan > 1 ? `span ${rowSpan}` : undefined,
      background: bg,
      borderRight: B,
      borderBottom: B,
      padding: 24,
      minHeight: 0,
      overflow: "hidden",
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

/* ── App ──────────────────────────────────────────── */
export default function App() {
  return (
    <div style={{
      height: "100vh",
      overflowY: "scroll",
      scrollSnapType: "y proximity",   /* proximity → más natural, no fuerza */
      scrollBehavior: "smooth",
      scrollPaddingTop: `${TH}px`,
    }}>
      <div style={{ maxWidth: 1600, margin: "0 auto", borderLeft: B, borderRight: B }}>
        <Topbar />
        <S1_Intro />
        <S2_Problema />
        <S3_Ecosistema />
        <S4_Explora />
        <Footer />
      </div>
    </div>
  );
}

/* ── Topbar ───────────────────────────────────────── */
function Topbar() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "#0a0a0a",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      borderTop: B, borderLeft: B,
      height: TH,
    }}>
      {/* Wordmark */}
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}>
        <span className="small-label" style={{ color: "#bbb", letterSpacing: "0.22em" }}>
          Proyecto Prometeo
        </span>
      </C>

      {/* Empty */}
      <C span={1} style={{ padding: 0 }} />

      {/* Nav — apuntan a páginas separadas, no anclas */}
      <C span={1} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 24, padding: "0 24px" }}>
        {["Certificación", "USB", "Artículos"].map(l => (
          <a key={l} className="nav-link" href="#">{l}</a>
        ))}
      </C>

      <C span={1} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 24px", gap: 24 }}>
        <a className="nav-link" href="#">Contacto</a>
        <L>≡</L>
      </C>
    </header>
  );
}

/* ─────────────────────────────────────────────────
   S1 — INTRO
   La marca. Quién es Prometeo.
   rows: strip | título grande | tagline
─────────────────────────────────────────────────── */
function S1_Intro() {
  return (
    <Sec rows={`${TH}px 1fr 100px`}>

      {/* strip */}
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>001</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Lorem ipsum / 2026</L></C>

      {/* título — span 3 dominante */}
      <C span={3} style={{ display: "flex", alignItems: "flex-end", padding: "40px 36px" }}>
        <h1 className="mega-title">
          Lorem ipsum<br />
          dolor sit<br />
          amet.
        </h1>
      </C>

      {/* columna derecha — vacía arriba, texto abajo */}
      <C span={1} bg="#0f0f0f" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "32px 24px" }}>
        <h2 className="sub-title" style={{ color: "#555" }}>
          Lorem ipsum<br />dolor sit.
        </h2>
      </C>

      {/* bottom bar */}
      <C span={2} style={{ display: "flex", alignItems: "center" }}>
        <L>→ Lorem ipsum dolor sit amet</L>
      </C>
      <C span={1} style={{ display: "flex", alignItems: "center" }}>
        <L>proyectoprometeo.info</L>
      </C>
      <C span={1} bg="#0a0a0a" style={{ padding: 0 }} />
    </Sec>
  );
}

/* ─────────────────────────────────────────────────
   S2 — EL PROBLEMA
   Por qué existe Prometeo. Dato clave.
   rows: strip | stat | sub-row
─────────────────────────────────────────────────── */
function S2_Problema() {
  return (
    <Sec id="problema" rows={`${TH}px 1fr 88px`}>

      {/* strip */}
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>002</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Lorem ipsum</L></C>

      {/* título izquierda */}
      <C span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <h2 className="section-title">
          Lorem<br />ipsum<br />dolor.
        </h2>
      </C>

      {/* stat — anchor 2 columnas */}
      <C span={2} bg="#111" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
        <L style={{ color: "#444" }}>Lorem ipsum</L>
        <p style={{
          fontFamily: '"Funnel Display",serif',
          fontSize: "clamp(5rem,13vw,11rem)",
          lineHeight: 0.82, fontWeight: 800, color: "#ececec",
        }}>67%</p>
        <h3 className="sub-title" style={{ color: "#555" }}>
          Lorem ipsum dolor sit amet.
        </h3>
      </C>

      {/* vacía */}
      <C span={1} bg="#0a0a0a" style={{ padding: 0 }} />

      {/* sub-row */}
      <C span={2} style={{ display: "flex", alignItems: "center" }}>
        <h3 className="sub-title" style={{ color: "#555", fontSize: "clamp(0.9rem,1.6vw,1.4rem)" }}>
          Lorem ipsum dolor sit amet consectetur.
        </h3>
      </C>
      <C span={2} bg="#0a0a0a" style={{ padding: 0 }} />
    </Sec>
  );
}

/* ─────────────────────────────────────────────────
   S3 — ECOSISTEMA
   Los 4 pilares de la marca — teaser de páginas.
   rows: strip | intro row | 4 pillars
─────────────────────────────────────────────────── */
function S3_Ecosistema() {
  const pillars = [
    { n: "01", title: "Lorem\nipsum." },
    { n: "02", title: "Dolor\nsit."   },
    { n: "03", title: "Amet\nconsec." },
    { n: "04", title: "Lorem\ndolor." },
  ];

  return (
    <Sec id="ecosistema" rows={`${TH}px 1fr 1fr`}>

      {/* strip */}
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>003</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Lorem ipsum</L></C>

      {/* intro row — 2+1+1 */}
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
      <C span={1} bg="#0a0a0a" style={{ padding: 0 }} />

      {/* 4 pillars — 1+1+1+1 */}
      {pillars.map((p, i) => (
        <C key={i} span={1} bg={i % 2 === 1 ? "#0f0f0f" : undefined}
          style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
          <L>{p.n}</L>
          <h3 className="sub-title">
            {p.title.split("\n").map((line, j) => (
              <span key={j}>{line}{j === 0 && <br />}</span>
            ))}
          </h3>
          <L>→ Lorem ipsum</L>
        </C>
      ))}
    </Sec>
  );
}

/* ─────────────────────────────────────────────────
   S4 — EXPLORA
   CTA hacia las páginas del ecosistema.
   rows: 1fr (sin strip — sección de cierre)
─────────────────────────────────────────────────── */
function S4_Explora() {
  const pages = [
    { n: "→", label: "Lorem ipsum" },
    { n: "→", label: "Dolor sit"   },
    { n: "→", label: "Amet lorem"  },
    { n: "→", label: "Consectetur" },
  ];

  return (
    <Sec id="explora" rows="1fr">

      {/* CTA title — span 2 */}
      <C span={2} bg="#0f0f0f" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <L style={{ color: "#444" }}>004</L>
        <h2 className="section-title" style={{ color: "#e0e0e0" }}>
          Lorem ipsum<br />dolor sit<br />
          <span style={{ color: "#555" }}>amet.</span>
        </h2>
        <L style={{ color: "#555" }}>proyectoprometeo.info</L>
      </C>

      {/* Links a páginas — span 1 cada una */}
      {pages.slice(0, 2).map((p, i) => (
        <C key={i} span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
          <L>{String(i + 1).padStart(2, "0")}</L>
          <h3 className="sub-title">{p.label}.</h3>
          <L>Lorem ipsum →</L>
        </C>
      ))}

      {/* segunda fila — span 2 + 2 */}
      <C span={2} bg="#111" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
        <L style={{ color: "#444" }}>03</L>
        <h3 className="sub-title" style={{ color: "#d0d0d0" }}>{pages[2].label}.</h3>
        <L style={{ color: "#555" }}>Lorem ipsum →</L>
      </C>
      <C span={2} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
        <L>04</L>
        <h3 className="sub-title">{pages[3].label}.</h3>
        <L>Lorem ipsum →</L>
      </C>
    </Sec>
  );
}

/* ── Footer ───────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      borderTop: B, borderLeft: B,
    }}>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "18px 24px" }}>
        <L style={{ color: "#252525" }}>
          Proyecto Prometeo — Valeria Cabrera · UDIT 2025/26 · proyectoprometeo.info
        </L>
      </C>
      <C span={1} bg="#0a0a0a" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "18px 24px" }}>
        <L style={{ color: "#252525" }}>v5</L>
      </C>
    </footer>
  );
}
