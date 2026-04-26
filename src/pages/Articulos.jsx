import { useMemo, useState } from "react";
import { Page } from "../components/Page";
import Button from "../components/system/Button";
import { Grid, GridCell } from "../components/system/Grid";
import { ARTICLES, ARTICLE_TOPICS, formatArticleDate } from "../data/articulos";
import { BORDERS, COLORS, FONTS } from "../design/tokens";

const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };
const UI = {
  bg: COLORS.canvasLight,
  panel: "#fafafa",
  soft: "#f1f1f1",
  text: COLORS.textOnLight,
  muted: COLORS.textMutedLight,
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

function MetaStrip() {
  const cells = ["004 - Articulos", "Investigacion", "Guias", "Prometeo"];

  return (
    <Grid columns="site" className="articles-meta" style={{ borderBottom: bd }}>
      {cells.map((cell, index) => (
        <GridCell
          key={cell}
          style={{
            borderRight: index < cells.length - 1 ? bd : "none",
            padding: "8px 12px",
            background: UI.bg,
          }}
        >
          <Label>{cell}</Label>
        </GridCell>
      ))}
    </Grid>
  );
}

function ArticleMark({ issue, topic }) {
  return (
    <div
      className="articles-mark"
      style={{
        background: topic === "Tracking" ? COLORS.accent : UI.soft,
        borderBottom: bd,
        minHeight: 260,
        display: "grid",
        gridTemplateRows: "auto minmax(0, 1fr) auto",
      }}
    >
      <div
        style={{
          borderBottom: bd,
          padding: 18,
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Label accent={topic === "Tracking"}>{issue}</Label>
        <Label>{topic}</Label>
      </div>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          padding: 28,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(4rem, 11vw, 8rem)",
            fontWeight: 900,
            lineHeight: 1,
            color: topic === "Tracking" ? COLORS.accentDeep : UI.text,
          }}
        >
          {topic.slice(0, 1)}
        </span>
      </div>
      <div
        style={{
          borderTop: bd,
          padding: 18,
          ...mono,
          fontSize: 8,
          color: topic === "Tracking" ? COLORS.footerText : UI.muted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Lectura Prometeo
      </div>
    </div>
  );
}

function FeaturedArticle({ article }) {
  return (
    <GridCell
      span={2}
      collapseSpanOnTablet
      collapseSpanOnMobile
      className="articles-feature"
      style={{
        borderRight: bd,
        borderBottom: bd,
        background: UI.bg,
        display: "grid",
        gridTemplateRows: "auto minmax(0, 1fr)",
      }}
    >
      <ArticleMark issue={article.issue} topic={article.topic} />
      <div
        style={{
          padding: "34px 32px 38px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 28,
        }}
      >
        <div>
          <Label accent>Portada</Label>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(2.4rem, 5vw, 5.2rem)",
              lineHeight: 0.95,
              color: UI.text,
              margin: "16px 0 18px",
              maxWidth: 820,
            }}
          >
            {article.title}
          </h2>
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 16,
              lineHeight: 1.65,
              color: UI.muted,
              margin: 0,
              maxWidth: 720,
            }}
          >
            {article.dek}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Label>{article.author}</Label>
          <Label>{formatArticleDate(article.date)}</Label>
          <Label>{article.readTime} min</Label>
        </div>
      </div>
    </GridCell>
  );
}

function TopicRail({ activeTopic, onTopicChange, counts }) {
  return (
    <GridCell
      className="articles-topic-rail"
      style={{
        borderRight: bd,
        borderBottom: bd,
        background: UI.panel,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: 20, borderBottom: bd }}>
        <Label>Temas</Label>
      </div>
      {ARTICLE_TOPICS.map((topic) => {
        const active = activeTopic === topic;
        return (
          <button
            key={topic}
            type="button"
            onClick={() => onTopicChange(topic)}
            style={{
              appearance: "none",
              border: "none",
              borderBottom: bd,
              background: active ? COLORS.accent : "transparent",
              color: active ? COLORS.footerText : UI.text,
              cursor: "pointer",
              minHeight: 58,
              padding: "0 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              fontFamily: FONTS.sans,
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            <span>{topic}</span>
            <span style={{ ...mono, fontSize: 9 }}>
              {counts[topic] ?? ARTICLES.length}
            </span>
          </button>
        );
      })}
    </GridCell>
  );
}

function SearchPanel({ query, onQueryChange, resultCount }) {
  return (
    <GridCell
      className="articles-search-panel"
      style={{
        borderBottom: bd,
        background: UI.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 360,
      }}
    >
      <div style={{ padding: 24, borderBottom: bd }}>
        <Label>Buscar</Label>
        <div
          style={{
            border: bd,
            marginTop: 18,
            height: 52,
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Tema, titulo, guia..."
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              color: UI.text,
              fontFamily: FONTS.sans,
              fontSize: 14,
              padding: "0 14px",
            }}
          />
        </div>
      </div>
      <div
        style={{
          padding: 24,
          display: "grid",
          gap: 10,
        }}
      >
        <Label>Resultado</Label>
        <strong
          style={{
            fontFamily: FONTS.display,
            fontSize: 46,
            lineHeight: 1,
            color: COLORS.accent,
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
          Articulos para leer, compartir o usar como punto de partida antes de
          auditar una practica digital.
        </p>
      </div>
    </GridCell>
  );
}

function ArticleRow({ article, index }) {
  return (
    <div
      className="article-row"
      style={{
        borderBottom: bd,
        display: "grid",
        gridTemplateColumns: "96px minmax(0, 1fr) 160px 120px",
        background: index % 2 === 0 ? UI.bg : UI.panel,
      }}
    >
      <div
        style={{
          borderRight: bd,
          padding: "22px 24px",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Label accent={index === 0}>{article.issue}</Label>
      </div>
      <div style={{ borderRight: bd, padding: "22px 24px" }}>
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: 28,
            lineHeight: 1.05,
            color: UI.text,
            margin: "0 0 12px",
          }}
        >
          {article.title}
        </h3>
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 14,
            lineHeight: 1.6,
            color: UI.muted,
            margin: 0,
            maxWidth: 760,
          }}
        >
          {article.dek}
        </p>
      </div>
      <div
        style={{
          borderRight: bd,
          padding: "22px 18px",
          display: "grid",
          alignContent: "start",
          gap: 10,
        }}
      >
        <Label>{article.topic}</Label>
        <Label>{article.level}</Label>
      </div>
      <div
        style={{
          padding: "22px 18px",
          display: "grid",
          alignContent: "start",
          gap: 10,
        }}
      >
        <Label>{formatArticleDate(article.date)}</Label>
        <Label>{article.readTime} min</Label>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        borderBottom: bd,
        padding: "48px 32px",
        background: UI.bg,
      }}
    >
      <Label>No hay articulos con ese filtro</Label>
    </div>
  );
}

export default function Articulos() {
  const [activeTopic, setActiveTopic] = useState("Todos");
  const [query, setQuery] = useState("");

  const featuredArticle = ARTICLES.find((article) => article.featured) ?? ARTICLES[0];
  const topicCounts = useMemo(
    () =>
      ARTICLES.reduce(
        (counts, article) => ({
          ...counts,
          [article.topic]: (counts[article.topic] ?? 0) + 1,
        }),
        { Todos: ARTICLES.length },
      ),
    [],
  );
  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return ARTICLES.filter((article) => {
      const matchesTopic =
        activeTopic === "Todos" ? true : article.topic === activeTopic;
      const matchesQuery = normalizedQuery
        ? [article.title, article.dek, article.topic, article.level, article.author]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery)
        : true;

      return matchesTopic && matchesQuery;
    });
  }, [activeTopic, query]);

  return (
    <Page light>
      <MetaStrip />

      <Grid columns="site" className="articles-hero">
        <FeaturedArticle article={featuredArticle} />
        <TopicRail
          activeTopic={activeTopic}
          onTopicChange={setActiveTopic}
          counts={topicCounts}
        />
        <SearchPanel
          query={query}
          onQueryChange={setQuery}
          resultCount={filteredArticles.length}
        />
      </Grid>

      <Grid
        columns="site"
        className="articles-transition"
        style={{ borderBottom: bd, background: UI.bg }}
      >
        {["Lecturas recientes", "Privacidad aplicada", "Criterios", "Archivo"].map(
          (label, index) => (
            <GridCell
              key={label}
              style={{
                borderRight: index < 3 ? bd : "none",
                minHeight: 68,
                padding: "0 24px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Label accent={index === 0}>{label}</Label>
            </GridCell>
          ),
        )}
      </Grid>

      <section className="articles-index" style={{ background: UI.bg }}>
        <div
          className="articles-index__header"
          style={{
            borderBottom: bd,
            padding: "28px 32px",
            display: "flex",
            justifyContent: "space-between",
            gap: 18,
            alignItems: "end",
          }}
        >
          <div>
            <Label>Indice editorial</Label>
            <h2
              style={{
                fontFamily: FONTS.display,
                fontSize: "clamp(2rem, 4vw, 4.2rem)",
                lineHeight: 0.95,
                color: UI.text,
                margin: "12px 0 0",
              }}
            >
              Articulos para entender y actuar.
            </h2>
          </div>
          {(query || activeTopic !== "Todos") && (
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

        {filteredArticles.length === 0 ? (
          <EmptyState />
        ) : (
          filteredArticles.map((article, index) => (
            <ArticleRow key={article.id} article={article} index={index} />
          ))
        )}
      </section>
    </Page>
  );
}
