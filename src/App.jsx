import { useState } from "react";

const B  = "1px solid #1e1e1e";
const TH = 52; // topbar height px

/* ── Section ────────────────────────────────────────
   Full viewport height, snaps to start.
   rows = CSS grid-template-rows string for inner layout.
──────────────────────────────────────────────────── */
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

/* ── Cell ─────────────────────────────────────────── */
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

/* nav/wayfinding label — 11px */
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
    /* Scroll container — snaps each section to viewport */
    <div style={{
      height: "100vh",
      overflowY: "scroll",
      scrollSnapType: "y mandatory",
      scrollPaddingTop: `${TH}px`,
    }}>
      <div style={{ maxWidth: 1600, margin: "0 auto", borderLeft: B, borderRight: B }}>
        <Topbar />
        <Hero />
        <Sobre />
        <Certificacion />
        <Producto />
        <Educativo />
        <Contacto />
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
      <C span={2} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
        <span className="small-label" style={{ color: "#bbb", letterSpacing: "0.22em" }}>
          Proyecto Prometeo
        </span>
        <nav style={{ display: "flex", gap: 28 }}>
          {["Proyecto", "Certificación", "USB", "Aprende", "Contacto"].map(l => (
            <a key={l} className="nav-link" href="#">{l}</a>
          ))}
        </nav>
      </C>
      <C span={1} style={{ padding: 0 }} />
      <C span={1} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
        <L>≡</L>
      </C>
    </header>
  );
}

/* ── Hero ─────────────────────────────────────────── */
/* rows: strip | main | bottom bar */
function Hero() {
  return (
    <Sec rows={`${TH}px 1fr 88px`}>
      {/* strip */}
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>001</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Privacy systems / 2026</L></C>

      {/* main row */}
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

      {/* bottom bar */}
      <C span={1} style={{ display: "flex", alignItems: "center" }}><L>→ Lorem ipsum</L></C>
      <C span={1} style={{ display: "flex", alignItems: "center" }}><L>→ Dolor sit</L></C>
      <C span={2} bg="#0a0a0a" style={{ padding: 0 }} />
    </Sec>
  );
}

/* ── Sobre ────────────────────────────────────────── */
/* rows: strip | stat anchor | sub-row */
function Sobre() {
  return (
    <Sec id="sobre" rows={`${TH}px 1fr 88px`}>
      {/* strip */}
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>002</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Definition</L></C>

      {/* main row — 1 title + 2 stat + 1 empty */}
      <C span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <h2 className="section-title">
          Lorem<br />ipsum<br />dolor.
        </h2>
      </C>
      <C span={2} bg="#111" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
        <L style={{ color: "#444" }}>Dato</L>
        <p style={{ fontFamily: '"Funnel Display",serif', fontSize: "clamp(5rem,13vw,11rem)", lineHeight: 0.82, fontWeight: 800, color: "#ececec" }}>
          67%
        </p>
        <h3 className="sub-title" style={{ color: "#555" }}>Lorem ipsum dolor sit amet.</h3>
      </C>
      <C span={1} bg="#0a0a0a" style={{ padding: 0 }} />

      {/* sub-row */}
      <C span={2} style={{ display: "flex", alignItems: "center" }}>
        <h3 className="sub-title" style={{ color: "#555", fontSize: "clamp(0.9rem, 1.6vw, 1.4rem)" }}>
          Lorem ipsum dolor sit amet.
        </h3>
      </C>
      <C span={2} bg="#0a0a0a" style={{ padding: 0 }} />
    </Sec>
  );
}

/* ── Certificación ────────────────────────────────── */
/* rows: strip | header | cards */
function Certificacion() {
  const [tab, setTab] = useState("a");
  return (
    <Sec id="certificacion" rows={`${TH}px 1fr 1fr`}>
      {/* strip */}
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>003</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Certification</L></C>

      {/* header row — 2+1+1 */}
      <C span={2} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <L>Lorem / certification</L>
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
      <C span={1} bg="#111" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 10 }}>
        {["Lorem", "Ipsum"].map((k, i) => (
          <button key={k} onClick={() => setTab(i === 0 ? "a" : "b")} style={{
            padding: "14px 16px", border: B, background: "transparent", cursor: "pointer",
            borderColor: tab === (i === 0 ? "a" : "b") ? "#888" : "#1e1e1e",
            color: tab === (i === 0 ? "a" : "b") ? "#d0d0d0" : "#444",
            fontFamily: '"Funnel Sans",sans-serif', fontSize: 11,
            letterSpacing: "0.18em", textTransform: "uppercase", textAlign: "left",
          }}>→ {k}</button>
        ))}
      </C>

      {/* cards row — 3 + 1 empty */}
      {["Lorem.", "Ipsum.", "Dolor."].map((title, i) => (
        <C key={i} span={1} bg={i === 1 ? "#0f0f0f" : undefined} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <L>0{i + 1}</L>
          <h3 className="sub-title">{title}</h3>
          <L>→ Lorem ipsum</L>
        </C>
      ))}
      <C span={1} bg="#0a0a0a" style={{ padding: 0 }} />
    </Sec>
  );
}

/* ── Producto ─────────────────────────────────────── */
/* rows: strip | main */
function Producto() {
  return (
    <Sec id="producto" rows={`${TH}px 1fr`}>
      {/* strip */}
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>004</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Output / objeto</L></C>

      {/* main — 1 info + 2 featured + 1 specs */}
      <C span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <L>Lorem / ipsum</L>
        <h2 className="section-title">
          Lorem<br />ipsum<br />
          <span style={{ color: "#555" }}>dolor.</span>
        </h2>
      </C>
      <C span={2} bg="#111" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <L style={{ color: "#444" }}>Featured / 01</L>
        <h3 className="section-title" style={{ color: "#e0e0e0" }}>Lorem<br />Ipsum</h3>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span style={{ fontFamily: '"Funnel Display",serif', fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 800, color: "#d0d0d0" }}>
            00€
          </span>
        </div>
      </C>
      <C span={1} style={{ padding: 0, display: "flex", flexDirection: "column" }}>
        {["Lorem", "Ipsum", "Dolor", "Sit"].map((spec, i) => (
          <div key={spec} style={{ flex: 1, borderBottom: i < 3 ? B : "none", padding: "0 20px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
            <L>{spec}</L>
            <span style={{ fontFamily: '"Funnel Display",serif', fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", color: "#bbb" }}>
              Lorem {i + 1}
            </span>
          </div>
        ))}
      </C>
    </Sec>
  );
}

/* ── Educativo ────────────────────────────────────── */
/* rows: strip | cards | bottom strip */
function Educativo() {
  return (
    <Sec id="educativo" rows={`${TH}px 1fr 72px`}>
      {/* strip */}
      <C span={1} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>005</L></C>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "0 24px" }}><L>Education</L></C>

      {/* main — sidebar + 3 cards */}
      <C span={1} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <L>Lorem / ipsum</L>
        <h2 className="section-title">
          Lorem<br />ipsum<br />
          <span style={{ color: "#555" }}>dolor.</span>
        </h2>
        <L>→ @lorem.digital</L>
      </C>
      {["Lorem ipsum dolor.", "Sit amet.", "Adipiscing elit."].map((title, i) => (
        <C key={i} span={1} bg={i === 1 ? "#0f0f0f" : undefined} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <L>00{i + 1}</L>
          <h3 className="sub-title">{title}</h3>
          <L>→ Lorem</L>
        </C>
      ))}

      {/* bottom strip */}
      <C span={3} style={{ display: "flex", alignItems: "center" }}>
        <L>Lorem ipsum / dolor sit amet consectetur adipiscing</L>
      </C>
      <C span={1} bg="#0a0a0a" style={{ padding: 0 }} />
    </Sec>
  );
}

/* ── Contacto ─────────────────────────────────────── */
/* rows: 1fr — no strip, section number inside cell */
function Contacto() {
  return (
    <Sec id="contacto" rows="1fr">
      <C span={2} bg="#0f0f0f" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <L style={{ color: "#444" }}>006 / Contacto</L>
        <h2 className="section-title" style={{ color: "#e0e0e0" }}>
          Lorem ipsum<br />
          <span style={{ color: "#555" }}>dolor sit.</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {["Lorem ipsum", "Dolor sit amet"].map(l => (
            <div key={l} style={{ padding: "16px 20px", border: B, display: "flex", justifyContent: "space-between" }}>
              <L>Lorem</L>
              <L style={{ color: "#777" }}>{l} →</L>
            </div>
          ))}
        </div>
      </C>
      <C span={2} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <h3 className="sub-title" style={{ color: "#555" }}>Lorem ipsum dolor.</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[["Lorem", "email"], ["Ipsum", "textarea"]].map(([label, type]) => (
            <div key={label}>
              <L style={{ display: "block", marginBottom: 10 }}>{label}</L>
              {type === "textarea"
                ? <textarea rows={3} style={{ width: "100%", padding: 14, border: B, background: "transparent", color: "#777", fontFamily: '"Funnel Sans",sans-serif', fontSize: 13, resize: "none" }} />
                : <input style={{ width: "100%", padding: 14, border: B, background: "transparent", color: "#777", fontFamily: '"Funnel Sans",sans-serif', fontSize: 13 }} />
              }
            </div>
          ))}
          <button style={{ padding: 16, border: B, background: "transparent", cursor: "pointer", fontFamily: '"Funnel Sans",sans-serif', fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "#888" }}>
            Lorem ipsum →
          </button>
        </div>
      </C>
    </Sec>
  );
}

/* ── Footer ───────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: B, borderLeft: B }}>
      <C span={3} style={{ display: "flex", alignItems: "center", padding: "18px 24px" }}>
        <L style={{ color: "#252525" }}>Proyecto Prometeo — Valeria Cabrera · UDIT 2025/26 · proyectoprometeo.info</L>
      </C>
      <C span={1} bg="#0a0a0a" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "18px 24px" }}>
        <L style={{ color: "#252525" }}>v5</L>
      </C>
    </footer>
  );
}
