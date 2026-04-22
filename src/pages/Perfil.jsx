import { Page } from "../components/Page";
import { ComunidadProvider, useComunidad } from "../context/ComunidadContext";
import GridMeta from "../components/GridMeta";
import RedCell from "../components/RedCell";
import StripeDecor from "../components/StripeDecor";
import RoleBadge from "../components/comunidad/RoleBadge";
import PostCard from "../components/comunidad/PostCard";
import AuthModal from "../components/comunidad/AuthModal";

const B = "1px solid #303030";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const STAT = ({ label, value }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    <span
      style={{
        fontFamily: "monospace",
        fontSize: 6,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "#C8C8C8",
        opacity: 0.35,
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontFamily: "monospace",
        fontSize: 11,
        fontWeight: 700,
        color: "#C8C8C8",
      }}
    >
      {value}
    </span>
  </div>
);

function PerfilInner() {
  const {
    currentUser,
    posts,
    showAuthModal,
    setShowAuthModal,
    certify,
    confirmEmail,
    pendingUser,
  } = useComunidad();

  const myPosts = currentUser
    ? posts.filter((p) => p.authorId === currentUser.id)
    : [];

  if (!currentUser && !pendingUser) {
    return (
      <Page>
        <div style={{ borderLeft: B }}>
          <GridMeta code="PRO-008" />
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}
          >
            <div
              style={{
                gridColumn: "span 3",
                borderRight: B,
                borderBottom: B,
                padding: "64px 32px",
              }}
            >
              <h1
                style={{
                  fontFamily: "'Funnel Display', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 900,
                  color: "#C8C8C8",
                  lineHeight: 1.2,
                  margin: "0 0 20px",
                }}
              >
                Tu perfil en la comunidad.
              </h1>
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontSize: 14,
                  color: "#C8C8C8",
                  opacity: 0.5,
                  lineHeight: 1.6,
                  margin: "0 0 28px",
                }}
              >
                Únete para participar, seguir hilos y obtener tu certificación
                de privacidad digital.
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                style={{
                  background: "#FF3C54",
                  color: "#0A0A0A",
                  border: "none",
                  padding: "12px 28px",
                  fontFamily: "monospace",
                  fontSize: 8,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                }}
              >
                Acceder / Registrarse
              </button>
            </div>
            <RedCell text="PERFIL" style={{ borderBottom: B }} />
          </div>
          <StripeDecor />
        </div>
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </Page>
    );
  }

  // Pending email confirmation state
  if (pendingUser && !currentUser) {
    return (
      <Page>
        <div style={{ borderLeft: B }}>
          <GridMeta code="PRO-008" />
          <div style={{ padding: "48px 32px", borderBottom: B }}>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: 7,
                color: "#FF3C54",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 16,
              }}
            >
              Confirma tu email
            </p>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontSize: 14,
                color: "#C8C8C8",
                opacity: 0.6,
                marginBottom: 24,
              }}
            >
              Email enviado a{" "}
              <strong style={{ color: "#C8C8C8" }}>{pendingUser.email}</strong>.
              En esta demo, confirma directamente:
            </p>
            <button
              onClick={confirmEmail}
              style={{
                background: "#FF3C54",
                color: "#0A0A0A",
                border: "none",
                padding: "12px 28px",
                fontFamily: "monospace",
                fontSize: 8,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                cursor: "pointer",
              }}
            >
              Confirmar email
            </button>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div style={{ borderLeft: B }}>
        <GridMeta code="PRO-008" />

        {/* Profile header */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div
            style={{
              gridColumn: "span 3",
              borderRight: B,
              borderBottom: B,
              padding: "40px 32px",
            }}
          >
            {/* Email not verified warning */}
            {!currentUser.emailVerified && (
              <div
                style={{
                  borderLeft: "3px solid #FF3C54",
                  paddingLeft: 12,
                  marginBottom: 20,
                }}
              >
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: 7,
                    color: "#FF3C54",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    margin: "0 0 8px",
                  }}
                >
                  Email sin confirmar
                </p>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontSize: 13,
                    color: "#C8C8C8",
                    opacity: 0.6,
                    margin: "0 0 12px",
                  }}
                >
                  Confirma tu email para poder publicar en la comunidad.
                </p>
                <button
                  onClick={confirmEmail}
                  style={{
                    background: "none",
                    border: "1px solid #FF3C54",
                    color: "#FF3C54",
                    padding: "6px 16px",
                    fontFamily: "monospace",
                    fontSize: 7,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                  }}
                >
                  Confirmar email (demo)
                </button>
              </div>
            )}

            {/* Name + handle + badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 24,
              }}
            >
              <h1
                style={{
                  fontFamily: "'Funnel Display', sans-serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  fontWeight: 900,
                  color: "#C8C8C8",
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                {currentUser.displayName}
              </h1>
              <RoleBadge role={currentUser.role} />
            </div>

            <p
              style={{
                fontFamily: "monospace",
                fontSize: 9,
                color: "#C8C8C8",
                opacity: 0.4,
                margin: "0 0 28px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              @{currentUser.handle}
            </p>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              <STAT
                label="Miembro desde"
                value={formatDate(currentUser.joinedAt)}
              />
              {currentUser.certifiedAt && (
                <STAT
                  label="Certificado el"
                  value={formatDate(currentUser.certifiedAt)}
                />
              )}
              <STAT label="Hilos publicados" value={myPosts.length} />
              <STAT
                label="Hilos guardados"
                value={currentUser.savedPosts?.length || 0}
              />
            </div>
          </div>

          {/* RedCell — span 1 */}
          <RedCell
            text={
              currentUser.role === "prometeo_team"
                ? "TEAM"
                : currentUser.role === "certificado" ||
                    currentUser.role === "experto"
                  ? "CERT."
                  : "PERFIL"
            }
            style={{ borderBottom: B }}
          />
        </div>

        {/* Certification CTA */}
        {currentUser.role === "miembro" && currentUser.emailVerified && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderBottom: B,
            }}
          >
            <div
              style={{
                gridColumn: "span 4",
                padding: "24px 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: 8,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#C8C8C8",
                    margin: "0 0 6px",
                  }}
                >
                  Certificación Prometeo
                </p>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontSize: 13,
                    color: "#C8C8C8",
                    opacity: 0.5,
                    margin: 0,
                  }}
                >
                  Completa la certificación de privacidad digital y obtén tu
                  badge de miembro certificado.
                </p>
              </div>
              <button
                onClick={certify}
                style={{
                  background: "#FF3C54",
                  color: "#0A0A0A",
                  border: "none",
                  padding: "10px 24px",
                  fontFamily: "monospace",
                  fontSize: 7,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                Certificarme (demo)
              </button>
            </div>
          </div>
        )}

        {/* Certified confirmation */}
        {(currentUser.role === "certificado" ||
          currentUser.role === "experto") && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderBottom: B,
            }}
          >
            <div
              style={{
                gridColumn: "span 4",
                padding: "16px 32px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 7,
                  color: "#C8C8C8",
                  opacity: 0.35,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                ✓ Certificado en privacidad digital —{" "}
                {formatDate(currentUser.certifiedAt)}
              </span>
            </div>
          </div>
        )}

        <StripeDecor />

        {/* User's posts */}
        <div style={{ borderBottom: B, padding: "16px 24px" }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#C8C8C8",
            }}
          >
            Mis hilos <span style={{ color: "#FF3C54" }}>{myPosts.length}</span>
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {myPosts.length === 0 ? (
            <div
              style={{
                gridColumn: "span 4",
                padding: "48px 32px",
                borderBottom: B,
              }}
            >
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: 8,
                  color: "#C8C8C8",
                  opacity: 0.25,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  margin: 0,
                }}
              >
                Todavía no has publicado ningún hilo.
              </p>
            </div>
          ) : (
            myPosts.map((post) => (
              <PostCard key={post.id} post={post} span={2} />
            ))
          )}
        </div>

        <StripeDecor />
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </Page>
  );
}

export default function Perfil() {
  return (
    <ComunidadProvider>
      <PerfilInner />
    </ComunidadProvider>
  );
}
