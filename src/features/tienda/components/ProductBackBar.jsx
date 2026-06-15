import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS, FONTS } from "@/design/tokens";
import { S, bd } from "@/features/tienda/productDetail.styles";

export default function ProductBackBar() {
  const navigate = useNavigate();
  const [backHovered, setBackHovered] = useState(false);

  return (
    <div
      style={{
        borderBottom: bd,
        display: "flex",
        alignItems: "stretch",
        justifyContent: "flex-end",
        padding: 0,
        height: 64,
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
          background: "none",
          border: bd,
          cursor: "pointer",
          height: "100%",
          minWidth: 240,
          padding: 0,
          display: "flex",
          alignItems: "stretch",
          textAlign: "left",
          boxSizing: "border-box",
          fontFamily: FONTS.sans,
          fontSize: "var(--type-title-sm-size)",
          lineHeight: "var(--type-title-sm-line)",
          fontWeight: 700,
          letterSpacing: 0,
        }}
      >
        <span
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "0 32px",
            color: backHovered ? COLORS.accent : COLORS.textOnLight,
            transition: "color 0.18s ease",
          }}
        >
          Regresar a tienda
        </span>
        <span
          style={{
            flex: "0 0 64px",
            display: "grid",
            placeItems: "center",
            borderLeft: bd,
            background: backHovered ? COLORS.accent : "transparent",
            color: COLORS.textOnLight,
            fontSize: 20,
            lineHeight: 1,
            transition: "background 0.18s ease",
          }}
        >
          ×
        </span>
      </button>
    </div>
  );
}
