import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Page } from "../Page";
import AuthModal from "../comunidad/AuthModal";
import LandingTransitionSection from "../landing/transition/LandingTransitionSection";
import {
  ACCOUNT_JOURNEY,
  getAccountHandleLine,
} from "../account/accountJourney";
import { PRODUCTS, CATEGORIES, formatPrice } from "../../data/tienda";
import { useComunidad } from "../../context/ComunidadContext";
import { useTienda } from "../../context/TiendaContext";
import { useScrollTextReveal } from "../../hooks/useScrollTextReveal";
import placeholderImage from "../../../Instagram Feed USB v1.png";
import "../landing/shared/scrollTextReveal.css";
import "./tienda.css";

function ProductCard({ product }) {
  return (
    <Link to={`/tienda/${product.id}`} className="shop-product-card">
      <div className="shop-product-card__media">
        <img
          src={placeholderImage}
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

function FilterBar({ activeCategory, onCategoryChange, count }) {
  return (
    <div className="shop-filterbar-modern">
      <span className="shop-filterbar-modern__label">Colección</span>
      <div className="shop-filterbar-modern__categories">
        {CATEGORIES.map((category) => {
          const active = activeCategory === category.id;
          return (
            <button
              type="button"
              key={String(category.id)}
              onClick={() => onCategoryChange(category.id)}
              className={[
                "shop-filterbar-modern__btn",
                active && "shop-filterbar-modern__btn--active",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {category.label}
            </button>
          );
        })}
      </div>
      <span className="shop-filterbar-modern__count">
        {count} {count === 1 ? "producto" : "productos"}
      </span>
    </div>
  );
}

function ProductsGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="shop-grid--empty">
        Sin productos en esta categoría.
      </div>
    );
  }

  return (
    <div className="shop-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function CartModal({
  cart,
  cartTotal,
  checkoutMessage,
  onCheckout,
  onRemove,
  onClear,
  onClose,
}) {
  return (
    <div
      className="shop-modal shop-modal--drawer"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside className="shop-cart" aria-label="Carrito">
        <div className="shop-cart__header">
          <div>
            <span className="shop-cart__eyebrow">Tu selección</span>
            <h2>Carrito</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shop-cart__close"
            aria-label="Cerrar carrito"
          >
            ×
          </button>
        </div>

        <div className="shop-cart__items">
          {cart.length === 0 ? (
            <p className="shop-cart__empty">
              El carrito está vacío. Explora la colección y guarda aquí tus
              piezas.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.productId}-${item.variant ?? "default"}`}
                className="shop-cart__item"
              >
                <div>
                  <strong>{item.product.name}</strong>
                  <span>
                    {item.quantity} x {formatPrice(item.product.price)}
                    {item.variant ? ` / ${item.variant}` : ""}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(item.productId, item.variant)}
                  className="shop-cart__remove"
                  aria-label={`Quitar ${item.product.name}`}
                >
                  Quitar
                </button>
              </div>
            ))
          )}
        </div>

        <div className="shop-cart__footer">
          {checkoutMessage && (
            <p className="shop-cart__message">{checkoutMessage}</p>
          )}
          <div className="shop-cart__total">
            <span>Total</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
          <button
            type="button"
            disabled={cart.length === 0}
            onClick={onCheckout}
            className="shop-cart__primary"
          >
            Finalizar pedido
          </button>
          <button
            type="button"
            disabled={cart.length === 0}
            onClick={onClear}
            className="shop-cart__secondary"
          >
            Vaciar carrito
          </button>
        </div>
      </aside>
    </div>
  );
}

function ComingSoonModal({ onClose }) {
  return (
    <div
      className="shop-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="shop-coming-soon">
        <span>Próxima colección</span>
        <h2>Serie 002</h2>
        <p>
          La Serie 002 está en proceso. Próximamente anunciaremos fecha, piezas
          y acceso anticipado.
        </p>
        <button type="button" onClick={onClose}>
          Entendido
        </button>
      </div>
    </div>
  );
}

function ShopHero({
  cartCount,
  cartTotal,
  currentUser,
  onOpenAuth,
  onOpenCart,
  onOpenProfile,
}) {
  return (
    <section className="shop-hero-modern">
      <div className="shop-hero-modern__title">
        <span className="shop-hero-modern__eyebrow">Serie 001</span>
        <h1 className="shop-hero-modern__heading">Tienda</h1>
        <p className="shop-hero-modern__desc">
          Objetos que trasladan la conversación sobre privacidad digital al
          espacio cotidiano.
        </p>
      </div>

      <div className="shop-hero-modern__utility">
        <div className="shop-hero-modern__cart">
          <div className="shop-hero-modern__utility-heading">
            <span>Carrito</span>
            <strong>{cartCount}</strong>
          </div>
          <div className="shop-hero-modern__cart-row">
            <span>Subtotal</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
          <button
            type="button"
            className="shop-hero-modern__cart-btn"
            onClick={onOpenCart}
          >
            <span>Ver carrito</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="shop-hero-modern__account">
          <span className="shop-hero-modern__account-label">
            {ACCOUNT_JOURNEY.brand}
          </span>
          <div className="shop-hero-modern__account-copy">
            {currentUser ? (
              <>
                <strong>{currentUser.displayName}</strong>
                <span>{getAccountHandleLine(currentUser)}</span>
              </>
            ) : (
              <p>{ACCOUNT_JOURNEY.contexts.shop.guest}</p>
            )}
          </div>
          <button
            type="button"
            className="shop-hero-modern__account-btn"
            onClick={currentUser ? onOpenProfile : onOpenAuth}
          >
            <span>
              {currentUser
                ? ACCOUNT_JOURNEY.profileCta
                : ACCOUNT_JOURNEY.guestCta}
            </span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default function TiendaPage() {
  const pageRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const navigate = useNavigate();
  const { currentUser, showAuthModal, setShowAuthModal } = useComunidad();
  const {
    cart,
    cartCount,
    cartTotal,
    removeItem,
    clearCart,
    completeCheckout,
  } = useTienda();

  const filtered = useMemo(() => {
    if (!activeCategory) return PRODUCTS;
    return PRODUCTS.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  useScrollTextReveal(pageRef);

  function handleCategoryChange(categoryId) {
    if (categoryId === "serie-002") {
      setShowComingSoon(true);
      return;
    }
    setActiveCategory(categoryId);
  }

  return (
    <Page light>
      <div ref={pageRef} className="shop-page">
        <ShopHero
          cartCount={cartCount}
          cartTotal={cartTotal}
          currentUser={currentUser}
          onOpenAuth={() => setShowAuthModal(true)}
          onOpenCart={() => setShowCart(true)}
          onOpenProfile={() => navigate("/perfil")}
        />
        <div className="shop-transition">
          <LandingTransitionSection light title="La colección" column={2} />
        </div>
        <FilterBar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          count={filtered.length}
        />
        <ProductsGrid products={filtered} />
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showCart && (
        <CartModal
          cart={cart}
          cartTotal={cartTotal}
          checkoutMessage={checkoutMessage}
          onCheckout={() => {
            const order = completeCheckout(currentUser?.id ?? null);
            if (order) {
              setCheckoutMessage(
                "Pedido preparado. Te contactaremos para finalizar el pago.",
              );
            }
          }}
          onRemove={removeItem}
          onClear={() => {
            clearCart();
            setCheckoutMessage("");
          }}
          onClose={() => {
            setShowCart(false);
            setCheckoutMessage("");
          }}
        />
      )}
      {showComingSoon && (
        <ComingSoonModal onClose={() => setShowComingSoon(false)} />
      )}
    </Page>
  );
}
