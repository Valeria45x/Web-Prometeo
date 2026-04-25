import { TH } from "../../constants";
import { useReveal } from "../../hooks/useReveal";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Grid, GridCell } from "../system/Grid";
import { DARK_GRID, PAGE_WHITE } from "./theme";

export default function MisionSection() {
  const [rTitle, sTitle] = useReveal(0, true);
  const [rBody, sBody] = useReveal(140, true);
  const [rOutro, sOutro] = useReveal(280, true);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const bd = DARK_GRID;

  if (isMobileLayout) {
    return (
      <section
        id="sobre"
        className="s2-section"
        style={{
          borderTop: bd,
          borderLeft: bd,
          background: "#0c0c0c",
        }}
      >
        <div>
          <div ref={rTitle} style={{ ...sTitle, padding: "32px 20px 24px" }}>
            <h2
              className="section-title"
              style={{
                color: PAGE_WHITE,
                lineHeight: 0.96,
                maxWidth: "16ch",
                margin: 0,
                textWrap: "balance",
              }}
            >
              La privacidad digital parece complicada.
            </h2>
          </div>

          <div
            ref={rBody}
            style={{
              ...sBody,
              borderTop: bd,
              padding: "24px 20px 28px",
            }}
          >
            <p
              style={{
                fontFamily: '"Funnel Sans", sans-serif',
                fontSize: 16,
                lineHeight: 1.7,
                color: "#c8c8c8",
                margin: 0,
                maxWidth: "32ch",
              }}
            >
              El internet está cambiando rápido, y eso no solo mueve a las grandes
              empresas. Cada vez es más difícil entender el panorama digital y qué
              está pasando en realidad. Esa falta de claridad termina creando un
              ecosistema desigual, donde no todo el mundo puede decidir desde el
              mismo lugar.
            </p>
          </div>

          <div
            ref={rOutro}
            style={{
              ...sOutro,
              borderTop: bd,
              padding: "28px 20px 32px",
            }}
          >
            <h3
              className="section-title"
              style={{
                color: "#ff3c54",
                lineHeight: 0.96,
                maxWidth: "15ch",
                margin: 0,
                textWrap: "balance",
              }}
            >
              Y no debería serlo.
            </h3>
          </div>
        </div>
      </section>
    );
  }

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
          collapseSpanOnTablet
          collapseSpanOnMobile
          collapseRowSpanOnTablet
          collapseRowSpanOnMobile
          style={{
            borderRight: bd,
            display: "flex",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateRows: "auto auto 1fr",
              minHeight: "100%",
            }}
          >
            <div
              ref={rTitle}
              style={{ ...sTitle, padding: `${TH}px 48px 0` }}
            >
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
                ref={rBody}
                style={{
                  ...sBody,
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
                ref={rOutro}
                style={{
                  ...sOutro,
                  gridColumn: "1 / span 2",
                  borderTop: bd,
                  padding: "28px 48px 32px",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <h3
                  className="section-title"
                  style={{
                    color: "#ff3c54",
                    lineHeight: 0.96,
                    maxWidth: "20ch",
                    margin: 0,
                  }}
                >
                  Y no debería serlo.
                </h3>
              </div>
            </div>
          </div>
        </GridCell>

        <GridCell
          span={2}
          rowSpan={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          collapseRowSpanOnTablet
          collapseRowSpanOnMobile
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
