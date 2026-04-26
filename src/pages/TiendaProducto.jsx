import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Page } from "../components/Page";
import { COLORS, BORDERS, FONTS } from "../design/tokens";
import { getProductById, formatPrice } from "../data/tienda";
const C = COLORS;
const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };

/* ── Image placeholder ───────────────────────────────────────────────── */
function ImagePlaceholder({ size = "main" }) {
  const isMain = size === "main";
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: isMain ? "100%" : "100%",
        background: "#111111",
        overflow: "hidden",
        minHeight: isMain ? 0 : 0,
      }}
    >
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="#1e1e1e" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="#1e1e1e" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

/* ── Left column: image viewer ───────────────────────────────────────── */
function ImageViewer() {
  const [thumb, setThumb] = useState(0);
  const thumbCount = 4;

  return (
    <div
      style={{
        borderRight: bd,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Main image area */}
      <div
        style={{
          flex: 1,
          position: "relative",
          borderBottom: bd,
          minHeight: 0,
        }}
      >
        <ImagePlaceholder size="main" />

        {/* Navigation arrows */}
        <button
          type="button"
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            borderRight: bd,
            cursor: "pointer",
            padding: "20px 18px",
            color: C.textMutedDark,
            ...mono,
            fontSize: 14,
            lineHeight: 1,
          }}
          onClick={() => setThumb((t) => Math.max(0, t - 1))}
        >
          ←
        </button>
        <button
          type="button"
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            borderLeft: bd,
            cursor: "pointer",
            padding: "20px 18px",
            color: C.textMutedDark,
            ...mono,
            fontSize: 14,
            lineHeight: 1,
          }}
          onClick={() => setThumb((t) => Math.min(thumbCount - 1, t + 1))}
        >
          →
        </button>
      </div>

      {/* Thumbnails */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${thumbCount}, 1fr)`,
          height: 80,
          flexShrink: 0,
        }}
      >
        {Array.from({ length: thumbCount }).map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setThumb(i)}
            style={{
              background: "none",
              border: "none",
              borderRight: i < thumbCount - 1 ? bd : "none",
              cursor: "pointer",
              padding: 0,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: thumb === i ? "rgba(255,60,84,0.12)" : "transparent",
                borderBottom: thumb === i ? `2px solid ${C.accent}` : "2px solid transparent",
                transition: "background 0.15s, border-color 0.15s",
              }}
            />
            <div style={{ width: "100%", height: "100%", background: "#111111" }}>
              <svg
                style={{ width: "100%", height: "100%", display: "block" }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <line x1="0" y1="0" x2="100" y2="100" stroke="#1e1e1e" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="#1e1e1e" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Right column: product info ──────────────────────────────────────── */
function ProductInfo({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.defaultVariant);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "auto",
      }}
    >
      {/* Code + price block */}
      <div
        style={{
          padding: "48px 48px 40px",
          borderBottom: bd,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.textMutedDark,
            marginBottom: 12,
          }}
        >
          {product.code}
        </div>
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 38,
            fontWeight: 900,
            color: C.textStrongDark,
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          {formatPrice(product.price)}
        </div>
      </div>

      {/* Variants */}
      {product.variants && (
        <div
          style={{
            padding: "32px 48px",
            borderBottom: bd,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              ...mono,
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: C.textMutedDark,
              marginBottom: 14,
            }}
          >
            Variante
          </div>
          <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
            {product.variants.map((v) => {
              const active = selectedVariant === v;
              return (
                <button
                  type="button"
                  key={v}
                  onClick={() => setSelectedVariant(v)}
                  style={{
                    background: active ? C.accent : "none",
                    border: bd,
                    marginRight: -1,
                    marginBottom: -1,
                    cursor: "pointer",
                    padding: "10px 18px",
                    ...mono,
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    color: active ? "#fff" : C.textMutedDark,
                    transition: "background 0.15s, color 0.15s",
                  }}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div
        style={{
          padding: "32px 48px",
          borderBottom: bd,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: C.textMutedDark,
          }}
        >
          Cantidad
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            style={{
              background: "none",
              border: bd,
              cursor: "pointer",
              width: 36,
              height: 36,
              color: C.textMutedDark,
              ...mono,
              fontSize: 14,
              lineHeight: 1,
              marginRight: -1,
            }}
          >
            −
          </button>
          <div
            style={{
              border: bd,
              width: 48,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...mono,
              fontSize: 12,
              color: C.textOnDark,
              marginRight: -1,
            }}
          >
            {qty}
          </div>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            style={{
              background: "none",
              border: bd,
              cursor: "pointer",
              width: 36,
              height: 36,
              color: C.textMutedDark,
              ...mono,
              fontSize: 14,
              lineHeight: 1,
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Actions */}
      <div
        style={{
          padding: "32px 48px",
          borderBottom: bd,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <button
          type="button"
          onClick={handleAddToCart}
          style={{
            background: added ? C.accentDeep : C.accent,
            border: "none",
            cursor: "pointer",
            padding: "16px 24px",
            fontFamily: FONTS.sans,
            fontSize: 14,
            fontWeight: 600,
            color: "#fff",
            letterSpacing: "0.02em",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "background 0.2s",
          }}
        >
          <span>{added ? "Añadido" : "Añadir al carrito"}</span>
          <span style={{ ...mono, fontSize: 12 }}>→</span>
        </button>
        <button
          type="button"
          style={{
            background: "none",
            border: bd,
            cursor: "pointer",
            padding: "16px 24px",
            fontFamily: FONTS.sans,
            fontSize: 14,
            color: C.textMutedDark,
            letterSpacing: "0.02em",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>Pagar después</span>
          <span style={{ ...mono, fontSize: 12 }}>→</span>
        </button>
      </div>

      {/* Specifications */}
      <div
        style={{
          padding: "32px 48px 48px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: C.textMutedDark,
            marginBottom: 20,
          }}
        >
          Especificaciones
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 13,
            color: C.textMutedDark,
            lineHeight: 1.6,
            marginBottom: 24,
          }}
        >
          {product.description}
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {product.specs.map((spec, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                paddingBottom: 12,
                borderBottom: i < product.specs.length - 1 ? bd : "none",
                marginBottom: i < product.specs.length - 1 ? 12 : 0,
              }}
            >
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: C.accent,
                  flexShrink: 0,
                  marginTop: 6,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 13,
                  color: C.textOnDark,
                  lineHeight: 1.5,
                }}
              >
                {spec}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */
export default function TiendaProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);

  if (!product) {
    return (
      <Page>
        <div
          style={{
            padding: "80px 48px",
            ...mono,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: C.textMutedDark,
          }}
        >
          Producto no encontrado.{" "}
          <Link
            to="/tienda"
            style={{ color: C.accent, textDecoration: "none" }}
          >
            Volver a la tienda →
          </Link>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      {/* Breadcrumb bar */}
      <div
        style={{
          borderBottom: bd,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 24px",
          height: 44,
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onClick={() => navigate("/tienda")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            ...mono,
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: C.textMutedDark,
            padding: 0,
          }}
        >
          ← Tienda
        </button>
        <span style={{ ...mono, fontSize: 9, color: "#333" }}>/</span>
        <span
          style={{
            ...mono,
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#444",
          }}
        >
          {product.code}
        </span>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          minHeight: "calc(100vh - 52px - 44px)",
          borderBottom: bd,
        }}
      >
        {/* Left: image viewer */}
        <ImageViewer />

        {/* Right: product info */}
        <ProductInfo product={product} />
      </div>
    </Page>
  );
}
