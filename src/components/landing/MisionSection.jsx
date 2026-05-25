import { TH } from "../../constants";
import { COLORS, FONTS } from "../../design/tokens";
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
  const maskColor = "#050505";
  const titleLines = ["La privacidad digital", "parece complicada."];

  if (isMobileLayout) {
    return (
      <section
        id="sobre"
        style={{
          borderTop: bd,
          background: "#050505",
        }}
      >
        <div>
          <div style={{ padding: "32px 16px" }}>
            <TextReveal
              as="h2"
              lines={titleLines}
              maskColor={maskColor}
              style={{
                fontFamily: FONTS.sans,
                fontSize: 28,
                fontWeight: 900,
                lineHeight: "32px",
                color: "#fcfcfc",
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
                color: "#fcfcfc",
                margin: 0,
                maxWidth: "32ch",
              }}
            >
              Cada vez es más difícil entender el panorama digital y qué está
              pasando en realidad. Esa falta de claridad termina creando un
              ecosistema desigual, donde no todo el mundo puede decidir desde el
              mismo lugar.
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
                color: "#fcfcfc",
                fontSize: 28,
                lineHeight: "32px",
                maxWidth: "15ch",
                margin: 0,
                textWrap: "balance",
              }}
            >
              <span style={{ color: COLORS.accent }}>No debería ser así.</span>
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
        borderTop: bd,
        background: "#050505",
      }}
    >
      <Grid
        columns="site"
        style={{
          gridTemplateRows: "auto auto",
        }}
      >
        {/* Fila 1 izquierda: título */}
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            borderRight: bd,
            paddingTop: TH,
            paddingBottom: 32,
            paddingLeft: 64,
            paddingRight: 64,
          }}
        >
          <TextReveal
            as="h2"
            lines={titleLines}
            maskColor={maskColor}
            style={{
              fontFamily: FONTS.sans,
              fontSize: 48,
              fontWeight: 900,
              lineHeight: "56px",
              color: "#fcfcfc",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          />
        </GridCell>

        {/* Fila 1 derecha: imagen desde arriba, con margen derecho e inferior */}
        <GridCell
          span={2}
          rowSpan={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          collapseRowSpanOnTablet
          collapseRowSpanOnMobile
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <GridImageReveal
            label=""
            minHeight="0"
            style={{
              flex: 1,
              "--grid-image-bg": "#050505",
              "--grid-image-overlay": "transparent",
              "--grid-image-placeholder-bg": "#d9d9d6",
              "--grid-image-placeholder-text": "#050505",
              "--grid-image-placeholder-accent": "transparent",
            }}
          />
        </GridCell>

        {/* Fila 2 izquierda: párrafo + "No debería ser así." */}
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            borderRight: bd,
            borderTop: bd,
          }}
        >
          <div
            ref={rBody}
            style={{
              ...sBody,
              padding: "32px 64px",
            }}
          >
            <p
              style={{
                fontFamily: '"Funnel Sans", sans-serif',
                fontSize: 16,
                lineHeight: "32px",
                color: "#fcfcfc",
                margin: 0,
              }}
            >
              Cada vez es más difícil entender el panorama digital y qué está
              pasando en realidad. Esa falta de claridad termina creando un
              ecosistema desigual, donde no todo el mundo puede decidir desde el
              mismo lugar.
            </p>
          </div>

          <div
            ref={rOutro}
            style={{
              ...sOutro,
              borderTop: bd,
              padding: `32px 64px ${TH}px`,
            }}
          >
            <h3
              className="section-title"
              style={{
                color: "#fcfcfc",
                fontSize: 48,
                lineHeight: "56px",
                maxWidth: "20ch",
                margin: 0,
              }}
            >
              <span style={{ color: COLORS.accent }}>No debería ser así.</span>
            </h3>
          </div>
        </GridCell>
      </Grid>
    </section>
  );
}
