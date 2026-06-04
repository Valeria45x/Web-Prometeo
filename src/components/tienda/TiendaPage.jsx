import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TH } from "../../constants";
import { Page } from "../Page";
import Footer from "../Footer";
import HeroTransitionGrid from "../HeroTransitionGrid";
import AuthModal from "../comunidad/AuthModal";
import {
  ACCOUNT_JOURNEY,
  getAccountHandleLine,
} from "../account/accountJourney";
import { Grid, GridCell } from "../system/Grid";
import { COLORS, BORDERS, FONTS } from "../../design/tokens";
import { PRODUCTS, CATEGORIES, formatPrice } from "../../data/tienda";
import { useMediaQuery } from "../../hooks/useMediaQuery";
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

/* -- Diagonal X placeholder for product image ------------------------- */
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
      <img
        src={placeholderImage}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </div>
  );
}

/* -- Single product card ----------------------------------------------- */
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
            color: hovered ? COLORS.textOnDark : S.text,
            marginBottom: 10,
            lineHeight: 1.4,
            transition: "color 0.2s",
          }}
        >
          {product.name}
        </div>
        <div
          style={{
            ...mono,
            fontSize: 13,
            color: hovered ? COLORS.textOnDark : S.text,
            letterSpacing: "0.04em",
            transition: "color 0.2s",
          }}
        >
          {formatPrice(product.price)}
        </div>
      </div>
    </div>
  );
}

/* -- Filter bar -------------------------------------------------------- */
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
            color: S.muted,
          }}
        >
          {count} {count === 1 ? "producto" : "productos"}
        </span>
      </div>
    </div>
  );
}

/* -- Products grid ----------------------------------------------------- */
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

/* -- Shop hero --------------------------------------------------------- */
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
  const [cartButtonHovered, setCartButtonHovered] = useState(false);
  const [sessionButtonHovered, setSessionButtonHovered] = useState(false);

  const cartButtonActive = cartButtonHovered;
  const sessionButtonActive = sessionButtonHovered;

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
              color: cartCount === 0 ? S.muted : S.text,
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
              color: cartCount === 0 ? S.muted : S.text,
            }}
          >
            {cartCount === 0 ? "Vacío" : "Activo"}
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenCart}
          onMouseEnter={() => setCartButtonHovered(true)}
          onMouseLeave={() => setCartButtonHovered(false)}
          style={{
            background: cartButtonActive ? C.accent : "none",
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
            color: cartButtonActive ? COLORS.footerText : S.muted,
            width: "100%",
            transition: "background 0.18s ease, color 0.18s ease",
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
            padding: 0,
            display: currentUser ? "flex" : "block",
            borderBottom: bd,
          }}
        >
          {currentUser ? (
            <>
              <div
                style={{
                  flex: "0 0 calc(50% - 0.5px)",
                  padding: "72px 28px 24px",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    ...mono,
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    color: S.muted,
                    marginBottom: 16,
                  }}
                >
                  {ACCOUNT_JOURNEY.brand}
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
                  {getAccountHandleLine(currentUser)}
                </p>
              </div>
              <div style={{ borderLeft: bd, alignSelf: "stretch", width: 1 }} />
              <div
                style={{
                  flex: "0 0 calc(50% - 0.5px)",
                  background: C.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 40,
                    fontWeight: 900,
                    color: C.textOnAccent,
                    lineHeight: 1,
                  }}
                >
                  {currentUser.displayName?.[0]?.toUpperCase() ?? "?"}
                </span>
              </div>
            </>
          ) : (
            <div style={{ padding: "72px 28px 28px" }}>
              <div
                style={{
                  ...mono,
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  color: S.muted,
                  marginBottom: 16,
                }}
              >
                {ACCOUNT_JOURNEY.brand}
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
                {ACCOUNT_JOURNEY.contexts.shop.guest}
              </p>
            </div>
          )}
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
            {currentUser
              ? ACCOUNT_JOURNEY.contexts.shop.active
              : "Usa una sola cuenta para compras, comunidad y perfil."}
          </p>

          <button
            type="button"
            onClick={currentUser ? onOpenProfile : onOpenAuth}
            onMouseEnter={() => setSessionButtonHovered(true)}
            onMouseLeave={() => setSessionButtonHovered(false)}
            style={{
              background: sessionButtonActive ? C.accent : "none",
              border: bd,
              cursor: "pointer",
              padding: "12px 16px",
              fontFamily: FONTS.sans,
              fontSize: 13,
              color: sessionButtonActive ? COLORS.footerText : S.muted,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "background 0.18s ease, color 0.18s ease",
            }}
          >
            <span>
              {currentUser
                ? ACCOUNT_JOURNEY.profileCta
                : ACCOUNT_JOURNEY.guestCta}
            </span>
            <span style={{ ...mono, fontSize: 11 }}>→</span>
          </button>
        </div>
      </GridCell>
    </Grid>
  );
}

/* -- Page -------------------------------------------------------------- */

export default function TiendaPage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
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
            onOpenProfile={() => navigate("/perfil")}
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
            onCategoryChange={handleCategoryChange}
            count={filtered.length}
          />
          <ProductsGrid
            products={filtered}
            isMobile={isMobile}
            isTablet={isTablet}
          />
          {currentUser && (
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
      {showComingSoon && (
        <ComingSoonModal onClose={() => setShowComingSoon(false)} />
      )}
    </Page>
  );
}
