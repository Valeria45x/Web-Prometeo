import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./tienda.css";
import { Page } from "../Page";
import AuthModal from "../comunidad/AuthModal";
import {
  ACCOUNT_JOURNEY,
  getAccountHandleLine,
} from "../account/accountJourney";
import { COLORS, BORDERS, FONTS } from "../../design/tokens";
import { PRODUCTS, CATEGORIES, formatPrice } from "../../data/tienda";
import { useComunidad } from "../../context/ComunidadContext";
import { useTienda } from "../../context/TiendaContext";
import placeholderImage from "../../../Instagram Feed USB v1.png";

const C = COLORS;
const bd = BORDERS.light;
const mono = { fontFamily: FONTS.mono };
const S = {
  bg: COLORS.pageLight,
  panel: COLORS.pageLight,
  hover: "#050505",
  text: COLORS.textOnLight,
  muted: COLORS.textMutedLight,
  quiet: "#d9d9d6",
  media: COLORS.pageLight,
  mediaLine: "#d9d9d6",
};

/* -- Single product card ----------------------------------------------- */
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
          <span className="shop-product-card__overlay-label">Ver producto →</span>
        </div>
      </div>
      <div className="shop-product-card__info">
        <span className="shop-product-card__collection">
          {product.collection ?? "Serie 001"}
        </span>
        <h3 className="shop-product-card__name">{product.name}</h3>
        <span className="shop-product-card__price">{formatPrice(product.price)}</span>
      </div>
    </Link>
  );
}

/* -- Filter bar -------------------------------------------------------- */
function FilterBar({ activeCategory, onCategoryChange, count }) {
  return (
    <div className="shop-filterbar-modern">
      <div className="shop-filterbar-modern__categories">
        {CATEGORIES.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <button
              type="button"
              key={String(cat.id)}
              onClick={() => onCategoryChange(cat.id)}
              className={[
                "shop-filterbar-modern__btn",
                active && "shop-filterbar-modern__btn--active",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {cat.label}
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

/* -- Products grid ----------------------------------------------------- */
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

/* -- Cart modal -------------------------------------------------------- */
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
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(5,5,5,0.55)",
        display: "flex",
        justifyContent: "flex-end",
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside
        style={{
          width: "min(440px, 100vw)",
          minHeight: "100vh",
          background: S.bg,
          borderLeft: bd,
          color: S.text,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            borderBottom: bd,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              ...mono,
              fontSize: 11,
              letterSpacing: "0.12em",
              color: S.text,
            }}
          >
            Carrito
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: S.muted,
              ...mono,
              fontSize: 16,
            }}
          >
            x
          </button>
        </div>

        <div style={{ flex: 1, overflow: "auto" }}>
          {cart.length === 0 ? (
            <p
              style={{
                padding: 24,
                margin: 0,
                fontFamily: FONTS.sans,
                fontSize: 13,
                color: S.muted,
                lineHeight: 1.5,
              }}
            >
              El carrito esta vacio.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.productId}-${item.variant ?? "default"}`}
                style={{
                  borderBottom: bd,
                  padding: 24,
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: 14,
                      color: S.text,
                      marginBottom: 8,
                    }}
                  >
                    {item.product.name}
                  </div>
                  <div
                    style={{
                      ...mono,
                      fontSize: 10,
                      color: S.muted,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {item.quantity} x {formatPrice(item.product.price)}
                    {item.variant ? ` / ${item.variant}` : ""}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(item.productId, item.variant)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: S.muted,
                    ...mono,
                    fontSize: 12,
                  }}
                >
                  x
                </button>
              </div>
            ))
          )}
        </div>

        <div style={{ borderTop: bd, padding: 24 }}>
          {checkoutMessage && (
            <p
              style={{
                margin: "0 0 14px",
                fontFamily: FONTS.sans,
                fontSize: 13,
                color: C.textOnLight,
                lineHeight: 1.4,
              }}
            >
              {checkoutMessage}
            </p>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 16,
              ...mono,
              fontSize: 12,
              color: S.text,
              letterSpacing: "0.08em",
            }}
          >
            <span>Total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <button
            type="button"
            disabled={cart.length === 0}
            onClick={onCheckout}
            style={{
              width: "100%",
              background: cart.length === 0 ? S.quiet : C.accent,
              border: "none",
              cursor: cart.length === 0 ? "default" : "pointer",
              padding: "14px 18px",
              color: cart.length === 0 ? S.muted : COLORS.footerText,
              fontFamily: FONTS.sans,
              fontSize: 14,
              marginBottom: 10,
            }}
          >
            Finalizar pedido
          </button>
          <button
            type="button"
            disabled={cart.length === 0}
            onClick={onClear}
            style={{
              width: "100%",
              background: "none",
              border: bd,
              cursor: cart.length === 0 ? "default" : "pointer",
              padding: "12px 18px",
              color: S.muted,
              fontFamily: FONTS.sans,
              fontSize: 13,
            }}
          >
            Vaciar carrito
          </button>
        </div>
      </aside>
    </div>
  );
}

function ComingSoonModal({ onClose }) {
  const [closeHovered, setCloseHovered] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(5,5,5,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "min(560px, 100%)",
          background: S.bg,
          border: bd,
          color: S.text,
        }}
      >
        <div style={{ padding: "26px 20px 22px" }}>
          <p
            style={{
              margin: "0 0 20px",
              fontFamily: FONTS.sans,
              fontSize: 14,
              lineHeight: 1.6,
              color: S.muted,
            }}
          >
            La Serie 002 está en proceso. Próximamente anunciaremos fecha,
            piezas y acceso anticipado.
          </p>
          <button
            type="button"
            onClick={onClose}
            onMouseEnter={() => setCloseHovered(true)}
            onMouseLeave={() => setCloseHovered(false)}
            style={{
              background: closeHovered ? C.accent : "none",
              border: bd,
              cursor: "pointer",
              padding: "11px 16px",
              color: closeHovered ? COLORS.footerText : S.muted,
              ...mono,
              fontSize: 9,
              letterSpacing: "0.1em",
              transition: "background 0.18s ease, color 0.18s ease",
            }}
          >
            Entendido
          </button>
        </div>
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
      {/* Col 1 — Cart */}
      <div className="shop-hero-modern__cart">
        <div>
          <div className="shop-hero-modern__cart-label">Carrito</div>
          <div className={`shop-hero-modern__cart-count${cartCount === 0 ? " shop-hero-modern__cart-count--empty" : ""}`}>
            {cartCount}
          </div>
        </div>

        <div className="shop-hero-modern__cart-meta">
          <div className="shop-hero-modern__cart-row">
            <span>Subtotal</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
          <div className="shop-hero-modern__cart-row">
            <span>Estado</span>
            <strong>{cartCount === 0 ? "Vacío" : "Activo"}</strong>
          </div>
        </div>

        <button
          type="button"
          className="shop-hero-modern__cart-btn"
          onClick={onOpenCart}
        >
          <span>Ver carrito</span>
          <span>→</span>
        </button>
      </div>

      {/* Col 2 — Title */}
      <div className="shop-hero-modern__title">
        <span className="shop-hero-modern__eyebrow">Serie 001</span>
        <h1 className="shop-hero-modern__heading">Tienda</h1>
        <p className="shop-hero-modern__desc">
          Objetos que trasladan la conversación sobre privacidad digital al espacio cotidiano.
        </p>
      </div>

      {/* Col 3 — Account */}
      <div className="shop-hero-modern__account">
        <div className="shop-hero-modern__account-top">
          <div className="shop-hero-modern__account-label">
            {ACCOUNT_JOURNEY.brand}
          </div>
          {currentUser ? (
            <>
              <div className="shop-hero-modern__account-name">
                {currentUser.displayName}
              </div>
              <div className="shop-hero-modern__account-handle">
                {getAccountHandleLine(currentUser)}
              </div>
            </>
          ) : (
            <p className="shop-hero-modern__account-guest">
              {ACCOUNT_JOURNEY.contexts.shop.guest}
            </p>
          )}
        </div>
        <div className="shop-hero-modern__account-bottom">
          <button
            type="button"
            className="shop-hero-modern__account-btn"
            onClick={currentUser ? onOpenProfile : onOpenAuth}
          >
            <span>
              {currentUser ? ACCOUNT_JOURNEY.profileCta : ACCOUNT_JOURNEY.guestCta}
            </span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* -- Page -------------------------------------------------------------- */

export default function TiendaPage() {
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
    orders,
    removeItem,
    clearCart,
    completeCheckout,
  } = useTienda();

  const filtered = useMemo(() => {
    if (!activeCategory) return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (categoryId) => {
    if (categoryId === "serie-002") {
      setShowComingSoon(true);
      return;
    }
    setActiveCategory(categoryId);
  };

  return (
    <Page light>
      <div>
        <ShopHero
            cartCount={cartCount}
            cartTotal={cartTotal}
            currentUser={currentUser}
            onOpenAuth={() => setShowAuthModal(true)}
            onOpenCart={() => setShowCart(true)}
            onOpenProfile={() => navigate("/perfil")}
        />
        <FilterBar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          count={filtered.length}
        />
        <ProductsGrid products={filtered} />
          {false && currentUser && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                borderTop: bd,
                background: S.bg,
              }}
            >
              {/* Cart summary */}
              <div style={{ borderRight: bd }}>
                <div
                  style={{
                    borderBottom: bd,
                    padding: "14px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      ...mono,
                      fontSize: 8,
                      letterSpacing: "0.1em",
                      color: S.muted,
                    }}
                  >
                    Carrito actual
                  </span>
                  <span
                    style={{
                      ...mono,
                      fontSize: 8,
                      letterSpacing: "0.08em",
                      color: C.textOnLight,
                    }}
                  >
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                {cart.length === 0 ? (
                  <div
                    style={{
                      padding: "18px 24px",
                      ...mono,
                      fontSize: 9,
                      color: S.muted,
                      letterSpacing: "0.08em",
                    }}
                  >
                    Tu carrito está vacío.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={`${item.productId}-${item.variant ?? "default"}`}
                      style={{
                        borderBottom: bd,
                        padding: "16px 24px",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          color: S.text,
                          lineHeight: 1.35,
                        }}
                      >
                        {item.product.name}
                      </span>
                      <span
                        style={{
                          ...mono,
                          fontSize: 8,
                          color: S.muted,
                          letterSpacing: "0.08em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.quantity} × {formatPrice(item.product.price)}
                      </span>
                    </div>
                  ))
                )}
              </div>
              {/* Orders */}
              <div>
                <div
                  style={{
                    borderBottom: bd,
                    padding: "14px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      ...mono,
                      fontSize: 8,
                      letterSpacing: "0.1em",
                      color: S.muted,
                    }}
                  >
                    Historial de pedidos
                  </span>
                  <span
                    style={{
                      ...mono,
                      fontSize: 8,
                      letterSpacing: "0.08em",
                      color: C.textOnLight,
                    }}
                  >
                    {orders.length}
                  </span>
                </div>
                {orders.length === 0 ? (
                  <div
                    style={{
                      padding: "18px 24px",
                      ...mono,
                      fontSize: 9,
                      color: S.muted,
                      letterSpacing: "0.08em",
                    }}
                  >
                    Aún no hay compras anteriores.
                  </div>
                ) : (
                  orders.slice(0, 6).map((order) => (
                    <div
                      key={order.id}
                      style={{
                        borderBottom: bd,
                        padding: "16px 24px",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <span
                        style={{
                          ...mono,
                          fontSize: 9,
                          color: S.text,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {order.id.slice(0, 8).toUpperCase()}
                      </span>
                      <span
                        style={{
                          ...mono,
                          fontSize: 8,
                          color: S.muted,
                          letterSpacing: "0.08em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

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
