import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Page } from "../components/Page";
import { COLORS, BORDERS, FONTS } from "../design/tokens";
import { getProductById, formatPrice } from "../data/tienda";
import { useTienda } from "../context/TiendaContext";
import { useMediaQuery } from "../hooks/useMediaQuery";
const C = COLORS;
const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };
const S = {
  bg: COLORS.pageLight,
  panel: COLORS.pageLight,
  hover: COLORS.canvasLight,
  text: COLORS.textOnLight,
  muted: COLORS.textMutedLight,
  media: COLORS.pageLight,
  mediaLine: "#d6d6d6",
};

/* ── Image placeholder ───────────────────────────────────────────────── */
function ImagePlaceholder({ size = "main" }) {
  const isMain = size === "main";
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: isMain ? "100%" : "100%",
        background: S.media,
        overflow: "hidden",
        minHeight: isMain ? 0 : 0,
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

/* ── Left column: image viewer ───────────────────────────────────────── */
function ImageViewer() {
  const [thumb, setThumb] = useState(0);
  const thumbCount = 4;
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);

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
          minHeight: 320,
        }}
      >
        <ImagePlaceholder size="main" />

        {/* Navigation arrows */}
        <button
          type="button"
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            background: hoverPrev ? C.accent : "none",
            border: bd,
            cursor: "pointer",
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: hoverPrev ? COLORS.footerText : S.muted,
            ...mono,
            fontSize: 14,
            lineHeight: 1,
            transition: "background 0.18s ease, color 0.18s ease",
          }}
          onMouseEnter={() => setHoverPrev(true)}
          onMouseLeave={() => setHoverPrev(false)}
          onClick={() => setThumb((t) => Math.max(0, t - 1))}
        >
          ←
        </button>
        <button
          type="button"
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            background: hoverNext ? C.accent : "none",
            border: bd,
            cursor: "pointer",
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: hoverNext ? COLORS.footerText : S.muted,
            ...mono,
            fontSize: 14,
            lineHeight: 1,
            transition: "background 0.18s ease, color 0.18s ease",
          }}
          onMouseEnter={() => setHoverNext(true)}
          onMouseLeave={() => setHoverNext(false)}
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
                background:
                  thumb === i ? "rgba(255,60,84,0.12)" : "transparent",
                borderBottom:
                  thumb === i
                    ? `2px solid ${C.accent}`
                    : "2px solid transparent",
                transition: "background 0.15s, border-color 0.15s",
              }}
            />
            <div style={{ width: "100%", height: "100%", background: S.media }}>
              <svg
                style={{ width: "100%", height: "100%", display: "block" }}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="100"
                  y2="100"
                  stroke={S.mediaLine}
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  x1="100"
                  y1="0"
                  x2="0"
                  y2="100"
                  stroke={S.mediaLine}
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
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
  const navigate = useNavigate();
  const [selectedVariant, setSelectedVariant] = useState(
    product.defaultVariant,
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [addHovered, setAddHovered] = useState(false);
  const [laterHovered, setLaterHovered] = useState(false);
  const { addItem } = useTienda();

  function handleAddToCart() {
    addItem(product, qty, selectedVariant);
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
            color: S.muted,
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
            color: S.text,
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
              color: S.muted,
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
                    color: active ? COLORS.footerText : S.muted,
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
            color: S.muted,
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
              color: S.muted,
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
              color: S.text,
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
              color: S.muted,
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
          onMouseEnter={() => setAddHovered(true)}
          onMouseLeave={() => setAddHovered(false)}
          style={{
            background: addHovered || added ? C.accent : "none",
            border: bd,
            cursor: "pointer",
            padding: "16px 24px",
            fontFamily: FONTS.sans,
            fontSize: 14,
            fontWeight: 600,
            color: addHovered || added ? COLORS.footerText : S.muted,
            letterSpacing: "0.02em",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.18s ease, color 0.18s ease",
          }}
        >
          <span>{added ? "Añadido" : "Añadir al carrito"}</span>
        </button>
        <button
          type="button"
          onClick={() => navigate("/tienda")}
          onMouseEnter={() => setLaterHovered(true)}
          onMouseLeave={() => setLaterHovered(false)}
          style={{
            background: laterHovered ? C.accent : "none",
            border: bd,
            cursor: "pointer",
            padding: "16px 24px",
            fontFamily: FONTS.sans,
            fontSize: 14,
            color: laterHovered ? COLORS.footerText : S.muted,
            letterSpacing: "0.02em",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.18s ease, color 0.18s ease",
          }}
        >
          <span>Pagar ahora</span>
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
            color: S.muted,
            marginBottom: 20,
          }}
        >
          Especificaciones
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 13,
            color: S.muted,
            lineHeight: 1.6,
            marginBottom: 24,
          }}
        >
          {product.description}
        </div>
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            borderTop: bd,
            borderBottom: bd,
          }}
        >
          {product.specs.map((spec, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "14px 16px",
                borderBottom: i < product.specs.length - 1 ? bd : "none",
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 13,
                  color: S.text,
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
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [backHovered, setBackHovered] = useState(false);
  const product = getProductById(id);

  if (!product) {
    return (
      <Page light>
        <div
          style={{
            padding: "80px 48px",
            ...mono,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: S.muted,
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
    <Page light>
      {/* Top action bar */}
      <div
        style={{
          borderBottom: bd,
          display: "flex",
          alignItems: "stretch",
          padding: "0 24px",
          height: 44,
          flexShrink: 0,
          background: S.bg,
        }}
      >
        <button
          type="button"
          onClick={() => navigate("/tienda")}
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
          style={{
            background: backHovered ? C.accent : "none",
            border: bd,
            cursor: "pointer",
            padding: "0 18px",
            ...mono,
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: backHovered ? COLORS.footerText : S.muted,
            transition: "background 0.18s ease, color 0.18s ease",
          }}
        >
          Regresar a tienda
        </button>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "3fr 2fr",
          minHeight: isMobile ? "auto" : "calc(100vh - 52px - 44px)",
          borderBottom: bd,
          background: S.bg,
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
