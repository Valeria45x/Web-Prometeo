import { useState } from "react";
import FilterModal from "./FilterModal";
import { COMMUNITY_BORDERS, COMMUNITY_COLORS, COMMUNITY_FONTS } from "./shared";

export default function FilterBar({ activeTag, onTagChange, stickyTop }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: stickyTop,
          zIndex: 10,
          background: COMMUNITY_COLORS.lightPanel,
          borderBottom: COMMUNITY_BORDERS.soft,
          borderTop: COMMUNITY_BORDERS.soft,
        }}
      >
        <div style={{ display: "flex", alignItems: "stretch", height: 51.2 }}>
          {/* Filtrar button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            style={{
              background: "transparent",
              border: "none",
              borderRight: COMMUNITY_BORDERS.soft,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 111.94,
              height: 51.2,
              flexShrink: 0,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                ...COMMUNITY_FONTS.mono,
                fontSize: 11,
                fontWeight: 700,
                color: COMMUNITY_COLORS.text,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Filtrar
            </span>
          </button>

          {/* Active tag cell */}
          {activeTag && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "0 20px",
                borderRight: COMMUNITY_BORDERS.soft,
              }}
            >
              <span
                style={{
                  ...COMMUNITY_FONTS.mono,
                  fontSize: 9,
                  fontWeight: 700,
                  color: COMMUNITY_COLORS.accent,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {activeTag}
              </span>
              <button
                type="button"
                onClick={() => onTagChange(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  ...COMMUNITY_FONTS.mono,
                  fontSize: 11,
                  color: COMMUNITY_COLORS.text,
                  opacity: 0.3,
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      {open && (
        <FilterModal
          activeTag={activeTag}
          onTagChange={onTagChange}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
