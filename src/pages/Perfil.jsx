import AuthModal from "../components/comunidad/AuthModal";
import PostCard from "../components/comunidad/PostCard";
import RoleBadge from "../components/comunidad/RoleBadge";
import GridMeta from "../components/GridMeta";
import { Page } from "../components/Page";
import RedCell from "../components/RedCell";
import StripeDecor from "../components/StripeDecor";
import Button from "../components/system/Button";
import { Grid, GridCell } from "../components/system/Grid";
import { useComunidad } from "../context/ComunidadContext";

const B = "1px solid #303030";

function formatDate(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function Stat({ label, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span
        style={{
          fontFamily: "monospace",
          fontSize: 6,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#c8c8c8",
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
          color: "#c8c8c8",
        }}
      >
        {value}
      </span>
    </div>
  );
}

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
    ? posts.filter((post) => post.authorId === currentUser.id)
    : [];

  if (!currentUser && !pendingUser) {
    return (
      <Page>
        <div style={{ borderLeft: B }}>
          <GridMeta code="PRO-008" />
          <Grid columns="site">
            <GridCell
              span={3}
              collapseSpanOnTablet
              collapseSpanOnMobile
              style={{
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
                  color: "#c8c8c8",
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
                  color: "#c8c8c8",
                  opacity: 0.5,
                  lineHeight: 1.6,
                  margin: "0 0 28px",
                }}
              >
                Unete para participar, seguir hilos y obtener tu certificacion
                de privacidad digital.
              </p>
              <Button
                variant="primary"
                surface="dark"
                emphasis="accent"
                size="sm"
                font="mono"
                onClick={() => setShowAuthModal(true)}
              >
                Acceder / Registrarse
              </Button>
            </GridCell>
            <RedCell text="PERFIL" style={{ borderBottom: B }} />
          </Grid>
          <StripeDecor />
        </div>
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </Page>
    );
  }

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
                color: "#ff3c54",
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
                color: "#c8c8c8",
                opacity: 0.6,
                marginBottom: 24,
              }}
            >
              Email enviado a{" "}
              <strong style={{ color: "#c8c8c8" }}>{pendingUser.email}</strong>.
              En esta demo, confirma directamente:
            </p>
            <Button
              variant="primary"
              surface="dark"
              emphasis="accent"
              size="sm"
              font="mono"
              onClick={confirmEmail}
            >
              Confirmar email
            </Button>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div style={{ borderLeft: B }}>
        <GridMeta code="PRO-008" />

        <Grid columns="site">
          <GridCell
            span={3}
            collapseSpanOnTablet
            collapseSpanOnMobile
            style={{
              borderRight: B,
              borderBottom: B,
              padding: "40px 32px",
            }}
          >
            {!currentUser.emailVerified && (
              <div
                style={{
                  borderLeft: "3px solid #ff3c54",
                  paddingLeft: 12,
                  marginBottom: 20,
                }}
              >
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: 7,
                    color: "#ff3c54",
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
                    color: "#c8c8c8",
                    opacity: 0.6,
                    margin: "0 0 12px",
                  }}
                >
                  Confirma tu email para poder publicar en la comunidad.
                </p>
                <Button
                  variant="outline"
                  surface="dark"
                  emphasis="accent"
                  size="xs"
                  font="mono"
                  onClick={confirmEmail}
                >
                  Confirmar email (demo)
                </Button>
              </div>
            )}

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
                  color: "#c8c8c8",
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
                color: "#c8c8c8",
                opacity: 0.4,
                margin: "0 0 28px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              @{currentUser.handle}
            </p>

            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              <Stat label="Miembro desde" value={formatDate(currentUser.joinedAt)} />
              {currentUser.certifiedAt && (
                <Stat
                  label="Certificado el"
                  value={formatDate(currentUser.certifiedAt)}
                />
              )}
              <Stat label="Hilos publicados" value={myPosts.length} />
              <Stat
                label="Hilos guardados"
                value={currentUser.savedPosts?.length || 0}
              />
            </div>
          </GridCell>

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
        </Grid>

        {currentUser.role === "miembro" && currentUser.emailVerified && (
          <Grid columns="site" style={{ borderBottom: B }}>
            <GridCell
              span={4}
              collapseSpanOnTablet
              collapseSpanOnMobile
              style={{
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
                    color: "#c8c8c8",
                    margin: "0 0 6px",
                  }}
                >
                  Certificacion Prometeo
                </p>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontSize: 13,
                    color: "#c8c8c8",
                    opacity: 0.5,
                    margin: 0,
                  }}
                >
                  Completa la certificacion de privacidad digital y obten tu
                  badge de miembro certificado.
                </p>
              </div>
              <Button
                variant="primary"
                surface="dark"
                emphasis="accent"
                size="sm"
                font="mono"
                onClick={certify}
              >
                Certificarme (demo)
              </Button>
            </GridCell>
          </Grid>
        )}

        {(currentUser.role === "certificado" ||
          currentUser.role === "experto") && (
          <Grid columns="site" style={{ borderBottom: B }}>
            <GridCell
              span={4}
              collapseSpanOnTablet
              collapseSpanOnMobile
              style={{
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
                  color: "#c8c8c8",
                  opacity: 0.35,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Certificado en privacidad digital -{" "}
                {formatDate(currentUser.certifiedAt)}
              </span>
            </GridCell>
          </Grid>
        )}

        <StripeDecor />

        <div style={{ borderBottom: B, padding: "16px 24px" }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#c8c8c8",
            }}
          >
            Mis hilos <span style={{ color: "#ff3c54" }}>{myPosts.length}</span>
          </span>
        </div>

        <Grid columns="site">
          {myPosts.length === 0 ? (
            <GridCell
              span={4}
              collapseSpanOnTablet
              collapseSpanOnMobile
              style={{
                padding: "48px 32px",
                borderBottom: B,
              }}
            >
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: 8,
                  color: "#c8c8c8",
                  opacity: 0.25,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  margin: 0,
                }}
              >
                Todavia no has publicado ningun hilo.
              </p>
            </GridCell>
          ) : (
            myPosts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </Grid>

        <StripeDecor />
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </Page>
  );
}

export default function Perfil() {
  return <PerfilInner />;
}
