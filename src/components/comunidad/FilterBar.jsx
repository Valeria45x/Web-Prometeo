import { useState } from "react";
import { TH } from "../../constants";
import { TAGS } from "../../data/comunidad";
import Button from "../system/Button";
import { COMMUNITY_BORDERS, COMMUNITY_COLORS, COMMUNITY_FONTS } from "./shared";

const TAG_BUTTON_STYLE = {
  padding: "8px 20px",
  whiteSpace: "nowrap",
  height: "100%",
};

export default function FilterBar({
  activeTag,
  onTagChange,
  sort,
  onSortChange,
  stickyTop,
}) {
  const [open, setOpen] = useState(false);

  const handleTagClick = (tag) => {
    onTagChange(activeTag === tag ? null : tag);
    setOpen(false);
  };

  return (
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
      {/* Main row */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          height: 51.2,
        }}
      >
        {/* Filtrar toggle — exact Prometeo cell dimensions: 111.94 × 51.2px */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          style={{
            background: open ? COMMUNITY_COLORS.text : "transparent",
            border: "none",
            borderRight: COMMUNITY_BORDERS.soft,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 111.94,
            height: 51.2,
            flexShrink: 0,
            cursor: "pointer",
            gap: 10,
          }}
        >
          <span
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 11,
              fontWeight: 700,
              color: open ? COMMUNITY_COLORS.lightPanel : COMMUNITY_COLORS.text,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Filtrar
          </span>
          {activeTag && !open && (
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
          )}
        </button>

        {/* Active tag indicator when closed */}
        {!open && activeTag && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
              borderRight: COMMUNITY_BORDERS.soft,
            }}
          >
            <button
              type="button"
              onClick={() => onTagChange(null)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: 0,
              }}
            >
              <span
                style={{
                  ...COMMUNITY_FONTS.mono,
                  fontSize: 9,
                  color: COMMUNITY_COLORS.text,
                  opacity: 0.35,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                ×
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Tags panel — only visible when open */}
      {open && (
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            height: TH,
            borderTop: COMMUNITY_BORDERS.soft,
            overflowX: "auto",
            scrollbarWidth: "none",
            borderRight: COMMUNITY_BORDERS.soft,
          }}
        >
          {[{ label: "Todos", tag: null }, ...TAGS.map((t) => ({ label: t, tag: t }))].map(
            ({ label, tag }) => (
              <div
                key={label}
                style={{
                  borderLeft: COMMUNITY_BORDERS.soft,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="ghost"
                  surface="light"
                  emphasis={activeTag === tag ? "accent" : "neutral"}
                  size="md"
                  font="mono"
                  active={activeTag === tag}
                  style={TAG_BUTTON_STYLE}
                  onClick={() => handleTagClick(tag)}
                >
                  {label}
                </Button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
