import { TH } from "../../constants";
import { DARK_GRID, PAGE_WHITE } from "./theme";
import { useReveal } from "../../hooks/useReveal";

export default function MisionSection() {
  const [rA, sA] = useReveal(0);
  const [rD, sD] = useReveal(420);
  const bd = DARK_GRID;

  return (
    <section
      id="sobre"
      className="s2-section"
      style={{
        minHeight: "85vh",
        borderTop: bd,
        borderLeft: bd,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "1fr 1fr",
        background: "#0c0c0c",
      }}
    >
      <div
        style={{
          gridColumn: "1 / span 2",
          borderRight: bd,
          display: "flex",
          gridRow: "1 / span 2",
        }}
      >
        <div
          ref={rA}
          style={{
            ...sA,
            width: "100%",
            display: "grid",
            gridTemplateRows: "auto auto 1fr",
            minHeight: "100%",
          }}
        >
          <div style={{ padding: `${TH}px 48px 0` }}>
            <h2
              className="section-title"
              style={{ color: PAGE_WHITE, lineHeight: 1.05, margin: 0 }}
            >
              La privacidad digital parece complicada.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderTop: bd,
              marginTop: 28,
              alignSelf: "start",
            }}
          >
            <div
              style={{
                gridColumn: "1 / span 2",
                padding: "28px 48px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <p
                style={{
                  fontFamily: '"Funnel Sans", sans-serif',
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: "#c8c8c8",
                  margin: 0,
                  maxWidth: "100%",
                }}
              >
                El internet está cambiando rápido, y eso no solo mueve a las
                grandes empresas. Cada vez es más difícil entender el panorama
                digital y qué está pasando en realidad. Esa falta de claridad
                termina creando un ecosistema desigual, donde no todo el mundo
                puede decidir desde el mismo lugar.
              </p>
            </div>

            <div
              style={{
                gridColumn: "1 / span 2",
                borderTop: bd,
                padding: "28px 48px 32px",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <div ref={rD} style={sD}>
                <h3
                  className="section-title"
                  style={{
                    color: "#ff3c54",
                    lineHeight: 0.96,
                    maxWidth: "20ch",
                    margin: 0,
                  }}
                >
                  Pero no debería
                  <br />
                  ser así.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          gridColumn: "3 / span 2",
          gridRow: "1 / span 2",
          padding: `${TH}px 34px 32px`,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      />
    </section>
  );
}
