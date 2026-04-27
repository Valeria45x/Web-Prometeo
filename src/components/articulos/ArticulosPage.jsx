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

/* ── Article card ── */
function ArticleCard({ article, index }) {
  const [hovered, setHovered] = useState(false);
  const isLast = index % 3 === 2;

  return (
    <div
      style={{
        borderRight: isLast ? "none" : bd,
        borderBottom: bd,
        background: hovered ? "#2b2f34" : UI.bg,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "background 0.12s, color 0.12s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ImagePlaceholder />
      <div
        style={{
          padding: "20px 24px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
            {formatArticleDate(article.date)}
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
              border: `1px solid ${article.featured ? COLORS.accent : hovered ? COLORS.textOnDark : UI.muted}`,
              padding: "3px 8px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {article.level}
          </span>
        </div>

        <h3
          style={{
            margin: 0,
            fontFamily: FONTS.display,
            fontSize: 22,
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
            fontSize: 14,
            lineHeight: 1.6,
            color: hovered ? COLORS.textOnDark : UI.muted,
            opacity: hovered ? 0.9 : 1,
          }}
        >
          {article.dek}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 10,
            borderTop: `1px solid ${hovered ? "rgba(232,232,232,0.35)" : UI.mediaLine}`,
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
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                ...mono,
                fontSize: 8,
                color: hovered ? COLORS.textOnDark : UI.muted,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {article.issue}
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

/* ── Hero ── */
function ArticlesHero({
  activeTopic,
  onTopicChange,
  topicCounts,
  resultCount,
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
        <Label accent>004 — Artículos</Label>
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
          justifyContent: "space-between",
          padding: "72px 40px 64px",
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
          <Label>{resultCount === 1 ? "artículo" : "artículos"}</Label>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Label>Filtro activo</Label>
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: 18,
              fontWeight: 900,
              color: UI.text,
            }}
          >
            {activeTopic}
          </span>
        </div>
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
            activeTopic={activeTopic}
            onTopicChange={setActiveTopic}
            topicCounts={topicCounts}
            resultCount={filtered.length}
          />

          <HeroTransitionGrid background={UI.bg} border={bd} />

          <ArticlesFilterBar
            activeTopic={activeTopic}
            onTopicChange={setActiveTopic}
            topicCounts={topicCounts}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              background: UI.bg,
            }}
          >
            {filtered.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
            {filtered.length % 3 !== 0 &&
              Array.from({ length: 3 - (filtered.length % 3) }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  style={{
                    borderRight:
                      i < 3 - (filtered.length % 3) - 1 ? bd : "none",
                    borderBottom: bd,
                    background: UI.panel,
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </Page>
  );
}
