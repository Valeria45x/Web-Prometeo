import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { formatArticleDate } from "@/data/articulos";
import { COLORS } from "@/design/tokens";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";
import { Grid, GridCell } from "@/shared/ui/Grid";
import Label from "@/shared/ui/Label";
import { placeholderImage as articleImage } from "@/lib/media";
import {
  buildReadingSections,
  getArticleImagePosition,
} from "@/features/articulos/articulos.content";
import { CloseIcon } from "@/features/articulos/components/icons";
import ArticleNewsletter from "@/features/articulos/components/ArticleNewsletter";
import { useArticleModalChrome } from "@/features/articulos/hooks/useArticleModalChrome";
import { useReadingProgress } from "@/features/articulos/hooks/useReadingProgress";

// Copia de respaldo para contextos sin Clipboard API (http o navegadores viejos).
function fallbackCopy(text, onDone) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    onDone();
  } catch {
    // Sin copia disponible: no hacemos nada para no romper la lectura.
  }
  document.body.removeChild(textarea);
}

export default function ArticleModal({ article, onClose, triggerRef }) {
  const panelRef = useRef(null);
  const scrollRef = useRef(null);
  const closeButtonRef = useRef(null);
  const titleRef = useRef(null);
  const sectionRefs = useRef([]);
  const readingSections = useMemo(
    () => buildReadingSections(article),
    [article],
  );
  const [copied, setCopied] = useState(false);

  function handleCopyLink() {
    const url = new URL(window.location.href);
    url.hash = "";
    url.search = "";
    url.searchParams.set("article", article.id);
    const link = url.toString();

    const markCopied = () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(link)
        .then(markCopied, () => fallbackCopy(link, markCopied));
    } else {
      fallbackCopy(link, markCopied);
    }
  }

  useScrollTextReveal(scrollRef, article.id);
  useArticleModalChrome({
    panelRef,
    scrollRef,
    closeButtonRef,
    onClose,
    triggerRef,
    articleId: article.id,
  });
  const { readingProgress, activeSectionIndex, showToolbarTitle } =
    useReadingProgress({
      scrollRef,
      titleRef,
      sectionRefs,
      readingSections,
      articleId: article.id,
    });

  function scrollToSection(index) {
    const sectionNode = sectionRefs.current[index];
    const scrollNode = scrollRef.current;
    if (!sectionNode || !scrollNode) return;

    const sectionBounds = sectionNode.getBoundingClientRect();
    const scrollBounds = scrollNode.getBoundingClientRect();
    const targetTop =
      scrollNode.scrollTop + sectionBounds.top - scrollBounds.top - 32;

    scrollNode.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
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

          <div className="article-dialog__toolbar-actions">
            <button
              type="button"
              className="article-dialog__share"
              onClick={handleCopyLink}
            >
              <span aria-live="polite">
                {copied ? "Enlace copiado" : "Copiar enlace"}
              </span>
            </button>

            <button
              ref={closeButtonRef}
              type="button"
              className="article-dialog__close"
              onClick={onClose}
              aria-label="Volver a artículos"
            >
              <span className="article-dialog__close-text">
                Volver a artículos
              </span>
              <span className="article-dialog__close-icon" aria-hidden="true">
                <CloseIcon />
              </span>
            </button>
          </div>
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
                  loading="lazy"
                  decoding="async"
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
                        <Label color={COLORS.textOnLight}>
                          Para llevar contigo
                        </Label>
                        <h3>Tres acciones posibles</h3>

                        <ul className="article-dialog__takeaways-list">
                          {article.takeaways.map((takeaway, takeawayIndex) => (
                            <li
                              key={takeaway}
                              className="article-dialog__takeaway"
                            >
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
