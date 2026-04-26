import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../components/Page";
import Footer from "../components/Footer";
import { Grid, GridCell } from "../components/system/Grid";
import { COLORS, BORDERS, FONTS } from "../design/tokens";
import { PRODUCTS, CATEGORIES, formatPrice } from "../data/tienda";
import { useMediaQuery } from "../hooks/useMediaQuery";

const C = COLORS;
const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };

/* ── Diagonal X placeholder for product image ───────────────────────── */
function ProductImagePlaceholder() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        background: "#111111",
        overflow: "hidden",
        borderBottom: bd,
      }}
    >
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="#222" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="#222" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
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
        background: hovered ? "#111111" : C.canvasDark,
        transition: "background 0.2s",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ProductImagePlaceholder />
      <div style={{ padding: "16px 20px 20px" }}>
        <div
          style={{
            ...mono,
            fontSize: 9,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: C.textMutedDark,
            marginBottom: 6,
          }}
        >
          {product.code}
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 13,
            color: C.textOnDark,
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
            color: C.textStrongDark,
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
      style={{
        borderBottom: bd,
        display: "flex",
        alignItems: "stretch",
        minHeight: 44,
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
                color: active ? "#fff" : C.textMutedDark,
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
            color: C.textMutedDark,
          }}
        >
          {count} {count === 1 ? "producto" : "productos"}
        </span>
      </div>
    </div>
  );
}

/* ── Products grid ───────────────────────────────────────────────────── */
function ProductsGrid({ products }) {
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
          color: C.textMutedDark,
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
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        borderTop: bd,
        borderLeft: bd,
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

/* ── Shop hero — 4-column grid ───────────────────────────────────────── */
function ShopHero({ cartCount }) {
  return (
    <Grid
      as="section"
      columns="site"
      style={{
        borderBottom: bd,
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Col 1 — cart summary */}
      <GridCell
        style={{
          borderRight: bd,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 28px 40px",
          minWidth: 0,
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: 9,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: C.textMutedDark,
            marginBottom: 24,
          }}
        >
          Carrito
        </div>

        {cartCount === 0 ? (
          <div>
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 28,
                fontWeight: 900,
                color: C.textMutedDark,
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              0
            </div>
            <div
              style={{
                ...mono,
                fontSize: 9,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#333",
              }}
            >
              ítems
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 28,
                fontWeight: 900,
                color: C.accent,
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              {cartCount}
            </div>
            <div
              style={{
                ...mono,
                fontSize: 9,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: C.textMutedDark,
              }}
            >
              {cartCount === 1 ? "ítem" : "ítems"}
            </div>
          </div>
        )}

        {/* Ver carrito link */}
        <button
          type="button"
          style={{
            background: "none",
            border: bd,
            cursor: "pointer",
            padding: "10px 14px",
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            ...mono,
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: C.textMutedDark,
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
        style={{
          borderRight: bd,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "48px 48px 40px",
          minWidth: 0,
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: 9,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: C.textMutedDark,
            marginBottom: 16,
          }}
        >
          003 — Tienda
        </div>
        <h1
          className="section-title"
          style={{
            color: C.textStrongDark,
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          Tienda
        </h1>
        <p
          style={{
            fontFamily: FONTS.sans,
            fontSize: 15,
            color: C.textMutedDark,
            lineHeight: 1.6,
            margin: "16px 0 0",
            maxWidth: "52ch",
          }}
        >
          Guías, herramientas y materiales para tomar el control de tu privacidad digital.
        </p>
      </GridCell>

      {/* Col 4 — user panel */}
      <GridCell
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
            padding: "48px 28px 28px",
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
              color: C.textMutedDark,
              marginBottom: 16,
            }}
          >
            Cuenta
          </div>
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 13,
              color: C.textMutedDark,
              lineHeight: 1.6,
              margin: 0,
              opacity: 0.7,
            }}
          >
            Inicia sesión para guardar tus pedidos y acceder a contenido exclusivo.
          </p>
        </div>

        {/* Bottom: action */}
        <div
          style={{
            flex: "1 1 50%",
            padding: "28px 28px 40px",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <button
            type="button"
            style={{
              background: "none",
              border: bd,
              cursor: "pointer",
              padding: "12px 16px",
              fontFamily: FONTS.sans,
              fontSize: 13,
              color: C.textMutedDark,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Iniciar sesión</span>
            <span style={{ ...mono, fontSize: 11 }}>→</span>
          </button>
        </div>
      </GridCell>
    </Grid>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */
export default function Tienda() {
  const [activeCategory, setActiveCategory] = useState(null);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const filtered = useMemo(() => {
    if (!activeCategory) return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <Page footerVariant="none">
      <ShopHero cartCount={0} />
      <FilterBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        count={filtered.length}
      />
      <ProductsGrid products={filtered} />
      <Footer variant="landing" mobileReveal={isMobile} />
    </Page>
  );
}
