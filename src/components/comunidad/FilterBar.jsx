import { useState } from "react";
import FilterModal from "./FilterModal";
import { COMMUNITY_BORDERS, COMMUNITY_COLORS, COMMUNITY_FONTS } from "./shared";

export default function FilterBar({ activeTags = [], onTagsChange, stickyTop }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="community-filterbar"
        style={{
          position: "sticky",
          top: stickyTop,
          zIndex: 10,
          background: COMMUNITY_COLORS.lightPanel,
          borderBottom: COMMUNITY_BORDERS.soft,
          borderTop: COMMUNITY_BORDERS.soft,
        }}
      >
        <div
          className="community-filterbar__inner"
          style={{ display: "flex", alignItems: "stretch", height: 51.2 }}
        >
          <button
            type="button"
            className="community-filterbar__button"
            onClick={() => setOpen(true)}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = COMMUNITY_COLORS.accent;
              event.currentTarget.querySelector("span").style.color =
                COMMUNITY_COLORS.lightBackground;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = "transparent";
              event.currentTarget.querySelector("span").style.color =
                COMMUNITY_COLORS.text;
            }}
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
              transition: "background 0.15s ease",
            }}
          >
            <span
              className="community-filterbar__button-label"
              style={{
                ...COMMUNITY_FONTS.mono,
                fontSize: 11,
                fontWeight: 700,
                color: COMMUNITY_COLORS.text,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                transition: "color 0.15s ease, background 0.15s ease",
              }}
            >
              Filtrar
            </span>
          </button>

          {activeTags.map((tag) => (
            <div
              key={tag}
              className="community-filterbar__tag"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "0 20px",
                borderRight: COMMUNITY_BORDERS.soft,
              }}
            >
              <span
                className="community-filterbar__tag-label"
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
                {tag}
              </span>
              <button
                type="button"
                onClick={() =>
                  onTagsChange(
                    activeTags.filter((activeTag) => activeTag !== tag),
                  )
                }
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
                x
              </button>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <FilterModal
          activeTags={activeTags}
          onTagsChange={onTagsChange}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
