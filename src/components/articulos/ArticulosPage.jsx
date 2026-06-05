import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router-dom";
import {
  ARTICLES,
  ARTICLE_TOPICS,
  formatArticleDate,
} from "../../data/articulos";
import { COLORS } from "../../design/tokens";
import { useScrollTextReveal } from "../../hooks/useScrollTextReveal";
import { getLenisInstance } from "../../lib/lenis";
import { Page } from "../Page";
import LandingTransitionSection from "../landing/transition/LandingTransitionSection";
import { Grid, GridCell } from "../system/Grid";
import Label from "../system/Label";
import TextReveal from "../system/TextReveal";
import "../landing/shared/scrollTextReveal.css";
import "./articulos.css";
import articleImage from "../../../Instagram Feed USB v1.png";

const UI = {
  bg: COLORS.pageLight,
  text: COLORS.textOnLight,
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

function ArticleMeta({ article, compact = false }) {
  return (
    <div
      className={[
        "articles-meta",
        compact && "articles-meta--compact",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span>{article.topic}</span>
      <span aria-hidden="true">/</span>
      <span>{article.readTime} min</span>
    </div>
  );
}

function FeaturedArticleCard({ article, onOpen }) {
  return (
    <button
      type="button"
      className="articles-featured"
      onClick={(event) => onOpen(article, event.currentTarget)}
      aria-haspopup="dialog"
    >
      <span className="articles-featured__media" aria-hidden="true">
        <img src={articleImage} alt="" />
      </span>

      <span className="articles-featured__copy">
        <span className="articles-featured__eyebrow">
          <Label color={COLORS.accent}>Lectura destacada</Label>
          <ArticleMeta article={article} />
        </span>
        <span className="articles-featured__text">
          <span className="articles-featured__title">{article.title}</span>
          <span className="articles-featured__dek">{article.dek}</span>
        </span>
        <span className="articles-featured__footer">
          <span>{article.author}</span>
          <span>{formatArticleDate(article.date)}</span>
        </span>
      </span>

      <span className="articles-featured__action" aria-hidden="true">
        <ArrowIcon />
      </span>
    </button>
  );
}

function ArticleCard({ article, onOpen }) {
  return (
    <button
      type="button"
      className="articles-card"
      onClick={(event) => onOpen(article, event.currentTarget)}
      aria-haspopup="dialog"
    >
      <span className="articles-card__top">
        <ArticleMeta article={article} compact />
        <span className="articles-card__level">{article.level}</span>
      </span>

      <span className="articles-card__copy">
        <span className="articles-card__title">{article.title}</span>
        <span className="articles-card__dek">{article.dek}</span>
      </span>

      <span className="articles-card__footer">
        <span>Leer artículo</span>
        <ArrowIcon />
      </span>
    </button>
  );
}

function ArticlesFilterBar({ activeTopic, onTopicChange, topicCounts }) {
  return (
    <div className="articles-filters" aria-label="Filtrar artículos por tema">
      <span className="articles-filters__label">Explorar por tema</span>
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
  const closeButtonRef = useRef(null);

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
  }, [onClose, triggerRef]);

  return createPortal(
    <div
      className="article-dialog"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <article
        ref={panelRef}
        className="article-dialog__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`article-title-${article.id}`}
      >
        <header className="article-dialog__toolbar">
          <span className="article-dialog__issue">
            {article.issue} / {article.topic}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            className="article-dialog__close"
            onClick={onClose}
            aria-label="Cerrar artículo"
          >
            <span>Cerrar</span>
            <CloseIcon />
          </button>
        </header>

        <div className="article-dialog__scroll">
          <div className="article-dialog__media" aria-hidden="true">
            <img src={articleImage} alt="" />
          </div>

          <Grid columns="site" className="article-dialog__intro">
            <GridCell className="article-dialog__details">
              <ArticleMeta article={article} />
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
                  <dt>Formato</dt>
                  <dd>{article.level}</dd>
                </div>
              </dl>
            </GridCell>

            <GridCell
              span={3}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="article-dialog__heading"
            >
              <Label color={COLORS.accent}>{article.topic}</Label>
              <h2 id={`article-title-${article.id}`}>{article.title}</h2>
              <p>{article.dek}</p>
            </GridCell>
          </Grid>

          <div className="article-dialog__body">
            {article.sections.map((section) => (
              <section
                key={section.heading}
                className="article-dialog__section"
              >
                <h3>{section.heading}</h3>
                <div className="article-dialog__paragraphs">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            <section className="article-dialog__takeaways">
              <Label color={COLORS.accent}>Para llevar contigo</Label>
              <h3>Tres acciones posibles</h3>
              <ul>
                {article.takeaways.map((takeaway) => (
                  <li key={takeaway}>{takeaway}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>
    </div>,
    document.body,
  );
}

export default function ArticulosPage() {
  const pageRef = useRef(null);
  const triggerRef = useRef(null);
  const [activeTopic, setActiveTopic] = useState("Todos");
  const [searchParams, setSearchParams] = useSearchParams();
  useScrollTextReveal(pageRef);

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

  const filteredArticles = useMemo(
    () =>
      activeTopic === "Todos"
        ? ARTICLES
        : ARTICLES.filter((article) => article.topic === activeTopic),
    [activeTopic],
  );

  const selectedArticle = ARTICLES.find(
    (article) => article.id === searchParams.get("article"),
  );

  useEffect(() => {
    const articleId = searchParams.get("article");
    if (!articleId || selectedArticle) return;

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("article");
    setSearchParams(nextParams, { replace: true });
  }, [searchParams, selectedArticle, setSearchParams]);

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

  const featuredArticle = filteredArticles[0];
  const remainingArticles = filteredArticles.slice(1);

  return (
    <Page light>
      <div ref={pageRef} className="articles-page">
        <Grid as="section" columns="site" className="articles-hero">
          <GridCell
            span={3}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="articles-hero__copy"
          >
            <div className="articles-hero__heading">
              <Label color={COLORS.accent}>Para entender mejor</Label>
              <h1>Artículos</h1>
            </div>
            <p>
              Lecturas claras sobre privacidad digital para comprender una
              situación, reconocer sus señales y decidir qué hacer después.
            </p>
          </GridCell>

          <GridCell className="articles-hero__index">
            <span className="articles-hero__count">{ARTICLES.length}</span>
            <span className="articles-hero__count-label">
              lecturas para empezar
            </span>
            <span className="articles-hero__signal" aria-hidden="true" />
          </GridCell>
        </Grid>

        <div className="articles-transition">
          <LandingTransitionSection light title="La biblioteca" column={2} />
        </div>

        <section className="articles-library">
          <Grid columns="site" className="articles-library__intro">
            <GridCell className="articles-library__label">
              <Label color={COLORS.accent}>Elige una pregunta</Label>
            </GridCell>
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="articles-library__heading"
            >
              <TextReveal
                as="h2"
                once={false}
                lines={["Empieza por lo que", "ya te genera dudas."]}
                maskColor={UI.bg}
              />
            </GridCell>
            <GridCell className="articles-library__body">
              <p>
                No necesitas leerlo todo. Filtra por tema o abre la pieza que
                conecte con una situación concreta.
              </p>
            </GridCell>
          </Grid>

          <ArticlesFilterBar
            activeTopic={activeTopic}
            onTopicChange={setActiveTopic}
            topicCounts={topicCounts}
          />

          <div className="articles-results" aria-live="polite">
            <span>
              {activeTopic === "Todos" ? "Todas las lecturas" : activeTopic}
            </span>
            <span>
              {filteredArticles.length}{" "}
              {filteredArticles.length === 1 ? "artículo" : "artículos"}
            </span>
          </div>

          {featuredArticle ? (
            <>
              <FeaturedArticleCard
                article={featuredArticle}
                onOpen={openArticle}
              />

              {remainingArticles.length > 0 ? (
                <div className="articles-grid">
                  {remainingArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onOpen={openArticle}
                    />
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <div className="articles-empty">
              No hay artículos disponibles en este tema.
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
