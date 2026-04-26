import { useMemo, useState } from "react";
import { Page } from "../Page";
import Button from "../system/Button";
import { Grid, GridCell } from "../system/Grid";
import { ARTICLES, ARTICLE_TOPICS, formatArticleDate } from "../../data/articulos";
import { BORDERS, COLORS, FONTS } from "../../design/tokens";

const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };

const UI = {
  bg: COLORS.canvasLight,
  panel: "#f7f7f7",
  soft: "#f1f1f1",
  text: COLORS.textOnLight,
  muted: COLORS.textMutedLight,
};

const TOPIC_ACCENT = {
  Tracking: COLORS.accent,
  GDPR: "#2563eb",
  Cifrado: "#059669",
  Cookies: "#d97706",
  "Dark patterns": "#7c3aed",
  Empresas: "#0891b2",
  Todos: COLORS.textMutedLight,
};

function Label({ children, accent = false, color }) {
  return (
    <span
      style={{
        ...mono,
        fontSize: 8,
        color: color ?? (accent ? COLORS.accent : UI.muted),
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function TopicChip({ topic, active, count, onClick }) {
  const accentColor = TOPIC_ACCENT[topic] ?? UI.muted;
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        appearance: "none",
        border: active ? `1px solid ${accentColor}` : bd,
        background: active ? accentColor : "transparent",
        color: active ? (accentColor === COLORS.accent ? COLORS.footerText : "#fff") : UI.text,
        cursor: "pointer",
        padding: "0 18px",
        height: 40,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontFamily: FONTS.sans,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
        transition: "background 0.12s, border-color 0.12s, color 0.12s",
        flexShrink: 0,
      }}
    >
      <span>{topic}</span>
      <span
        style={{
          ...mono,
          fontSize: 9,
          opacity: active ? 0.7 : 0.45,
        }}
      >
        {count ?? ARTICLES.length}
      </span>
    </button>
  );
}

function ArticlesHero({ query, onQueryChange, activeTopic, onTopicChange, topicCounts, resultCount }) {
  return (
    <Grid as="section" columns="site" className="articles-hero" style={{ background: UI.bg }}>
      {/* Left — title + search */}
      <GridCell
        span={3}
        collapseSpanOnTablet
        collapseSpanOnMobile
        style={{
          borderRight: bd,
          padding: "72px 48px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Label accent>004 — Artículos</Label>
          <h1
            className="section-title"
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(3.2rem, 6vw, 7rem)",
              fontWeight: 900,
              lineHeight: 0.95,
              color: UI.text,
              margin: 0,
            }}
          >
            Lecturas para
            <br />
            entender y actuar.
          </h1>
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 16,
              lineHeight: 1.65,
              color: UI.muted,
              margin: 0,
              maxWidth: 540,
            }}
          >
            Investigación, guías y análisis sobre privacidad digital. Cada
            artículo es un punto de partida para tomar decisiones más informadas.
          </p>
        </div>

        {/* Search */}
        <div
          style={{
            border: bd,
            display: "flex",
            alignItems: "center",
            height: 52,
            maxWidth: 540,
          }}
        >
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar por tema, título o autor..."
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontFamily: FONTS.sans,
              fontSize: 15,
              color: UI.text,
              caretColor: COLORS.accent,
              padding: "0 16px",
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                ...mono,
                fontSize: 9,
                color: UI.muted,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0 14px",
                flexShrink: 0,
              }}
            >
              limpiar
            </button>
          )}
        </div>
      </GridCell>

      {/* Right — stat panel */}
      <GridCell
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 40px 64px",
          gap: 32,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Label>Resultado</Label>
          <strong
            style={{
              fontFamily: FONTS.display,
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1,
              color: COLORS.accent,
              display: "block",
            }}
          >
            {resultCount}
          </strong>
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 13,
              lineHeight: 1.6,
              color: UI.muted,
              margin: 0,
            }}
          >
            {resultCount === 1 ? "artículo encontrado" : "artículos encontrados"}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Label>Temas</Label>
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 13,
              lineHeight: 1.6,
              color: UI.muted,
              margin: 0,
            }}
          >
            Tracking · GDPR · Cifrado · Cookies · Dark patterns · Empresas
          </p>
        </div>
      </GridCell>

      {/* Filter strip — full width below */}
      <GridCell
        span={4}
        style={{
          borderTop: bd,
          padding: "0 48px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          overflowX: "auto",
          height: 64,
          scrollbarWidth: "none",
        }}
      >
        {ARTICLE_TOPICS.map((topic) => (
          <TopicChip
            key={topic}
            topic={topic}
            active={activeTopic === topic}
            count={topicCounts[topic] ?? ARTICLES.length}
            onClick={() => onTopicChange(topic)}
          />
        ))}
      </GridCell>
    </Grid>
  );
}

function FeaturedCard({ article }) {
  const accentColor = TOPIC_ACCENT[article.topic] ?? COLORS.accent;
  return (
    <div
      className="article-featured-card"
      style={{
        borderBottom: bd,
        background: UI.bg,
        display: "grid",
        gridTemplateColumns: "6px 1fr",
      }}
    >
      {/* accent bar */}
      <div style={{ background: accentColor }} />
      <div
        style={{
          padding: "56px 56px 52px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <span
            style={{
              ...mono,
              fontSize: 9,
              color: "#fff",
              background: accentColor,
              padding: "5px 10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Portada
          </span>
          <Label color={accentColor}>{article.topic}</Label>
          <Label>{article.issue}</Label>
          <Label>{article.level}</Label>
        </div>

        <div>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(2.4rem, 4vw, 4.8rem)",
              fontWeight: 900,
              lineHeight: 0.95,
              color: UI.text,
              margin: "0 0 20px",
              maxWidth: 860,
            }}
          >
            {article.title}
          </h2>
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 17,
              lineHeight: 1.7,
              color: UI.muted,
              margin: 0,
              maxWidth: 720,
            }}
          >
            {article.dek}
          </p>
        </div>

        <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <Label>{article.author}</Label>
          <Label>{formatArticleDate(article.date)}</Label>
          <Label>{article.readTime} min de lectura</Label>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article, index }) {
  const accentColor = TOPIC_ACCENT[article.topic] ?? COLORS.accent;
  const isEven = index % 2 === 0;

  return (
    <div
      className="article-card"
      style={{
        borderBottom: bd,
        borderRight: isEven ? bd : "none",
        background: UI.bg,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "background 0.12s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = UI.panel;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = UI.bg;
      }}
    >
      {/* Topic color strip */}
      <div
        style={{
          height: 3,
          background: accentColor,
          opacity: 0.7,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          padding: "36px 40px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          flex: 1,
        }}
      >
        {/* Tags row */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <span
            style={{
              ...mono,
              fontSize: 9,
              color: accentColor,
              border: `1px solid ${accentColor}`,
              padding: "4px 9px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {article.topic}
          </span>
          <Label>{article.level}</Label>
          <Label>{article.issue}</Label>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            color: UI.text,
            margin: 0,
          }}
        >
          {article.title}
        </h3>

        {/* Dek */}
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 14,
            lineHeight: 1.65,
            color: UI.muted,
            margin: 0,
            flex: 1,
          }}
        >
          {article.dek}
        </p>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            flexWrap: "wrap",
            paddingTop: 12,
            borderTop: `1px solid ${COLORS.grid}22`,
          }}
        >
          <Label>{article.author}</Label>
          <Label>{formatArticleDate(article.date)}</Label>
          <Label>{article.readTime} min</Label>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onClear }) {
  return (
    <div
      style={{
        borderBottom: bd,
        padding: "80px 48px",
        background: UI.bg,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "flex-start",
      }}
    >
      <Label>Sin resultados</Label>
      <p
        style={{
          fontFamily: FONTS.sans,
          fontSize: 16,
          lineHeight: 1.6,
          color: UI.muted,
          margin: 0,
          maxWidth: 440,
        }}
      >
        No hay artículos que coincidan con ese filtro. Prueba con otro tema o
        borra la búsqueda.
      </p>
      <Button variant="outline" surface="light" size="sm" onClick={onClear}>
        Limpiar filtros
      </Button>
    </div>
  );
}

export default function ArticulosPage() {
  const [activeTopic, setActiveTopic] = useState("Todos");
  const [query, setQuery] = useState("");

  const featuredArticle = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];

  const topicCounts = useMemo(
    () =>
      ARTICLES.reduce(
        (counts, a) => ({
          ...counts,
          [a.topic]: (counts[a.topic] ?? 0) + 1,
        }),
        { Todos: ARTICLES.length },
      ),
    [],
  );

  const filteredArticles = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      const matchesTopic = activeTopic === "Todos" ? true : a.topic === activeTopic;
      const matchesQuery = q
        ? [a.title, a.dek, a.topic, a.level, a.author].join(" ").toLowerCase().includes(q)
        : true;
      return matchesTopic && matchesQuery;
    });
  }, [activeTopic, query]);

  const hasFilters = query || activeTopic !== "Todos";

  return (
    <Page light>
      <ArticlesHero
        query={query}
        onQueryChange={setQuery}
        activeTopic={activeTopic}
        onTopicChange={setActiveTopic}
        topicCounts={topicCounts}
        resultCount={filteredArticles.length}
      />

      {/* Featured article — only when no filter active */}
      {!hasFilters && <FeaturedCard article={featuredArticle} />}

      {/* Index heading */}
      <div
        style={{
          borderBottom: bd,
          padding: "28px 48px",
          background: UI.bg,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Label accent={hasFilters}>
          {hasFilters ? `${filteredArticles.length} artículos encontrados` : "Índice editorial"}
        </Label>
        {hasFilters && (
          <Button
            variant="outline"
            surface="light"
            size="sm"
            onClick={() => {
              setQuery("");
              setActiveTopic("Todos");
            }}
          >
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Article grid */}
      {filteredArticles.length === 0 ? (
        <EmptyState
          onClear={() => {
            setQuery("");
            setActiveTopic("Todos");
          }}
        />
      ) : (
        <div
          className="articles-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            background: UI.bg,
          }}
        >
          {filteredArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
          {/* Fill empty cell if odd number */}
          {filteredArticles.length % 2 !== 0 && (
            <div style={{ borderBottom: bd, background: UI.soft }} />
          )}
        </div>
      )}
    </Page>
  );
}
