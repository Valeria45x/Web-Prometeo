import { useState } from "react";
import { COLORS, FONTS } from "@/design/tokens";
import { placeholderImage } from "@/lib/media";
import { S, bd } from "@/features/tienda/productDetail.styles";

function ImagePlaceholder() {
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

export default function ProductImageViewer() {
  const [thumb, setThumb] = useState(0);
  const thumbCount = 4;
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);

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
        <ImagePlaceholder />

        <button
          type="button"
          style={arrowStyle(hoverPrev, "left")}
          onMouseEnter={() => setHoverPrev(true)}
          onMouseLeave={() => setHoverPrev(false)}
          onClick={() => setThumb((t) => Math.max(0, t - 1))}
        >
          ←
        </button>
        <button
          type="button"
          style={arrowStyle(hoverNext, "right")}
          onMouseEnter={() => setHoverNext(true)}
          onMouseLeave={() => setHoverNext(false)}
          onClick={() => setThumb((t) => Math.min(thumbCount - 1, t + 1))}
        >
          →
        </button>
      </div>

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
                  thumb === i ? "rgba(255, 11, 58, 0.12)" : "transparent",
                borderBottom:
                  thumb === i
                    ? `2px solid ${COLORS.accent}`
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
