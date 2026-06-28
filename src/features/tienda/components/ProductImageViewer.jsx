import { useState } from "react";
import { COLORS, FONTS } from "@/design/tokens";
import { placeholderImage } from "@/lib/media";
import { S, bd } from "@/features/tienda/productDetail.styles";

function PlaceholderMedia() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: S.media,
        overflow: "hidden",
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

export default function ProductImageViewer({ images = [], name = "" }) {
  const gallery = images.length > 0 ? images : [null];
  const [active, setActive] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);

  const current = Math.min(active, gallery.length - 1);
  const hasArrows = gallery.length > 1;

  const arrowStyle = (hovered, side) => ({
    position: "absolute",
    [side]: 12,
    top: "50%",
    transform: "translateY(-50%)",
    background: hovered ? COLORS.textOnLight : "none",
    border: bd,
    cursor: "pointer",
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: hovered ? COLORS.textOnDark : COLORS.textOnLight,
    fontFamily: FONTS.sans,
    fontSize: 14,
    lineHeight: 1,
    transition: "background 0.18s ease, color 0.18s ease",
  });

  return (
    <div
      style={{
        borderRight: bd,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{ flex: 1, position: "relative", borderBottom: bd, minHeight: 320 }}
      >
        {gallery[current] ? (
          <img
            src={gallery[current]}
            alt={name}
            loading="lazy"
            decoding="async"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              background: S.media,
            }}
          />
        ) : (
          <PlaceholderMedia />
        )}

        {hasArrows && (
          <>
            <button
              type="button"
              aria-label="Imagen anterior"
              style={arrowStyle(hoverPrev, "left")}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              onClick={() =>
                setActive(
                  (t) => (t - 1 + gallery.length) % gallery.length,
                )
              }
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Imagen siguiente"
              style={arrowStyle(hoverNext, "right")}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              onClick={() => setActive((t) => (t + 1) % gallery.length)}
            >
              →
            </button>
          </>
        )}
      </div>

      {hasArrows && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gallery.length}, 1fr)`,
            height: 80,
            flexShrink: 0,
          }}
        >
          {gallery.map((src, i) => (
            <button
              type="button"
              key={src ?? i}
              aria-label={`Ver imagen ${i + 1}`}
              onClick={() => setActive(i)}
              style={{
                background: "none",
                border: "none",
                borderRight: i < gallery.length - 1 ? bd : "none",
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
                  zIndex: 1,
                  background:
                    current === i ? "rgba(255, 11, 58, 0.12)" : "transparent",
                  borderBottom:
                    current === i
                      ? `2px solid ${COLORS.accent}`
                      : "2px solid transparent",
                  transition: "background 0.15s, border-color 0.15s",
                  pointerEvents: "none",
                }}
              />
              <img
                src={src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  background: S.media,
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
