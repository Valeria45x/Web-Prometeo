import { useMemo, useState } from "react";
import { Page } from "../Page";
import { ARTICLES, ARTICLE_TOPICS, formatArticleDate } from "../../data/articulos";
import { BORDERS, COLORS, FONTS } from "../../design/tokens";

const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };

const UI = {
  bg: COLORS.canvasLight,
  panel: "#f7f7f7",
  text: COLORS.textOnLight,
  muted: COLORS.textMutedLight,
};

const TOPIC_COLOR = {
  Tracking: COLORS.accent,
  GDPR: "#2563eb",
  Cifrado: "#059669",
  Cookies: "#d97706",
  "Dark patterns": "#7c3aed",
  Empresas: "#0891b2",
  Todos: "#aaaaaa",
};

function Label({ children, color }) {
  return (
    <span
      style={{
        ...mono,
        fontSize: 8,
        color: color ?? UI.muted,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function FilterChip({ topic, active, count, onClick }) {
  const color = TOPIC_COLOR[topic] ?? UI.muted;
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        appearance: "none",
        border: active ? `1px solid ${color}` : `1px solid transparent`,
        borderRadius: 999,
        background: active ? color : "transparent",
        color: active
          ? color === COLORS.accent
            ? COLORS.footerText
            : "#fff"
          : UI.text,
        cursor: "pointer",
        padding: "6px 16px",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: FONTS.sans,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
        flexShrink: 0,
        transition: "background 0.12s, border-color 0.12s, color 0.12s",
      }}
    >
      <span>{topic}</span>
      <span style={{ ...mono, fontSize: 8, opacity: 0.6 }}>{count}</span>
    </button>
  );
}

function ImagePlaceholder({ topic }) {
  const color = TOPIC_COLOR[topic] ?? "#e0e0e0";
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "4 / 3",
        background: color,
        opacity: 0.08,
        flexShrink: 0,
      }}
    />
  );
}

function ArticleCard({ article, index }) {
  const color = TOPIC_COLOR[article.topic] ?? UI.muted;
  const isLast = index % 3 === 2;

  return (
    <div
      className="article-card"
      style={{
        borderRight: isLast ? "none" : bd,
        borderBottom: bd,
        background: UI.bg,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "background 0.12s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = UI.panel; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = UI.bg; }}
    >
      <ImagePlaceholder topic={article.topic} />

      <div style={{ padding: "20px 24px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Top meta */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Label>{formatArticleDate(article.date)}</Label>
          <span
            style={{
              ...mono,
              fontSize: 8,
              color: color,
              border: `1px solid ${color}`,
              padding: "3px 8px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderRadius: 999,
            }}
          >
            {article.topic}
          </span>
        </div>

        {/* Title placeholder */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ height: 20, background: UI.text, opacity: 0.85, borderRadius: 2, width: "90%" }} />
          <div style={{ height: 20, background: UI.text, opacity: 0.85, borderRadius: 2, width: "60%" }} />
        </div>

        {/* Body placeholder lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ height: 10, background: UI.muted, opacity: 0.25, borderRadius: 2 }} />
          <div style={{ height: 10, background: UI.muted, opacity: 0.25, borderRadius: 2 }} />
          <div style={{ height: 10, background: UI.muted, opacity: 0.25, borderRadius: 2, width: "70%" }} />
        </div>

        {/* Bottom meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 10,
            borderTop: `1px solid ${COLORS.grid}22`,
          }}
        >
          <Label>{article.issue}</Label>
          <Label>{article.readTime} min</Label>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        gridColumn: "1 / -1",
        padding: "80px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Label>Sin resultados</Label>
    </div>
  );
}

export default function ArticulosPage() {
  const [activeTopic, setActiveTopic] = useState("Todos");

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

  return (
    <Page light>
      {/* Header — estilo revista */}
      <div
        style={{
          borderBottom: bd,
          padding: "56px 48px 48px",
          background: UI.bg,
        }}
      >
        <h1
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(5rem, 14vw, 13rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            color: UI.text,
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          ARTÍCULOS
        </h1>
      </div>

      {/* Filter bar */}
      <div
        style={{
          borderBottom: bd,
          padding: "0 48px",
          background: UI.bg,
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: 56,
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        <Label>Categorías</Label>
        <div style={{ width: 1, height: 16, background: COLORS.grid, margin: "0 8px", flexShrink: 0 }} />
        {ARTICLE_TOPICS.map((topic) => (
          <FilterChip
            key={topic}
            topic={topic}
            active={activeTopic === topic}
            count={topicCounts[topic] ?? 0}
            onClick={() => setActiveTopic(topic)}
          />
        ))}
      </div>

      {/* 3-column card grid */}
      <div
        className="articles-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          borderLeft: "none",
          background: UI.bg,
        }}
      >
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          filtered.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))
        )}
      </div>
    </Page>
  );
}
