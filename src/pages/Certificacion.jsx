import { B } from "../constants";
import { L } from "../components/Primitives";
import { Page, PageHeader } from "../components/Page";

export default function Certificacion() {
  return (
    <Page>
      <PageHeader index="002" title="Certificación" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          borderLeft: B,
        }}
      >
        <div
          style={{
            borderRight: B,
            borderBottom: B,
            padding: "36px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <L style={{ color: "#444" }}>Certificación</L>
        </div>
        <div
          style={{
            borderBottom: B,
            background: "#0f0f0f",
            padding: "40px 36px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 13,
              color: "#d0d0d0",
              lineHeight: 1.8,
              maxWidth: "52ch",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            euismod, urna a suscipit varius, urna nibh aliquam ex, non sagittis
            lectus augue ut erat.
          </p>
        </div>

        <div
          style={{
            gridColumn: "1 / span 2",
            borderRight: B,
            borderBottom: B,
            background: "#0a0a0a",
            padding: "40px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: 180,
          }}
        >
          <h2
            className="sub-title"
            style={{ color: "#d0d0d0", lineHeight: 1.3, marginBottom: 18 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h2>
          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 12,
              color: "#777",
              lineHeight: 1.8,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          borderLeft: B,
          borderTop: B,
        }}
      >
        {[
          {
            title: "Nivel 1",
            text: "Lorem ipsum dolor sit amet, consectetur.",
          },
          {
            title: "Nivel 2",
            text: "Sed do eiusmod tempor incididunt ut labore.",
          },
          {
            title: "Nivel 3",
            text: "Ut enim ad minim veniam, quis nostrud exercitation.",
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              borderRight: index < 2 ? B : undefined,
              borderBottom: B,
              padding: "40px 32px",
              background: index % 2 === 1 ? "#0f0f0f" : undefined,
            }}
          >
            <L style={{ color: "#333", marginBottom: 18 }}>{item.title}</L>
            <p
              style={{
                fontFamily: '"Funnel Sans", sans-serif',
                fontSize: 13,
                color: "#d0d0d0",
                lineHeight: 1.8,
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          borderLeft: B,
          borderTop: B,
        }}
      >
        {[
          {
            label: "01",
            headline: "Solicitar",
            detail: "Lorem ipsum dolor sit amet.",
          },
          {
            label: "02",
            headline: "Auditar",
            detail: "Consectetur adipiscing elit.",
          },
          {
            label: "03",
            headline: "Certificar",
            detail: "Sed do eiusmod tempor incididunt.",
          },
          {
            label: "04",
            headline: "Renovar",
            detail: "Ut labore et dolore magna aliqua.",
          },
        ].map((step, index) => (
          <div
            key={index}
            style={{
              borderRight: index < 3 ? B : undefined,
              borderBottom: B,
              padding: "36px 30px",
              background: index % 2 === 1 ? "#111" : undefined,
              minHeight: 180,
            }}
          >
            <L style={{ color: "#333", marginBottom: 14 }}>{step.label}</L>
            <h3
              className="sub-title"
              style={{ color: "#d0d0d0", marginBottom: 12 }}
            >
              {step.headline}
            </h3>
            <p
              style={{
                fontFamily: '"Funnel Sans", sans-serif',
                fontSize: 12,
                color: "#777",
                lineHeight: 1.7,
              }}
            >
              {step.detail}
            </p>
          </div>
        ))}
      </div>
    </Page>
  );
}
