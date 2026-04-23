import { TAGS } from "../../data/comunidad";
import Button from "../system/Button";
import { COMMUNITY_BORDERS, COMMUNITY_COLORS } from "./shared";

const FILTER_BUTTON_STYLE = {
  padding: "8px 16px",
  whiteSpace: "nowrap",
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
        display: "flex",
        alignItems: "center",
        height: 56,
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
        <Button
          variant="ghost"
          surface="light"
          emphasis="neutral"
          size="md"
          font="mono"
          active={activeTag === null}
          style={FILTER_BUTTON_STYLE}
          onClick={() => onTagChange(null)}
        >
          Todos
        </Button>
        {TAGS.map((tag) => (
          <Button
            key={tag}
            variant="ghost"
            surface="light"
            emphasis={activeTag === tag ? "accent" : "neutral"}
            size="md"
            font="mono"
            active={activeTag === tag}
            style={FILTER_BUTTON_STYLE}
            onClick={() => onTagChange(activeTag === tag ? null : tag)}
          >
            {tag}
          </Button>
        ))}
      </div>

    </div>
  );
}
