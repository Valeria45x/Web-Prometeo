import { useEffect, useMemo, useRef, useState } from "react";
import { Page } from "../Page";
import Footer from "../Footer";
import HeroTransitionGrid from "../HeroTransitionGrid";
import { Grid, GridCell } from "../system/Grid";
import {
  ARTICLES,
  ARTICLE_TOPICS,
  formatArticleDate,
} from "../../data/articulos";
import { BORDERS, COLORS, FONTS } from "../../design/tokens";
import { TH } from "../../constants";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useComunidad } from "../../context/ComunidadContext";

const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };
const UI = {
  bg: COLORS.pageLight,
  panel: COLORS.pageLight,
  text: COLORS.textOnLight,
  muted: COLORS.textMutedLight,
  media: COLORS.pageLight,
  mediaLine: "#d6d6d6",
};

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

/* ── Image placeholder — diagonal X ── */
function ImagePlaceholder() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4 / 3",
        background: UI.media,
        overflow: "hidden",
        borderBottom: bd,
        flexShrink: 0,
      }}
    >
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          stroke={UI.mediaLine}
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="100"
          y1="0"
          x2="0"
          y2="100"
          stroke={UI.mediaLine}
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

/* ── Filter chip — Prometeo square style ── */
function FilterChip({ topic, active, count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        appearance: "none",
        background: active ? COLORS.accent : "none",
        border: "none",
        borderRight: bd,
        cursor: "pointer",
        padding: "0 20px",
        height: "100%",
        ...mono,
        fontSize: 9,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: active ? COLORS.footerText : UI.muted,
        whiteSpace: "nowrap",
        flexShrink: 0,
        transition: "background 0.12s, color 0.12s",
      }}
    >
      {topic}
      <span style={{ marginLeft: 8, opacity: 0.5 }}>{count}</span>
    </button>
  );
}

/* ── Featured article card — full width, horizontal ── */
function FeaturedArticleCard({ article }) {
  const [hovered, setHovered] = useState(false);
  const dark = "#1a1d20";

  return (
    <div
      style={{
        borderBottom: bd,
        background: hovered ? dark : UI.bg,
        display: "grid",
        gridTemplateColumns: "2fr 3fr",
        cursor: "pointer",
        transition: "background 0.14s",
        minHeight: 320,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left — image */}
      <div
        style={{
          position: "relative",
          borderRight: bd,
          overflow: "hidden",
        }}
      >
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            stroke={hovered ? "#333" : UI.mediaLine}
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1="100"
            y1="0"
            x2="0"
            y2="100"
            stroke={hovered ? "#333" : UI.mediaLine}
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 4,
            height: "100%",
            background: COLORS.accent,
          }}
        />
      </div>

      {/* Right — content */}
      <div
        style={{
          padding: "48px 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span
              style={{
                ...mono,
                fontSize: 8,
                color: COLORS.accent,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Destacado
            </span>
            <span
              style={{
                ...mono,
                fontSize: 8,
                color: article.featured
                  ? COLORS.accent
                  : hovered
                    ? COLORS.textOnDark
                    : UI.muted,
                border: `1px solid ${article.featured ? COLORS.accent : hovered ? "rgba(232,232,232,0.4)" : UI.muted}`,
                padding: "3px 8px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {article.level}
            </span>
          </div>

          <h2
            style={{
              margin: 0,
              fontFamily: FONTS.display,
              fontSize: 38,
              fontWeight: 900,
              lineHeight: 1.08,
              color: hovered ? COLORS.textOnDark : UI.text,
              maxWidth: "22ch",
            }}
          >
            {article.title}
          </h2>

          <p
            style={{
              margin: 0,
              fontFamily: FONTS.sans,
              fontSize: 15,
              lineHeight: 1.65,
              color: hovered ? COLORS.textOnDark : UI.muted,
              maxWidth: "52ch",
            }}
          >
            {article.dek}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 16,
            borderTop: `1px solid ${hovered ? "rgba(232,232,232,0.2)" : UI.mediaLine}`,
          }}
        >
          <span
            style={{
              ...mono,
              fontSize: 8,
              color: hovered ? COLORS.textOnDark : UI.muted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {article.author}
          </span>
          <div style={{ display: "flex", gap: 16 }}>
            <span
              style={{
                ...mono,
                fontSize: 8,
                color: hovered ? COLORS.textOnDark : UI.muted,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {formatArticleDate(article.date)}
            </span>
            <span
              style={{
                ...mono,
                fontSize: 8,
                color: hovered ? COLORS.textOnDark : UI.muted,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {article.readTime} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Standard article card — typographic, no image ── */
function ArticleCard({ article, index }) {
  const [hovered, setHovered] = useState(false);
  const isLast = index % 3 === 2;
  const dark = "#2b2f34";

  return (
    <div
      style={{
        borderRight: isLast ? "none" : bd,
        borderBottom: bd,
        background: hovered ? dark : UI.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        transition: "background 0.12s",
        padding: "32px 28px 28px",
        gap: 32,
        minHeight: 260,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Topic accent line */}
      <div
        style={{
          width: 24,
          height: 2,
          background: hovered ? COLORS.accent : UI.mediaLine,
          transition: "background 0.12s",
          flexShrink: 0,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          flexGrow: 1,
        }}
      >
        <span
          style={{
            ...mono,
            fontSize: 8,
            color: hovered ? COLORS.accent : UI.muted,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {article.topic}
        </span>

        <h3
          style={{
            margin: 0,
            fontFamily: FONTS.display,
            fontSize: 20,
            lineHeight: 1.2,
            color: hovered ? COLORS.textOnDark : UI.text,
          }}
        >
          {article.title}
        </h3>

        <p
          style={{
            margin: 0,
            fontFamily: FONTS.sans,
            fontSize: 13,
            lineHeight: 1.65,
            color: hovered ? COLORS.textOnDark : UI.muted,
          }}
        >
          {article.dek}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 16,
          borderTop: `1px solid ${hovered ? "rgba(232,232,232,0.2)" : UI.mediaLine}`,
        }}
      >
        <span
          style={{
            ...mono,
            fontSize: 8,
            color: hovered ? COLORS.textOnDark : UI.muted,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {article.author}
        </span>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span
            style={{
              ...mono,
              fontSize: 8,
              color: article.featured
                ? COLORS.accent
                : hovered
                  ? COLORS.textOnDark
                  : UI.muted,
              border: `1px solid ${article.featured ? COLORS.accent : hovered ? "rgba(232,232,232,0.4)" : UI.muted}`,
              padding: "2px 7px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {article.level}
          </span>
          <span
            style={{
              ...mono,
              fontSize: 8,
              color: hovered ? COLORS.textOnDark : UI.muted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {article.readTime} min
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Hero ── */
function ArticlesHero({
  currentUser,
  likedThreadCount,
  likedSolvedCount,
  latestLikedThreadTitle,
}) {
  return (
    <Grid
      as="section"
      columns="site"
      className="articles-hero"
      style={{ background: UI.bg, position: "relative", zIndex: 2 }}
    >
      <GridCell
        span={3}
        collapseSpanOnTablet
        collapseSpanOnMobile
        style={{
          borderRight: bd,
          padding: "72px 48px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <h1
          className="section-title"
          style={{ color: UI.text, margin: 0, lineHeight: 1.05 }}
        >
          Artículos
        </h1>
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 16,
            lineHeight: 1.65,
            color: UI.muted,
            margin: 0,
            maxWidth: "48ch",
          }}
        >
          Investigación, guías y análisis sobre privacidad digital.
        </p>
      </GridCell>

      <GridCell
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {currentUser ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                flex: 1,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  flex: "0 0 calc(50% - 0.5px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  padding: "72px 28px 28px",
                  minWidth: 0,
                }}
              >
                <Label>Perfil</Label>
                <span
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 14,
                    fontWeight: 700,
                    color: UI.text,
                    lineHeight: 1.2,
                  }}
                >
                  {currentUser.displayName}
                </span>
                <span
                  style={{
                    ...mono,
                    fontSize: 9,
                    color: UI.muted,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  @{currentUser.handle}
                </span>
              </div>

              <div
                style={{
                  borderLeft: bd,
                  alignSelf: "stretch",
                  flexShrink: 0,
                  width: 1,
                }}
              />

              <div
                style={{
                  flex: "0 0 calc(50% - 0.5px)",
                  alignSelf: "stretch",
                  background: COLORS.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 40,
                    fontWeight: 900,
                    color: COLORS.accentDeep,
                    lineHeight: 1,
                  }}
                >
                  {currentUser.displayName?.[0]?.toUpperCase() ?? "?"}
                </span>
              </div>
            </div>

            <div style={{ borderTop: bd }} />

            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "stretch",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  flex: "0 0 calc(50% - 0.5px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: 8,
                  padding: "32px 28px 64px",
                  minWidth: 0,
                }}
              >
                <Label>Hilos con like</Label>
                <strong
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 34,
                    fontWeight: 900,
                    lineHeight: 1,
                    color: likedThreadCount > 0 ? COLORS.accent : UI.muted,
                    display: "block",
                  }}
                >
                  {likedThreadCount}
                </strong>
                <span
                  style={{
                    ...mono,
                    fontSize: 9,
                    color: UI.muted,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    lineHeight: 1.6,
                  }}
                >
                  {likedSolvedCount} resueltos
                </span>
              </div>

              <div
                style={{
                  borderLeft: bd,
                  alignSelf: "stretch",
                  flexShrink: 0,
                  width: 1,
                }}
              />

              <div
                style={{
                  flex: "0 0 calc(50% - 0.5px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: 8,
                  padding: "32px 28px 64px",
                  minWidth: 0,
                }}
              >
                <Label>Último hilo</Label>
                <span
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 13,
                    color: UI.text,
                    lineHeight: 1.45,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {latestLikedThreadTitle}
                </span>
                <span
                  style={{
                    ...mono,
                    fontSize: 9,
                    color: UI.muted,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    lineHeight: 1.6,
                  }}
                >
                  hilos que sigues
                </span>
              </div>
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "stretch",
              minWidth: 0,
            }}
          >
            <div
              style={{
                flex: "1 1 50%",
                padding: "72px 28px 28px",
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <p
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 15,
                  color: UI.muted,
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: "28ch",
                }}
              >
                Inicia sesion para personalizar tu lectura, guardar articulos y
                seguir tus temas.
              </p>
            </div>

            <div
              style={{
                borderTop: bd,
                width: "100%",
                flexShrink: 0,
              }}
            />

            <div
              style={{
                flex: "1 1 50%",
                display: "flex",
                alignItems: "stretch",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  flex: "0 0 calc(50% - 0.5px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: 8,
                  padding: "72px 28px 64px",
                  minWidth: 0,
                }}
              >
                <Label>Hilos con like</Label>
                <strong
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 34,
                    fontWeight: 900,
                    lineHeight: 1,
                    color: UI.muted,
                  }}
                >
                  0
                </strong>
                <span
                  style={{
                    ...mono,
                    fontSize: 9,
                    color: UI.muted,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    lineHeight: 1.6,
                  }}
                >
                  inicia sesion
                </span>
              </div>

              <div
                style={{
                  borderLeft: bd,
                  alignSelf: "stretch",
                  flexShrink: 0,
                  width: 1,
                }}
              />

              <div
                style={{
                  flex: "0 0 calc(50% - 0.5px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: 8,
                  padding: "72px 28px 64px",
                  minWidth: 0,
                }}
              >
                <Label>Último hilo</Label>
                <span
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 13,
                    color: UI.muted,
                    lineHeight: 1.45,
                  }}
                >
                  Sin hilos en seguimiento.
                </span>
                <span
                  style={{
                    ...mono,
                    fontSize: 9,
                    color: UI.muted,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    lineHeight: 1.6,
                  }}
                >
                  contexto de comunidad
                </span>
              </div>
            </div>
          </div>
        )}
      </GridCell>
    </Grid>
  );
}

/* ── Filter bar ── */
function ArticlesFilterBar({ activeTopic, onTopicChange, topicCounts }) {
  return (
    <Grid as="div" columns="site" style={{ background: UI.bg }}>
      <GridCell
        span={4}
        style={{
          borderTop: bd,
          display: "flex",
          alignItems: "stretch",
          height: 52,
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            borderRight: bd,
            flexShrink: 0,
          }}
        >
          <Label>Categorías</Label>
        </div>
        {ARTICLE_TOPICS.map((topic) => (
          <FilterChip
            key={topic}
            topic={topic}
            active={activeTopic === topic}
            count={topicCounts[topic] ?? 0}
            onClick={() => onTopicChange(topic)}
          />
        ))}
      </GridCell>
    </Grid>
  );
}

/* ── Page ── */
export default function ArticulosPage() {
  const [activeTopic, setActiveTopic] = useState("Todos");
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { currentUser, posts } = useComunidad();

  const topicCounts = useMemo(
    () =>
      ARTICLES.reduce(
        (acc, a) => ({ ...acc, [a.topic]: (acc[a.topic] ?? 0) + 1 }),
        { Todos: ARTICLES.length },
      ),
    [],
  );

  const filtered = useMemo(
    () =>
      activeTopic === "Todos"
        ? ARTICLES
        : ARTICLES.filter((a) => a.topic === activeTopic),
    [activeTopic],
  );

  const likedThreads = useMemo(() => {
    if (!currentUser) return [];

    return posts.filter(
      (post) =>
        Array.isArray(post.followerIds) &&
        post.followerIds.includes(currentUser.id),
    );
  }, [currentUser, posts]);

  const likedThreadCount = likedThreads.length;
  const likedSolvedCount = likedThreads.filter((post) => post.isSolved).length;
  const latestLikedThreadTitle =
    likedThreads
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
      ?.title ?? "Sin hilos en seguimiento.";

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return undefined;
    const update = () => setContentHeight(el.scrollHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const viewportHeight = typeof window === "undefined" ? 0 : window.innerHeight;
  const wrapperHeight =
    contentHeight > 0 ? contentHeight + viewportHeight - TH : "auto";

  return (
    <Page light footerVariant="none">
      <div style={{ position: "relative", height: wrapperHeight }}>
        <Footer variant="landing" mobileReveal={isMobile} />
        <div
          ref={contentRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            background: UI.bg,
          }}
        >
          <ArticlesHero
            currentUser={currentUser}
            likedThreadCount={likedThreadCount}
            likedSolvedCount={likedSolvedCount}
            latestLikedThreadTitle={latestLikedThreadTitle}
          />

          <HeroTransitionGrid background={UI.bg} border={bd} />

          <ArticlesFilterBar
            activeTopic={activeTopic}
            onTopicChange={setActiveTopic}
            topicCounts={topicCounts}
          />

          {/* Featured — first article, full width */}
          {filtered.length > 0 && <FeaturedArticleCard article={filtered[0]} />}

          {/* Rest — 3-col typographic grid */}
          {filtered.length > 1 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                background: UI.bg,
              }}
            >
              {filtered.slice(1).map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
              {filtered.slice(1).length % 3 !== 0 &&
                Array.from({ length: 3 - (filtered.slice(1).length % 3) }).map(
                  (_, i) => (
                    <div
                      key={`empty-${i}`}
                      style={{
                        borderRight:
                          i < 3 - (filtered.slice(1).length % 3) - 1
                            ? bd
                            : "none",
                        borderBottom: bd,
                        background: UI.panel,
                      }}
                    />
                  ),
                )}
            </div>
          )}
          <HeroTransitionGrid background={UI.bg} border={bd} />
        </div>
      </div>
    </Page>
  );
}
