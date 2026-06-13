import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { COLORS, FONTS } from "../../design/tokens";
import { Page } from "../Page";
import AuthModal from "../comunidad/AuthModal";
import LandingTransitionSection from "../landing/transition/LandingTransitionSection";
import Label from "../system/Label";
import SplitCtaButton from "../system/SplitCtaButton";
import { Grid, GridCell } from "../system/Grid";
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

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

const UI = {
  bg: COLORS.pageLight,
  text: COLORS.textOnLight,
};

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
      <div className="shop-grid--empty">Sin productos en esta categoría.</div>
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

function ShopHero({ cartCount, cartTotal, currentUser, imgRef, onOpenCart }) {
  return (
    <>
      <section className="shop-hero">
        <div className="shop-hero__bg" aria-hidden="true">
          <img
            ref={imgRef}
            src={placeholderImage}
            alt=""
            className="shop-hero__bg-img"
            loading="eager"
            decoding="async"
          />
          <div className="shop-hero__overlay" />
          <div className="shop-hero__blackout" />
        </div>
        <Grid
          columns="site"
          className="shop-hero__content"
          style={{ gridTemplateRows: "auto auto" }}
        >
          <GridCell
            span={2}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="shop-hero__copy"
          >
            <div className="shop-hero__heading">
              <Label color={COLORS.accent} className="shop-hero__kicker">
                Tienda
              </Label>
              <h1
                className="shop-hero__title"
                style={{
                  fontFamily: FONTS.display,
                  color: UI.text,
                  margin: 0,
                }}
              >
                <span>Para llevarlo</span>
                <span className="shop-accent">contigo.</span>
              </h1>
            </div>
          </GridCell>
          <GridCell
            span={2}
            className="shop-hero__copy-aside"
            aria-hidden="true"
          />
          <GridCell
            span={2}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="shop-hero__desc-spacer"
            aria-hidden="true"
          />
          <GridCell
            span={2}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="shop-hero__desc"
          >
            <p>
              Objetos que trasladan la conversación sobre privacidad digital al
              espacio cotidiano.
            </p>
          </GridCell>
        </Grid>
      </section>

      <Grid
        as="section"
        columns="site"
        className="shop-hero-utility"
        aria-label="Resumen de tienda"
      >
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="shop-hero-utility__panel shop-hero-utility__panel--cart"
        >
          <div className="shop-hero-utility__panel-header">
            <span className="shop-hero-utility__label">Carrito</span>
            <div className="shop-hero-utility__metric">
              <strong>{cartCount}</strong>
              <span>
                {cartCount === 1
                  ? "pieza seleccionada"
                  : "piezas seleccionadas"}
              </span>
            </div>
          </div>

          <div className="shop-hero-utility__panel-copy">
            <div className="shop-hero-utility__total">
              <span>Subtotal</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>
            <p>
              Revisa tu selección y prepara el pedido desde el mismo flujo
              de cuenta.
            </p>
          </div>

          <SplitCtaButton
            label="Ver carrito"
            color={COLORS.textOnLight}
            iconBg={COLORS.pageLight}
            fullWidth
            className="shop-hero-utility__cta"
            onClick={onOpenCart}
          />
        </GridCell>

        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="shop-hero-utility__panel"
        >
          <div className="shop-hero-utility__panel-header">
            <span className="shop-hero-utility__label">
              {ACCOUNT_JOURNEY.brand}
            </span>
            <div className="shop-hero-utility__account-copy">
              {currentUser ? (
                <>
                  <strong>{currentUser.displayName}</strong>
                  <span>{getAccountHandleLine(currentUser)}</span>
                </>
              ) : (
                <p>{ACCOUNT_JOURNEY.contexts.shop.guest}</p>
              )}
            </div>
          </div>

          <div className="shop-hero-utility__panel-copy">
            <p>
              {currentUser
                ? "Tu cuenta mantiene conectados pedidos, carrito y datos dentro del perfil."
                : "Activa tu cuenta Prometeo para conservar el carrito y seguir el pedido desde tu perfil."}
            </p>
          </div>
        </GridCell>
      </Grid>
    </>
  );
}

export default function TiendaPage() {
  const pageRef = useRef(null);
  const heroImageRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
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

  useEffect(() => {
    let frameId = null;

    function updateHeroImage() {
      if (!heroImageRef.current) return;

      const hero = heroImageRef.current.closest(".shop-hero");
      const frame = heroImageRef.current.parentElement;
      const rect = frame?.getBoundingClientRect();
      const heroRect = hero?.getBoundingClientRect();

      if (!rect || !hero || !heroRect) return;

      const offset = clamp(
        (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.1,
        -48,
        48,
      );
      const topbarHeight =
        Number.parseFloat(
          window
            .getComputedStyle(document.documentElement)
            .getPropertyValue("--prometeo-topbar-height"),
        ) || 64;
      const fadeStart = heroRect.height * 0.36;
      const fadeDistance = Math.max(heroRect.height * 0.58, 1);
      const exitProgress = clamp(
        (topbarHeight - heroRect.top - fadeStart) / fadeDistance,
        0,
        1,
      );

      heroImageRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.12)`;
      hero.style.setProperty(
        "--shop-hero-blackout",
        (exitProgress * 0.24).toString(),
      );
      hero.style.setProperty(
        "--shop-hero-copy-opacity",
        (1 - exitProgress * 0.12).toString(),
      );
    }

    function scheduleUpdate() {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateHeroImage();
      });
    }

    updateHeroImage();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

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
          imgRef={heroImageRef}
          onOpenCart={() => setShowCart(true)}
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
