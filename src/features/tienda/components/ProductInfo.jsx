import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS, FONTS } from "@/design/tokens";
import { formatPrice } from "@/data/tienda";
import { useTienda } from "@/context/TiendaContext";
import { S, bd, mono } from "@/features/tienda/productDetail.styles";

export default function ProductInfo({ product }) {
  const navigate = useNavigate();
  const [selectedVariant, setSelectedVariant] = useState(product.defaultVariant);
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
      <div style={{ padding: "48px 48px 40px", borderBottom: bd, flexShrink: 0 }}>
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 42,
            fontWeight: 900,
            color: S.text,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            marginBottom: 10,
          }}
        >
          {product.name}
        </div>
        <div
          style={{ ...mono, fontSize: 22, color: S.muted, letterSpacing: "0.06em" }}
        >
          {formatPrice(product.price)}
        </div>
      </div>

      {product.variants && (
        <div style={{ padding: "32px 48px", borderBottom: bd, flexShrink: 0 }}>
          <div
            style={{
              ...mono,
              fontSize: 9,
              letterSpacing: "0.1em",
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
                    background: "none",
                    border: bd,
                    marginRight: -1,
                    marginBottom: -1,
                    cursor: "pointer",
                    padding: "10px 18px",
                    fontFamily: FONTS.sans,
                    fontSize: 10,
                    fontWeight: active ? 700 : 400,
                    letterSpacing: "0.08em",
                    color: active ? COLORS.accent : S.muted,
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
        <div style={{ ...mono, fontSize: 9, letterSpacing: "0.1em", color: S.muted }}>
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
              fontFamily: FONTS.sans,
              fontSize: 14,
              lineHeight: 1,
              marginRight: -1,
            }}
          >
            -
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
              fontFamily: FONTS.sans,
              fontSize: 14,
              lineHeight: 1,
            }}
          >
            +
          </button>
        </div>
      </div>

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
            background: added || addHovered ? COLORS.textOnLight : "none",
            border: bd,
            cursor: "pointer",
            padding: "16px 24px",
            fontFamily: FONTS.sans,
            fontSize: 14,
            fontWeight: added ? 700 : 400,
            color: added || addHovered ? COLORS.textOnDark : COLORS.textOnLight,
            letterSpacing: "0.02em",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "background 0.18s ease, color 0.18s ease",
          }}
        >
          <span>{added ? "Añadido al carrito" : "Añadir al carrito"}</span>
          {added && <span aria-hidden="true">✓</span>}
        </button>
        <button
          type="button"
          onClick={() => navigate("/tienda")}
          onMouseEnter={() => setLaterHovered(true)}
          onMouseLeave={() => setLaterHovered(false)}
          style={{
            background: laterHovered ? COLORS.textOnLight : "none",
            border: bd,
            cursor: "pointer",
            padding: "16px 24px",
            fontFamily: FONTS.sans,
            fontSize: 14,
            color: laterHovered ? COLORS.textOnDark : COLORS.textOnLight,
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

      <div style={{ padding: "32px 48px 48px", flexShrink: 0 }}>
        <div
          style={{
            ...mono,
            fontSize: 9,
            letterSpacing: "0.1em",
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
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {product.specs.map((spec, i) => (
            <li
              key={spec}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "14px 16px",
                border: bd,
                marginBottom: i < product.specs.length - 1 ? -1 : 0,
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
