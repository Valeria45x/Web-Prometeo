import { formatArticleDate } from "@/data/articulos";
import { placeholderImage as articleImage } from "@/lib/media";
import { getArticleImagePosition } from "@/features/articulos/articulos.content";
import { ArrowIcon } from "@/features/articulos/components/icons";

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

export default function ArticleCard({ article, onOpen }) {
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
        <img src={articleImage} alt="" loading="lazy" decoding="async" />
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
