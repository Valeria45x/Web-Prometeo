import { B } from "../constants";
import { L } from "../components/Primitives";
import { Page, PageHeader } from "../components/Page";
import GridMeta from "../components/GridMeta";
import RedCell from "../components/RedCell";
import StripeDecor from "../components/StripeDecor";

const posts = [
  {
    id: "01",
    tag: "Privacidad",
    title: "¿Cómo bloqueas el rastreo en tu navegador?",
    body: "Llevo un mes probando distintas configuraciones y estos son mis resultados. uBlock Origin + Firefox con ajustes estrictos parece ser la combinación más efectiva hasta ahora.",
    replies: 14,
    date: "Apr 2025",
  },
  {
    id: "02",
    tag: "Herramientas",
    title: "Alternativas a Google Maps que no te rastrean",
    body: "Organic Maps y OsmAnd son las que más he probado. La primera para ciudad va muy bien. La segunda tiene curva de aprendizaje pero es muy completa.",
    replies: 9,
    date: "Apr 2025",
  },
  {
    id: "03",
    tag: "Dudas",
    title: "¿Las apps de banco también venden tus datos?",
    body: "He leído los ToS de varios bancos digitales y la cantidad de terceros con los que comparten datos me ha sorprendido. ¿Habéis encontrado alternativas más privadas?",
    replies: 21,
    date: "Mar 2025",
  },
  {
    id: "04",
    tag: "Dark Patterns",
    title: "Recopilación de dark patterns que he encontrado esta semana",
    body: "Confirmshaming en tres webs distintas, un roach motel en una suscripción de newsletter y un checkbox pre-marcado en un formulario de compra. El habitual.",
    replies: 7,
    date: "Mar 2025",
  },
];

const tags = [
  "Todo",
  "Privacidad",
  "Herramientas",
  "Dudas",
  "Dark Patterns",
  "Datos",
];

export default function Comunidad() {
  return (
    <Page>
      <PageHeader index="006" title="Comunidad" />

      {/* Intro + principio */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderLeft: B,
        }}
      >
        <GridMeta code="PRO-006" />
        <div
          style={{
            gridColumn: "span 3",
            borderRight: B,
            borderBottom: B,
            padding: "44px 40px",
          }}
        >
          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 15,
              color: "#c8c8c8",
              lineHeight: 1.8,
              maxWidth: "68ch",
            }}
          >
            El conocimiento no se guarda, se pasa. Este es el espacio donde los
            miembros de Prometeo comparten preguntas, hallazgos y conversaciones
            sobre privacidad digital. Prometeo es el anfitrión, no el
            protagonista.
          </p>
        </div>
        <RedCell text="COMUNIDAD" style={{ borderRight: B, borderBottom: B }} />
      </div>

      {/* Filtros por tag */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderLeft: B,
          borderBottom: B,
        }}
      >
        {tags.slice(0, 4).map((tag, i) => (
          <div
            key={i}
            style={{
              borderRight: B,
              padding: "16px 24px",
              cursor: "pointer",
              background: i === 0 ? "#FF3C54" : undefined,
            }}
          >
            <L style={{ color: i === 0 ? "#0A0A0A" : "#555" }}>{tag}</L>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderLeft: B,
          borderBottom: B,
        }}
      >
        {tags.slice(4).map((tag, i) => (
          <div
            key={i}
            style={{ borderRight: B, padding: "16px 24px", cursor: "pointer" }}
          >
            <L style={{ color: "#555" }}>{tag}</L>
          </div>
        ))}
        <div style={{ gridColumn: "span 2", borderRight: B }} />
      </div>

      {/* Posts destacado + lateral */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "auto auto",
          borderLeft: B,
        }}
      >
        {/* Post principal (span 2 x 2) */}
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
            minHeight: "42vh",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <L style={{ color: "#333" }}>{posts[0].id}</L>
            <L style={{ color: "#FF3C54" }}>{posts[0].tag}</L>
          </div>
          <div>
            <h2
              className="section-title"
              style={{ color: "#d0d0d0", marginBottom: 20 }}
            >
              {posts[0].title}
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
              {posts[0].body}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <L style={{ color: "#444" }}>{posts[0].replies} respuestas</L>
            <L style={{ color: "#555" }}>{posts[0].date} → Leer hilo</L>
          </div>
        </div>

        {/* Posts laterales */}
        {posts.slice(1, 3).map((post, i) => (
          <div
            key={i}
            style={{
              borderRight: B,
              borderBottom: B,
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
              background: i === 1 ? "#111" : undefined,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <L style={{ color: "#333" }}>{post.id}</L>
              <L style={{ color: "#FF3C54" }}>{post.tag}</L>
            </div>
            <h3 className="sub-title" style={{ color: "#888" }}>
              {post.title}
            </h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <L style={{ color: "#444" }}>{post.replies} respuestas</L>
              <L style={{ color: "#444" }}>→</L>
            </div>
          </div>
        ))}
      </div>

      {/* Más posts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderLeft: B,
        }}
      >
        <div
          style={{
            borderRight: B,
            borderBottom: B,
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <L style={{ color: "#333" }}>{posts[3].id}</L>
            <L style={{ color: "#FF3C54" }}>{posts[3].tag}</L>
          </div>
          <h3 className="sub-title" style={{ color: "#888" }}>
            {posts[3].title}
          </h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <L style={{ color: "#444" }}>{posts[3].replies} respuestas</L>
            <L style={{ color: "#444" }}>→</L>
          </div>
        </div>

        {/* CTA nuevo post */}
        <div
          style={{
            gridColumn: "span 2",
            borderRight: B,
            borderBottom: B,
            background: "#0a0a0a",
            padding: "32px 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <L style={{ color: "#333" }}>Nuevo hilo</L>
          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 13,
              color: "#555",
              lineHeight: 1.7,
              maxWidth: "48ch",
            }}
          >
            ¿Tienes una pregunta o un hallazgo que compartir? Abre un hilo y
            empieza la conversación.
          </p>
          <L style={{ color: "#FF3C54" }}>→ Crear hilo</L>
        </div>

        {/* RedCell esquina */}
        <RedCell text="PRO-006" style={{ borderRight: B, borderBottom: B }} />
      </div>

      {/* Stripe footer */}
      <div style={{ borderLeft: B, borderRight: B }}>
        <StripeDecor />
      </div>
    </Page>
  );
}
