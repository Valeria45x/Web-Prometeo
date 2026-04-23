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
  const activeLabel = activeTag ?? "Todos";

  return (
    <div
      style={{
        position: "sticky",
        top: stickyTop,
        zIndex: 10,
        background: COMMUNITY_COLORS.lightPanel,
        borderBottom: COMMUNITY_BORDERS.soft,
        borderTop: COMMUNITY_BORDERS.soft,
        display: "flex",
        alignItems: "stretch",
        height: 56,
      }}
    >
      {/* Label column */}
      <div
        style={{
          borderRight: COMMUNITY_BORDERS.soft,
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "0 28px",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            ...COMMUNITY_FONTS.mono,
            fontSize: 9,
            color: COMMUNITY_COLORS.text,
            opacity: 0.35,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          Filtrar
        </span>
        <span
          style={{
            ...COMMUNITY_FONTS.mono,
            fontSize: 10,
            color: COMMUNITY_COLORS.accent,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 700,
            opacity: activeTag ? 1 : 0,
            transition: "opacity 0.15s ease",
          }}
        >
          {activeLabel}
        </span>
      </div>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          flex: 1,
          height: "100%",
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
                onClick={() => onTagChange(activeTag === tag ? null : tag)}
              >
                {label}
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
