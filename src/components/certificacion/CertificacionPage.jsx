import { Link } from "react-router-dom";
import { Page } from "../Page";
import Button from "../system/Button";
import { Grid, GridCell } from "../system/Grid";
import { BORDERS, COLORS, FONTS } from "../../design/tokens";

const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };
const UI = {
  bg: COLORS.canvasLight,
  panel: "#fafafa",
  soft: "#f1f1f1",
  text: COLORS.textOnLight,
  muted: COLORS.textMutedLight,
};

const BENEFITS = [
  {
    title: "Confianza visible",
    body: "El sello traduce practicas complejas de privacidad en una senal clara para clientes, partners e inversores.",
  },
  {
    title: "Riesgo controlado",
    body: "La auditoria detecta exposiciones, dark patterns, fugas de datos y promesas legales que no encajan con el producto real.",
  },
  {
    title: "Mejor venta B2B",
    body: "Ayuda a responder due diligence, compras corporativas y revisiones de seguridad sin improvisar documentacion cada vez.",
  },
  {
    title: "Evolucion continua",
    body: "El certificado no es una foto fija: incluye seguimiento para mantener el nivel cuando cambian producto, proveedores o politicas.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Diagnostico",
    body: "Prometeo revisa producto, flujos de datos, politicas, consentimientos, proveedores y puntos de contacto con el usuario.",
  },
  {
    step: "02",
    title: "Auditoria",
    body: "Se contrastan promesas legales con comportamiento tecnico: tracking, permisos, cookies, retencion, seguridad y transparencia.",
  },
  {
    step: "03",
    title: "Plan de correccion",
    body: "La empresa recibe un informe priorizado con cambios necesarios, impacto, evidencias y criterios para alcanzar el nivel objetivo.",
  },
  {
    step: "04",
    title: "Verificacion",
    body: "Prometeo valida los ajustes, emite el certificado correspondiente y genera una pagina publica verificable.",
  },
  {
    step: "05",
    title: "Mantenimiento",
    body: "Revisiones periodicas y alertas ante cambios relevantes mantienen el certificado alineado con el producto real.",
  },
];

const CERTIFICATES = [
  {
    name: "Essential",
    target: "Startups y productos digitales en fase de orden",
    scope: "Politicas, consentimiento, mapa de datos y medidas basicas.",
  },
  {
    name: "Verified",
    target: "SaaS y empresas que venden a clientes exigentes",
    scope: "Auditoria tecnica, proveedores, evidencias y pagina publica.",
  },
  {
    name: "Continuous",
    target: "Equipos con producto vivo, IA o alto volumen de datos",
    scope: "Monitorizacion, revisiones trimestrales y mantenimiento activo.",
  },
];

function Label({ children }) {
  return (
    <span
      style={{
        ...mono,
        fontSize: 8,
        color: UI.muted,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function MetaStrip() {
  const cells = ["002 - Certificacion", "Empresas", "Auditoria", "Prometeo"];

  return (
    <Grid columns="site" className="cert-meta" style={{ borderBottom: bd }}>
      {cells.map((cell, index) => (
        <GridCell
          key={cell}
          style={{
            borderRight: index < cells.length - 1 ? bd : "none",
            padding: "8px 12px",
            background: UI.bg,
          }}
        >
          <Label>{cell}</Label>
        </GridCell>
      ))}
    </Grid>
  );
}

function CertificateVisual() {
  return (
    <div
      className="cert-visual"
      style={{
        minHeight: 420,
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
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Label>Certificado verificable</Label>
        <Label>PMT-CERT</Label>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
        }}
      >
        <div
          style={{
            width: "min(260px, 72vw)",
            aspectRatio: "1 / 1",
            border: `1px solid ${COLORS.footerText}`,
            display: "grid",
            placeItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 18,
              border: `1px solid ${COLORS.footerText}`,
            }}
          />
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 900,
              color: COLORS.accentDeep,
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            P
          </span>
        </div>
      </div>

      <div
        style={{
          borderTop: bd,
          padding: 20,
          display: "grid",
          gap: 8,
        }}
      >
        <Label>Estado</Label>
        <strong
          style={{
            fontFamily: FONTS.display,
            fontSize: 28,
            lineHeight: 1,
            color: COLORS.footerText,
          }}
        >
          Verified privacy operations
        </strong>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, body }) {
  return (
    <div
      className="cert-section-heading"
      style={{
        borderBottom: bd,
        padding: "30px 32px",
        background: UI.bg,
      }}
    >
      <Label>{eyebrow}</Label>
      <h2
        style={{
          fontFamily: FONTS.display,
          fontSize: "clamp(2rem, 4vw, 4.8rem)",
          lineHeight: 0.95,
          color: UI.text,
          margin: "14px 0 0",
          maxWidth: 820,
        }}
      >
        {title}
      </h2>
      {body ? (
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 15,
            lineHeight: 1.65,
            color: UI.muted,
            margin: "18px 0 0",
            maxWidth: 720,
          }}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

function BenefitCell({ title, body, index }) {
  return (
    <GridCell
      className="cert-benefit"
      style={{
        minHeight: 220,
        borderRight: index % 4 === 3 ? "none" : bd,
        borderBottom: bd,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: UI.bg,
      }}
    >
      <Label>{String(index + 1).padStart(2, "0")}</Label>
      <div>
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: 26,
            lineHeight: 1,
            color: UI.text,
            margin: "0 0 14px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 14,
            lineHeight: 1.6,
            color: UI.muted,
            margin: 0,
          }}
        >
          {body}
        </p>
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
        gridTemplateColumns: "120px minmax(0, 0.8fr) minmax(0, 1.2fr)",
        background: UI.bg,
      }}
    >
      <div style={{ borderRight: bd, padding: "24px 28px" }}>
        <Label>{item.step}</Label>
      </div>
      <div style={{ borderRight: bd, padding: "24px 28px" }}>
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: 28,
            lineHeight: 1,
            color: UI.text,
            margin: 0,
          }}
        >
          {item.title}
        </h3>
      </div>
      <p
        style={{
          fontFamily: FONTS.sans,
          fontSize: 15,
          lineHeight: 1.65,
          color: UI.muted,
          margin: 0,
          padding: "24px 28px",
        }}
      >
        {item.body}
      </p>
    </div>
  );
}

function CertificateType({ cert, index }) {
  return (
    <GridCell
      className="cert-type"
      style={{
        borderRight: index < CERTIFICATES.length - 1 ? bd : "none",
        borderBottom: bd,
        padding: 28,
        background: index === 1 ? UI.panel : UI.bg,
        minHeight: 280,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Label>{`Nivel ${index + 1}`}</Label>
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: 34,
            lineHeight: 1,
            color: index === 1 ? COLORS.accent : UI.text,
            margin: "16px 0 18px",
          }}
        >
          {cert.name}
        </h3>
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 14,
            lineHeight: 1.6,
            color: UI.text,
            margin: "0 0 18px",
          }}
        >
          {cert.target}
        </p>
      </div>
      <p
        style={{
          ...mono,
          fontSize: 9,
          lineHeight: 1.6,
          color: UI.muted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        {cert.scope}
      </p>
    </GridCell>
  );
}

export default function CertificacionPage() {
  return (
    <Page light>
      <MetaStrip />

      <Grid columns="site" className="cert-hero">
        <GridCell
          span={3}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="cert-hero__copy"
          style={{
            borderRight: bd,
            borderBottom: bd,
            padding: "72px 56px 64px",
            background: UI.bg,
            minHeight: "calc(100svh - 104px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 40,
          }}
        >
          <div>
            <Label>Certificacion Prometeo para empresas</Label>
            <h1
              className="section-title"
              style={{
                color: UI.text,
                margin: "18px 0 22px",
                maxWidth: 920,
              }}
            >
              Privacidad verificable para productos que manejan datos reales.
            </h1>
            <p
              style={{
                fontFamily: FONTS.sans,
                fontSize: 17,
                lineHeight: 1.65,
                color: UI.muted,
                margin: 0,
                maxWidth: 680,
              }}
            >
              La certificacion Prometeo ayuda a empresas a demostrar que su
              producto respeta la privacidad, que sus politicas se cumplen en
              la practica y que existe un mantenimiento continuo del estandar.
            </p>
          </div>

          <div
            className="cert-hero__actions"
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <Button
              as={Link}
              to="/contacto"
              variant="primary"
              surface="light"
              size="md"
            >
              Solicitar evaluacion
            </Button>
            <Button
              as={Link}
              to="/comunidad"
              variant="outline"
              surface="light"
              size="md"
            >
              Ver comunidad
            </Button>
          </div>
        </GridCell>

        <GridCell className="cert-hero__visual" style={{ borderBottom: bd }}>
          <CertificateVisual />
        </GridCell>
      </Grid>

      <Grid
        columns="site"
        className="cert-transition-grid"
        style={{ borderBottom: bd, background: UI.bg }}
      >
        {["Evidencia", "Auditoria", "Sello publico", "Mantenimiento"].map(
          (label, index) => (
            <GridCell
              key={label}
              style={{
                borderRight: index < 3 ? bd : "none",
                padding: "18px 24px",
                minHeight: 72,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Label>{label}</Label>
            </GridCell>
          ),
        )}
      </Grid>

      <SectionHeading
        eyebrow="Como ayuda a empresas"
        title="Convierte privacidad en una ventaja operacional y comercial."
        body="Prometeo no certifica intenciones: certifica practicas. El resultado sirve para equipos legales, producto, ventas, seguridad y direccion."
      />

      <Grid columns="site" className="cert-benefits">
        {BENEFITS.map((benefit, index) => (
          <BenefitCell key={benefit.title} {...benefit} index={index} />
        ))}
      </Grid>

      <SectionHeading
        eyebrow="Proceso"
        title="De auditoria inicial a mantenimiento continuo."
        body="Cada fase deja evidencia accionable. La empresa sabe que corregir, por que importa y como se valida antes de mostrar el certificado."
      />

      <section className="cert-process" style={{ background: UI.bg }}>
        {PROCESS.map((item) => (
          <ProcessRow key={item.step} item={item} />
        ))}
      </section>

      <Grid columns="site" className="cert-audit">
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            borderRight: bd,
            borderBottom: bd,
            padding: "40px 32px",
            background: UI.bg,
          }}
        >
          <Label>Auditoria</Label>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(2rem, 4vw, 4rem)",
              lineHeight: 0.95,
              color: UI.text,
              margin: "14px 0 20px",
            }}
          >
            Revision legal, tecnica y de experiencia de usuario.
          </h2>
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 15,
              lineHeight: 1.65,
              color: UI.muted,
              margin: 0,
            }}
          >
            La auditoria cruza politicas, consentimientos, permisos, cookies,
            SDKs, proveedores, retencion, seguridad, accesos internos y puntos
            donde el usuario toma decisiones sobre sus datos.
          </p>
        </GridCell>

        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            borderBottom: bd,
            padding: "40px 32px",
            background: UI.panel,
          }}
        >
          <Label>Mantenimiento</Label>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(2rem, 4vw, 4rem)",
              lineHeight: 0.95,
              color: UI.text,
              margin: "14px 0 20px",
            }}
          >
            El certificado se conserva solo si el producto sigue cumpliendo.
          </h2>
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 15,
              lineHeight: 1.65,
              color: UI.muted,
              margin: 0,
            }}
          >
            Cambios de producto, nuevos proveedores, nuevos flujos de IA o
            modificaciones de politica activan revisiones. Asi el sello no se
            queda obsoleto justo cuando la empresa mas lo necesita.
          </p>
        </GridCell>
      </Grid>

      <SectionHeading
        eyebrow="Tipos de certificado"
        title="Tres niveles segun madurez, riesgo y exposicion publica."
      />

      <Grid columns="thirds" className="cert-types">
        {CERTIFICATES.map((cert, index) => (
          <CertificateType key={cert.name} cert={cert} index={index} />
        ))}
      </Grid>

      <Grid columns="site" className="cert-closing">
        <GridCell
          span={3}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            borderRight: bd,
            borderBottom: bd,
            padding: "48px 40px",
            background: UI.bg,
          }}
        >
          <Label>Resultado</Label>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(2rem, 5vw, 5rem)",
              lineHeight: 0.95,
              color: UI.text,
              margin: "14px 0 20px",
              maxWidth: 760,
            }}
          >
            Una pagina publica verificable y un estandar interno que se puede
            sostener.
          </h2>
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 15,
              lineHeight: 1.65,
              color: UI.muted,
              margin: "0 0 28px",
              maxWidth: 680,
            }}
          >
            El certificado funciona como prueba externa y como sistema interno:
            documenta criterios, evidencias, responsables y fechas de revision.
          </p>
          <Button
            as={Link}
            to="/contacto"
            variant="primary"
            surface="light"
            size="md"
          >
            Hablar con Prometeo
          </Button>
        </GridCell>
        <GridCell
          style={{
            borderBottom: bd,
            background: COLORS.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 260,
          }}
        >
          <span
            style={{
              writingMode: "vertical-rl",
              ...mono,
              fontSize: 8,
              fontWeight: 700,
              color: COLORS.footerText,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Certificacion
          </span>
        </GridCell>
      </Grid>
    </Page>
  );
}
