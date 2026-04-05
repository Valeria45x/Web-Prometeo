import { B } from "../constants";
import { L } from "../components/Primitives";
import { Page, PageHeader } from "../components/Page";

const levels = [
  {
    name: "Bronce",
    label: "Comprometida",
    bg: undefined,
    items: [
      "Sin dark patterns en avisos de cookies",
      "Política de privacidad con resumen ejecutivo legible",
      "Datos mínimos recogidos por defecto",
      "Auditoría inicial verificada por Prometeo",
    ],
    note: "Renovación anual",
  },
  {
    name: "Plata",
    label: "Avanzada",
    bg: "#0f0f0f",
    items: [
      "Todo lo de Bronce",
      "Privacy by default en todas las configuraciones",
      "Comunicación proactiva sobre uso de datos",
      "Sin terceros sin consentimiento explícito",
      "Auditoría anual con informe accesible",
    ],
    note: "Renovación anual",
  },
  {
    name: "Oro",
    label: "Referente",
    bg: "#141414",
    items: [
      "Todo lo de Plata",
      "Privacy by design en el producto",
      "Transparencia total sobre terceros y sub-encargados",
      "Herramientas de control activo para el usuario",
      "Informe público semestral de prácticas",
      "Auditoría semestral independiente",
    ],
    note: "Renovación semestral",
  },
];

const proceso = [
  { n: "01", title: "Solicitar",  desc: "La empresa envía su candidatura y documentación inicial sobre sus prácticas de privacidad." },
  { n: "02", title: "Auditar",    desc: "El equipo Prometeo evalúa interfaces, políticas y arquitectura de datos frente a los criterios del nivel solicitado." },
  { n: "03", title: "Certificar", desc: "Se emite el sello con su nivel correspondiente. La empresa puede usarlo en producto, web y comunicación." },
  { n: "04", title: "Renovar",    desc: "La certificación no es permanente. La renovación periódica garantiza que el sello refleja cumplimiento real, no solo inicial." },
];

export default function Certificacion() {
  return (
    <Page>
      <PageHeader index="002" title="Certificación" />

      {/* ── Qué es ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        <div style={{ borderRight: B, borderBottom: B, padding: "36px 28px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <L style={{ color: "#444" }}>¿Qué es?</L>
        </div>
        <div style={{ gridColumn: "span 2", borderRight: B, borderBottom: B, background: "#0f0f0f", padding: "40px 36px" }}>
          <h2 className="sub-title" style={{ color: "#d0d0d0", lineHeight: 1.4, marginBottom: 28 }}>
            Un sello de confianza diseñado para ser legible por cualquier persona, sin conocimiento técnico previo.
          </h2>
          <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 13, color: "#666", lineHeight: 1.8, maxWidth: "52ch" }}>
            La mayoría de los sellos de privacidad existentes están orientados a reguladores y auditores. Prometeo opera desde el otro lado: verifica el compromiso real de una empresa y lo traduce en una señal comprensible para el usuario final joven.
          </p>
        </div>
        <div style={{ borderRight: B, borderBottom: B, background: "#0a0a0a", padding: "40px 28px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <L style={{ color: "#333" }}>Modelo B2B2C</L>
          <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 11, color: "#444", lineHeight: 1.7, marginTop: 12 }}>
            Como Fair Trade o B Corp: las empresas obtienen la certificación, los usuarios la reconocen.
          </p>
        </div>
      </div>

      {/* ── El problema que resuelve ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        <div style={{ gridColumn: "span 2", borderRight: B, borderBottom: B, padding: "40px 36px" }}>
          <L style={{ color: "#333", display: "block", marginBottom: 20 }}>El problema</L>
          <h3 className="sub-title" style={{ color: "#888", fontSize: "clamp(1rem,1.8vw,1.6rem)", lineHeight: 1.4 }}>
            El 67% de los usuarios no entiende qué hacen las empresas con sus datos. No por falta de interés, sino por falta de herramientas comprensibles.
          </h3>
        </div>
        <div style={{ gridColumn: "span 2", borderRight: B, borderBottom: B, background: "#111", padding: "40px 36px" }}>
          <L style={{ color: "#444", display: "block", marginBottom: 20 }}>La asimetría de información</L>
          <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 13, color: "#666", lineHeight: 1.8 }}>
            Las plataformas digitales saben todo sobre sus usuarios; los usuarios saben poco sobre las plataformas. Esta brecha no es accidental: se construye mediante decisiones de diseño deliberadas que oscurecen en lugar de clarificar.
          </p>
          <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 11, color: "#444", lineHeight: 1.7, marginTop: 16 }}>
            Fuente: Pew Research Center (2023), Akerlof (1970), sección 4.1.2 investigación Prometeo.
          </p>
        </div>
      </div>

      {/* ── A quién beneficia ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        <div style={{ borderRight: B, borderBottom: B, padding: "28px 24px", display: "flex", alignItems: "center" }}>
          <L>¿A quién beneficia?</L>
        </div>
        <div style={{ gridColumn: "span 3", borderRight: B, borderBottom: B, background: "#0a0a0a", padding: "24px 28px", display: "flex", alignItems: "center" }}>
          <L style={{ color: "#252525" }}>Dos actores. Un sistema.</L>
        </div>

        <div style={{ gridColumn: "span 2", borderRight: B, borderBottom: B, padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 280 }}>
          <div>
            <L style={{ color: "#444", display: "block", marginBottom: 16 }}>Para empresas — B2B</L>
            <h3 className="sub-title" style={{ color: "#d0d0d0", marginBottom: 24 }}>
              Traduce el cumplimiento normativo en compromiso visible.
            </h3>
            <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 13, color: "#666", lineHeight: 1.8 }}>
              Marcas digitales dirigidas a público joven que ya cumplen con el GDPR o la LOPD pero carecen de una herramienta visual que comunique ese esfuerzo al usuario final. El sello Prometeo es esa herramienta.
            </p>
          </div>
          <L style={{ color: "#555" }}>→ Aplicar como empresa</L>
        </div>

        <div style={{ gridColumn: "span 2", borderRight: B, borderBottom: B, background: "#0f0f0f", padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 280 }}>
          <div>
            <L style={{ color: "#444", display: "block", marginBottom: 16 }}>Para usuarios — B2C</L>
            <h3 className="sub-title" style={{ color: "#d0d0d0", marginBottom: 24 }}>
              Una señal que no requiere leer 40 páginas de política de privacidad.
            </h3>
            <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 13, color: "#666", lineHeight: 1.8 }}>
              Jóvenes de 18–25 que identifican prácticas como el seguimiento publicitario pero no disponen de herramientas simples para evaluar la privacidad de los servicios que usan. El sello opera como heurística de confianza.
            </p>
          </div>
          <L style={{ color: "#555" }}>→ Ver qué significa el sello</L>
        </div>
      </div>

      {/* ── Los niveles ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        <div style={{ borderRight: B, borderBottom: B, padding: "28px 24px", display: "flex", alignItems: "center" }}>
          <L>Niveles</L>
        </div>
        <div style={{ gridColumn: "span 3", borderRight: B, borderBottom: B, background: "#0a0a0a", padding: "24px 28px", display: "flex", alignItems: "center" }}>
          <L style={{ color: "#252525" }}>Sistema escalonado con renovación periódica. La certificación no es permanente.</L>
        </div>

        {levels.map((l, i) => (
          <div key={i} style={{ borderRight: B, borderBottom: B, background: l.bg, padding: "40px 32px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 380 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <L style={{ color: "#333" }}>{String(i + 1).padStart(2, "0")}</L>
                <L style={{ color: "#444", fontSize: 10 }}>{l.note}</L>
              </div>
              <h2 className="sub-title" style={{ color: "#e0e0e0", marginBottom: 6 }}>{l.name}.</h2>
              <L style={{ color: "#555", display: "block", marginBottom: 28 }}>{l.label}</L>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {l.items.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ width: 3, height: 3, background: "#444", flexShrink: 0, marginTop: 4 }} />
                    <span style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 11, color: "#555", lineHeight: 1.6, letterSpacing: "0.04em" }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <L style={{ color: "#444", marginTop: 32 }}>→ Aplicar</L>
          </div>
        ))}
        <div style={{ borderRight: B, borderBottom: B, background: "#0a0a0a", padding: "40px 28px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <L style={{ color: "#222" }}>Socios →</L>
        </div>
      </div>

      {/* ── El proceso ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        {proceso.map((p, i) => (
          <div key={i} style={{ borderRight: B, borderBottom: B, background: i === 3 ? "#0f0f0f" : undefined, padding: "40px 32px", minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <L style={{ color: "#333" }}>{p.n}</L>
            <div>
              <h3 className="sub-title" style={{ color: "#d0d0d0", marginBottom: 16 }}>{p.title}.</h3>
              <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 12, color: "#555", lineHeight: 1.7 }}>
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Nota de integridad ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: B }}>
        <div style={{ gridColumn: "span 3", borderRight: B, borderBottom: B, background: "#0f0f0f", padding: "32px 36px" }}>
          <L style={{ color: "#444", display: "block", marginBottom: 12 }}>Sobre la integridad del sistema</L>
          <p style={{ fontFamily: '"Funnel Sans", sans-serif', fontSize: 12, color: "#555", lineHeight: 1.8 }}>
            El riesgo moral post-certificación existe: una empresa puede reducir su nivel de cumplimiento después de obtener el sello si no hay mecanismos de control continuo. Por eso la renovación es obligatoria y la pérdida del sello es pública. La credibilidad del sistema depende de que el sello refleje cumplimiento real, no únicamente cumplimiento inicial.
          </p>
        </div>
        <div style={{ borderRight: B, borderBottom: B, background: "#0a0a0a", padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <L style={{ color: "#252525" }}>Sección 4.1.8 investigación</L>
        </div>
      </div>
    </Page>
  );
}
