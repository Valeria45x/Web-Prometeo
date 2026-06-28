import { Link } from "react-router-dom";
import { formatPrice } from "@/data/tienda";
import { placeholderImage } from "@/lib/media";

export default function ProductCard({ product }) {
  const cover = product.images?.[0] ?? placeholderImage;
  return (
    <Link to={`/tienda/${product.id}`} className="shop-product-card">
      <div className="shop-product-card__media">
        <img
          src={cover}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
        <div className="shop-product-card__overlay">
          <span className="shop-product-card__overlay-label">
            Ver producto <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
      <div className="shop-product-card__info">
        <span className="shop-product-card__collection">
          {product.collection ?? "Serie 001"}
        </span>
        <h3 className="shop-product-card__name">{product.name}</h3>
        <span className="shop-product-card__price">
          {formatPrice(product.price)}
        </span>
      </div>
    </Link>
  );
}
