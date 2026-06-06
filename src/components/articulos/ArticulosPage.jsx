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
import "./articulos.css";
import articleImage from "../../../Instagram Feed USB v1.png";

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

const TOPIC_EXPLORER = {
  Todos: {
    title: "Una mirada amplia a tu privacidad digital.",
    description:
      "Recorre la biblioteca completa para conectar hábitos, plataformas, decisiones de diseño y derechos que forman parte de tu vida digital.",
  },
  Cookies: {
    title: "Cookies: qué recuerdan y para qué se usan.",
    description:
      "Entiende cómo una web reconoce tu visita, qué información conserva y cómo esos pequeños archivos pueden influir en la personalización, la publicidad y los precios.",
  },
  Algoritmos: {
    title: "Algoritmos que ordenan lo que ves.",
    description:
      "Explora cómo las plataformas priorizan contenidos, anticipan intereses y toman decisiones automáticas a partir de señales sobre tu comportamiento.",
  },
  Redes: {
    title: "Lo que compartes también construye un perfil.",
    description:
      "Analiza qué ocurre con tus publicaciones, conexiones e interacciones cuando pasan a formar parte de los sistemas de una red social.",
  },
  Derechos: {
    title: "Tus derechos también existen en internet.",
    description:
      "Aprende qué puedes consultar, corregir, limitar o eliminar y cómo ejercer mayor control sobre el uso que las organizaciones hacen de tus datos.",
  },
  "Dark patterns": {
    title: "Diseños que intentan decidir por ti.",
    description:
      "Reconoce interfaces que ocultan opciones, añaden presión o hacen más difícil rechazar, cancelar y elegir con libertad.",
  },
  Seguridad: {
    title: "Seguridad para reducir riesgos cotidianos.",
    description:
      "Comprende amenazas habituales y adopta medidas claras para proteger tus cuentas, conexiones, dispositivos e información personal.",
  },
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

function ArticlesFilterBar({
  activeTopic,
  onTopicChange,
  topicCounts,
}) {
  return (
    <div className="articles-filters">
      <div className="articles-filters__header">
        <div className="articles-filters__intro">
          <Label color={COLORS.accent}>Filtrar por tema</Label>
          <h2 id="articles-filter-heading">¿Qué quieres entender?</h2>
        </div>

        <p id="articles-filter-help" className="articles-filters__guide">
          Selecciona una categoría. El contexto y las lecturas se actualizarán
          debajo.
        </p>
      </div>

      <div
        className="articles-filters__options"
        role="group"
        aria-label="Filtrar artículos por tema"
        aria-describedby="articles-filter-help"
      >
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
            aria-controls="articles-results"
            onClick={() => onTopicChange(topic)}
          >
            <span className="articles-filter__name">{topic}</span>
            <span className="articles-filter__count">
              {topicCounts[topic] ?? 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TopicExplorer({ activeTopic, visibleCount }) {
  const topic = TOPIC_EXPLORER[activeTopic] ?? TOPIC_EXPLORER.Todos;
  const topicLabel =
    activeTopic === "Todos" ? "Todos los temas" : activeTopic;

  return (
    <section
      className="articles-topic"
      aria-labelledby="articles-topic-heading"
      aria-live="polite"
    >
      <div className="articles-topic__status">
        <div className="articles-topic__selection">
          <Label>Ahora estás viendo</Label>
          <strong>{topicLabel}</strong>
        </div>

        <span className="articles-topic__result">
          {visibleCount}{" "}
          {visibleCount === 1 ? "lectura disponible" : "lecturas disponibles"}
        </span>
      </div>

      <Grid columns="site" className="articles-topic__body">
        <GridCell className="articles-topic__spacer" aria-hidden="true" />
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="articles-topic__copy"
        >
          <h2 id="articles-topic-heading">{topic.title}</h2>
          <p>{topic.description}</p>
        </GridCell>
        <GridCell className="articles-topic__spacer" aria-hidden="true" />
      </Grid>
    </section>
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

        <div
          ref={scrollRef}
          className="article-dialog__scroll"
          data-lenis-prevent
        >
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
        <section className="articles-hero">
          <div className="articles-hero__bg" aria-hidden="true">
            <img src={articleImage} alt="" className="articles-hero__bg-img" />
            <div className="articles-hero__overlay" />
          </div>

          <Grid
            columns="site"
            className="articles-hero__content"
            style={{ gridTemplateRows: "auto auto" }}
          >
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="articles-hero__copy"
            >
              <div className="articles-hero__heading">
                <Label color={COLORS.accent} className="articles-hero__kicker">
                  Artículos Prometeo
                </Label>
                <h1 className="articles-hero__title">
                  <span>Una biblioteca para</span>
                  <span className="articles-accent">entender sin ruido.</span>
                </h1>
              </div>
            </GridCell>

            <GridCell
              span={2}
              className="articles-hero__copy-aside"
              aria-hidden="true"
            />

            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="articles-hero__desc-spacer"
              aria-hidden="true"
            />

            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="articles-hero__desc"
            >
              <p>
                Lecturas claras para orientarte sin saturarte. Cada artículo
                está pensado para ayudarte a comprender una señal, ubicar el
                problema y salir con una siguiente acción posible.
              </p>
            </GridCell>
          </Grid>
        </section>

        <div className="articles-transition">
          <LandingTransitionSection light title="La biblioteca" column={1} />
        </div>

        <section
          className="articles-library"
          aria-labelledby="articles-filter-heading"
        >
          <ArticlesFilterBar
            activeTopic={activeTopic}
            onTopicChange={setActiveTopic}
            topicCounts={topicCounts}
          />

          <TopicExplorer
            activeTopic={activeTopic}
            visibleCount={filteredArticles.length}
          />

          <div className="articles-transition">
            <LandingTransitionSection light title="Las lecturas" column={4} />
          </div>

          {filteredArticles.length > 0 ? (
            <div id="articles-results" className="articles-grid">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onOpen={openArticle}
                />
              ))}
            </div>
          ) : (
            <div id="articles-results" className="articles-empty">
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
