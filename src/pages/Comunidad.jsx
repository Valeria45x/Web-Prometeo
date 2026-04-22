import { useState, useMemo } from "react";
import { Page } from "../components/Page";
import { ComunidadProvider, useComunidad } from "../context/ComunidadContext";
import GridMeta from "../components/GridMeta";
import RedCell from "../components/RedCell";
import StripeDecor from "../components/StripeDecor";
import FilterBar from "../components/comunidad/FilterBar";
import PostCard from "../components/comunidad/PostCard";
import AuthModal from "../components/comunidad/AuthModal";
import NewPostOverlay from "../components/comunidad/NewPostOverlay";

const B = "1px solid #303030";

function ComunidadInner() {
  const { currentUser, posts, showAuthModal, setShowAuthModal, logout } =
    useComunidad();
  const [activeTag, setActiveTag] = useState(null);
  const [sort, setSort] = useState("reciente");
  const [showNew, setShowNew] = useState(false);

  const filtered = useMemo(() => {
    let list = activeTag
      ? posts.filter((p) => p.tags.includes(activeTag))
      : posts;

    if (sort === "upvotes") {
      list = [...list].sort((a, b) => b.upvotes - a.upvotes);
    } else {
      list = [...list].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    }
    return list;
  }, [posts, activeTag, sort]);

  return (
    <Page>
      {/* ── Header section ─────────────────────────────────────────── */}
      <div style={{ borderLeft: B }}>
        <GridMeta code="PRO-006" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {/* Title cell — span 3 */}
          <div
            style={{
              gridColumn: "span 3",
              borderRight: B,
              borderBottom: B,
              padding: "48px 32px 36px",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 7,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#FF3C54",
                display: "block",
                marginBottom: 16,
              }}
            >
              006 — Comunidad
            </span>
            <h1
              style={{
                fontFamily: "'Funnel Display', sans-serif",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 900,
                color: "#C8C8C8",
                lineHeight: 1.1,
                margin: "0 0 16px",
              }}
            >
              El conocimiento
              <br />
              no se guarda. Se pasa.
            </h1>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontSize: 14,
                color: "#C8C8C8",
                opacity: 0.5,
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 520,
              }}
            >
              Foro de privacidad digital. Preguntas, respuestas, recursos.
              Prometeo es el anfitrión — la comunidad es el protagonista.
            </p>
          </div>

          {/* RedCell — span 1 */}
          <RedCell text="FORO" style={{ borderBottom: B, minHeight: 180 }} />
        </div>

        {/* Actions bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderBottom: B,
          }}
        >
          <div
            style={{
              gridColumn: "span 3",
              borderRight: B,
              padding: "12px 24px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            {currentUser ? (
              <>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 7,
                    color: "#C8C8C8",
                    opacity: 0.5,
                  }}
                >
                  @{currentUser.handle}
                </span>
                <button
                  onClick={() => setShowNew(true)}
                  style={{
                    background: "#FF3C54",
                    color: "#0A0A0A",
                    border: "none",
                    padding: "8px 20px",
                    fontFamily: "monospace",
                    fontSize: 7,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                  }}
                >
                  + Nuevo hilo
                </button>
                <button
                  onClick={logout}
                  style={{
                    background: "none",
                    border: B,
                    color: "#C8C8C8",
                    padding: "8px 16px",
                    fontFamily: "monospace",
                    fontSize: 7,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    cursor: "pointer",
                  }}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontSize: 13,
                    color: "#C8C8C8",
                    opacity: 0.5,
                    margin: 0,
                  }}
                >
                  Únete para participar en la conversación.
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  style={{
                    background: "#FF3C54",
                    color: "#0A0A0A",
                    border: "none",
                    padding: "8px 20px",
                    fontFamily: "monospace",
                    fontSize: 7,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                  }}
                >
                  Unirse
                </button>
              </>
            )}
          </div>
          <div
            style={{
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 7,
                color: "#C8C8C8",
                opacity: 0.3,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {filtered.length} hilos
            </span>
          </div>
        </div>

        {/* Filter bar */}
        <FilterBar
          activeTag={activeTag}
          onTagChange={setActiveTag}
          sort={sort}
          onSortChange={setSort}
        />

        {/* Feed grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {filtered.length === 0 ? (
            <div
              style={{
                gridColumn: "span 4",
                padding: "64px 32px",
                borderBottom: B,
                textAlign: "center",
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
                Sin hilos en esta categoría.
              </p>
            </div>
          ) : (
            filtered.map((post) => (
              <PostCard key={post.id} post={post} span={2} />
            ))
          )}
        </div>

        {/* Footer stripe */}
        <StripeDecor />
      </div>

      {/* Modals */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showNew && (
        <NewPostOverlay
          onClose={() => setShowNew(false)}
          onCreated={() => setSort("reciente")}
        />
      )}
    </Page>
  );
}

export default function Comunidad() {
  return (
    <ComunidadProvider>
      <ComunidadInner />
    </ComunidadProvider>
  );
}
