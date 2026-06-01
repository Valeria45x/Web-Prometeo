import { BORDERS, COLORS, FONTS } from "../design/tokens";

export default function LocalDemoNotice({
  title = "Prototipo local",
  children,
  action = null,
  style = {},
}) {
  return (
    <div
      style={{
        border: BORDERS.light,
        background: COLORS.pageLight,
        color: COLORS.textOnLight,
        padding: "14px 16px",
        display: "grid",
        gap: 12,
        ...style,
      }}
    >
      <div style={{ display: "grid", gap: 6 }}>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 8,
            lineHeight: "16px",
            letterSpacing: "0.1em",
            color: COLORS.accent,
          }}
        >
          {title}
        </span>
        <p
          style={{
            margin: 0,
            fontFamily: FONTS.sans,
            fontSize: 13,
            lineHeight: "20px",
            color: COLORS.textOnLight,
            opacity: 0.68,
          }}
        >
          {children}
        </p>
      </div>
      {action}
    </div>
  );
}
