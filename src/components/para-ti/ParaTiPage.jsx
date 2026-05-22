import { Link } from "react-router-dom";
import { Page } from "../Page";
import HeroTransitionGrid from "../HeroTransitionGrid";
import Button from "../system/Button";
import { Grid, GridCell } from "../system/Grid";
import { BORDERS, COLORS, FONTS } from "../../design/tokens";

const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };

const UI = {
  bg: COLORS.canvasDark,
  text: COLORS.textOnDark,
  muted: COLORS.textMutedDark,
};

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

const ACCESS_POINTS = [
  {
    index: "01",
    title: "Aprende",
    description:
      "Artículos claros y visuales sobre privacidad digital. Sin tecnicismos, sin alarmas. Solo lo que necesitas saber para entender qué pasa con tus datos.",
    cta: "Ver artículos",
    to: "/articulos",
  },
  {
    index: "02",
    title: "Comparte",
    description:
      "Una comunidad donde hablar de privacidad es normal. Pregunta, opina, comparte lo que aprendes. La privacidad no es un tema individual.",
    cta: "Ir a la comunidad",
    to: "/comunidad",
  },
  {
    index: "03",
    title: "Actúa",
    description:
      "Lleva la privacidad al día a día. Merch y materiales que hacen visible algo que normalmente no se ve.",
    cta: "Ver la tienda",
    to: "/tienda",
  },
];

function AccessCard({ item, index }) {
  const isLast = index === ACCESS_POINTS.length - 1;
  return (
    <GridCell
      style={{
        borderRight: isLast ? "none" : bd,
        borderBottom: bd,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px 40px 40px",
        gap: 40,
        minHeight: 320,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: 48,
            fontWeight: 900,
            lineHeight: 1,
            color: COLORS.accent,
            opacity: 0.18 + index * 0.28,
          }}
        >
          {item.index}
        </span>
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(2rem, 2.8vw, 3rem)",
            fontWeight: 900,
            lineHeight: 1,
            color: UI.text,
            margin: 0,
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            ...mono,
            fontSize: 11,
            lineHeight: "20px",
            color: UI.muted,
            margin: 0,
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
      {/* Hero */}
      <Grid columns="site">
        <GridCell
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
          span={3}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            borderRight: bd,
            minHeight: "var(--prometeo-hero-height)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 56px 64px",
            gap: 40,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Label>Para ti</Label>
            <h1
              style={{
                fontFamily: FONTS.display,
                fontSize: "clamp(3.2rem, 6vw, 6.4rem)",
                fontWeight: 900,
                lineHeight: 1,
                color: UI.text,
                margin: 0,
              }}
            >
              Tu privacidad.
              <br />
              <span style={{ color: COLORS.accent }}>Tus reglas.</span>
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                lineHeight: "1.7",
                color: UI.muted,
                maxWidth: 560,
                margin: 0,
              }}
            >
              Cada día aceptas condiciones que nunca lees, compartes datos que
              no recuerdas haber dado y usas apps que saben más de ti de lo que
              crees. Prometeo no está aquí para asustarte. Está para que puedas
              elegir de verdad.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button
              as={Link}
              to="/articulos"
              variant="primary"
              surface="dark"
              size="md"
            >
              Empezar a leer
            </Button>
            <Button
              as={Link}
              to="/comunidad"
              variant="outline"
              surface="dark"
              size="md"
            >
              Ver la comunidad
            </Button>
          </div>
        </GridCell>
      </Grid>

      <HeroTransitionGrid background={UI.bg} border={bd} />

      {/* Problem statement */}
      <div
        style={{
          borderBottom: bd,
          display: "grid",
          gridTemplateColumns: "1fr",
        }}
      >
        <div
          style={{
            padding: "64px 56px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            borderRight: bd,
          }}
        >
          <Label>El problema</Label>
          <p
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: UI.text,
              margin: 0,
              maxWidth: 720,
            }}
          >
            La privacidad digital no está diseñada para que la entiendas.{" "}
            <span style={{ color: COLORS.accent }}>Está diseñada para que la aceptes.</span>
          </p>
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
              lineHeight: "1.8",
              color: UI.muted,
              maxWidth: 640,
              margin: 0,
            }}
          >
            Los avisos de cookies están hechos para que hagas clic en
            "Aceptar todo". Los permisos de las apps están enterrados en
            menús que nadie abre. Los términos y condiciones tienen una media
            de 30.000 palabras. Prometeo interrumpe ese ciclo, no con miedo,
            sino con claridad.
          </p>
        </div>
      </div>

      {/* Access points */}
      <div
        style={{
          borderBottom: bd,
          display: "flex",
          alignItems: "center",
          padding: "48px 56px 44px",
          gap: 16,
        }}
      >
        <Label>Tres formas de empezar</Label>
      </div>
      <Grid columns="thirds">
        {ACCESS_POINTS.map((item, i) => (
          <AccessCard key={item.index} item={item} index={i} />
        ))}
      </Grid>

      {/* Closing CTA */}
      <div
        style={{
          borderBottom: bd,
          padding: "64px 56px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <Label>¿Por dónde empiezo?</Label>
        <p
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(1.6rem, 2.4vw, 2.4rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            color: UI.text,
            margin: 0,
            maxWidth: 600,
          }}
        >
          Si no sabes por dónde empezar, empieza por leer. Un artículo es suficiente.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", paddingTop: 8 }}>
          <Button
            as={Link}
            to="/articulos"
            variant="primary"
            surface="dark"
            size="md"
          >
            Leer ahora
          </Button>
        </div>
      </div>
    </Page>
  );
}
