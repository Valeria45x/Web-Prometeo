import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Page, PageHeader } from "../components/Page";
import { COLORS, BORDERS, FONTS } from "../design/tokens";
import { PRODUCTS, CATEGORIES, formatPrice } from "../data/tienda";

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
      {/* Category filters */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          gap: 0,
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

      {/* Product count */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: 8,
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

/* ── Page ────────────────────────────────────────────────────────────── */
export default function Tienda() {
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = useMemo(() => {
    if (!activeCategory) return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <Page>
      <PageHeader index="003" title="Tienda" />
      <FilterBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        count={filtered.length}
      />
      <ProductsGrid products={filtered} />
    </Page>
  );
}
