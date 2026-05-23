import { Link } from "react-router-dom";
import { Page } from "../Page";
import HeroTransitionGrid from "../HeroTransitionGrid";
import Button from "../system/Button";
import { Grid, GridCell } from "../system/Grid";
import TextReveal from "../system/TextReveal";
import GridImageReveal from "../system/GridImageReveal";
import { BORDERS, COLORS, FONTS } from "../../design/tokens";

const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };

const UI = {
  bg: COLORS.canvasDark,
  text: COLORS.textOnDark,
  muted: COLORS.textMutedDark,
};

const ACCESS_POINTS = [
  {
    index: "01",
    title: "Artículos",
    description: "Explicaciones cortas para entender lo que aceptas, cambias y compartes cada día.",
    cta: "Leer",
    to: "/articulos",
  },
  {
    index: "02",
    title: "Comunidad",
    description: "Preguntas reales, respuestas claras y conversaciones que convierten la privacidad en algo común.",
    cta: "Entrar",
    to: "/comunidad",
  },
  {
    index: "03",
    title: "Tienda",
    description: "Objetos y materiales para hacer visible una conversación que casi siempre queda escondida.",
    cta: "Ver tienda",
    to: "/tienda",
  },
];

function Label({ children, accent = false }) {
  return (
    <span
      style={{
        ...mono,
        fontSize: 8,
        color: accent ? COLORS.accent : UI.muted,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function AccessCard({ item, index }) {
  const isLast = index === ACCESS_POINTS.length - 1;

  return (
    <GridCell
      className="audience-card"
      style={{
        borderRight: isLast ? "none" : bd,
        borderBottom: bd,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "32px",
        gap: 64,
        minHeight: 384,
      }}
    >
      <div style={{ display: "grid", gap: 16 }}>
        <span
          style={{
            ...mono,
            fontSize: 8,
            lineHeight: "16px",
            color: COLORS.accent,
            letterSpacing: "0.12em",
          }}
        >
          {item.index}
        </span>
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: 32,
            fontWeight: 900,
            lineHeight: "32px",
            color: UI.text,
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 16,
            lineHeight: "32px",
            color: UI.muted,
            margin: 0,
            maxWidth: "28ch",
          }}
        >
          {item.description}
        </p>
      </div>

      <Button as={Link} to={item.to} variant="outline" surface="dark" size="sm">
        {item.cta}
      </Button>
    </GridCell>
  );
}

export default function ParaTiPage() {
  return (
    <Page>
      <Grid columns="site" className="audience-hero">
        <GridCell
          className="audience-cell"
          style={{
            borderRight: bd,
            borderBottom: bd,
            display: "flex",
            alignItems: "flex-end",
            padding: "32px",
          }}
        >
          <Label>001</Label>
        </GridCell>

        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="audience-cell audience-hero__copy"
          style={{
            borderRight: bd,
            borderBottom: bd,
            minHeight: "calc(100svh - var(--prometeo-topbar-height))",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px",
            gap: 64,
          }}
        >
          <div style={{ display: "grid", gap: 32 }}>
            <Label>Para ti</Label>
            <TextReveal
              as="h1"
              lines={["La privacidad no empieza", "en ajustes."]}
              maskColor={UI.bg}
              style={{
                fontFamily: FONTS.display,
                fontSize: 64,
                fontWeight: 900,
                lineHeight: "64px",
                color: UI.text,
                margin: 0,
                textTransform: "uppercase",
              }}
            />
            <p
              style={{
                fontFamily: FONTS.sans,
                fontSize: 16,
                lineHeight: "32px",
                color: UI.muted,
                maxWidth: "34ch",
                margin: 0,
              }}
            >
              Empieza cuando entiendes qué estás aceptando. Prometeo traduce la
              privacidad cotidiana en decisiones más claras.
            </p>
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Button as={Link} to="/articulos" variant="primary" surface="dark" size="md">
              Empezar
            </Button>
            <Button as={Link} to="/comunidad" variant="outline" surface="dark" size="md">
              Preguntar
            </Button>
          </div>
        </GridCell>

        <GridCell className="audience-cell audience-hero__visual" style={{ borderBottom: bd }}>
          <GridImageReveal label="Datos / permisos" minHeight="calc(100svh - var(--prometeo-topbar-height))" />
        </GridCell>
      </Grid>

      <HeroTransitionGrid background={UI.bg} border={bd} />

      <Grid columns="site" className="audience-section">
        <GridCell
          span={3}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="audience-cell"
          style={{
            borderRight: bd,
            borderBottom: bd,
            padding: "128px 64px",
            display: "grid",
            gap: 32,
            alignContent: "center",
            minHeight: 512,
          }}
        >
          <Label>El problema</Label>
          <TextReveal
            as="h2"
            lines={["El botón Aceptar todo", "no existe para protegerte."]}
            maskColor={UI.bg}
            style={{
              fontFamily: FONTS.display,
              fontSize: 64,
              fontWeight: 900,
              lineHeight: "64px",
              color: UI.text,
              margin: 0,
              textTransform: "uppercase",
              maxWidth: "13ch",
            }}
          />
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 16,
              lineHeight: "32px",
              color: UI.muted,
              margin: 0,
              maxWidth: "38ch",
            }}
          >
            No es culpa tuya. El sistema está diseñado para que decidas rápido,
            no para que decidas bien.
          </p>
        </GridCell>

        <GridCell redSignature className="audience-signature" style={{ borderBottom: bd }} />
      </Grid>

      <Grid columns="site" className="audience-section">
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="audience-cell"
          style={{ borderRight: bd, borderBottom: bd }}
        >
          <GridImageReveal label="Lectura / claridad" minHeight="640px" />
        </GridCell>

        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="audience-cell"
          style={{
            borderBottom: bd,
            padding: "128px 64px",
            display: "grid",
            gap: 32,
            alignContent: "center",
          }}
        >
          <Label>La entrada</Label>
          <TextReveal
            as="h2"
            lines={["No necesitas ser experto.", "Necesitas puntos de entrada."]}
            maskColor={UI.bg}
            style={{
              fontFamily: FONTS.display,
              fontSize: 32,
              fontWeight: 900,
              lineHeight: "32px",
              color: UI.text,
              margin: 0,
              textTransform: "uppercase",
              maxWidth: "18ch",
            }}
          />
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 16,
              lineHeight: "32px",
              color: UI.muted,
              margin: 0,
              maxWidth: "34ch",
            }}
          >
            Lee una idea. Haz una pregunta. Comparte una señal. Prometeo está
            pensado para empezar pequeño y seguir entendiendo.
          </p>
        </GridCell>
      </Grid>

      <div
        className="audience-cell"
        style={{
          borderBottom: bd,
          padding: "64px 32px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Label>Tres formas de empezar</Label>
      </div>

      <Grid columns="thirds" className="audience-access">
        {ACCESS_POINTS.map((item, i) => (
          <AccessCard key={item.index} item={item} index={i} />
        ))}
      </Grid>

      <Grid columns="site" className="audience-section">
        <GridCell
          span={3}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="audience-cell"
          style={{
            borderRight: bd,
            borderBottom: bd,
            padding: "128px 64px",
            display: "grid",
            gap: 32,
          }}
        >
          <Label>Primer paso</Label>
          <TextReveal
            as="h2"
            lines={["Empieza por una idea.", "No por todo el sistema."]}
            maskColor={UI.bg}
            style={{
              fontFamily: FONTS.display,
              fontSize: 64,
              fontWeight: 900,
              lineHeight: "64px",
              color: UI.text,
              margin: 0,
              textTransform: "uppercase",
              maxWidth: "14ch",
            }}
          />
          <Button
            as={Link}
            to="/articulos"
            variant="primary"
            surface="dark"
            size="md"
            style={{ justifySelf: "start" }}
          >
            Leer artículos
          </Button>
        </GridCell>
        <GridCell redSignature className="audience-signature" style={{ borderBottom: bd }} />
      </Grid>
    </Page>
  );
}
