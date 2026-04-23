import { TAGS } from "../../data/comunidad";
import { COMMUNITY_BORDERS, COMMUNITY_COLORS, COMMUNITY_FONTS } from "./shared";

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
        display: "flex",
        alignItems: "center",
        height: 44,
        overflowX: "auto",
        scrollbarWidth: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          padding: "0 36px",
          gap: 2,
          height: "100%",
        }}
      >
        <button
          type="button"
          onClick={() => onTagChange(null)}
          style={{
            ...COMMUNITY_FONTS.mono,
            fontSize: 9,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            background: "none",
            border: "none",
            color: activeTag === null ? COMMUNITY_COLORS.accent : COMMUNITY_COLORS.text,
            opacity: activeTag === null ? 1 : 0.4,
            fontWeight: activeTag === null ? 700 : 400,
            cursor: "pointer",
            padding: "6px 12px",
            whiteSpace: "nowrap",
          }}
        >
          Todos
        </button>
        {TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onTagChange(activeTag === tag ? null : tag)}
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              background: "none",
              border: "none",
              color: activeTag === tag ? COMMUNITY_COLORS.accent : COMMUNITY_COLORS.text,
              opacity: activeTag === tag ? 1 : 0.4,
              fontWeight: activeTag === tag ? 700 : 400,
              cursor: "pointer",
              padding: "6px 12px",
              whiteSpace: "nowrap",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          flexShrink: 0,
          borderLeft: COMMUNITY_BORDERS.soft,
        }}
      >
        <button
          type="button"
          onClick={() => onSortChange("reciente")}
          style={{
            ...COMMUNITY_FONTS.mono,
            fontSize: 9,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            background: "none",
            border: "none",
            borderRight: COMMUNITY_BORDERS.soft,
            color: sort === "reciente" ? COMMUNITY_COLORS.accent : COMMUNITY_COLORS.text,
            opacity: sort === "reciente" ? 1 : 0.4,
            fontWeight: sort === "reciente" ? 700 : 400,
            cursor: "pointer",
            padding: "0 20px",
            height: "100%",
          }}
        >
          Reciente
        </button>
      </div>
    </div>
  );
}
