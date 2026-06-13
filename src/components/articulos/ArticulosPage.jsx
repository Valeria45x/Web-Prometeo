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
import Pagination from "../system/Pagination";
import "../landing/shared/scrollTextReveal.css";
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

const ARTICLES_PER_PAGE = 6;

const TOPIC_EXPLORER = {
  Todos: {
    title: "Todos los temas",
    description:
      "Explora la biblioteca completa: hábitos digitales, plataformas, decisiones de diseño, seguridad y derechos.",
  },
  Cookies: {
    title: "Cookies",
    description:
      "Entiende cómo una web reconoce tu visita, qué información conserva y cómo esos pequeños archivos pueden influir en la personalización, la publicidad y los precios.",
  },
  Algoritmos: {
    title: "Algoritmos",
    description:
      "Explora cómo las plataformas priorizan contenidos, anticipan intereses y toman decisiones automáticas a partir de señales sobre tu comportamiento.",
  },
  Redes: {
    title: "Redes",
    description:
      "Analiza qué ocurre con tus publicaciones, conexiones e interacciones cuando pasan a formar parte de los sistemas de una red social.",
  },
  Derechos: {
    title: "Derechos",
    description:
      "Aprende qué puedes consultar, corregir, limitar o eliminar y cómo ejercer mayor control sobre el uso que las organizaciones hacen de tus datos.",
  },
  "Dark patterns": {
    title: "Dark patterns",
    description:
      "Reconoce interfaces que ocultan opciones, añaden presión o hacen más difícil rechazar, cancelar y elegir con libertad.",
  },
  Seguridad: {
    title: "Seguridad",
    description:
      "Comprende amenazas habituales y adopta medidas claras para proteger tus cuentas, conexiones, dispositivos e información personal.",
  },
  Entrevistas: {
    title: "Entrevistas",
    description:
      "Conversaciones con voces del derecho, la investigación y el activismo digital. Perspectivas reales sobre privacidad, diseño y poder, explicadas sin jerga.",
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
    <div className="articles-meta" data-animate-text>
      <span>{article.topic}</span>
      <span aria-hidden="true">|</span>
      <span>{article.readTime} min</span>
      <span aria-hidden="true">|</span>
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
        </span>

        <span className="articles-card__title" data-animate-text>
          {article.title}
        </span>
        <span className="articles-card__dek" data-animate-text>
          {article.dek}
        </span>
      </span>

      <span className="articles-card__footer">
        <span className="articles-card__byline" data-animate-text>
          <span>{article.author}</span>
          <span>{formatArticleDate(article.date)}</span>
        </span>

        <span
          className="articles-card__action"
          aria-hidden="true"
          data-animate-text
        >
          <span>Abrir lectura</span>
          <ArrowIcon />
        </span>
      </span>
    </button>
  );
}

function ChevronIcon() {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ArticlesFilterBar({
  activeTopic,
  onTopicChange,
  topicCounts,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="articles-filters">
      <button
        type="button"
        className="articles-filters__toggle"
        aria-expanded={open}
        aria-controls="articles-filters-body"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="articles-filters__toggle-label">
          Filtrar por tema
        </span>
        {!open && activeTopic !== "Todos" && (
          <span className="articles-filters__toggle-active">
            {activeTopic}
          </span>
        )}
        <span
          className={[
            "articles-filters__toggle-icon",
            open && "articles-filters__toggle-icon--open",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <ChevronIcon />
        </span>
      </button>

      <div
        id="articles-filters-body"
        className={[
          "articles-filters__body",
          !open && "articles-filters__body--collapsed",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          className="articles-filters__options"
          role="group"
          aria-label="Filtrar artículos por tema"
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
              <span className="articles-filter__name">
                {topic}
              </span>
              <span className="articles-filter__count">
                {topicCounts[topic] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TopicExplorer({ activeTopic }) {
  const topic = TOPIC_EXPLORER[activeTopic] ?? TOPIC_EXPLORER.Todos;

  return (
    <Grid
      as="section"
      columns="site"
      className="articles-topic"
      aria-labelledby="articles-topic-heading"
      aria-live="polite"
    >
      <GridCell className="articles-topic__heading">
        <Label color={COLORS.textOnLight}>Sobre el tema</Label>
        <h2 id="articles-topic-heading">{topic.title}</h2>
      </GridCell>

      <GridCell
        span={3}
        collapseSpanOnTablet
        collapseSpanOnMobile
        className="articles-topic__description"
      >
        <p>{topic.description}</p>
      </GridCell>
    </Grid>
  );
}

function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("hidden"));
}

function ArticleNewsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const normalizedEmail = email.trim();

    if (!normalizedEmail) return;

    try {
      window.localStorage.setItem(
        "prometeo-newsletter-email",
        normalizedEmail,
      );
    } catch {
      // The confirmation still works when storage is unavailable.
    }

    setSubscribed(true);
  }

  return (
    <aside className="article-dialog__newsletter">
      <Label color={COLORS.textOnLight}>Newsletter gratis</Label>
      <h3>Una idea clara, una vez por semana.</h3>
      <p>
        Privacidad digital explicada sin ruido, con una acción útil para poner
        en práctica.
      </p>

      {subscribed ? (
        <p className="article-dialog__newsletter-success" role="status">
          Ya estás dentro. Gracias por leernos.
        </p>
      ) : (
        <form
          className="article-dialog__newsletter-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="article-newsletter-email">Tu correo</label>
          <input
            id="article-newsletter-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tu@email.com"
            autoComplete="email"
            required
          />
          <button type="submit">
            <span>Suscribirme gratis</span>
            <ArrowIcon />
          </button>
        </form>
      )}
    </aside>
  );
}

function ArticleModal({ article, onClose, triggerRef }) {
  const panelRef = useRef(null);
  const scrollRef = useRef(null);
  const closeButtonRef = useRef(null);
  const titleRef = useRef(null);
  const sectionRefs = useRef([]);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [showToolbarTitle, setShowToolbarTitle] = useState(false);
  const readingSections = useMemo(() => buildReadingSections(article), [article]);
  useScrollTextReveal(scrollRef, article.id);

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
      const scrollBounds = scrollNode.getBoundingClientRect();
      const isAtEnd =
        scrollNode.scrollTop + scrollNode.clientHeight >=
        scrollNode.scrollHeight - 4;
      let nextActiveSection = 0;
      let greatestVisibleArea = 0;

      sectionRefs.current.forEach((sectionNode, index) => {
        if (!sectionNode) return;

        const sectionBounds = sectionNode.getBoundingClientRect();
        const visibleArea = Math.max(
          0,
          Math.min(sectionBounds.bottom, scrollBounds.bottom) -
            Math.max(sectionBounds.top, scrollBounds.top),
        );

        if (visibleArea > greatestVisibleArea) {
          greatestVisibleArea = visibleArea;
          nextActiveSection = index;
        }
      });

      if (isAtEnd) {
        nextActiveSection = readingSections.length - 1;
      }

      const titleBounds = titleRef.current?.getBoundingClientRect();
      const nextShowToolbarTitle = titleBounds
        ? titleBounds.bottom <= scrollBounds.top + 16
        : false;

      setReadingProgress(nextProgress);
      setActiveSectionIndex(nextActiveSection);
      setShowToolbarTitle(nextShowToolbarTitle);
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

    const sectionBounds = sectionNode.getBoundingClientRect();
    const scrollBounds = scrollNode.getBoundingClientRect();
    const targetTop =
      scrollNode.scrollTop + sectionBounds.top - scrollBounds.top - 32;

    scrollNode.scrollTo({
      top: Math.max(targetTop, 0),
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
          <div
            className={[
              "article-dialog__toolbar-title",
              showToolbarTitle && "article-dialog__toolbar-title--visible",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden={!showToolbarTitle}
          >
            {article.title}
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
          <div className="article-dialog__hero">
            <div className="article-dialog__media-cell" aria-hidden="true">
              <div className="article-dialog__media">
                <img
                  src={articleImage}
                  alt=""
                  style={{ objectPosition: getArticleImagePosition(article) }}
                />
              </div>
            </div>

            <div className="article-dialog__summary">
              <h2 ref={titleRef} id={`article-title-${article.id}`}>
                {article.title}
              </h2>
              <p className="article-dialog__dek">{article.dek}</p>

              <dl className="article-dialog__meta-list">
                <div>
                  <dt>Autoría</dt>
                  <dd>{article.author}</dd>
                </div>
                <div>
                  <dt>Publicado</dt>
                  <dd>{formatArticleDate(article.date)}</dd>
                </div>
                <div>
                  <dt>Lectura</dt>
                  <dd>{article.readTime} min</dd>
                </div>
                <div>
                  <dt>Formato</dt>
                  <dd>{article.level}</dd>
                </div>
              </dl>
            </div>
          </div>

          <Grid columns="site" className="article-dialog__content">
            <GridCell className="article-dialog__rail">
              <div className="article-dialog__rail-sticky">
                <div className="article-dialog__rail-intro">
                  <Label color={COLORS.textOnLight}>Mapa de lectura</Label>
                  <p>
                    Salta entre ideas y vuelve a lo importante sin perder el
                    hilo.
                  </p>
                </div>

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
              <div className="article-dialog__sections">
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
                        <Label color={COLORS.textOnLight}>Para llevar contigo</Label>
                        <h3>Tres acciones posibles</h3>

                        <ul className="article-dialog__takeaways-list">
                          {article.takeaways.map(
                            (takeaway, takeawayIndex) => (
                              <li
                                key={takeaway}
                                className="article-dialog__takeaway"
                              >
                                <span className="article-dialog__takeaway-index">
                                  {String(takeawayIndex + 1).padStart(2, "0")}
                                </span>
                                <p>{takeaway}</p>
                              </li>
                            ),
                          )}
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
              </div>

              <ArticleNewsletter />
            </GridCell>
          </Grid>
        </div>
      </article>
    </div>,
    document.body,
  );
}

export default function ArticulosPage() {
  const pageRef = useRef(null);
  const heroImageRef = useRef(null);
  const resultsRef = useRef(null);
  const triggerRef = useRef(null);
  const [activeTopic, setActiveTopic] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
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
  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE),
  );
  const resolvedPage = Math.min(currentPage, totalPages);
  const pagedArticles = filteredArticles.slice(
    (resolvedPage - 1) * ARTICLES_PER_PAGE,
    resolvedPage * ARTICLES_PER_PAGE,
  );

  const selectedArticle = useMemo(
    () => ARTICLES.find((article) => article.id === articleId),
    [articleId],
  );
  useScrollTextReveal(pageRef);

  useEffect(() => {
    const image = heroImageRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = null;

    if (!image || reducedMotion.matches) return undefined;

    function updateParallax() {
      frameId = null;
      const frame = image.parentElement;
      const bounds = frame?.getBoundingClientRect();

      if (!bounds) return;

      const offset = Math.max(
        -44,
        Math.min(
          44,
          (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) * 0.08,
        ),
      );
      image.style.setProperty("--articles-hero-parallax", `${offset}px`);
    }

    function scheduleUpdate() {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateParallax);
    }

    updateParallax();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

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

  function changeTopic(topic) {
    setActiveTopic(topic);
    setCurrentPage(1);
  }

  function changePage(nextPage) {
    const boundedPage = Math.min(totalPages, Math.max(1, nextPage));

    if (boundedPage === resolvedPage) return;

    setCurrentPage(boundedPage);
    window.requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  return (
    <Page light>
      <div ref={pageRef} className="articles-page">
        <section className="articles-hero">
          <div className="articles-hero__bg" aria-hidden="true">
            <img
              ref={heroImageRef}
              src={articleImage}
              alt=""
              className="articles-hero__bg-img"
            />
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
                <Label color={COLORS.textOnLight} className="articles-hero__kicker">
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
            onTopicChange={changeTopic}
            topicCounts={topicCounts}
          />

          <TopicExplorer activeTopic={activeTopic} />

          <div className="articles-transition">
            <LandingTransitionSection light title="Las lecturas" column={4} />
          </div>

          {filteredArticles.length > 0 ? (
            <div ref={resultsRef} id="articles-results">
              <div className="articles-grid">
                {pagedArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onOpen={openArticle}
                  />
                ))}
              </div>

              <Pagination
                currentPage={resolvedPage}
                totalPages={totalPages}
                onPageChange={changePage}
                label="Páginas de artículos"
              />
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
