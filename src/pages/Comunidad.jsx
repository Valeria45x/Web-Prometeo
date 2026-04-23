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
  const {
    currentUser,
    posts,
    replies,
    showAuthModal,
    setShowAuthModal,
    logout,
  } = useComunidad();
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
    list = [...list].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    return list;
  }, [posts, activeTag, sort, query]);

  const solvedCount = posts.filter((p) => p.isSolved).length;
  const userPostCount = currentUser
    ? posts.filter((p) => p.authorId === currentUser.id).length
    : 0;
  const userReplyCount = currentUser
    ? replies.filter((r) => r.authorId === currentUser.id).length
    : 0;

  return (
    <Page light footerVariant="landing">
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

        {/* Right col — user panel + CTA */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {currentUser ? (
            <>
              {/* Avatar + identity */}
              <div style={{ borderBottom: BD, padding: "28px 28px 24px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      background: "rgba(255,60,84,0.1)",
                      border: "1px solid rgba(255,60,84,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Funnel Display', sans-serif",
                        fontSize: 20,
                        fontWeight: 900,
                        color: "#FF3C54",
                      }}
                    >
                      {currentUser.displayName?.[0]?.toUpperCase() ?? "?"}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Funnel Sans', sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#c8c8c8",
                        lineHeight: 1.2,
                      }}
                    >
                      {currentUser.displayName}
                    </div>
                    <div
                      style={{
                        ...MONO,
                        fontSize: 9,
                        color: "#C8C8C8",
                        opacity: 0.4,
                        marginTop: 3,
                      }}
                    >
                      @{currentUser.handle}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    ...MONO,
                    fontSize: 9,
                    color: "#FF3C54",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    border: "1px solid rgba(255,60,84,0.3)",
                    display: "inline-block",
                    padding: "4px 8px",
                  }}
                >
                  {{
                    miembro: "Miembro",
                    certificado: "Certificado",
                    prometeo_team: "Equipo Prometeo",
                  }[currentUser.role] ?? currentUser.role}
                </div>
              </div>
              {/* User activity stats */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {[
                  { label: "Hilos abiertos", value: userPostCount },
                  { label: "Respuestas dadas", value: userReplyCount },
                ].map(({ label, value }, i) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "14px 28px",
                      borderBottom:
                        i < 1 ? "1px solid rgba(48,48,48,0.6)" : "none",
                    }}
                  >
                    <span
                      style={{
                        ...MONO,
                        fontSize: 9,
                        color: "#C8C8C8",
                        opacity: 0.4,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Funnel Display', sans-serif",
                        fontSize: 22,
                        fontWeight: 900,
                        color: value > 0 ? "#FF3C54" : "#c8c8c8",
                        opacity: value > 0 ? 1 : 0.2,
                        lineHeight: 1,
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              {/* CTA — start a new thread */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "28px 28px 24px",
                  gap: 12,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontSize: 13,
                    color: "#c8c8c8",
                    opacity: 0.45,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  ¿Tienes una pregunta o algo que compartir sobre privacidad
                  digital?
                </p>
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
                    padding: "15px 20px",
                    transition: "opacity 0.12s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Abrir nuevo hilo
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
                    opacity: 0.25,
                    cursor: "pointer",
                    padding: "6px 0",
                    transition: "opacity 0.12s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.25")}
                >
                  Salir
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Teaser for guests */}
              <div style={{ borderBottom: BD, padding: "28px 28px 24px" }}>
                <div
                  style={{
                    ...MONO,
                    fontSize: 9,
                    color: "#FF3C54",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 12,
                  }}
                >
                  Tu espacio
                </div>
                <p
                  style={{
                    fontFamily: "'Funnel Sans', sans-serif",
                    fontSize: 14,
                    color: "#c8c8c8",
                    opacity: 0.55,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  Únete para abrir hilos y responder las mejores preguntas.
                </p>
              </div>
              {/* Benefits list */}
              <div
                style={{
                  borderBottom: BD,
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                {[
                  "Abre hilos sobre privacidad",
                  "Responde y gana reputación",
                  "Vota lo que más te ayudó",
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "14px 28px",
                      borderBottom:
                        i < 2 ? "1px solid rgba(48,48,48,0.6)" : "none",
                    }}
                  >
                    <span
                      style={{
                        color: "#FF3C54",
                        fontSize: 10,
                        flexShrink: 0,
                        lineHeight: 1.5,
                        fontWeight: 700,
                      }}
                    >
                      —
                    </span>
                    <span
                      style={{
                        ...MONO,
                        fontSize: 9,
                        color: "#C8C8C8",
                        opacity: 0.45,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              {/* Acceder CTA */}
              <div
                style={{
                  padding: "24px 28px",
                  marginTop: "auto",
                }}
              >
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
              </div>
            </>
          )}
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
            {[["reciente", "Reciente"]].map(([id, label]) => (
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
            {/* 2-column grid for all posts */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {filtered.slice(0, visible).map((post, i) => (
                <div
                  key={post.id}
                  style={{ borderRight: i % 2 === 0 ? BL : "none" }}
                >
                  <PostCard post={post} query={query} />
                </div>
              ))}
            </div>

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
