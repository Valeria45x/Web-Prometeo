import { Link } from "react-router-dom";
import { Page } from "../Page";
import HeroTransitionGrid from "../HeroTransitionGrid";
import Button from "../system/Button";
import { Grid, GridCell } from "../system/Grid";
import { BORDERS, COLORS, FONTS } from "../../design/tokens";

const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };

const UI = {
  bg: COLORS.pageLight,
  text: COLORS.textOnLight,
  muted: COLORS.textMutedLight,
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

function CertSeal({ size = 180 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `2px solid ${COLORS.accentDeep}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 14,
          borderRadius: "50%",
          border: `1px solid ${COLORS.accentDeep}`,
          opacity: 0.4,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: size * 0.22,
            fontWeight: 900,
            color: COLORS.accentDeep,
            lineHeight: 1,
          }}
        >
          PMT
        </span>
        <span
          style={{
            ...mono,
            fontSize: 7,
            color: COLORS.accentDeep,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            opacity: 0.6,
          }}
        >
          Certificado
        </span>
      </div>
    </div>
  );
}

const CERT_LEVELS = [
  {
    name: "Essential",
    level: "Nivel 1",
    description:
      "Para empresas que quieren dar el primer paso y demostrar que la privacidad está en su agenda.",
    recommended: false,
  },
  {
    name: "Verified",
    level: "Nivel 2",
    description:
      "Para empresas con políticas activas de privacidad y procesos documentados. El nivel más reconocido.",
    recommended: true,
  },
  {
    name: "Continuous",
    level: "Nivel 3",
    description:
      "Para empresas que integran la privacidad en cada ciclo de desarrollo y mantienen auditorías periódicas.",
    recommended: false,
  },
];

function CertLevelCard({ cert, index }) {
  return (
    <GridCell
      style={{
        borderRight: index < CERT_LEVELS.length - 1 ? bd : "none",
        borderBottom: bd,
        background: cert.recommended ? UI.text : UI.bg,
        minHeight: 300,
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <div
        style={{
          height: 4,
          background: cert.recommended ? COLORS.accent : "transparent",
        }}
      />
      <div
        style={{
          padding: "32px 36px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Label>{cert.level}</Label>
          {cert.recommended && (
            <span
              style={{
                ...mono,
                fontSize: 8,
                color: COLORS.footerText,
                background: COLORS.accent,
                padding: "3px 8px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Recomendado
            </span>
          )}
        </div>
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(2rem, 3vw, 3.2rem)",
            fontWeight: 900,
            lineHeight: 1,
            color: cert.recommended ? COLORS.canvasLight : UI.text,
            margin: 0,
          }}
        >
          {cert.name}
        </h3>
        <p
          style={{
            ...mono,
            fontSize: 10,
            lineHeight: "18px",
            color: cert.recommended ? COLORS.canvasLight : UI.muted,
            opacity: cert.recommended ? 0.75 : 1,
            margin: 0,
          }}
        >
          {cert.description}
        </p>
      </div>
      <div
        style={{
          borderTop: cert.recommended ? "1px solid rgba(255,255,255,0.12)" : bd,
          padding: "20px 36px",
        }}
      >
        <Button
          as={Link}
          to="/certificacion"
          variant={cert.recommended ? "primary" : "outline"}
          surface={cert.recommended ? "dark" : "light"}
          size="sm"
        >
          Saber más
        </Button>
      </div>
    </GridCell>
  );
}

export default function EmpresasPage() {
  return (
    <Page light>
      {/* Hero */}
      <Grid columns="site">
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
            background: UI.bg,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Label>002 — Para empresas</Label>
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
              Confianza
              <br />
              <span style={{ color: COLORS.accent }}>que se ve.</span>
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
              Decir que respetas la privacidad ya no es suficiente. Tus usuarios
              necesitan una señal clara, reconocible y verificable. La
              certificación Prometeo hace exactamente eso.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button
              as={Link}
              to="/certificacion"
              variant="primary"
              surface="light"
              size="md"
            >
              Ver la certificación
            </Button>
            <Button
              as={Link}
              to="/contacto"
              variant="outline"
              surface="light"
              size="md"
            >
              Hablar con nosotros
            </Button>
          </div>
        </GridCell>

        <GridCell
          style={{
            background: COLORS.accent,
            borderLeft: bd,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "var(--prometeo-hero-height)",
          }}
        >
          <CertSeal size={180} />
        </GridCell>
      </Grid>

      <HeroTransitionGrid background={UI.bg} border={bd} />

      {/* Problem + Solution */}
      <Grid columns="halves">
        <GridCell
          style={{
            borderRight: bd,
            borderBottom: bd,
            padding: "56px 48px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            background: UI.bg,
          }}
        >
          <Label>El problema</Label>
          <p
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(1.4rem, 2vw, 2rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: UI.text,
              margin: 0,
            }}
          >
            El 73% de los usuarios desconfían de cómo las empresas gestionan sus datos.
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
            No es falta de intención. Es falta de claridad. Las políticas de
            privacidad existen pero nadie las lee. Las intenciones están ahí
            pero no hay forma de demostrarlas. La desconfianza no se resuelve
            con más texto. Se resuelve con señales.
          </p>
        </GridCell>
        <GridCell
          style={{
            borderBottom: bd,
            padding: "56px 48px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            background: UI.bg,
          }}
        >
          <Label>La solución</Label>
          <p
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(1.4rem, 2vw, 2rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: UI.text,
              margin: 0,
            }}
          >
            Un sello verificable que tus usuarios pueden reconocer de un vistazo.
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
            La certificación PMT funciona como el candado HTTPS pero para la
            privacidad de datos. No son solo palabras: es un proceso de
            evaluación, una auditoría y un mantenimiento continuo que convierte
            el compromiso en algo visible.
          </p>
        </GridCell>
      </Grid>

      {/* Cert levels */}
      <div
        style={{
          borderBottom: bd,
          padding: "48px 56px 44px",
          background: UI.bg,
        }}
      >
        <Label>Niveles de certificación</Label>
      </div>
      <Grid columns="thirds">
        {CERT_LEVELS.map((cert, i) => (
          <CertLevelCard key={cert.name} cert={cert} index={i} />
        ))}
      </Grid>

      {/* Closing CTA */}
      <div
        style={{
          borderBottom: bd,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          background: UI.bg,
        }}
      >
        <div
          style={{
            borderRight: bd,
            padding: "64px 56px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <Label>¿Tu empresa está lista?</Label>
          <p
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(1.8rem, 2.8vw, 3.2rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              color: UI.text,
              margin: 0,
              maxWidth: 520,
            }}
          >
            Empieza con una evaluación. Sin compromiso, sin tecnicismos.
          </p>
          <div style={{ paddingTop: 8, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button
              as={Link}
              to="/contacto"
              variant="primary"
              surface="light"
              size="md"
            >
              Solicitar evaluación
            </Button>
            <Button
              as={Link}
              to="/certificacion"
              variant="outline"
              surface="light"
              size="md"
            >
              Ver el proceso completo
            </Button>
          </div>
        </div>
        <div
          style={{
            background: COLORS.accent,
            width: "min(240px, 22vw)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "32px 28px",
          }}
        >
          <Label>PMT-CERT</Label>
          <CertSeal size={100} />
          <Label>Certificación activa</Label>
        </div>
      </div>
    </Page>
  );
}
