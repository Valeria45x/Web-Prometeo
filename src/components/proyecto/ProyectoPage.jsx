import { Link } from "react-router-dom";
import { Page } from "../Page";
import HeroTransitionGrid from "../HeroTransitionGrid";
import Button from "../system/Button";
import { Grid, GridCell } from "../system/Grid";
import Label from "../system/Label";
import { BORDERS, COLORS, FONTS } from "../../design/tokens";

const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };

const UI = {
  bg: COLORS.canvasDark,
  text: COLORS.textOnDark,
  muted: COLORS.textMutedDark,
};

const PILLARS = [
  {
    index: "001",
    title: "Educación",
    description:
      "Contenido claro, visual y directo sobre privacidad digital. Artículos, guías y recursos para entender mejor cómo funciona el ecosistema de datos.",
    to: "/articulos",
    cta: "Ver artículos",
  },
  {
    index: "002",
    title: "Certificación",
    description:
      "Un sistema de certificación para empresas que quieren demostrar que toman la privacidad en serio. Un sello verificable que los usuarios puedan reconocer.",
    to: "/certificacion",
    cta: "Ver certificación",
  },
  {
    index: "003",
    title: "Comunidad",
    description:
      "Hacer de la privacidad un hábito compartido, integrándola en el día a día para que deje de ser un concepto técnico y se convierta en un valor común.",
    to: "/comunidad",
    cta: "Ver comunidad",
  },
];

function PillarCard({ item, index }) {
  const isLast = index === PILLARS.length - 1;
  return (
    <GridCell
      style={{
        borderRight: isLast ? "none" : bd,
        borderBottom: bd,
        padding: "48px 40px 40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 32,
        minHeight: 280,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Label surface="dark" tone="accent">
          {item.index}
        </Label>
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(1.8rem, 2.4vw, 2.8rem)",
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

const GRID_SCALE = [4, 8, 16, 32, 64, 128, 256];

export default function ProyectoPage() {
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
          <Label surface="dark">000</Label>
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
            <Label surface="dark">El proyecto</Label>
            <h1
              style={{
                fontFamily: FONTS.display,
                fontSize: "clamp(4rem, 8vw, 9.6rem)",
                fontWeight: 900,
                lineHeight: 1,
                color: UI.text,
                margin: 0,
              }}
            >
              Prometeo
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
              Prometeo nació de una incomodidad compartida. La privacidad
              digital afecta a todos pero está diseñada para que no la entienda
              nadie. Creemos que eso no debería ser así. Y decidimos hacer algo
              al respecto.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button
              as={Link}
              to="/contacto"
              variant="primary"
              surface="dark"
              size="md"
            >
              Escribirnos
            </Button>
          </div>
        </GridCell>
      </Grid>

      <HeroTransitionGrid background={UI.bg} border={bd} />

      {/* Mission statement */}
      <div style={{ borderBottom: bd, padding: "64px 56px" }}>
        <Label surface="dark">Misión</Label>
        <p
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(2rem, 3.6vw, 4rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            color: UI.text,
            margin: "24px 0 0",
            maxWidth: 800,
          }}
        >
          Un sistema para que la privacidad digital sea{" "}
          <span style={{ color: COLORS.accent }}>
            comprensible, visible y normal.
          </span>
        </p>
      </div>

      {/* Aceptar no es elegir */}
      <Grid columns="halves">
        <GridCell
          style={{
            borderRight: bd,
            borderBottom: bd,
            padding: "56px 48px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <Label surface="dark">El problema central</Label>
          <p
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(1.6rem, 2.4vw, 2.8rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              color: UI.text,
              margin: 0,
            }}
          >
            Aceptar no es elegir.
          </p>
          <p
            style={{
              ...mono,
              fontSize: 11,
              lineHeight: "20px",
              color: UI.muted,
              margin: 0,
            }}
          >
            La normalización es la forma más efectiva de control porque no
            parece control. Cada vez que haces clic en "Aceptar todo" no estás
            eligiendo: estás cediendo. Prometeo interrumpe ese ciclo, no con
            miedo, sino con claridad.
          </p>
        </GridCell>
        <GridCell
          style={{
            borderBottom: bd,
            padding: "56px 48px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <Label surface="dark">El enfoque</Label>
          <p
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(1.6rem, 2.4vw, 2.8rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              color: UI.text,
              margin: 0,
            }}
          >
            Claridad, no alarma.
          </p>
          <p
            style={{
              ...mono,
              fontSize: 11,
              lineHeight: "20px",
              color: UI.muted,
              margin: 0,
            }}
          >
            No queremos que tengas miedo de internet. Queremos que lo uses con
            criterio. La diferencia entre ambas cosas es el conocimiento: saber
            qué compartes, con quién y para qué. Desde ahí puedes elegir de
            verdad.
          </p>
        </GridCell>
      </Grid>

      {/* Design system */}
      <div
        style={{
          borderBottom: bd,
          padding: "64px 56px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <Label surface="dark">Sistema de diseño</Label>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(1.4rem, 2vw, 2rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: UI.text,
              margin: 0,
              maxWidth: 640,
            }}
          >
            El sistema visual de Prometeo está derivado de AES-256.
          </p>
          <p
            style={{
              ...mono,
              fontSize: 11,
              lineHeight: "20px",
              color: UI.muted,
              margin: 0,
              maxWidth: 640,
            }}
          >
            AES-256 es el estándar de cifrado que protege la mayoría de las
            comunicaciones digitales del mundo. Su arquitectura matemática —
            basada en potencias de 2 — define nuestra escala de espaciado, el
            número de columnas del grid y la lógica visual de cada componente.
            La forma sigue a la función. La estética es el argumento.
          </p>
        </div>
        <div
          style={{ display: "flex", gap: 16, flexWrap: "wrap", paddingTop: 8 }}
        >
          {GRID_SCALE.map((value) => (
            <div
              key={value}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: Math.min(value, 64),
                  height: Math.min(value, 64),
                  background: COLORS.accent,
                  opacity: 0.12 + GRID_SCALE.indexOf(value) * 0.12,
                }}
              />
              <span
                style={{
                  ...mono,
                  fontSize: 8,
                  color: UI.muted,
                  letterSpacing: "0.08em",
                }}
              >
                {value}px
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Three pillars */}
      <div
        style={{
          borderBottom: bd,
          padding: "48px 56px 44px",
        }}
      >
        <Label surface="dark">Los tres frentes</Label>
      </div>
      <Grid columns="thirds">
        {PILLARS.map((item, i) => (
          <PillarCard key={item.index} item={item} index={i} />
        ))}
      </Grid>

      {/* Closing */}
      <div
        style={{
          borderBottom: bd,
          padding: "64px 56px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <Label surface="dark">¿Tienes algo que decirnos?</Label>
        <p
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(1.8rem, 2.8vw, 3.2rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            color: UI.text,
            margin: 0,
            maxWidth: 560,
          }}
        >
          Si tienes una pregunta, una idea o simplemente quieres saludar, nos
          encantaría escucharte.
        </p>
        <div style={{ paddingTop: 8 }}>
          <Button
            as={Link}
            to="/contacto"
            variant="primary"
            surface="dark"
            size="md"
          >
            Escribirnos
          </Button>
        </div>
      </div>
    </Page>
  );
}
