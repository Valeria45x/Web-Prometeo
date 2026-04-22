import { useState, useMemo } from "react";
import { Page } from "../components/Page";
import { ComunidadProvider, useComunidad } from "../context/ComunidadContext";
import { TAGS } from "../data/comunidad";
import PostCard from "../components/comunidad/PostCard";
import AuthModal from "../components/comunidad/AuthModal";
import NewPostOverlay from "../components/comunidad/NewPostOverlay";

const B = "1px solid #303030";
const MONO = { fontFamily: "monospace" };

function ComunidadInner() {
  const { currentUser, posts, showAuthModal, setShowAuthModal, logout } =
    useComunidad();
  const [activeTag, setActiveTag] = useState(null);
  const [sort, setSort] = useState("reciente");
  const [query, setQuery] = useState("");
  const [showNew, setShowNew] = useState(false);

  const filtered = useMemo(() => {
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

    if (sort === "upvotes") {
      list = [...list].sort((a, b) => b.upvotes - a.upvotes);
    } else {
      list = [...list].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    }
    return list;
  }, [posts, activeTag, sort, query]);

  const sortBtn = (id, label) => (
    <button
      onClick={() => setSort(id)}
      style={{
        ...MONO,
        fontSize: 10,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        background: "none",
        border: "none",
        color: "#C8C8C8",
        opacity: sort === id ? 1 : 0.35,
        fontWeight: sort === id ? 700 : 400,
        cursor: "pointer",
        padding: "0 16px",
        borderLeft: B,
        height: "100%",
        transition: "opacity 0.12s",
      }}
    >
      {label}
    </button>
  );

  return (
    <Page>
      <div style={{ borderLeft: B }}>

        {/* ── Search section ────────────────────────────────────────────── */}
        <div
          style={{
            position: "sticky",
            top: 52,
            zIndex: 10,
            background: "#0A0A0A",
            borderBottom: B,
            display: "flex",
            alignItems: "center",
            height: 96,
          }}
        >
          {/* Search input — main focus */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              height: "100%",
              padding: "0 32px",
              gap: 16,
              borderRight: B,
            }}
          >
            <span
              style={{
                ...MONO,
                fontSize: 18,
                color: "#C8C8C8",
                opacity: 0.2,
                userSelect: "none",
                flexShrink: 0,
              }}
            >
              /
            </span>
            <input
              type="text"
              placeholder="Buscar en la comunidad..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                fontFamily: "'Funnel Display', sans-serif",
                fontSize: 22,
                fontWeight: 600,
                color: "#C8C8C8",
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
                  opacity: 0.3,
                  cursor: "pointer",
                  padding: 0,
                  flexShrink: 0,
                  transition: "opacity 0.12s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
              >
                ✕ limpiar
              </button>
            )}
          </div>

          {/* Auth controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              flexShrink: 0,
            }}
          >
            {currentUser ? (
              <>
                <button
                  onClick={logout}
                  style={{
                    ...MONO,
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    background: "none",
                    border: "none",
                    color: "#C8C8C8",
                    opacity: 0.35,
                    cursor: "pointer",
                    padding: "0 20px",
                    borderRight: B,
                    height: "100%",
                    transition: "opacity 0.12s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
                >
                  Salir
                </button>
                <button
                  onClick={() => setShowNew(true)}
                  style={{
                    ...MONO,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    background: "#FF3C54",
                    color: "#0A0A0A",
                    border: "none",
                    cursor: "pointer",
                    padding: "0 32px",
                    height: "100%",
                  }}
                >
                  + Nuevo hilo
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                style={{
                  ...MONO,
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  background: "none",
                  border: "1px solid #FF3C54",
                  color: "#FF3C54",
                  cursor: "pointer",
                  padding: "0 32px",
                  height: "100%",
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

        {/* ── Filter bar ────────────────────────────────────────────────── */}
        <div
          style={{
            borderBottom: B,
            display: "flex",
            alignItems: "center",
            height: 48,
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              padding: "0 16px",
              gap: 4,
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
                color: "#C8C8C8",
                opacity: activeTag === null ? 1 : 0.35,
                fontWeight: activeTag === null ? 700 : 400,
                cursor: "pointer",
                padding: "6px 12px",
                transition: "opacity 0.12s",
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
                  color: activeTag === tag ? "#FF3C54" : "#C8C8C8",
                  opacity: activeTag === tag ? 1 : 0.35,
                  fontWeight: activeTag === tag ? 700 : 400,
                  cursor: "pointer",
                  padding: "6px 12px",
                  transition: "opacity 0.12s, color 0.12s",
                  whiteSpace: "nowrap",
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
            }}
          >
            {sortBtn("reciente", "Reciente")}
            {sortBtn("upvotes", "Populares")}
          </div>
        </div>

        {/* ── Count line ────────────────────────────────────────────────── */}
        <div
          style={{
            borderBottom: B,
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
              color: "#C8C8C8",
              opacity: 0.3,
            }}
          >
            {filtered.length} {filtered.length === 1 ? "hilo" : "hilos"}
            {activeTag && ` · ${activeTag}`}
            {query && ` · "${query}"`}
          </span>
        </div>

        {/* ── Feed list ─────────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div
            style={{
              padding: "64px 32px",
              borderBottom: B,
              textAlign: "center",
            }}
          >
            <span
              style={{
                ...MONO,
                fontSize: 9,
                color: "#C8C8C8",
                opacity: 0.25,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Sin hilos{query ? ` para "${query}"` : " en esta categoría"}.
            </span>
          </div>
        ) : (
          filtered.map((post) => (
            <PostCard key={post.id} post={post} query={query} />
          ))
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
