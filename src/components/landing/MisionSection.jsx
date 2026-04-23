import { TH } from "../../constants";
import { useReveal } from "../../hooks/useReveal";
import { Grid, GridCell } from "../system/Grid";
import { DARK_GRID, PAGE_WHITE } from "./theme";

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
        background: "#0c0c0c",
      }}
    >
      <Grid
        columns="site"
        style={{
          minHeight: "85vh",
          gridTemplateRows: "1fr 1fr",
        }}
      >
        <GridCell
          span={2}
          rowSpan={2}
          style={{
            borderRight: bd,
            display: "flex",
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
                  El internet estÃ¡ cambiando rÃ¡pido, y eso no solo mueve a las
                  grandes empresas. Cada vez es mÃ¡s difÃ­cil entender el
                  panorama digital y quÃ© estÃ¡ pasando en realidad. Esa falta
                  de claridad termina creando un ecosistema desigual, donde no
                  todo el mundo puede decidir desde el mismo lugar.
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
                    Pero no deberÃ­a
                    <br />
                    ser asÃ­.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </GridCell>

        <GridCell
          span={2}
          rowSpan={2}
          style={{
            padding: `${TH}px 34px 32px`,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        />
      </Grid>
    </section>
  );
}
