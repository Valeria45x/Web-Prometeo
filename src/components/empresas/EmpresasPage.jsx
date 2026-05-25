import { Link } from "react-router-dom";
import { Page } from "../Page";
import HeroTransitionGrid from "../HeroTransitionGrid";
import Button from "../system/Button";
import { Grid, GridCell } from "../system/Grid";
import TextReveal from "../system/TextReveal";
import GridImageReveal from "../system/GridImageReveal";
import { BORDERS, COLORS, FONTS } from "../../design/tokens";

const bd = BORDERS.light;
const mono = { fontFamily: FONTS.mono };

const UI = {
  bg: COLORS.pageLight,
  text: COLORS.textOnLight,
  muted: COLORS.textMutedLight,
};

const CERT_LEVELS = [
  {
    name: "Essential",
    level: "Nivel 1",
    description: "Primer diagnóstico, criterios mínimos y señal visible de compromiso.",
    recommended: false,
  },
  {
    name: "Verified",
    level: "Nivel 2",
    description: "Revisión documentada, evidencias verificables y certificado público.",
    recommended: true,
  },
  {
    name: "Continuous",
    level: "Nivel 3",
    description: "Seguimiento periódico para equipos que integran privacidad en producto.",
    recommended: false,
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
          border: `2px solid ${COLORS.textOnAccent}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 16,
          borderRadius: "50%",
          border: `1px solid ${COLORS.textOnAccent}`,
          opacity: 0.45,
        }}
      />
      <div style={{ display: "grid", gap: 4, justifyItems: "center", zIndex: 1 }}>
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: size * 0.22,
            fontWeight: 900,
            color: COLORS.textOnAccent,
            lineHeight: 1,
          }}
        >
          PMT
        </span>
        <span
          style={{
            ...mono,
            fontSize: 8,
            color: COLORS.textOnAccent,
            letterSpacing: "0.14em",
          }}
        >
          Cert
        </span>
      </div>
    </div>
  );
}

function CertLevelCard({ cert, index }) {
  const isLast = index === CERT_LEVELS.length - 1;
  const active = cert.recommended;

  return (
    <GridCell
      className="audience-card"
      style={{
        borderRight: isLast ? "none" : bd,
        borderBottom: bd,
        background: active ? COLORS.textOnLight : UI.bg,
        minHeight: 384,
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <div style={{ height: 4, background: active ? COLORS.accent : "transparent" }} />
      <div style={{ padding: "32px", display: "grid", gap: 16, alignContent: "start" }}>
        <Label>{cert.level}</Label>
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: 32,
            lineHeight: "32px",
            fontWeight: 900,
            color: active ? COLORS.pageLight : UI.text,
            margin: 0,
          }}
        >
          {cert.name}
        </h3>
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 16,
            lineHeight: "32px",
            color: active ? COLORS.pageLight : UI.muted,
            opacity: active ? 0.72 : 1,
            margin: 0,
            maxWidth: "28ch",
          }}
        >
          {cert.description}
        </p>
      </div>
      <div style={{ borderTop: active ? "1px solid rgba(217,217,214,0.12)" : bd, padding: "16px 32px" }}>
        <Button
          as={Link}
          to="/certificacion"
          variant={active ? "primary" : "outline"}
          surface={active ? "dark" : "light"}
          size="sm"
        >
          Ver nivel
        </Button>
      </div>
    </GridCell>
  );
}

export default function EmpresasPage() {
  return (
    <Page light>
      <Grid columns="site" className="audience-hero">
        <GridCell
          span={3}
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
            background: UI.bg,
          }}
        >
          <div style={{ display: "grid", gap: 32 }}>
            <Label>Para empresas</Label>
            <TextReveal
              as="h1"
              lines={["Privacidad demostrable", "para generar confianza."]}
              maskColor={UI.bg}
              style={{
                fontFamily: FONTS.display,
                fontSize: 64,
                fontWeight: 900,
                lineHeight: "64px",
                color: UI.text,
                margin: 0,
                maxWidth: "15ch",
              }}
            />
            <p
              style={{
                fontFamily: FONTS.sans,
                fontSize: 16,
                lineHeight: "32px",
                color: UI.muted,
                maxWidth: "36ch",
                margin: 0,
              }}
            >
              Decir que cuidas los datos ya no basta. Prometeo convierte
              procesos y compromisos en una señal verificable.
            </p>
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Button as={Link} to="/certificacion" variant="primary" surface="light" size="md">
              Ver certificación
            </Button>
            <Button as={Link} to="/contacto" variant="outline" surface="light" size="md">
              Contactar
            </Button>
          </div>
        </GridCell>

        <GridCell
          className="audience-cell audience-hero__seal"
          style={{
            background: COLORS.accent,
            borderBottom: bd,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100svh - var(--prometeo-topbar-height))",
          }}
        >
          <CertSeal />
        </GridCell>
      </Grid>

      <HeroTransitionGrid background={UI.bg} border={bd} topBorder={false} />

      <Grid columns="site" className="audience-section">
        <GridCell
          span={2}
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
            background: UI.bg,
          }}
        >
          <Label>La tension</Label>
          <TextReveal
            as="h2"
            lines={["La confianza no se declara.", "Se demuestra."]}
            maskColor={UI.bg}
            style={{
              fontFamily: FONTS.display,
              fontSize: 64,
              fontWeight: 900,
              lineHeight: "64px",
              color: UI.text,
              margin: 0,
              maxWidth: "12ch",
            }}
          />
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
            background: UI.bg,
          }}
        >
          <Label>El problema</Label>
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
            Muchas empresas ya tienen políticas y procesos. El usuario no los
            ve, no los entiende y no puede comprobarlos. Ahí aparece la fricción.
          </p>
        </GridCell>
      </Grid>

      <Grid columns="site" className="audience-section">
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="audience-cell"
          style={{ borderRight: bd, borderBottom: bd, background: UI.bg }}
        >
          <GridImageReveal tone="light" label="Confianza / evidencia" minHeight="640px" />
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
            background: UI.bg,
          }}
        >
          <Label>La solución</Label>
          <TextReveal
            as="h2"
            lines={["Un sello no sustituye la privacidad.", "La hace visible."]}
            maskColor={UI.bg}
            style={{
              fontFamily: FONTS.display,
              fontSize: 32,
              fontWeight: 900,
              lineHeight: "32px",
              color: UI.text,
              margin: 0,
              maxWidth: "22ch",
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
            PMT funciona como una señal reconocible: evalúa, documenta y permite
            verificar el compromiso de privacidad de una empresa.
          </p>
        </GridCell>
      </Grid>

      <div
        className="audience-cell"
        style={{
          borderBottom: bd,
          padding: "64px 32px",
          background: UI.bg,
        }}
      >
        <Label>Niveles de certificación</Label>
      </div>

      <Grid columns="thirds" className="audience-access">
        {CERT_LEVELS.map((cert, i) => (
          <CertLevelCard key={cert.name} cert={cert} index={i} />
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
            background: UI.bg,
          }}
        >
          <Label>Primer paso</Label>
          <TextReveal
            as="h2"
            lines={["Convierte privacidad", "en una señal verificable."]}
            maskColor={UI.bg}
            style={{
              fontFamily: FONTS.display,
              fontSize: 64,
              fontWeight: 900,
              lineHeight: "64px",
              color: UI.text,
              margin: 0,
              maxWidth: "14ch",
            }}
          />
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Button as={Link} to="/contacto" variant="primary" surface="light" size="md">
              Solicitar evaluación
            </Button>
            <Button as={Link} to="/certificacion" variant="outline" surface="light" size="md">
              Ver proceso
            </Button>
          </div>
        </GridCell>

        <GridCell redSignature className="audience-signature" style={{ borderBottom: bd }} />
      </Grid>
    </Page>
  );
}
