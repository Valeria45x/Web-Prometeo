import { B } from "../constants";
import { L } from "../components/Primitives";
import { Page, PageHeader } from "../components/Page";
import GridMeta from "../components/GridMeta";
import RedCell from "../components/RedCell";
import StripeDecor from "../components/StripeDecor";

export default function Certificacion() {
  return (
    <Page>
      <PageHeader index="002" title="Certificación" />

      <GridMeta code="PRO-002" />

      {/* Intro */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderLeft: B,
        }}
      >
        <div
          style={{
            gridColumn: "span 3",
            borderRight: B,
            borderBottom: B,
            padding: "44px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <L style={{ color: "#444" }}>¿Qué es la certificación Prometeo?</L>
          <h2
            className="sub-title"
            style={{ color: "#d0d0d0", lineHeight: 1.4, marginBottom: 20 }}
          >
            Un sello que identifica las webs que respetan de verdad la
            privacidad de sus usuarios.
          </h2>
          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 13,
              color: "#777",
              lineHeight: 1.8,
              maxWidth: "60ch",
            }}
          >
            El banner de cookies está diseñado para que pulses "aceptar todo"
            sin pensar. La certificación Prometeo identifica las webs que han
            elegido hacer lo contrario — donde rechazar es tan fácil como
            aceptar, y donde los términos son comprensibles.
          </p>
        </div>
        <RedCell
          text="CERTIFICACIÓN"
          style={{ borderRight: B, borderBottom: B }}
        />
      </div>

      {/* Niveles de certificación */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          borderLeft: B,
        }}
      >
        {[
          {
            nivel: "Nivel 1 — Transparencia",
            desc: "La web explica con claridad qué datos recoge y para qué. El banner de cookies no usa dark patterns. Rechazar es tan accesible como aceptar.",
          },
          {
            nivel: "Nivel 2 — Control",
            desc: "El usuario puede acceder, modificar y eliminar sus datos en cualquier momento. La web no comparte datos con terceros sin consentimiento explícito.",
          },
          {
            nivel: "Nivel 3 — Referencia",
            desc: "La web adopta el estándar más alto de privacidad disponible. Auditoría anual. Compromiso público con los miembros de Prometeo.",
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              borderRight: index < 2 ? B : undefined,
              borderBottom: B,
              padding: "40px 32px",
              background: index % 2 === 1 ? "#0f0f0f" : undefined,
            }}
          >
            <L style={{ color: "#FF3C54", marginBottom: 18 }}>{item.nivel}</L>
            <p
              style={{
                fontFamily: '"Funnel Sans", sans-serif',
                fontSize: 13,
                color: "#d0d0d0",
                lineHeight: 1.8,
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* El sello */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderLeft: B,
        }}
      >
        <div
          style={{
            borderRight: B,
            borderBottom: B,
            background: "#0a0a0a",
            padding: "44px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <L style={{ color: "#444" }}>El sello en tu web</L>
          <h2
            className="sub-title"
            style={{ color: "#d0d0d0", lineHeight: 1.3, marginBottom: 18 }}
          >
            Visible, verificable, revocable.
          </h2>
          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 13,
              color: "#777",
              lineHeight: 1.8,
            }}
          >
            El sello Prometeo aparece en la esquina inferior derecha de la web
            certificada. Al hacer clic, el usuario puede verificar en tiempo
            real que la certificación está activa y qué nivel tiene. Si la web
            deja de cumplir los requisitos, el sello se retira automáticamente.
          </p>
        </div>
        <div
          style={{
            borderBottom: B,
            background: "#0f0f0f",
            padding: "40px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Sello visual placeholder */}
          <div
            style={{
              width: 120,
              height: 120,
              border: "1px solid #FF3C54",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 7,
                color: "#FF3C54",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              PROMETEO ®
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 6,
                color: "#555",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Certificado · Nivel 1
            </span>
          </div>
        </div>
      </div>

      {/* Proceso */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          borderLeft: B,
        }}
      >
        {[
          {
            label: "01",
            headline: "Solicitar",
            detail:
              "Envía tu web al programa de certificación. Recibirás los criterios de evaluación detallados antes de comenzar.",
          },
          {
            label: "02",
            headline: "Auditar",
            detail:
              "Un revisor de Prometeo analiza el comportamiento real de la web — no solo su política de privacidad.",
          },
          {
            label: "03",
            headline: "Certificar",
            detail:
              "Si cumple los requisitos, la web recibe el sello y aparece en el directorio público de Prometeo.",
          },
          {
            label: "04",
            headline: "Renovar",
            detail:
              "La certificación se revisa anualmente. Las webs que mantienen el estándar renuevan automáticamente.",
          },
        ].map((step, index) => (
          <div
            key={index}
            style={{
              borderRight: B,
              borderBottom: B,
              padding: "36px 30px",
              background: index % 2 === 1 ? "#111" : undefined,
              minHeight: 180,
            }}
          >
            <L style={{ color: "#333", marginBottom: 14 }}>{step.label}</L>
            <h3
              className="sub-title"
              style={{ color: "#d0d0d0", marginBottom: 12 }}
            >
              {step.headline}
            </h3>
            <p
              style={{
                fontFamily: '"Funnel Sans", sans-serif',
                fontSize: 12,
                color: "#777",
                lineHeight: 1.7,
              }}
            >
              {step.detail}
            </p>
          </div>
        ))}
      </div>

      {/* CTA solicitar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderLeft: B,
        }}
      >
        <div
          style={{
            gridColumn: "span 3",
            borderRight: B,
            borderBottom: B,
            padding: "36px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#0a0a0a",
          }}
        >
          <p
            style={{
              fontFamily: '"Funnel Sans", sans-serif',
              fontSize: 13,
              color: "#555",
              lineHeight: 1.7,
              maxWidth: "60ch",
            }}
          >
            ¿Gestionas una web y quieres obtener la certificación Prometeo?
          </p>
          <L style={{ color: "#FF3C54", whiteSpace: "nowrap" }}>
            → Solicitar certificación
          </L>
        </div>
        <RedCell text="PRO-002" style={{ borderRight: B, borderBottom: B }} />
      </div>

      <div style={{ borderLeft: B, borderRight: B }}>
        <StripeDecor />
      </div>
    </Page>
  );
}
