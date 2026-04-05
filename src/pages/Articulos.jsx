import { B } from "../constants";
import { L } from "../components/Primitives";
import { Page, PageHeader } from "../components/Page";

const arts = [
  { title: "Lorem ipsum\ndolor.",  tag: "Cookies"       },
  { title: "Dolor sit\namet.",     tag: "Dark patterns" },
  { title: "Amet lorem\nipsum.",   tag: "Herramientas"  },
  { title: "Lorem ipsum\nsit.",    tag: "Guías"         },
  { title: "Consectetur\namet.",   tag: "Cookies"       },
];

function T(s) {
  return s.split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>);
}

export default function Articulos() {
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
