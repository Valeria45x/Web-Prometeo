import { TAGS } from "../../data/comunidad";
import Button from "../system/Button";
import { COMMUNITY_BORDERS, COMMUNITY_COLORS } from "./shared";

const FILTER_BUTTON_STYLE = {
  padding: "6px 12px",
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
        <Button
          variant="ghost"
          surface="light"
          size="xs"
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
            size="xs"
            font="mono"
            active={activeTag === tag}
            style={FILTER_BUTTON_STYLE}
            onClick={() => onTagChange(activeTag === tag ? null : tag)}
          >
            {tag}
          </Button>
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
        <Button
          variant="tab"
          surface="light"
          size="tab"
          font="mono"
          active={sort === "reciente"}
          style={{
            height: "100%",
            padding: "0 20px",
            borderRight: COMMUNITY_BORDERS.soft,
          }}
          onClick={() => onSortChange("reciente")}
        >
          Reciente
        </Button>
      </div>
    </div>
  );
}
