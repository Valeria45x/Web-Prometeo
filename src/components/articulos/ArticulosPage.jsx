import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router-dom";
import {
  ARTICLES,
  ARTICLE_TOPICS,
  formatArticleDate,
} from "../../data/articulos";
import { COLORS } from "../../design/tokens";
import { getLenisInstance } from "../../lib/lenis";
import { Page } from "../Page";
import LandingTransitionSection from "../landing/transition/LandingTransitionSection";
import { Grid, GridCell } from "../system/Grid";
import Label from "../system/Label";
import TextReveal from "../system/TextReveal";
import "./articulos.css";
import articleImage from "../../../Instagram Feed USB v1.png";

const UI = {
  bg: COLORS.pageLight,
};

const ARTICLE_MEDIA_POSITIONS = {
  "cookies-precios": "center 44%",
  "algoritmo-antes-buscar": "center 58%",
  "wifi-cafeterias": "center 52%",
  "dark-patterns-consentimiento": "center 38%",
  "tipos-cookies": "center 46%",
  "fijacion-dinamica-precios": "center 62%",
  "perfil-publicitario": "center 54%",
  "man-in-the-middle": "center 48%",
};

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 5 19 19" />
      <path d="M19 5 5 19" />
    </svg>
  );
}

function getArticleImagePosition(article) {
  return ARTICLE_MEDIA_POSITIONS[article.id] ?? "center 50%";
}

function buildReadingSections(article) {
  return [
    ...article.sections.map((section, index) => ({
      id: `${article.id}-section-${index}`,
      label: section.heading,
      kind: "section",
      section,
    })),
    {
      id: `${article.id}-takeaways`,
      label: "Para llevar contigo",
      kind: "takeaways",
    },
  ];
}

function ArticleMeta({ article }) {
  return (
    <div className="articles-meta">
      <span>{article.topic}</span>
      <span aria-hidden="true">/</span>
      <span>{article.readTime} min</span>
      <span aria-hidden="true">/</span>
      <span>{article.level}</span>
    </div>
  );
}

function ArticleCard({ article, onOpen }) {
  return (
    <button
      type="button"
      className="articles-card"
      onClick={(event) => onOpen(article, event.currentTarget)}
      aria-haspopup="dialog"
      style={{
        "--articles-card-media-position": getArticleImagePosition(article),
      }}
    >
      <span className="articles-card__media" aria-hidden="true">
        <img src={articleImage} alt="" />
      </span>

      <span className="articles-card__body">
        <span className="articles-card__eyebrow">
          <ArticleMeta article={article} />
          <span className="articles-card__issue">{article.issue}</span>
        </span>

        <span className="articles-card__title">{article.title}</span>
        <span className="articles-card__dek">{article.dek}</span>
      </span>

      <span className="articles-card__footer">
        <span className="articles-card__byline">
          <span>{article.author}</span>
          <span>{formatArticleDate(article.date)}</span>
        </span>

        <span className="articles-card__action" aria-hidden="true">
          <span>Abrir lectura</span>
          <ArrowIcon />
        </span>
      </span>
    </button>
  );
}

function ArticlesFilterBar({ activeTopic, onTopicChange, topicCounts }) {
  return (
    <div className="articles-filters" aria-label="Filtrar artículos por tema">
      <div className="articles-filters__label">
        <Label color={COLORS.accent}>Temas</Label>
        <p>Empieza por la situación que más se parece a lo que te preocupa hoy.</p>
      </div>

      <div className="articles-filters__options">
        {ARTICLE_TOPICS.map((topic) => (
          <button
            key={topic}
            type="button"
            className={[
              "articles-filter",
              activeTopic === topic && "articles-filter--active",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-pressed={activeTopic === topic}
            onClick={() => onTopicChange(topic)}
          >
            <span>{topic}</span>
            <span className="articles-filter__count">
              {topicCounts[topic] ?? 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("hidden"));
}

function ArticleModal({ article, onClose, triggerRef }) {
  const panelRef = useRef(null);
  const scrollRef = useRef(null);
  const closeButtonRef = useRef(null);
  const sectionRefs = useRef([]);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const readingSections = useMemo(() => buildReadingSections(article), [article]);

  useEffect(() => {
    sectionRefs.current = [];
  }, [article.id]);

  useEffect(() => {
    const panel = panelRef.current;
    const main = document.querySelector("#contenido-principal");
    const lenis = getLenisInstance();
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = "hidden";
    if (main) main.inert = true;
    lenis?.stop();
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusable = getFocusableElements(panel);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      if (main) main.inert = false;
      lenis?.start();
      window.requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    };
  }, [article.id, onClose, triggerRef]);

  useEffect(() => {
    const scrollNode = scrollRef.current;

    if (!scrollNode) return undefined;

    function updateReadingState() {
      const maxScroll = scrollNode.scrollHeight - scrollNode.clientHeight;
      const nextProgress = maxScroll > 0 ? scrollNode.scrollTop / maxScroll : 0;
      const threshold = scrollNode.scrollTop + scrollNode.clientHeight * 0.28;
      let nextActiveSection = 0;

      sectionRefs.current.forEach((sectionNode, index) => {
        if (sectionNode && sectionNode.offsetTop <= threshold) {
          nextActiveSection = index;
        }
      });

      setReadingProgress(nextProgress);
      setActiveSectionIndex(nextActiveSection);
    }

    updateReadingState();
    scrollNode.addEventListener("scroll", updateReadingState, { passive: true });
    window.addEventListener("resize", updateReadingState);

    return () => {
      scrollNode.removeEventListener("scroll", updateReadingState);
      window.removeEventListener("resize", updateReadingState);
    };
  }, [readingSections]);

  function scrollToSection(index) {
    const sectionNode = sectionRefs.current[index];
    const scrollNode = scrollRef.current;

    if (!sectionNode || !scrollNode) return;

    scrollNode.scrollTo({
      top: Math.max(sectionNode.offsetTop - 32, 0),
      behavior: "smooth",
    });
  }

  return createPortal(
    <div className="article-dialog">
      <article
        ref={panelRef}
        className="article-dialog__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`article-title-${article.id}`}
      >
        <header className="article-dialog__toolbar">
          <div className="article-dialog__toolbar-copy">
            <span>{article.issue}</span>
            <span aria-hidden="true">/</span>
            <span>{article.topic}</span>
          </div>

          <div className="article-dialog__toolbar-reading" aria-live="polite">
            <span>{Math.round(readingProgress * 100)}% leído</span>
            <span>
              {activeSectionIndex + 1}/{readingSections.length}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className="article-dialog__close"
            onClick={onClose}
            aria-label="Volver a artículos"
          >
            <span>Volver a artículos</span>
            <CloseIcon />
          </button>
        </header>

        <div className="article-dialog__progress" aria-hidden="true">
          <span
            className="article-dialog__progress-bar"
            style={{ transform: `scaleX(${readingProgress})` }}
          />
        </div>

        <div ref={scrollRef} className="article-dialog__scroll">
          <Grid columns="site" className="article-dialog__hero">
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="article-dialog__media-cell"
            >
              <div className="article-dialog__media" aria-hidden="true">
                <img
                  src={articleImage}
                  alt=""
                  style={{ objectPosition: getArticleImagePosition(article) }}
                />
              </div>
            </GridCell>

            <GridCell className="article-dialog__summary">
              <Label color={COLORS.accent}>{article.topic}</Label>
              <ArticleMeta article={article} />
              <h2 id={`article-title-${article.id}`}>{article.title}</h2>
              <p>{article.dek}</p>
            </GridCell>

            <GridCell className="article-dialog__details">
              <div className="article-dialog__reading-state">
                <span className="article-dialog__reading-value">
                  {Math.round(readingProgress * 100)}%
                </span>
                <span className="article-dialog__reading-label">
                  progreso de lectura
                </span>
              </div>

              <dl>
                <div>
                  <dt>Autoría</dt>
                  <dd>{article.author}</dd>
                </div>
                <div>
                  <dt>Publicado</dt>
                  <dd>{formatArticleDate(article.date)}</dd>
                </div>
                <div>
                  <dt>Tiempo estimado</dt>
                  <dd>{article.readTime} min</dd>
                </div>
                <div>
                  <dt>Formato</dt>
                  <dd>{article.level}</dd>
                </div>
              </dl>
            </GridCell>
          </Grid>

          <Grid columns="site" className="article-dialog__content">
            <GridCell className="article-dialog__rail">
              <div className="article-dialog__rail-sticky">
                <Label color={COLORS.accent}>Mapa de lectura</Label>
                <p>
                  Un recorrido claro para entrar, retener lo importante y volver
                  a un punto concreto sin perderte.
                </p>

                <ol className="article-dialog__section-nav">
                  {readingSections.map((section, index) => {
                    const isActive = index === activeSectionIndex;

                    return (
                      <li key={section.id}>
                        <button
                          type="button"
                          className={[
                            "article-dialog__section-link",
                            isActive && "article-dialog__section-link--active",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          onClick={() => scrollToSection(index)}
                        >
                          <span className="article-dialog__section-index">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{section.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </GridCell>

            <GridCell
              span={3}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="article-dialog__body"
            >
              {readingSections.map((entry, index) => {
                if (entry.kind === "takeaways") {
                  return (
                    <section
                      key={entry.id}
                      ref={(node) => {
                        sectionRefs.current[index] = node;
                      }}
                      className="article-dialog__takeaways"
                    >
                      <Label color={COLORS.accent}>Para llevar contigo</Label>
                      <h3>Tres acciones posibles</h3>

                      <ul className="article-dialog__takeaways-list">
                        {article.takeaways.map((takeaway, takeawayIndex) => (
                          <li key={takeaway} className="article-dialog__takeaway">
                            <span className="article-dialog__takeaway-index">
                              {String(takeawayIndex + 1).padStart(2, "0")}
                            </span>
                            <p>{takeaway}</p>
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                }

                return (
                  <section
                    key={entry.id}
                    ref={(node) => {
                      sectionRefs.current[index] = node;
                    }}
                    className="article-dialog__section"
                  >
                    <h3>{entry.section.heading}</h3>

                    <div className="article-dialog__paragraphs">
                      {entry.section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                );
              })}
            </GridCell>
          </Grid>
        </div>
      </article>
    </div>,
    document.body,
  );
}

export default function ArticulosPage() {
  const triggerRef = useRef(null);
  const [activeTopic, setActiveTopic] = useState("Todos");
  const [searchParams, setSearchParams] = useSearchParams();
  const articleId = searchParams.get("article");

  const totalTopics = ARTICLE_TOPICS.length - 1;
  const averageReadTime = useMemo(
    () =>
      Math.round(
        ARTICLES.reduce((total, article) => total + article.readTime, 0) /
          ARTICLES.length,
      ),
    [],
  );

  const topicCounts = useMemo(() => {
    const counts = { Todos: ARTICLES.length };

    ARTICLES.forEach((article) => {
      counts[article.topic] = (counts[article.topic] ?? 0) + 1;
    });

    return counts;
  }, []);

  const filteredArticles = useMemo(
    () =>
      activeTopic === "Todos"
        ? ARTICLES
        : ARTICLES.filter((article) => article.topic === activeTopic),
    [activeTopic],
  );

  const selectedArticle = useMemo(
    () => ARTICLES.find((article) => article.id === articleId),
    [articleId],
  );

  useEffect(() => {
    if (!articleId || selectedArticle) return;

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("article");
    setSearchParams(nextParams, { replace: true });
  }, [articleId, searchParams, selectedArticle, setSearchParams]);

  function openArticle(article, trigger) {
    triggerRef.current = trigger;
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("article", article.id);
    setSearchParams(nextParams);
  }

  function closeArticle() {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("article");
    setSearchParams(nextParams, { replace: true });
  }

  return (
    <Page light>
      <div className="articles-page">
        <Grid as="section" columns="site" className="articles-hero">
          <GridCell
            span={2}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="articles-hero__copy"
          >
            <div className="articles-hero__meta">
              <Label color={COLORS.accent}>Artículos Prometeo</Label>
              <span className="articles-kicker">Biblioteca para decidir mejor</span>
            </div>

            <TextReveal
              as="h1"
              once={false}
              lines={[
                "Una biblioteca para",
                <span className="articles-accent">entender sin ruido.</span>,
              ]}
              maskColor={UI.bg}
              className="articles-hero__title"
            />
          </GridCell>

          <GridCell className="articles-hero__body">
            <p>
              Lecturas claras para orientarte sin saturarte. Cada artículo está
              pensado para ayudarte a comprender una señal, ubicar el problema y
              salir con una siguiente acción posible.
            </p>

            <div className="articles-hero__stats" aria-label="Datos de la biblioteca">
              <div>
                <span className="articles-hero__stat-value">{ARTICLES.length}</span>
                <span className="articles-hero__stat-label">lecturas base</span>
              </div>
              <div>
                <span className="articles-hero__stat-value">{totalTopics}</span>
                <span className="articles-hero__stat-label">temas para empezar</span>
              </div>
              <div>
                <span className="articles-hero__stat-value">{averageReadTime}</span>
                <span className="articles-hero__stat-label">min de lectura media</span>
              </div>
            </div>
          </GridCell>

          <GridCell className="articles-hero__media-cell">
            <div className="articles-hero__media" aria-hidden="true">
              <img src={articleImage} alt="" />
            </div>
          </GridCell>
        </Grid>

        <div className="articles-transition">
          <LandingTransitionSection light title="La biblioteca" column={2} />
        </div>

        <Grid as="section" columns="site" className="articles-library__intro">
          <GridCell className="articles-library__label">
            <Label color={COLORS.accent}>Archivo vivo</Label>
          </GridCell>

          <GridCell
            span={2}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="articles-library__heading"
          >
            <h2>Explora por situación, no por ruido.</h2>
          </GridCell>

          <GridCell className="articles-library__body">
            <p>
              El catálogo está ordenado para ayudarte a entrar rápido, comparar
              temas y elegir una lectura sin jerarquías artificiales.
            </p>
          </GridCell>
        </Grid>

        <section className="articles-library">
          <ArticlesFilterBar
            activeTopic={activeTopic}
            onTopicChange={setActiveTopic}
            topicCounts={topicCounts}
          />

          <div className="articles-results" aria-live="polite">
            <span>
              {activeTopic === "Todos"
                ? "Todas las lecturas disponibles"
                : `Lecturas sobre ${activeTopic}`}
            </span>
            <span>
              {filteredArticles.length} {filteredArticles.length === 1 ? "artículo" : "artículos"}
            </span>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="articles-grid">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onOpen={openArticle}
                />
              ))}
            </div>
          ) : (
            <div className="articles-empty">
              No hay artículos disponibles en este tema por ahora.
            </div>
          )}
        </section>
      </div>

      {selectedArticle ? (
        <ArticleModal
          article={selectedArticle}
          onClose={closeArticle}
          triggerRef={triggerRef}
        />
      ) : null}
    </Page>
  );
}