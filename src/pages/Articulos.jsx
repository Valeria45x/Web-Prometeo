import { B } from "../constants";
import { L } from "../components/Primitives";
import { Page, PageHeader } from "../components/Page";
import GridMeta from "../components/GridMeta";
import RedCell from "../components/RedCell";
import StripeDecor from "../components/StripeDecor";

const PRINCIPAL = [
  {
    id: "01",
    tag: "Cookies",
    title: "Cómo aceptar cookies\nafecta los precios\nque ves online.",
    excerpt:
      "Cada vez que cierras ese banner sin leerlo estás tomando una decisión. Y esa decisión tiene consecuencias más concretas de lo que imaginas.",
    read: "3 min",
  },
  {
    id: "02",
    tag: "Algoritmos",
    title: "Por qué el algoritmo\nsabe lo que quieres\nantes de buscarlo.",
    excerpt:
      "No es magia. Y tampoco es que tu teléfono te escuche. Es algo más valioso: tu comportamiento.",
    read: "3 min",
  },
  {
    id: "03",
    tag: "Redes públicas",
    title: "Lo que nadie te dice\nsobre el wifi gratis\nde las cafeterías.",
    excerpt:
      "El wifi gratis parece un servicio sin coste. Lo que pasa entre medias es lo que nadie explica en el cartel de la contraseña.",
    read: "2 min",
  },
];

const SECUNDARIOS = [
  {
    id: "04",
    tag: "Dark Patterns",
    title: "Qué son los dark patterns\ny cómo afectan tus decisiones.",
    read: "2 min",
  },
  {
    id: "05",
    tag: "Cookies",
    title: "Tipos de cookies:\ncuáles son necesarias y cuáles no.",
    read: "2 min",
  },
  {
    id: "06",
    tag: "Precios",
    title: "Qué es la fijación\ndinámica de precios.",
    read: "2 min",
  },
  {
    id: "07",
    tag: "Redes",
    title: "Qué pasa con tus datos\nen una red pública.",
    read: "2 min",
  },
];

function T(s) {
  return s.split("\n").map((l, i, arr) => (
    <span key={i}>{l}{i < arr.length - 1 && <br />}</span>
  ));
}

export default function Articulos() {
  return (
    <Page>
      <PageHeader index="004" title="Artículos" />

      {/* GridMeta fila */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        <div style={{ gridColumn: "span 4" }}>
          <GridMeta code="PRO-004" />
        </div>
      </div>

      {/* Artículo destacado (2×2) + 2 artículos laterales */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "1fr 1fr",
          borderLeft: B,
          minHeight: "54vh",
        }}
      >
        <div
          style={{
            gridColumn: "span 2",
            gridRow: "span 2",
            borderRight: B,
            borderBottom: B,
            background: "#0f0f0f",
            padding: "44px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <L style={{ color: "#333" }}>{PRINCIPAL[0].id}</L>
            <L style={{ color: "#FF3C54" }}>{PRINCIPAL[0].tag}</L>
          </div>
          <div>
            <h2 className="section-title" style={{ color: "#d0d0d0", marginBottom: 20 }}>
              {T(PRINCIPAL[0].title)}
            </h2>
            <p
              style={{
                fontFamily: '"Funnel Sans", sans-serif',
                fontSize: 13,
                color: "#777",
                lineHeight: 1.7,
                maxWidth: "52ch",
              }}
            >
              {PRINCIPAL[0].excerpt}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <L style={{ color: "#444" }}>{PRINCIPAL[0].read} de lectura</L>
            <L style={{ color: "#555" }}>→ Leer</L>
          </div>
        </div>

        {PRINCIPAL.slice(1).map((a, i) => (
          <div
            key={i}
            style={{
              borderRight: B,
              borderBottom: B,
              background: i === 1 ? "#111" : undefined,
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <L style={{ color: "#333" }}>{a.id}</L>
              <L style={{ color: "#FF3C54" }}>{a.tag}</L>
            </div>
            <h3 className="sub-title" style={{ color: "#888" }}>{T(a.title)}</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <L style={{ color: "#444" }}>{a.read}</L>
              <L style={{ color: "#444" }}>→</L>
            </div>
          </div>
        ))}
      </div>

      {/* Artículos secundarios */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        {SECUNDARIOS.map((a, i) => (
          <div
            key={i}
            style={{
              borderRight: B,
              borderBottom: B,
              background: i % 2 === 1 ? "#0f0f0f" : undefined,
              padding: "32px 28px",
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <L style={{ color: "#333" }}>{a.id}</L>
              <L style={{ color: "#FF3C54" }}>{a.tag}</L>
            </div>
            <h3 className="sub-title" style={{ color: "#888" }}>{T(a.title)}</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <L style={{ color: "#444" }}>{a.read}</L>
              <L style={{ color: "#444" }}>→</L>
            </div>
          </div>
        ))}
      </div>

      {/* CTA comunidad */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        <div
          style={{
            gridColumn: "span 3",
            borderRight: B,
            borderBottom: B,
            padding: "36px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#0a0a0a",
          }}
        >
          <L style={{ color: "#333" }}>¿Tienes una pregunta sobre privacidad digital?</L>
          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 13,
              color: "#555",
              lineHeight: 1.7,
              maxWidth: "56ch",
            }}
          >
            Lleva la conversación a la comunidad. Los miembros de Prometeo
            comparten hallazgos y responden dudas cada día.
          </p>
          <L style={{ color: "#FF3C54" }}>→ Ir a Comunidad</L>
        </div>
        <RedCell text="PRO-004" style={{ borderRight: B, borderBottom: B }} />
      </div>

      <div style={{ borderLeft: B, borderRight: B }}>
        <StripeDecor />
      </div>
    </Page>
  );
}
