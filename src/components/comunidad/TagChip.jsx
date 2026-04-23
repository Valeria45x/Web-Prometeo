import { COMMUNITY_BORDERS, COMMUNITY_COLORS, COMMUNITY_FONTS } from "./shared";

export default function TagChip({
  tag,
  active = false,
  onClick,
  small = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontFamily: COMMUNITY_FONTS.mono.fontFamily,
        fontSize: small ? 6 : 7,
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        padding: small ? "2px 6px" : "4px 8px",
        border: active ? COMMUNITY_BORDERS.accent : COMMUNITY_BORDERS.dark,
        background: active ? COMMUNITY_COLORS.accent : "transparent",
        color: active ? COMMUNITY_COLORS.darkBackground : COMMUNITY_COLORS.textOnDark,
        cursor: onClick ? "pointer" : "default",
        display: "inline-block",
        lineHeight: 1.4,
        whiteSpace: "nowrap",
      }}
    >
      {tag}
    </button>
  );
}
