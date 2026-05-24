import { TH } from "../../constants";
import { FONTS } from "../../design/tokens";
import { useReveal } from "../../hooks/useReveal";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Grid, GridCell } from "../system/Grid";
import TextReveal from "../system/TextReveal";
import GridImageReveal from "../system/GridImageReveal";
import { DARK_GRID } from "./theme";

export default function MisionSection() {
  const [rBody, sBody] = useReveal(140, true);
  const [rOutro, sOutro] = useReveal(280, true);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const bd = DARK_GRID;
  const maskColor = "#0c0c0c";
  const titleLines = ["La privacidad digital", "parece complicada."];

  if (isMobileLayout) {
    return (
      <section
        id="sobre"
        style={{
          borderTop: bd,
          background: "#0c0c0c",
        }}
      >
        <div>
          <div style={{ padding: "32px 16px" }}>
            <TextReveal
              as="h2"
              lines={titleLines}
              maskColor={maskColor}
              style={{
                fontFamily: FONTS.display,
                fontSize: 28,
                fontWeight: 900,
                lineHeight: "32px",
                color: "#c8c8c8",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            />
          </div>

          <div
            ref={rBody}
            style={{
              ...sBody,
              borderTop: bd,
              padding: "32px 16px",
            }}
          >
            <p
              style={{
                fontFamily: '"Funnel Sans", sans-serif',
                fontSize: 16,
                lineHeight: "32px",
                color: "#c8c8c8",
                margin: 0,
                maxWidth: "32ch",
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
              borderTop: bd,
              padding: "32px 16px",
            }}
          >
            <h3
              className="section-title"
                style={{
                  color: "#ff3c54",
                  fontSize: 28,
                  lineHeight: "32px",
                  maxWidth: "15ch",
                margin: 0,
                textWrap: "balance",
              }}
            >
              Y no debería ser así.
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
            <div style={{ padding: `${TH}px 64px 0` }}>
              <TextReveal
                as="h2"
                lines={titleLines}
                maskColor={maskColor}
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 48,
                  fontWeight: 900,
                  lineHeight: "56px",
                  color: "#c8c8c8",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                borderTop: bd,
                marginTop: 32,
                alignSelf: "start",
              }}
            >
              <div
                ref={rBody}
                style={{
                  ...sBody,
                  gridColumn: "1 / span 2",
                  padding: "32px 64px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <p
                  style={{
                    fontFamily: '"Funnel Sans", sans-serif',
                    fontSize: 16,
                    lineHeight: "32px",
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
                  padding: "32px 64px",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <h3
                  className="section-title"
                  style={{
                    color: "#ff3c54",
                    fontSize: 48,
                    lineHeight: "56px",
                    maxWidth: "20ch",
                    margin: 0,
                  }}
                >
                  Y no debería ser así.
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
            display: "grid",
            minHeight: "85vh",
          }}
        >
          <GridImageReveal
            label=""
            minHeight="85vh"
            style={{
              height: "100%",
              "--grid-image-overlay": "transparent",
              "--grid-image-placeholder-bg": "#c8c8c8",
              "--grid-image-placeholder-text": "#0c0c0c",
              "--grid-image-placeholder-accent": "transparent",
            }}
          />
        </GridCell>
      </Grid>
    </section>
  );
}
