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

const BENEFITS = [
  {
    index: "01",
    title: "Reconocimiento",
    body: "Una señal sencilla para que el usuario identifique compromiso de privacidad sin leer un documento entero.",
  },
  {
    index: "02",
    title: "Diferenciación",
    body: "Una forma visible de separar buenas prácticas de declaraciones genéricas.",
  },
  {
    index: "03",
    title: "Fricción menor",
    body: "Menos explicaciones repetidas, más claridad en puntos críticos de confianza.",
  },
  {
    index: "04",
    title: "Evidencia",
    body: "Criterios, revisión y trazabilidad para que el compromiso pueda comprobarse.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Diagnóstico",
    body: "Revisamos el punto de partida: políticas, flujos de datos, permisos y comunicación pública.",
  },
  {
    step: "02",
    title: "Criterios",
    body: "Definimos que nivel PMT encaja con la madurez actual de la empresa.",
  },
  {
    step: "03",
    title: "Evidencias",
    body: "Se documentan procesos, decisiones y materiales necesarios para verificar el compromiso.",
  },
  {
    step: "04",
    title: "Revisión",
    body: "Prometeo evalua la coherencia entre lo que la empresa dice, hace y muestra.",
  },
  {
    step: "05",
    title: "Publicacion",
    body: "El certificado se activa como señal visible, reconocible y verificable.",
  },
];

const CERTIFICATES = [
  {
    name: "Essential",
    level: "Nivel 1",
    body: "Para empresas que empiezan a ordenar su privacidad y quieren mostrar un primer compromiso.",
  },
  {
    name: "Verified",
    level: "Nivel 2",
    body: "Para equipos con procesos documentados, evidencias revisables y comunicación clara.",
    recommended: true,
  },
  {
    name: "Continuous",
    level: "Nivel 3",
    body: "Para empresas que mantienen privacidad como práctica continua, no como revisión puntual.",
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

function CertSeal({ size = 220 }) {
  return (
    <div
      style={{
        width: `min(${size}px, 60vw)`,
        aspectRatio: "1 / 1",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `2px solid ${COLORS.footerText}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 16,
          borderRadius: "50%",
          border: `1px solid ${COLORS.footerText}`,
          opacity: 0.5,
        }}
      />
      <div style={{ display: "grid", gap: 4, justifyItems: "center", zIndex: 1 }}>
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: 64,
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
          Certificado
        </span>
      </div>
    </div>
  );
}

function CertificateVisual() {
  return (
    <div
      className="cert-visual"
      style={{
        minHeight: "calc(100svh - var(--prometeo-topbar-height))",
        height: "100%",
        background: COLORS.accent,
        borderLeft: bd,
        display: "grid",
        gridTemplateRows: "auto minmax(0, 1fr) auto",
      }}
    >
      <div
        style={{
          borderBottom: bd,
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Label>PMT-CERT</Label>
        <Label>Verificable</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
        <CertSeal />
      </div>
      <div style={{ borderTop: bd, padding: "16px 32px", display: "flex", justifyContent: "space-between" }}>
        <Label>Estado activo</Label>
        <Label>Nivel PMT</Label>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, lines }) {
  return (
    <div
      className="audience-cell cert-section-heading"
      style={{
        borderBottom: bd,
        padding: "128px 64px 64px",
        background: UI.bg,
        display: "grid",
        gap: 32,
      }}
    >
      <Label>{eyebrow}</Label>
      <TextReveal
        as="h2"
        lines={lines}
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
    </div>
  );
}

function BenefitCard({ item, index }) {
  const isRightEdge = index % 2 === 1;

  return (
    <GridCell
      className="audience-card cert-benefit"
      style={{
        borderRight: isRightEdge ? "none" : bd,
        borderBottom: bd,
        background: UI.bg,
        display: "grid",
        gridTemplateColumns: "4px 1fr",
        minHeight: 320,
      }}
    >
      <div style={{ background: COLORS.accent, opacity: 0.18 + index * 0.18 }} />
      <div style={{ padding: "32px", display: "grid", gap: 16, alignContent: "space-between" }}>
        <Label>{item.index}</Label>
        <div style={{ display: "grid", gap: 16 }}>
          <h3
            style={{
              fontFamily: FONTS.display,
              fontSize: 32,
              fontWeight: 900,
              lineHeight: "32px",
              color: UI.text,
              margin: 0,
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
            {item.body}
          </p>
        </div>
      </div>
    </GridCell>
  );
}

function ProcessRow({ item }) {
  return (
    <div
      className="cert-process-row"
      style={{
        borderBottom: bd,
        display: "grid",
        gridTemplateColumns: "128px minmax(0, 1fr) minmax(0, 1fr)",
        background: UI.bg,
      }}
    >
      <div style={{ borderRight: bd, padding: "32px", display: "flex", alignItems: "flex-start" }}>
        <Label accent>{item.step}</Label>
      </div>
      <div style={{ borderRight: bd, padding: "32px" }}>
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: 32,
            fontWeight: 900,
            lineHeight: "32px",
            color: UI.text,
            margin: 0,
          }}
        >
          {item.title}
        </h3>
      </div>
      <div style={{ padding: "32px" }}>
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 16,
            lineHeight: "32px",
            color: UI.muted,
            margin: 0,
            maxWidth: "40ch",
          }}
        >
          {item.body}
        </p>
      </div>
    </div>
  );
}

function CertificateTypeCard({ cert, index }) {
  const active = cert.recommended;
  const isLast = index === CERTIFICATES.length - 1;

  return (
    <GridCell
      className="audience-card cert-type"
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
            fontWeight: 900,
            lineHeight: "32px",
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
          {cert.body}
        </p>
      </div>
      <div style={{ borderTop: active ? "1px solid rgba(217,217,214,0.12)" : bd, padding: "16px 32px" }}>
        <Label>{active ? "Recomendado" : "Disponible"}</Label>
      </div>
    </GridCell>
  );
}

export default function CertificacionPage() {
  return (
    <Page light>
      <Grid columns="site" className="cert-hero audience-hero">
        <GridCell
          span={3}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="cert-hero__copy audience-cell"
          style={{
            borderRight: bd,
            padding: "64px",
            background: UI.bg,
            minHeight: "calc(100svh - var(--prometeo-topbar-height))",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 64,
          }}
        >
          <div style={{ display: "grid", gap: 32 }}>
            <Label>Certificación Prometeo</Label>
            <TextReveal
              as="h1"
              lines={["Un estándar visible", "para privacidad verificable."]}
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
              PMT no es un trámite legal. Es una señal que ayuda a comprobar si
              una empresa comunica, documenta y sostiene su compromiso de privacidad.
            </p>
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Button as={Link} to="/contacto" variant="primary" surface="light" size="md">
              Solicitar evaluación
            </Button>
            <Button as={Link} to="/empresas" variant="outline" surface="light" size="md">
              Para empresas
            </Button>
          </div>
        </GridCell>

        <GridCell className="cert-hero__visual audience-cell">
          <CertificateVisual />
        </GridCell>
      </Grid>

      <HeroTransitionGrid background={UI.bg} border={bd} topBorder={false} />

      <Grid columns="site" className="audience-section">
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="audience-cell"
          style={{ borderRight: bd, borderBottom: bd, background: UI.bg }}
        >
          <GridImageReveal tone="light" label="PMT / auditoría" minHeight="640px" />
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
          <Label>Que es</Label>
          <TextReveal
            as="h2"
            lines={["Una prueba visible,", "no una promesa más."]}
            maskColor={UI.bg}
            style={{
              fontFamily: FONTS.display,
              fontSize: 32,
              fontWeight: 900,
              lineHeight: "32px",
              color: UI.text,
              margin: 0,
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
            El certificado resume una revisión estructurada en una señal clara:
            si el usuario quiere comprobarla, puede hacerlo.
          </p>
        </GridCell>
      </Grid>

      <SectionHeading eyebrow="Como ayuda" lines={["Confianza con", "forma concreta."]} />
      <Grid columns="halves" className="cert-benefits">
        {BENEFITS.map((item, i) => (
          <BenefitCard key={item.index} item={item} index={i} />
        ))}
      </Grid>

      <SectionHeading eyebrow="Proceso" lines={["Cinco fases.", "Sin opacidad."]} />
      <section style={{ background: UI.bg }}>
        {PROCESS.map((item) => (
          <ProcessRow key={item.step} item={item} />
        ))}
      </section>

      <Grid columns="halves" className="cert-audit">
        <GridCell
          className="audience-cell"
          style={{
            borderRight: bd,
            borderBottom: bd,
            background: UI.bg,
            padding: "64px",
            display: "grid",
            gap: 32,
          }}
        >
          <Label>Auditoría</Label>
          <h3
            style={{
              fontFamily: FONTS.display,
              fontSize: 32,
              fontWeight: 900,
              lineHeight: "32px",
              color: UI.text,
              margin: 0,
              maxWidth: "14ch",
            }}
          >
            Revisar antes de mostrar.
          </h3>
          <p style={{ fontFamily: FONTS.sans, fontSize: 16, lineHeight: "32px", color: UI.muted, margin: 0, maxWidth: "34ch" }}>
            La certificación solo tiene valor si la señal se apoya en criterios
            claros y evidencias comprobables.
          </p>
        </GridCell>

        <GridCell
          className="audience-cell"
          style={{
            borderBottom: bd,
            background: UI.bg,
            padding: "64px",
            display: "grid",
            gap: 32,
          }}
        >
          <Label>Mantenimiento</Label>
          <h3
            style={{
              fontFamily: FONTS.display,
              fontSize: 32,
              fontWeight: 900,
              lineHeight: "32px",
              color: UI.text,
              margin: 0,
              maxWidth: "14ch",
            }}
          >
            La confianza no es estática.
          </h3>
          <p style={{ fontFamily: FONTS.sans, fontSize: 16, lineHeight: "32px", color: UI.muted, margin: 0, maxWidth: "34ch" }}>
            Los niveles avanzados permiten revisar cambios, mantener evidencias
            y actualizar el estado de la certificación.
          </p>
        </GridCell>
      </Grid>

      <SectionHeading eyebrow="Tipos de certificado" lines={["Elige según", "tu momento."]} />
      <Grid columns="thirds" className="cert-types">
        {CERTIFICATES.map((cert, i) => (
          <CertificateTypeCard key={cert.name} cert={cert} index={i} />
        ))}
      </Grid>

      <Grid columns="site" className="cert-closing audience-section">
        <GridCell
          span={3}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="audience-cell"
          style={{
            borderRight: bd,
            borderBottom: bd,
            background: UI.bg,
            padding: "128px 64px",
            display: "grid",
            gap: 32,
          }}
        >
          <Label>Resultado</Label>
          <TextReveal
            as="h2"
            lines={["Una señal clara", "para una práctica seria."]}
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
          <Button as={Link} to="/contacto" variant="primary" surface="light" size="md" style={{ justifySelf: "start" }}>
            Hablar con Prometeo
          </Button>
        </GridCell>
        <GridCell redSignature className="audience-signature" style={{ borderBottom: bd }} />
      </Grid>
    </Page>
  );
}
