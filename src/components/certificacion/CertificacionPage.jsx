import { Link } from "react-router-dom";
import { Page } from "../Page";
import Button from "../system/Button";
import { Grid, GridCell } from "../system/Grid";
import { BORDERS, COLORS, FONTS } from "../../design/tokens";

const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };
const UI = {
  bg: COLORS.canvasLight,
  panel: "#f7f7f7",
  soft: "#f1f1f1",
  text: COLORS.textOnLight,
  muted: COLORS.textMutedLight,
};

const BENEFITS = [
  {
    title: "Confianza visible",
    body: "El sello traduce prácticas complejas de privacidad en una señal clara para clientes, partners e inversores.",
    icon: "01",
  },
  {
    title: "Riesgo controlado",
    body: "La auditoría detecta exposiciones, dark patterns, fugas de datos y promesas legales que no encajan con el producto real.",
    icon: "02",
  },
  {
    title: "Mejor venta B2B",
    body: "Ayuda a responder due diligence, compras corporativas y revisiones de seguridad sin improvisar documentación cada vez.",
    icon: "03",
  },
  {
    title: "Evolución continua",
    body: "El certificado no es una foto fija: incluye seguimiento para mantener el nivel cuando cambian producto, proveedores o políticas.",
    icon: "04",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Diagnóstico",
    body: "Prometeo revisa producto, flujos de datos, políticas, consentimientos, proveedores y puntos de contacto con el usuario.",
  },
  {
    step: "02",
    title: "Auditoría",
    body: "Se contrastan promesas legales con comportamiento técnico: tracking, permisos, cookies, retención, seguridad y transparencia.",
  },
  {
    step: "03",
    title: "Plan de corrección",
    body: "La empresa recibe un informe priorizado con cambios necesarios, impacto, evidencias y criterios para alcanzar el nivel objetivo.",
  },
  {
    step: "04",
    title: "Verificación",
    body: "Prometeo valida los ajustes, emite el certificado correspondiente y genera una página pública verificable.",
  },
  {
    step: "05",
    title: "Mantenimiento",
    body: "Revisiones periódicas y alertas ante cambios relevantes mantienen el certificado alineado con el producto real.",
  },
];

const CERTIFICATES = [
  {
    name: "Essential",
    level: "Nivel 1",
    target: "Startups y productos digitales en fase de orden",
    scope: "Políticas, consentimiento, mapa de datos y medidas básicas.",
    recommended: false,
  },
  {
    name: "Verified",
    level: "Nivel 2",
    target: "SaaS y empresas que venden a clientes exigentes",
    scope: "Auditoría técnica, proveedores, evidencias y página pública.",
    recommended: true,
  },
  {
    name: "Continuous",
    level: "Nivel 3",
    target: "Equipos con producto vivo, IA o alto volumen de datos",
    scope: "Monitorización, revisiones trimestrales y mantenimiento activo.",
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
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function CertSeal() {
  return (
    <div
      style={{
        width: "min(220px, 60vw)",
        aspectRatio: "1 / 1",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer ring */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `2px solid ${COLORS.footerText}`,
        }}
      />
      {/* Middle ring */}
      <div
        style={{
          position: "absolute",
          inset: 14,
          borderRadius: "50%",
          border: `1px solid ${COLORS.footerText}`,
          opacity: 0.5,
        }}
      />
      {/* Inner content */}
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
            fontSize: "clamp(2.4rem, 6vw, 4rem)",
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
            opacity: 0.7,
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
          padding: "14px 20px",
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
          padding: 40,
        }}
      >
        <CertSeal />
      </div>

      <div
        style={{
          borderTop: bd,
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <Label>Estado activo</Label>
        <strong
          style={{
            fontFamily: FONTS.display,
            fontSize: 22,
            lineHeight: 1.1,
            color: COLORS.footerText,
          }}
        >
          Verified privacy
          <br />
          operations
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
        padding: "48px 48px 44px",
        background: UI.bg,
      }}
    >
      <Label>{eyebrow}</Label>
      <h2
        style={{
          fontFamily: FONTS.display,
          fontSize: "clamp(2.2rem, 4vw, 4.8rem)",
          fontWeight: 900,
          lineHeight: 0.95,
          color: UI.text,
          margin: "16px 0 0",
          maxWidth: 820,
        }}
      >
        {title}
      </h2>
      {body && (
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 16,
            lineHeight: 1.65,
            color: UI.muted,
            margin: "20px 0 0",
            maxWidth: 680,
          }}
        >
          {body}
        </p>
      )}
    </div>
  );
}

function BenefitCard({ title, body, icon, index }) {
  const isEven = index % 2 === 0;
  return (
    <GridCell
      className="cert-benefit"
      style={{
        borderRight: isEven ? bd : "none",
        borderBottom: bd,
        background: UI.bg,
        display: "grid",
        gridTemplateColumns: "4px 1fr",
      }}
    >
      <div style={{ background: COLORS.accent, opacity: 0.15 + index * 0.2 }} />
      <div
        style={{
          padding: "40px 36px 36px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: 48,
            fontWeight: 900,
            lineHeight: 1,
            color: UI.soft,
          }}
        >
          {icon}
        </span>
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            color: UI.text,
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 14,
            lineHeight: 1.65,
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

function ProcessCard({ item, index, total }) {
  const isLast = index === total - 1;
  return (
    <div
      className="cert-process-card"
      style={{
        borderBottom: bd,
        display: "grid",
        gridTemplateColumns: "80px minmax(0, 1fr)",
        background: index % 2 === 0 ? UI.bg : UI.panel,
      }}
    >
      {/* Step number */}
      <div
        style={{
          borderRight: bd,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 36,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: 13,
            fontWeight: 900,
            color: isLast ? COLORS.accent : UI.text,
            opacity: isLast ? 1 : 0.18 + index * 0.18,
          }}
        >
          {item.step}
        </span>
      </div>
      {/* Content */}
      <div
        style={{
          padding: "32px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(1.4rem, 2.2vw, 2.2rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            color: UI.text,
            margin: 0,
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 14,
            lineHeight: 1.65,
            color: UI.muted,
            margin: 0,
            maxWidth: 640,
          }}
        >
          {item.body}
        </p>
      </div>
    </div>
  );
}

function CertificateTypeCard({ cert, index }) {
  return (
    <GridCell
      className="cert-type"
      style={{
        borderRight: index < CERTIFICATES.length - 1 ? bd : "none",
        borderBottom: bd,
        background: cert.recommended ? UI.text : UI.bg,
        minHeight: 320,
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      {/* Top accent bar */}
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
          gap: 14,
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span
            style={{
              ...mono,
              fontSize: 8,
              color: cert.recommended ? COLORS.accent : UI.muted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {cert.level}
          </span>
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
            fontFamily: FONTS.sans,
            fontSize: 14,
            lineHeight: 1.6,
            color: cert.recommended ? "rgba(255,255,255,0.65)" : UI.muted,
            margin: 0,
          }}
        >
          {cert.target}
        </p>
      </div>
      <div
        style={{
          borderTop: cert.recommended ? "1px solid rgba(255,255,255,0.12)" : bd,
          padding: "20px 36px",
        }}
      >
        <p
          style={{
            ...mono,
            fontSize: 9,
            lineHeight: 1.6,
            color: cert.recommended ? "rgba(255,255,255,0.4)" : UI.muted,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {cert.scope}
        </p>
      </div>
    </GridCell>
  );
}

export default function CertificacionPage() {
  return (
    <Page light>
      {/* Hero */}
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
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Label>002 — Certificación Prometeo para empresas</Label>
            <h1
              className="section-title"
              style={{
                color: UI.text,
                margin: 0,
                maxWidth: 860,
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
                maxWidth: 620,
              }}
            >
              La certificación Prometeo ayuda a empresas a demostrar que su
              producto respeta la privacidad, que sus políticas se cumplen en la
              práctica y que existe un mantenimiento continuo del estándar.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Mini stat row */}
            <div style={{ display: "flex", gap: 40 }}>
              {[
                { value: "3", label: "Niveles de certificación" },
                { value: "5", label: "Fases de auditoría" },
                { value: "∞", label: "Mantenimiento continuo" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 36,
                      fontWeight: 900,
                      lineHeight: 1,
                      color: COLORS.accent,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      ...mono,
                      fontSize: 8,
                      color: UI.muted,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginTop: 6,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
                to="/comunidad"
                variant="outline"
                surface="light"
                size="md"
              >
                Ver comunidad
              </Button>
            </div>
          </div>
        </GridCell>

        <GridCell className="cert-hero__visual" style={{ borderBottom: bd }}>
          <CertificateVisual />
        </GridCell>
      </Grid>

      {/* Benefits */}
      <SectionHeading
        eyebrow="Cómo ayuda a empresas"
        title="Convierte privacidad en una ventaja operacional y comercial."
        body="Prometeo no certifica intenciones: certifica prácticas. El resultado sirve para equipos legales, producto, ventas, seguridad y dirección."
      />

      <Grid columns="halves" className="cert-benefits">
        {BENEFITS.map((benefit, index) => (
          <BenefitCard key={benefit.title} {...benefit} index={index} />
        ))}
      </Grid>

      {/* Process */}
      <SectionHeading
        eyebrow="Proceso"
        title="De auditoría inicial a mantenimiento continuo."
        body="Cada fase deja evidencia accionable. La empresa sabe qué corregir, por qué importa y cómo se valida antes de mostrar el certificado."
      />

      <section className="cert-process" style={{ background: UI.bg }}>
        {PROCESS.map((item, index) => (
          <ProcessCard key={item.step} item={item} index={index} total={PROCESS.length} />
        ))}
      </section>

      {/* Audit + Maintenance callout */}
      <Grid columns="halves" className="cert-audit">
        <GridCell
          style={{
            borderRight: bd,
            borderBottom: bd,
            background: UI.bg,
            display: "grid",
            gridTemplateColumns: "4px 1fr",
          }}
        >
          <div style={{ background: COLORS.accent }} />
          <div style={{ padding: "44px 40px" }}>
            <Label>Auditoría</Label>
            <h2
              style={{
                fontFamily: FONTS.display,
                fontSize: "clamp(1.8rem, 3vw, 3.2rem)",
                fontWeight: 900,
                lineHeight: 0.95,
                color: UI.text,
                margin: "16px 0 18px",
              }}
            >
              Revisión legal, técnica y de experiencia de usuario.
            </h2>
            <p
              style={{
                fontFamily: FONTS.sans,
                fontSize: 14,
                lineHeight: 1.65,
                color: UI.muted,
                margin: 0,
              }}
            >
              La auditoría cruza políticas, consentimientos, permisos, cookies,
              SDKs, proveedores, retención, seguridad, accesos internos y puntos
              donde el usuario toma decisiones sobre sus datos.
            </p>
          </div>
        </GridCell>

        <GridCell
          style={{
            borderBottom: bd,
            background: UI.panel,
            display: "grid",
            gridTemplateColumns: "4px 1fr",
          }}
        >
          <div style={{ background: UI.muted, opacity: 0.3 }} />
          <div style={{ padding: "44px 40px" }}>
            <Label>Mantenimiento</Label>
            <h2
              style={{
                fontFamily: FONTS.display,
                fontSize: "clamp(1.8rem, 3vw, 3.2rem)",
                fontWeight: 900,
                lineHeight: 0.95,
                color: UI.text,
                margin: "16px 0 18px",
              }}
            >
              El certificado se conserva solo si el producto sigue cumpliendo.
            </h2>
            <p
              style={{
                fontFamily: FONTS.sans,
                fontSize: 14,
                lineHeight: 1.65,
                color: UI.muted,
                margin: 0,
              }}
            >
              Cambios de producto, nuevos proveedores, nuevos flujos de IA o
              modificaciones de política activan revisiones. Así el sello no se
              queda obsoleto justo cuando la empresa más lo necesita.
            </p>
          </div>
        </GridCell>
      </Grid>

      {/* Certificate types */}
      <SectionHeading
        eyebrow="Tipos de certificado"
        title="Tres niveles según madurez, riesgo y exposición pública."
      />

      <Grid columns="thirds" className="cert-types">
        {CERTIFICATES.map((cert, index) => (
          <CertificateTypeCard key={cert.name} cert={cert} index={index} />
        ))}
      </Grid>

      {/* CTA closing */}
      <div
        className="cert-closing"
        style={{
          borderBottom: bd,
          background: UI.bg,
          display: "grid",
          gridTemplateColumns: "1fr auto",
        }}
      >
        <div
          style={{
            borderRight: bd,
            padding: "56px 56px 52px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <Label>Resultado</Label>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(2rem, 4.5vw, 4.8rem)",
              fontWeight: 900,
              lineHeight: 0.95,
              color: UI.text,
              margin: 0,
              maxWidth: 720,
            }}
          >
            Una página pública verificable y un estándar interno que se puede
            sostener.
          </h2>
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 15,
              lineHeight: 1.65,
              color: UI.muted,
              margin: 0,
              maxWidth: 620,
            }}
          >
            El certificado funciona como prueba externa y como sistema interno:
            documenta criterios, evidencias, responsables y fechas de revisión.
          </p>
          <div style={{ paddingTop: 8 }}>
            <Button
              as={Link}
              to="/contacto"
              variant="primary"
              surface="light"
              size="md"
            >
              Hablar con Prometeo
            </Button>
          </div>
        </div>
        <div
          style={{
            background: COLORS.accent,
            width: "min(280px, 25vw)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "32px 28px",
          }}
        >
          <Label>PMT-CERT</Label>
          <CertSeal />
          <Label>Certificación activa</Label>
        </div>
      </div>
    </Page>
  );
}
