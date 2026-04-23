import { useState, useMemo } from "react";
import { Page } from "../components/Page";
import { ComunidadProvider, useComunidad } from "../context/ComunidadContext";
import { TAGS } from "../data/comunidad";
import { TH } from "../constants";
import PostCard from "../components/comunidad/PostCard";
import AuthModal from "../components/comunidad/AuthModal";
import NewPostOverlay from "../components/comunidad/NewPostOverlay";

const BD = "1px solid #303030";
const BL = "1px solid #EBEBEB";
const MONO = { fontFamily: "monospace" };

function ComunidadInner() {
  const { currentUser, posts, showAuthModal, setShowAuthModal, logout } =
    useComunidad();
  const [activeTag, setActiveTag] = useState(null);
  const [sort, setSort] = useState("reciente");
  const [query, setQuery] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [visible, setVisible] = useState(8);

  const filtered = useMemo(() => {
    setVisible(8);
    const q = query.trim().toLowerCase();
    let list = posts.filter((p) => {
      const matchTag = activeTag ? p.tags.includes(activeTag) : true;
      const matchQuery = q
        ? p.title.toLowerCase().includes(q) ||
          p.body.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        : true;
      return matchTag && matchQuery;
    });
    if (sort === "upvotes")
      list = [...list].sort((a, b) => b.upvotes - a.upvotes);
    else
      list = [...list].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    return list;
  }, [posts, activeTag, sort, query]);

  const totalVotes = posts.reduce((s, p) => s + p.upvotes, 0);
  const solvedCount = posts.filter((p) => p.isSolved).length;

  return (
    <Page light>
      {/* ── HERO — dark, 4-col grid ────────────────────────────────────── */}
      <section
        style={{
          background: "#0a0a0a",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {/* Main hero content — 3 cols */}
        <div
          style={{
            gridColumn: "span 3",
            borderRight: BD,
            padding: "60px 48px 56px",
            display: "flex",
            flexDirection: "column",
            gap: 44,
          }}
        >
          <div>
            <h1
              className="section-title"
              style={{ color: "#c8c8c8", lineHeight: 1.05, margin: "0 0 20px" }}
            >
              La privacidad digital,{" "}
              <span style={{ color: "#FF3C54" }}>discutida.</span>
            </h1>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontSize: 17,
                color: "#c8c8c8",
                opacity: 0.5,
                lineHeight: 1.65,
                margin: 0,
                maxWidth: "56ch",
              }}
            >
              Pregunta, responde y aprende con la comunidad Prometeo. Cada hilo
              es una conversación que importa.
            </p>
          </div>

          {/* Search bar */}
          <div
            style={{
              border: BD,
              display: "flex",
              alignItems: "center",
              height: 60,
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <span
              style={{
                ...MONO,
                fontSize: 16,
                color: "#C8C8C8",
                opacity: 0.2,
                padding: "0 22px",
                flexShrink: 0,
                userSelect: "none",
              }}
            >
              /
            </span>
            <input
              type="text"
              placeholder="Buscar hilos, temas, etiquetas..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                fontFamily: "'Funnel Sans', sans-serif",
                fontSize: 17,
                color: "#c8c8c8",
                caretColor: "#FF3C54",
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{
                  ...MONO,
                  fontSize: 9,
                  background: "none",
                  border: "none",
                  color: "#C8C8C8",
                  opacity: 0.35,
                  cursor: "pointer",
                  padding: "0 20px",
                  flexShrink: 0,
                  transition: "opacity 0.12s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
              >
                ✕ limpiar
              </button>
            )}
            <div
              style={{
                borderLeft: BD,
                height: "100%",
                display: "flex",
                alignItems: "center",
                padding: "0 24px",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  ...MONO,
                  fontSize: 9,
                  color: "#C8C8C8",
                  opacity: 0.3,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Buscar
              </span>
            </div>
          </div>
        </div>

        {/* Right col — stats + CTA */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ borderBottom: BD, padding: "32px 28px", flex: 1 }}>
            <div
              style={{
                ...MONO,
                fontSize: 9,
                color: "#C8C8C8",
                opacity: 0.4,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 10,
              }}
            >
              Hilos resueltos
            </div>
            <div
              style={{
                fontFamily: "'Funnel Display', sans-serif",
                fontSize: 40,
                fontWeight: 900,
                color: "#FF3C54",
                lineHeight: 1,
              }}
            >
              {solvedCount}
            </div>
          </div>
          <div style={{ borderBottom: BD, padding: "32px 28px", flex: 1 }}>
            <div
              style={{
                ...MONO,
                fontSize: 9,
                color: "#C8C8C8",
                opacity: 0.4,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 10,
              }}
            >
              Votos totales
            </div>
            <div
              style={{
                fontFamily: "'Funnel Display', sans-serif",
                fontSize: 40,
                fontWeight: 900,
                color: "#c8c8c8",
                lineHeight: 1,
              }}
            >
              {totalVotes}
            </div>
          </div>
          <div
            style={{
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {currentUser ? (
              <>
                <button
                  onClick={() => setShowNew(true)}
                  style={{
                    ...MONO,
                    width: "100%",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    background: "#FF3C54",
                    color: "#0A0A0A",
                    border: "none",
                    cursor: "pointer",
                    padding: "14px 20px",
                    transition: "opacity 0.12s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  + Nuevo hilo
                </button>
                <button
                  onClick={logout}
                  style={{
                    ...MONO,
                    width: "100%",
                    fontSize: 9,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    background: "none",
                    border: "none",
                    color: "#C8C8C8",
                    opacity: 0.3,
                    cursor: "pointer",
                    padding: "8px 0",
                    transition: "opacity 0.12s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
                >
                  Salir
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                style={{
                  ...MONO,
                  width: "100%",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  background: "none",
                  border: "1px solid #FF3C54",
                  color: "#FF3C54",
                  cursor: "pointer",
                  padding: "14px 20px",
                  transition: "background 0.12s, color 0.12s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#FF3C54";
                  e.currentTarget.style.color = "#0A0A0A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.color = "#FF3C54";
                }}
              >
                Acceder
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Light content area ─────────────────────────────────────────── */}
      <div style={{ background: "#FFFFFF" }}>
        {/* ── FILTER BAR — sticky ──────────────────────────────────────── */}
        <div
          style={{
            position: "sticky",
            top: TH,
            zIndex: 10,
            background: "#FAFAFA",
            borderBottom: BL,
            display: "flex",
            alignItems: "center",
            height: 44,
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              padding: "0 20px",
              gap: 2,
              height: "100%",
            }}
          >
            <button
              onClick={() => setActiveTag(null)}
              style={{
                ...MONO,
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                background: "none",
                border: "none",
                color: activeTag === null ? "#FF3C54" : "#0A0A0A",
                opacity: activeTag === null ? 1 : 0.4,
                fontWeight: activeTag === null ? 700 : 400,
                cursor: "pointer",
                padding: "6px 12px",
                whiteSpace: "nowrap",
                transition: "opacity 0.12s, color 0.12s",
              }}
            >
              Todos
            </button>
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                style={{
                  ...MONO,
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  background: "none",
                  border: "none",
                  color: activeTag === tag ? "#FF3C54" : "#0A0A0A",
                  opacity: activeTag === tag ? 1 : 0.4,
                  fontWeight: activeTag === tag ? 700 : 400,
                  cursor: "pointer",
                  padding: "6px 12px",
                  whiteSpace: "nowrap",
                  transition: "opacity 0.12s, color 0.12s",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              flexShrink: 0,
              borderLeft: BL,
            }}
          >
            {[
              ["reciente", "Reciente"],
              ["upvotes", "Populares"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setSort(id)}
                style={{
                  ...MONO,
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  background: "none",
                  border: "none",
                  borderRight: BL,
                  color: sort === id ? "#FF3C54" : "#0A0A0A",
                  opacity: sort === id ? 1 : 0.4,
                  fontWeight: sort === id ? 700 : 400,
                  cursor: "pointer",
                  padding: "0 20px",
                  height: "100%",
                  transition: "opacity 0.12s, color 0.12s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── COUNT LINE ───────────────────────────────────────────────── */}
        <div
          style={{
            borderBottom: BL,
            padding: "0 32px",
            height: 32,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              ...MONO,
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#0A0A0A",
              opacity: 0.3,
            }}
          >
            {filtered.length} {filtered.length === 1 ? "hilo" : "hilos"}
            {activeTag && ` · ${activeTag}`}
            {query && ` · "${query}"`}
          </span>
        </div>

        {/* ── THREAD GRID ──────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div style={{ padding: "64px 48px 72px", borderBottom: BL }}>
            <p
              style={{
                ...MONO,
                fontSize: 11,
                color: "#0A0A0A",
                opacity: 0.3,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                margin: "0 0 24px",
              }}
            >
              Sin hilos{query ? ` para "${query}"` : " en esta categoría"}.
            </p>
            {(query || activeTag) && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <span
                  style={{
                    ...MONO,
                    fontSize: 9,
                    color: "#0A0A0A",
                    opacity: 0.3,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Prueba con:
                </span>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {TAGS.filter((t) => t !== activeTag)
                    .slice(0, 5)
                    .map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setActiveTag(tag);
                          setQuery("");
                        }}
                        style={{
                          ...MONO,
                          fontSize: 9,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          background: "none",
                          border: "1px solid #D0D0D0",
                          color: "#0A0A0A",
                          cursor: "pointer",
                          padding: "6px 14px",
                          transition: "border-color 0.12s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.borderColor = "#0A0A0A")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.borderColor = "#D0D0D0")
                        }
                      >
                        {tag}
                      </button>
                    ))}
                  <button
                    onClick={() => {
                      setActiveTag(null);
                      setQuery("");
                    }}
                    style={{
                      ...MONO,
                      fontSize: 9,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      background: "#0A0A0A",
                      border: "1px solid #0A0A0A",
                      color: "#FFFFFF",
                      cursor: "pointer",
                      padding: "6px 14px",
                    }}
                  >
                    Ver todos
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Featured: first post — full width, larger */}
            <PostCard post={filtered[0]} query={query} featured />

            {/* 2-column grid for remaining posts */}
            {filtered.slice(1, visible).length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                {filtered.slice(1, visible).map((post, i) => (
                  <div
                    key={post.id}
                    style={{ borderRight: i % 2 === 0 ? BL : "none" }}
                  >
                    <PostCard post={post} query={query} />
                  </div>
                ))}
              </div>
            )}

            {/* Load more */}
            {visible < filtered.length && (
              <div
                style={{
                  borderTop: BL,
                  padding: "24px 32px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <button
                  onClick={() => setVisible((v) => v + 8)}
                  style={{
                    ...MONO,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    background: "none",
                    border: "1px solid #D0D0D0",
                    color: "#0A0A0A",
                    cursor: "pointer",
                    padding: "10px 24px",
                    transition: "border-color 0.12s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#0A0A0A")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#D0D0D0")
                  }
                >
                  Cargar más
                </button>
                <span
                  style={{
                    ...MONO,
                    fontSize: 9,
                    color: "#0A0A0A",
                    opacity: 0.3,
                  }}
                >
                  {visible} de {filtered.length}
                </span>
              </div>
            )}
          </>
        )}
      </div>

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
