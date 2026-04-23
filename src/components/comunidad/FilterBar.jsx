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
      {/* Label column — same padding as Prometeo cell in topbar */}
      <div
        style={{
          borderRight: COMMUNITY_BORDERS.soft,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          flexShrink: 0,
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
