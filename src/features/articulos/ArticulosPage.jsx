import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ARTICLES } from "@/data/articulos";
import { COLORS } from "@/design/tokens";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";
import { Page } from "@/shared/layout/Page";
import TransitionSection from "@/shared/transition/TransitionSection";
import { Grid, GridCell } from "@/shared/ui/Grid";
import Label from "@/shared/ui/Label";
import Pagination from "@/shared/ui/Pagination";
import { placeholderImage as articleImage } from "@/lib/media";
import { ARTICLES_PER_PAGE } from "@/features/articulos/articulos.content";
import ArticleCard from "@/features/articulos/components/ArticleCard";
import ArticlesFilterBar from "@/features/articulos/components/ArticlesFilterBar";
import ArticleModal from "@/features/articulos/components/ArticleModal";
import { useArticlesHeroParallax } from "@/features/articulos/hooks/useArticlesHeroParallax";
import "@/shared/styles/scrollTextReveal.css";
import "@/features/articulos/articulos.css";

export default function ArticulosPage() {
  const pageRef = useRef(null);
  const resultsRef = useRef(null);
  const triggerRef = useRef(null);
  const heroImageRef = useArticlesHeroParallax();
  const [activeTopic, setActiveTopic] = useState("Todos");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const articleId = searchParams.get("article");

  useScrollTextReveal(pageRef);

  const topicCounts = useMemo(() => {
    const counts = { Todos: ARTICLES.length };
    ARTICLES.forEach((article) => {
      counts[article.topic] = (counts[article.topic] ?? 0) + 1;
    });
    return counts;
  }, []);

  // Texto buscable por artículo (título, dek, tema, autor y cuerpo), calculado
  // una vez. Permite buscar dentro del contenido, no solo en el título.
  const haystacks = useMemo(
    () =>
      new Map(
        ARTICLES.map((article) => [
          article.id,
          [
            article.title,
            article.dek,
            article.topic,
            article.author,
            article.level,
            ...article.sections.flatMap((section) => [
              section.heading,
              ...section.paragraphs,
            ]),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase(),
        ]),
      ),
    [],
  );

  const normalizedQuery = query.trim().toLowerCase();

  const filteredArticles = useMemo(() => {
    const byTopic =
      activeTopic === "Todos"
        ? ARTICLES
        : ARTICLES.filter((article) => article.topic === activeTopic);
    if (!normalizedQuery) return byTopic;
    return byTopic.filter((article) =>
      haystacks.get(article.id)?.includes(normalizedQuery),
    );
  }, [activeTopic, normalizedQuery, haystacks]);
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
  useDocumentTitle(selectedArticle ? selectedArticle.title : "Artículos");

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

  function changeQuery(value) {
    setQuery(value);
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
              decoding="async"
              fetchPriority="high"
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
                <Label
                  color={COLORS.textOnLight}
                  className="articles-hero__kicker"
                >
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
          <TransitionSection light title="La biblioteca" column={1} />
        </div>

        <section
          className="articles-library"
          aria-labelledby="articles-filter-heading"
        >
          <ArticlesFilterBar
            activeTopic={activeTopic}
            onTopicChange={changeTopic}
            topicCounts={topicCounts}
            query={query}
            onQueryChange={changeQuery}
          />

          <div className="articles-transition">
            <TransitionSection light title="Las lecturas" column={4} />
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
              {normalizedQuery
                ? `No hay artículos que coincidan con “${query.trim()}”.`
                : "No hay artículos disponibles en este tema por ahora."}
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
