import { B } from "../constants";
import { L } from "../components/Primitives";
import { Page, PageHeader } from "../components/Page";
import GridMeta from "../components/GridMeta";
import RedCell from "../components/RedCell";
import StripeDecor from "../components/StripeDecor";

const PRODUCTOS = [
  {
    id: "01",
    nombre: "USB Pendrive",
    desc: "El objeto que genera conversación. Colgante de joyería y dispositivo funcional a la vez. Cada unidad llega con una pregunta adentro.",
    tag: "Joyería / Tech",
  },
  {
    id: "02",
    nombre: "Camiseta",
    desc: "Pieza de edición limitada. Algodón pesado, sigilo de Prometeo bordado, sin logo visible.",
    tag: "Ropa",
  },
  {
    id: "03",
    nombre: "Gorro",
    desc: "Lana merino. Discreta. Solo saben quiénes saben.",
    tag: "Ropa",
  },
  {
    id: "04",
    nombre: "Pegatinas",
    desc: "Pack de 6 piezas. Vinil resistente al agua. Diseños del sistema generativo de sigilos.",
    tag: "Accesorios",
  },
];

export default function Tienda() {
  return (
    <Page>
      <PageHeader index="003" title="Tienda" />

      <GridMeta code="PRO-003" />

      {/* Producto destacado — USB */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderLeft: B,
          minHeight: "46vh",
        }}
      >
        <div
          style={{
            gridColumn: "span 2",
            borderRight: B,
            borderBottom: B,
            background: "#111",
            padding: "44px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <L style={{ color: "#444" }}>Destacado</L>
            <L style={{ color: "#FF3C54" }}>{PRODUCTOS[0].tag}</L>
          </div>
          <div>
            <h2
              className="section-title"
              style={{ color: "#e0e0e0", marginBottom: 16 }}
            >
              {PRODUCTOS[0].nombre}.
            </h2>
            <p
              style={{
                fontFamily: '"Funnel Sans", sans-serif',
                fontSize: 13,
                color: "#777",
                lineHeight: 1.7,
                maxWidth: "48ch",
              }}
            >
              {PRODUCTOS[0].desc}
            </p>
          </div>
          <L style={{ color: "#555" }}>→ Ver producto</L>
        </div>

        {/* Info lateral USB */}
        <div
          style={{
            borderRight: B,
            borderBottom: B,
            background: "#0f0f0f",
            padding: "36px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <L style={{ color: "#333" }}>Cada unidad incluye</L>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Pendrive 64GB cifrado",
              "Pregunta de entrada impresa",
              "Packaging minimalista",
            ].map((item, i) => (
              <div
                key={i}
                style={{ borderTop: "1px solid #1a1a1a", paddingTop: 10 }}
              >
                <L style={{ color: "#555" }}>{item}</L>
              </div>
            ))}
          </div>
          <L style={{ color: "#333" }}>Edición limitada</L>
        </div>

        {/* Sigilo visual */}
        <div
          style={{
            borderRight: B,
            borderBottom: B,
            background: "#141414",
            padding: "36px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <L style={{ color: "#333" }}>El sigilo como objeto</L>
          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 12,
              color: "#555",
              lineHeight: 1.7,
            }}
          >
            Alguien lo ve y pregunta. Ese es el momento de entrada al ritual —
            sin que nadie haya invitado.
          </p>
          <L style={{ color: "#444" }}>→ Qué es el sigilo</L>
        </div>
      </div>

      {/* Cuadrícula resto de productos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderLeft: B,
        }}
      >
        {PRODUCTOS.slice(1).map((p, i) => (
          <div
            key={i}
            style={{
              borderRight: B,
              borderBottom: B,
              background: i % 2 === 1 ? "#0f0f0f" : undefined,
              padding: "36px 32px",
              minHeight: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <L style={{ color: "#333" }}>{p.id}</L>
              <L style={{ color: "#FF3C54" }}>{p.tag}</L>
            </div>
            <div>
              <h3
                className="sub-title"
                style={{ color: "#d0d0d0", marginBottom: 10 }}
              >
                {p.nombre}.
              </h3>
              <p
                style={{
                  fontFamily: '"Funnel Sans", sans-serif',
                  fontSize: 12,
                  color: "#555",
                  lineHeight: 1.6,
                }}
              >
                {p.desc}
              </p>
            </div>
            <L style={{ color: "#444" }}>→ Ver</L>
          </div>
        ))}
        {/* RedCell como cuarta celda */}
        <RedCell text="PRO-003" style={{ borderRight: B, borderBottom: B }} />
      </div>

      {/* Franja inferior — filosofía del merch */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderLeft: B,
        }}
      >
        <div
          style={{
            gridColumn: "span 4",
            borderRight: B,
            borderBottom: B,
            background: "#0a0a0a",
            padding: "36px 40px",
          }}
        >
          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 13,
              color: "#555",
              lineHeight: 1.7,
              maxWidth: "72ch",
            }}
          >
            El merchandising de Prometeo no es swag de marca. Es un objeto que
            genera conversación. El valor está en ser visible e incomprendido
            para quien no pertenece.
          </p>
        </div>
      </div>

      <div style={{ borderLeft: B, borderRight: B }}>
        <StripeDecor />
      </div>
    </Page>
  );
}
