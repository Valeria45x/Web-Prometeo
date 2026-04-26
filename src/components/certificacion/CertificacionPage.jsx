import { Link } from "react-router-dom";
import { Page } from "../Page";
import HeroTransitionGrid from "../HeroTransitionGrid";
import Button from "../system/Button";
import { Grid, GridCell } from "../system/Grid";
import { BORDERS, COLORS, FONTS } from "../../design/tokens";

const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };
const UI = {
  bg: COLORS.canvasLight,
  panel: "#f7f7f7",
  text: COLORS.textOnLight,
  muted: COLORS.textMutedLight,
};

const BENEFITS = [{ icon: "01" }, { icon: "02" }, { icon: "03" }, { icon: "04" }];
const PROCESS = [{ step: "01" }, { step: "02" }, { step: "03" }, { step: "04" }, { step: "05" }];
const CERTIFICATES = [
  { name: "Essential", level: "Nivel 1", recommended: false },
  { name: "Verified", level: "Nivel 2", recommended: true },
  { name: "Continuous", level: "Nivel 3", recommended: false },
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

function TextBlock({ width = "100%", height = 16, opacity = 0.12, style }) {
  return (
    <div
      style={{
        height,
        width,
        background: UI.text,
        opacity,
        borderRadius: 2,
        ...style,
      }}
    />
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
          inset: 14,
          borderRadius: "50%",
          border: `1px solid ${COLORS.footerText}`,
          opacity: 0.5,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, zIndex: 1 }}>
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
        minHeight: "var(--prometeo-hero-height)",
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
        }}
      >
        <Label>Certificado verificable</Label>
        <Label>PMT-CERT</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <CertSeal />
      </div>
      <div style={{ borderTop: bd, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 6 }}>
        <Label>Estado activo</Label>
        <TextBlock width="60%" height={14} opacity={0.25} />
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow }) {
  return (
    <div
      style={{
        borderBottom: bd,
        padding: "48px 48px 44px",
        background: UI.bg,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <Label>{eyebrow}</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <TextBlock width="75%" height={40} opacity={0.1} />
        <TextBlock width="50%" height={40} opacity={0.1} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
        <TextBlock width="80%" height={12} opacity={0.07} />
        <TextBlock width="65%" height={12} opacity={0.07} />
      </div>
    </div>
  );
}

function BenefitCard({ icon, index }) {
  const isEven = index % 2 === 0;
  return (
    <GridCell
      style={{
        borderRight: isEven ? bd : "none",
        borderBottom: bd,
        background: UI.bg,
        display: "grid",
        gridTemplateColumns: "4px 1fr",
      }}
    >
      <div style={{ background: COLORS.accent, opacity: 0.15 + index * 0.2 }} />
      <div style={{ padding: "40px 36px 36px", display: "flex", flexDirection: "column", gap: 16 }}>
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: 48,
            fontWeight: 900,
            lineHeight: 1,
            color: UI.panel,
          }}
        >
          {icon}
        </span>
        <TextBlock width="70%" height={22} opacity={0.12} />
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <TextBlock height={10} opacity={0.07} />
          <TextBlock height={10} opacity={0.07} />
          <TextBlock width="60%" height={10} opacity={0.07} />
        </div>
      </div>
    </GridCell>
  );
}

function ProcessCard({ item, index, total }) {
  const isLast = index === total - 1;
  return (
    <div
      style={{
        borderBottom: bd,
        display: "grid",
        gridTemplateColumns: "80px minmax(0, 1fr)",
        background: index % 2 === 0 ? UI.bg : UI.panel,
      }}
    >
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
      <div style={{ padding: "32px 40px", display: "flex", flexDirection: "column", gap: 12 }}>
        <TextBlock width="40%" height={22} opacity={0.12} />
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <TextBlock height={10} opacity={0.07} />
          <TextBlock width="80%" height={10} opacity={0.07} />
        </div>
      </div>
    </div>
  );
}

function CertificateTypeCard({ cert, index }) {
  return (
    <GridCell
      style={{
        borderRight: index < CERTIFICATES.length - 1 ? bd : "none",
        borderBottom: bd,
        background: cert.recommended ? UI.text : UI.bg,
        minHeight: 320,
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <div style={{ height: 4, background: cert.recommended ? COLORS.accent : "transparent" }} />
      <div style={{ padding: "32px 36px", display: "flex", flexDirection: "column", gap: 14 }}>
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
        <TextBlock
          width="80%"
          height={12}
          opacity={cert.recommended ? 0.3 : 0.08}
        />
        <TextBlock
          width="60%"
          height={12}
          opacity={cert.recommended ? 0.3 : 0.08}
        />
      </div>
      <div
        style={{
          borderTop: cert.recommended ? "1px solid rgba(255,255,255,0.12)" : bd,
          padding: "20px 36px",
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <TextBlock height={9} opacity={cert.recommended ? 0.2 : 0.07} />
        <TextBlock width="70%" height={9} opacity={cert.recommended ? 0.2 : 0.07} />
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
            padding: "72px 56px 64px",
            background: UI.bg,
            minHeight: "var(--prometeo-hero-height)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 40,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Label>002 — Certificación Prometeo para empresas</Label>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <TextBlock width="85%" height={56} opacity={0.1} />
              <TextBlock width="65%" height={56} opacity={0.1} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
              <TextBlock width="90%" height={13} opacity={0.07} />
              <TextBlock width="75%" height={13} opacity={0.07} />
              <TextBlock width="55%" height={13} opacity={0.07} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", gap: 40 }}>
              {[
                { value: "3", label: "Niveles" },
                { value: "5", label: "Fases" },
                { value: "∞", label: "Mantenimiento" },
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
              <Button as={Link} to="/contacto" variant="primary" surface="light" size="md">
                Solicitar evaluación
              </Button>
              <Button as={Link} to="/comunidad" variant="outline" surface="light" size="md">
                Ver comunidad
              </Button>
            </div>
          </div>
        </GridCell>

        <GridCell className="cert-hero__visual">
          <CertificateVisual />
        </GridCell>
      </Grid>

      <HeroTransitionGrid background={UI.bg} border={bd} />

      {/* Benefits */}
      <SectionHeading eyebrow="Cómo ayuda a empresas" />
      <Grid columns="halves" className="cert-benefits">
        {BENEFITS.map((b, i) => (
          <BenefitCard key={b.icon} icon={b.icon} index={i} />
        ))}
      </Grid>

      {/* Process */}
      <SectionHeading eyebrow="Proceso" />
      <section style={{ background: UI.bg }}>
        {PROCESS.map((item, i) => (
          <ProcessCard key={item.step} item={item} index={i} total={PROCESS.length} />
        ))}
      </section>

      {/* Audit + Maintenance */}
      <Grid columns="halves">
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
          <div style={{ padding: "44px 40px", display: "flex", flexDirection: "column", gap: 16 }}>
            <Label>Auditoría</Label>
            <TextBlock width="75%" height={28} opacity={0.1} />
            <TextBlock width="55%" height={28} opacity={0.1} />
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 4 }}>
              <TextBlock height={10} opacity={0.07} />
              <TextBlock height={10} opacity={0.07} />
              <TextBlock width="70%" height={10} opacity={0.07} />
            </div>
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
          <div style={{ padding: "44px 40px", display: "flex", flexDirection: "column", gap: 16 }}>
            <Label>Mantenimiento</Label>
            <TextBlock width="75%" height={28} opacity={0.1} />
            <TextBlock width="55%" height={28} opacity={0.1} />
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 4 }}>
              <TextBlock height={10} opacity={0.07} />
              <TextBlock height={10} opacity={0.07} />
              <TextBlock width="70%" height={10} opacity={0.07} />
            </div>
          </div>
        </GridCell>
      </Grid>

      {/* Certificate types */}
      <SectionHeading eyebrow="Tipos de certificado" />
      <Grid columns="thirds">
        {CERTIFICATES.map((cert, i) => (
          <CertificateTypeCard key={cert.name} cert={cert} index={i} />
        ))}
      </Grid>

      {/* CTA closing */}
      <div
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
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <TextBlock width="80%" height={48} opacity={0.1} />
            <TextBlock width="60%" height={48} opacity={0.1} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 4 }}>
            <TextBlock width="85%" height={11} opacity={0.07} />
            <TextBlock width="65%" height={11} opacity={0.07} />
          </div>
          <div style={{ paddingTop: 8 }}>
            <Button as={Link} to="/contacto" variant="primary" surface="light" size="md">
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
