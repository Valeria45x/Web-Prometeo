import { TAGS } from "../../data/comunidad";
import TagChip from "./TagChip";

const B = "1px solid #303030";

const BTN = {
  fontFamily: "monospace",
  fontSize: 7,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  padding: "4px 12px",
  border: B,
  background: "transparent",
  color: "#C8C8C8",
  cursor: "pointer",
  height: "100%",
  display: "flex",
  alignItems: "center",
  transition: "background 0.15s, color 0.15s",
};

export default function FilterBar({
  activeTag,
  onTagChange,
  sort,
  onSortChange,
}) {
  return (
    <div
      style={{
        borderBottom: B,
        borderTop: B,
        display: "flex",
        alignItems: "stretch",
        gap: 0,
        minHeight: 40,
        overflowX: "auto",
        background: "#0A0A0A",
      }}
    >
      {/* Tag: TODOS */}
      <div
        style={{
          borderRight: B,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          flexShrink: 0,
        }}
      >
        <TagChip
          tag="TODOS"
          active={!activeTag}
          onClick={() => onTagChange(null)}
        />
      </div>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 12px",
          flex: 1,
          flexWrap: "nowrap",
          overflowX: "auto",
          borderRight: B,
        }}
      >
        {TAGS.map((tag) => (
          <TagChip
            key={tag}
            tag={tag}
            active={activeTag === tag}
            onClick={() => onTagChange(activeTag === tag ? null : tag)}
          />
        ))}
      </div>

      {/* Sort buttons */}
      <div style={{ display: "flex", alignItems: "stretch", flexShrink: 0 }}>
        <button
          onClick={() => onSortChange("reciente")}
          style={{
            ...BTN,
            borderRight: B,
            background: sort === "reciente" ? "#303030" : "transparent",
            color: sort === "reciente" ? "#FF3C54" : "#C8C8C8",
          }}
        >
          RECIENTE
        </button>
        <button
          onClick={() => onSortChange("upvotes")}
          style={{
            ...BTN,
            background: sort === "upvotes" ? "#303030" : "transparent",
            color: sort === "upvotes" ? "#FF3C54" : "#C8C8C8",
          }}
        >
          POPULARES
        </button>
      </div>
    </div>
  );
}
