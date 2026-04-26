import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TH } from "../../constants";
import { Page } from "../Page";
import Footer from "../Footer";
import HeroTransitionGrid from "../HeroTransitionGrid";
import AuthModal from "../comunidad/AuthModal";
import { Grid, GridCell } from "../system/Grid";
import { COLORS, BORDERS, FONTS } from "../../design/tokens";
import { PRODUCTS, CATEGORIES, formatPrice } from "../../data/tienda";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useComunidad } from "../../context/ComunidadContext";
import { useTienda } from "../../context/TiendaContext";

const C = COLORS;
const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };
const S = {
  bg: COLORS.canvasLight,
  panel: "#fafafa",
  hover: "#f4f4f4",
  text: COLORS.textOnLight,
  muted: COLORS.textMutedLight,
  quiet: "#d8d8d8",
  media: "#f2f2f2",
  mediaLine: "#d6d6d6",
};

/* ── Diagonal X placeholder for product image ───────────────────────── */
function ProductImagePlaceholder() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        background: S.media,
        overflow: "hidden",
        borderBottom: bd,
      }}
    >
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          stroke={S.mediaLine}
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="100"
          y1="0"
          x2="0"
          y2="100"
          stroke={S.mediaLine}
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

/* ── Single product card ─────────────────────────────────────────────── */
function ProductCard({ product }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/tienda/${product.id}`)}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/tienda/${product.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRight: bd,
        borderBottom: bd,
        cursor: "pointer",
        background: hovered ? S.hover : S.bg,
        transition: "background 0.2s",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ProductImagePlaceholder />
      <div style={{ padding: "16px 20px 20px" }}>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 13,
            color: S.text,
            marginBottom: 10,
            lineHeight: 1.4,
          }}
        >
          {product.name}
        </div>
        <div
          style={{
            ...mono,
            fontSize: 13,
            color: S.text,
            letterSpacing: "0.04em",
          }}
        >
          {formatPrice(product.price)}
        </div>
      </div>
    </div>
  );
}

/* ── Filter bar ──────────────────────────────────────────────────────── */
function FilterBar({ activeCategory, onCategoryChange, count }) {
  return (
    <div
      className="shop-filterbar"
      style={{
        borderBottom: bd,
        display: "flex",
        alignItems: "stretch",
        minHeight: 44,
        background: S.bg,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          overflow: "auto",
          borderRight: bd,
        }}
      >
        {CATEGORIES.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <button
              type="button"
              key={String(cat.id)}
              onClick={() => onCategoryChange(cat.id)}
              style={{
                background: active ? C.accent : "none",
                border: "none",
                borderRight: bd,
                cursor: "pointer",
                padding: "0 20px",
                height: "100%",
                ...mono,
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: active ? COLORS.footerText : S.muted,
                whiteSpace: "nowrap",
                transition: "background 0.15s, color 0.15s",
                flexShrink: 0,
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            ...mono,
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: S.muted,
          }}
        >
          {count} {count === 1 ? "producto" : "productos"}
        </span>
      </div>
    </div>
  );
}

/* ── Products grid ───────────────────────────────────────────────────── */
function ProductsGrid({ products, isMobile, isTablet }) {
  if (products.length === 0) {
    return (
      <div
        style={{
          padding: "80px 48px",
          borderBottom: bd,
          ...mono,
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: S.muted,
          background: S.bg,
        }}
      >
        Sin productos en esta categoría.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile
          ? "minmax(0, 1fr)"
          : isTablet
            ? "repeat(2, minmax(0, 1fr))"
            : "repeat(4, minmax(0, 1fr))",
        borderTop: bd,
        borderLeft: bd,
        background: S.bg,
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

/* ── Shop hero ───────────────────────────────────────────────────────── */
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
        background: "rgba(0,0,0,0.55)",
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
              textTransform: "uppercase",
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
                      textTransform: "uppercase",
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
                color: C.accent,
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
              textTransform: "uppercase",
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

function ShopHero({
  cartCount,
  cartTotal,
  currentUser,
  onOpenAuth,
  onOpenCart,
  onLogout,
}) {
  return (
    <Grid
      as="section"
      columns="site"
      className="shop-hero"
      style={{
        position: "relative",
        zIndex: 2,
        background: S.bg,
      }}
    >
      {/* Col 1 — cart summary */}
      <GridCell
        className="shop-hero__cart"
        style={{
          borderRight: bd,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 18,
          padding: "72px 28px 64px",
          minWidth: 0,
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: 9,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: S.muted,
            marginBottom: 12,
          }}
        >
          Carrito
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: 36,
              fontWeight: 900,
              color: cartCount === 0 ? S.muted : C.accent,
              lineHeight: 1,
            }}
          >
            {cartCount}
          </span>
          <span
            style={{
              ...mono,
              fontSize: 10,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: S.muted,
            }}
          >
            {cartCount === 1 ? "ítem" : "ítems"}
          </span>
        </div>

        <p
          style={{
            margin: 0,
            fontFamily: FONTS.sans,
            fontSize: 13,
            color: S.muted,
            lineHeight: 1.6,
            maxWidth: "28ch",
          }}
        >
          {cartCount === 0
            ? "Todavía no agregaste productos."
            : "Tu selección está lista para revisión y pago."}
        </p>

        <div
          style={{
            borderTop: bd,
            borderBottom: bd,
            padding: "10px 0",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 10,
            marginTop: 4,
          }}
        >
          <span
            style={{
              ...mono,
              fontSize: 9,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: S.muted,
            }}
          >
            Subtotal
          </span>
          <span
            style={{
              ...mono,
              fontSize: 10,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: S.text,
            }}
          >
            {formatPrice(cartTotal)}
          </span>
          <span
            style={{
              ...mono,
              fontSize: 9,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: S.muted,
            }}
          >
            Estado
          </span>
          <span
            style={{
              ...mono,
              fontSize: 9,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: cartCount === 0 ? S.muted : C.accent,
            }}
          >
            {cartCount === 0 ? "Vacío" : "Activo"}
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenCart}
          style={{
            background: "none",
            border: bd,
            cursor: "pointer",
            padding: "10px 14px",
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            ...mono,
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: S.muted,
            width: "100%",
          }}
        >
          <span>Ver carrito</span>
          <span>→</span>
        </button>
      </GridCell>

      {/* Col 2–3 — page title */}
      <GridCell
        span={2}
        collapseSpanOnTablet
        collapseSpanOnMobile
        className="shop-hero__title"
        style={{
          borderRight: bd,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 18,
          padding: "72px 48px 64px",
          minWidth: 0,
        }}
      >
        <h1
          className="section-title"
          style={{
            color: S.text,
            margin: 0,
            lineHeight: 1.05,
            width: "100%",
          }}
        >
          Tienda
        </h1>
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 15,
            color: S.muted,
            lineHeight: 1.6,
            margin: 0,
            maxWidth: "52ch",
            width: "100%",
          }}
        >
          Guías, herramientas y materiales para tomar el control de tu
          privacidad digital.
        </p>
      </GridCell>

      {/* Col 4 — user panel */}
      <GridCell
        className="shop-hero__account"
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {/* Top: guest message */}
        <div
          style={{
            flex: "1 1 50%",
            padding: "72px 28px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            borderBottom: bd,
          }}
        >
          <div
            style={{
              ...mono,
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: S.muted,
              marginBottom: 16,
            }}
          >
            Cuenta
          </div>
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 13,
              color: S.muted,
              lineHeight: 1.6,
              margin: 0,
              opacity: 0.7,
            }}
          >
            {currentUser
              ? `Sesion iniciada como @${currentUser.handle}.`
              : "Inicia sesion para guardar tus pedidos y acceder a contenido exclusivo."}
          </p>
        </div>

        {/* Bottom: action */}
        <div
          style={{
            flex: "1 1 50%",
            padding: "28px 28px 64px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            alignItems: "stretch",
            justifyContent: "flex-end",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: FONTS.sans,
              fontSize: 12,
              color: S.muted,
              lineHeight: 1.5,
              opacity: 0.7,
            }}
          >
            Gestiona tu sesión para guardar pedidos y continuar luego.
          </p>

          <button
            type="button"
            onClick={currentUser ? onLogout : onOpenAuth}
            style={{
              background: "none",
              border: bd,
              cursor: "pointer",
              padding: "12px 16px",
              fontFamily: FONTS.sans,
              fontSize: 13,
              color: S.muted,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>{currentUser ? "Cerrar sesion" : "Iniciar sesion"}</span>
            <span style={{ ...mono, fontSize: 11 }}>→</span>
          </button>
        </div>
      </GridCell>
    </Grid>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */

export default function TiendaPage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
  const { currentUser, showAuthModal, setShowAuthModal, logout } =
    useComunidad();
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
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return undefined;

    const updateContentHeight = () => {
      setContentHeight(contentElement.scrollHeight);
    };

    updateContentHeight();
    const observer = new ResizeObserver(updateContentHeight);
    observer.observe(contentElement);
    return () => observer.disconnect();
  }, [isMobile]);

  const viewportHeight = typeof window === "undefined" ? 0 : window.innerHeight;
  const wrapperHeight =
    contentHeight > 0 ? contentHeight + viewportHeight - TH : "auto";

  return (
    <Page light footerVariant="none">
      <div style={{ position: "relative", height: wrapperHeight }}>
        <Footer variant="landing" mobileReveal={isMobile} />
        <div
          ref={contentRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            background: S.bg,
          }}
        >
          <ShopHero
            cartCount={cartCount}
            cartTotal={cartTotal}
            currentUser={currentUser}
            onOpenAuth={() => setShowAuthModal(true)}
            onOpenCart={() => setShowCart(true)}
            onLogout={logout}
          />
          <HeroTransitionGrid
            className="shop-transition-grid"
            background={S.bg}
            border={bd}
            columns="site"
            bottomBorder
          />
          <FilterBar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            count={filtered.length}
          />
          <ProductsGrid
            products={filtered}
            isMobile={isMobile}
            isTablet={isTablet}
          />
          <HeroTransitionGrid
            className="shop-transition-grid shop-transition-grid--footer"
            background={S.bg}
            border={bd}
            columns="site"
            bottomBorder
          />
        </div>
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
    </Page>
  );
}
