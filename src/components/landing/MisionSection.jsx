import { TH } from "../../constants";
import { useReveal } from "../../hooks/useReveal";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Grid, GridCell } from "../system/Grid";
import GridImageReveal from "../system/GridImageReveal";
import { DARK_GRID } from "./theme";

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
        style={{
          borderTop: bd,
          background: "#0c0c0c",
        }}
      >
        <div>
          <div ref={rTitle} style={{ ...sTitle, padding: "32px 16px" }}>
            <h2
              className="section-title"
              style={{
                color: "#b8bec6",
                lineHeight: "32px",
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
              Cada día aceptamos permisos, cookies y condiciones que afectan
              nuestra vida digital. El problema no es que falte información. Es
              que casi nunca está diseñada para entenderse.
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
            <div ref={rTitle} style={{ ...sTitle, padding: `${TH}px 64px 0` }}>
              <h2
                className="section-title"
                style={{ color: "#b8bec6", lineHeight: "64px", margin: 0 }}
              >
                La privacidad digital parece complicada.
              </h2>
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
                  Cada día aceptamos permisos, cookies y condiciones que afectan
                  nuestra vida digital. El problema no es que falte información.
                  Es que casi nunca está diseñada para entenderse.
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
                    lineHeight: "64px",
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
            label="Privacidad / complejidad"
            minHeight="85vh"
            style={{
              height: "100%",
              "--grid-image-overlay": "transparent",
              "--grid-image-placeholder-bg": "#c8c8c8",
              "--grid-image-placeholder-text": "#0c0c0c",
              "--grid-image-placeholder-accent": "#0c0c0c",
            }}
          />
        </GridCell>
      </Grid>
    </section>
  );
}
